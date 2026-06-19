# gaps.md — Raksha Krishna Moorthy
The delta between brand/resume.json (what is proven) and brand/brand.yml (what the aspiration demands).
Migration rule: a gap closes ONLY when evidence ships → new resume.json entry → row deleted.
 Required edits completed:
   1. Killed row 3 ("No published writing") — published writing is a voice gap, not a proof gap.
      Brand.yml rule: proof before voice. Revisit after portfolio ships Oct 2026.
  2. Rewrote Plan column for row 2 (Threadline repo) in own words.

| Gap | Evidence the target demands it | What I have | Madison build that would close it | Plan |
|---|---|---|---|---|
| **No public AI PM portfolio with case studies for Stage Zero and Threadline** | AI-native startup hiring managers review portfolio/case studies before phone screen (Product School 2024 PM Hiring Survey). TripSync has a live app (tripsynccapp.lovable.app) but no written PM case study. Stage Zero and Threadline have no public-facing product narrative at all. | TripSync live app exists. Stage Zero and Threadline exist as resume bullets only — no problem-process-outcome documentation a hiring manager can read. | Build a Madison recipe that ingests resume.json project entries and structured artifact notes (PRD, research summary, outcome metrics) and generates a PM case study draft in a consistent format: problem → user insight → decision rationale → shipped outcome → measurable result. Output published to a portfolio site. | Draft TripSync case study by Aug 2026; Stage Zero by Sep 2026; Threadline by Oct 2026. Ship portfolio site by Aug 2026. |
| **Threadline GitHub repo is incomplete and not publicly documented** | AI PM job postings at AI-native companies (Cohere, Scale AI, Hugging Face — sampled June 2026) explicitly expect demonstrated build experience with AI/ML APIs and a GitHub or portfolio link. A repo without a README, architecture diagram, and product framing does not serve as proof. | Threadline code exists in a private/incomplete repo. The pipeline is built but not documented in a way that communicates PM-level thinking to a hiring manager. | Extend the Threadline repo with a Madison-style product brief layer: README with problem statement, architecture diagram, persona summary, and success metrics. This turns an engineering artifact into a PM proof artifact. | Document the four pipeline stages with architecture diagram first — that's what a hiring manager needs to understand what was built. Then add persona summary and sample JSON output. README last. Public by Aug 2026. |
| **No demonstrated AI PM domain knowledge beyond Threadline** | AI-native startup PM roles expect candidates to speak to AI product concepts — evals, RAG architecture, fine-tuning tradeoffs, RLHF — not just pipeline orchestration. Threadline proves n8n + Claude API usage but not product-level AI reasoning. | Threadline demonstrates agentic workflow orchestration and LLM integration. No evidence of product-level reasoning about model selection, eval design, or AI quality tradeoffs in any resume.json entry. | Build a Madison recipe that generates a structured AI product teardown: pick one AI-native product (e.g. Perplexity, Cursor, Glean), analyze its model choices, eval strategy, and UX tradeoffs, and publish as a LinkedIn post or portfolio piece. Each teardown is a proof artifact and a Madison framework contribution. | Complete first AI product teardown by Sep 2026 — first target: Perplexity AI (model selection rationale, eval strategy for answer quality, UX tradeoffs in citation interface). Target publish date: Sep 15, 2026 to LinkedIn. One teardown per month through Dec 2026. |

---

## Assignment 1 Part 2 — Project Proposal (from top gap row)

**Project: Madison PM Portfolio Pipeline**

The most consequential gap between my current record and my target role as an AI PM at an AI-native startup is the absence of a public, PM-native portfolio. Three strong projects exist — TripSync, Stage Zero Health, and Threadline — but none are documented in a format that hiring managers can evaluate before a phone screen. TripSync has a live app but no written case study. Stage Zero and Threadline exist only as resume bullets.

This project builds a Madison recipe that closes that gap as a framework contribution, not just a personal task. The recipe takes two inputs per project: a `resume.json` project entry and a structured artifact note — a PRD section, usability findings, or outcome metrics captured during the build. It maps those fields to a fixed case study schema: problem statement from project context, user insight from research artifacts, decision rationale from the PRD, outcome from attested metrics. Output is a markdown case study draft ready for portfolio publication, generated consistently across any project in the record.

The build is reusable — any PM student in the cohort can run it on their own `brand/` folder. Sequencing constraint: portfolio site ships before case studies. If the site slips past Aug 2026, case study deadlines shift accordingly. Success is defined as three case studies published publicly by October 2026, one hiring manager inbound attributable to a direct portfolio link, and a recipe committed to the Madison repo.

*(Word count: 199)*
