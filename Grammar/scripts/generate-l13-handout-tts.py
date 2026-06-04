# -*- coding: utf-8 -*-
"""Generate L13 past-perfect handout TTS MP3 from handout-tts-manifest.js + data-tts chips."""
import asyncio
import hashlib
import json
import pathlib
import re
import sys

try:
    import edge_tts
except ImportError:
    print("pip install edge-tts", file=sys.stderr)
    sys.exit(1)

ROOT = pathlib.Path(__file__).resolve().parent.parent
L13 = ROOT / "L13"
MP3_DIR = L13 / "assets" / "tts-mp3"
MANIFEST = L13 / "assets" / "handout-tts-manifest.js"
HANDOUT = L13 / "lesson13-page08-handout.html"
CLASSROOM = L13 / "lesson13-handout-classroom-full.html"
VOICE_EN = "en-US-JennyNeural"
VOICE_ZH = "zh-CN-XiaoxiaoNeural"
HASH_PREFIX = "l13-handout-tts|"

MANIFEST_RE = re.compile(
    r'"((?:[^"\\]|\\.){2,500})":\s*"(assets/tts-mp3/[^"]+\.mp3)"'
)
CHIP_RE = re.compile(r'data-tts="([^"]+)"')


def hash_name(text: str) -> str:
    return hashlib.sha256((HASH_PREFIX + text).encode("utf-8")).hexdigest()[:20]


def pick_voice(text: str) -> str:
    return VOICE_ZH if re.search(r"[\u4e00-\u9fff]", text) else VOICE_EN


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def load_manifest() -> dict[str, str]:
    m: dict[str, str] = {}
    if MANIFEST.exists():
        t = MANIFEST.read_text(encoding="utf-8", errors="replace")
        for km in MANIFEST_RE.finditer(t):
            m[km.group(1)] = km.group(2)
    return m


def collect_chips() -> set[str]:
    found: set[str] = set()
    for path in (HANDOUT, CLASSROOM):
        if not path.exists():
            continue
        t = path.read_text(encoding="utf-8", errors="replace")
        for m in CHIP_RE.finditer(t):
            found.add(m.group(1))
    return {norm(x) for x in found if norm(x)}


def write_manifest(mapping: dict[str, str]) -> None:
    lines = [
        "/** L13 过去完成时讲义 — 本地 MP3 */",
        "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {",
    ]
    for k in sorted(mapping.keys(), key=lambda x: (bool(re.search(r"[\u4e00-\u9fff]", x)), x.lower())):
        lines.append(f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(mapping[k], ensure_ascii=False)},")
    lines.append("});")
    lines.append("")
    MANIFEST.write_text("\n".join(lines), encoding="utf-8")


async def synth(text: str, out: pathlib.Path, voice: str) -> None:
    await edge_tts.Communicate(text, voice).save(str(out))


async def main() -> None:
    MP3_DIR.mkdir(parents=True, exist_ok=True)
    manifest = load_manifest()
    for chip in collect_chips():
        manifest.setdefault(chip, f"assets/tts-mp3/{hash_name(chip)}.mp3")

    missing = [t for t, rel in manifest.items() if not (L13 / rel).exists()]
    print(f"manifest={len(manifest)} missing_mp3={len(missing)}")

    sem = asyncio.Semaphore(4)

    async def one(text: str) -> None:
        rel = manifest[text]
        out = L13 / rel
        if out.exists():
            return
        async with sem:
            await synth(text, out, pick_voice(text))
            print("ok", rel)

    await asyncio.gather(*[one(t) for t in missing])
    write_manifest(manifest)
    print("wrote", MANIFEST)


if __name__ == "__main__":
    asyncio.run(main())
