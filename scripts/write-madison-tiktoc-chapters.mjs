import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const root = process.cwd();
const date = "2026-06-14";
const book = basename(root);
const chaptersDir = join(root, "chapters");
const logsDir = join(root, "logs");

mkdirSync(chaptersDir, { recursive: true });
mkdirSync(logsDir, { recursive: true });

const sharedSources = [
  "TIKTOC.md",
  "MYCROFT.md",
  "DOMAIN.md",
  "DATA_CONTRACT.md",
  "docs/data-and-provenance.md",
  "docs/workflows.md",
  "docs/phase-gates.md",
  "reports/generated/entry-mid-branding-advertising-recipes-research.md",
];

const chapters = [
  {
    number: "01",
    slug: "the-fluency-trap",
    title: "The Fluency Trap",
    capability: "Audit fluent brand output before it becomes trusted brand work.",
    artifact: "Claim and assumption table.",
    scenario:
      "A junior strategist pastes an AI-generated campaign brief into the team channel. It has the right headings, a confident audience description, sharp message pillars, and three campaign ideas that sound ready for a client deck. Nobody can point to the survey, interview, competitor page, sales note, or approval record behind the claims. The artifact looks finished precisely because it is fluent.",
    role:
      "Entry and mid-level brand practitioners are often the first people asked to turn vague inputs into polished materials. That makes them the first line of defense against the mistake Madison is built to prevent: confusing finished language with finished work.",
    recipe:
      "Inputs: one AI-generated brief, persona, content plan, or pitch section; known brand sources; any available audience, competitor, and approval records. Steps: split the artifact into individual claims; classify each claim as verified, inferred, unsupported, taste judgment, or approval-needed; trace each verified claim to a source; rewrite unsupported claims as questions or hypotheses; route approval-needed claims to a named owner. Outputs: a claim and assumption table, a short risk memo, and a cleaned draft that no longer hides uncertainty. Gate: no artifact moves downstream until unsupported claims are either removed, sourced, or labeled as assumptions. Log: record source paths, missing evidence, and reviewer decisions.",
    lens:
      "The agent can segment language, suggest claim categories, and propose rewrites. The human must decide whether the claim matters, whether the source is good enough, and whether the brand should say it at all.",
    evidence:
      "Verified: source-backed facts, quoted brand rules, documented approvals. Model judgment: claim classification, risk suggestions, rewrite options. Human judgment: what level of proof is enough for the situation. Out of scope: legal clearance, unless the organization explicitly routes legal review through this workflow.",
    task:
      "Choose one fluent artifact and create a table with columns for claim, claim type, source, evidence status, risk, rewrite, and owner. End with a three-sentence note: what can ship, what needs evidence, and what needs approval.",
    checklist: [
      "Every factual claim has a source path or source URL.",
      "Every inference is labeled as inference.",
      "Every approval-needed statement has an owner.",
      "The revised artifact is less overconfident than the original.",
      "The reviewer can see what changed and why.",
    ],
    human:
      "AI cannot decide that a claim is worth making. It can help expose unsupported language; it cannot accept reputational responsibility for the brand.",
    bridge:
      "Once fluent artifacts have been exposed as mixtures of evidence, inference, and judgment, the next chapter asks where the human's scarce time should move.",
    sources: [
      "prompts/ogilvy/PROVENANCE-CHECK.md",
      "prompts/ogilvy/ogilvy.md",
      "prompts/brandy/brandy.md",
      "prompts/nina/nina.md",
      "pantry/01-the-fluency-trap_notes.md",
      "pantry/_lib_ai-gigo.md",
    ],
    mechanism: "The chapter deep-dives claim segmentation as the mechanism that turns fluent prose into auditable brand work.",
  },
  {
    number: "02",
    slug: "the-reallocation-principle",
    title: "The Reallocation Principle",
    capability: "Move time from rote brand production toward judgment, evidence, approval, and learning.",
    artifact: "Weekly reallocation hypothesis.",
    scenario:
      "A brand team celebrates because AI helped produce twenty social variants in one afternoon. Two days later the team is still arguing about who the audience is, which proof point matters, whether the claim is allowed, and why the campaign exists. Execution accelerated; decision quality did not.",
    role:
      "The practical opportunity for a branding or advertising practitioner is not simply making more things. It is using automation to buy back attention for the decisions that make the work defensible.",
    recipe:
      "Inputs: one week of planned brand work, time estimates, recurring deliverables, known review gates, and pain points. Steps: classify each task as execution, evidence, judgment, approval, or learning; identify tasks AI can assist without removing human judgment; choose one workflow to redesign; define what time will be saved and where that time will be reinvested. Outputs: a weekly reallocation plan and one testable hypothesis. Gate: the plan must name the human decision that improves because AI handled lower-level work. Log: record before/after task allocation and the expected decision benefit.",
    lens:
      "The agent can inventory work and suggest automation candidates. The human must decide which work is identity-bearing, risk-bearing, or relationship-bearing and therefore cannot be delegated.",
    evidence:
      "Verified: calendar records, task lists, workflow docs, logged handoffs. Model judgment: suggested task categories and automation opportunities. Human judgment: which tasks constitute the professional capability the reader is trying to build.",
    task:
      "Write a one-week reallocation plan for a brand workflow. Include a table with task, current time, category, AI assistance, human gate, and reinvested attention.",
    checklist: [
      "The plan distinguishes execution from judgment.",
      "No approval gate disappears.",
      "Saved time is explicitly reinvested.",
      "The hypothesis is testable within one week.",
      "The plan improves a decision, not just output volume.",
    ],
    human:
      "AI cannot decide what work should matter to the organization. That prioritization is strategy, not automation.",
    bridge:
      "A reallocation plan only works if the system knows what counts as evidence. Chapter 3 defines the Madison data contract.",
    sources: [
      "recipes/madison-campaign-construction.md",
      "recipes/madison-performance-reporting.md",
      "recipes/madison-launch-handoff.md",
      "docs/exercises/exercise-05b-build-the-recipe.md",
      "pantry/02-the-reallocation-principle_notes.md",
    ],
    mechanism: "The chapter deep-dives task classification as the mechanism for reallocating effort toward scarce human judgment.",
  },
  {
    number: "03",
    slug: "the-verified-brand-data-contract",
    title: "The Verified Brand Data Contract",
    capability: "Trace brand evidence from source to log to report to decision.",
    artifact: "Provenance note.",
    scenario:
      "A report says the audience is anxious about pricing, the category is shifting toward trust messaging, and the brand should lead with proof. The meeting stalls on a simple question: where did those statements come from?",
    role:
      "Brand practitioners often inherit scattered screenshots, analytics exports, client comments, and draft copy. Madison turns that pile into a contract: what the artifact is, where it came from, how it was transformed, and what it can support.",
    recipe:
      "Inputs: source files, URLs, screenshots, analytics exports, prompts, recipe cards, logs, and report templates. Steps: label each input as raw data, verified data, generated artifact, approval record, or report; connect outputs to sources; record transformations; flag gaps; write a provenance note. Outputs: a source map, a missing-evidence list, and a report-ready provenance paragraph. Gate: no strategic recommendation can cite an artifact unless its source chain is visible. Log: store source paths, run IDs, and unresolved gaps.",
    lens:
      "The agent can extract paths, summarize inputs, and detect missing links. The human decides whether the source is legitimate for the claim being made.",
    evidence:
      "Verified: local files, raw records, cited public pages, approval notes. Model judgment: summaries and suggested source relationships. Human judgment: adequacy of evidence for a business decision. Out of scope: pretending generated text is original evidence.",
    task:
      "Trace one brand claim from a report back to a log, recipe, and source. If the chain breaks, write exactly where it breaks and what would repair it.",
    checklist: [
      "Raw inputs and generated artifacts are not confused.",
      "Every report claim points backward to evidence.",
      "Missing links are named, not smoothed over.",
      "Logs and human reports tell the same story.",
      "The provenance note is short enough to be used in review.",
    ],
    human:
      "AI cannot confer legitimacy on a source by summarizing it. Source adequacy is a human review decision.",
    bridge:
      "Once evidence has a contract, the next problem is recipe design: every workflow has to serve both the agent and the human reviewer.",
    sources: [
      "DATA_CONTRACT.md",
      "docs/data-and-provenance.md",
      "recipes/marketmind.md",
      "logs/marketmind-run.json",
      "logs/marketmind-response.json",
      "reports/templates/marketmind.md",
      "pantry/03-the-verified-brand-data-contract_notes.md",
    ],
    mechanism: "The chapter deep-dives provenance tracing as the mechanism that turns scattered brand inputs into defensible evidence.",
  },
  {
    number: "04",
    slug: "two-customers",
    title: "Two Customers",
    capability: "Read and design recipes for both the executing agent and the human maintainer.",
    artifact: "Two-customer recipe note.",
    scenario:
      "A workflow produces a perfect JSON file that nobody on the brand team knows how to interpret. Another workflow produces a persuasive memo that cannot be rerun or audited. Both fail, but for opposite reasons.",
    role:
      "Practitioners who build AI-assisted brand workflows must serve two audiences at once. The agent needs structure. The human needs meaning, risk, caveats, and decisions.",
    recipe:
      "Inputs: one Madison recipe, its logs, and any human report template. Steps: mark agent instructions, inputs, transformations, output schema, logs, human review fields, decision gates, and maintenance notes; identify which customer is underserved; revise the workflow contract. Outputs: a two-customer note and a repair list. Gate: a recipe is incomplete if either the agent cannot run it or the human cannot judge it. Log: record recipe version, expected outputs, and review owner.",
    lens:
      "The agent can execute the operational path. The human must be able to understand the artifact's purpose, limits, and decision implications.",
    evidence:
      "Verified: recipe text, schemas, logs, report templates, documented gates. Model judgment: suggestions about missing fields. Human judgment: whether the workflow is maintainable under real team conditions.",
    task:
      "Annotate one Madison recipe in two colors or two columns: agent customer and human customer. Then write the smallest change that would improve the weaker side.",
    checklist: [
      "Inputs and outputs are explicit.",
      "The human review point is visible.",
      "The machine-readable output can be tied to the human report.",
      "A future maintainer could rerun the recipe.",
      "The recipe names what it refuses to decide.",
    ],
    human:
      "AI cannot decide what counts as a useful maintenance surface for a team. That depends on the people, cadence, risk, and institutional memory around the workflow.",
    bridge:
      "A recipe can serve both customers and still overclaim. Chapter 5 turns to evidence limits.",
    sources: [
      "recipes/marketmind.md",
      "recipes/content-agent.md",
      "reports/templates/content-agent.md",
      "logs/content-agent-alerts.json",
      "docs/operations.md",
      "pantry/04-two-customers_notes.md",
    ],
    mechanism: "The chapter deep-dives dual-audience recipe annotation as the mechanism for making automation maintainable.",
  },
  {
    number: "05",
    slug: "verifying-brand-evidence",
    title: "Verifying Brand Evidence",
    capability: "State what evidence can support, suggest, or not support.",
    artifact: "Warranted-verb list.",
    scenario:
      "A competitor scan is sourced, a survey export is real, and a sentiment digest has timestamps. The team still should not say the market has changed, the audience prefers one message, or the campaign caused a lift without asking what the evidence actually warrants.",
    role:
      "Brand and advertising work is full of partial evidence. The professional move is not to demand perfect certainty. It is to use precise verbs that match the evidence.",
    recipe:
      "Inputs: one evidence set, source map, known methods, timestamps, and proposed claims. Steps: inspect coverage, recency, source quality, method fit, sample limits, missing alternatives, and model-judgment fields; assign warranted verbs; rewrite conclusions. Outputs: can say, can suggest, cannot claim, and needs review lists. Gate: recommendations cannot use stronger verbs than the evidence permits. Log: capture evidence limits and reviewer overrides.",
    lens:
      "The agent can surface weaknesses and propose cautious language. The human must decide whether the evidence is sufficient for action in context.",
    evidence:
      "Verified: source existence, timestamp, method description, raw field values. Model judgment: sentiment labels, theme clusters, inferred intent. Human judgment: strategic relevance and acceptable uncertainty.",
    task:
      "Choose one evidence set and write four lists: can say, can suggest, cannot claim, and needs human review. Then revise one paragraph of analysis using only warranted verbs.",
    checklist: [
      "Coverage and recency are addressed.",
      "Model judgments are labeled.",
      "Causal language is avoided unless supported.",
      "Every strong recommendation has a matching evidence basis.",
      "Uncertainty is specific rather than vague.",
    ],
    human:
      "AI cannot know whether a weak signal is still enough for a local decision. That is a contextual risk judgment.",
    bridge:
      "The next chapter applies warranted verbs to a common brand workflow: competitor signal scanning.",
    sources: [
      "docs/exercises/HOW-TO-CHECK.md",
      "docs/exercises/exercise-03-gather-validate-defend.md",
      "prompts/_shared/competitive-method.md",
      "scripts/conformance.mjs",
      "pantry/05-verifying-brand-evidence_notes.md",
      "pantry/_lib_math-how-to-lie-with-statistics.md",
    ],
    mechanism: "The chapter deep-dives warranted-verb assignment as the mechanism for preventing evidence overreach.",
  },
  {
    number: "06",
    slug: "competitor-signal-scan",
    title: "Competitor Signal Scan",
    capability: "Compare competitor signals without turning observations into unsupported strategy.",
    artifact: "Competitor matrix.",
    scenario:
      "A client asks, 'What are our competitors doing?' The first draft answers with vibes: premium, youthful, disruptive, trustworthy. The team needs something better: named sources, observed claims, channels, timestamps, contradictions, and a careful 'so what.'",
    role:
      "Competitor scans are common entry-level assignments because they look simple. Madison makes them rigorous enough to support creative and strategic work without pretending public messaging reveals the whole market.",
    recipe:
      "Inputs: competitor set, category terms, source list, date range, and brand question. Steps: capture sources; extract positioning, claims, CTAs, proof, audience signals, channel choices, and tone; flag contradictions; compare patterns; write human-review notes. Outputs: competitor matrix, source appendix, and cautious implication memo. Gate: strategy recommendations must be labeled separately from observations. Log: competitor names, URLs or paths, timestamps, and extraction notes.",
    lens:
      "The agent can gather and normalize visible signals. The human decides which competitors matter and what the comparison means for the brand's choices.",
    evidence:
      "Verified: captured public pages, ads, screenshots, and dated source notes. Model judgment: tone labels, message clusters, inferred audience. Human judgment: category relevance, strategic interpretation, and priority.",
    task:
      "Build a competitor matrix for three to five competitors. Columns should include source, date, claim, proof offered, CTA, audience signal, tone label, contradiction, and human-review note.",
    checklist: [
      "The competitor set is explicit.",
      "Every observation has a source and date.",
      "Tone and audience inferences are labeled.",
      "The matrix separates observation from implication.",
      "Contradictions are preserved rather than averaged away.",
    ],
    human:
      "AI cannot decide which competitor should define the frame of comparison. That choice depends on strategy, market context, and business stakes.",
    bridge:
      "Competitor signals become useful when they feed a brief. Chapter 7 turns the evidence into a creative brief without hiding assumptions.",
    sources: [
      "recipes/madison-competitive-positioning-agent.md",
      "recipes/marketmind.md",
      "recipes/madison-martech-product-positioning-signal-agent.md",
      "prompts/_shared/competitive-method.md",
      "chapters/principles-marketing/08-marketing-research-and-market-intelligence.md",
      "pantry/06-competitor-signal-scan_notes.md",
    ],
    mechanism: "The chapter deep-dives source-bound matrix comparison as the mechanism for turning competitor watching into usable intelligence.",
  },
  {
    number: "07",
    slug: "the-creative-brief-builder",
    title: "The Creative Brief Builder",
    capability: "Build an evidence-bound creative brief with visible assumptions and approval status.",
    artifact: "Creative brief plus assumption register.",
    scenario:
      "The team has research notes, competitor observations, a loose audience idea, and pressure to start making assets. Someone opens a brief template. The danger is that blank fields invite confident invention.",
    role:
      "A creative brief is one of the most important handoff artifacts in brand and advertising work. Madison treats it as a decision surface, not a decorative template.",
    recipe:
      "Inputs: objective, audience evidence, competitor scan, claim/proof candidates, brand rules, constraints, and open questions. Steps: draft each brief field; label the field as confirmed, inferred, unknown, or approval-needed; list assumptions; route unresolved decisions. Outputs: brief draft, assumption register, and approval gate. Gate: no downstream asset work treats inferred fields as approved strategy. Log: source paths, assumption IDs, and approver names.",
    lens:
      "The agent can assemble, format, and pressure-test the brief. The human must choose the strategic tension, single-minded proposition, and acceptable risk.",
    evidence:
      "Verified: approved objectives, source-backed support points, brand rules. Model judgment: suggested tensions, tone options, creative territories. Human judgment: strategic choice, taste, and final approval.",
    task:
      "Write a one-page brief for your running project. Add an assumption register below it with each inferred or unknown field and a proposed way to resolve it.",
    checklist: [
      "Every brief field has a status label.",
      "The audience statement points to evidence.",
      "The proposition does not outrun the proof.",
      "Mandatories and constraints are visible.",
      "Approval status is clear before asset generation.",
    ],
    human:
      "AI cannot approve a strategy. It can draft options, but the commitment to one direction belongs to the accountable team.",
    bridge:
      "A brief says what the work is trying to do. Chapter 8 defines how the team will know whether the work is working.",
    sources: [
      "recipes/madison-campaign-construction.md",
      "docs/exercises/exercise-05-conductor-brief.md",
      "prompts/nina/nina.md",
      "prompts/madison-pitch/madison-pitch.md",
      "chapters/branding-and-ai/04-product-requirements-and-scope.md",
      "pantry/07-the-creative-brief-builder_notes.md",
    ],
    mechanism: "The chapter deep-dives status-labeled brief assembly as the mechanism for preventing templates from becoming strategy theater.",
  },
  {
    number: "08",
    slug: "measurement-plan-and-kpi-map",
    title: "Measurement Plan and KPI Map",
    capability: "Define metrics, sources, baselines, cadence, and decision use before reporting.",
    artifact: "KPI map.",
    scenario:
      "The campaign is live and the report is due tomorrow. The team has impressions, clicks, comments, survey snippets, and a few screenshots. Nobody agreed in advance which metric would indicate success, what baseline mattered, or what decision the report should support.",
    role:
      "Entry and mid-level practitioners often prepare reports. The work becomes more valuable when they help define measurement before the report exists.",
    recipe:
      "Inputs: campaign objective, funnel or journey stage, available data sources, metric definitions, baseline records, target, cadence, and decision owner. Steps: map each objective to a metric; define numerator and denominator where needed; identify source and freshness; record baseline status; state the decision the metric will inform. Outputs: KPI map, missing-data list, and sign-off field. Gate: performance reporting cannot begin until metric definitions are explicit. Log: source, extraction cadence, and baseline assumptions.",
    lens:
      "The agent can suggest metrics and format the map. The human must decide which measures are meaningful for the business question.",
    evidence:
      "Verified: exported metrics, source systems, documented baselines, approved objectives. Model judgment: metric suggestions and interpretation prompts. Human judgment: decision relevance and acceptable proxy measures.",
    task:
      "Create a KPI map with columns for objective, metric, definition, source, baseline, target, cadence, decision use, owner, and sign-off.",
    checklist: [
      "Each metric has a definition.",
      "Every source is named.",
      "Baselines are present or flagged as missing.",
      "The map distinguishes outcome, leading, and diagnostic metrics where useful.",
      "Every metric has a decision use.",
    ],
    human:
      "AI cannot decide what the organization should optimize for. Metrics encode priorities, and priorities are human decisions.",
    bridge:
      "Metrics are one proof source among many. Chapter 9 turns to claims and the proof burden behind brand language.",
    sources: [
      "recipes/madison-performance-reporting.md",
      "recipes/survey-analysis.md",
      "logs/survey-analysis-outputs.json",
      "reports/templates/survey-analysis.md",
      "chapters/principles-marketing/03-strategic-planning-in-marketing.md",
      "pantry/08-measurement-plan-and-kpi-map_notes.md",
      "pantry/_lib_math-how-to-measure-anything-finding-the-value-of-intangibles-in-business.md",
    ],
    mechanism: "The chapter deep-dives metric-definition mapping as the mechanism for turning reporting into decision support.",
  },
  {
    number: "09",
    slug: "claims-and-proof-map",
    title: "Claims and Proof Map",
    capability: "Map brand claims to proof, risk, rewrites, and approval owners.",
    artifact: "Claims/proof table.",
    scenario:
      "A landing page says the product is trusted, faster, more intuitive, and built for modern teams. The copy is not obviously bad. The problem is that four different kinds of claim are hiding inside one smooth paragraph.",
    role:
      "Copy review is not just polish. It is a risk and evidence practice. Junior brand and advertising people can create enormous value by making claims auditable before they reach a client, customer, or public channel.",
    recipe:
      "Inputs: draft copy, deck, landing page, email, or ad; available proof; brand rules; approval standards. Steps: extract claims line by line; classify factual claim, comparative claim, credential claim, performance claim, audience claim, puffery, or opinion; attach proof; assess risk; rewrite; assign owner. Outputs: claims/proof table and a cleaned draft. Gate: high-risk or unsupported claims cannot move forward without source, rewrite, or approval. Log: original claim, source, change, and reviewer decision.",
    lens:
      "The agent can extract claims and suggest cautious rewrites. The human must decide whether the brand should make the claim and who must approve it.",
    evidence:
      "Verified: source documents, metrics, testimonials, screenshots, approved boilerplate. Model judgment: claim classification and rewrite suggestions. Human judgment: risk tolerance, brand fit, and final copy approval.",
    task:
      "Audit one page or deck section. Produce a claims/proof table with columns for original claim, type, proof, risk, rewrite, approval owner, and status.",
    checklist: [
      "Every claim is isolated.",
      "Comparative and performance claims receive extra scrutiny.",
      "Unsupported claims are rewritten or removed.",
      "Approval owners are named.",
      "The cleaned copy is still useful, not merely timid.",
    ],
    human:
      "AI cannot take responsibility for the consequences of a public claim. It can help make the proof burden visible.",
    bridge:
      "Claims need audiences. Chapter 10 builds audience personas from evidence rather than imagination.",
    sources: [
      "prompts/ogilvy/PROVENANCE-CHECK.md",
      "prompts/_shared/cleanup-standard.md",
      "prompts/_shared/destination-language.md",
      "prompts/_shared/jargon-audit.md",
      "prompts/madison-pitch/madison-pitch.md",
      "pantry/09-claims-and-proof-map_notes.md",
      "pantry/_lib_prompts-direct-response-copywriting-and-platform-content-coach.md",
    ],
    mechanism: "The chapter deep-dives claim extraction and proof attachment as the mechanism for making copy review accountable.",
  },
  {
    number: "10",
    slug: "audience-persona-evidence-synthesis",
    title: "Audience Persona Evidence Synthesis",
    capability: "Build personas and audience briefs from evidence rather than demographic fiction.",
    artifact: "Persona evidence sheet.",
    scenario:
      "The deck introduces 'Busy Beth,' a 34-year-old manager who values efficiency, authenticity, and innovation. No interview, survey, review, support ticket, or analytics record supports the description. The persona is vivid enough to be remembered and empty enough to mislead.",
    role:
      "Audience work is central to brand practice, but it becomes dangerous when invented details harden into strategy. Madison keeps personas useful by binding them to evidence and inference labels.",
    recipe:
      "Inputs: interviews, surveys, reviews, CRM notes, support tickets, analytics, social comments, public signals, and existing segmentation. Steps: extract evidence rows; cluster needs, pains, triggers, objections, and contexts; label confirmed facts and inferences; record contradictions; exclude unsupported traits. Outputs: persona evidence sheet and short audience brief. Gate: persona statements without source or inference label are removed. Log: evidence rows, excluded assumptions, and reviewer decisions.",
    lens:
      "The agent can cluster evidence and draft persona language. The human must reject stereotypes, decide which segment matters, and judge what is actionable.",
    evidence:
      "Verified: cited records and observed audience language. Model judgment: clusters, themes, and suggested persona phrasing. Human judgment: segment priority, ethical representation, and strategic relevance.",
    task:
      "Create a persona evidence sheet with rows for evidence, source, audience need, inference, confidence, contradiction, and excluded assumption. Then write a short persona brief from only the supported material.",
    checklist: [
      "Every persona statement has a source or inference label.",
      "Contradictions are preserved.",
      "Demographic details are only included when useful and sourced.",
      "Unsupported psychographics are removed.",
      "The persona informs a real decision.",
    ],
    human:
      "AI cannot decide whether an audience representation is fair, useful, or respectful. That is professional judgment.",
    bridge:
      "Audience evidence and claim proof now flow into planning. Chapter 11 builds a content calendar that preserves why each post exists.",
    sources: [
      "recipes/madison-persona-generation.md",
      "recipes/madison-audience-definition.md",
      "prompts/nina/nina.md",
      "docs/exercises/exercise-01-brand-personal-layer.md",
      "chapters/principles-marketing/07-market-segmentation-targeting-and-positioning.md",
      "pantry/10-audience-persona-evidence-synthesis_notes.md",
    ],
    mechanism: "The chapter deep-dives evidence-row synthesis as the mechanism for making personas useful without inventing people.",
  },
  {
    number: "11",
    slug: "content-calendar-with-provenance",
    title: "Content Calendar With Provenance",
    capability: "Build a content calendar that preserves source, purpose, owner, approval, and risk.",
    artifact: "Content calendar.",
    scenario:
      "The calendar has thirty posts, cheerful captions, and channel labels. What it does not have is the reason each post exists, the claim it depends on, the audience it serves, the proof it uses, or the person who can approve it.",
    role:
      "Content calendars are everyday operational artifacts. Madison turns them from volume trackers into evidence-aware coordination tools.",
    recipe:
      "Inputs: creative brief, audience evidence, claims/proof map, campaign priorities, channels, assets, owners, and approval rules. Steps: generate candidate rows; attach each row to audience, message pillar, proof, CTA, asset, owner, and approval status; flag risk; remove rows with no strategic purpose. Outputs: two-week or one-month calendar with provenance. Gate: no row is publish-ready without owner, proof, and approval status. Log: row ID, source, approval state, and changes.",
    lens:
      "The agent can propose posts and populate calendar fields. The human must decide whether the calendar expresses the strategy and whether the risk is acceptable.",
    evidence:
      "Verified: brief fields, proof map entries, approved assets, channel specs. Model judgment: topic suggestions, caption drafts, channel fit. Human judgment: priority, taste, timing, and approval.",
    task:
      "Build a two-week calendar for your running project. Required columns: date, channel, audience, message pillar, source/proof, asset, owner, CTA, risk, approval status.",
    checklist: [
      "Every row has a purpose.",
      "Every claim points to proof or is rewritten.",
      "Owners and approval status are visible.",
      "Risk flags are not hidden.",
      "The calendar can be revised when evidence changes.",
    ],
    human:
      "AI cannot decide what a brand should choose to say in public at a particular moment. It can help organize options.",
    bridge:
      "Planned content still needs quality control. Chapter 12 audits voice and consistency across touchpoints.",
    sources: [
      "recipes/content-agent.md",
      "logs/content-agent-prompt.json",
      "logs/content-agent-alerts.json",
      "reports/templates/content-agent.md",
      "docs/exercises/exercise-10-substack-platform.md",
      "chapters/principles-marketing/19-direct-online-social-media-and-mobile-marketing.md",
      "pantry/11-content-calendar-with-provenance_notes.md",
    ],
    mechanism: "The chapter deep-dives provenance-aware calendar rows as the mechanism for making content planning accountable.",
  },
  {
    number: "12",
    slug: "brand-consistency-and-voice-qa",
    title: "Brand Consistency and Voice QA",
    capability: "Audit brand consistency and voice without reducing the brand to sameness.",
    artifact: "Touchpoint QA matrix.",
    scenario:
      "A website, email, ad, and deck all sound like they came from different companies. A quick AI pass makes them more similar, but also removes the texture that made the strongest touchpoint work. Consistency improved; brand judgment got worse.",
    role:
      "Brand practitioners need to catch contradictions, off-brand claims, accessibility problems, and voice drift while preserving intentional variation across channels.",
    recipe:
      "Inputs: brand rules, voice guide, sample touchpoints, claims/proof map, accessibility requirements, and review criteria. Steps: inspect each touchpoint for rule alignment, claim support, tone, jargon, accessibility, contradictions, and channel fit; assign severity; recommend action; capture human decision. Outputs: touchpoint QA matrix and revised guidance. Gate: severe issues block launch until owner decision. Log: touchpoint, issue, severity, recommendation, decision.",
    lens:
      "The agent can compare language to rules and surface likely inconsistencies. The human must decide whether difference is a defect or an intentional adaptation.",
    evidence:
      "Verified: brand rules, source copy, contrast checks, documented claims. Model judgment: voice labels and consistency suggestions. Human judgment: taste, context, acceptable variation, and final decision.",
    task:
      "Audit three touchpoints. Create a matrix with columns for touchpoint, rule reference, issue, evidence, severity, recommendation, owner, and decision.",
    checklist: [
      "Brand rules are cited.",
      "Voice comments point to specific lines.",
      "Accessibility issues are included.",
      "The matrix distinguishes contradiction from useful variation.",
      "Human decisions are recorded.",
    ],
    human:
      "AI cannot own taste. It can identify patterns, but brand voice requires accountable aesthetic and strategic judgment.",
    bridge:
      "QA prepares artifacts for release. Chapter 13 asks whether the campaign is actually ready to launch.",
    sources: [
      "prompts/brandy/brandy.md",
      "docs/brandy-vs-assignment6-fit.md",
      "recipes/madison-brand-consistency-contradiction-checker.md",
      "recipes/madison-qa-accessibility-audit.md",
      "scripts/contrast-check.mjs",
      "pantry/12-brand-consistency-and-voice-qa_notes.md",
    ],
    mechanism: "The chapter deep-dives touchpoint-matrix QA as the mechanism for balancing consistency, evidence, accessibility, and taste.",
  },
  {
    number: "13",
    slug: "launch-readiness-and-trafficking-qa",
    title: "Launch Readiness and Trafficking QA",
    capability: "Build a launch readiness pack with blockers, owners, specs, approvals, and go/no-go status.",
    artifact: "Trafficking QA pack.",
    scenario:
      "The campaign is 'basically ready.' The assets are in three folders, one UTM is missing, the landing page screenshot is stale, the proof claim changed yesterday, and nobody knows who can give final approval.",
    role:
      "Launch and trafficking work is operational, but it is not low-status. It is where brand promises become public artifacts, and where small errors become visible.",
    recipe:
      "Inputs: asset list, specs, URLs, UTM plan, landing pages, claims/proof map, approvals, disclosures, screenshots, owners, and deadline. Steps: verify each asset; check specs and links; confirm tracking; compare claims to proof; capture approvals; name blockers; assign owners; record go/no-go. Outputs: launch readiness pack and blocker list. Gate: public release requires named approver and no unresolved critical blockers. Log: checklist state, owner, evidence path, and decision.",
    lens:
      "The agent can check completeness and produce a preflight table. The human must decide whether remaining risk is acceptable for launch.",
    evidence:
      "Verified: asset files, URLs, screenshots, specs, approval records, UTM strings. Model judgment: likely blocker severity and checklist suggestions. Human judgment: go/no-go decision.",
    task:
      "Create a launch readiness pack for one campaign or touchpoint. Include asset inventory, URL/tracking check, claim check, accessibility check, approval record, blockers, owners, and final status.",
    checklist: [
      "Assets and specs are complete.",
      "Links and tracking are checked.",
      "Claims still match proof.",
      "Approvals are named.",
      "Blockers have owners and severity.",
    ],
    human:
      "AI cannot press launch for the organization. Release is an accountable decision.",
    bridge:
      "A launch with measurement in place creates the conditions for useful reporting. Chapter 14 turns live data into a performance readout.",
    sources: [
      "recipes/madison-launch-handoff.md",
      "recipes/madison-pre-launch-simulation.md",
      "recipes/madison-qa-accessibility-audit.md",
      "docs/exercises/exercise-05a-wrap-your-tool.md",
      "templates/wrap-your-tool/CLAUDE.md",
      "pantry/13-launch-readiness-and-trafficking-qa_notes.md",
    ],
    mechanism: "The chapter deep-dives blocker-based preflight as the mechanism for moving from draft assets to accountable release.",
  },
  {
    number: "14",
    slug: "campaign-performance-report",
    title: "Campaign Performance Report",
    capability: "Produce campaign reporting that supports decisions rather than metric theater.",
    artifact: "Performance readout.",
    scenario:
      "The report has charts, percentages, and a confident recommendation. It does not say where the data came from, how the metrics were defined, what baseline matters, which changes are noise, or what decision the reader should make.",
    role:
      "Performance reporting is one of the places where a practitioner can move from production support to decision support. Madison makes the chain from raw export to recommendation visible.",
    recipe:
      "Inputs: KPI map, raw exports, source definitions, campaign dates, baseline, target, caveats, and decision question. Steps: verify metrics; compare against baseline and target; label description, interpretation, and recommendation; identify limitations; propose next test. Outputs: performance readout, machine-readable metric log, and human-review field. Gate: no causal claim unless the evidence design supports it. Log: source files, transformations, caveats, and reviewer decisions.",
    lens:
      "The agent can assemble tables, find anomalies, and draft summaries. The human must decide what the numbers mean for the brand and what action follows.",
    evidence:
      "Verified: raw exports, metric definitions, timestamps, source systems. Model judgment: anomaly detection, summary language, suggested next tests. Human judgment: causality, business relevance, and recommendation priority.",
    task:
      "Build a performance readout from one metrics export or sample log. Include objective, metric, result, baseline, interpretation label, caveat, and next-test recommendation.",
    checklist: [
      "Metrics match the KPI map.",
      "Sources and dates are visible.",
      "Causal language is avoided unless warranted.",
      "Caveats are included near conclusions.",
      "The report ends with a decision or next test.",
    ],
    human:
      "AI cannot decide whether a metric is strategically meaningful. It can calculate and summarize; it cannot own the business interpretation.",
    bridge:
      "Performance is one public signal. Chapter 15 widens the lens to media coverage, reputation, and issue routing.",
    sources: [
      "recipes/madison-performance-reporting.md",
      "recipes/survey-analysis.md",
      "recipes/intelligence-agent.md",
      "logs/intelligence-agent-reports.json",
      "logs/survey-analysis-outputs.json",
      "reports/templates/intelligence-agent.md",
      "pantry/14-campaign-performance-report_notes.md",
    ],
    mechanism: "The chapter deep-dives interpretation labeling as the mechanism for separating data description from decision recommendation.",
  },
  {
    number: "15",
    slug: "media-coverage-and-issue-routing",
    title: "Media Coverage and Issue Routing",
    capability: "Route public signals without turning monitoring into an auto-response bot.",
    artifact: "Issue-routing digest.",
    scenario:
      "A monitoring workflow finds a negative mention, a confusing product review, a press item, and a social post with rising engagement. The tempting move is to generate a response. The safer move is to route the issue.",
    role:
      "Brand teams need speed, but public response carries reputational risk. Entry and mid-level practitioners can help by turning noisy signals into clear escalation choices.",
    recipe:
      "Inputs: mentions, clips, reviews, social posts, timestamps, source links, issue taxonomy, severity rules, owners, and response policy. Steps: capture sources; classify issue type; label sentiment as model judgment; assign severity; recommend route; identify response gate; draft optional holding language. Outputs: issue-routing digest and escalation list. Gate: no public response ships without human approval. Log: source, class, severity, owner, and decision.",
    lens:
      "The agent can monitor, cluster, classify, and summarize. The human must decide whether, how, and when the brand responds.",
    evidence:
      "Verified: captured public mentions, source URLs, timestamps. Model judgment: sentiment, issue class, urgency suggestions. Human judgment: severity, stakeholder sensitivity, and response approval.",
    task:
      "Create an issue-routing digest from five to ten public signals. Include source, date, issue class, sentiment label, severity, owner, recommended action, and response gate.",
    checklist: [
      "Every signal has a source and timestamp.",
      "Sentiment is labeled as model judgment.",
      "Severity rules are explicit.",
      "Owners and escalation paths are named.",
      "No response is treated as automatic.",
    ],
    human:
      "AI cannot speak for the brand in a live public situation. It can prepare options for accountable people.",
    bridge:
      "The final chapter integrates the pieces into one bounded Madison run.",
    sources: [
      "recipes/brand-reputation-news-intelligence-pipeline.md",
      "recipes/madison-brand-news-reputation-monitor.md",
      "recipes/madison-brand-sentiment-monitor.md",
      "recipes/social-media-marketing-rss-monitor.md",
      "recipes/madison-category-sentiment-dashboard.md",
      "pantry/15-media-coverage-and-issue-routing_notes.md",
    ],
    mechanism: "The chapter deep-dives routed escalation as the mechanism for making monitoring useful without automating public judgment.",
  },
  {
    number: "16",
    slug: "the-build-and-the-honest-run",
    title: "The Build and the Honest Run",
    capability: "Operate a full Madison recipe run with logs, report, evidence appendix, and gate decisions.",
    artifact: "Log, report, and gates.",
    scenario:
      "The reader has learned the pieces: evidence, recipes, competitor scans, briefs, claims, personas, calendars, QA, launch, reporting, and routing. The final test is whether those pieces can survive contact with one bounded project without hiding gaps.",
    role:
      "A portfolio artifact is strongest when it shows judgment, not just output. An honest run gives a practitioner evidence that they can supervise AI-assisted brand work responsibly.",
    recipe:
      "Inputs: running project, chosen recipe set, source files, notes, logs, report template, approval gates, and unresolved risks. Steps: define scope; run or simulate selected recipes; inspect evidence; produce artifacts; record logs; write human report; name gates; document failures and open questions. Outputs: run log, evidence appendix, report, gate decision record, and portfolio note. Gate: the run is not complete until unresolved risks are visible. Log: every material command, artifact, source, and decision.",
    lens:
      "The agent can help assemble the run and check completeness. The human owns scope, judgment, gate decisions, and the final account of what the run proves.",
    evidence:
      "Verified: generated artifacts tied to source paths, logs, reports, and gate decisions. Model judgment: summaries, risk suggestions, and completeness checks. Human judgment: adequacy, approval, and lessons learned.",
    task:
      "Complete one bounded Madison run. Submit a run log, report, evidence appendix, gate decision record, and a short reflection on what remains unresolved.",
    checklist: [
      "Scope is bounded.",
      "Artifacts connect to sources.",
      "Logs identify commands and outputs.",
      "Gate decisions are explicit.",
      "Open risks are not disguised as completion.",
    ],
    human:
      "AI cannot certify the adequacy of the whole run. The human must stand behind the judgment that the work is ready, blocked, or still exploratory.",
    bridge:
      "The appendix gathers the principles that explain why the Madison system is designed this way.",
    sources: [
      "logs/RUN_LOG.md",
      "logs/gate-decisions",
      "docs/phase-gates.md",
      "docs/operations.md",
      "docs/workflows.md",
      "recipes/marketmind.md",
      "package.json",
      "pantry/16-the-build-and-the-honest-run_notes.md",
    ],
    mechanism: "The chapter deep-dives bounded logged execution as the mechanism for converting separate recipes into accountable practice.",
  },
];

