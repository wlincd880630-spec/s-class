"""Fix corrupted playLocalMp3Url handlers and L03 speak() blocks."""
from __future__ import annotations

import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CORRUPT_BLOCK = re.compile(
    r'if \(typeof window\.playLocalMp3Url === "function"\) \{\s*'
    r'return window\.playLocalMp3Url\(rel\)\.then\(function \(ok\) \{\s*'
    r'if \(!ok\) console\.warn\("\(!!ok\);\s*\}\);\s*\}\);\s*\}',
    re.MULTILINE,
)

CORRUPT_FIX = """if (typeof window.playLocalMp3Url === "function") {
        return window.playLocalMp3Url(rel).then(function (ok) {
          resolve(!!ok);
        });
      }
"""

L03_SPEAK_BLOCK = re.compile(
    r"      stop\(\);\s*"
    r"var id = state\.requestId;\s*"
    r"(?:if \(typeof window\.playLocalMp3Url === \"function\"\) \{[\s\S]*?\}\s*){1,3}"
    r"var a = new Audio\(src\);",
    re.MULTILINE,
)

L03_SPEAK_FIX = """      stop();
      var id = state.requestId;
      var playbackRate = mapRateToPlayback(opts.rate, opts.slow);

      function finishAzure() {
        if (typeof window.playLessonAzureTtsPlain === "function") {
          window.playLessonAzureTtsPlain(line).then(function () {
            resolve();
          });
          return;
        }
        resolve();
      }

      if (typeof window.playLocalMp3Url === "function") {
        return window.playLocalMp3Url(src, { playbackRate: playbackRate }).then(function (ok) {
          if (ok) {
            resolve();
            return;
          }
          console.warn("[LessonAudio] 本地 MP3 播放失败:", src);
          finishAzure();
        });
      }

      var a = new Audio(src);"""

PLAY_URL_NO_AZURE = re.compile(
    r"if \(typeof window\.playLocalMp3Url === \"function\"\) \{\s*"
    r"return window\.playLocalMp3Url\((src)\);\s*\}",
    re.MULTILINE,
)

PLAY_URL_WITH_AZURE = r"""if (typeof window.playLocalMp3Url === "function") {
          return window.playLocalMp3Url(\1).then(function (ok) {
            if (ok) return true;
            if (typeof window.playLessonAzureTtsPlain === "function") {
              return window.playLessonAzureTtsPlain(String(\1 || "")).then(function (aok) {
                return !!aok;
              });
            }
            return false;
          });
        }"""


def patch_file(path: str) -> bool:
    original = open(path, encoding="utf-8").read()
    updated = original

    if 'console.warn("(!!ok);' in updated:
        updated = updated.replace(
            """if (typeof window.playLocalMp3Url === "function") {

        return window.playLocalMp3Url(rel).then(function (ok) {

          if (!ok) console.warn("(!!ok);

        });

      }""",
            """if (typeof window.playLocalMp3Url === "function") {
        return window.playLocalMp3Url(rel).then(function (ok) {
          resolve(!!ok);
        });
      }""",
        )

    updated = CORRUPT_BLOCK.sub(CORRUPT_FIX, updated)
    if "function speak(text, opts)" in updated and "L03AzureTTS" in updated:
        updated = L03_SPEAK_BLOCK.sub(L03_SPEAK_FIX, updated)
    if updated != original:
        open(path, "w", encoding="utf-8").write(updated)
        return True
    return False


def main() -> None:
    changed = 0
    for dirpath, _, files in os.walk(ROOT):
        if "node_modules" in dirpath:
            continue
        for fn in files:
            if not fn.endswith(".html"):
                continue
            path = os.path.join(dirpath, fn)
            if patch_file(path):
                changed += 1
                print("fixed:", os.path.relpath(path, ROOT))
    print("done:", changed)


if __name__ == "__main__":
    main()
