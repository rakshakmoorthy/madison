#!/usr/bin/env node
// build-deck.mjs
// Render a slide spec (Markdown) into a self-contained, brutalist HTML/D3 slide
// deck: keyboard navigation, speaker-notes toggle, 30pt+ assertion-headline
// layout, dark/light, and print-to-PDF (one slide per page) for submission.
//
// Spec format (Markdown), slides separated by a line containing only `---`:
//
//   # Assertion headline — a CLAIM, <= ~12 words
//   body markdown or raw HTML (one visual / a few points; not a wall of text)
//   NOTES:
//   speaker notes (everything after a line that is exactly NOTES:)
//
// Usage: node scripts/build-deck.mjs deck.md [--out deck.html] [--accent "#C8102E"]
//
// The renderer is deterministic. The CONTENT decisions (claim vs label, what the
// visual is, what to cut) are the human/LLM's — see prompts/slides-deck/.

import fs from 'node:fs';
import path from 'node:path';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) =>
  s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
   .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
   .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
   .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
   .replace(/`([^`]+)`/g, '<code>$1</code>');

// Tiny block-Markdown → HTML. Raw HTML lines (starting with <) pass through.
function md(src) {
  const out = [];
  let list = null; // 'ul' | 'ol'
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  for (const raw of src.split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim()) { closeList(); continue; }
    if (line.trimStart().startsWith('<')) { closeList(); out.push(line); continue; }
    let m;
    if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      if (list !== 'ul') { closeList(); out.push('<ul>'); list = 'ul'; }
      out.push(`<li>${inline(esc(m[1]))}</li>`); continue;
    }
    if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) {
      if (list !== 'ol') { closeList(); out.push('<ol>'); list = 'ol'; }
      out.push(`<li>${inline(esc(m[1]))}</li>`); continue;
    }
    closeList();
    if ((m = line.match(/^(#{2,4})\s+(.*)$/))) { const n = m[1].length; out.push(`<h${n}>${inline(esc(m[2]))}</h${n}>`); continue; }
    if ((m = line.match(/^>\s+(.*)$/))) { out.push(`<blockquote>${inline(esc(m[1]))}</blockquote>`); continue; }
    out.push(`<p>${inline(esc(line))}</p>`);
  }
  closeList();
  return out.join('\n');
}

function parse(spec) {
  return spec.split(/^\s*---\s*$/m).map((block) => {
    const t = block.trim();
    if (!t) return null;
    const [bodyPart, ...noteParts] = t.split(/^\s*NOTES:\s*$/m);
    const lines = bodyPart.trim().split('\n');
    let headline = '';
    if (lines[0] && /^#\s+/.test(lines[0])) headline = lines.shift().replace(/^#\s+/, '').trim();
    return { headline, body: md(lines.join('\n').trim()), notes: md(noteParts.join('\n').trim()) };
  }).filter(Boolean);
}

const PAGE = (title, accent, slidesHtml, count) => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
<style>
  :root{ --bg:#fff; --ink:#111; --muted:#666; --line:#e3e3e3; --accent:${accent}; }
  @media (prefers-color-scheme:dark){ :root{ --bg:#0f0f0f; --ink:#f0f0f0; --muted:#9a9a9a; --line:#262626; } }
  *{ box-sizing:border-box; } html,body{ margin:0; height:100%; }
  body{ background:var(--bg); color:var(--ink); font:400 24px/1.4 -apple-system,system-ui,"Segoe UI",Roboto,sans-serif; }
  .deck{ height:100vh; display:flex; align-items:center; justify-content:center; }
  .slide{ display:none; width:min(1100px,92vw); padding:4vmin; }
  .slide.on{ display:block; }
  .slide h1{ font-size:clamp(30px,5.2vw,60px); line-height:1.08; letter-spacing:-.01em; margin:0 0 .6em; font-weight:800; }
  .slide :is(p,li){ font-size:clamp(22px,2.4vw,30px); }   /* 30pt-minimum spirit */
  .slide h2{ font-size:clamp(24px,3vw,36px); } .slide h3{ font-size:clamp(22px,2.6vw,30px); }
  .slide ul,.slide ol{ margin:.2em 0 .2em 1.1em; } .slide li{ margin:.25em 0; }
  .slide img,.slide svg{ max-width:100%; height:auto; }
  .slide strong{ color:var(--accent); }   /* one accent, used sparingly */
  blockquote{ border-left:4px solid var(--accent); margin:.5em 0; padding:.1em 0 .1em .8em; color:var(--muted); }
  code{ font-family:ui-monospace,Menlo,monospace; font-size:.85em; background:color-mix(in srgb,var(--ink) 8%,transparent); padding:.05em .3em; border-radius:4px; }
  .bar{ position:fixed; bottom:0; left:0; right:0; display:flex; justify-content:space-between; align-items:center;
        padding:.5em 1em; font-size:14px; color:var(--muted); border-top:1px solid var(--line); background:var(--bg); }
  .bar b{ color:var(--accent); }
  .notes{ display:none; position:fixed; bottom:2.6em; left:0; right:0; max-height:38vh; overflow:auto;
          padding:1em 1.4em; border-top:1px solid var(--line); background:var(--bg); color:var(--muted); font-size:18px; }
  .notes.on{ display:block; } .notes :is(p,li){ font-size:18px; }
  @media print{
    .bar,.notes{ display:none !important; }
    .deck{ height:auto; display:block; }
    .slide{ display:block !important; width:100%; min-height:100vh; page-break-after:always; padding:8vmin; }
  }
</style></head>
<body>
  <div class="deck">
${slidesHtml}
  </div>
  <aside class="notes" id="notes"></aside>
  <div class="bar"><span>${esc(title)}</span><span><b id="cur">1</b> / ${count} &nbsp;·&nbsp; ← → move · n notes · f full · p print</span></div>
<script>
  const slides=[...document.querySelectorAll('.slide')], notesEl=document.getElementById('notes'), curEl=document.getElementById('cur');
  let i=Math.max(0,(location.hash.match(/\\d+/)||[1])[0]-1);
  function show(n){ i=Math.max(0,Math.min(slides.length-1,n));
    slides.forEach((s,k)=>s.classList.toggle('on',k===i));
    curEl.textContent=i+1; notesEl.innerHTML=slides[i].dataset.notes||'<em>(no notes)</em>'; location.hash='#'+(i+1); }
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){show(i+1);e.preventDefault();}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){show(i-1);}
    else if(e.key==='n'){notesEl.classList.toggle('on');}
    else if(e.key==='f'){document.documentElement.requestFullscreen?.();}
    else if(e.key==='p'){window.print();}
  });
  show(i);
</script>
</body></html>`;

function main() {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith('--'));
  const oi = args.indexOf('--out'); const ai = args.indexOf('--accent');
  if (!file || !fs.existsSync(file)) { console.error('usage: node scripts/build-deck.mjs deck.md [--out deck.html] [--accent "#C8102E"]'); process.exit(2); }
  const accent = ai >= 0 ? args[ai + 1] : '#C8102E';
  const slides = parse(fs.readFileSync(file, 'utf8'));
  if (!slides.length) { console.error('no slides found (separate with a line: ---)'); process.exit(1); }
  const title = slides[0].headline || path.basename(file);
  const html = slides.map((s) =>
    `    <section class="slide" data-notes="${esc(s.notes).replace(/"/g, '&quot;')}">` +
    (s.headline ? `<h1>${inline(esc(s.headline))}</h1>` : '') + s.body + `</section>`
  ).join('\n');
  const out = oi >= 0 ? args[oi + 1] : file.replace(/\.md$/i, '') + '.html';
  fs.writeFileSync(out, PAGE(title, accent, html, slides.length));
  console.log(`✓ deck: ${out} — ${slides.length} slides (open in a browser; press p to print/PDF)`);
}
main();
