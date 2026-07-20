# -*- coding: utf-8 -*-
"""Generate l07-page01/*.mp3 for offline file:// (edge-tts)."""
import asyncio
import json
import pathlib
import sys

try:
    import edge_tts
except ImportError:
    print("pip install edge-tts", file=sys.stderr)
    sys.exit(1)

VOICE = "en-GB-RyanNeural"
HERE = pathlib.Path(__file__).resolve().parent
MANIFEST = HERE / "manifest.json"


async def synth(text: str, dest: pathlib.Path) -> None:
    comm = edge_tts.Communicate(text.strip(), VOICE)
    await comm.save(str(dest))
    print("OK", dest.name)


async def main() -> None:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    tasks = []
    for item in data.get("files", []):
        rel = item.get("mp3", "")
        text = item.get("text", "")
        if not rel or not text:
            continue
        name = pathlib.Path(rel).name
        dest = HERE / name
        tasks.append(synth(text, dest))
    await asyncio.gather(*tasks)


if __name__ == "__main__":
    asyncio.run(main())
