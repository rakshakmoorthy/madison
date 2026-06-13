#!/usr/bin/env node
// assignment6-build-pdf.mjs
// The build-pdf actuator for the Assignment 6 Assistant.
//
// 1. Reads the JSON artifacts (brand, competitors, positioning, names,
//    trademark, domains, final-name, portfolios) from a directory.
// 2. Enforces the human gate: every field listed in each artifact's
//    `_human_gate` must be filled. If any is null / empty / still
//    `[Unverifiable …]`, it REFUSES to build and lists exactly what's missing.
// 3. Only when all gates are satisfied, assembles a Markdown report and renders
//    it to PDF (pandoc + xelatex, with a libreoffice fallback).
//
// Usage:
//   node scripts/assignment6-build-pdf.mjs <dir-with-json> [--out file.pdf]
//
// You cannot submit what you did not verify: the gate is the point.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ARTIFACTS = [
  'brand', 'competitors', 'positioning', 'names',
  'trademark', 'domains', 'final-name', 'portfolios',
];

// --- gate evaluation -----------------------------------------------------
// Resolve a dotted path with `[]` array-expansion to every leaf value.
function leaves(obj, parts) {
  if (parts.length === 0) return [obj];
  const [head, ...rest] = parts;
  if (head.endsWith('[]')) {
    const arr = obj?.[head.slice(0, -2)];
    return Array.isArray(arr) ? arr.flatMap((it) => leaves(it, rest)) : [];
  }
  return obj == null ? [] : leaves(obj[head], rest);
}

const isOpen = (v) =>
  v === null ||
  v === undefined ||
  (typeof v === 'string' &&
    (v.trim() === '' || v.trim().toLowerCase().startsWith('[unverifiable')));

function checkGates(data) {
  const open = [];
  for (const [name, obj] of Object.entries(data)) {
    for (const gpath of obj._human_gate || []) {
      const vals = leaves(obj, gpath.split('.'));
      const openCount = vals.filter(isOpen).length;
      if (openCount > 0 || vals.length === 0) {
        open.push(`${name}.json → ${gpath}  (${openCount || 'no'} field(s) need you)`);
      }
    }
  }
  return open;
}

