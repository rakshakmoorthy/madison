"""Parse the marketmind final report into a webhook response contract.

Purpose: Extract the final report and produce the webhook-style JSON response.
Input: marketmind run log.
Output: JSON object written to logs/marketmind-response.json.
Side effects: File write to logs/; no network calls.
Idempotent: yes, because identical run logs and reports produce identical response fields.
Recipe: recipes/marketmind.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def parse_final_report(
    run_log_path: str | Path = "logs/marketmind-run.json",
    output_path: str | Path = "logs/marketmind-response.json",
) -> dict[str, Any]:
    """Extract the final report and produce the webhook-style JSON response."""

    run_log = json.loads(Path(run_log_path).read_text(encoding="utf-8"))
    report_path = Path(run_log.get("final_report_path", ""))
    report = report_path.read_text(encoding="utf-8").strip() if report_path.exists() else ""
    response = {
        "success": bool(run_log.get("success")),
        "product_name": run_log.get("product_name"),
        "industry": run_log.get("industry"),
        "geography": run_log.get("geography"),
        "scale": run_log.get("scale"),
        "final_report": report,
        "note": "If final_report is empty, check that final_report_path was created. raw_stdout_tail included for debugging.",
        "raw_stdout_tail": run_log.get("stdout_tail", ""),
        "flags": run_log.get("flags", []),
        "live_outputs": False,
    }
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(response, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return response


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Parse marketmind final report.")
    parser.add_argument("--run-log", default="logs/marketmind-run.json")
    parser.add_argument("--output", default="logs/marketmind-response.json")
    args = parser.parse_args()
    result = parse_final_report(args.run_log, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