function list(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function allSources(chapter) {
  return [...new Set([...sharedSources, ...chapter.sources])];
}

function renderChapter(chapter) {
  const sources = allSources(chapter);
  return `# ${chapter.number}. ${chapter.title}

## Concrete Failure or Work Scenario

${chapter.scenario}

The failure is not that AI was used. The failure is that the artifact crossed a professional boundary without evidence, ownership, or a gate. Madison's answer is not less AI. It is better division of labor.

## Capability Statement

After this chapter, you will be able to ${chapter.capability.toLowerCase()}

**Assessment artifact:** ${chapter.artifact}

## Why This Matters for the Reader's Role

${chapter.role}

This is the Madison posture: use AI for pattern work, structure, drafting, extraction, formatting, and completeness checks; protect the human work of judgment, verification, taste, accountability, and approval. See \`MYCROFT.md\`, \`DATA_CONTRACT.md\`, and \`docs/phase-gates.md\` for the repository rules behind that posture.

## The Recipe Concept

${chapter.recipe}

The recipe should be small enough to run, explicit enough to audit, and useful enough that a teammate can maintain it after the original author leaves.

## Agentic Supervision Lens

${chapter.lens}

Supervision has three questions:

- Scope: what exactly is the agent allowed to do?
- Approval: who decides whether the output moves forward?
- Verification: what evidence would make the output defensible?

## Evidence Boundary

${chapter.evidence}

The boundary matters because Madison treats generated text as an artifact, not as evidence by default. A generated artifact can be useful, but it does not become trustworthy until its claims, inputs, and decisions are inspectable.

## Running Project Task

${chapter.task}

Save the artifact with the running project materials. If the evidence is thin, write that directly in the artifact instead of smoothing it out.

## Verification Checklist

${list(chapter.checklist)}

Machine conformance checks whether the files and formats are structurally acceptable. Human adequacy checks whether the work is good enough for the decision it is supposed to support.

## Human-Only Judgment Boundary

${chapter.human}

That boundary is the phase gate. AI may prepare the ground on one side of it. The accountable practitioner crosses it.

## Bridge to Next Chapter

${chapter.bridge}

## Sources Used

${list(sources.map((source) => `\`${source}\``))}
`;
}

const appendix = `# 97. Fundamental Themes

