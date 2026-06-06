"""Split content-agent variants into approved and needs-review lanes.

Purpose: Split scored variants by popper_pass and write JSON plus CSV artifacts.
Input: Scored variant rows JSON.
Output: Approved and needs-review files under data/verified/content-agent/.
Side effects: File writes to data/verified/; no network calls.
Idempotent: yes, because identical scored rows produce identical split files.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from typing import Any


def _write_csv(rows: list[dict[str, Any]], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = sorted({key for row in rows for key in row.keys()}) or ["empty"]
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def split_variants(
    input_path: str | Path = "data/verified/content-agent/scored-variants.json",
    output_dir: str | Path = "data/verified/content-agent",
) -> dict[str, Any]:
    """Split scored variants by popper_pass and write JSON plus CSV artifacts."""

    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    if not isinstance(rows, list):
        raise ValueError("Scored variants input must contain a JSON array.")
    approved = [row for row in rows if bool(row.get("popper_pass"))]
    needs_review = [row for row in rows if not bool(row.get("popper_pass"))]
    destination = Path(output_dir)
    destination.mkdir(parents=True, exist_ok=True)
    (destination / "approved-variants.json").write_text(json.dumps(approved, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    (destination / "needs-review-variants.json").write_text(json.dumps(needs_review, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    _write_csv(approved, destination / "approved-variants.csv")
    _write_csv(needs_review, destination / "needs-review-variants.csv")
    return {
        "workflow": "content-agent",
        "approved-count": len(approved),
        "needs-review-count": len(needs_review),
        "approved-path": str(destination / "approved-variants.json"),
        "needs-review-path": str(destination / "needs-review-variants.json"),
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Split content-agent variants.")
    parser.add_argument("--input", default="data/verified/content-agent/scored-variants.json")
    parser.add_argument("--output-dir", default="data/verified/content-agent")
    args = parser.parse_args()
    result = split_variants(args.input, args.output_dir)
    print(json.dumps(result, indent=2, sort_keys=True))
