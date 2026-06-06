"""Format intelligence-agent report contracts.

Purpose: Create sheet-style rows, alert payloads, and webhook response JSON locally.
Input: Analyzed rows, metrics, knowledge graph, and competitor analysis JSON.
Output: JSON object written to logs/intelligence-agent-reports.json.
Side effects: File write to logs/; no network calls and no live Sheets/webhook writes.
Idempotent: yes, because identical inputs produce identical report contracts except timestamps.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def _load(path: str | Path) -> Any:
    return json.loads(Path(path).read_text(encoding="utf-8"))


def format_reports(analyzed_path: str | Path = "data/verified/intelligence-agent/analyzed-items.json", metrics_path: str | Path = "data/verified/intelligence-agent/metrics.json", graph_path: str | Path = "data/verified/intelligence-agent/knowledge-graph.json", competitor_path: str | Path = "data/verified/intelligence-agent/competitor-analysis.json", output_path: str | Path = "logs/intelligence-agent-reports.json") -> dict[str, Any]:
    analyzed = _load(analyzed_path)
    metrics_bundle = _load(metrics_path)
    graph = _load(graph_path)
    competitor = _load(competitor_path)
    metrics = metrics_bundle["metrics"]
    anomalies = metrics_bundle["anomalies"]
    drift_row: dict[str, Any] = {"timestamp": datetime.now(timezone.utc).isoformat(), "totalItems": metrics["summary"]["totalItems"]}
    for brand, data in metrics["brands"].items():
        drift_row[f"{brand}_mentions"] = data["mentions"]
        drift_row[f"{brand}_sentiment"] = round(data["sentiment"]["avg"], 3)
        drift_row[f"{brand}_negative"] = round(data["negativePercent"], 1)
        drift_row[f"{brand}_drift"] = round(data["drift"]["value"], 3)
    alert = {"noAlert": not (anomalies["hasCriticalAlerts"] or len(anomalies["warnings"]) > 3), "criticalAlerts": anomalies["criticalAlerts"], "warnings": anomalies["warnings"], "severity": "critical" if anomalies["criticalAlerts"] else "warning" if anomalies["warnings"] else "none", "live_posting": False}
    response = {"success": True, "totalProcessed": len(analyzed), "timestamp": datetime.now(timezone.utc).isoformat(), "items": analyzed}
    result = {"workflow": "intelligence-agent", "live_sheet_writes": False, "live_webhook_response": False, "compliance_rows": [row for row in analyzed if row.get("riskScore", 0) >= 40], "drift_metrics_row": drift_row, "knowledge-graph_rows": graph.get("entities", {}), "competitor-analysis": competitor, "alert_contract": alert, "webhook_response_contract": response}
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Format intelligence-agent report contracts.")
    parser.add_argument("--analyzed", default="data/verified/intelligence-agent/analyzed-items.json")
    parser.add_argument("--metrics", default="data/verified/intelligence-agent/metrics.json")
    parser.add_argument("--graph", default="data/verified/intelligence-agent/knowledge-graph.json")
    parser.add_argument("--competitor", default="data/verified/intelligence-agent/competitor-analysis.json")
    parser.add_argument("--output", default="logs/intelligence-agent-reports.json")
    args = parser.parse_args()
    result = format_reports(args.analyzed, args.metrics, args.graph, args.competitor, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
