"""Compute content-agent Reddit engagement.

Purpose: Score Reddit posts and flag weekly best content.
Input: Normalized Reddit post rows JSON.
Output: Scored rows written to data/verified/content-agent/reddit-engagement.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical post rows and thresholds produce identical scores.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import json
from collections import defaultdict
from pathlib import Path
from typing import Any


def compute_engagement(
    input_path: str | Path = "data/raw/content-agent/reddit-posts.json",
    output_path: str | Path = "data/verified/content-agent/reddit-engagement.json",
    top_n: int = 10,
    floor: int = 3,
) -> list[dict[str, Any]]:
    """Score Reddit posts and flag weekly best content."""

    rows = json.loads(Path(input_path).read_text(encoding="utf-8"))
    if not isinstance(rows, list):
        raise ValueError("Reddit post input must contain a JSON array.")
    groups: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in rows:
        normalized = dict(row)
        likes = int(normalized.get("like_count") or normalized.get("ups") or normalized.get("score") or 0)
        comments = int(normalized.get("comment_count") or normalized.get("num_comments") or 0)
        normalized["like_count"] = likes
        normalized["comment_count"] = comments
        normalized["engagement_score"] = likes + comments
        normalized["engagement_rate"] = 0
        key = f"{normalized.get('subreddit', 'ALL')}|{normalized.get('keyword', 'ALL')}"
        groups[key].append(normalized)

    output: list[dict[str, Any]] = []
    for group_rows in groups.values():
        group_rows.sort(key=lambda row: row.get("engagement_score", 0), reverse=True)
        for index, row in enumerate(group_rows):
            row["best_content"] = index < top_n and int(row.get("engagement_score", 0)) >= floor
            output.append(row)

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(output, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compute content-agent Reddit engagement.")
    parser.add_argument("--input", default="data/raw/content-agent/reddit-posts.json")
    parser.add_argument("--output", default="data/verified/content-agent/reddit-engagement.json")
    parser.add_argument("--top-n", type=int, default=10)
    parser.add_argument("--floor", type=int, default=3)
    args = parser.parse_args()
    result = compute_engagement(args.input, args.output, args.top_n, args.floor)
    print(json.dumps(result, indent=2, sort_keys=True))
