#!/usr/bin/env node
/**
 * 全库 HTML：发音仅走本地 MP3（manifest + 相对路径 Audio）。
 * - 同步 shared/lesson-tts-bootstrap.js、lesson-tts-azure-play.js 到各课 assets
 * - 注入 play-local-mp3 / lesson-speak-local-only / lesson-local-audio
 * - 内联 bootstrap 改为外链 assets/lesson-tts-bootstrap.js
 * - 关闭 LOCAL_DEV_MODE Azure 回退、stub tryRemote
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHARED = path.join(ROOT, "shared");
const BOOTSTRAP_SRC = path.join(SHARED, "lesson-tts-bootstrap.js");
const AZURE_PLAY_SRC = path.join(SHARED, "lesson-tts-azure-play.js");

const STACK = [
  '  <script src="../shared/play-local-mp3.js"></script>',
  '  <script src="../shared/lesson-speak-local-only.js"></script>',
  '  <script src="../shared/lesson-local-audio.js" defer></script>',
];

const TRY_REMOTE_STUB = `      function tryRemote() {
        reject(
          new Error(
            "未找到该句本地 MP3。请确认 manifest 与 assets/tts-mp3 文件齐全。"
          )
        );
      }`;

const INLINE_BOOT_RE =
  /<script>\s*\/\* inlined: assets\/lesson-tts-bootstrap\.js \*\/[\s\S]*?window\.LessonTTSBootstrap\s*=\s*\{[\s\S]*?\}\);\s*\n<\/script>/g;

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

function hasTts(html) {
  return /__LESSON_TTS_MANIFEST|data-tts|tts-read-btn|tts-chip|azure-tts-btn|playLessonAzure|LessonTTSBootstrap|handout-tts|🔊|speakEn\(|function speak\(/i.test(
    html
  );
}

function syncLessonAssets() {
  let n = 0;
  for (const name of fs.readdirSync(ROOT)) {
    const lessonDir = path.join(ROOT, name);
    if (!fs.statSync(lessonDir).isDirectory()) continue;
    const assets = path.join(lessonDir, "assets");
    if (!fs.existsSync(assets)) continue;
    const bootDst = path.join(assets, "lesson-tts-bootstrap.js");
    const azureDst = path.join(assets, "lesson-tts-azure-play.js");
    const isLesson = /^L\d{2}/.test(name) || name.startsWith("L00-");
    if (!isLesson) continue;
    fs.copyFileSync(BOOTSTRAP_SRC, bootDst);
    if (fs.existsSync(azureDst)) {
      fs.copyFileSync(AZURE_PLAY_SRC, azureDst);
    }
    n++;
  }
  return n;
}

function injectStack(html) {
  if (html.includes("play-local-mp3.js") && html.includes("lesson-local-audio.js")) {
    return html;
  }
  const block = STACK.join("\n") + "\n";
  if (html.includes("<head")) {
    const m = html.match(/<head[^>]*>/i);
    if (m) {
      const at = m.index + m[0].length;
      return html.slice(0, at) + "\n" + block + html.slice(at);
    }
  }
  const body = html.indexOf("<body");
  if (body !== -1) {
    const gt = html.indexOf(">", body) + 1;
    return html.slice(0, gt) + "\n" + block + html.slice(gt);
  }
  return block + html;
}

function ensureBootstrapScript(html) {
  if (html.includes('src="assets/lesson-tts-bootstrap.js"')) {
    return html.replace(INLINE_BOOT_RE, "");
  }
  if (INLINE_BOOT_RE.test(html)) {
    html = html.replace(
      INLINE_BOOT_RE,
      '  <script src="assets/lesson-tts-bootstrap.js"></script>'
    );
  }
  return html;
}

function patchSpeakHelpers(html) {
  const wrap = `function __lessonSpeakLocalFirst(text) {
        var t = String(text || "").trim();
        if (!t) return Promise.resolve(false);
        var Boot = window.LessonTTSBootstrap;
        if (Boot && typeof Boot.playLocalIfAvailable === "function") {
          return Boot.playLocalIfAvailable(t).then(function (ok) {
            if (ok) return true;
            if (typeof window.playLessonAzureTtsPlain === "function") {
              return window.playLessonAzureTtsPlain(t);
            }
            return false;
          });
        }
        if (typeof window.playLessonAzureTtsPlain === "function") {
          return window.playLessonAzureTtsPlain(t);
        }
        return Promise.resolve(false);
      }`;

  if (html.includes("__lessonSpeakLocalFirst")) return html;

  if (
    /function speakEn\(/.test(html) &&
    /playLessonAzureTtsPlain/.test(html) &&
    !/Boot\.playLocalIfAvailable/.test(html)
  ) {
    html = html.replace(
      /function speakEn\(text\)\s*\{[\s\S]*?\n      \}/,
      `function speakEn(text) {
        return __lessonSpeakLocalFirst(text);
      }`
    );
    const firstScript = html.indexOf("<script>");
    if (firstScript !== -1 && !html.includes("__lessonSpeakLocalFirst")) {
      html =
        html.slice(0, firstScript) +
        "<script>\n" +
        wrap +
        "\n</script>\n" +
        html.slice(firstScript);
    }
  }

  if (
    /function speak\(text\)\s*\{[\s\S]*?playLessonAzureTtsPlain/.test(html) &&
    !/Boot\.playLocalIfAvailable/.test(html.match(/function speak\(text\)[\s\S]{0,400}/)?.[0] || "")
  ) {
    html = html.replace(
      /function speak\(text\)\s*\{[\s\S]*?return window\.playLessonAzureTtsPlain\(text\);[\s\S]*?\}/,
      `function speak(text) {
        return __lessonSpeakLocalFirst(text);
      }`
    );
  }

  return html;
}

let htmlPatched = 0;
let inlineReplaced = 0;
let devModeOff = 0;
let tryRemotePatched = 0;

const assetsSynced = syncLessonAssets();

for (const fp of walkHtml(ROOT)) {
  let c = fs.readFileSync(fp, "utf8");
  if (!hasTts(c)) continue;

  const before = c;
  if (INLINE_BOOT_RE.test(c)) {
    c = ensureBootstrapScript(c);
    inlineReplaced++;
  }

  c = injectStack(c);

  if (c.includes("const LOCAL_DEV_MODE = true")) {
    c = c.replace(/const LOCAL_DEV_MODE = true/g, "const LOCAL_DEV_MODE = false");
    devModeOff++;
  }

  if (c.includes("function tryRemote()") && c.includes("tts.speech.microsoft.com")) {
    c = c.replace(/function tryRemote\(\)\s*\{[\s\S]*?\n      \}/, TRY_REMOTE_STUB);
    tryRemotePatched++;
  }

  c = patchSpeakHelpers(c);

  if (c !== before) {
    fs.writeFileSync(fp, c, "utf8");
    htmlPatched++;
  }
}

console.log("同步 lesson-tts-*.js 到各课 assets:", assetsSynced);
console.log("修补 HTML 文件数:", htmlPatched);
console.log("内联 bootstrap→外链:", inlineReplaced);
console.log("LOCAL_DEV_MODE→false:", devModeOff);
console.log("tryRemote 仅本地报错:", tryRemotePatched);
