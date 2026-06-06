"""Build intelligence-agent knowledge graph.

Purpose: Extract brand entities, co-mentions, and topic relationships.
Input: Analyzed rows JSON.
Output: Graph JSON written to data/verified/intelligence-agent/knowledge-graph.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical inputs produce identical graph structure.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


BRANDS = ["apple", "samsung", "google", "microsoft"]
TOPICS = ["iphone", "galaxy", "pixel", "surface", "android", "ios", "windows", "mac", "ipad", "privacy", "antitrust"]


def build_graph(input_path: str | Path = "data/verified/intelligence-agent/analyzed-items.json", output_path: str | Path = "data/verified/intelligence-agent/knowledge-graph.json") -> dict[str, Any]:
    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    graph: dict[str, Any] = {"entities": {}, "relationships": [], "coMentions": {}, "timestamp": datetime.now(timezone.utc).isoformat()}
    for row in rows:
        text = f"{row.get('title', '')} {row.get('description', '')}".lower()
        mentioned = [brand for brand in BRANDS if brand in text or str(row.get("brand", "")).lower() == brand]
        for brand in mentioned:
            entity = graph["entities"].setdefault(brand, {"type": "brand", "mentions": 0, "sentimentScores": [], "sources": {}, "topics": {}})
            entity["mentions"] += 1
            entity["sentimentScores"].append(float(row.get("sentimentScore") or 0.5))
            source = str(row.get("source") or "unknown")
            entity["sources"][source] = entity["sources"].get(source, 0) + 1
            for topic in TOPICS:
                if topic in text:
                    entity["topics"][topic] = entity["topics"].get(topic, 0) + 1
        for i, source in enumerate(mentioned):
            for target in mentioned[i + 1:]:
                key = "-".join(sorted([source, target]))
                graph["coMentions"][key] = graph["coMentions"].get(key, 0) + 1
                graph["relationships"].append({"source": source, "target": target, "type": "co-mentioned", "context": str(row.get("title", ""))[:100], "sentiment": row.get("sentiment", "Neutral")})
    for entity in graph["entities"].values():
        scores = entity["sentimentScores"]
        entity["avgSentiment"] = sum(scores) / len(scores) if scores else 0.5
        entity["topTopics"] = [{"topic": topic, "count": count} for topic, count in sorted(entity["topics"].items(), key=lambda item: item[1], reverse=True)[:3]]
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(graph, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return graph


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build intelligence-agent knowledge graph.")
    parser.add_argument("--input", default="data/verified/intelligence-agent/analyzed-items.json")
    parser.add_argument("--output", default="data/verified/intelligence-agent/knowledge-graph.json")
    args = parser.parse_args()
    result = build_graph(args.input, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
