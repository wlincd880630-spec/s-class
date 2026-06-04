# -*- coding: utf-8 -*-
"""Generate L06 interaction-page TTS (page01/05-09) missing from manifest."""
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
L06 = ROOT / "L06"
MP3_DIR = L06 / "assets" / "tts-mp3"
OUT = L06 / "assets" / "l06-interaction-tts-manifest.js"
VOICE_EN = "en-US-JennyNeural"
VOICE_ZH = "zh-CN-XiaoxiaoNeural"
HASH_PREFIX = "l06-tts|"

MANIFEST_RE = re.compile(
    r'"((?:[^"\\]|\\.){2,500})":\s*"(assets/tts-mp3/[^"]+\.mp3)"'
)

SPEAK_STR_RE = re.compile(
    r'speak(?:Azure|Rule|Line|Npc|Opening|Stem)\(\s*["\']([^"\']+)["\']',
)


def hash_name(text: str) -> str:
    return hashlib.sha256((HASH_PREFIX + text).encode("utf-8")).hexdigest()[:20]


def pick_voice(text: str) -> str:
    return VOICE_ZH if re.search(r"[\u4e00-\u9fff]", text) else VOICE_EN


def load_manifest() -> dict[str, str]:
    m: dict[str, str] = {}
    for path in list(L06.rglob("*.html")) + list((L06 / "assets").glob("*.js")):
        if path.suffix not in (".html", ".js"):
            continue
        t = path.read_text(encoding="utf-8", errors="replace")
        for km in MANIFEST_RE.finditer(t):
            m[km.group(1)] = km.group(2)
    return m


def collect_phrases() -> set[str]:
    found: set[str] = set()

    # page01
    found.update(
        [
            "Hey! Stop right there! Don't run in the hallways!",
            "Take off your headphones! Don't listen to music here!",
            "What are you doing? Stop eating in the library!",
        ]
    )

    # page05 golden + all We {modal} {phrase}.
    phrases = [
        "arrive late for class",
        "run in the hallways",
        "eat in the dining hall",
        "wear a uniform",
        "keep quiet in the library",
        "fight with classmates",
        "bring mobile phones to school",
        "clean the classroom every day",
        "hand in homework on time",
        "listen to music in class",
        "make the bed in the morning",
        "help with housework",
        "stay up too late",
        "leave dirty dishes in the sink",
        "read a book before sleep",
        "go out on school nights",
        "wash hands before meals",
        "respect older people",
        "cheat on an exam",
        "talk loudly in public",
        "take photos in the museum",
        "park the car in front of the gate",
        "practice the piano for an hour",
        "walk the dog after dinner",
        "eat too much junk food",
        "cross the street on a red light",
        "pay attention to the teacher",
        "bring outside food into the cinema",
        "finish reading the task",
        "return the books on time",
    ]
    modals = ["can", "cannot", "must", "have to", "mustn't", "don't have to"]
    found.add("We must follow the rules, but we don't have to be perfect.")
    for m in modals:
        for p in phrases:
            found.add(f"We {m} {p}.")

    # page06-09 from HTML literals
    for name in [
        "lesson06-page06-diary.html",
        "lesson06-page07-debate.html",
        "lesson06-page08-escape.html",
        "lesson06-page09-exam.html",
    ]:
        t = (L06 / name).read_text(encoding="utf-8", errors="replace")
        for m in SPEAK_STR_RE.finditer(t):
            found.add(m.group(1).strip())
        if name.endswith("page07-debate.html"):
            for bm in re.finditer(r'boss:\s*"([^"]+)"', t):
                found.add(bm.group(1).strip())
        if name.endswith("page08-escape.html"):
            m = re.search(r'var CHANT_EN = "([^"]+)"', t)
            if m:
                found.add(m.group(1).strip())
        if name.endswith("page09-exam.html"):
            found.add("Detectives, silence please. The final trial begins now.")
            for sm in re.finditer(r'stem:\s*"([^"]+)"', t):
                found.add(sm.group(1).strip())

    return {p for p in found if len(p) >= 2}


async def synth(text: str, dest: pathlib.Path) -> None:
    await edge_tts.Communicate(text, pick_voice(text)).save(str(dest))


async def main() -> None:
    MP3_DIR.mkdir(parents=True, exist_ok=True)
    existing = load_manifest()
    phrases = sorted(collect_phrases())
    missing = [p for p in phrases if p not in existing]
    new_entries: dict[str, str] = {}
    todo: list[tuple[str, pathlib.Path]] = []

    for p in missing:
        h = hash_name(p)
        rel = f"assets/tts-mp3/{h}.mp3"
        dest = L06 / rel.replace("/", pathlib.os.sep)
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

    print(f"phrases={len(phrases)} new={len(missing)} generate={len(todo)}")
    for i, (p, dest) in enumerate(todo):
        try:
            await synth(p, dest)
            if (i + 1) % 20 == 0 or i == len(todo) - 1:
                print(f"  OK {i + 1}/{len(todo)}", dest.name)
        except Exception as err:
            print("FAIL", p[:50], err, file=sys.stderr)


if __name__ == "__main__":
    asyncio.run(main())
