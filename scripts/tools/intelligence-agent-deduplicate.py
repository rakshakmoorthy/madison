"""Deduplicate intelligence-agent source rows.

Purpose: Remove items already present in prior processed links/articles or current batch.
Input: Source JSON arrays and prior-state JSON.
Output: New item rows written to data/verified/intelligence-agent/new-items.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical inputs produce identical new item rows.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


def _load_rows(path: str | Path) -> list[dict[str, Any]]:
    target = Path(path)
    return json.loads(target.read_text(encoding="utf-8")) if target.exists() else []


def _norm_title(title: str) -> str:
    return re.sub(r"[^a-z0-9]", "", title.lower())[:60]


def deduplicate(news_path: str | Path = "data/raw/intelligence-agent/news.json", reddit_path: str | Path = "data/raw/intelligence-agent/reddit.json", regulatory_path: str | Path = "data/raw/intelligence-agent/regulatory.json", prior_path: str | Path = "data/raw/intelligence-agent/prior-state.json", output_path: str | Path = "data/verified/intelligence-agent/new-items.json") -> list[dict[str, Any]]:
    rows = _load_rows(news_path) + _load_rows(reddit_path) + _load_rows(regulatory_path)
    prior = json.loads(Path(prior_path).read_text(encoding="utf-8")) if Path(prior_path).exists() else {}
    prior_rows = prior.get("processed_links", []) + prior.get("processed_articles", [])
    seen_titles = {_norm_title(str(row.get("title", ""))) for row in prior_rows if row.get("title")}
    seen_links = {str(row.get("link", "")).strip() for row in prior_rows if row.get("link")}
    current = set()
    new_rows = []
    for row in rows:
        title_key = _norm_title(str(row.get("title", "")))
        link = str(row.get("link", "")).strip()
        if not title_key and not link:
            continue
        if title_key in seen_titles or link in seen_links or title_key in current:
            continue
        next_row = dict(row)
        next_row.setdefault("fullText", f"{next_row.get('title', '')}. {next_row.get('description', '')}")
        new_rows.append(next_row)
        current.add(title_key)
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(new_rows, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return new_rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deduplicate intelligence-agent source rows.")
    parser.add_argument("--news", default="data/raw/intelligence-agent/news.json")
    parser.add_argument("--reddit", default="data/raw/intelligence-agent/reddit.json")
    parser.add_argument("--regulatory", default="data/raw/intelligence-agent/regulatory.json")
    parser.add_argument("--prior", default="data/raw/intelligence-agent/prior-state.json")
    parser.add_argument("--output", default="data/verified/intelligence-agent/new-items.json")
    args = parser.parse_args()
    result = deduplicate(args.news, args.reddit, args.regulatory, args.prior, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
