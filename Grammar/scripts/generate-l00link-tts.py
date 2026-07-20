# -*- coding: utf-8 -*-
"""Generate L00-主系表与非谓语 course local MP3 + unified manifest."""
import asyncio
import hashlib
import json
import pathlib
import re
import subprocess
import sys

try:
    import edge_tts
except ImportError:
    print("pip install edge-tts", file=sys.stderr)
    sys.exit(1)

ROOT = pathlib.Path(__file__).resolve().parent.parent
LINK = ROOT / "L00-主系表与非谓语"
MP3_DIR = LINK / "assets" / "tts-mp3"
OUT = LINK / "assets" / "l00link-course-tts-manifest.js"
PHRASES_JSON = ROOT / "scripts" / "l00link-tts-phrases.json"
VOICE_EN = "en-GB-RyanNeural"
VOICE_ZH = "zh-CN-XiaoxiaoNeural"
HASH_PREFIX = "l00link-tts|"


def hash_name(text: str) -> str:
    return hashlib.sha256((HASH_PREFIX + text).encode("utf-8")).hexdigest()[:20]


def pick_voice(text: str) -> str:
    return VOICE_ZH if re.search(r"[\u4e00-\u9fff]", text) else VOICE_EN


def collect_phrases() -> set[str]:
    if not PHRASES_JSON.exists():
        subprocess.check_call(["node", str(ROOT / "scripts/collect-l00link-tts-phrases.mjs")], cwd=str(ROOT))
    data = json.loads(PHRASES_JSON.read_text(encoding="utf-8"))
    return {str(x).replace(r"\s+", " ").strip() for x in data if str(x).strip()}


def write_manifest(mapping: dict[str, str]) -> None:
    lines = [
        "/** L00 主系表与非谓语 · 全课本地 MP3（互动页 + 讲义） */",
        "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {",
    ]
    for k in sorted(mapping.keys(), key=lambda x: (bool(re.search(r"[\u4e00-\u9fff]", x)), x.lower())):
        lines.append(f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(mapping[k], ensure_ascii=False)},")
    lines.append("});")
    lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")


async def main() -> None:
    MP3_DIR.mkdir(parents=True, exist_ok=True)
    phrases = collect_phrases()
    mapping = {p: f"assets/tts-mp3/{hash_name(p)}.mp3" for p in phrases}
    missing = [t for t, rel in mapping.items() if not (LINK / rel).exists()]
    print(f"phrases={len(phrases)} missing_mp3={len(missing)}")

    sem = asyncio.Semaphore(6)

    async def one(text: str) -> None:
        rel = mapping[text]
        out = LINK / rel
        if out.exists():
            return
        async with sem:
            for attempt in range(4):
                try:
                    await edge_tts.Communicate(text, pick_voice(text)).save(str(out))
                    print("ok", rel[:50])
                    return
                except Exception as e:
                    if attempt >= 3:
                        print("FAIL", text[:60], e)
                        return
                    await asyncio.sleep(2 + attempt * 2)

    await asyncio.gather(*[one(t) for t in missing])
    write_manifest(mapping)
  # sync handout file keys (same paths)
    handout = LINK / "assets" / "handout-tts-manifest.js"
    handout_keys = {k: v for k, v in mapping.items() if k in collect_handout_keys()}
    write_handout_manifest(handout_keys)
    print("wrote", OUT.name, "and handout-tts-manifest.js")


def collect_handout_keys() -> set[str]:
    keys: set[str] = set()
    for name in ("link-handout-junior.html", "link-handout-senior.html", "link-handout-classroom-full.html"):
        fp = LINK / name
        if not fp.exists():
            continue
        t = fp.read_text(encoding="utf-8")
        for m in re.finditer(r'data-tts="([^"]+)"', t):
            keys.add(m.group(1))
    return keys


def write_handout_manifest(mapping: dict[str, str]) -> None:
    lines = [
        "/** L00 主系表讲义 chip — 本地 MP3 */",
        "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {",
    ]
    for k in sorted(mapping.keys(), key=lambda x: (bool(re.search(r"[\u4e00-\u9fff]", x)), x.lower())):
        lines.append(f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(mapping[k], ensure_ascii=False)},")
    lines.append("});")
    lines.append("")
    (LINK / "assets" / "handout-tts-manifest.js").write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    asyncio.run(main())
