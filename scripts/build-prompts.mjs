#!/usr/bin/env node
// build-prompts.mjs
// Compile a CLI-agnostic prompt suite (prompts/<suite>/) into each target
// tool's native format. The suite body + knowledge files are the tested rules
// and are never altered here; this only wraps/packages them per target.
//
// Usage:
//   node scripts/build-prompts.mjs <suite> [--target skill] [--out <dir>]
//   node scripts/build-prompts.mjs courses            # uses manifest `targets`
//
// Targets implemented: skill (Claude Code / Cowork). Stubs documented for
// agents (Codex AGENTS.md) and cursor (.cursor/rules) — add a builder fn.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');

// --- tiny YAML reader (restricted: scalars + simple block lists) ---------
// Sufficient for our flat manifests; not a general YAML parser.
function parseManifest(text) {
  const out = {};
  const lines = text.split(/\r?\n/);
  let listKey = null;
  const unquote = (s) => s.replace(/^["']|["']$/g, '');
  for (const raw of lines) {
    const line = raw.replace(/\s+#.*$/, ''); // strip trailing comments
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const item = line.match(/^\s*-\s*(.+?)\s*$/);
    if (item && listKey) { out[listKey].push(unquote(item[1])); continue; }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (kv) {
      const [, key, val] = kv;
      if (val === '') { out[key] = []; listKey = key; }
      else { out[key] = unquote(val); listKey = null; }
    }
  }
  return out;
}

// --- helpers -------------------------------------------------------------
// Resolve a knowledge_file: suite-local first, then prompts/_shared/ (so suites
// can share disciplines without duplicating them). Falls back to suite path.
function resolveKf(suiteDir, kf) {
  const local = path.join(suiteDir, kf);
  if (fs.existsSync(local)) return local;
  const shared = path.join(REPO, 'prompts', '_shared', kf);
  if (fs.existsSync(shared)) return shared;
  return local;
}

function fold(text, indent = '  ', width = 76) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > width) { lines.push(cur.trim()); cur = w; }
    else cur += ' ' + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines.map((l) => indent + l).join('\n');
}

// Each target declares the manifest fields it cannot build without.
const REQUIRED = {
  skill: ['name', 'description', 'body'],
  agents: ['name', 'body'],
  cursor: ['name', 'body', 'cursor_globs'],
};

function checkRequired(target, m) {
  const missing = (REQUIRED[target] || []).filter(
    (k) => m[k] === undefined || (Array.isArray(m[k]) && m[k].length === 0)
  );
  return missing;
}

// --- target: skill (Claude Code / Cowork) --------------------------------
function buildSkill(suiteDir, m, outRoot) {
  const body = fs.readFileSync(path.join(suiteDir, m.body), 'utf8');
  const frontmatter =
    `---\nname: ${m.name}\ndescription: >-\n${fold(m.description)}\n---\n\n`;
  const skillMd = frontmatter + body;

  // Stage + zip in a real temp dir (some synced/FUSE mounts block unlink/rename,
  // which zip needs). Then copy the finished artifact next to the source.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'build-prompts-'));
  const stage = path.join(tmp, m.name);
  fs.mkdirSync(stage, { recursive: true });
  fs.writeFileSync(path.join(stage, 'SKILL.md'), skillMd);
  for (const kf of m.knowledge_files || []) {
    const dst = path.join(stage, kf);
    fs.mkdirSync(path.dirname(dst), { recursive: true }); // support subdir files (e.g. schemas/)
    fs.copyFileSync(resolveKf(suiteDir, kf), dst);
  }
  execSync(`zip -r -X "${m.name}.skill" "${m.name}"`, { cwd: tmp, stdio: 'pipe' });

  const built = path.join(tmp, `${m.name}.skill`);
  let dest = built;
  try {
    fs.mkdirSync(outRoot, { recursive: true });
    dest = path.join(outRoot, `${m.name}.skill`);
    fs.copyFileSync(built, dest); // O_TRUNC overwrite; no unlink needed
  } catch {
    dest = built; // mount refused the copy — leave it in tmp and report that
  }
  return { out: dest, files: 1 + (m.knowledge_files || []).length };
}

// Body + the knowledge files inlined under headers — for single-file targets
// (cursor, agents) that can't carry separate sidecar files the way a skill can.
function selfContained(suiteDir, m) {
  let text = fs.readFileSync(path.join(suiteDir, m.body), 'utf8').trimEnd();
  for (const kf of m.knowledge_files || []) {
    const kbody = fs.readFileSync(resolveKf(suiteDir, kf), 'utf8').trimEnd();
    text += `\n\n---\n\n<!-- knowledge file: ${kf} -->\n\n${kbody}`;
  }
  return text + '\n';
}

// --- target: agents (Codex / generic AGENTS.md) --------------------------
// Emits a fenced block to paste/append into a repo's AGENTS.md. No triggering
// metadata — AGENTS.md content is always-on for the agent.
function buildAgents(suiteDir, m, outRoot) {
  const block =
    `<!-- BEGIN ${m.name} — generated by scripts/build-prompts.mjs; edit the ` +
    `source in prompts/, not here -->\n` +
    `## ${m.title || m.name}\n\n${selfContained(suiteDir, m)}` +
    `<!-- END ${m.name} -->\n`;
  fs.mkdirSync(outRoot, { recursive: true });
  const dest = path.join(outRoot, `${m.name}.AGENTS.md`);
  fs.writeFileSync(dest, block);
  return { out: dest, files: 1 };
}

// --- target: cursor (.cursor/rules/<name>.mdc) ---------------------------
function buildCursor(suiteDir, m, outRoot) {
  const globs = (m.cursor_globs || []).join(', ');
  const fm =
    `---\ndescription: ${m.description}\nglobs: ${globs}\nalwaysApply: false\n---\n\n`;
  fs.mkdirSync(outRoot, { recursive: true });
  const dest = path.join(outRoot, `${m.name}.mdc`);
  fs.writeFileSync(dest, fm + selfContained(suiteDir, m));
  return { out: dest, files: 1 };
}

const BUILDERS = { skill: buildSkill, agents: buildAgents, cursor: buildCursor };

// --- main ----------------------------------------------------------------
function main() {
  const args = process.argv.slice(2);
  const suite = args.find((a) => !a.startsWith('--'));
  const ti = args.indexOf('--target');
  const targetFlag = ti >= 0 ? (args[ti + 1] || '').trim() : '';
  if (!suite) {
    console.error('usage: node scripts/build-prompts.mjs <suite> [--target skill]');
    process.exit(2);
  }

  const suiteDir = path.join(REPO, 'prompts', suite);
  const manifestPath = path.join(suiteDir, 'manifest.yml');
  if (!fs.existsSync(manifestPath)) {
    console.error(`no manifest: ${path.relative(REPO, manifestPath)}`);
    process.exit(2);
  }
  const m = parseManifest(fs.readFileSync(manifestPath, 'utf8'));
  const outRoot = path.join(suiteDir, '.build');
  fs.mkdirSync(outRoot, { recursive: true });

  const targets = targetFlag ? [targetFlag] : (m.targets || []);
  if (targets.length === 0) {
    console.error('no targets (pass --target or set `targets:` in manifest.yml)');
    process.exit(2);
  }

  let failed = false;
  for (const t of targets) {
    const builder = BUILDERS[t];
    if (!builder) {
      console.error(`! target "${t}" not implemented yet — skipping`);
      continue;
    }
    const missing = checkRequired(t, m);
    if (missing.length) {
      // The "ask on missing" gate: do not guess a default — surface the gap.
      console.error(
        `! target "${t}" needs these manifest fields, which are missing: ` +
          `${missing.join(', ')}\n  Add them to ${path.relative(REPO, manifestPath)} and rebuild.`
      );
      failed = true;
      continue;
    }
    const res = builder(suiteDir, m, outRoot);
    console.log(
      `✓ ${t}: ${path.relative(REPO, res.out)} (${res.files} file${res.files === 1 ? '' : 's'})`
    );
  }
  if (failed) process.exit(1);
}

main();
