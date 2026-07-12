#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fill exam-blank placeholders in Chengdu ZK relative-clause corpus."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
TAXONOMY = ROOT / "Grammar" / "L15" / "data" / "word-form-taxonomy-2018-2026.json"
ENRICHED = ROOT / "Grammar" / "L13-定语从句" / "data" / "l13rc-chengdu-zk-enriched.json"
OUT_JS = ROOT / "Grammar" / "L13-定语从句" / "l13rc-chengdu-zk-corpus.js"

BLANK_RE = re.compile(r"(?<![A-Za-z0-9])(\d{1,2})(?!\d)")

# 完形填空 / 图表阅读等：按 (年份, 题号) 手工校对的标准答案
MANUAL_ANSWERS: dict[tuple[str, int], str] = {
    ("2022", 7): "completed",
    ("2022", 8): "tenth",
    ("2022", 49): "truth",
    ("2025", 57): "question",
    ("2025", 58): "different",
    ("2025", 59): "ordinary",
    ("2025", 60): "why",
}

EXAM_FILES: dict[str, Path] = {
    "2018": ROOT / "HET" / "2018成都中考.html",
    "2019": ROOT / "HET" / "2019成都中考.html",
    "2020": ROOT / "HET" / "2020成都中考.html",
    "2021": ROOT / "HET" / "2021成都中考.html",
    "2022": ROOT / "HET" / "2022成都中考.html",
    "2023": ROOT / "HET" / "2023成都中考.html",
    "2024": ROOT / "HET" / "2024成都中考.html",
    "2025": ROOT / "HET" / "2025成都中考.html",
}


def extract_fill10_blank_order(path: Path) -> list[int]:
    if not path.exists():
        return []
    soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="ignore"), "lxml")
    h3 = soup.find("h3", string=lambda s: s and "短文填空" in s)
    if not h3:
        return []
    seen: set[int] = set()
    order: list[int] = []
    node = h3
    for _ in range(120):
        node = node.find_next()
        if not node:
            break
        if node.name == "h3" and node is not h3:
            break
        if node.name != "p":
            continue
        for span in node.find_all("span", class_="blank-line"):
            num = int(span.get_text(strip=True))
            if num in seen:
                continue
            seen.add(num)
            order.append(num)
    return order


def build_exam_blank_answer_map(taxonomy: dict[str, dict[int, str]]) -> dict[tuple[str, int], str]:
    mapping: dict[tuple[str, int], str] = {}
    tax_data = json.loads(TAXONOMY.read_text(encoding="utf-8")).get("byYear", {})

    for year, path in EXAM_FILES.items():
        year_tax = tax_data.get(year, {})
        forms = [b["form"] for b in sorted(year_tax.get("blanks", []), key=lambda x: x["n"])]
        order = extract_fill10_blank_order(path)
        if forms and order and len(forms) == len(order):
            for exam_num, answer in zip(order, forms):
                mapping[(year, exam_num)] = answer
            continue
        for slot, answer in taxonomy.get(year, {}).items():
            y = int(re.sub(r"\D", "", year) or "0")
            exam_num = slot + 60 if y >= 2021 else slot
            mapping[(year, exam_num)] = answer
    return mapping


def load_taxonomy() -> dict[str, dict[int, str]]:
    data = json.loads(TAXONOMY.read_text(encoding="utf-8"))
    out: dict[str, dict[int, str]] = {}
    for year, info in data.get("byYear", {}).items():
        out[year] = {int(b["n"]): b["form"] for b in info.get("blanks", [])}
    return out


def blank_slot(num: int, year: str) -> int | None:
    y = int(re.sub(r"\D", "", year) or "0")
    if y >= 2021 and 61 <= num <= 70:
        return num - 60
    if 1 <= num <= 10:
        return num
    return None


def resolve_answer(
    num: int,
    year: str,
    section: str,
    taxonomy: dict[str, dict[int, str]],
    exam_map: dict[tuple[str, int], str],
) -> str | None:
    key = (year, num)
    if key in MANUAL_ANSWERS:
        return MANUAL_ANSWERS[key]
    if section == "12选10" and key in exam_map:
        return exam_map[key]
    if section == "12选10":
        slot = blank_slot(num, year)
        if slot is not None:
            return taxonomy.get(year, {}).get(slot)
    if section == "完形填空" and 40 <= num <= 70:
        return MANUAL_ANSWERS.get((year, num))
    if section == "图表阅读" and 50 <= num <= 70:
        return MANUAL_ANSWERS.get((year, num))
    return None


