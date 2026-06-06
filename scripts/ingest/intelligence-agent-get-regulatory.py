"""Fetch or sample intelligence-agent regulatory rows.

Purpose: Fetch regulatory and compliance news for Apple monitoring.
Input: Local JSON export, live Google News query, or sample rows.
Output: JSON array written to data/raw/intelligence-agent/regulatory.json.
Side effects: Optional network calls; file write to data/raw/.
Idempotent: yes, because the same source snapshot overwrites the same JSON output path.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Any
from urllib.parse import quote
from urllib.request import Request, urlopen


SAMPLE_ROWS = [
    {"id": "reg-001", "title": "Apple faces App Store antitrust investigation", "description": "Regulators opened an investigation into App Store rules.", "link": "https://example.com/apple-antitrust", "pubDate": "2026-06-05T10:00:00+00:00", "source": "Google News - Apple_Antitrust", "category": "compliance", "region": "US", "brand": "Apple", "fullText": "Apple faces App Store antitrust investigation. Regulators opened an investigation into App Store rules."},
]


def _strip_html(text: str) -> str:
    return re.sub(r"<[^>]*>", "", text or "").strip()


def _parse_rss(text: str) -> list[dict[str, Any]]:
    root = ET.fromstring(text)
    rows: list[dict[str, Any]] = []
    for item in root.findall(".//item"):
        title = (item.findtext("title") or "").strip()
        description = _strip_html(item.findtext("description") or "")
        link = (item.findtext("link") or "").strip()
        pub_date = (item.findtext("pubDate") or "").strip()
        if title and link:
            rows.append({"title": title, "description": description, "pubDate": pub_date, "link": link, "source": "Google News - Regulatory", "brand": "Apple", "fullText": f"{title}. {description}"})
    return rows


def _with_ids(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    output = []
    for row in rows:
        next_row = dict(row)
        key = f"{next_row.get('link', '')}{next_row.get('title', '')}"
        next_row.setdefault("id", hashlib.sha1(key.encode("utf-8")).hexdigest()[:12])
        next_row.setdefault("category", "compliance")
        next_row.setdefault("region", "Global")
        next_row.setdefault("brand", "Apple")
        next_row.setdefault("fullText", f"{next_row.get('title', '')}. {next_row.get('description', '')}")
        output.append(next_row)
    return output


def fetch_regulatory(query: str = "\"Apple\" antitrust regulatory compliance", json_path: str | Path | None = None, output_path: str | Path = "data/raw/intelligence-agent/regulatory.json", sample: bool = False) -> list[dict[str, Any]]:
    if sample:
        rows = SAMPLE_ROWS
    elif json_path:
        rows = json.loads(Path(json_path).read_text(encoding="utf-8"))
    else:
        url = f"https://news.google.com/rss/search?q={quote(query)}&hl=en-US&gl=US&ceid=US:en"
        with urlopen(Request(url, headers={"User-Agent": "madison-intelligence-agent/1.0"}), timeout=30) as response:
            rows = _parse_rss(response.read().decode("utf-8"))
    rows = _with_ids(rows)
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch intelligence-agent regulatory rows.")
    parser.add_argument("--query", default="\"Apple\" antitrust regulatory compliance")
    parser.add_argument("--json", default=None)
    parser.add_argument("--output", default="data/raw/intelligence-agent/regulatory.json")
    parser.add_argument("--sample", action="store_true")
    args = parser.parse_args()
    result = fetch_regulatory(args.query, args.json, args.output, sample=args.sample or not args.json)
    print(json.dumps(result, indent=2, sort_keys=True))
