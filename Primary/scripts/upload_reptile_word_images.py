#!/usr/bin/env python3
"""上传爬行动物课程全彩单词图、词义图与课文图到腾讯 COS。"""
from __future__ import annotations

import json
import multiprocessing
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "Primary" / "What are reptiles" / "what-are-reptiles-courseware" / "images"


def upload_worker(cfg: dict, local_path: str, key: str, result: multiprocessing.Queue) -> None:
    try:
        from qcloud_cos import CosConfig, CosS3Client

        client = CosS3Client(
            CosConfig(
                Region=cfg["Region"],
                SecretId=cfg["SecretId"],
                SecretKey=cfg["SecretKey"],
                Timeout=60,
            )
        )
        client.upload_file(
            Bucket=cfg["Bucket"],
            LocalFilePath=local_path,
            Key=key,
            PartSize=4,
            MAXThread=2,
            EnableMD5=False,
            ContentType="image/png",
        )
        result.put("")
    except Exception as exc:
        result.put(str(exc))


def main() -> int:
    cfg_path = ROOT / ".cos-config.json"
    if not cfg_path.exists():
        print("缺少 .cos-config.json")
        return 1
    cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
    from qcloud_cos import CosConfig, CosS3Client

    prefix = cfg.get("CosPrefix", "s-class/").rstrip("/") + "/"
    client = CosS3Client(
        CosConfig(Region=cfg["Region"], SecretId=cfg["SecretId"], SecretKey=cfg["SecretKey"], Timeout=60)
    )
    image_dirs = ("words", "words-meaning", "story")
    ok = 0
    total = sum(len(list((BASE / d).glob("*.png"))) for d in image_dirs)
    for d in image_dirs:
        for local in sorted((BASE / d).glob("*.png")):
            key = prefix + f"Primary/What are reptiles/what-are-reptiles-courseware/images/{d}/{local.name}"
            try:
                remote = client.head_object(Bucket=cfg["Bucket"], Key=key)
                if int(remote.get("Content-Length", -1)) == local.stat().st_size:
                    ok += 1
                    print(f"SKIP {ok}/{total} {d}/{local.name}", flush=True)
                    continue
            except Exception:
                pass
            for attempt in range(1, 4):
                result: multiprocessing.Queue = multiprocessing.Queue()
                worker = multiprocessing.Process(
                    target=upload_worker, args=(cfg, str(local), key, result)
                )
                worker.start()
                worker.join(100)
                if worker.is_alive():
                    worker.terminate()
                    worker.join()
                    error = "上传进程超过 100 秒"
                else:
                    error = result.get_nowait() if not result.empty() else "上传进程异常退出"
                if not error:
                    ok += 1
                    print(
                        f"OK {ok}/{total} {d}/{local.name} ({local.stat().st_size // 1024} KB)",
                        flush=True,
                    )
                    break
                print(f"ERR {local.name} try {attempt}: {error}", flush=True)
                time.sleep(3 * attempt)
    print(f"完成 {ok}/{total}")
    return 0 if ok == total else 2


if __name__ == "__main__":
    raise SystemExit(main())
