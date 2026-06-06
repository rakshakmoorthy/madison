"""Prepare survey-analysis output contracts.

Purpose: Create local Slack, MySQL, Grafana, and response payload contracts.
Input: Aggregate survey-analysis JSON.
Output: JSON object written to logs/survey-analysis-outputs.json.
Side effects: File write to logs/; no live Slack, MySQL, or Grafana calls.
Idempotent: yes, because identical aggregate input produces identical contracts except timestamp.
Recipe: recipes/survey-analysis.md
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def prepare_outputs(input_path: str | Path = "data/verified/survey-analysis/aggregate.json", output_path: str | Path = "logs/survey-analysis-outputs.json") -> dict[str, Any]:
    """Create local Slack, MySQL, Grafana, and response payload contracts."""

    aggregate = json.loads(Path(input_path).read_text(encoding="utf-8"))
    dist = aggregate.get("sentiment_distribution", {})
    now = datetime.now(timezone.utc).isoformat()
    batch_id = now
    mysql_rows = [
        {"kind": "sentiment", "batch_id": batch_id, "sentiment": "positive", "count": int(dist.get("positive", 0)), "created_at": now},
        {"kind": "sentiment", "batch_id": batch_id, "sentiment": "neutral", "count": int(dist.get("neutral", 0)), "created_at": now},
        {"kind": "sentiment", "batch_id": batch_id, "sentiment": "negative", "count": int(dist.get("negative", 0)), "created_at": now},
        {"kind": "nps", "batch_id": batch_id, "nps": aggregate.get("nps"), "created_at": now},
    ]
    slack_payload = {
        "channel": "#survey-analysis",
        "text": "Survey Analysis Complete",
        "blocks": [
            {"type": "header", "text": {"type": "plain_text", "text": "Survey Analysis Complete"}},
            {"type": "section", "fields": [
                {"type": "mrkdwn", "text": f"*Responses Analyzed:*\n{aggregate.get('total_responses', 0)}"},
                {"type": "mrkdwn", "text": f"*NPS:*\n{aggregate.get('nps', 'N/A')}"},
                {"type": "mrkdwn", "text": f"*Positive / Neutral / Negative:*\n{dist.get('positive', 0)} / {dist.get('neutral', 0)} / {dist.get('negative', 0)}"},
            ]},
        ],
    }
    grafana_payload = {
        "live_posting": False,
        "dashboard": {
            "title": "Survey Dashboard",
            "panels": [
                {"title": "Sentiment distribution", "type": "piechart", "source": "sentiment_distribution"},
                {"title": "Latest NPS", "type": "stat", "source": "nps_scores"},
            ],
        },
    }
    result = {
        "workflow": "survey-analysis",
        "live_slack_send": False,
        "live_mysql_writes": False,
        "live_grafana_update": False,
        "slack_payload": slack_payload,
        "mysql_insert_rows": mysql_rows,
        "grafana_dashboard_contract": grafana_payload,
        "response_contract": {"success": True, **aggregate},
        "generated_at": now,
    }
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prepare survey-analysis output contracts.")
    parser.add_argument("--input", default="data/verified/survey-analysis/aggregate.json")
    parser.add_argument("--output", default="logs/survey-analysis-outputs.json")
    args = parser.parse_args()
    result = prepare_outputs(args.input, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
