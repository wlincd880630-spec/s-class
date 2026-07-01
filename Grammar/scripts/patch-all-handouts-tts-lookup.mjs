#!/usr/bin/env node
/**
 * 批量修复所有 Grammar 讲义 HTML：
 * - 例句朗读：统一 play-local-mp3 + lesson-local-audio + handout-tts.js
 * - 点击查词：grammar-handout-lookup + Azure 配置
 * - 修正 manifest COS 路径 assets/assets → assets
 *
 * 用法：node scripts/patch-all-handouts-tts-lookup.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOT_SRC = path.join(ROOT, "L10", "assets", "lesson-tts-bootstrap.js");

function walkHandouts(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkHandouts(p, acc);
    else if (/handout/i.test(name) && name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function relToShared(fromDir) {
  let r = path.relative(fromDir, path.join(ROOT, "shared")).replace(/\\/g, "/");
  if (!r.endsWith("/")) r += "/";
  return r;
}

function relPrefix(fromDir) {
  return relToShared(fromDir);
}

function has(fp, fragment) {
  return fp.includes(fragment);
}

function insertBeforeCloseHead(html, snippet) {
  if (html.includes(snippet.trim())) return html;
  return html.replace(/<\/head>/i, snippet + "\n</head>");
}

function insertBeforeCloseBody(html, snippet) {
  const lines = snippet.trim().split("\n");
  if (lines.every((l) => html.includes(l.trim()))) return html;
  return html.replace(/<\/body>/i, snippet + "\n</body>");
}

function ensureHeadBlock(html, fp) {
  const dir = path.dirname(fp);
  const sp = relPrefix(dir);
  const shared = sp; // e.g. ../shared/

  if (!html.includes("play-local-mp3.js")) {
    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1>\n  <script src="${shared}play-local-mp3.js"></script>\n  <script src="${shared}lesson-local-audio.js" defer></script>\n  <script src="${shared}lesson-speak-local-only.js"></script>`
    );
  } else if (!html.includes("lesson-speak-local-only.js")) {
    html = html.replace(
      /(<script src="[^"]*lesson-local-audio\.js"[^>]*><\/script>)/i,
      `$1\n  <script src="${shared}lesson-speak-local-only.js"></script>`
    );
  }

  if (!html.includes("lesson-tts-azure-config.js")) {
    html = insertBeforeCloseHead(
      html,
      `  <script src="${shared}lesson-tts-azure-config.js"></script>`
    );
  }

  if (!html.includes("grammar-handout-tts.css")) {
    html = insertBeforeCloseHead(html, `  <link rel="stylesheet" href="${shared}grammar-handout-tts.css" />`);
  }

  if (!html.includes("grammar-handout-lookup.css")) {
    html = insertBeforeCloseHead(html, `  <link rel="stylesheet" href="${shared}grammar-handout-lookup.css" />`);
  }

  html = html.replace(/<body(\s[^>]*)?>/i, (m, attrs = "") => {
    const need = ["grammar-handout-page"];
    if (/class="/.test(m)) {
      return m.replace(/class="([^"]*)"/, (_, c) => {
        const set = new Set(c.split(/\s+/).filter(Boolean));
        need.forEach((x) => set.add(x));
        return `class="${[...set].join(" ")}"`;
      });
    }
    return `<body${attrs} class="${need.join(" ")}">`;
  });

  return html;
}

function lessonDirFromHtml(fp) {
  return path.dirname(fp);
}

function assetsRel(fp, rel) {
  const lessonDir = lessonDirFromHtml(fp);
  const assets = path.join(lessonDir, "assets");
  if (fs.existsSync(path.join(assets, path.basename(rel)))) return `assets/${path.basename(rel)}`;
  return rel;
}

function ensureTtsTail(html, fp) {
  const dir = lessonDirFromHtml(fp);
  const sp = relPrefix(dir);

  html = html.replace(/<script[^>]*src="[^"]*l0[189]-handout-tts\.js"[^>]*>\s*<\/script>\s*/gi, "");
  html = html.replace(/<script[^>]*src="[^"]*l01-handout-tts\.js"[^>]*>\s*<\/script>\s*/gi, "");

  const boot = assetsRel(fp, "assets/lesson-tts-bootstrap.js");
  const manifest = assetsRel(fp, "assets/handout-tts-manifest.js");
  const handoutTts = `${sp}handout-tts.js`;
  const lookup = `${sp}grammar-handout-lookup.js`;

  if (!html.includes("lesson-tts-bootstrap.js")) {
    const assetsPath = path.join(dir, "assets");
    if (!fs.existsSync(assetsPath)) fs.mkdirSync(assetsPath, { recursive: true });
    const bootDest = path.join(assetsPath, "lesson-tts-bootstrap.js");
    if (!fs.existsSync(bootDest) && fs.existsSync(BOOT_SRC)) {
      fs.copyFileSync(BOOT_SRC, bootDest);
    }
  }

  let tail = "";
  if (!html.includes("lesson-tts-bootstrap.js")) {
    tail += `  <script src="${boot}"></script>\n`;
  }
  if (!html.includes("handout-tts-manifest.js") && !html.includes("__LESSON_TTS_MANIFEST")) {
    if (fs.existsSync(path.join(dir, "assets", "handout-tts-manifest.js"))) {
      tail += `  <script src="${manifest}"></script>\n`;
    }
  }
  if (!html.includes("handout-tts.js")) {
    tail += `  <script src="${handoutTts}" defer></script>\n`;
  }
  if (!html.includes("grammar-handout-lookup.js")) {
    tail += `  <script src="${lookup}" defer></script>\n`;
  }

  if (tail) {
    html = insertBeforeCloseBody(html, tail);
  }

  return html;
}

