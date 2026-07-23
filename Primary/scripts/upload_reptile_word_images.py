#!/usr/bin/env python3
"""上传爬行动物课程 46 词 × 2 配图到腾讯 COS。"""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "Primary" / "What are reptiles" / "what-are-reptiles-courseware" / "images"


def main() -> int:
    cfg_path = ROOT / ".cos-config.json"
    if not cfg_path.exists():
        print("缺少 .cos-config.json")
        return 1
    cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
    from qcloud_cos import CosConfig, CosS3Client

    prefix = cfg.get("CosPrefix", "s-class/").rstrip("/") + "/"
    client = CosS3Client(
        CosConfig(Region=cfg["Region"], SecretId=cfg["SecretId"], SecretKey=cfg["SecretKey"], Timeout=300)
    )
    ok = 0
    total = sum(len(list((BASE / d).glob("*.png"))) for d in ("words", "words-meaning"))
    for d in ("words", "words-meaning"):
        for local in sorted((BASE / d).glob("*.png")):
            key = prefix + f"Primary/What are reptiles/what-are-reptiles-courseware/images/{d}/{local.name}"
            for attempt in range(1, 4):
                try:
                    client.upload_file(
                        Bucket=cfg["Bucket"],
                        LocalFilePath=str(local),
                        Key=key,
                        PartSize=4,
                        MAXThread=2,
                        ContentType="image/png",
                    )
                    ok += 1
                    print(f"OK {ok}/{total} {d}/{local.name} ({local.stat().st_size // 1024} KB)")
                    break
                except Exception as e:
                    print(f"ERR {local.name} try {attempt}: {e}")
                    time.sleep(3 * attempt)
    print(f"完成 {ok}/{total}")
    return 0 if ok == total else 2


if __name__ == "__main__":
    raise SystemExit(main())
