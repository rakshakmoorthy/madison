"""Analyze intelligence-agent items with local heuristics.

Purpose: Add sentiment, summary, and compliance-risk fields without live model calls.
Input: New item rows JSON.
Output: Analyzed rows written to data/verified/intelligence-agent/analyzed-items.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical inputs produce identical analysis rows.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


NEGATIVE = {"issue", "problem", "bug", "defect", "lawsuit", "fine", "penalty", "investigation", "violation", "antitrust", "breach"}
POSITIVE = {"launch", "unveils", "announced", "praise", "faster", "impressive", "improve", "growth", "award"}


def _brand(row: dict[str, Any]) -> str:
    text = f"{row.get('title', '')} {row.get('description', '')}".lower()
    if "samsung" in text or "galaxy" in text:
        return "samsung"
    if "google" in text or "pixel" in text or "android" in text:
        return "google"
    if "microsoft" in text or "windows" in text or "surface" in text:
        return "microsoft"
    return str(row.get("brand") or "apple").lower()


def analyze(input_path: str | Path = "data/verified/intelligence-agent/new-items.json", output_path: str | Path = "data/verified/intelligence-agent/analyzed-items.json") -> list[dict[str, Any]]:
    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    analyzed = []
    now = datetime.now(timezone.utc).isoformat()
    for row in rows:
        text = f"{row.get('title', '')} {row.get('description', '')}".lower()
        neg = sum(1 for word in NEGATIVE if word in text)
        pos = sum(1 for word in POSITIVE if word in text)
        score = max(0.05, min(0.95, 0.5 + (pos * 0.12) - (neg * 0.12)))
        sentiment = "Positive" if score >= 0.6 else "Negative" if score <= 0.4 else "Neutral"
        risk_score = min(100, 25 + neg * 20) if row.get("category") == "compliance" or any(word in text for word in ["regulatory", "compliance", "antitrust", "fine", "penalty"]) else 10
        next_row = dict(row)
        next_row.update({
            "timestamp": now,
            "brand": _brand(row),
            "sentiment": sentiment,
            "sentimentScore": round(score, 3),
            "summary": str(row.get("description") or row.get("title") or "")[:240],
            "riskLevel": "HIGH" if risk_score >= 70 else "MEDIUM" if risk_score >= 40 else "LOW",
            "riskScore": risk_score,
            "analysisStatus": "heuristic",
        })
        analyzed.append(next_row)
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(analyzed, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return analyzed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze intelligence-agent items.")
    parser.add_argument("--input", default="data/verified/intelligence-agent/new-items.json")
    parser.add_argument("--output", default="data/verified/intelligence-agent/analyzed-items.json")
    args = parser.parse_args()
    result = analyze(args.input, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
