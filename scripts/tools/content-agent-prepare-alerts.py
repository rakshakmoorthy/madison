"""Prepare local content-agent alert contracts.

Purpose: Convert scored variants and Reddit engagement rows into Discord-style local alert payloads.
Input: Approved variants, needs-review variants, and Reddit engagement JSON.
Output: JSON object written to logs/content-agent-alerts.json.
Side effects: File write to logs/; no network calls and no live posting.
Idempotent: yes, because identical inputs produce identical alert payloads.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def _load_rows(path: str | Path) -> list[dict[str, Any]]:
    target = Path(path)
    if not target.exists():
        return []
    data = json.loads(target.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError(f"{target} must contain a JSON array.")
    return data


def prepare_alerts(
    approved_path: str | Path = "data/verified/content-agent/approved-variants.json",
    needs_review_path: str | Path = "data/verified/content-agent/needs-review-variants.json",
    engagement_path: str | Path = "data/verified/content-agent/reddit-engagement.json",
    output_path: str | Path = "logs/content-agent-alerts.json",
) -> dict[str, Any]:
    """Convert scored variants and Reddit engagement rows into local alert payloads."""

    approved = _load_rows(approved_path)
    needs_review = _load_rows(needs_review_path)
    engagement = _load_rows(engagement_path)
    flagged_posts = [row for row in engagement if row.get("best_content")]
    unflagged_posts = [row for row in engagement if not row.get("best_content")]
    alerts = {
        "workflow": "content-agent",
        "live_posting": False,
        "approved-variant-alerts": [f"Auto-approved and ready for visual generation: {row.get('headline', '')}" for row in approved],
        "needs-review-alerts": [f"Failed quality check and requires human review: {row.get('variant_id', '')}" for row in needs_review],
        "high-engagement-post-alerts": [
            f"High-engagement post: {row.get('captions_text', '')} | score {row.get('engagement_score', 0)} | {row.get('post_url', '')}"
            for row in flagged_posts
        ],
        "regular-post-alerts": [
            f"Regular post logged: {row.get('captions_text', '')} | score {row.get('engagement_score', 0)} | {row.get('post_url', '')}"
            for row in unflagged_posts
        ],
    }
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(alerts, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return alerts


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prepare content-agent alert contracts.")
    parser.add_argument("--approved", default="data/verified/content-agent/approved-variants.json")
    parser.add_argument("--needs-review", default="data/verified/content-agent/needs-review-variants.json")
    parser.add_argument("--engagement", default="data/verified/content-agent/reddit-engagement.json")
    parser.add_argument("--output", default="logs/content-agent-alerts.json")
    args = parser.parse_args()
    result = prepare_alerts(args.approved, args.needs_review, args.engagement, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
