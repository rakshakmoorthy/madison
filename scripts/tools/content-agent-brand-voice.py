"""Write the content-agent brand voice contract.

Purpose: Produce the brand voice JSON used by prompt and visual concept tools.
Input: Optional JSON overrides.
Output: JSON object written to data/verified/content-agent/brand-voice.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical overrides produce the same brand voice.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


DEFAULT_BRAND_VOICE: dict[str, Any] = {
    "tone": "Confident, plain-English, helpful",
    "style": "Short, skimmable, active voice",
    "reading_level": "Grade 8-9",
    "taboos": ["jargon", "absolute claims", "unverifiable superlatives"],
    "lexicon": {"users": "customers", "AI": "AI agents"},
    "brand_colors": ["#0B5FFF", "#111827"],
    "visual_style": "minimal, clean, lots of whitespace",
}


def write_brand_voice(
    overrides: dict[str, Any] | None = None,
    output_path: str | Path = "data/verified/content-agent/brand-voice.json",
) -> dict[str, Any]:
    """Produce the brand voice JSON used by prompt and visual concept tools."""

    brand_voice = {**DEFAULT_BRAND_VOICE, **(overrides or {})}
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(brand_voice, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return brand_voice


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Write content-agent brand voice JSON.")
    parser.add_argument("--overrides-json", default=None)
    parser.add_argument("--output", default="data/verified/content-agent/brand-voice.json")
    args = parser.parse_args()
    overrides = json.loads(args.overrides_json) if args.overrides_json else None
    result = write_brand_voice(overrides, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
