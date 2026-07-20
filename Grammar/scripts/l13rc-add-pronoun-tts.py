# -*- coding: utf-8 -*-
import asyncio
import hashlib
import json
import pathlib
import re

import edge_tts

RC = pathlib.Path(__file__).resolve().parent.parent / "L13-定语从句"
TEXT = (
    "The pronoun 'him' refers to the same person as 'the student' "
    "and is redundant. We need to replace it with a relative pronoun."
)
HASH_PREFIX = "l13rc-tts|"


def hash_name(text: str) -> str:
    return hashlib.sha256((HASH_PREFIX + text).encode("utf-8")).hexdigest()[:20]


async def main() -> None:
    rel = f"assets/tts-mp3/{hash_name(TEXT)}.mp3"
    out = RC / rel
    if not out.exists():
        await edge_tts.Communicate(TEXT, "en-GB-RyanNeural").save(str(out))
        print("created", rel)
    mf = RC / "assets" / "l13rc-demo-tts-manifest.js"
    t = mf.read_text(encoding="utf-8")
    t = re.sub(r'  "The pronoun":[^\n]+\n', "", t)
    if TEXT not in t:
        entry = f"  {json.dumps(TEXT, ensure_ascii=False)}: {json.dumps(rel, ensure_ascii=False)},\n"
        t = t.replace(
            "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n",
            "window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {\n" + entry,
        )
        mf.write_text(t, encoding="utf-8")
        print("manifest updated")


if __name__ == "__main__":
    asyncio.run(main())