// --- markdown assembly ---------------------------------------------------
const h = (s) => `\n## ${s}\n`;
const esc = (s) => String(s ?? '').replace(/([#*_`])/g, '\\$1');

function buildMarkdown(d) {
  const brand = d.brand || {};
  const name = d['final-name']?.selected || brand.brand_name || 'Brand';
  const out = [];
  out.push('---');
  out.push(`title: "Assignment 6 — ${name}"`);
  out.push('geometry: margin=1in');
  out.push('fontsize: 11pt');
  out.push('---');
  out.push(`\n*Brand strategy and Madison tool naming. Mode: ${esc(brand.mode || '—')}.*`);

  // 1A
  out.push(h('The brand stands for one specific thing'));
  out.push(`**Mission.** ${esc(brand.mission)}\n`);
  out.push(`**Purpose.** ${esc(brand.purpose)}\n`);
  out.push(`**Vision.** ${esc(brand.vision)}\n`);
  out.push(`**Values.** ${(brand.values || []).map(esc).join(' · ')}\n`);
  out.push(`**Unique value proposition.** ${esc(brand.uvp?.final)}\n`);
  out.push(`*Why this UVP:* ${esc(brand.uvp?.final_justification)}`);
  if (brand.uvp?.iterations?.length) {
    out.push('\n*UVP development:*\n');
    for (const it of brand.uvp.iterations)
      out.push(`- v${it.version}: ${esc(it.text)} — *${esc(it.change_from_previous)}*`);
    out.push('');
  }

  // 1B
  const pos = d.positioning || {};
  out.push(h('This brand owns territory a competitor cannot claim'));
  out.push(`**Positioning.** ${esc(pos.chosen)}\n`);
  out.push(`**Not for.** ${esc(pos.anti_positioning)}\n`);
  const comp = d.competitors || {};
  if (comp.entries?.length) {
    out.push('\n| Competitor | What they own | Strongest asset | Exploitable weakness |');
    out.push('|---|---|---|---|');
    for (const e of comp.entries) {
      const f = (x) => `${esc(x?.value)} ${x?.label || ''}`.trim();
      out.push(`| ${esc(e.name)} | ${f(e.what_they_own)} | ${f(e.strongest_asset)} | ${f(e.exploitable_weakness)} |`);
    }
    out.push(`\n**White space.** ${esc(comp.white_space)}`);
  }

  // 2A
  const names = d.names || {};
  if (names.names?.length) {
    out.push(h('Ten names, then one survives verification'));
    out.push('| Name | Type | Rationale |');
    out.push('|---|---|---|');
    for (const n of names.names)
      out.push(`| ${esc(n.name)} | ${esc(n.category)} | ${esc(n.rationale)} |`);
  }

  // 2B + 2C
  const tm = d.trademark || {};
  if (tm.results?.length) {
    out.push(h('The finalists cleared a trademark search I ran myself'));
    out.push('| Name | Risk | Conflicts | Verified by |');
    out.push('|---|---|---|---|');
    for (const r of tm.results)
      out.push(`| ${esc(r.name)} | ${esc(r.risk)} | ${esc(r.conflicts)} | ${esc(r.verified_by)} |`);
  }
  const dm = d.domains || {};
  if (dm.results?.length) {
    out.push(h('And the domains are available'));
    out.push('| Name | .com | .ai | .io | .app | Verified by |');
    out.push('|---|---|---|---|---|---|');
    for (const r of dm.results) {
      const g = (tld) => {
        const x = (r.domains || []).find((z) => z.tld === tld);
        return x ? (x.available === true ? 'open' : x.available === false ? 'taken' : '?') : '—';
      };
      out.push(`| ${esc(r.name)} | ${g('.com')} | ${g('.ai')} | ${g('.io')} | ${g('.app')} | ${esc(r.verified_by)} |`);
    }
  }

  // final name
  const fn = d['final-name'] || {};
  out.push(h(`The name is ${esc(fn.selected || '—')}`));
  out.push(`**Selected by.** ${esc(fn.selected_by)}\n`);
  out.push(`**Why.** ${esc(fn.selection_rationale)}`);

  // 3
  const pf = d.portfolios || {};
  if (pf.entries?.length) {
    out.push(h('What the best portfolios in the field do'));
    for (const e of pf.entries) {
      out.push(`\n**${esc(e.owner)}** — ${esc(e.url)}\n`);
      out.push(`- Admire: ${esc(e.admire)}`);
      out.push(`- Would change: ${esc(e.would_change)}`);
      out.push('');
    }
    out.push(`\n**Best practices.** ${esc(pf.best_practices_synthesis)}`);
  }
  return out.join('\n') + '\n';
}

// --- render --------------------------------------------------------------
function render(md, outPdf) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'a6pdf-'));
  const mdFile = path.join(tmp, 'report.md');
  fs.writeFileSync(mdFile, md);
  // primary: pandoc + xelatex
  try {
    execSync(`pandoc "${mdFile}" -o "${path.join(tmp, 'out.pdf')}" --pdf-engine=xelatex`, { stdio: 'pipe' });
    fs.copyFileSync(path.join(tmp, 'out.pdf'), outPdf);
    return 'pandoc+xelatex';
  } catch {}
  // fallback: pandoc -> html -> libreoffice
  try {
    execSync(`pandoc "${mdFile}" -s -o "${path.join(tmp, 'out.html')}"`, { stdio: 'pipe' });
    execSync(`soffice --headless --convert-to pdf --outdir "${tmp}" "${path.join(tmp, 'out.html')}"`, { stdio: 'pipe' });
    fs.copyFileSync(path.join(tmp, 'out.pdf'), outPdf);
    return 'pandoc+libreoffice';
  } catch {}
  // last resort: leave the markdown next to the requested pdf
  fs.copyFileSync(mdFile, outPdf.replace(/\.pdf$/, '.md'));
  throw new Error('no PDF engine succeeded — wrote .md instead; install pandoc + a LaTeX engine');
}

// --- main ----------------------------------------------------------------
function main() {
  const args = process.argv.slice(2);
  const dir = args.find((a) => !a.startsWith('--')) || '.';
  const oi = args.indexOf('--out');
  const outPdf = path.resolve(oi >= 0 ? args[oi + 1] : path.join(dir, 'assignment6.pdf'));

  const data = {};
  const missingFiles = [];
  for (const a of ARTIFACTS) {
    const p = path.join(dir, `${a}.json`);
    if (fs.existsSync(p)) data[a] = JSON.parse(fs.readFileSync(p, 'utf8'));
    else missingFiles.push(`${a}.json`);
  }
  if (missingFiles.length) {
    console.error(`Missing artifact(s) in ${dir}: ${missingFiles.join(', ')}`);
    console.error('Run the earlier commands first (foundation → … → decide → portfolios).');
    process.exit(2);
  }

  const open = checkGates(data);
  if (open.length) {
    console.error('REFUSING to build — the human gate is open. Finish these first:\n');
    for (const o of open) console.error('  • ' + o);
    console.error('\nThese are the parts only you can do: search Justia, check domains,');
    console.error('select the name, and judge the portfolios. The PDF builds once they are done.');
    process.exit(1);
  }

  const md = buildMarkdown(data);
  const engine = render(md, outPdf);
  console.log(`✓ all gates satisfied — built ${path.relative(process.cwd(), outPdf)} (${engine})`);
}

main();
