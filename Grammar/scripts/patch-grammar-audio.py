"""Sync TTS bootstrap + inject Azure scripts into Grammar HTML pages."""
from __future__ import annotations

import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHARED_BOOT = os.path.join(ROOT, "shared", "lesson-tts-bootstrap.js")
AZURE_SNIPPET = (
    '  <script src="../shared/lesson-tts-azure-config.js"></script>\n'
    '  <script src="../shared/lesson-tts-azure-play.js"></script>\n'
)
L14_HEAD_SNIPPET = (
    '  <script src="../shared/play-local-mp3.js"></script>\n'
    + AZURE_SNIPPET
    + '  <script src="../shared/lesson-tts-bootstrap.js"></script>\n'
    + '  <script src="assets/handout-tts-manifest.js"></script>\n'
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


def sync_bootstrap_copies() -> int:
    count = 0
    for dirpath, _, files in os.walk(ROOT):
        if dirpath.endswith(os.path.join("assets")) and "lesson-tts-bootstrap.js" in files:
            dest = os.path.join(dirpath, "lesson-tts-bootstrap.js")
            shutil.copy2(SHARED_BOOT, dest)
            count += 1
    return count


def rel_azure_paths(html_path: str) -> str:
    depth = html_path.replace("\\", "/").count("/")
    prefix = "../" * depth if depth else "./"
    return (
        f'  <script src="{prefix}shared/lesson-tts-azure-config.js"></script>\n'
        f'  <script src="{prefix}shared/lesson-tts-azure-play.js"></script>\n'
    )


def inject_azure_after_play_local(text: str, html_path: str) -> str:
    if "lesson-tts-azure-config.js" in text or "lesson-tts-azure-play.js" in text:
        return text
    if "play-local-mp3.js" not in text:
        return text
    snippet = rel_azure_paths(html_path)
    return re.sub(
        r'(<script[^>]+play-local-mp3\.js[^>]*></script>\s*)',
        r"\1" + snippet,
        text,
        count=1,
    )


def patch_l14_page(path: str, text: str) -> str:
    rel = os.path.relpath(path, ROOT).replace("\\", "/")
    if not rel.startswith("L14/lesson14-page") or not rel.endswith(".html"):
        return text
    if "play-local-mp3.js" not in text:
        text = re.sub(r"(<head>\s*)", r"\1" + L14_HEAD_SNIPPET, text, count=1)
    else:
        text = inject_azure_after_play_local(text, rel)
        if 'src="assets/handout-tts-manifest.js"' not in text and 'src="../shared/lesson-tts-bootstrap.js"' not in text:
            text = re.sub(
                r"(<script[^>]+lesson-tts-azure-play\.js[^>]*></script>\s*)",
                r'\1  <script src="../shared/lesson-tts-bootstrap.js"></script>\n'
                r'  <script src="assets/handout-tts-manifest.js"></script>\n',
                text,
                count=1,
            )
    if PLAY_AUDIO_OLD.search(text):
        text = PLAY_AUDIO_OLD.sub(PLAY_AUDIO_NEW, text, count=1)
    return text


def main() -> None:
    boot = sync_bootstrap_copies()
    html_changed = 0
    for dirpath, _, files in os.walk(ROOT):
        for fn in files:
            if not fn.endswith(".html"):
                continue
            path = os.path.join(dirpath, fn)
            rel = os.path.relpath(path, ROOT)
            original = open(path, encoding="utf-8").read()
            updated = inject_azure_after_play_local(original, rel)
            updated = patch_l14_page(path, updated)
            if updated != original:
                open(path, "w", encoding="utf-8").write(updated)
                html_changed += 1
                print("HTML:", rel)
    print(f"Done: bootstrap copies={boot}, html patched={html_changed}")


if __name__ == "__main__":
    main()
