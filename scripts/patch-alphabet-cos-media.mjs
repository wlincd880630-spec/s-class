#!/usr/bin/env node
/**
 * 将 Primary/Alphabet 内 HTML/JS 的图片、音频、视频链接统一为腾讯云 COS 绝对 URL。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ALPHABET = path.join(ROOT, "Primary", "Alphabet");
const COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/";
const BASE = COS + "Primary/Alphabet/";
const ASSETS = BASE + "assets/";
const AUDIO = ASSETS + "audio/";
const COLORING = ASSETS + "coloring/";

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(html|js)$/i.test(e.name)) out.push(p);
  }
  return out;
}

function patchContent(filePath, content) {
  let s = content;
  const rel = path.relative(ALPHABET, filePath).replace(/\\/g, "/");

  // 修正涂色页 COS URL 中的 ../
  s = s.replace(
    /Primary\/Alphabet\/coloring-cards\/\.\.\/assets\/coloring\//g,
    "Primary/Alphabet/assets/coloring/"
  );

  // lesson02-coloring-data.js：涂色图
  if (rel === "lesson02-coloring-data.js") {
    s = s.replace(/img: "assets\/coloring\//g, `img: "${COLORING}`);
  }

  // coloring-shared.js：动态构建涂色图 URL
  if (rel === "coloring-shared.js" || rel === "coloring-cards/coloring-shared.js") {
    if (!s.includes("ALPHABET_COS")) {
      s = s.replace(
        `    function imgSrc(word, prefix) {
        const p = prefix || '';
        return p + word.img.replace(/^assets\\//, '../assets/');
    }`,
        `    const ALPHABET_COS = '${BASE}';
    function imgSrc(word, prefix) {
        if (/^https?:\\/\\//i.test(word.img)) return word.img;
        const p = prefix || '';
        if (p) return p + word.img.replace(/^assets\\//, '../assets/');
        return ALPHABET_COS + word.img;
    }`
      );
    }
  }

  // Lesson 02 内嵌音频映射
  if (rel === "Lesson 02.html") {
    s = s.replace(/"\.\/assets\/audio\//g, `"${AUDIO}`);
    s = s.replace(
      /fetch\(new URL\('audio_mapping\.json', window\.location\.href\)/g,
      `fetch("${BASE}audio_mapping.json"`
    );
  }

  // 互动游戏页字母发音
  if (rel === "Lesson 02 - 练习 - 互动游戏.html") {
    s = s.replace(/\`\.\/assets\/audio\/\$\{/g, `\`${AUDIO}\${`);
    s = s.replace(/new Audio\(`\.\/assets\/audio\//g, `new Audio(\`${AUDIO}`);
  }

  // 字母书写展示
  if (rel === "Lesson 02 - 作业 - 字母书写展示.html") {
    s = s.replace(
      /_audioEl\.src = `assets\/audio\/\$\{letter\}\.mp3`;/g,
      `_audioEl.src = \`${AUDIO}\${letter}.mp3\`;`
    );
  }

  // 残留相对路径（img / video / audio）
  s = s.replace(/src="\.\/assets\//g, `src="${ASSETS}`);
  s = s.replace(/src="assets\//g, `src="${ASSETS}`);
  s = s.replace(
    /<source src="(?!https?:\/\/)([^"]+)"/g,
    (_, p) => `<source src="${BASE}${p.replace(/^\.\//, "")}"`
  );

  // video.mp4 确保指向 COS
  s = s.replace(
    /src="(?!https?:\/\/)[^"]*video\.mp4"/g,
    `src="${BASE}video.mp4"`
  );

  return s;
}

let changed = 0;
for (const file of walk(ALPHABET)) {
  const before = fs.readFileSync(file, "utf8");
  const after = patchContent(file, before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log("patched", path.relative(ROOT, file));
  }
}
console.log(`\nDone: ${changed} files updated.`);
