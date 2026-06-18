#!/usr/bin/env node
/**
 * 将 Primary/CVC 目录内 HTML/JS 的音频与图片链接统一为腾讯云 COS 绝对 URL。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CVC = path.join(ROOT, "Primary", "CVC");
const COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/";

function cosUrl(relFromSClass) {
  return (
    COS +
    relFromSClass
      .split("/")
      .map((p) => encodeURIComponent(p))
      .join("/")
  );
}

const MEDIA_BASE = cosUrl("Primary/CVC/");
const WORDS_IMG = MEDIA_BASE + "assets/images/words/";
const SENT_IMG = MEDIA_BASE + "assets/images/sentences/";
const AUDIO_WORDS = MEDIA_BASE + "assets/audio/words/";
const AUDIO_SENT = MEDIA_BASE + "assets/audio/sentences/";
const AUDIO_TOKENS = MEDIA_BASE + "assets/audio/tokens/";
const AUDIO_DICT_AIO = MEDIA_BASE + "assets/audio/dictation-aio/";
const AUDIO_DICT_AIO2 = MEDIA_BASE + "assets/audio/dictation-aio-2/";
const PUP_IMAGES = cosUrl("Primary/Jump Pup/jump-pup-courseware/images/");

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
  const rel = path.relative(CVC, filePath).replace(/\\/g, "/");
  const base = path.basename(filePath);

  // app.js / practice.js：统一 MEDIA_BASE
  if (base === "app.js" || base === "practice.js") {
    if (!s.includes("const MEDIA_BASE =")) {
      s = s.replace(
        /\/\* 全局工具与页面初始化 \*\//,
        `/* 全局工具与页面初始化 */\nconst MEDIA_BASE = "${MEDIA_BASE}";`
      );
      if (!s.includes("const MEDIA_BASE =")) {
        s = `const MEDIA_BASE = "${MEDIA_BASE}";\n` + s;
      }
    } else {
      s = s.replace(/const MEDIA_BASE = ["'][^"']*["'];/, `const MEDIA_BASE = "${MEDIA_BASE}";`);
    }
    s = s.replace(
      /return `assets\/images\/words\//g,
      "return `${MEDIA_BASE}assets/images/words/"
    );
    s = s.replace(
      /return `assets\/audio\/words\//g,
      "return `${MEDIA_BASE}assets/audio/words/"
    );
    if (base === "app.js") {
      s = s.replace(
        /return `assets\/audio\/sentences\//g,
        "return `${MEDIA_BASE}assets/audio/sentences/"
      );
      s = s.replace(
        /return `assets\/audio\/tokens\//g,
        "return `${MEDIA_BASE}assets/audio/tokens/"
      );
      s = s.replace(
        /return `assets\/images\/sentences\//g,
        "return `${MEDIA_BASE}assets/images/sentences/"
      );
    }
  }

  // 内联 audio 路径
  s = s.replace(
    /new Audio\(`assets\/audio\/words\/\$\{word\.toLowerCase\(\)\}\.mp3`\)/g,
    `new Audio(\`${AUDIO_WORDS}\${word.toLowerCase()}.mp3\`)`
  );
  s = s.replace(
    /new Audio\(`assets\/audio\/words\/\$\{word\.toLowerCase\(\)\}\.mp3`\)/g,
    `new Audio(\`${AUDIO_WORDS}\${word.toLowerCase()}.mp3\`)`
  );

  // 抄写作业 IMG_BASE
  s = s.replace(
    /const IMG_BASE = ['"]\.\/assets\/images\/words\/['"]/g,
    `const IMG_BASE = '${WORDS_IMG}'`
  );
  s = s.replace(
    /const IMG_SENT_BASE = ['"]\.\/assets\/images\/sentences\/['"]/g,
    `const IMG_SENT_BASE = '${SENT_IMG}'`
  );

  // 占位图提示路径
  s = s.replace(
    /svgPlaceholderDataUrl\(([^,]+), 'assets\/images\/words\/' \+ ([^)]+)\)/g,
    "svgPlaceholderDataUrl($1, IMG_BASE + $2)"
  );
  s = s.replace(
    /svgPlaceholderDataUrl\(([^,]+), 'assets\/images\/words\/' \+ word \+ '\.png'\)/g,
    "svgPlaceholderDataUrl($1, IMG_BASE + word + '.png')"
  );

  // 句子抄写作业中的 ./assets/images/sentences/ 绝对路径
  s = s.replace(
    /"\.\/assets\/images\/sentences\/([^"]+\.png)"/g,
    `"${SENT_IMG}$1"`
  );

  // 动作词作业：Jump Pup 课件配图 → COS
  if (base === "动作词与句子抄写作业.html") {
    s = s.replace(
      /function pupImagesBase\(\) \{[\s\S]*?\n\}/,
      `const PUP_MEDIA = "${PUP_IMAGES}";`
    );
    s = s.replace(
      /function init\(\) \{\s*PUP_IMAGES_BASE = pupImagesBase\(\);\s*STORY_BASE = new URL\('story\/', PUP_IMAGES_BASE\)\.href;\s*WORDS_PNG_BASE = new URL\('words\/', PUP_IMAGES_BASE\)\.href;/,
      `function init() {
  STORY_BASE = PUP_MEDIA + 'story/';
  WORDS_PNG_BASE = PUP_MEDIA + 'words/';`
    );
    s = s.replace(/\nvar PUP_IMAGES_BASE = '';\n/, "\n");
  }

  // dictation-aio 预览页 audio src
  if (rel === "assets/audio/dictation-aio/index.html") {
    s = s.replace(/src="([^"]+\.mp3)"/g, `src="${AUDIO_DICT_AIO}$1"`);
    s = s.replace(/href="([^"]+\.mp3)"/g, `href="${AUDIO_DICT_AIO}$1"`);
  }
  if (rel === "assets/audio/dictation-aio-2/index.html") {
    s = s.replace(/src="([^"]+\.mp3)"/g, `src="${AUDIO_DICT_AIO2}$1"`);
    s = s.replace(/href="([^"]+\.mp3)"/g, `href="${AUDIO_DICT_AIO2}$1"`);
  }

  // 残留相对 assets 路径（img/audio）
  s = s.replace(/src="\.\/assets\/images\//g, `src="${MEDIA_BASE}assets/images/`);
  s = s.replace(/src="assets\/images\//g, `src="${MEDIA_BASE}assets/images/`);
  s = s.replace(/src="assets\/audio\//g, `src="${MEDIA_BASE}assets/audio/`);

  return s;
}

if (!fs.existsSync(CVC)) {
  console.error("找不到 Primary/CVC 目录");
  process.exit(1);
}

let changed = 0;
for (const file of walk(CVC)) {
  const before = fs.readFileSync(file, "utf8");
  const after = patchContent(file, before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log("patched", path.relative(ROOT, file));
  }
}
console.log(`\nDone: ${changed} files updated.`);
