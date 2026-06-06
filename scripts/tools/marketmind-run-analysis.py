"""Run or sample the marketmind analysis command.

Purpose: Produce the final marketmind strategy report from normalized inputs.
Input: Normalized marketmind input JSON and mode.
Output: Markdown final report and run log.
Side effects: File writes to data/verified/marketmind/ and logs/; live mode may execute stored main.py.
Idempotent: sample mode is deterministic; live mode depends on external services.
Recipe: recipes/marketmind.md
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def _load_inputs(path: str | Path) -> dict[str, Any]:
    target = Path(path)
    if not target.exists():
        raise FileNotFoundError(f"Input contract not found: {target}")
    data = json.loads(target.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Input contract must contain a JSON object.")
    return data


def _sample_report(inputs: dict[str, Any]) -> str:
    product = inputs["product_name"]
    industry = inputs["industry"]
    geography = inputs["geography"]
    scale = inputs["scale"]
    return f"""# Market Strategy Report for {product}

**Industry:** {industry}
**Geography:** {geography}
**Scale:** {scale}
**Mode:** Sample verification run

## Executive Summary

This sample report verifies the marketmind workflow contract without calling external services. It demonstrates where the stored `main.py` output will be captured after human clearance for a live run.

## Research Plan

- Clarify buyer problem, use context, and decision criteria.
- Identify plausible competitors and substitution options.
- Compare pricing, features, positioning, and review sentiment only when source-backed.

## Decision Notes

- Live analysis requires `OPENAI_API_KEY` and `SERPER_API_KEY`.
- Human review is required before treating generated recommendations as market advice.
"""


def run_analysis(
    input_path: str | Path = "data/verified/marketmind/inputs.json",
    output_dir: str | Path = "data/verified/marketmind/outputs",
    log_path: str | Path = "logs/marketmind-run.json",
    live: bool = False,
) -> dict[str, Any]:
    """Produce the final marketmind strategy report from normalized inputs."""

    inputs = _load_inputs(input_path)
    destination = Path(output_dir)
    destination.mkdir(parents=True, exist_ok=True)
    final_report_path = destination / "final-market-strategy-report.md"
    stdout = ""
    stderr = ""
    returncode = 0
    flags: list[str] = []

    if live:
        missing = [name for name in ("OPENAI_API_KEY", "SERPER_API_KEY") if not os.environ.get(name)]
        if missing:
            raise ValueError(f"Live mode requires environment variables: {', '.join(missing)}")
        repo_path = Path(inputs["repo_path"])
        main_path = repo_path / "main.py"
        if not main_path.exists():
            raise FileNotFoundError(f"Stored marketmind main.py not found: {main_path}")
        env = os.environ.copy()
        env.update(
            {
                "PRODUCT_NAME": inputs["product_name"],
                "INDUSTRY": inputs["industry"],
                "GEOGRAPHY": inputs["geography"],
                "SCALE": inputs["scale"],
            }
        )
        completed = subprocess.run(
            ["python3", "main.py"],
            cwd=repo_path,
            env=env,
            text=True,
            capture_output=True,
            timeout=3600,
            check=False,
        )
        stdout = completed.stdout
        stderr = completed.stderr
        returncode = completed.returncode
        source_report = repo_path / "outputs" / "final-market-strategy-report.md"
        if returncode != 0:
            flags.append("main_py_nonzero_exit")
        if source_report.exists():
            final_report_path.write_text(source_report.read_text(encoding="utf-8"), encoding="utf-8")
        else:
            flags.append("final_report_missing")
            final_report_path.write_text("(No final report generated: outputs/final-market-strategy-report.md not found.)\n", encoding="utf-8")
    else:
        flags.append("sample_mode_no_external_services")
        final_report_path.write_text(_sample_report(inputs), encoding="utf-8")
        stdout = f"---FINAL_REPORT_START---\n{final_report_path.read_text(encoding='utf-8')}\n---FINAL_REPORT_END---\n"

    log = {
        "workflow": "marketmind",
        "mode": "live" if live else "sample",
        "success": returncode == 0 and "final_report_missing" not in flags,
        "product_name": inputs["product_name"],
        "industry": inputs["industry"],
        "geography": inputs["geography"],
        "scale": inputs["scale"],
        "repo_path": inputs["repo_path"],
        "final_report_path": str(final_report_path),
        "stdout_tail": stdout[-2000:],
        "stderr_tail": stderr[-2000:],
        "returncode": returncode,
        "flags": flags,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
    log_destination = Path(log_path)
    log_destination.parent.mkdir(parents=True, exist_ok=True)
    log_destination.write_text(json.dumps(log, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return log


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run or sample marketmind analysis.")
    parser.add_argument("--input", default="data/verified/marketmind/inputs.json")
    parser.add_argument("--output-dir", default="data/verified/marketmind/outputs")
    parser.add_argument("--log", default="logs/marketmind-run.json")
    parser.add_argument("--live", action="store_true", help="Execute stored marketmind main.py after human clearance.")
    args = parser.parse_args()
    result = run_analysis(args.input, args.output_dir, args.log, live=args.live)
    print(json.dumps(result, indent=2, sort_keys=True))
