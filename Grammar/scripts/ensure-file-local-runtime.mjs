#!/usr/bin/env node
/**
 * 全库适配 file://（双击本地打开、有网络）：
 * 1) 同步 lesson-tts-bootstrap.js 到各课 assets
 * 2) 为 HTML 注入 shared/play-local-mp3.js（尽早加载）
 * 3) 修补内联 playLocalIfAvailable / 常见 new Audio(rel|src|url) 本地路径播放
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOTSTRAP_SRC = path.join(ROOT, "L03", "assets", "lesson-tts-bootstrap.js");
const PLAY_LOCAL = "shared/play-local-mp3.js";
const PLAY_TAG = '<script src="../shared/play-local-mp3.js"></script>';

const PLAY_LOCAL_FN = `  function playLocalIfAvailable(text) {
    var k = norm(text);
    if (!k) return Promise.resolve(false);
    var m = map();
    var rel = m[k] || m[text] || m[String(text || "").trim()];
    if (!rel) return Promise.resolve(false);
    if (typeof window.playLocalMp3Url === "function") {
      return window.playLocalMp3Url(rel);
    }
    var absUrl = rel;
    try {
      absUrl = new URL(rel, window.location.href).href;
    } catch (e0) {}
    return new Promise(function (resolve) {
      var a = new Audio(absUrl);
      var done = false;
      function fin(ok) {
        if (done) return;
        done = true;
        resolve(!!ok);
      }
      a.onended = function () {
        fin(true);
      };
      a.onerror = function () {
        fin(false);
      };
      var p = a.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          fin(false);
        });
      }
    });
  }`;

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

function syncBootstrap() {
  const src = fs.readFileSync(BOOTSTRAP_SRC, "utf8");
  let n = 0;
  for (const name of fs.readdirSync(ROOT)) {
    const lessonDir = path.join(ROOT, name);
    if (!fs.statSync(lessonDir).isDirectory()) continue;
    const assets = path.join(lessonDir, "assets");
    const target = path.join(assets, "lesson-tts-bootstrap.js");
    if (!fs.existsSync(target)) continue;
    if (fs.readFileSync(target, "utf8") !== src) {
      fs.writeFileSync(target, src, "utf8");
      n++;
    }
  }
  return n;
}

function injectPlayLocal(html) {
  if (html.includes("play-local-mp3.js")) return false;
  const hasAudio =
    /new Audio\(|playLocalIfAvailable|lesson-tts-bootstrap|lesson-speak-local|playLessonL07LocalTts|tts\.speech\.microsoft|__LESSON_TTS_MANIFEST|speakBtn|🔊|data-speak|playAudioFile|playLocalMp3Url/i.test(
      html
    );
  if (!hasAudio) return false;

  const marker = "/* inlined: assets/lesson-tts-bootstrap.js */";
  if (html.includes(marker)) {
    const idx = html.indexOf(marker);
    const before = html.slice(0, idx);
    const openScript = before.lastIndexOf("<script");
    if (openScript !== -1 && before.indexOf("</script>", openScript) === -1) {
      return false;
    }
    if (!html.includes(PLAY_TAG)) {
      const m = html.match(/<head[^>]*>/i);
      if (m) {
        const at = m.index + m[0].length;
        return html.slice(0, at) + "\n" + PLAY_TAG + html.slice(at);
      }
    }
    return false;
  }

  const m = html.match(/<head[^>]*>/i);
  if (!m) return false;
  const insertAt = m.index + m[0].length;
  html = html.slice(0, insertAt) + "\n  " + PLAY_TAG + html.slice(insertAt);
  return html;
}

function patchPlayLocalIfAvailable(html) {
  const start = html.indexOf("function playLocalIfAvailable(text)");
  if (start === -1) return html;
  const bootstrapAssign = html.indexOf("window.LessonTTSBootstrap", start);
  if (bootstrapAssign === -1) return html;
  const slice = html.slice(start, bootstrapAssign);
  if (slice.includes("playLocalMp3Url")) return html;
  const endFn = slice.lastIndexOf("\n  }");
  if (endFn === -1) return html;
  const before = html.slice(0, start);
  const after = html.slice(start + endFn + "\n  }".length);
  return before + PLAY_LOCAL_FN + after;
}

