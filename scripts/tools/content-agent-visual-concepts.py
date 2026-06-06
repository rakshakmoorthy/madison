"""Create content-agent visual concept prompts.

Purpose: Produce visual concept prompts for approved variants.
Input: Approved variants JSON and brand voice JSON.
Output: JSON array written to data/verified/content-agent/visual-concepts.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical variants and brand voice produce identical concepts.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def _load(path: str | Path, fallback: Any) -> Any:
    target = Path(path)
    if not target.exists():
        return fallback
    return json.loads(target.read_text(encoding="utf-8"))


def create_visual_concepts(
    variants_path: str | Path = "data/verified/content-agent/approved-variants.json",
    brand_voice_path: str | Path = "data/verified/content-agent/brand-voice.json",
    output_path: str | Path = "data/verified/content-agent/visual-concepts.json",
) -> list[dict[str, Any]]:
    """Produce visual concept prompts for approved variants."""

    variants = _load(variants_path, [])
    brand = _load(brand_voice_path, {})
    concepts: list[dict[str, Any]] = []
    for row in variants:
        concepts.append(
            {
                "brief_id": row.get("brief_id", "UNKNOWN"),
                "variant_id": row.get("variant_id", ""),
                "concept_prompt": f"Create {brand.get('visual_style', 'minimal')} visual for \"{row.get('headline', '')}\"."
                + (f" Palette: {', '.join(brand.get('brand_colors', []))}." if isinstance(brand.get("brand_colors"), list) else ""),
                "notes": "Auto-approved for visual generation" if row.get("popper_pass") else "Human review required before production",
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(concepts, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return concepts


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create content-agent visual concept prompts.")
    parser.add_argument("--variants", default="data/verified/content-agent/approved-variants.json")
    parser.add_argument("--brand-voice", dest="brand_voice", default="data/verified/content-agent/brand-voice.json")
    parser.add_argument("--output", default="data/verified/content-agent/visual-concepts.json")
    args = parser.parse_args()
    result = create_visual_concepts(args.variants, args.brand_voice, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
