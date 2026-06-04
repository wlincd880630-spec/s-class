#!/usr/bin/env node
/** 检查 file:// 本地运行必备项 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

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

const htmls = walkHtml(ROOT);
let withAudio = 0;
let missingPlayLocal = 0;
let riskyAudio = 0;

for (const fp of htmls) {
  const c = fs.readFileSync(fp, "utf8");
  const hasAudio =
    /new Audio\(|playLocalIfAvailable|lesson-tts-bootstrap|lesson-speak-local|tts\.speech\.microsoft|__LESSON_TTS_MANIFEST|playLessonL07LocalTts/i.test(
      c
    );
  if (!hasAudio) continue;
  withAudio++;
  if (!c.includes("play-local-mp3.js")) missingPlayLocal++;

  const lines = c.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!/new Audio\((url|src|rel)\)/.test(line)) continue;
    const prev = lines.slice(Math.max(0, i - 12), i).join("\n");
    if (prev.includes("playLocalMp3Url")) continue;
    if (/createObjectURL|playBlob|ttsMp3Cache/.test(prev)) continue;
    riskyAudio++;
    break;
  }
}

console.log("含语音的 HTML:", withAudio);
console.log("未引 play-local-mp3.js:", missingPlayLocal);
console.log("可能仍直读盘的 new Audio(路径):", riskyAudio, "页（需人工抽查）");
