import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const generatedOn = "2026-06-14";
const root = process.cwd();
const pantryDir = join(root, "pantry");

mkdirSync(pantryDir, { recursive: true });

const commonSources = [
  "TIKTOC.md",
  "SNICKERDOODLE.md",
  "DOMAIN.md",
  "DATA_CONTRACT.md",
  "docs/data-and-provenance.md",
  "docs/workflows.md",
  "docs/phase-gates.md",
  "reports/generated/entry-mid-branding-advertising-recipes-research.md",
];

const librarySources = [
  "pantry/_lib_ai-gigo.md",
  "pantry/_lib_ai-nbb-prompt-architecture-the-power-of-the-template-pattern.md",
  "pantry/_lib_business-data-ism-the-revolution-transforming-decision-making-consumer-behavior-and-al.md",
  "pantry/_lib_business-groundswell-expanded-and-revised-edition-winning-in-a-world-transformed-by-so.md",
  "pantry/_lib_math-how-to-measure-anything-finding-the-value-of-intangibles-in-business.md",
  "pantry/_lib_math-how-to-lie-with-statistics.md",
  "pantry/_lib_design-statistics-for-hci-making-sense-of-quantitative-data.md",
  "pantry/_lib_prompts-direct-response-copywriting-and-platform-content-coach.md",
];

