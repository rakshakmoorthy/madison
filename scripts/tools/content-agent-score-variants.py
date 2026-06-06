"""Score content-agent variants.

Purpose: Apply the original weighted quality scoring rule to normalized variants.
Input: Variant rows JSON.
Output: Scored variant rows written to data/verified/content-agent/scored-variants.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical variants and threshold produce identical scores.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def score_variants(
    input_path: str | Path = "data/verified/content-agent/variants.json",
    output_path: str | Path = "data/verified/content-agent/scored-variants.json",
    threshold: int = 130,
) -> list[dict[str, Any]]:
    """Apply the original weighted quality scoring rule to normalized variants."""

    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    if not isinstance(rows, list):
        raise ValueError("Variants input must contain a JSON array.")
    scored: list[dict[str, Any]] = []
    for row in rows:
        headline_len = len(str(row.get("headline", "")))
        body_len = len(str(row.get("body", "")))
        cta_len = len(str(row.get("cta", "")))
        image_len = len(str(row.get("image_prompt", "")))
        score = (headline_len * 0.4) + (body_len * 0.7) + (cta_len * 0.5) + (image_len * 0.2)
        next_row = dict(row)
        next_row["quality_score"] = round(score)
        next_row["popper_pass"] = score >= threshold
        scored.append(next_row)

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(scored, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return scored


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Score content-agent variants.")
    parser.add_argument("--input", default="data/verified/content-agent/variants.json")
    parser.add_argument("--output", default="data/verified/content-agent/scored-variants.json")
    parser.add_argument("--threshold", type=int, default=130)
    args = parser.parse_args()
    result = score_variants(args.input, args.output, args.threshold)
    print(json.dumps(result, indent=2, sort_keys=True))
