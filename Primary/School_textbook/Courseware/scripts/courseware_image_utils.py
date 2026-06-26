# -*- coding: utf-8 -*-
"""Courseware 内图片路径与复制工具"""
from __future__ import annotations

import os
import re
import shutil


def slug(word: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", word.lower()).strip("_")


def _copy_if_exists(src: str, dest: str) -> bool:
    if not os.path.isfile(src):
        return False
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if not os.path.isfile(dest):
        shutil.copy2(src, dest)
    return True


def sentence_image_path(
    cw: str,
    project: str,
    grade: str,
    unit_key: str,
    word: str,
    source: str,
) -> str:
    u = unit_key.replace(" ", "")
    fn = slug(word)
    src_name = source if source in ("textbook", "context") else "context"
    rel = f"assets/images/sentences/{u}/{fn}/{src_name}.png"
    src_abs = os.path.join(project, "单词例句图片", grade, u, fn, f"{src_name}.png")
    dest = os.path.join(cw, rel.replace("/", os.sep))
    if _copy_if_exists(src_abs, dest):
        return rel
    return f"https://picsum.photos/seed/{slug(word)}-{source}/500/300"


def word_image_path(cw: str, project: str, grade: str, word: str, progress: dict) -> str:
    for key, paths in progress.get("completed", {}).items():
        if not key.startswith(f"{grade}|"):
            continue
        parts = key.split("|", 2)
        if len(parts) != 3 or parts[2] != word or not paths:
            continue
        src_abs = paths[0]
        if not os.path.isfile(src_abs):
            continue
        # 单词释义图片/4下/Unit1/doctor/doctor_风格A.png -> assets/images/words/Unit1/doctor/...
        rel_from_project = os.path.relpath(src_abs, project).replace("\\", "/")
        marker = "单词释义图片/"
        if marker not in rel_from_project:
            return os.path.relpath(src_abs, cw).replace("\\", "/")
        tail = rel_from_project.split(marker, 1)[1]
        if tail.startswith(grade + "/"):
            tail = tail[len(grade) + 1 :]
        rel = "assets/images/words/" + tail
        dest = os.path.join(cw, rel.replace("/", os.sep))
        _copy_if_exists(src_abs, dest)
        return rel
    return f"https://picsum.photos/seed/{slug(word)}/400/300"
