"""Write intelligence-agent monitoring configuration.

Purpose: Produce brand and regulatory source configuration for the intelligence-agent.
Input: Optional JSON overrides.
Output: JSON object written to data/verified/intelligence-agent/config.json.
Side effects: File write to data/verified/; no network calls.
Idempotent: yes, because identical overrides produce identical config.
Recipe: recipes/intelligence-agent.md
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


CONFIG: dict[str, Any] = {
    "primary_brand": "Apple",
    "brands": [
        {"name": "Apple", "isPrimary": True, "googleNewsQuery": "Apple Inc OR AAPL OR iPhone OR iPad", "subreddits": ["apple", "iphone", "mac"], "competitors": ["Samsung", "Google", "Microsoft"], "keywords": ["iPhone", "iPad", "Mac", "iOS", "Tim Cook", "Apple Watch", "AirPods", "Vision Pro"]},
        {"name": "Samsung", "isPrimary": False, "googleNewsQuery": "Samsung Electronics OR Galaxy OR Samsung Mobile", "subreddits": ["samsung", "samsunggalaxy"], "competitors": ["Apple", "Google", "OnePlus"], "keywords": ["Galaxy", "Samsung Phone", "One UI"]},
        {"name": "Google", "isPrimary": False, "googleNewsQuery": "Google OR GOOGL OR Pixel OR Android", "subreddits": ["google", "googlepixel", "Android"], "competitors": ["Apple", "Microsoft", "Amazon"], "keywords": ["Pixel", "Android", "Chrome", "Gemini", "YouTube"]},
        {"name": "Microsoft", "isPrimary": False, "googleNewsQuery": "Microsoft OR MSFT OR Windows OR Surface", "subreddits": ["microsoft", "Surface", "windows"], "competitors": ["Apple", "Google", "Amazon"], "keywords": ["Windows", "Surface", "Office", "Azure", "Xbox", "Copilot"]},
    ],
    "regulatory_sources": [
        {"name": "Apple_Inc_Regulatory", "searchQuery": "\"Apple Inc\" regulatory compliance SEC FTC investigation fine penalty", "category": "regulatory", "region": "US"},
        {"name": "Apple_EU_DMA", "searchQuery": "\"Apple\" \"Digital Markets Act\" \"European Commission\" fine penalty compliance", "category": "antitrust", "region": "EU"},
        {"name": "Apple_Privacy_GDPR", "searchQuery": "\"Apple\" GDPR privacy fine data protection violation penalty", "category": "privacy", "region": "Global"},
        {"name": "Apple_Antitrust", "searchQuery": "\"Apple\" antitrust Department of Justice DOJ App Store monopoly lawsuit", "category": "antitrust", "region": "US"},
    ],
}


def write_config(overrides: dict[str, Any] | None = None, output_path: str | Path = "data/verified/intelligence-agent/config.json") -> dict[str, Any]:
    config = {**CONFIG, **(overrides or {})}
    destination = Path(output_path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(config, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return config


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Write intelligence-agent config.")
    parser.add_argument("--overrides-json", default=None)
    parser.add_argument("--output", default="data/verified/intelligence-agent/config.json")
    args = parser.parse_args()
    result = write_config(json.loads(args.overrides_json) if args.overrides_json else None, args.output)
    print(json.dumps(result, indent=2, sort_keys=True))
