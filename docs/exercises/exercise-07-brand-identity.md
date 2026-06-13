# Exercise Seven — Brand Identity, Conducted

**Course:** INFO 7375 Branding & AI · backs **Assignment 7** (Brand Identity Implementation)
**What you'll build:** the three pillars of A7 — a creative brief, a visual identity system (color, type, logo, style guide), and five website wireframes — by **conducting Nina** (the brand-strategist skill) to write the specs, then **executing the visuals yourself** in Figma / Canva.
**Time:** one working session for the specs; the Figma build is the homework after.
**You need:** the `nina` skill installed, your **Assignment 6** output (`brand.yml` + your final name), and Figma + Canva AI.

The principle this exercise runs on: **a brand identity that could belong to any brand is the visual form of the fluency trap.** It looks designed and says nothing. The common pitfall — "generic visual identity," "a brief that doesn't connect to the design" — is exactly the gap between a polished artifact and a trustworthy one. The discipline that closes it: **every visual choice traces to the brief, and the brief traces to your archetype and your A6 position.** Nina writes the spec; you make the visual call and own it; the trace is what makes the identity *yours* and not a template.

The division of labor is the whole lesson. **Nina does the Tier-1 work** — the brief structure, the palette math, the type pairing, the logo *generation prompts*, the wireframe information architecture. **You do the irreducible work** — picking the logo that's right, curating the inspiration grid, building the frames, and judging whether the whole thing coheres. Don't ask Nina for a finished logo. Ask her for the brief you build from.

---

## Move 0 — Point Nina at your A6 brand

Install the `nina` skill. Open it and paste your A6 foundation so Nina builds *on* your position instead of inventing a new one:

> *Here is my brand.yml from Assignment 6 and my final name: [paste]. We're doing Assignment 7. Start at `/n4`.*

If you skipped A6, run `/n1`→`/n3` first (intake → archetype → personas). Everyone else starts at the brief. (Full command→component map: `prompts/nina/using-nina-for-assignment-7.md`.)

## Move 1 — The creative brief (Component 1)

```
/n4
```

Nina produces the brief in the exact A7 structure: objective · audience (primary/
secondary/tertiary) · UVP · support points · tone & style · competitive positioning ·
success metrics. Then sharpen and voice it:

```
/n5      # score and rewrite the UVP until it's a sentence only you could say
/n6      # voice & tone (IS / IS NOT) — feeds "tone & style"
```

**Your gate:** the UVP and positioning are *your* call. If `/n5` offers three framings, pick one and say why. A brief a competitor could also write is not done.

## Move 2 — Archetype → visual direction

```
/n2      # the archetype that DRIVES the look (this is where "your archetype comes in")
/n7      # visual direction: the three scenes, the metaphor, the visual hard-nos
```

`/n7` is the source of your mood board's *rationale* — every later visual choice will trace back to these scenes and this metaphor. Keep the output; it's the spine of Component 2.

## Move 3 — Color, type, logo (Component 2, the spec)

```
/n8      # 2-3 primary + 2-3 secondary colors: hex + brand-name + rationale + WCAG check; heading/body/accent Google Fonts + rationale
/n9      # 4 logo directions (wordmark/lettermark/icon/combination), each with rationale + weakness, a recommendation, AND four AI-generation prompts
```

**Your gate — this is the human half:** take `/n9`'s four AI prompts into **Canva AI / Adobe Firefly**, generate, and **iterate at least three rounds**. Pick the final and write *why this one, not the others* (the rubric grades the iteration and the rationale, not the pixels). Build `/n8`'s palette and type into your Figma file.

## Move 4 — The style guide (Component 2, the document)

```
/n11
```

Logo usage rules (sizing, clear space, placement), color application, type, component defaults — the style-guide foundation. Start it in Figma; Nina gives you the rules to lay out.

## Move 5 — Wireframes (Component 3)

```
/n10
```

Nina specs the five pages (Home / About / Portfolio / Experience / Contact): each page's job, hero moment, must-have blocks, primary CTA, exit risk; the **user-flow narrative**; and the **Vercel v0 / Framer AI / Wix** platform comparison the assignment requires.