function fixCosPathsInText(text) {
  return text.replace(/\/assets\/assets\/tts-mp3\//g, "/assets/tts-mp3/");
}

function fixInlineManifest(html) {
  if (!html.includes("__LESSON_TTS_MANIFEST")) return html;
  return fixCosPathsInText(html);
}

function fixManifestFiles() {
  let n = 0;
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      if (name === "node_modules" || name === ".git") continue;
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (/manifest\.js$/i.test(name) || /handout-tts-manifest\.js$/i.test(name) || /embed\.js$/i.test(name)) {
        const raw = fs.readFileSync(p, "utf8");
        const fixed = fixCosPathsInText(raw);
        if (fixed !== raw) {
          fs.writeFileSync(p, fixed, "utf8");
          n++;
          console.log("manifest", path.relative(ROOT, p));
        }
      }
    }
  }
  walk(ROOT);
  return n;
}

let patched = 0;
for (const fp of walkHandouts(ROOT)) {
  let html = fs.readFileSync(fp, "utf8");
  const before = html;
  html = ensureHeadBlock(html, fp);
  html = ensureTtsTail(html, fp);
  html = fixInlineManifest(html);
  if (html !== before) {
    fs.writeFileSync(fp, html, "utf8");
    patched++;
    console.log("html", path.relative(ROOT, fp));
  }
}

const man = fixManifestFiles();
console.log("\nPatched HTML:", patched, "| manifest files:", man);

const builds = [
  "build-l00-classroom-handout.mjs",
  "build-l00-svo-classroom-handout.mjs",
  "build-l01-classroom-handout.mjs",
  "build-l02-classroom-handout.mjs",
  "build-l03-classroom-handout.mjs",
  "build-l05-classroom-handout.mjs",
  "build-l06-classroom-handout.mjs",
  "build-l07-classroom-handout.mjs",
  "build-l08-classroom-handout.mjs",
  "build-l09-classroom-handout.mjs",
  "build-l10-classroom-handout.mjs",
  "build-l11-classroom-handout.mjs",
  "build-l12-classroom-handout.mjs",
  "build-l13-classroom-handout.mjs",
  "build-l13rc-classroom-handout.mjs",
  "build-l14-classroom-handout.mjs",
];

console.log("\n重建课堂同步讲义…");
for (const b of builds) {
  const p = path.join(ROOT, "scripts", b);
  if (!fs.existsSync(p)) continue;
  const r = spawnSync(process.execPath, [p], { cwd: ROOT, stdio: "inherit" });
  if (r.status !== 0) console.warn("build failed", b);
}

console.log("\n再次补丁课堂讲义…");
let patched2 = 0;
for (const fp of walkHandouts(ROOT)) {
  if (!/classroom-full|handout-classroom/i.test(fp)) continue;
  let html = fs.readFileSync(fp, "utf8");
  const before = html;
  html = ensureHeadBlock(html, fp);
  html = ensureTtsTail(html, fp);
  html = fixInlineManifest(html);
  if (html !== before) {
    fs.writeFileSync(fp, html, "utf8");
    patched2++;
    console.log("classroom", path.relative(ROOT, fp));
  }
}

console.log("Classroom re-patched:", patched2);
console.log("done");
