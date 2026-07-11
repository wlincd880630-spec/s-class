#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Enrich Chengdu ZK relative-clause items via DeepSeek API."""
from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "Grammar" / "L13-定语从句" / "data" / "l13rc-chengdu-zk-raw.json"
ENRICHED = ROOT / "Grammar" / "L13-定语从句" / "data" / "l13rc-chengdu-zk-enriched.json"
OUT_JS = ROOT / "Grammar" / "L13-定语从句" / "l13rc-chengdu-zk-corpus.js"

API_URL = "https://api.deepseek.com/chat/completions"
MODEL = "deepseek-chat"
BATCH = 6


def call_deepseek(api_key: str, prompt: str) -> str:
    body = json.dumps(
        {
            "model": MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": "You are an expert English grammar teacher for Chinese junior-high students preparing for Chengdu Zhongkao. Output valid JSON only.",
                },
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.2,
            "response_format": {"type": "json_object"},
        },
        ensure_ascii=False,
    ).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data["choices"][0]["message"]["content"]


def build_prompt(batch: list[dict]) -> str:
    payload = []
    for i, item in enumerate(batch):
        payload.append(
            {
                "id": i,
                "year": item["year"],
                "paper": item["paper"],
                "section": item["section"],
                "sectionTitle": item.get("sectionTitle", ""),
                "sentence": item["sentence"],
                "context": item.get("context", ""),
            }
        )
    return (
        "Analyze each item. Keep ONLY true attributive relative clauses (定语从句) that modify a noun antecedent.\n"
        "Reject: indirect questions (asked who/where/when), noun clauses after that, time clauses when I..., purpose, options fragments, translation mistakes.\n"
        "Return JSON: {\"items\": [{\"id\":0,\"valid\":true|false,\"sentence\":\"...\",\"zh\":\"整句中文\",\"antecedent\":\"先行词\",\"relation\":\"who|whom|which|that|when|where|why|whose|prep+which\",\"role\":\"subject|object|adverbial|possessive\",\"highlights\":[{\"text\":\"...\",\"type\":\"antecedent|relation|clause|prep\"}],\"socratic\":[\"引导问题1\",\"引导问题2\",\"引导问题3\"],\"structure\":\"<p>主句：...</p><p>定语从句：...</p><p>关系词在从句中作...</p>\"}]}\n"
        "highlights must cover the relative clause portion in the original sentence text exactly.\n"
        "socratic: 3 Chinese questions guiding discovery, no direct answers.\n"
        f"INPUT:\n{json.dumps(payload, ensure_ascii=False, indent=2)}"
    )


def js_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def write_js(items: list[dict]):
    years: dict[str, list] = {}
    for item in items:
        year = item["year"]
        years.setdefault(year, []).append(item)

    lines = [
        "/**",
        " * 成都中考真题 · 定语从句语料库",
        " * 来源：2018-2026 成都中考英语真题及模拟卷（阅读/12选10/6选5/图表阅读/完形）",
        " * 自动生成，请勿手改；重新生成请运行 Grammar/scripts/build-l13-chengdu-rc-corpus.py",
        " */",
        '(function (global) {',
        '  "use strict";',
        "",
        "  var P13RC_ZK = {",
        f"    version: {js_string('1.0')},",
        f"    title: {js_string('成都中考真题 2018-2026')},",
        f"    subtitle: {js_string('阅读 · 12选10 · 6选5 · 图表阅读 · 完形填空')},",
        "    years: [",
    ]

    for year in sorted(years.keys(), key=lambda y: int(re.sub(r"\D", "", y) or "0")):
        group = years[year]
        lines.append("      {")
        lines.append(f"        year: {js_string(year)},")
        lines.append(f"        label: {js_string(year + '年')},")
        lines.append("        items: [")
        for it in group:
            lines.append("          {")
            for key in (
                "id",
                "paper",
                "section",
                "sectionTitle",
                "sentence",
                "context",
                "zh",
                "antecedent",
                "relation",
                "role",
                "highlights",
                "socratic",
                "structure",
            ):
                if key in it:
                    lines.append(f"            {key}: {json.dumps(it[key], ensure_ascii=False)},")
            lines.append("          },")
        lines.append("        ]")
        lines.append("      },")

    lines.extend(
        [
            "    ],",
            "  };",
            "",
            "  global.P13RC_ZK = P13RC_ZK;",
            "})(window);",
            "",
        ]
    )
    OUT_JS.write_text("\n".join(lines), encoding="utf-8")


def main():
    api_key = os.environ.get("DEEPSEEK_API_KEY")
    if not api_key:
        print("DEEPSEEK_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    raw = json.loads(RAW.read_text(encoding="utf-8"))
    enriched_all: list[dict] = []
    seq = 0

    for start in range(0, len(raw), BATCH):
        batch = raw[start : start + BATCH]
        prompt = build_prompt(batch)
        print(f"Enriching {start}-{start+len(batch)-1}...", file=sys.stderr)
        for attempt in range(4):
            try:
                content = call_deepseek(api_key, prompt)
                parsed = json.loads(content)
                break
            except Exception as exc:
                print(f"  retry {attempt+1}: {exc}", file=sys.stderr)
                time.sleep(2 ** attempt)
        else:
            raise RuntimeError("DeepSeek failed")

        for row in parsed.get("items", []):
            if not row.get("valid"):
                continue
            src = batch[int(row["id"])]
            seq += 1
            enriched_all.append(
                {
                    "id": f"zk-{seq:03d}",
                    "year": src["year"],
                    "paper": src["paper"],
                    "section": src["section"],
                    "sectionTitle": src.get("sectionTitle", ""),
                    "context": src.get("context", ""),
                    "sentence": row.get("sentence") or src["sentence"],
                    "zh": row.get("zh", ""),
                    "antecedent": row.get("antecedent", ""),
                    "relation": row.get("relation", ""),
                    "role": row.get("role", ""),
                    "highlights": row.get("highlights", []),
                    "socratic": row.get("socratic", []),
                    "structure": row.get("structure", ""),
                }
            )
        time.sleep(0.5)

    ENRICHED.write_text(json.dumps(enriched_all, ensure_ascii=False, indent=2), encoding="utf-8")
    write_js(enriched_all)
    print(f"Valid items: {len(enriched_all)} -> {OUT_JS}", file=sys.stderr)


if __name__ == "__main__":
    main()