## Appendix: Friction, Phase Gates, and Accountable Brand Work

Madison is built on a simple claim: AI makes brand execution cheaper, but it does not make brand judgment cheap. The repo's workflows, prompts, logs, and reports exist to preserve that distinction in everyday work.

## Theme 1: Friction Is the Mechanism

Good brand work contains useful friction. Someone has to ask whether the audience claim is sourced, whether a competitor signal is current, whether the proposed voice fits the brand, whether a metric changes a decision, and whether a public response should be approved. AI can make that work easier to inspect. It should not make the work disappear.

In Madison, friction shows up as tables, source maps, warranted verbs, assumption registers, checklists, and gate records. These are not bureaucratic decorations. They are the mechanism that keeps fluent output from becoming false confidence.

## Theme 2: Phase Gates Make the Boundary Explicit

A phase gate is the point where AI assistance stops and human accountability begins. The gate is not a vague preference for human review. It is an operational boundary:

- AI may draft a claim table; a human decides whether the claim should be made.
- AI may cluster audience evidence; a human decides whether the persona is fair and useful.
- AI may generate a launch checklist; a human decides go or no-go.
- AI may summarize monitoring signals; a human approves any public response.

The gate protects the part of the work that carries risk, taste, strategy, ethics, or accountability.

## Theme 3: Provenance Beats Polish