const chapters = [
  {
    file: "01-the-fluency-trap_notes.md",
    chapter: "01-the-fluency-trap.md",
    title: "The Fluency Trap",
    capability: "Detect the gap between fluent brand output and trustworthy brand work.",
    summary:
      "This chapter should open with a polished AI-generated brand artifact that feels finished but cannot survive evidence review. The core move is to teach readers that persuasive language, smooth formatting, and confident strategic vocabulary are not the same thing as verified audience, competitor, claim, or approval work.",
    foundations: [
      "Fluency is a presentation property; trustworthiness is a provenance property.",
      "Brand artifacts contain mixed claim types: factual claims, strategic inferences, taste judgments, and approval decisions.",
      "The Madison frame should make uncertainty visible before a human mistakes polish for completion.",
    ],
    examples: [
      "Audit an AI-written campaign brief and label each statement as verified, inferred, unsupported, judgment, or approval-needed.",
      "Compare an attractive persona against the evidence available in `recipes/madison-persona-generation.md` and `recipes/madison-audience-definition.md`.",
      "Use `prompts/ogilvy/ogilvy.md`, `prompts/nina/nina.md`, and `prompts/brandy/brandy.md` as examples of strong language systems that still need provenance checks.",
    ],
    connections: [
      "Prepares Chapter 3 by showing why Madison needs a data contract.",
      "Prepares Chapter 9 by separating claims from proof.",
      "Connects to `prompts/ogilvy/PROVENANCE-CHECK.md` and the shared GIGO library notes.",
    ],
    current:
      "The repo already contains the right contrast: fluent prompt suites in `prompts/` and verification rules in `SNICKERDOODLE.md`, `DATA_CONTRACT.md`, and `docs/data-and-provenance.md`. The missing chapter should make that contrast explicit and operational.",
    teaching:
      "Make the first exercise visceral: give students a good-looking artifact and force a slow claim audit. The lesson lands when the artifact remains useful but loses its false aura of certainty.",
    sources: [
      "prompts/ogilvy/ogilvy.md",
      "prompts/ogilvy/PROVENANCE-CHECK.md",
      "prompts/brandy/brandy.md",
      "prompts/nina/nina.md",
      "docs/exercises/exercise-09-brand-storytelling.md",
      "docs/exercises/exercise-10-substack-platform.md",
      "pantry/_lib_ai-gigo.md",
    ],
  },
  {
    file: "02-the-reallocation-principle_notes.md",
    chapter: "02-the-reallocation-principle.md",
    title: "The Reallocation Principle",
    capability: "Reframe brand work as scarce judgment allocation.",
    summary:
      "This chapter should argue that the point of Madison is not to generate more brand outputs. The point is to move practitioner time away from rote production and toward evidence gathering, option evaluation, risk review, approval routing, and learning loops.",
    foundations: [
      "Automation changes the price of execution, not the price of judgment.",
      "Useful brand systems preserve scarce human attention for decisions where taste, context, ethics, risk, and business priorities matter.",
      "A recipe is worthwhile when it shifts work from repeated manual assembly into reviewable evidence and decision support.",
    ],
    examples: [
      "Map one week of brand work into execution, evidence, judgment, and approval categories.",
      "Use `recipes/madison-campaign-construction.md` to show how automated drafting should create better briefs, not bypass strategic review.",
      "Use `recipes/madison-performance-reporting.md` to show reallocation from chart production to interpretation and next-test decisions.",
    ],
    connections: [
      "Builds the operating philosophy for Chapters 6 through 15.",
      "Connects to Chapter 16, where the reader performs an honest bounded run.",
      "Supports the book thesis from `TIKTOC.md`: AI makes output cheap but not judgment cheap.",
    ],
    current:
      "The existing research report identifies high-value recipe opportunities in repetitive entry and mid-level brand workflows. The repo's recipe layer demonstrates that these opportunities cluster around research, QA, reporting, and routing.",
    teaching:
      "Have readers produce a time-budget table before any tool work. The chapter should reward a smaller, better-governed workflow over a larger pile of generated artifacts.",
    sources: [
      "recipes/madison-campaign-construction.md",
      "recipes/madison-performance-reporting.md",
      "recipes/madison-launch-handoff.md",
      "docs/exercises/exercise-05-conductor-brief.md",
      "docs/exercises/exercise-05b-build-the-recipe.md",
      "pantry/_lib_ai-nbb-prompt-architecture-the-power-of-the-template-pattern.md",
    ],
  },
  {
    file: "03-the-verified-brand-data-contract_notes.md",
    chapter: "03-the-verified-brand-data-contract.md",
    title: "The Verified Brand Data Contract",
    capability: "State what counts as evidence in Madison.",
    summary:
      "This chapter should define Madison's evidence ladder: raw inputs, verified records, generated artifacts, prompts, recipes, logs, reports, screenshots, URLs, and approval records. The reader needs to understand what can be trusted, what can be traced, and what still needs human judgment.",
    foundations: [
      "A data contract is a social and technical promise about fields, sources, allowed transformations, and uncertainty labels.",
      "Generated text is an artifact, not evidence by default.",
      "Provenance should be visible at the point of use, not hidden in a separate archive.",
    ],
    examples: [
      "Trace a brand claim from a report back to a log, recipe, and source.",
      "Compare `logs/marketmind-run.json` with `reports/templates/marketmind.md` to show machine-output and human-report boundaries.",
      "Use `DATA_CONTRACT.md` as the book's formal vocabulary for raw, verified, generated, and archived materials.",
    ],
    connections: [
      "Required before Chapters 5, 8, 9, 10, 11, and 14 can work cleanly.",
      "Sets the evidence standard for Chapter 16's final run.",
      "Explains why `logs/` and `reports/` both matter.",
    ],
    current:
      "Madison already has a strong contract layer in `DATA_CONTRACT.md`, `docs/data-and-provenance.md`, recipes, logs, and report templates. The missing chapter should translate those governance rules into practitioner language.",
    teaching:
      "Make students physically follow one claim across files. The desired habit is source-first thinking, not passive acceptance of a generated summary.",
    sources: [
      "recipes/marketmind.md",
      "logs/marketmind-run.json",
      "logs/marketmind-response.json",
      "reports/templates/marketmind.md",
      "prompts/review/review.md",
      "docs/exercises/exercise-03-gather-validate-defend.md",
    ],
  },
  {
    file: "04-two-customers_notes.md",
    chapter: "04-two-customers.md",
    title: "Two Customers",
    capability: "Understand recipes as both agent contracts and human maintenance cards.",
    summary:
      "This chapter should teach the reader to design every Madison recipe for two customers: the executing agent and the human reviewer. The machine needs precise inputs, steps, outputs, schemas, and logs; the human needs purpose, evidence, caveats, decisions, and maintenance cues.",
    foundations: [
      "Machine-readable output without human judgment support becomes opaque automation.",
      "Human-readable prose without machine-readable structure becomes hard to rerun, compare, or audit.",
      "Good recipe design makes both customers legible in the same workflow.",
    ],
    examples: [
      "Annotate `recipes/marketmind.md` by marking agent instructions, expected outputs, evidence requirements, and human review points.",
      "Compare `reports/templates/content-agent.md` with `logs/content-agent-alerts.json` as two views of the same workflow.",
      "Use `prompts/review/review.md` to show how reviewer-facing expectations can be embedded in a prompt system.",
    ],
    connections: [
      "Explains why later chapters ask for both tables/logs and memos/reports.",
      "Supports Chapter 13's launch readiness pack and Chapter 16's honest run.",
      "Connects to `SNICKERDOODLE.md` rules about runnable, reviewable recipes.",
    ],
    current:
      "The repo already carries this pattern in recipes, logs, templates, and docs. The chapter should name it as an explicit design principle so readers can apply it to their own workflows.",
    teaching:
      "Give readers a bad recipe with only prose or only JSON and ask them to repair it for both customers.",
    sources: [
      "recipes/marketmind.md",
      "recipes/content-agent.md",
      "reports/templates/content-agent.md",
      "logs/content-agent-alerts.json",
      "docs/operations.md",
      "docs/workflows.md",
    ],
  },
  {
    file: "05-verifying-brand-evidence_notes.md",
    chapter: "05-verifying-brand-evidence.md",
    title: "Verifying Brand Evidence",
    capability: "Interrogate coverage, method, recency, source quality, model judgment, and warranted verbs.",
    summary:
      "This chapter should move beyond whether a source exists into what the source can actually support. A sourced competitor observation can be incomplete; a survey can be biased; a metric can be accurate but strategically irrelevant.",
    foundations: [
      "Verification is not a binary stamp; it includes coverage, recency, source quality, method fit, and interpretation limits.",
      "Warranted verbs help prevent overclaiming: can say, can suggest, cannot claim, needs review.",
      "Model labels such as sentiment and theme are judgments unless independently validated.",
    ],
    examples: [
      "Review an evidence set and produce a warranted-verb table.",
      "Use survey outputs to distinguish sample description from audience truth.",
      "Use competitor observations to distinguish visible signal from strategic conclusion.",
    ],
    connections: [
      "Directly supports Chapters 6, 8, 9, 10, 14, and 15.",
      "Extends Chapter 3 from source tracing into interpretation discipline.",
      "Connects to `scripts/conformance.mjs` as repository-level verification culture.",
    ],
    current:
      "Madison's repo has evidence discipline in docs, prompts, templates, and exercises. The missing chapter should turn those rules into a repeatable practitioner checklist.",
    teaching:
      "Use messy evidence. Clean examples make verification feel ceremonial; imperfect evidence teaches judgment.",
    sources: [
      "docs/exercises/HOW-TO-CHECK.md",
      "docs/exercises/exercise-03-gather-validate-defend.md",
      "prompts/_shared/competitive-method.md",
      "prompts/_shared/jargon-audit.md",
      "scripts/conformance.mjs",
      "pantry/_lib_math-how-to-lie-with-statistics.md",
      "pantry/_lib_design-statistics-for-hci-making-sense-of-quantitative-data.md",
    ],
  },
  {
    file: "06-competitor-signal-scan_notes.md",
    chapter: "06-competitor-signal-scan.md",
    title: "Competitor Signal Scan",
    capability: "Gather and compare competitor signals without laundering observations into strategy.",
    summary:
      "This chapter should build a practical competitor scan that captures visible market signals while preventing the common jump from observation to strategy. The recipe should produce a competitor matrix, source list, timestamps, extracted claims, contradictions, and human-review notes.",
    foundations: [
      "Competitive intelligence begins with a named comparison set and explicit source boundaries.",
      "A competitor's visible claim is not proof that the claim is true or effective.",
      "The strategic value is in comparing signals, gaps, and contradictions, then handing judgment to the human.",
    ],
    examples: [
      "Run a scan across competitor websites, social profiles, and public messaging.",
      "Extract position, proof, CTA, audience, channel, and tone from each source.",
      "Use contradiction flags when a competitor's messaging conflicts across touchpoints.",
    ],
    connections: [
      "Feeds Chapter 7's creative brief and Chapter 9's claim map.",
      "Supports Chapter 12 brand consistency by showing category norms and gaps.",
      "Connects to market intelligence recipes already present in the repo.",
    ],
    current:
      "The repo has several competitor and market intelligence recipes, but the chapter should standardize the entry-level workflow into a teachable signal scan with provenance.",
    teaching:
      "Force the reader to separate source capture, observation, interpretation, and recommendation into different columns.",
    sources: [
      "recipes/madison-competitive-positioning-agent.md",
      "recipes/marketmind.md",
      "recipes/madison-martech-product-positioning-signal-agent.md",
      "prompts/_shared/competitive-method.md",
      "prompts/caze/caze.md",
      "chapters/principles-marketing/07-market-segmentation-targeting-and-positioning.md",
      "chapters/principles-marketing/08-marketing-research-and-market-intelligence.md",
    ],
  },
  {
    file: "07-the-creative-brief-builder_notes.md",
    chapter: "07-the-creative-brief-builder.md",
    title: "The Creative Brief Builder",
    capability: "Assemble a creative brief from evidence without pretending the brief is approved strategy.",
    summary:
      "This chapter should frame the creative brief as an evidence-bound assembly, not a magical strategy document. It should teach objective, audience, tension, single-minded proposition, support, tone, mandatories, constraints, open questions, and approval status.",
    foundations: [
      "A brief is a decision surface: it concentrates evidence and unresolved choices for approval.",
      "Confirmed fields and inferred fields must be visibly different.",
      "A brief can be draft-ready without being strategy-approved.",
    ],
    examples: [
      "Build a brief from a competitor scan, persona evidence sheet, and claims/proof map.",
      "Use a conductor brief exercise to show how creative options diverge from the same inputs.",
      "Mark open questions and approval owners before downstream asset generation.",
    ],
    connections: [
      "Consumes Chapters 3, 5, 6, and 10.",
      "Feeds Chapters 11, 12, and 13.",
      "Connects to pitch and identity prompt suites already in the repo.",
    ],
    current:
      "The existing Madison exercises and prompt suites already teach brief-like thinking; the new chapter should narrow that material into a practitioner recipe.",
    teaching:
      "Grade the assumption register as seriously as the brief. The point is not just a better brief, but a brief that knows what it does not know.",
    sources: [
      "recipes/madison-campaign-construction.md",
      "docs/exercises/exercise-05-conductor-brief.md",
      "prompts/nina/nina.md",
      "prompts/assignment6/assignment6.md",
      "prompts/madison-pitch/madison-pitch.md",
      "chapters/branding-and-ai/04-product-requirements-and-scope.md",
    ],
  },
  {
    file: "08-measurement-plan-and-kpi-map_notes.md",
    chapter: "08-measurement-plan-and-kpi-map.md",
    title: "Measurement Plan and KPI Map",
    capability: "Define campaign measurement before reporting.",
    summary:
      "This chapter should teach the reader to define measurement before launch or reporting. The KPI map should include objective, metric definition, source, baseline, target, cadence, owner, decision use, and sign-off.",
    foundations: [
      "A metric is only useful when its definition, source, cadence, and decision role are clear.",
      "Measurement plans should separate leading indicators, outcome indicators, and diagnostic checks.",
      "Reporting without a precommitted measurement plan invites metric theater and retrofitted narratives.",
    ],
    examples: [
      "Create a KPI map for a campaign launch with baseline status and missing data flags.",
      "Compare a survey metric, a web metric, and an engagement metric by decision use.",
      "Use performance reporting recipes to show how raw exports become decision support.",
    ],
    connections: [
      "Prepares Chapter 14's campaign performance report.",
      "Depends on Chapter 3's data contract and Chapter 5's warranted-verb discipline.",
      "Feeds Chapter 16's honest run evidence appendix.",
    ],
    current:
      "The repo's research report identifies measurement and reporting as high-value recipe territory. Madison already has performance and survey recipes that can anchor the chapter.",
    teaching:
      "Require a 'what decision will this metric change?' field. It prevents vanity metrics from passing as KPIs.",
    sources: [
      "recipes/madison-performance-reporting.md",
      "recipes/survey-analysis.md",
      "logs/survey-analysis-outputs.json",
      "logs/intelligence-agent-reports.json",
      "reports/templates/survey-analysis.md",
      "chapters/principles-marketing/03-strategic-planning-in-marketing.md",
      "pantry/_lib_math-how-to-measure-anything-finding-the-value-of-intangibles-in-business.md",
    ],
  },
  {
    file: "09-claims-and-proof-map_notes.md",
    chapter: "09-claims-and-proof-map.md",
    title: "Claims and Proof Map",
    capability: "Separate usable claims from unsupported, risky, or approval-needed claims.",
    summary:
      "This chapter should make claims auditable. Every product, performance, customer, audience, category, credential, and comparative claim should map to proof, risk, rewrite guidance, and an approval owner.",
    foundations: [
      "Copy claims are operational risk, not only writing choices.",
      "Proof can include source documents, metrics, screenshots, testimonials, published pages, or explicit human approval.",
      "Puffery, inference, factual claims, and regulated claims require different treatment.",
    ],
    examples: [
      "Audit a landing page or pitch deck and produce a claims table.",
      "Rewrite unsupported claims into warranted, source-bound alternatives.",
      "Flag claims that require legal, client, or executive approval.",
    ],
    connections: [
      "Receives evidence from Chapters 3 and 5.",
      "Supports Chapters 7, 11, 12, and 13.",
      "Forms one of the clearest bridges between AI copy generation and human governance.",
    ],
    current:
      "Madison already has copy, review, cleanup, and provenance prompt infrastructure. The missing chapter should combine them into a compact claims/proof workflow.",
    teaching:
      "Use line-by-line annotation. Students should see how a single confident adjective can change the proof burden.",
    sources: [
      "prompts/ogilvy/PROVENANCE-CHECK.md",
      "prompts/ogilvy/ogilvy.md",
      "prompts/_shared/cleanup-standard.md",
      "prompts/_shared/destination-language.md",
      "prompts/_shared/jargon-audit.md",
      "prompts/madison-pitch/madison-pitch.md",
      "pantry/_lib_prompts-direct-response-copywriting-and-platform-content-coach.md",
    ],
  },
  {
    file: "10-audience-persona-evidence-synthesis_notes.md",
    chapter: "10-audience-persona-evidence-synthesis.md",
    title: "Audience Persona Evidence Synthesis",
    capability: "Build personas and audience briefs as evidence-bound synthesis, not demographic fiction.",
    summary:
      "This chapter should rehabilitate persona work by tying every persona statement to interviews, surveys, reviews, CRM notes, analytics, support tickets, or public signals. It should explicitly block invented psychographics and stereotype laundering.",
    foundations: [
      "Personas are synthesis artifacts, not fictional characters.",
      "Audience claims require source rows, inference labels, contradictions, and excluded assumptions.",
      "Segmentation and persona work should help decisions, not merely decorate decks.",
    ],
    examples: [
      "Build an audience evidence sheet from survey notes, public reviews, and analytics signals.",
      "Create a persona draft that labels confirmed facts, plausible inferences, and unsupported hypotheses.",
      "Compare B2C persona work with B2B buying committee or stakeholder maps.",
    ],
    connections: [
      "Feeds Chapters 7 and 11.",
      "Depends on Chapter 5's evidence review.",
      "Links to Chapter 4 because personas must be readable by humans and structured enough for agents.",
    ],
    current:
      "The repo has audience-definition and persona-generation recipes plus branding chapters on strategy paths. The new chapter should put those pieces under one evidence discipline.",
    teaching:
      "Make readers delete every persona sentence that lacks a source or an inference label. This is where the chapter earns trust.",
    sources: [
      "recipes/madison-persona-generation.md",
      "recipes/madison-audience-definition.md",
      "prompts/nina/nina.md",
      "prompts/assignment6/assignment6.md",
      "docs/exercises/exercise-01-brand-personal-layer.md",
      "chapters/principles-marketing/05-consumer-markets-and-purchasing-behavior.md",
      "chapters/principles-marketing/07-market-segmentation-targeting-and-positioning.md",
    ],
  },
  {
    file: "11-content-calendar-with-provenance_notes.md",
    chapter: "11-content-calendar-with-provenance.md",
    title: "Content Calendar With Provenance",
    capability: "Turn campaign priorities into a calendar that preserves why each post exists.",
    summary:
      "This chapter should make the content calendar an operations artifact with provenance. Each row should preserve date, channel, audience, message pillar, proof/source, asset, owner, approval status, CTA, and risk flag.",
    foundations: [
      "Calendar quality is not content volume; it is alignment, evidence, ownership, and approval readiness.",
      "Each planned post should explain why it exists and what claim or audience need it serves.",
      "Provenance makes calendars easier to revise when evidence or approvals change.",
    ],
    examples: [
      "Build a two-week content calendar from a brief and claims/proof map.",
      "Use a content agent output to separate useful ideas from unsupported content suggestions.",
      "Add approval status and evidence links before treating posts as publish-ready.",
    ],
    connections: [
      "Consumes Chapters 7, 9, and 10.",
      "Feeds Chapters 12, 13, and 14.",
      "Connects strongly to social/media monitoring in Chapter 15.",
    ],
    current:
      "Madison has a content-agent recipe, alert logs, and platform exercises. The missing chapter should impose the book's evidence and approval structure on calendar planning.",
    teaching:
      "Use a table format. Students should learn that every content row has operational obligations, not just a caption.",
    sources: [
      "recipes/content-agent.md",
      "logs/content-agent-prompt.json",
      "logs/content-agent-alerts.json",
      "reports/templates/content-agent.md",
      "docs/exercises/exercise-10-substack-platform.md",
      "chapters/principles-marketing/19-direct-online-social-media-and-mobile-marketing.md",
    ],
  },
  {
    file: "12-brand-consistency-and-voice-qa_notes.md",
    chapter: "12-brand-consistency-and-voice-qa.md",
    title: "Brand Consistency and Voice QA",
    capability: "Check brand consistency without reducing brand to mechanical sameness.",
    summary:
      "This chapter should combine communications audit, brand identity constraints, copy review, accessibility checks, and voice annotation. It should teach consistency as coherent intent across touchpoints, not robotic repetition.",
    foundations: [
      "Brand consistency is rule adherence plus situated judgment.",
      "Voice QA should preserve useful variation while catching contradiction, unsupported claims, jargon, accessibility issues, and off-brand tone.",
      "Model recommendations remain advisory; human taste and risk ownership are gates.",
    ],
    examples: [
      "Audit three touchpoints and produce severity, evidence, rule reference, recommendation, and human decision columns.",
      "Compare a brand guide against website, social, and deck samples.",
      "Use accessibility and contrast checks as part of brand QA, not a separate afterthought.",
    ],
    connections: [
      "Consumes Chapters 9 and 11.",
      "Feeds Chapter 13's launch readiness checklist.",
      "Uses prompt suites that were previously added to the repo.",
    ],
    current:
      "The repo already has BRANDY, Nina, Ogilvy, brand consistency recipes, and accessibility scripts. The missing chapter should make them work together as one QA practice.",
    teaching:
      "Give examples where consistency and quality conflict. Readers should learn to recommend, not blindly enforce.",
    sources: [
      "prompts/brandy/brandy.md",
      "docs/brandy-vs-assignment6-fit.md",
      "recipes/madison-brand-consistency-contradiction-checker.md",
      "recipes/madison-qa-accessibility-audit.md",
      "scripts/contrast-check.mjs",
      "docs/exercises/exercise-07-brand-identity.md",
      "docs/exercises/exercise-08-digital-presence.md",
    ],
  },
  {
    file: "13-launch-readiness-and-trafficking-qa_notes.md",
    chapter: "13-launch-readiness-and-trafficking-qa.md",
    title: "Launch Readiness and Trafficking QA",
    capability: "Decide whether assets are ready to move from draft to public release.",
    summary:
      "This chapter should teach the practical launch pack: asset inventory, specs, URLs, UTMs, approvals, landing pages, disclosures, screenshots, owners, blockers, and final go/no-go gate.",
    foundations: [
      "Launch readiness is a governance step, not clerical cleanup.",
      "Every public asset needs a chain of evidence, specs, ownership, and approval.",
      "The chapter should separate draft-complete, QA-complete, approval-complete, and live states.",
    ],
    examples: [
      "Build a preflight checklist for a campaign touchpoint.",
      "Audit URL, UTM, accessibility, brand, claim, and approval readiness.",
      "Write blockers and owners so the launch can move without hiding unresolved risk.",
    ],
    connections: [
      "Consumes Chapters 7, 9, 11, and 12.",
      "Feeds Chapter 14 by ensuring measurement and tracking are in place before reporting.",
      "Provides an operational bridge into Chapter 16's honest run.",
    ],
    current:
      "Madison has launch handoff, pre-launch simulation, QA, accessibility, and wrap-your-tool materials. The chapter should consolidate these into the workflow entry-level practitioners actually need.",
    teaching:
      "Make launch a go/no-go decision with named approver, not a vague checklist. The reader should be able to say exactly what blocks release.",
    sources: [
      "recipes/madison-launch-handoff.md",
      "recipes/madison-pre-launch-simulation.md",
      "recipes/madison-qa-accessibility-audit.md",
      "docs/exercises/exercise-05a-wrap-your-tool.md",
      "docs/exercises/exercise-08-digital-presence.md",
      "templates/wrap-your-tool/CLAUDE.md",
    ],
  },
  {
    file: "14-campaign-performance-report_notes.md",
    chapter: "14-campaign-performance-report.md",
    title: "Campaign Performance Report",
    capability: "Produce performance reporting that supports decisions rather than metric theater.",
    summary:
      "This chapter should teach the report chain from raw export to verified table, metric definitions, objective comparison, caveats, visualization, interpretation labels, and next-test recommendation.",
    foundations: [
      "A report is a decision instrument, not a dashboard screenshot.",
      "Performance interpretation must separate description, comparison, causal inference, and recommendation.",
      "Machine-readable logs and human-readable reports should stay connected.",
    ],
    examples: [
      "Turn a provided metrics export into a report with caveats and next-test recommendation.",
      "Use survey and intelligence logs to distinguish source data from narrative summary.",
      "Identify vanity metrics and replace them with decision-relevant measures where possible.",
    ],
    connections: [
      "Depends on Chapter 8's measurement plan.",
      "Feeds Chapter 16's final run and evidence appendix.",
      "Loops back to Chapter 2 by showing where human attention should move after automation.",
    ],
    current:
      "Madison already contains performance, survey, and intelligence recipes plus logs. The missing chapter should define the reporting template and anti-overclaiming rules.",
    teaching:
      "Ask readers to write one 'what changed because of this report?' sentence. If the sentence is vague, the report is not finished.",
    sources: [
      "recipes/madison-performance-reporting.md",
      "recipes/survey-analysis.md",
      "recipes/intelligence-agent.md",
      "logs/intelligence-agent-reports.json",
      "logs/survey-analysis-outputs.json",
      "reports/templates/intelligence-agent.md",
      "pantry/_lib_math-how-to-measure-anything-finding-the-value-of-intangibles-in-business.md",
    ],
  },
  {
    file: "15-media-coverage-and-issue-routing_notes.md",
    chapter: "15-media-coverage-and-issue-routing.md",
    title: "Media Coverage and Issue Routing",
    capability: "Route public signals without turning monitoring into an auto-response bot.",
    summary:
      "This chapter should cover reputation monitoring, press clips, social listening, review mining, sentiment labeling, issue taxonomy, escalation paths, and response approval. It should be very clear that public response is a gate, not an automated action.",
    foundations: [
      "Monitoring can be automated; public response should have human approval.",
      "Sentiment labels are model judgments unless validated.",
      "Routing value comes from source capture, severity, owner, response deadline, and escalation path.",
    ],
    examples: [
      "Produce an issue-routing digest from a small set of mentions.",
      "Classify issue type, severity, source, proposed owner, and response gate.",
      "Compare brand news, sentiment, reputation, and social monitoring recipes.",
    ],
    connections: [
      "Consumes Chapter 5's evidence caution and Chapter 12's voice QA.",
      "Feeds Chapter 16 when the final run includes monitoring or escalation.",
      "Connects public signals back into content and performance learning loops.",
    ],
    current:
      "Madison has several reputation, sentiment, news, and RSS recipes. The missing chapter should convert them into a practical public-signal workflow for brand teams.",
    teaching:
      "Use examples where the correct action is 'route and wait' rather than 'generate a reply'. That is the governance lesson.",
    sources: [
      "recipes/brand-reputation-news-intelligence-pipeline.md",
      "recipes/madison-brand-news-reputation-monitor.md",
      "recipes/madison-brand-sentiment-monitor.md",
      "recipes/social-media-marketing-rss-monitor.md",
      "recipes/madison-category-sentiment-dashboard.md",
      "logs/content-agent-alerts.json",
      "pantry/_lib_business-groundswell-expanded-and-revised-edition-winning-in-a-world-transformed-by-so.md",
    ],
  },
  {
    file: "16-the-build-and-the-honest-run_notes.md",
    chapter: "16-the-build-and-the-honest-run.md",
    title: "The Build and the Honest Run",
    capability: "Integrate the Madison recipe system through a bounded, logged run.",
    summary:
      "This chapter should require one complete, bounded Madison run: choose a brand or campaign scenario, select relevant recipes, inspect sources, write logs, produce a report, name approval gates, and record unresolved risks.",
    foundations: [
      "An honest run is bounded, logged, and explicit about what failed, what is unknown, and what needs approval.",
      "The value of a recipe system appears when individual artifacts connect into a traceable workflow.",
      "A final run should produce evidence, decision support, and a maintenance trail.",
    ],
    examples: [
      "Run or simulate a competitor scan, brief, claim map, content calendar, QA pass, launch pack, and performance readout.",
      "Write a `logs/RUN_LOG.md` entry that names commands, artifacts, tests, and unresolved risks.",
      "Create a gate decision record that explains whether the output is approved, blocked, or needs review.",
    ],
    connections: [
      "Integrates every prior chapter.",
      "Mirrors the repository's own governance model from `SNICKERDOODLE.md`.",
      "Provides the capstone artifact for a portfolio or workplace handoff.",
    ],
    current:
      "The repo already has the operational scaffolding: run logs, gate decisions, conformance checks, recipes, prompts, reports, and docs. The missing chapter should turn that scaffolding into a capstone workflow.",
    teaching:
      "Reward candor. A run with clear gaps, failed checks, and named blockers is stronger than a shiny but unverifiable final report.",
    sources: [
      "logs/RUN_LOG.md",
      "logs/gate-decisions",
      "docs/phase-gates.md",
      "docs/operations.md",
      "docs/workflows.md",
      "recipes/marketmind.md",
      "package.json",
    ],
  },
];

