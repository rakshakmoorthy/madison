"""Fetch or sample content-agent Reddit post rows.

Purpose: Fetch Reddit search rows for the content-agent weekly engagement scan.
Input: Reddit search query, local JSON export, or built-in sample rows.
Output: JSON array written to data/raw/content-agent/reddit-posts.json.
Side effects: Optional network call to Reddit JSON search; file write to data/raw/.
Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
Recipe: recipes/content-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any
from urllib.parse import quote
from urllib.request import Request, urlopen


SAMPLE_ROWS: list[dict[str, Any]] = [
    {
        "platform": "reddit",
        "post_id": "abc123",
        "post_url": "https://www.reddit.com/r/artificial/comments/abc123/sample",
        "author": "sample_user",
        "published_at": "2026-06-05T15:00:00+00:00",
        "like_count": 42,
        "share_count": 0,
        "view_count": 0,
        "captions_text": "How AI agents are changing brand workflows",
        "comment_count": 18,
        "subreddit": "artificial",
        "permalink": "/r/artificial/comments/abc123/sample",
    },
    {
        "platform": "reddit",
        "post_id": "def456",
        "post_url": "https://www.reddit.com/r/marketing/comments/def456/sample",
        "author": "brand_builder",
        "published_at": "2026-06-05T17:30:00+00:00",
        "like_count": 2,
        "share_count": 0,
        "view_count": 0,
        "captions_text": "Question about content calendars",
        "comment_count": 0,
        "subreddit": "marketing",
        "permalink": "/r/marketing/comments/def456/sample",
    },
]


def _normalize_reddit_listing(payload: dict[str, Any]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for child in payload.get("data", {}).get("children", []):
        data = child.get("data", {})
        permalink = data.get("permalink", "")
        rows.append(
            {
                "platform": "reddit",
                "post_id": data.get("id", ""),
                "post_url": f"https://www.reddit.com{permalink}",
                "author": data.get("author", ""),
                "published_at": data.get("created_utc", ""),
                "like_count": data.get("ups") or data.get("score") or 0,
                "share_count": 0,
                "view_count": 0,
                "captions_text": data.get("title", ""),
                "comment_count": data.get("num_comments") or 0,
                "subreddit": data.get("subreddit", ""),
                "permalink": permalink,
            }
        )
    return rows


def fetch_reddit_posts(
    query: str = "AI",
    limit: int = 50,
    json_path: str | Path | None = None,
    output_path: str | Path = "data/raw/content-agent/reddit-posts.json",
    sample: bool = False,
) -> list[dict[str, Any]]:
    """Fetch Reddit search rows for the content-agent weekly engagement scan."""

    if sample:
        rows = SAMPLE_ROWS
    elif json_path:
        payload = json.loads(Path(json_path).read_text(encoding="utf-8"))
        rows = payload if isinstance(payload, list) else _normalize_reddit_listing(payload)
    else:
        url = f"https://www.reddit.com/search.json?q={quote(query)}&limit={limit}&sort=new"
        request = Request(url, headers={"User-Agent": "madison-content-agent/1.0"})
        with urlopen(request, timeout=30) as response:
            rows = _normalize_reddit_listing(json.loads(response.read().decode("utf-8")))

    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch content-agent Reddit post rows.")
    parser.add_argument("--query", default="AI")
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--json", default=None)
    parser.add_argument("--output", default="data/raw/content-agent/reddit-posts.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = fetch_reddit_posts(args.query, args.limit, args.json, args.output, sample=args.sample or not args.json)
    print(json.dumps(result, indent=2, sort_keys=True))
