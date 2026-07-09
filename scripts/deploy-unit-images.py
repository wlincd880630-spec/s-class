# -*- coding: utf-8 -*-
"""部署单元单词配图：从 assets 复制到课件目录、上传 COS、更新 data.js
用法: python scripts/deploy-unit-images.py 5GB unit3
"""
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(r"D:\s-class")
SRC = Path(r"C:\Users\wl88i\.cursor\projects\d-s-class\assets")
STB = ROOT / "Primary" / "School_textbook"
PROGRESS = STB / "Courseware" / ".image_batch_progress.json"
COS_BASE = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/School_textbook/Courseware"

grade = sys.argv[1]
unit_id = sys.argv[2]  # unit3
unit_num = unit_id.replace("unit", "")
unit_folder = f"Unit{unit_num}"
unit_label = f"Unit {unit_num}"

DATA_JS = STB / "Courseware" / grade / "assets" / "data" / "data.js"
DST_ROOT = STB / "Courseware" / grade / "assets" / "images" / "words" / unit_folder

try:
    from qcloud_cos import CosConfig, CosS3Client
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "cos-python-sdk-v5", "-q"])
    from qcloud_cos import CosConfig, CosS3Client

config = json.loads((ROOT / ".cos-config.json").read_text(encoding="utf-8"))
client = CosS3Client(CosConfig(Region=config["Region"], SecretId=config["SecretId"], SecretKey=config["SecretKey"]))
bucket = config["Bucket"]
prefix = config.get("CosPrefix", "s-class/").rstrip("/") + "/"


def safe_filename(word: str) -> str:
    name = re.sub(r"\(.*?\)", "", word)
    name = re.sub(r'[<>:"/\\|?*.]', "", name)
    name = name.replace(" ", "_").replace("/", "-")
    name = re.sub(r"['\u2018\u2019`´]", "", name)
    name = re.sub(r"_+", "_", name).strip("_")
    return (name[:60] if name else "word")


def cos_url(word: str) -> str:
    from urllib.parse import quote
    slug = safe_filename(word)
    fname = f"{slug}_风格A.png"
    return f"{COS_BASE}/{grade}/assets/images/words/{unit_folder}/{slug}/{quote(fname, safe='')}"


content = DATA_JS.read_text(encoding="utf-8")
next_unit = f"unit{int(unit_num) + 1}"
block = re.search(
    rf'"id":\s*"{unit_id}"[\s\S]*?(?:"id":\s*"{next_unit}"|\]\s*,\s*"games"|\]\s*\n\s*\}}\s*\n\s*\])',
    content,
)
if not block:
    sys.exit(f"找不到 {unit_id}")
words = re.findall(r'"word":\s*"([^"]+)"', block.group(0))
print(f"{grade} {unit_label}: {len(words)} 词")

moved = 0
for word in words:
    slug = safe_filename(word)
    fname = f"{slug}_风格A.png"
    src = SRC / fname
    if not src.exists():
        print(f"缺少: {fname}")
        continue
    dest_dir = DST_ROOT / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest_dir / fname)
    moved += 1
print(f"复制 {moved}/{len(words)}")

ok = fail = patched = 0
for word in words:
    slug = safe_filename(word)
    local = DST_ROOT / slug / f"{slug}_风格A.png"
    if not local.exists():
        fail += 1
        continue
    rel = f"Primary/School_textbook/Courseware/{grade}/assets/images/words/{unit_folder}/{slug}/{slug}_风格A.png"
    key = prefix + rel.replace("\\", "/")
    try:
        with open(local, "rb") as f:
            client.put_object(Bucket=bucket, Key=key, Body=f)
        ok += 1
        print(f"上传 OK: {slug}")
    except Exception as e:
        print(f"上传失败 {word}: {e}")
        fail += 1
        continue
    url = cos_url(word)
    escaped = re.escape(word)
    pat = re.compile(rf'("word":\s*"{escaped}"[\s\S]*?"image":\s*")[^"]+(")', re.M)
    new_content, n = pat.subn(rf"\1{url}\2", content, count=1)
    if n:
        content = new_content
        patched += 1

DATA_JS.write_text(content, encoding="utf-8")

prog = json.loads(PROGRESS.read_text(encoding="utf-8")) if PROGRESS.exists() else {"completed": []}
key = f"{grade}|{unit_label}"
if key not in prog.get("completed", []):
    prog.setdefault("completed", []).append(key)
prog["last"] = {"grade": grade, "unit": unit_label, "words": patched, "at": __import__("datetime").datetime.now().isoformat()}
PROGRESS.write_text(json.dumps(prog, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"上传 {ok} 成功, {fail} 失败; data.js 更新 {patched} 条")
