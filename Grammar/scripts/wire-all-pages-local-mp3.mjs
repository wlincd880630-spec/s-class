#!/usr/bin/env node
/**
 * 全库 HTML：注入 lesson-local-audio.js；讲义 chip 尽量带 data-mp3。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const AUDIO_TAG = '  <script src="../shared/lesson-local-audio.js" defer></script>';
const PLAY_TAG = "play-local-mp3.js";

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkHtml(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function hasTts(c) {
  return /data-mp3|data-tts|tts-read-btn|tts-chip|__LESSON_TTS_MANIFEST|play-local-mp3|handout-tts|LessonLocalAudio/i.test(
    c
  );
}

let injected = 0;
for (const fp of walkHtml(ROOT)) {
  let c = fs.readFileSync(fp, "utf8");
  if (!hasTts(c)) continue;
  if (!c.includes("lesson-local-audio.js")) {
    if (c.includes(PLAY_TAG)) {
      c = c.replace(
        /(<script src="\.\.\/shared\/play-local-mp3\.js"><\/script>)/,
        `$1\n${AUDIO_TAG}`
      );
    }
    if (!c.includes("lesson-local-audio.js")) {
      const bodyEnd = c.lastIndexOf("</body>");
      if (bodyEnd !== -1) {
        c = c.slice(0, bodyEnd) + AUDIO_TAG + "\n" + c.slice(bodyEnd);
      } else {
        const head = c.match(/<head[^>]*>/i);
        if (head) {
          const at = head.index + head[0].length;
          c = c.slice(0, at) + "\n" + AUDIO_TAG + c.slice(at);
        }
      }
    }
    fs.writeFileSync(fp, c, "utf8");
    injected++;
  }
}

console.log("注入 lesson-local-audio.js:", injected, "个 HTML");
