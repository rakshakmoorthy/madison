"""Compute intelligence-agent metrics and anomalies.

Purpose: Calculate baseline brand metrics, drift, and anomaly alerts.
Input: Analyzed rows JSON plus optional prior-state JSON.
Output: Metrics JSON written to data/verified/intelligence-agent/metrics.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical inputs produce identical metrics.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


BRANDS = ["apple", "samsung", "google", "microsoft"]


def compute_metrics(input_path: str | Path = "data/verified/intelligence-agent/analyzed-items.json", prior_path: str | Path = "data/raw/intelligence-agent/prior-state.json", output_path: str | Path = "data/verified/intelligence-agent/metrics.json") -> dict[str, Any]:
    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    prior = json.loads(Path(prior_path).read_text(encoding="utf-8")) if Path(prior_path).exists() else {}
    previous = prior.get("previous_metrics", {})
    metrics = {"timestamp": datetime.now(timezone.utc).isoformat(), "brands": {}, "summary": {"totalItems": len(rows), "period": "current"}}
    for brand in BRANDS:
        metrics["brands"][brand] = {"mentions": 0, "sentiment": {"total": 0, "count": 0, "avg": 0.5}, "positive": 0, "neutral": 0, "negative": 0, "sources": {}, "engagement": {"total": 0, "count": 0, "avg": 0}}
    for row in rows:
        brand = str(row.get("brand") or "other").lower()
        metrics["brands"].setdefault(brand, {"mentions": 0, "sentiment": {"total": 0, "count": 0, "avg": 0.5}, "positive": 0, "neutral": 0, "negative": 0, "sources": {}, "engagement": {"total": 0, "count": 0, "avg": 0}})
        data = metrics["brands"][brand]
        data["mentions"] += 1
        score = float(row.get("sentimentScore") or 0.5)
        data["sentiment"]["total"] += score
        data["sentiment"]["count"] += 1
        sentiment = str(row.get("sentiment") or "neutral").lower()
        data["positive" if "positive" in sentiment else "negative" if "negative" in sentiment else "neutral"] += 1
        engagement = float(row.get("engagementScore") or 0)
        if engagement:
            data["engagement"]["total"] += engagement
            data["engagement"]["count"] += 1
        source = str(row.get("source") or "unknown")
        data["sources"][source] = data["sources"].get(source, 0) + 1
    anomalies = {"brandAnomalies": {}, "criticalAlerts": [], "warnings": [], "trend": "stable", "hasCriticalAlerts": False}
    for brand, data in metrics["brands"].items():
        count = data["mentions"]
        if data["sentiment"]["count"]:
            data["sentiment"]["avg"] = data["sentiment"]["total"] / data["sentiment"]["count"]
        if data["engagement"]["count"]:
            data["engagement"]["avg"] = data["engagement"]["total"] / data["engagement"]["count"]
        data["positivePercent"] = (data["positive"] / count * 100) if count else 0
        data["neutralPercent"] = (data["neutral"] / count * 100) if count else 0
        data["negativePercent"] = (data["negative"] / count * 100) if count else 0
        prev = float(previous.get(brand, data["sentiment"]["avg"]) or data["sentiment"]["avg"])
        drift = data["sentiment"]["avg"] - prev
        data["drift"] = {"value": drift, "percent": (drift / prev * 100) if prev else 0, "direction": "up" if drift > 0 else "down" if drift < 0 else "stable"}
        brand_alerts = []
        if data["sentiment"]["avg"] < 0.2 and count > 2:
            brand_alerts.append({"type": "low_sentiment", "severity": "critical", "message": f"Sentiment critically low: {data['sentiment']['avg']:.2f}"})
        if data["negativePercent"] > 50 and count > 1:
            brand_alerts.append({"type": "high_negative", "severity": "warning", "message": f"High negative content: {data['negativePercent']:.1f}%"})
        if abs(drift) > 0.3:
            brand_alerts.append({"type": "significant_drift", "severity": "warning", "message": f"Significant sentiment drift: {drift:.2f}"})
        if brand_alerts:
            anomalies["brandAnomalies"][brand] = brand_alerts
            for alert in brand_alerts:
                (anomalies["criticalAlerts"] if alert["severity"] == "critical" else anomalies["warnings"]).append(f"{brand}: {alert['message']}")
    anomalies["hasCriticalAlerts"] = bool(anomalies["criticalAlerts"])
    result = {"metrics": metrics, "anomalies": anomalies}
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compute intelligence-agent metrics.")
    parser.add_argument("--input", default="data/verified/intelligence-agent/analyzed-items.json")
    parser.add_argument("--prior", default="data/raw/intelligence-agent/prior-state.json")
    parser.add_argument("--output", default="data/verified/intelligence-agent/metrics.json")
    args = parser.parse_args()
    result = compute_metrics(args.input, args.prior, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