**Your gate:** build the five low-fi frames + the mobile homepage in **Figma** from these specs. Annotate the interactive elements. Nina wrote the IA; the frames are yours.

## Move 6 — Critique, clean, score (before you submit)

```
/n12     # critic mode: find the gaps, not the strengths — esp. coherence and differentiation
/jargon  # strip any jargon from the brief/guide prose
/polish  # clean the PDF prose to client-ready
/ready   # 0-100 readiness score; 80+ = submit. Below 80, it names the two fixes.
```

## Move 7 — Log it

One `logs/RUN_LOG.md` entry: which Nina commands you ran, the archetype you locked, your final logo direction and the one-line reason you chose it over the others, your `/ready` score, and the one design choice you can trace most cleanly back to a line in the brief.

---

## Grading — 25 points

**Mechanics — 20 points, itemized:**

| # | Component | Pts |
|---|---|---|
| 1 | `nina` invoked and fed your A6 `brand.yml` + name (built on, not reinvented) | 1 |
| 2 | Creative brief: all seven fields present, UVP sharpened with `/n5` | 3 |
| 3 | Archetype named (`/n2`) and visibly driving the visual direction (`/n7`) | 2 |
| 4 | Color system: 2–3 primary + 2–3 secondary, each with **hex + rationale + WCAG** | 3 |
| 5 | Typography: heading/body/(accent) **Google Fonts**, each with rationale | 1 |
| 6 | Logo: 4–5 concepts, the AI prompts actually run + **≥3 iteration rounds**, final rationale | 4 |
| 7 | Style-guide foundation (logo rules + color application) started in Figma | 2 |
| 8 | Five wireframes + mobile homepage + user-flow + platform pick, built in Figma | 3 |
| 9 | **Trace audit:** every visual choice points to a brief line / the archetype — no orphan "because it looks nice" | 1 |
| | **Mechanics total** | **20** |

**Glimmer — 5 points, ranked by depth** (relative, capped): does the identity look like *this* brand and no other (the anti-generic test)? Does the brief connect *visibly* to the design that follows — could a stranger predict the palette from the archetype? Could a designer who isn't you build the site from this package without a meeting? Top quartile 4–5 · second 3 · third 2 · bottom 0–1.

---

## What can go wrong

| Symptom | What it means | Fix |
|---|---|---|
| The identity could belong to any brand in any industry | the visuals don't trace to the brief/archetype | run the trace audit — each color, font, logo choice must point to a brief line; cut the orphans |
| You asked Nina for a finished logo | wrong division of labor | Nina writes the *generation prompts*; you generate, iterate, and choose — that judgment is graded |
| The brief is vague | vague brief → vague design | `/n5` until the UVP is a sentence only you could say; specifics in support points |
| Wireframes skip UX thinking | frames without the flow | use `/n10`'s exit-risk + user-flow narrative; annotate what responds to the user |
| Mood board is pretty pictures with no reason | inspiration without rationale | each image gets one sentence tracing it to `/n7`'s scenes/metaphor |

## Before you submit — check it

```bash
node scripts/conformance.mjs <any json/yaml specs you kept>   # well-formed, if you saved specs as files
```

Then run `/ready` (Nina's 0–100 gate — 80+ before you submit) and the **trace audit by hand**: read each visual choice and point to the brief line or archetype it serves. A choice you can't trace is the generic one — fix or cut it. The machine checks well-formedness; whether the identity is *coherent and yours* is the human gate, and it's the whole point. Full guide: `docs/exercises/HOW-TO-CHECK.md`.

**Lifecycle note:** A6 named and positioned the brand; A7 makes it something you can see. Nina is the through-line — `/n1`–`/n5` ran in A6, `/n6`–`/n11` run here — so the identity grows from one strategic root instead of a fresh guess. The thing that separates your deck of this from every other student's is the same thing that's separated every Madison exercise: it can be *traced*. The palette traces to the archetype, the archetype to the position, the position to the attested `brand/`. AI generated the options. You made the calls. The trace is what makes the identity trustworthy — and yours.
