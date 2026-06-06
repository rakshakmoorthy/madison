"""Build intelligence-agent competitor analysis.

Purpose: Calculate share of voice, sentiment ranking, competitive gaps, and alerts.
Input: Analyzed rows JSON.
Output: Analysis JSON written to data/verified/intelligence-agent/competitor-analysis.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical inputs produce identical analysis.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


BRANDS = ["apple", "samsung", "google", "microsoft"]


def analyze_competitors(input_path: str | Path = "data/verified/intelligence-agent/analyzed-items.json", output_path: str | Path = "data/verified/intelligence-agent/competitor-analysis.json") -> dict[str, Any]:
    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    analysis: dict[str, Any] = {"timestamp": datetime.now(timezone.utc).isoformat(), "brands": {brand: {"mentions": 0, "sentimentScores": [], "positive": 0, "neutral": 0, "negative": 0} for brand in BRANDS}, "shareOfVoice": {}, "sentimentRanking": [], "competitiveGaps": [], "alerts": []}
    for row in rows:
        brand = str(row.get("brand") or "").lower()
        if brand not in analysis["brands"]:
            continue
        data = analysis["brands"][brand]
        data["mentions"] += 1
        data["sentimentScores"].append(float(row.get("sentimentScore") or 0.5))
        sentiment = str(row.get("sentiment") or "neutral").lower()
        data["positive" if "positive" in sentiment else "negative" if "negative" in sentiment else "neutral"] += 1
    total_mentions = sum(data["mentions"] for data in analysis["brands"].values())
    for brand, data in analysis["brands"].items():
        data["avgSentiment"] = sum(data["sentimentScores"]) / len(data["sentimentScores"]) if data["sentimentScores"] else 0.5
        data["positivePercent"] = data["positive"] / data["mentions"] * 100 if data["mentions"] else 0
        data["negativePercent"] = data["negative"] / data["mentions"] * 100 if data["mentions"] else 0
        analysis["shareOfVoice"][brand] = data["mentions"] / total_mentions * 100 if total_mentions else 0
        analysis["sentimentRanking"].append({"brand": brand, "sentiment": data["avgSentiment"], "mentions": data["mentions"], "positivePercent": data["positivePercent"], "negativePercent": data["negativePercent"]})
    analysis["sentimentRanking"].sort(key=lambda row: row["sentiment"], reverse=True)
    if analysis["sentimentRanking"]:
        leader = analysis["sentimentRanking"][0]
        for competitor in analysis["sentimentRanking"][1:]:
            analysis["competitiveGaps"].append({"leader": leader["brand"], "competitor": competitor["brand"], "sentimentGap": round(leader["sentiment"] - competitor["sentiment"], 3), "mentionGap": leader["mentions"] - competitor["mentions"]})
            if competitor["negativePercent"] > 40 and competitor["mentions"] > 1:
                analysis["alerts"].append(f"High negative content for {competitor['brand']}: {competitor['negativePercent']:.1f}% negative")
    analysis["summary"] = {"totalBrands": len(BRANDS), "marketLeader": analysis["sentimentRanking"][0]["brand"] if analysis["sentimentRanking"] else "none", "totalAlerts": len(analysis["alerts"]), "totalMentions": total_mentions}
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(analysis, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return analysis


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build intelligence-agent competitor analysis.")
    parser.add_argument("--input", default="data/verified/intelligence-agent/analyzed-items.json")
    parser.add_argument("--output", default="data/verified/intelligence-agent/competitor-analysis.json")
    args = parser.parse_args()
    result = analyze_competitors(args.input, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
