# -*- coding: utf-8 -*-
"""Add L12 page04 speakEn phrases to manifest and generate missing MP3 (edge-tts)."""
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
P04 = ROOT / "L12" / "lesson12-page04-wh-if-object-clauses.html"
MP3_DIR = ROOT / "L12" / "assets" / "tts-mp3"
MANIFEST_OUT = ROOT / "L12" / "assets" / "l12-page04-tts-manifest.js"
VOICE = "en-GB-RyanNeural"


def hash_name(text: str) -> str:
    return hashlib.sha256(("l12-tts|" + text).encode("utf-8")).hexdigest()[:20]


def collect_p04_phrases() -> list[str]:
    t = P04.read_text(encoding="utf-8")
    found = set()
    for m in re.finditer(r'speakEn(?:Slow)?\(\s*["\']([^"\']+)["\']', t):
        found.add(m.group(1).strip())
    return sorted(found)


async def synth(text: str, dest: pathlib.Path) -> None:
    await edge_tts.Communicate(text, VOICE).save(str(dest))


async def main() -> None:
    MP3_DIR.mkdir(parents=True, exist_ok=True)
    phrases = collect_p04_phrases()
    manifest = {}
    todo = []
    for p in phrases:
        h = hash_name(p)
        rel = f"assets/tts-mp3/{h}.mp3"
        manifest[p] = rel
        dest = ROOT / "L12" / rel.replace("/", pathlib.os.sep)
        if not dest.exists() or dest.stat().st_size < 500:
            todo.append((p, dest))

    lines = ['window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {']
    for p in phrases:
        rel = manifest[p]
        esc = json.dumps(p, ensure_ascii=False)
        lines.append(f"  {esc}: {json.dumps(rel)},")
    lines.append("});")
    MANIFEST_OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"phrases={len(phrases)} generate={len(todo)}")
    for p, dest in todo:
        await synth(p, dest)
        print("OK", dest.name)


if __name__ == "__main__":
    asyncio.run(main())