def fill_text(
    text: str,
    year: str,
    section: str,
    taxonomy: dict[str, dict[int, str]],
    exam_map: dict[tuple[str, int], str],
) -> tuple[str, list[dict]]:
    fills: list[dict] = []

    def replacer(match: re.Match[str]) -> str:
        num = int(match.group(1))
        answer = resolve_answer(num, year, section, taxonomy, exam_map)
        if not answer:
            return match.group(0)
        fills.append({"blank": num, "answer": answer})
        return answer

    filled = BLANK_RE.sub(replacer, text)
    return filled, fills


def refresh_highlights(sentence: str, highlights: list[dict], fills: list[dict]) -> list[dict]:
    if not fills or not highlights:
        return highlights

    updated: list[dict] = []
    for part in highlights:
        text = part.get("text", "")
        new_text = text
        for fill in fills:
            token = str(fill["blank"])
            if re.search(rf"(?<![A-Za-z0-9]){re.escape(token)}(?!\d)", new_text):
                new_text = re.sub(
                    rf"(?<![A-Za-z0-9]){re.escape(token)}(?!\d)",
                    fill["answer"],
                    new_text,
                    count=1,
                )
        item = dict(part)
        item["text"] = new_text
        updated.append(item)
    return updated


def refresh_structure(structure: str, fills: list[dict]) -> str:
    out = structure or ""
    for fill in fills:
        token = str(fill["blank"])
        out = re.sub(
            rf"(?<![A-Za-z0-9]){re.escape(token)}(?!\d)",
            fill["answer"],
            out,
        )
    return out


def js_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def write_js(items: list[dict]) -> None:
    years: dict[str, list] = {}
    for item in items:
        years.setdefault(item["year"], []).append(item)

    lines = [
        "/**",
        " * 成都中考真题 · 定语从句语料库",
        " * 来源：2018-2026 成都中考英语真题及模拟卷（阅读/12选10/6选5/图表阅读/完形）",
        " * 自动生成，请勿手改；重新生成请运行 Grammar/scripts/fill-l13-chengdu-zk-blanks.py",
        " */",
        "(function (global) {",
        '  "use strict";',
        "",
        "  var P13RC_ZK = {",
        f"    version: {js_string('1.1')},",
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
                "sentenceComplete",
                "context",
                "zh",
                "antecedent",
                "relation",
                "role",
                "highlights",
                "socratic",
                "structure",
                "fills",
            ):
                if key in it and it[key] not in (None, [], ""):
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


def main() -> None:
    if not ENRICHED.exists():
        print(f"Missing {ENRICHED}", file=sys.stderr)
        sys.exit(1)

    taxonomy = load_taxonomy()
    exam_map = build_exam_blank_answer_map(taxonomy)
    items = json.loads(ENRICHED.read_text(encoding="utf-8"))
    changed = 0

    for item in items:
        year = item.get("year", "")
        section = item.get("section", "")
        raw_sentence = item.get("sentence", "")
        raw_context = item.get("context", "")

        sentence, fills = fill_text(raw_sentence, year, section, taxonomy, exam_map)
        context, _ = fill_text(raw_context, year, section, taxonomy, exam_map)

        if not fills:
            item["sentenceComplete"] = raw_sentence
            continue

        changed += 1
        item["fills"] = fills
        item["sentenceComplete"] = sentence
        item["sentence"] = sentence
        item["context"] = context
        item["highlights"] = refresh_highlights(sentence, item.get("highlights", []), fills)
        item["structure"] = refresh_structure(item.get("structure", ""), fills)
        if item.get("antecedent"):
            item["antecedent"] = refresh_structure(item["antecedent"], fills)

    ENRICHED.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    write_js(items)
    print(f"Filled blanks in {changed} items -> {OUT_JS}", file=sys.stderr)


if __name__ == "__main__":
    main()
