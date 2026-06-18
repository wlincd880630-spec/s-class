#!/usr/bin/env node
/**
 * 将 Primary/Magic-E 目录内 HTML/JS 的音频与图片链接统一为腾讯云 COS 绝对 URL。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ME = path.join(ROOT, "Primary", "Magic-E");
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

const MEDIA_BASE = cosUrl("Primary/Magic-E/");
const IMG_ME = MEDIA_BASE + "assets/images/magic-e/";
const IMG_WORDS = IMG_ME + "words/";
const IMG_SENT = IMG_ME + "sentences/";
const AUDIO_ME = MEDIA_BASE + "assets/audio/magic-e/";
const AUDIO_WORDS = AUDIO_ME + "words/";
const AUDIO_SENT = AUDIO_ME + "sentences/";
const AUDIO_TOKENS = AUDIO_ME + "tokens/";

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
  const rel = path.relative(ME, filePath).replace(/\\/g, "/");
  const base = path.basename(filePath);

  if (base === "magic-e-app.js") {
    if (!s.includes("const MEDIA_BASE =")) {
      s = s.replace(
        /\/\* Magic E/,
        `const MEDIA_BASE = "${MEDIA_BASE}";\n/* Magic E`
      );
    } else {
      s = s.replace(/const MEDIA_BASE = ["'][^"']*["'];/, `const MEDIA_BASE = "${MEDIA_BASE}";`);
    }
    s = s.replace(/return `assets\/images\/magic-e\//g, "return `${MEDIA_BASE}assets/images/magic-e/");
    s = s.replace(/return `assets\/audio\/magic-e\//g, "return `${MEDIA_BASE}assets/audio/magic-e/");
  }

  if (base === "practice-me.js") {
    if (!s.includes("const MEDIA_BASE =")) {
      s = `const MEDIA_BASE = "${MEDIA_BASE}";\n` + s;
    } else {
      s = s.replace(/const MEDIA_BASE = ["'][^"']*["'];/, `const MEDIA_BASE = "${MEDIA_BASE}";`);
    }
    s = s.replace(/return `assets\/images\/magic-e\//g, "return `${MEDIA_BASE}assets/images/magic-e/");
    s = s.replace(/return `assets\/audio\/magic-e\//g, "return `${MEDIA_BASE}assets/audio/magic-e/");
  }

  s = s.replace(
    /const IMG_SENT_BASE = ['"]\.\/assets\/images\/magic-e\/sentences\/['"]/g,
    `const IMG_SENT_BASE = '${IMG_SENT}'`
  );

  if (base === "Magic-E抄写作业.html") {
    s = s.replace(
      /const urls = \[\s*\n\s*`\.\/assets\/images\/magic-e\/words\/\$\{vowel\}-\$\{idx\}\.png`,\s*\n\s*`\.\/assets\/images\/magic-e\/words\/\$\{vowel\}-\$\{idx\}\.svg`,\s*\n\s*`\.\/assets\/images\/magic-e\/\$\{slug\}\.png`,\s*\n\s*\];/,
      `const urls = [
    \`${IMG_WORDS}\${vowel}-\${idx}.png\`,
    \`${IMG_WORDS}\${vowel}-\${idx}.svg\`,
    \`${IMG_ME}\${slug}.png\`,
  ];`
    );
  }

  if (rel === "assets/audio/magic-e/index.html") {
    s = s.replace(/src="(words\/[^"]+\.mp3)"/g, `src="${AUDIO_ME}$1"`);
    s = s.replace(/href="(words\/[^"]+\.mp3)"/g, `href="${AUDIO_ME}$1"`);
    s = s.replace(/src="(sentences\/[^"]+\.mp3)"/g, `src="${AUDIO_ME}$1"`);
    s = s.replace(/href="(sentences\/[^"]+\.mp3)"/g, `href="${AUDIO_ME}$1"`);
    s = s.replace(/src="(tokens\/[^"]+\.mp3)"/g, `src="${AUDIO_ME}$1"`);
    s = s.replace(/href="(tokens\/[^"]+\.mp3)"/g, `href="${AUDIO_ME}$1"`);
  }

  s = s.replace(/`\.\/assets\/images\/magic-e\//g, `\`${MEDIA_BASE}assets/images/magic-e/`);
  s = s.replace(/"\.\/assets\/images\/magic-e\//g, `"${MEDIA_BASE}assets/images/magic-e/`);
  s = s.replace(/src="\.\/assets\/images\/magic-e\//g, `src="${MEDIA_BASE}assets/images/magic-e/`);
  s = s.replace(/src="assets\/images\/magic-e\//g, `src="${MEDIA_BASE}assets/images/magic-e/`);
  s = s.replace(/src="assets\/audio\/magic-e\//g, `src="${MEDIA_BASE}assets/audio/magic-e/`);

  return s;
}

if (!fs.existsSync(ME)) {
  console.error("找不到 Primary/Magic-E 目录");
  process.exit(1);
}

let changed = 0;
for (const file of walk(ME)) {
  const before = fs.readFileSync(file, "utf8");
  const after = patchContent(file, before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log("patched", path.relative(ROOT, file));
  }
}
console.log(`\nDone: ${changed} files updated.`);
