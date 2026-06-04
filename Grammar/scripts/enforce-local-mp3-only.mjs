#!/usr/bin/env node
/**
 * 全库朗读仅走本地 MP3：注入 lesson-speak-local-only.js；关闭课件内 Azure 回退。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCAL_ONLY = '  <script src="../shared/lesson-speak-local-only.js"></script>';
const PLAY_LOCAL = "play-local-mp3.js";

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

function syncAzurePlay() {
  const src = path.join(ROOT, "L01", "assets", "lesson-tts-azure-play.js");
  const patch = `  function isLocalOnlyMode() {
    if (global.__LESSON_TTS_LOCAL_ONLY__ === true) return true;
    if (global.__LESSON_TTS_LOCAL_ONLY__ === false) return false;
    try {
      return global.location && global.location.protocol === "file:";
    } catch (e) {
      return true;
    }
  }

  function playLocalManifestOnly(text) {
    var raw = String(text || "").trim();
    if (!raw) return Promise.resolve(false);
    if (global.LessonTTSBootstrap && typeof global.LessonTTSBootstrap.playLocalIfAvailable === "function") {
      return global.LessonTTSBootstrap.playLocalIfAvailable(raw);
    }
    return Promise.resolve(false);
  }

`;
  let content = fs.readFileSync(src, "utf8");
  if (content.includes("isLocalOnlyMode")) return 0;
  content = content.replace(
    "  function playLessonAzureTtsPlain(text) {\n    var raw = String(text || \"\").trim();\n    if (!raw) return Promise.resolve(false);\n\n    var key = String",
    `  function playLessonAzureTtsPlain(text) {\n    var raw = String(text || "").trim();\n    if (!raw) return Promise.resolve(false);\n\n    if (isLocalOnlyMode()) {\n      return playLocalManifestOnly(raw).then(function (ok) {\n        if (!ok) {\n          console.warn("[LessonTts] 本地 MP3 未找到:", raw.slice(0, 120));\n        }\n        return !!ok;\n      });\n    }\n\n    var key = String`
  );
  const insertAt = content.indexOf("  function warnOnce");
  const final =
    content.slice(0, insertAt) + patch + content.slice(insertAt);
  const targets = [];
  for (const name of fs.readdirSync(ROOT)) {
    const fp = path.join(ROOT, name, "assets", "lesson-tts-azure-play.js");
    if (fs.existsSync(fp)) targets.push(fp);
  }
  for (const fp of targets) {
    fs.writeFileSync(fp, final, "utf8");
  }
  return targets.length;
}

let injected = 0;
let patchedDev = 0;
let patchedTryRemote = 0;

const tryRemoteStub = `      function tryRemote() {
        reject(
          new Error(
            "未找到该句本地 MP3。请确认 manifest 已配置且 assets/tts-mp3 下文件存在。"
          )
        );
      }`;

for (const fp of walkHtml(ROOT)) {
  let c = fs.readFileSync(fp, "utf8");
  let dirty = false;

  const hasTts =
    /play-local-mp3|lesson-tts-bootstrap|handout-tts|data-tts|tts-read-btn|LessonSpeak|playLessonAzure|__LESSON_TTS_MANIFEST/i.test(
      c
    );
  if (!hasTts) continue;

  if (c.includes(PLAY_LOCAL) && !c.includes("lesson-speak-local-only.js")) {
    c = c.replace(
      /(<script src="\.\.\/shared\/play-local-mp3\.js"><\/script>)/,
      `$1\n${LOCAL_ONLY}`
    );
    if (!c.includes("lesson-speak-local-only.js")) {
      const m = c.match(/<head[^>]*>/i);
      if (m) {
        const at = m.index + m[0].length;
        c = c.slice(0, at) + "\n" + LOCAL_ONLY + c.slice(at);
      }
    }
    injected++;
    dirty = true;
  }

  if (c.includes("const LOCAL_DEV_MODE = true")) {
    c = c.replace(/const LOCAL_DEV_MODE = true/g, "const LOCAL_DEV_MODE = false");
    patchedDev++;
    dirty = true;
  }

  if (c.includes("function tryRemote()") && c.includes("tts.speech.microsoft.com")) {
    c = c.replace(/function tryRemote\(\)\s*\{[\s\S]*?\n      \}/, tryRemoteStub);
    patchedTryRemote++;
    dirty = true;
  }

  if (dirty) fs.writeFileSync(fp, c, "utf8");
}

const azureN = syncAzurePlay();
console.log("lesson-tts-azure-play 本地优先:", azureN, "课");
console.log("注入 lesson-speak-local-only:", injected);
console.log("LOCAL_DEV_MODE→false:", patchedDev);
console.log("tryRemote→仅报错:", patchedTryRemote);
