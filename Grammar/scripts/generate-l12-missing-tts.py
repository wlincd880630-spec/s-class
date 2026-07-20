# -*- coding: utf-8 -*-
"""Scan L12 HTML for TTS phrases missing from manifest; generate MP3 via edge-tts."""
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
L12 = ROOT / "L12"
MP3_DIR = L12 / "assets" / "tts-mp3"
OUT = L12 / "assets" / "l12-extra-tts-manifest.js"
VOICE_EN = "en-GB-RyanNeural"
VOICE_ZH = "zh-CN-XiaoxiaoNeural"


def pick_voice(text: str) -> str:
    if re.search(r"[\u4e00-\u9fff]", text):
        return VOICE_ZH
    return VOICE_EN

FIELD_RE = re.compile(
    r'(?:direct|reported|full|audio|sentence):\s*"((?:[^"\\]|\\.)*)"',
    re.MULTILINE,
)
SPEAK_RE = re.compile(r'speakEn(?:Slow)?\(\s*["\']([^"\']+)["\']')
MANIFEST_RE = re.compile(
    r'"((?:[^"\\]|\\.){2,500})":\s*"(assets/tts-mp3/[^"]+\.mp3)"'
)


def hash_name(text: str) -> str:
    return hashlib.sha256(("l12-tts|" + text).encode("utf-8")).hexdigest()[:20]


def load_manifest() -> dict[str, str]:
    m: dict[str, str] = {}
    for path in L12.rglob("*"):
        if path.suffix not in (".html", ".js"):
            continue
        if "tts-manifest" in path.name or path.name.endswith(".html"):
            t = path.read_text(encoding="utf-8", errors="replace")
            for km in MANIFEST_RE.finditer(t):
                m[km.group(1)] = km.group(2)
    return m


def collect_phrases() -> set[str]:
    found: set[str] = set()
    for html in sorted(L12.glob("lesson12-page*.html")):
        t = html.read_text(encoding="utf-8", errors="replace")
        for m in FIELD_RE.finditer(t):
            s = m.group(1).encode().decode("unicode_escape") if "\\" in m.group(1) else m.group(1)
            found.add(s.strip())
        for m in SPEAK_RE.finditer(t):
            found.add(m.group(1).strip())
    return {p for p in found if len(p) >= 3}


async def synth(text: str, dest: pathlib.Path) -> None:
    voice = pick_voice(text)
    await edge_tts.Communicate(text, voice).save(str(dest))


async def main() -> None:
    MP3_DIR.mkdir(parents=True, exist_ok=True)
    manifest = load_manifest()
    phrases = sorted(collect_phrases())
    missing = [p for p in phrases if p not in manifest]
    new_entries: dict[str, str] = {}
    todo: list[tuple[str, pathlib.Path]] = []

    for p in missing:
        h = hash_name(p)
        rel = f"assets/tts-mp3/{h}.mp3"
        dest = L12 / rel.replace("/", pathlib.os.sep)
        new_entries[p] = rel
        if not dest.exists() or dest.stat().st_size < 500:
            todo.append((p, dest))

    merged: dict[str, str] = {}
    if OUT.exists():
        for km in MANIFEST_RE.finditer(OUT.read_text(encoding="utf-8")):
            merged[km.group(1)] = km.group(2)
    merged.update(new_entries)

    lines = [
        "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {"
    ]
    for p in sorted(merged):
        lines.append(f"  {json.dumps(p, ensure_ascii=False)}: {json.dumps(merged[p])},")
    lines.append("});")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"phrases_scanned={len(phrases)} already_mapped={len(phrases)-len(missing)} missing={len(missing)} generate={len(todo)}")
    for p, dest in todo:
        try:
            await synth(p, dest)
            print("OK", dest.name[:24], p[:60])
        except Exception as err:
            print("FAIL", dest.name[:24], p[:40], err, file=sys.stderr)

    if missing[:8]:
        print("sample_missing:", *missing[:8], sep="\n  ")


if __name__ == "__main__":
    asyncio.run(main())
