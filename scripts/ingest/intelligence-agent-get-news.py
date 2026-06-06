"""Fetch or sample intelligence-agent brand news rows.

Purpose: Fetch Apple press and Google News rows for brand intelligence.
Input: Local JSON export, RSS/Google News live fetch, or sample rows.
Output: JSON array written to data/raw/intelligence-agent/news.json.
Side effects: Optional network calls; file write to data/raw/.
Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Any
from urllib.parse import quote
from urllib.request import Request, urlopen


SAMPLE_ROWS = [
    {"title": "Apple unveils new privacy features for iPhone", "description": "Apple announced privacy controls for customers.", "pubDate": "2026-06-05T12:00:00+00:00", "link": "https://example.com/apple-privacy", "source": "Apple Newsroom", "brand": "Apple", "fullText": "Apple unveils new privacy features for iPhone. Apple announced privacy controls for customers."},
    {"title": "Samsung Galaxy update challenges iPhone camera lead", "description": "Reviewers compare Galaxy and iPhone camera features.", "pubDate": "2026-06-05T13:00:00+00:00", "link": "https://example.com/samsung-camera", "source": "Google News", "brand": "Samsung", "fullText": "Samsung Galaxy update challenges iPhone camera lead. Reviewers compare Galaxy and iPhone camera features."},
]


def _strip_html(text: str) -> str:
    return re.sub(r"<[^>]*>", "", text or "").strip()


def _parse_rss(text: str, source: str, brand: str) -> list[dict[str, Any]]:
    root = ET.fromstring(text)
    rows: list[dict[str, Any]] = []
    for item in root.findall(".//item"):
        title = (item.findtext("title") or "").strip()
        description = _strip_html(item.findtext("description") or "")
        link = (item.findtext("link") or "").strip()
        pub_date = (item.findtext("pubDate") or "").strip()
        if title and link:
            rows.append({"title": title, "description": description, "pubDate": pub_date, "link": link, "source": source, "brand": brand, "fullText": f"{title}. {description}"})
    return rows


def fetch_news(query: str = "Apple", brand: str = "Apple", json_path: str | Path | None = None, output_path: str | Path = "data/raw/intelligence-agent/news.json", sample: bool = False) -> list[dict[str, Any]]:
    if sample:
        rows = SAMPLE_ROWS
    elif json_path:
        rows = json.loads(Path(json_path).read_text(encoding="utf-8"))
    else:
        url = f"https://news.google.com/rss/search?q={quote(query)}&hl=en-US&gl=US&ceid=US:en"
        with urlopen(Request(url, headers={"User-Agent": "madison-intelligence-agent/1.0"}), timeout=30) as response:
            rows = _parse_rss(response.read().decode("utf-8"), "Google News", brand)
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch intelligence-agent brand news rows.")
    parser.add_argument("--query", default="Apple")
    parser.add_argument("--brand", default="Apple")
    parser.add_argument("--json", default=None)
    parser.add_argument("--output", default="data/raw/intelligence-agent/news.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = fetch_news(args.query, args.brand, args.json, args.output, sample=args.sample or not args.json)
    print(json.dumps(result, indent=2, sort_keys=True))