function renderList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function renderSources(sources) {
  return renderList([...new Set([...commonSources, ...sources])]);
}

function renderChapterNote(chapter) {
  return `# Chapter Research Notes: ${chapter.title}

Generated: ${generatedOn}

Corresponding proposed chapter: \`chapters/${chapter.chapter}\`

## A. Chapter Summary from TIKTOC

**Capability built:** ${chapter.capability}

${chapter.summary}

## B. Conceptual Foundations

${renderList(chapter.foundations)}

## C. Domain Examples and Cases

${renderList(chapter.examples)}

## D. Connections and Dependencies

${renderList(chapter.connections)}

## E. Current State and Teaching Considerations

**Current Madison state:** ${chapter.current}

**Teaching considerations:** ${chapter.teaching}

## Repo Source Map

${renderSources(chapter.sources)}

## Shared Library Sources Copied to Pantry

${renderList(librarySources)}
`;
}

for (const chapter of chapters) {
  writeFileSync(join(pantryDir, chapter.file), renderChapterNote(chapter));
}

const missingChapterFiles = chapters.map((chapter) => `chapters/${chapter.chapter}`);
const index = `# Madison Chapter Research Index

Generated: ${generatedOn}

## Scope

This research pass treats the Madison repository itself as the primary source. The current top-level chapter set contains \`00-frontmatter.md\`, \`00-introduction.md\`, \`97-fundamental-themes.md\`, \`98-appendix-best-practices.md\`, and \`99-back-matter.md\`. The missing proposed top-level chapters are:

${renderList(missingChapterFiles)}

## Research Outputs

${renderList(chapters.map((chapter) => `pantry/${chapter.file}`))}

## Primary Repo Evidence Layers

- \`TIKTOC.md\` for chapter sequence, capability statements, whole tasks, and assessments.
- \`SNICKERDOODLE.md\`, \`DOMAIN.md\`, and \`DATA_CONTRACT.md\` for constitution, domain, and evidence rules.
- \`recipes/\` for practitioner workflows and output contracts.
- \`prompts/\` for brand, review, copy, identity, pitch, and shared critique patterns.
- \`docs/exercises/\` for teaching sequence and assessment scaffolding.
- \`logs/\` and \`reports/templates/\` for machine-readable outputs and human-readable report surfaces.
- \`reports/generated/entry-mid-branding-advertising-recipes-research.md\` for the prior synthesized recipe-opportunity research.

## Supplemental Shared Library Copies

${renderList(librarySources)}

## Most Useful Research Finding

The missing chapters do not need a web-first research sprint. Madison already contains the useful material: recipe cards, prompt suites, exercise scaffolds, logs, templates, and governance rules. The chapter-writing task is to convert those assets into a coherent practitioner guide that teaches entry- and mid-level branding or advertising people how to run evidence-bound workflows without outsourcing judgment to fluent AI output.
`;

writeFileSync(join(pantryDir, "chapter-research-index.md"), index);

console.log(`Wrote ${chapters.length} chapter research notes and pantry/chapter-research-index.md`);
