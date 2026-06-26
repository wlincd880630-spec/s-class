# -*- coding: utf-8 -*-
"""将课程图片复制到各分册 Courseware 目录，并更新 data.js 路径"""
from __future__ import annotations

import json
import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CW_ROOT = ROOT / "Courseware"

GRADE_MAP = {
    "3GA": "3上",
    "3GB": "3下",
    "4GA": "4上",
    "4GB": "4下",
    "5GA": "5上",
    "5GB": "5下",
    "6GA": "6上",
    "6GB": "6下",
}

IMAGE_RE = re.compile(r'"image"\s*:\s*"([^"]+)"')


def slug(word: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", word.lower()).strip("_")


def resolve_source(cw: Path, grade_label: str, raw: str) -> Path | None:
    if not raw or raw.startswith("http://") or raw.startswith("https://"):
        return None
    p = Path(raw.replace("/", os.sep))
    if p.is_absolute():
        return p if p.is_file() else None

    # ../../单词释义图片/4下/...
    candidates = [
        (cw / raw).resolve(),
        (ROOT / raw.lstrip("./")).resolve(),
    ]
    if raw.startswith("../"):
        rel = raw
        while rel.startswith("../"):
            rel = rel[3:]
        candidates.append((ROOT / rel).resolve())
        candidates.append((cw.parent / rel).resolve())

    for c in candidates:
        if c.is_file():
            return c
    return None


def map_dest_and_new_path(cw: Path, grade_label: str, src: Path, raw: str) -> tuple[Path, str] | None:
    parts = src.parts
    try:
        if "单词释义图片" in parts:
            idx = parts.index("单词释义图片")
            sub = parts[idx + 1 :]  # 4下/Unit1/word/file.png
            if sub and sub[0] == grade_label:
                sub = sub[1:]
            rel = Path(*sub)
            dest = cw / "assets" / "images" / "words" / rel
            return dest, ("assets/images/words/" + rel.as_posix())
        if "单词例句图片" in parts:
            idx = parts.index("单词例句图片")
            sub = parts[idx + 1 :]
            if sub and sub[0] == grade_label:
                sub = sub[1:]
            rel = Path(*sub)
            dest = cw / "assets" / "images" / "sentences" / rel
            return dest, ("assets/images/sentences/" + rel.as_posix())
    except ValueError:
        pass
    return None


def patch_data_js(cw: Path, replacements: dict[str, str]) -> int:
    data_js = cw / "assets" / "data" / "data.js"
    text = data_js.read_text(encoding="utf-8")
    n = 0
    for old, new in replacements.items():
        needle = f'"{old}"'
        count = text.count(needle)
        if count:
            text = text.replace(needle, f'"{new}"')
            n += count
    data_js.write_text(text, encoding="utf-8")
    return n


def process_grade(folder: str) -> dict:
    grade_label = GRADE_MAP[folder]
    cw = CW_ROOT / folder
    data_js = cw / "assets" / "data" / "data.js"
    if not data_js.is_file():
        return {"folder": folder, "error": "no data.js"}

    raw_paths = IMAGE_RE.findall(data_js.read_text(encoding="utf-8"))
    copied = skipped = missing = 0
    replacements: dict[str, str] = {}

    for raw in raw_paths:
        if raw.startswith("http"):
            skipped += 1
            continue
        src = resolve_source(cw, grade_label, raw)
        if not src:
            missing += 1
            continue
        mapped = map_dest_and_new_path(cw, grade_label, src, raw)
        if not mapped:
            missing += 1
            continue
        dest, new_path = mapped
        if raw not in replacements:
            replacements[raw] = new_path
        if dest.is_file():
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        copied += 1

    updated = patch_data_js(cw, replacements)

    return {
        "folder": folder,
        "grade": grade_label,
        "copied": copied,
        "skipped_url": skipped,
        "missing": missing,
        "paths_updated": updated,
        "unique_images": len(replacements),
    }


def main():
    results = [process_grade(g) for g in GRADE_MAP]
    print(json.dumps(results, ensure_ascii=False, indent=2))
    total_copied = sum(r.get("copied", 0) for r in results)
    total_missing = sum(r.get("missing", 0) for r in results)
    print(f"\n合计复制: {total_copied} 张, 源文件缺失: {total_missing}")


if __name__ == "__main__":
    main()
