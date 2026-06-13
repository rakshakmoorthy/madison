#!/usr/bin/env node
// a5b-verify.mjs
// Pre-submission conformance check for INFO 7375 Assignment 5B (Build the Recipe).
// Point it at a student's submission .zip; it reports what's missing and which
// automatic deductions they'd hit. This is the MACHINE half (P4) of grading —
// conformance only. Adequacy (is the recipe good?) is still the human's job.
//
// Usage: node scripts/a5b-verify.mjs submission.zip [--out report.md]
// Writes a Markdown report (what's there / what's missing) next to the zip and
// prints the same summary to the console.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execSync } from 'node:child_process';

const JUDGMENT = new Set(['PA', 'PF', 'TO', 'IJ', 'EI']);
const RESPONSES = ['hard stop', 'flag', 'log and continue', 'flag for review', 'log'];

const out = [];
let blockers = 0, deductions = 0;
const line = (lvl, msg, ded = 0) => {
  const mark = { pass: '✓', fail: '✗', warn: '!', manual: '·' }[lvl];
  out.push(`  [${mark}] ${msg}${ded ? `   → −${ded} pts` : ''}`);
  if (lvl === 'fail') { blockers++; deductions += ded; }
};

// placeholder = empty, or still the template "[...]" bracket form
const isPlaceholder = (v) =>
  v == null || v === '' ||
  (typeof v === 'string' && /^\s*\[.*\]\s*$/.test(v));

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '__MACOSX' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function countRecords(file) {
  const ext = path.extname(file).toLowerCase();
  try {
    if (ext === '.json') {
      const d = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(d)) return d.length;
      for (const v of Object.values(d)) if (Array.isArray(v)) return v.length;
      return 1;
    }
    if (ext === '.csv' || ext === '.tsv') {
      const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter((l) => l.trim());
      return Math.max(0, lines.length - 1); // minus header
    }
  } catch { return 0; }
  return 0;
}

// --- checks ---------------------------------------------------------------
function checkFiles(files, rel) {
  out.push('\nRequired separate files (Canvas wants three):');
  const pdf = files.find((f) => /\.pdf$/i.test(f));
  const cfg = files.find((f) => /brand_config\.json$/i.test(f));
  const recipe = files.find((f) => /recipe[_-].*\.(md|txt)$/i.test(f)) ||
                 files.find((f) => /\.(md|txt)$/i.test(f) && /RECIPE:/i.test(fs.readFileSync(f, 'utf8')));

  if (pdf) {
    line('pass', `PDF present (${rel(pdf)})`);
    if (!/[A-Za-z]+_[A-Za-z]+_A5B_BuildTheRecipe\.pdf$/i.test(path.basename(pdf)))
      line('warn', 'PDF name should be LastName_FirstName_A5B_BuildTheRecipe.pdf');
  } else line('fail', 'PDF missing', 15);

  if (cfg) line('pass', `brand_config.json present as a separate file (${rel(cfg)})`);
  else line('fail', 'brand_config.json not submitted as a separate file', 20);

  if (recipe) line('pass', `recipe file present as a separate file (${rel(recipe)})`);
  else line('fail', 'recipe file (recipe_*.md/.txt) not submitted as a separate file', 20);

  return { pdf, cfg, recipe };
}