/** 本地相对路径 MP3：在 new Audio(path) 前优先 playLocalMp3Url */
function patchDirectAudioVar(html) {
  let changed = false;

  function wrapBlock(sp, decl, varName, pathName, bodyLines) {
    return `${sp}if (typeof window.playLocalMp3Url === "function") {
${sp}  return window.playLocalMp3Url(${pathName}).then(function (ok) {
${sp}    if (!ok) console.warn("[LessonAudio] 本地 MP3 播放失败:", ${pathName});
${bodyLines}
${sp}  });
${sp}}
${sp}${decl} = new Audio(${pathName});`;
  }

  const patterns = [
    {
      from: /(\s+)var a = new Audio\((rel|src|url)\);\s*\n(\s+)a\.playbackRate = ([^;]+);/g,
      to: (m, sp, varName, sp2, rateExpr) =>
        wrapBlock(
          sp,
          "var a",
          "a",
          varName,
          `${sp}    resolve();\n${sp}    return;`
        ) + `\n${sp2}a.playbackRate = ${rateExpr};`,
    },
    {
      from: /(\s+)var a = new Audio\((rel|src|url)\);\s*\n(\s+)a\.onended/g,
      to: (m, sp, varName, sp2) =>
        wrapBlock(sp, "var a", "a", varName, `${sp}    resolve(!!ok);`) + `\n${sp2}a.onended`,
    },
    {
      from: /(\s+)const a = new Audio\((url)\);\s*\n(\s+)a\.addEventListener\("ended"/g,
      to: (m, sp, varName, sp2) =>
        wrapBlock(sp, "const a", "a", varName, `${sp}    finish(!!ok);\n${sp}  });\n${sp}  return;\n${sp}}`) +
        `\n${sp2}a.addEventListener("ended"`,
    },
    {
      from: /(\s+)const au = new Audio\((url)\);\s*\n(\s+)au\.onended/g,
      to: (m, sp, varName, sp2) =>
        wrapBlock(sp, "const au", "au", varName, `${sp}    resolve(!!ok);`) + `\n${sp2}au.onended`,
    },
    {
      from: /(\s+)var a = new Audio\((src)\);\s*\n(\s+)var p = a\.play/g,
      to: (m, sp, varName, sp2) =>
        wrapBlock(sp, "var a", "a", varName, `${sp}    resolve(!!ok);`) + `\n${sp2}var p = a.play`,
    },
    {
      from: /(\s+)corpusAudio = new Audio\((src)\);/g,
      to: (m, sp, varName) => `${sp}if (typeof window.playLocalMp3Url === "function") {
${sp}  window.playLocalMp3Url(${varName}).then(function (ok) {
${sp}    if (!ok) corpusAudio = null;
${sp}  });
${sp}  return;
${sp}}
${sp}corpusAudio = new Audio(${varName});`,
    },
    {
      from: /(\s+)fallAudio = new Audio\((src)\);/g,
      to: (m, sp, varName) => `${sp}if (typeof window.playLocalMp3Url === "function") {
${sp}  window.playLocalMp3Url(${varName}).then(function (ok) {
${sp}    if (!ok) fallAudio = null;
${sp}  });
${sp}  return;
${sp}}
${sp}fallAudio = new Audio(${varName});`,
    },
    {
      from: /(\s+)var a = new Audio\((url)\);\s*\n(\s+)a\.addEventListener\(\s*\n?\s*"ended"/g,
      to: (m, sp, varName, sp2) =>
        wrapBlock(sp, "var a", "a", varName, `${sp}    resolve(!!ok);`) + `\n${sp2}a.addEventListener(\n        "ended"`,
    },
    {
      from: /(\s+)var a = new Audio\((rel)\);\s*\n(\s+)var done = false;\s*\n(\s+)function fin\(ok\)/g,
      to: (m, sp, varName, sp2, sp3) =>
        wrapBlock(sp, "var a", "a", varName, `${sp3}    fin(!!ok);`) +
        `\n${sp2}var done = false;\n${sp3}function fin(ok)`,
    },
    {
      from: /(\s+)var a = new Audio\((url)\);\s*\n(\s+)var settled = false;/g,
      to: (m, sp, varName, sp2) =>
        `${sp}if (typeof window.playLocalMp3Url === "function") {
${sp}  return window.playLocalMp3Url(${varName}).then(function (ok) {
${sp}    resolve(!!ok);
${sp}  });
${sp}}
${sp}var a = new Audio(${varName});
${sp2}var settled = false;`,
    },
  ];
  for (const { from, to } of patterns) {
    const next = html.replace(from, to);
    if (next !== html) {
      html = next;
      changed = true;
    }
  }
  return changed ? html : null;
}

function ensureL07ManifestEmbed(html, filePath) {
  if (!filePath.includes(`${path.sep}L07${path.sep}`)) return html;
  if (!html.includes("lesson-tts-l07-local.js")) return html;
  if (html.includes("manifest.embed.js")) return html;
  return html.replace(
    /<script src="assets\/lesson-tts-l07-local\.js"><\/script>/,
    '<script src="assets/tts-mp3/l07-google-mp3/manifest.embed.js"></script>\n  <script src="assets/lesson-tts-l07-local.js"></script>'
  );
}

const synced = syncBootstrap();
let injected = 0;
let patchedFn = 0;
let patchedAudio = 0;
let l07embed = 0;

for (const fp of walkHtml(ROOT)) {
  let html = fs.readFileSync(fp, "utf8");
  let dirty = false;

  const inj = injectPlayLocal(html);
  if (inj && typeof inj === "string") {
    html = inj;
    injected++;
    dirty = true;
  }

  const fn = patchPlayLocalIfAvailable(html);
  if (fn !== html) {
    html = fn;
    patchedFn++;
    dirty = true;
  }

  const emb = ensureL07ManifestEmbed(html, fp);
  if (emb !== html) {
    html = emb;
    l07embed++;
    dirty = true;
  }

  const aud = patchDirectAudioVar(html);
  if (aud) {
    html = aud;
    patchedAudio++;
    dirty = true;
  }

  if (dirty) fs.writeFileSync(fp, html, "utf8");
}

console.log("bootstrap 同步:", synced, "课");
console.log("注入 play-local-mp3:", injected, "页");
console.log("修补 playLocalIfAvailable:", patchedFn, "页");
console.log("修补 new Audio 本地路径:", patchedAudio, "页");
console.log("L07 补 manifest.embed:", l07embed, "页");
