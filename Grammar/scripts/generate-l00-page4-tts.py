# -*- coding: utf-8 -*-
"""Generate local MP3 + manifest for L00 page4 (VERB_ITEMS sentences)."""
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
L00 = ROOT / "L00-主谓宾与非谓语"
VERBS_JS = L00 / "page4verbs.js"
MP3_DIR = L00 / "assets" / "tts-mp3"
OUT = L00 / "assets" / "l00-page4-tts-manifest.js"
VOICE_EN = "en-GB-RyanNeural"
HASH_PREFIX = "l00-p4-tts|"


def hash_name(text: str) -> str:
    return hashlib.sha256((HASH_PREFIX + text).encode("utf-8")).hexdigest()[:20]


def collect_phrases() -> list[str]:
    node = r"""
const fs = require("fs");
const p = process.argv[1];
eval(fs.readFileSync(p, "utf8"));
const set = new Set();
VERB_ITEMS.forEach(function (v) {
  if (v.example_sentence) set.add(String(v.example_sentence).replace(/\s+/g, " ").trim());
  if (v.practice_1_answer && v.practice_1_answer.length)
    set.add(v.practice_1_answer.join(" ").replace(/\s+/g, " ").trim());
  if (v.practice_2_answer && v.practice_2_answer.length)
    set.add(v.practice_2_answer.join(" ").replace(/\s+/g, " ").trim());
});
set.add("Congratulations! You have finished this page.");
console.log(JSON.stringify([...set].filter(Boolean)));
"""
    raw = subprocess.check_output(
        ["node", "-e", node, str(VERBS_JS)],
        cwd=str(ROOT),
        encoding="utf-8",
    )
    return json.loads(raw)


def write_manifest(mapping: dict[str, str]) -> None:
    lines = [
        "/** L00 page4 · VERB_ITEMS 例句/练习句 — 本地 MP3 */",
        "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {",
    ]
    for k in sorted(mapping.keys(), key=lambda x: x.lower()):
        lines.append(f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(mapping[k], ensure_ascii=False)},")
    lines.append("});")
    lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")


async def main() -> None:
    MP3_DIR.mkdir(parents=True, exist_ok=True)
    phrases = collect_phrases()
    mapping = {p: f"assets/tts-mp3/{hash_name(p)}.mp3" for p in phrases}
    missing = [t for t, rel in mapping.items() if not (L00 / rel).exists()]
    print(f"phrases={len(phrases)} missing_mp3={len(missing)}")

    sem = asyncio.Semaphore(6)

    async def one(text: str) -> None:
        rel = mapping[text]
        out = L00 / rel
        if out.exists():
            return
        async with sem:
            await edge_tts.Communicate(text, VOICE_EN).save(str(out))
            print("ok", rel)

    await asyncio.gather(*[one(t) for t in missing])
    write_manifest(mapping)
    print("wrote", OUT)


if __name__ == "__main__":
    asyncio.run(main())