function checkConfig(cfg) {
  out.push('\nbrand_config.json (Part 1, 25 pts):');
  if (!cfg) { line('fail', 'no config to check'); return; }
  let d;
  try { d = JSON.parse(fs.readFileSync(cfg, 'utf8')); }
  catch (e) { line('fail', `INVALID JSON — not gradeable (${e.message.split('\n')[0]})`, 25); return; }
  line('pass', 'valid JSON');

  for (const f of ['tool_summary', 'one_thing', 'conductor_note'])
    if (isPlaceholder(d[f])) line('fail', `${f} is empty/placeholder`);
  const u = d.primary_user || {};
  for (const f of ['role', 'situation', 'workaround'])
    if (isPlaceholder(u[f])) line('fail', `primary_user.${f} is empty/placeholder`);

  const ds = Array.isArray(d.data_sources) ? d.data_sources : [];
  if (ds.length === 0) line('fail', 'data_sources is empty');
  ds.forEach((s, i) => {
    for (const f of ['name', 'local_path', 'record_type', 'update_freq', 'quality_gate'])
      if (isPlaceholder(s[f])) line('fail', `data_sources[${i}].${f} is empty/placeholder`);
  });

  const pg = Array.isArray(d.phase_gates) ? d.phase_gates : [];
  if (pg.length === 0) line('fail', 'phase_gates is empty');
  pg.forEach((g, i) => {
    for (const f of ['step', 'good_looks_like', 'bad_looks_like', 'response'])
      if (isPlaceholder(g[f])) line('fail', `phase_gates[${i}].${f} is empty/placeholder`);
    const jt = (g.judgment_type || '').toString().trim().toUpperCase();
    if (!JUDGMENT.has(jt))
      line('fail', `phase_gates[${i}].judgment_type "${g.judgment_type ?? ''}" not one of PA/PF/TO/IJ/EI`, 10);
  });
}

function checkRecipe(recipe) {
  out.push('\nRecipe file (Part 3, 25 pts):');
  if (!recipe) { line('fail', 'no recipe file to check'); return; }
  const t = fs.readFileSync(recipe, 'utf8');
  const T = t.toUpperCase();
  for (let n = 1; n <= 4; n++)
    if (T.includes(`LAYER ${n}`)) line('pass', `Layer ${n} present`);
    else line('fail', `Layer ${n} section missing`, 15);
  T.includes('EXECUTIVE SUMMARY') ? line('pass', 'executive summary present')
    : line('fail', 'executive summary missing', 0);
  T.includes('CONDUCTOR NOTE') ? line('pass', 'conductor note present')
    : line('fail', 'conductor note missing');
  /OPEN TODO|TODO:/.test(T) ? line('pass', 'TODO section present')
    : line('fail', 'no typed TODO items', 0);

  const gates = [...t.matchAll(/PHASE GATE[^\n]*/gi)];
  if (gates.length === 0) line('fail', 'no PHASE GATE entries', 0);
  let untyped = 0;
  for (const g of gates) {
    const seg = t.slice(g.index, g.index + 220).toUpperCase();
    if (!/JUDGMENT TYPE\s*[:|]/.test(seg) || ![...JUDGMENT].some((j) => seg.includes(j))) untyped++;
  }
  if (untyped) line('fail', `${untyped} phase gate(s) missing a judgment type (PA/PF/TO/IJ/EI)`, 10);
  else if (gates.length) line('pass', `${gates.length} phase gate(s), all typed`);
}

