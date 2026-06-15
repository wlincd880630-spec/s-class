#!/usr/bin/env node
/**
 * 抄写作业 01–04：图片仅用 IMG_BASE + key 拼接，禁止 homework 前缀双重 URL。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "Primary");

const BAD_IMG =
  /<img src="https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Primary\/[^"]+-homework\/\$\{IMG_BASE\}\$\{([^}]+)\}\.png"([^>]*)\/>/g;

const INLINE_IMG =
  /<img src="\$\{IMG_BASE\}\$\{([^}]+)\}\.png"([^>]*)\/>/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/抄写作业.*\.html$/i.test(e.name)) out.push(p);
  }
  return out;
}

function patchFile(filePath) {
  let s = fs.readFileSync(filePath, "utf8");
  const before = s;

  s = s.replace(BAD_IMG, '<img class="hw-word-img"$2/>');
  s = s.replace(INLINE_IMG, '<img class="hw-word-img"$2/>');

  s = s.replace(
    /const img = block\.querySelector\('\.img-frame img'\);\s*\n\s*img\.addEventListener\('error'/g,
    (m) => {
      if (s.includes("img.src = IMG_BASE + imgKey")) return m;
      if (s.includes("buildSentenceBlock")) {
        return `const img = block.querySelector('.hw-word-img');\n  img.src = IMG_BASE + imgKey + '.png';\n  img.addEventListener('error'`;
      }
      return `const img = block.querySelector('.hw-word-img');\n  img.src = IMG_BASE + word + '.png';\n  img.addEventListener('error'`;
    }
  );

  // 已是 hw-word-img 但缺少 src 赋值
  if (
    s.includes("hw-word-img") &&
    !s.includes("img.src = IMG_BASE +")
  ) {
    s = s.replace(
      /const img = block\.querySelector\('\.hw-word-img'\);\s*\n\s*img\.addEventListener\('error'/g,
      (m, offset) => {
        const head = s.slice(0, offset);
        const fn = head.lastIndexOf("function buildSentenceBlock") > head.lastIndexOf("function buildWordBlock")
          ? "imgKey"
          : "word";
        return `const img = block.querySelector('.hw-word-img');\n  img.src = IMG_BASE + ${fn} + '.png';\n  img.addEventListener('error'`;
      }
    );
  }

  if (s !== before) {
    fs.writeFileSync(filePath, s, "utf8");
    return true;
  }
  return false;
}

let n = 0;
for (const file of walk(ROOT)) {
  if (patchFile(file)) {
    n++;
    console.log("patched", path.relative(ROOT, file));
  }
}
console.log(`Done: ${n} files`);
