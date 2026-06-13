# Doodle.md

## Purpose

Every doodle communicates **one clear instructional idea** through a hand-drawn visual that a learner could sketch themselves in 60 seconds.

---

## Visual Style

### Line Quality

- Default: **loose, hand-drawn, slightly wobbly lines** — not geometric perfection.
- Feel: felt-tip marker or ballpoint pen.
- Avoid: clean vector curves, drop shadows, gradients, photographic textures.
- Variations:
  - **Sketchy** (overlapping, rough): use for brainstorming or "messy reality" concepts.
  - **Clean-ish hand-drawn** (deliberate but imperfect): use for process diagrams and flows.
- All outlines: **black or very dark ink on white or off-white background**.
- Color: one optional accent color per frame. Never more than two colors beyond black/white.

### Level of Detail

- Default: **minimal.** If representable as a simple icon or stick figure, use that.
- Stick figures for people; avoid realistic faces or detailed anatomy.
- Objects recognizable at a glance: a laptop is a rectangle with a hinge.
- Text inside doodle: handwriting-style, short (1–5 words per label), sized for legibility.
- No background scenery unless it directly supports the concept.

### Faces, Humor, Arrows, and Speech Bubbles

- **Faces**: simple stick figure expressions (surprised eyebrows, sweat drop, lightbulb moment) when representing human reaction to a concept. Not for decoration.
- **Humor**: mild, concept-relevant humor is welcome. Avoid stereotype-based jokes or anything that distracts from the learning goal.
- **Arrows**: use generously for direction, causality, sequence, or emphasis. Hand-drawn, slightly curved, with arrowhead. Dashed arrows for "optional" or "might lead to."
- **Speech bubbles**: use for a learner's thought, system output, or short reflective prompt. ≤ 8 words per bubble.

---

## Composition Rules

### Maximum Elements Per Frame

- **Hard cap: 5 visual elements** (objects, figures, labels, and arrows each count as one).
- Exception: sequence/flow diagrams may use up to 7 elements if each step is a single labeled node.
- If a concept requires more, break into a sequence of doodles.
- Every element must earn its place.

### Title and Caption Placement

- **Title**: top-left or top-center, handwriting-style, 4–7 words maximum.
- **Caption** (optional): bottom-center, smaller handwriting, 1 short sentence. Use only when the metaphor needs a brief anchor.
- Do not use both title and caption unless they serve distinct functions.

### Representing Abstract Ideas

| Abstract Concept | Preferred Visual Metaphor |
|---|---|
| Cognitive overload | Stick figure head with smoke, cracks, or overflow arrows |
| Data pipeline / flow | Horizontal tubes or pipes with labeled buckets |
| Trade-off / balance | Simple balance scale with labeled weights |
| Cross-subsidy | Two labeled buckets with an arrow transferring between them |
| Growth / increase | Upward staircase or rising bar drawn with a ruler |
| Complexity | Tangled lines vs. clean untangled lines (before/after) |
| Decision point | Fork in a hand-drawn road or path |
| Learning / insight | Lightbulb above a stick figure head |
| Risk | Stick figure on a tightrope or near a cliff edge |
| System / process loop | Circle of arrows with labeled nodes |

When introducing a new metaphor, state it explicitly in the prompt so it stays consistent across all frames.

---

## Image Prompts

### Prompt Structure

> **[Style declaration] + [Core concept description] + [1–2 concrete objects] + [Simple setting] + [Optional: tone]**

**Style declaration** (always include one):

- "Hand-drawn doodle style, black ink on white background, sketchy line quality, minimal detail…"
- "Whiteboard doodle illustration, marker-style lines, single accent color…"
- "Loose sketch, felt-tip marker style, stick figures and simple icons…"

**Good example:**

> "Hand-drawn doodle style, black ink on white background, sketchy lines. A stick figure standing next to two labeled buckets — one labeled 'Useful Info' (full) and one labeled 'Noise' (overflowing). A large red X over the overflowing bucket. Simple setting, no background detail. Clean, educational tone."

**Bad example:**

> "A person sorting information, showing cognitive load theory, colorful and detailed."

*(No style declaration, no concrete objects, likely to produce a photorealistic or stock-photo result.)*

### What Must Always Be Included

1. **Style declaration** — line quality, color constraint, background.
2. **Core concept** — the single instructional idea (stated in plain language).
3. **1–2 concrete objects** — physical or symbolic objects that carry the metaphor.
4. **Simple setting** — "no background" or minimal implied environment.
5. **Tone note** (recommended) — "educational and clear," "slightly humorous," "calm and organized."

Do not include: more than one conceptual idea, descriptions of clothing/ethnicity/detailed physical features, or requests for photorealistic or 3D styles.

---

## 5-Second Micro-Video

### Purpose

A 5-second doodle micro-video reinforces a single concept through minimal motion. It does **not** introduce new ideas — it animates what the still image already communicates.

### Allowed Motions (one primary motion per clip)

| Motion Type | Use Case |
|---|---|
| Wiggle / pulse | Draw attention to a key element (pulsing arrow, wobbling lightbulb) |
| Slow zoom in | Focus on a detail within the frame |
| Pan (left→right or top→bottom) | Reveal a sequence or process step-by-step |
| Draw-on (line appearing) | Simulate sketching — best for arrows, underlines, or circles |
| One small action | A single object moves (bucket fills, scale tips, stick figure raises hand) |

Do not combine more than one primary motion. No spinning, flashing, or rapid cuts.

### Video Prompt Structure

> **[Starting frame description] + [Camera or object motion] + [End state] + [Duration note]**

**Example — zoom:**

> "Start on a still doodle frame showing two labeled buckets. Over 4 seconds, slowly zoom in on the overflowing bucket labeled 'Noise.' In the final second, a hand-drawn red X slowly draws itself over the bucket. No other movement."

**Example — pan:**

> "Start on the left side of a doodle showing a 3-step pipeline (Step 1 → Step 2 → Step 3). Pan slowly left to right over 5 seconds, revealing each step in sequence. No zoom. No new elements introduced during the pan."

### Don't Add New Concepts in Motion

- The video must show the **same visual content** as the still image — just with motion added.
- No new labels, objects, or ideas introduced mid-animation.
- New concept = new doodle still + new video prompt.
- Motion directs attention; it does not expand content.

### Optional Notes for Animator

Include 1–3 notes such as:

- **Layout guidance**: "The balance scale should be centered; leave empty space on the left for a title card."
- **Emphasis note**: "The arrow between the buckets is the most important element — largest and darkest in the frame."
- **Transition note**: "This clip follows the 'Germane Load' slide; the motion should feel like a natural continuation."
