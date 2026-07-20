"""Batch-fix Grammar HTML audio: COS + Azure TTS stack."""
from __future__ import annotations

import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SHARED_FILES = [
    "play-local-mp3.js",
    "lesson-tts-azure-config.js",
    "lesson-tts-azure-play.js",
    "lesson-tts-bootstrap.js",
    "lesson-local-audio.js",
    "lesson-speak-local-only.js",
    "handout-tts.js",
]

TTS_MARKERS = (
    "data-tts",
    "tts-chip",
    "playAudio",
    "speakText",
    "__LESSON_TTS_MANIFEST",
    "playLessonAzure",
    "handout-tts",
    "L05Speak",
    "LessonTTSBootstrap",
    "playSsml",
    "playText",
    "LessonLocalAudio",
    "L03AzureTTS",
    "L03AudioManifest",
    "speakAzureTts",
    "playCorpusLine",
    "playExamVoice",
    "tts-read-btn",
)

SKIP_PARTS = (
    "node_modules",
    "classroom-flow-insert",
    "/scripts/",
)

PLAY_AUDIO_OLD = re.compile(
    r"async function playAudio\(text\)\s*\{[\s\S]*?finally\s*\{\s*unlockUI\(\);\s*\}\s*\}",
    re.MULTILINE,
)

PLAY_AUDIO_NEW = """async function playAudio(text) {
    if (!text) return;
    lockUI();
    try {
      var line = String(text || "").trim();
      if (!line) return;
      if (window.LessonTTSBootstrap && typeof window.LessonTTSBootstrap.playLocalIfAvailable === "function") {
        var localOk = await window.LessonTTSBootstrap.playLocalIfAvailable(line);
        if (localOk) return;
      }
      if (typeof window.playLessonAzureTtsPlain === "function") {
        var azureOk = await window.playLessonAzureTtsPlain(line);
        if (azureOk) return;
      }
      if (window.speechSynthesis) {
        await new Promise(function (resolve) {
          var u = new SpeechSynthesisUtterance(line);
          u.lang = "en-GB";
          u.onend = u.onerror = function () { resolve(); };
          var speak = window.speechSynthesis.__lessonOrigSpeak || window.speechSynthesis.speak.bind(window.speechSynthesis);
          speak(u);
        });
      }
    } finally {
      unlockUI();
    }
  }"""


def should_skip(rel: str) -> bool:
    if rel.endswith("index.html") and "/Grammar/index.html" not in rel.replace("\\", "/"):
        name = os.path.basename(rel)
        if name == "index.html":
            return True
    norm = rel.replace("\\", "/")
    return any(p in norm for p in SKIP_PARTS)


def needs_tts(text: str) -> bool:
    return any(m in text for m in TTS_MARKERS)


def shared_prefix(rel: str) -> str:
    depth = rel.replace("\\", "/").count("/")
    return "../" * depth if depth else "./"


def sync_shared_copies() -> int:
    count = 0
    shared = os.path.join(ROOT, "shared")
    for dirpath, _, files in os.walk(ROOT):
        if not dirpath.endswith(os.path.join("assets")):
            continue
        for name in SHARED_FILES:
            src = os.path.join(shared, name)
            if not os.path.isfile(src):
                continue
            dest = os.path.join(dirpath, name)
            if os.path.isfile(dest) or name in (
                "play-local-mp3.js",
                "lesson-tts-azure-config.js",
                "lesson-tts-azure-play.js",
                "lesson-tts-bootstrap.js",
            ):
                shutil.copy2(src, dest)
                count += 1
    return count


def normalize_paths(text: str, prefix: str) -> str:
    text = re.sub(
        r'<script([^>]+)src="assets/play-local-mp3\.js"([^>]*)></script>',
        f'<script\\1src="{prefix}shared/play-local-mp3.js"\\2></script>',
        text,
    )
    text = re.sub(
        r'<script([^>]+)src="assets/lesson-tts-azure-config\.js"([^>]*)></script>',
        f'<script\\1src="{prefix}shared/lesson-tts-azure-config.js"\\2></script>',
        text,
    )
    text = re.sub(
        r'<script([^>]+)src="assets/lesson-tts-azure-play\.js"([^>]*)></script>',
        f'<script\\1src="{prefix}shared/lesson-tts-azure-play.js"\\2></script>',
        text,
    )
    return text


