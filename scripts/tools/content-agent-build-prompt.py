"""Build the content-agent generation prompt contract.

Purpose: Create the JSON-only prompt used to generate three content variants.
Input: Brief JSON and brand voice JSON.
Output: Prompt contract written to logs/content-agent-prompt.json.
Side effects: File write to logs/; no network calls.
Idempotent: yes, because identical brief and brand voice inputs produce the same prompt.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


SAMPLE_BRIEF = {
    "brief_id": "BRIEF-001",
    "topic": "Agentic branding workflows",
    "audience": "marketing operators",
    "offer": "a practical guide to brand-safe AI content operations",
}


def _load_json(path: str | Path, fallback: dict[str, Any]) -> dict[str, Any]:
    target = Path(path)
    if not target.exists():
        return fallback
    data = json.loads(target.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"{target} must contain a JSON object.")
    return data


def build_prompt(
    brief_path: str | Path | None = None,
    brand_voice_path: str | Path = "data/verified/content-agent/brand-voice.json",
    output_path: str | Path = "logs/content-agent-prompt.json",
    sample: bool = False,
) -> dict[str, Any]:
    """Create the JSON-only prompt used to generate three content variants."""

    brief = SAMPLE_BRIEF if sample or not brief_path else _load_json(brief_path, SAMPLE_BRIEF)
    brand = _load_json(brand_voice_path, {})
    brief_id = brief.get("brief_id", "UNKNOWN")
    taboos = ", ".join(brand.get("taboos", [])) if isinstance(brand.get("taboos"), list) else brand.get("taboos", "")
    prompt = f"""
Return ONLY valid JSON (no code fences, no prose). Top-level must be an object:
{{
  "brief_id": "{brief_id}",
  "variants": [
    {{ "variant_id": "V1", "headline": "", "body": "", "cta": "", "image_prompt": "", "popper_pass": true }},
    {{ "variant_id": "V2", "headline": "", "body": "", "cta": "", "image_prompt": "", "popper_pass": true }},
    {{ "variant_id": "V3", "headline": "", "body": "", "cta": "", "image_prompt": "", "popper_pass": true }}
  ]
}}

Constraints:
- Provide exactly 3 variants (V1..V3).
- All string fields must be non-empty and trimmed.
- Do not include Markdown, comments, trailing commas, or any text outside the JSON object.

Brief:
topic: {brief.get("topic", "")}
audience: {brief.get("audience", "")}
offer: {brief.get("offer", "")}

Brand voice:
tone: {brand.get("tone", "")}
style: {brand.get("style", "")}
reading_level: {brand.get("reading_level", "")}
taboos: {taboos}
""".strip()
    result = {"workflow": "content-agent", "brief_id": brief_id, "brief": brief, "brand-voice": brand, "prompt": prompt}

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build a content-agent generation prompt contract.")
    parser.add_argument("--brief", default=None)
    parser.add_argument("--brand-voice", dest="brand_voice", default="data/verified/content-agent/brand-voice.json")
    parser.add_argument("--output", default="logs/content-agent-prompt.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = build_prompt(args.brief, args.brand_voice, args.output, sample=args.sample or not args.brief)
    print(json.dumps(result, indent=2, sort_keys=True))
