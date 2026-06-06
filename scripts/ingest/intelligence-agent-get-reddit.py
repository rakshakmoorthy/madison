"""Fetch or sample intelligence-agent Reddit rows.

Purpose: Fetch Reddit posts for brand intelligence.
Input: Local JSON export, live subreddit fetch, or sample rows.
Output: JSON array written to data/raw/intelligence-agent/reddit.json.
Side effects: Optional network calls; file write to data/raw/.
Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen


SAMPLE_ROWS = [
    {"title": "iPhone users praise new update", "description": "The update feels faster and fixes a battery issue.", "pubDate": "2026-06-05T14:00:00+00:00", "link": "https://reddit.com/r/iphone/sample", "source": "Reddit r/iphone", "brand": "Apple", "redditScore": 120, "comments": 34, "engagementScore": 0.188, "fullText": "iPhone users praise new update. The update feels faster and fixes a battery issue."},
    {"title": "Pixel AI feature gets mixed reviews", "description": "Some users call it useful while others report bugs.", "pubDate": "2026-06-05T16:00:00+00:00", "link": "https://reddit.com/r/googlepixel/sample", "source": "Reddit r/googlepixel", "brand": "Google", "redditScore": 45, "comments": 20, "engagementScore": 0.085, "fullText": "Pixel AI feature gets mixed reviews. Some users call it useful while others report bugs."},
]


def _normalize_listing(payload: dict[str, Any], brand: str, subreddit: str) -> list[dict[str, Any]]:
    rows = []
    for child in payload.get("data", {}).get("children", []):
        data = child.get("data", {})
        if data.get("stickied"):
            continue
        title = (data.get("title") or "").strip()
        description = (data.get("selftext") or "")[:1000].strip()
        permalink = data.get("permalink", "")
        rows.append({"title": title, "description": description, "pubDate": data.get("created_utc", ""), "link": f"https://www.reddit.com{permalink}", "source": f"Reddit r/{data.get('subreddit') or subreddit}", "brand": brand, "redditScore": data.get("score") or 0, "comments": data.get("num_comments") or 0, "engagementScore": min(1, ((data.get("score") or 0) + (data.get("num_comments") or 0) * 2) / 1000), "fullText": f"{title}. {description}"})
    return rows


def fetch_reddit(brand: str = "Apple", subreddit: str = "iphone", json_path: str | Path | None = None, output_path: str | Path = "data/raw/intelligence-agent/reddit.json", sample: bool = False) -> list[dict[str, Any]]:
    if sample:
        rows = SAMPLE_ROWS
    elif json_path:
        rows = json.loads(Path(json_path).read_text(encoding="utf-8"))
    else:
        url = f"https://www.reddit.com/r/{subreddit}/new.json?limit=10"
        with urlopen(Request(url, headers={"User-Agent": "madison-intelligence-agent/1.0"}), timeout=30) as response:
            rows = _normalize_listing(json.loads(response.read().decode("utf-8")), brand, subreddit)
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch intelligence-agent Reddit rows.")
    parser.add_argument("--brand", default="Apple")
    parser.add_argument("--subreddit", default="iphone")
    parser.add_argument("--json", default=None)
    parser.add_argument("--output", default="data/raw/intelligence-agent/reddit.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = fetch_reddit(args.brand, args.subreddit, args.json, args.output, sample=args.sample or not args.json)
    print(json.dumps(result, indent=2, sort_keys=True))