def has_script(text: str, needle: str) -> bool:
    return needle in text


def inject_missing_scripts(text: str, prefix: str) -> str:
    scripts = [
        (f'{prefix}shared/play-local-mp3.js', "play-local-mp3.js"),
        (f'{prefix}shared/lesson-tts-azure-config.js', "lesson-tts-azure-config.js"),
        (f'{prefix}shared/lesson-tts-azure-play.js', "lesson-tts-azure-play.js"),
    ]
    optional = [
        (f'{prefix}shared/lesson-local-audio.js', "lesson-local-audio.js", ' defer'),
        (f'{prefix}shared/lesson-speak-local-only.js', "lesson-speak-local-only.js", ""),
    ]

    missing = []
    for src, needle in scripts:
        if not has_script(text, needle):
            missing.append(f'  <script src="{src}"></script>\n')

    for src, needle, extra in optional:
        if not has_script(text, needle) and (
            "data-tts" in text or "tts-chip" in text or "LessonLocalAudio" in text
        ):
            missing.append(f'  <script src="{src}"{extra}></script>\n')

    if not missing:
        return text

    block = "".join(missing)
    if re.search(r"<head[^>]*>", text, re.I):
        return re.sub(r"(<head[^>]*>\s*)", r"\1" + block, text, count=1, flags=re.I)
    return block + text


def inject_azure_after_play_local(text: str, prefix: str) -> str:
    if has_script(text, "lesson-tts-azure-config.js") and has_script(
        text, "lesson-tts-azure-play.js"
    ):
        return text
    if not has_script(text, "play-local-mp3.js"):
        return text
    snippet = (
        f'  <script src="{prefix}shared/lesson-tts-azure-config.js"></script>\n'
        f'  <script src="{prefix}shared/lesson-tts-azure-play.js"></script>\n'
    )
    return re.sub(
        r'(<script[^>]+play-local-mp3\.js[^>]*></script>\s*)',
        r"\1" + snippet,
        text,
        count=1,
    )


def patch_l14_page(text: str, rel: str) -> str:
    if not rel.replace("\\", "/").startswith("L14/lesson14-page"):
        return text
    prefix = shared_prefix(rel)
    if not has_script(text, "play-local-mp3.js"):
        snippet = (
            f'  <script src="{prefix}shared/play-local-mp3.js"></script>\n'
            f'  <script src="{prefix}shared/lesson-tts-azure-config.js"></script>\n'
            f'  <script src="{prefix}shared/lesson-tts-azure-play.js"></script>\n'
            f'  <script src="{prefix}shared/lesson-tts-bootstrap.js"></script>\n'
            f'  <script src="assets/handout-tts-manifest.js"></script>\n'
        )
        text = re.sub(r"(<head>\s*)", r"\1" + snippet, text, count=1)
    if PLAY_AUDIO_OLD.search(text):
        text = PLAY_AUDIO_OLD.sub(PLAY_AUDIO_NEW, text, count=1)
    return text


def patch_html(path: str) -> bool:
    rel = os.path.relpath(path, ROOT)
    if should_skip(rel):
        return False
    original = open(path, encoding="utf-8").read()
    if not needs_tts(original):
        return False

    prefix = shared_prefix(rel)
    updated = normalize_paths(original, prefix)
    updated = inject_missing_scripts(updated, prefix)
    updated = inject_azure_after_play_local(updated, prefix)
    updated = patch_l14_page(updated, rel)

    if updated != original:
        open(path, "w", encoding="utf-8").write(updated)
        return True
    return False


def main() -> None:
    copies = sync_shared_copies()
    changed = 0
    for dirpath, _, files in os.walk(ROOT):
        for fn in files:
            if not fn.endswith(".html"):
                continue
            path = os.path.join(dirpath, fn)
            if patch_html(path):
                changed += 1
                print("patched:", os.path.relpath(path, ROOT))
    print(f"Done: asset copies synced={copies}, html patched={changed}")


if __name__ == "__main__":
    main()
