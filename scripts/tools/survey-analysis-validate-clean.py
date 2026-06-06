"""Validate and clean survey-analysis rows.

Purpose: Normalize survey rows and separate invalid records.
Input: Raw survey JSON array.
Output: Clean and invalid JSON arrays under data/verified/survey-analysis/.
Side effects: File writes to data/verified/; no network calls.
Idempotent: yes, because identical raw rows produce identical clean rows.
Recipe: recipes/survey-analysis.md
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


def _num(value: Any) -> float | None:
    text = re.sub(r"[^0-9.-]", "", str(value if value is not None else ""))
    if not text:
        return None
    try:
        return float(text)
    except ValueError:
        return None


def _text(value: Any) -> str:
    return str(value if value is not None else "").strip().strip('"').strip(",")


def validate_clean(input_path: str | Path = "data/raw/survey-analysis/survey-rows.json", output_path: str | Path = "data/verified/survey-analysis/clean-rows.json", invalid_path: str | Path = "data/verified/survey-analysis/invalid-rows.json") -> dict[str, Any]:
    """Normalize survey rows and separate invalid records."""

    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    clean: list[dict[str, Any]] = []
    invalid: list[dict[str, Any]] = []
    for row in rows:
        normalized = {
            "respondent_id": _text(row.get("respondent_id") or row.get("RespondentID")),
            "age": _num(row.get("age") or row.get("Age")),
            "gender": _text(row.get("gender") or row.get("Gender")).upper(),
            "q1_satisfaction": _num(row.get("q1_satisfaction") or row.get("Q1_Satisfaction")),
            "q2_easeofuse": _num(row.get("q2_easeofuse") or row.get("Q2_EaseOfUse")),
            "q3_recommend": _num(row.get("q3_recommend") or row.get("Q3_Recommend")),
        }
        errors = [key for key in ("age", "q1_satisfaction", "q2_easeofuse", "q3_recommend") if normalized[key] is None]
        if not normalized["respondent_id"]:
            errors.append("respondent_id")
        if errors:
            invalid.append({"row": row, "_valid": False, "_errors": errors})
        else:
            normalized["_valid"] = True
            normalized["_errors"] = []
            clean.append(normalized)

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    Path(output_path).write_text(json.dumps(clean, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    Path(invalid_path).parent.mkdir(parents=True, exist_ok=True)
    Path(invalid_path).write_text(json.dumps(invalid, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return {"workflow": "survey-analysis", "valid_rows": len(clean), "invalid-rows": len(invalid), "clean_path": str(output_path), "invalid_path": str(invalid_path)}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Validate and clean survey-analysis rows.")
    parser.add_argument("--input", default="data/raw/survey-analysis/survey-rows.json")
    parser.add_argument("--output", default="data/verified/survey-analysis/clean-rows.json")
    parser.add_argument("--invalid", default="data/verified/survey-analysis/invalid-rows.json")
    args = parser.parse_args()
    result = validate_clean(args.input, args.output, args.invalid)
    print(json.dumps(result, indent=2, sort_keys=True))
