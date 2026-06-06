"""Normalize marketmind webhook inputs.

Purpose: Apply marketmind defaults and write a stable input contract.
Input: JSON payload or built-in sample defaults.
Output: JSON object written to data/verified/marketmind/inputs.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical inputs produce identical normalized fields.
Recipe: recipes/marketmind.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


DEFAULTS = {
    "product_name": "EcoWave Smart Bottle",
    "industry": "Consumer Goods",
    "geography": "Global",
    "scale": "SME",
    "repo_path": "scripts/madison-main/marketmind/code",
}


def normalize_inputs(
    payload: dict[str, Any] | None = None,
    output_path: str | Path = "data/verified/marketmind/inputs.json",
) -> dict[str, Any]:
    """Apply marketmind defaults and write a stable input contract."""

    payload = payload or {}
    body = payload.get("body", payload)
    normalized = {
        key: str(body.get(key) or default).strip()
        for key, default in DEFAULTS.items()
    }
    normalized["workflow"] = "marketmind"
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(normalized, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return normalized


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Normalize marketmind webhook inputs.")
    parser.add_argument("--payload-json", default=None)
    parser.add_argument("--payload-file", default=None)
    parser.add_argument("--output", default="data/verified/marketmind/inputs.json")
    args = parser.parse_args()
    if args.payload_file:
        payload_obj = json.loads(Path(args.payload_file).read_text(encoding="utf-8"))
    elif args.payload_json:
        payload_obj = json.loads(args.payload_json)
    else:
        payload_obj = {}
    result = normalize_inputs(payload_obj, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