Polished brand language can hide weak work. Madison therefore prefers inspectable artifacts over impressive artifacts. A rough table with sources, caveats, and owners is more valuable than a smooth paragraph that cannot be traced.

The data contract matters here. Raw data, verified data, generated artifacts, logs, reports, screenshots, and approvals play different roles. Confusing those roles is how unsupported work becomes persuasive.

## Theme 4: Two Customers

Every Madison recipe has two customers. The agent needs instructions, inputs, outputs, schemas, and logs. The human needs purpose, evidence, caveats, decisions, and maintenance notes. A workflow that serves only one customer fails the system.

This is why the book keeps pairing machine-readable artifacts with human-readable review surfaces. The point is not automation for its own sake. The point is supervised practice.

## Theme 5: Humans Plus AI, Not Humans or AI

The practical division of labor is consistent across the chapters:

- AI helps with extraction, formatting, comparison, clustering, drafting, and completeness checks.
- Humans handle problem framing, source adequacy, taste, strategic choice, risk tolerance, approval, and public accountability.

The best Madison workflow does not make the practitioner passive. It gives the practitioner a better surface for judgment.

## Practitioner Doctrine

1. Do not trust fluency without provenance.
2. Treat generated text as an artifact, not evidence.
3. Separate observation, inference, recommendation, and approval.
4. Use warranted verbs: can say, can suggest, cannot claim, needs review.
5. Build for two customers: the agent that runs and the human who judges.
6. Keep logs close to reports.
7. Preserve uncertainty where it matters.
8. Name the gate before the work crosses it.
9. Reward honest blockers over hidden risk.
10. Use AI to make human judgment more available, not less necessary.

