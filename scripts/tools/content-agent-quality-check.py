"""Normalize content-agent generation output into variant rows.

Purpose: Parse model output and emit one normalized row per content variant.
Input: Model output JSON/text or built-in sample response.
Output: JSON array written to data/verified/content-agent/variants.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical generation output produces the same variants.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


SAMPLE_GENERATION = {
    "brief_id": "BRIEF-001",
    "variants": [
        {"variant_id": "V1", "headline": "Make Brand Work Easier With Agents", "body": "Use AI agents to turn briefs into consistent, reviewable campaign assets without losing human judgment.", "cta": "Build the workflow", "image_prompt": "Minimal workspace with modular content cards and clear approval marks.", "popper_pass": True},
        {"variant_id": "V2", "headline": "From Brief To Brand-Safe Drafts", "body": "Give your team a repeatable path from idea to variant, with scoring, review lanes, and visual concepts built in.", "cta": "See the system", "image_prompt": "Clean dashboard showing three campaign variants and a human approval step.", "popper_pass": True},
        {"variant_id": "V3", "headline": "Content Operations Need Guardrails", "body": "Keep the speed of AI while preserving brand voice, source checks, and a clear human clearance moment.", "cta": "Start with a recipe", "image_prompt": "Editorial calendar with highlighted guardrails and simple blue accents.", "popper_pass": True},
    ],
}


def _strip_fences(text: str) -> str:
    match = re.search(r"```(?:json)?\s*([\s\S]*?)```", text, re.IGNORECASE)
    return match.group(1).strip() if match else text.strip()


def _first_json_block(text: str) -> str:
    object_match = re.search(r"\{[\s\S]*\}", text)
    array_match = re.search(r"\[[\s\S]*\]", text)
    return (object_match.group(0) if object_match else array_match.group(0) if array_match else "").strip()


def _load_generation(path: str | Path | None, sample: bool) -> Any:
    if sample or not path:
        return SAMPLE_GENERATION
    raw = Path(path).read_text(encoding="utf-8")
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        cleaned = _first_json_block(_strip_fences(raw))
        return json.loads(cleaned)


def normalize_variants(
    generation_path: str | Path | None = None,
    output_path: str | Path = "data/verified/content-agent/variants.json",
    sample: bool = False,
) -> list[dict[str, Any]]:
    """Parse model output and emit one normalized row per content variant."""

    parsed = _load_generation(generation_path, sample)
    brief_id = "UNKNOWN"
    variants: list[Any]
    if isinstance(parsed, list):
        variants = parsed
    elif isinstance(parsed, dict):
        brief_id = str(parsed.get("brief_id", "UNKNOWN"))
        variants = parsed.get("variants", [])
    else:
        raise ValueError("Generation output must parse to a JSON object or array.")
    if len(variants) != 3:
        raise ValueError(f"Expected exactly 3 variants, found {len(variants)}.")

    rows: list[dict[str, Any]] = []
    required = ["headline", "body", "cta", "image_prompt"]
    for index, variant in enumerate(variants, start=1):
        if not isinstance(variant, dict):
            raise ValueError("Each variant must be a JSON object.")
        row = {
            "brief_id": str(variant.get("brief_id") or brief_id),
            "variant_id": str(variant.get("variant_id") or f"V{index}"),
            "headline": str(variant.get("headline") or "").strip(),
            "body": str(variant.get("body") or "").strip(),
            "cta": str(variant.get("cta") or "").strip(),
            "image_prompt": str(variant.get("image_prompt") or "").strip(),
            "popper_pass": bool(variant.get("popper_pass")),
        }
        empty = [field for field in required if not row[field]]
        if empty:
            raise ValueError(f"{row['variant_id']} has empty required fields: {', '.join(empty)}.")
        rows.append(row)

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Normalize content-agent generation variants.")
    parser.add_argument("--generation", default=None)
    parser.add_argument("--output", default="data/verified/content-agent/variants.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = normalize_variants(args.generation, args.output, sample=args.sample or not args.generation)
    print(json.dumps(result, indent=2, sort_keys=True))
