# -*- coding: utf-8 -*-
"""Generate local MP3 + manifest for L13-定语从句 (course #14 relative clauses)."""
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
RC = ROOT / "L13-定语从句"
MP3_DIR = RC / "assets" / "tts-mp3"
DEMO_MANIFEST = RC / "assets" / "l13rc-demo-tts-manifest.js"
HANDOUT_MANIFEST = RC / "assets" / "handout-tts-manifest.js"
VOICE_EN = "en-US-JennyNeural"
VOICE_ZH = "zh-CN-XiaoxiaoNeural"
HASH_PREFIX = "l13rc-tts|"

MANIFEST_RE = re.compile(
    r'"((?:[^"\\]|\\.){2,500})":\s*"([^"]+\.mp3)"'
)
SPEAK_RE = re.compile(
    r'(?:window\.speak|speak)\(\s*[\'"]((?:\\.|[^\'"])+)[\'"]'
)
CHIP_RE = re.compile(r'data-tts="([^"]+)"')
TEXT_FIELD_RE = re.compile(r'text:\s*[\'"]((?:\\.|[^\'"])+)[\'"]')


def hash_name(text: str) -> str:
    return hashlib.sha256((HASH_PREFIX + text).encode("utf-8")).hexdigest()[:20]


def pick_voice(text: str) -> str:
    return VOICE_ZH if re.search(r"[\u4e00-\u9fff]", text) else VOICE_EN


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def load_manifest() -> dict[str, str]:
    m: dict[str, str] = {}
    for path in list(RC.rglob("*.html")) + list((RC / "assets").glob("*.js")):
        if path.suffix not in (".html", ".js"):
            continue
        t = path.read_text(encoding="utf-8", errors="replace")
        for km in MANIFEST_RE.finditer(t):
            rel = km.group(2).replace("\\", "/")
            rel = rel.replace("../L13/assets/", "assets/").lstrip("./")
            if not rel.startswith("assets/tts-mp3/"):
                rel = f"assets/tts-mp3/{pathlib.Path(rel).name}"
            m[km.group(1)] = rel
    return m


def collect_phrases() -> set[str]:
    found: set[str] = set()
    for path in RC.rglob("*.html"):
        t = path.read_text(encoding="utf-8", errors="replace")
        for m in SPEAK_RE.finditer(t):
            found.add(m.group(1).replace("\\'", "'").replace('\\"', '"'))
        for m in CHIP_RE.finditer(t):
            found.add(m.group(1))
        for m in TEXT_FIELD_RE.finditer(t):
            tx = norm(m.group(1).replace("\\'", "'"))
            if tx:
                found.add(tx)
    return {norm(x) for x in found if norm(x)}


def write_manifest(path: pathlib.Path, mapping: dict[str, str], header: str) -> None:
    lines = [header, "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {"]
    for k in sorted(mapping.keys(), key=lambda x: (bool(re.search(r"[\u4e00-\u9fff]", x)), x.lower())):
        esc = json.dumps(k, ensure_ascii=False)
        rel = json.dumps(mapping[k], ensure_ascii=False)
        lines.append(f"  {esc}: {rel},")
    lines.append("});")
    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


async def synth_one(text: str, out: pathlib.Path, voice: str) -> None:
    comm = edge_tts.Communicate(text, voice)
    await comm.save(str(out))


async def main() -> None:
    MP3_DIR.mkdir(parents=True, exist_ok=True)
    manifest = load_manifest()
    phrases = collect_phrases()
    for p in phrases:
        manifest.setdefault(p, f"assets/tts-mp3/{hash_name(p)}.mp3")

    missing = [t for t, rel in manifest.items() if not (RC / rel).exists()]
    print(f"phrases={len(phrases)} manifest={len(manifest)} missing_mp3={len(missing)}")

    sem = asyncio.Semaphore(4)

    async def one(text: str) -> None:
        rel = manifest[text]
        out = RC / rel
        if out.exists():
            return
        async with sem:
            await synth_one(text, out, pick_voice(text))
            print("ok", rel)

    await asyncio.gather(*[one(t) for t in missing])

    handout_keys = {
        k: v
        for k, v in manifest.items()
        if k in collect_phrases() and ("handout" in str(HANDOUT_MANIFEST) or True)
    }
    # Split: handout manifest = chips only from handout html
    handout_phrases: set[str] = set()
    for name in ("rel-clause-handout.html", "rel-clause-handout-classroom-full.html"):
        p = RC / name
        if not p.exists():
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        for m in CHIP_RE.finditer(t):
            handout_phrases.add(m.group(1))

    demo_phrases = collect_phrases() - handout_phrases
    write_manifest(
        HANDOUT_MANIFEST,
        {k: manifest[k] for k in handout_phrases if k in manifest},
        "/** L13RC handout chips — local MP3 only */",
    )
    write_manifest(
        DEMO_MANIFEST,
        {k: manifest[k] for k in demo_phrases if k in manifest},
        "/** L13RC demo pages — local MP3 only */",
    )
    print("wrote", HANDOUT_MANIFEST.name, "and", DEMO_MANIFEST.name)


if __name__ == "__main__":
    asyncio.run(main())