## How to Use This Appendix

Return to this appendix whenever a chapter artifact feels too mechanical. The tables, logs, and checklists matter only because they protect the human work: judgment, taste, accountability, and learning.
`;

for (const chapter of chapters) {
  writeFileSync(join(chaptersDir, `${chapter.number}-${chapter.slug}.md`), renderChapter(chapter));
}

writeFileSync(join(chaptersDir, "97-fundamental-themes.md"), appendix);

const logPath = join(logsDir, "log.csv");
if (!existsSync(logPath)) {
  appendFileSync(
    logPath,
    "date,book,chapter_slug,word_count,sources_count,verify_flag_count,pantry_notes_found,pantry_lib_files_used,thin_pantry,mechanism_explained,contested_claims_flagged\n",
  );
}

for (const chapter of chapters) {
  const content = renderChapter(chapter);
  const slug = `${chapter.number}-${chapter.slug}`;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const verifyFlags = (content.match(/\[verify\]/g) || []).length;
  const contestedFlags = (content.match(/\[contested/g) || []).length;
  const libCount = chapter.sources.filter((source) => source.includes("pantry/_lib_")).length;
  const row = [
    date,
    book,
    slug,
    wordCount,
    allSources(chapter).length,
    verifyFlags,
    "yes",
    libCount,
    "no",
    `"${chapter.mechanism.replaceAll('"', '""')}"`,
    contestedFlags,
  ].join(",");
  appendFileSync(logPath, `${row}\n`);
}

console.log(`Wrote ${chapters.length} chapters and updated chapters/97-fundamental-themes.md`);