function checkVerified(root, files, rel) {
  out.push('\ndata/verified/ (Part 2, 20 pts):');
  // Find data/verified via any file beneath it (works even with no README inside).
  const anyV = files.map((f) => f.replace(/\\/g, '/')).find((f) => /\/data\/verified\//.test(f));
  const vdir = anyV ? anyV.replace(/(.*\/data\/verified)\/.*/, '$1') : null;
  if (!vdir) {
    line('manual', 'data/verified/ not in the zip — confirm the GitHub link + Nik/Nina access in your PDF', 0);
    return;
  }
  const readme = files.find((f) => /data\/verified\/README\.md$/i.test(f.replace(/\\/g, '/')));
  readme ? line('pass', 'data/verified/README.md present')
         : line('fail', 'data/verified/README.md missing', 0);
  const subs = fs.readdirSync(vdir, { withFileTypes: true }).filter((e) => e.isDirectory());
  if (subs.length === 0) line('fail', 'no per-source subfolders under data/verified/');
  for (const s of subs) {
    const n = walk(path.join(vdir, s.name)).reduce((a, f) => a + countRecords(f), 0);
    n >= 25 ? line('pass', `source "${s.name}": ${n} records`)
            : line('fail', `source "${s.name}": ${n} records (need ≥25)`);
  }
}

function checkManual(files) {
  out.push('\nManual checks the verifier cannot make (confirm yourself):');
  const text = files.filter((f) => /\.(md|txt)$/i.test(f))
    .map((f) => fs.readFileSync(f, 'utf8')).join('\n').toLowerCase();
  text.includes('snickerdoodle')
    ? line('pass', '/snickerdoodle mentioned in a text deliverable (Part 4)')
    : line('manual', '/snickerdoodle run documented in the PDF? (Part 4, 10 pts)', 0);
  line('manual', 'GitHub link to data/verified/ with Nik + Nina access granted? (−15 if absent)', 0);
}

// Build a Markdown "what's there / what's not" report from the collected lines.
function renderReport(lines, zipName) {
  const present = [], missing = [], warn = [], manual = [];
  let section = '';
  for (const raw of lines) {
    const l = raw.replace(/^\n/, '');
    const m = l.match(/^\s*\[(.)\]\s*(.*)$/);
    if (!m) { if (l.endsWith(':')) section = l.replace(/:$/, ''); continue; }
    const item = `${m[2]}${section ? `  _(${section})_` : ''}`;
    ({ '✓': present, '✗': missing, '!': warn, '·': manual }[m[1]] || manual).push(item);
  }
  const r = [`# A5B submission report — ${zipName}`, ''];
  r.push(blockers === 0
    ? '**Conformance: PASSED** — all hard requirements present. (Adequacy is still graded by a human; a pass means gradeable, not an A.)'
    : `**Conformance: ${blockers} blocker(s).** Estimated automatic deductions if submitted as-is: **−${deductions} pts.** Fix the items below.`);
  r.push('', `## ❌ Missing / must fix (${missing.length})`,
    ...(missing.length ? missing.map((x) => `- ${x}`) : ['- _(none)_']));
  if (warn.length) r.push('', `## ⚠ Warnings (${warn.length})`, ...warn.map((x) => `- ${x}`));
  r.push('', `## · Check yourself — the verifier can't see these`, ...manual.map((x) => `- ${x}`));
  r.push('', `## ✅ Present (${present.length})`, ...present.map((x) => `- ${x}`));
  r.push('', '---', '_Conformance only (machine half of P4): the required pieces are present and well-formed. Whether the recipe is **good** is the human grader\'s call._');
  return r.join('\n') + '\n';
}

function main() {
  const args = process.argv.slice(2);
  const zip = args.find((a) => !a.startsWith('--'));
  const oi = args.indexOf('--out');
  if (!zip || !fs.existsSync(zip)) { console.error('usage: node scripts/a5b-verify.mjs submission.zip [--out report.md]'); process.exit(2); }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'a5b-'));
  execSync(`unzip -o -q "${path.resolve(zip)}" -d "${tmp}"`, { stdio: 'pipe' });
  const files = walk(tmp);
  const rel = (f) => path.relative(tmp, f);

  out.push(`A5B SUBMISSION CHECK — ${path.basename(zip)}`);
  out.push('='.repeat(48));
  const { cfg, recipe } = checkFiles(files, rel);
  checkConfig(cfg);
  checkRecipe(recipe);
  checkVerified(tmp, files, rel);
  checkManual(files);

  out.push('\n' + '='.repeat(48));
  if (blockers === 0)
    out.push('✓ Conformance PASSED — all hard requirements present. (Adequacy is still graded by a human.)');
  else
    out.push(`✗ ${blockers} blocker(s). Estimated automatic deductions if submitted as-is: −${deductions} pts. Fix the ✗ items.`);

  // Write the Markdown report next to the zip (or --out).
  const reportPath = oi >= 0 ? path.resolve(args[oi + 1])
    : path.join(path.dirname(path.resolve(zip)),
        path.basename(zip).replace(/\.zip$/i, '') + '-a5b-report.md');
  try {
    fs.writeFileSync(reportPath, renderReport(out, path.basename(zip)));
    out.push(`\nReport written: ${reportPath}`);
  } catch (e) { out.push(`\n(could not write report: ${e.message})`); }

  console.log(out.join('\n'));
  process.exit(blockers ? 1 : 0);
}

main();
