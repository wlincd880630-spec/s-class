#!/usr/bin/env node
/**
 * 将 Primary 目录内 HTML/JS 的图片与语音链接统一为腾讯云 COS 绝对 URL。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIMARY = path.join(ROOT, "Primary");
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

const BOOKS = {
  "Jump Pup": {
    audio: cosUrl("Primary/Jump Pup/audio/"),
    courseware: cosUrl("Primary/Jump Pup/jump-pup-courseware/"),
    wordsImg: cosUrl("Primary/Jump Pup/jump-pup-courseware/images/words/"),
    reviewAudio: cosUrl("Primary/Jump Pup/jump-pup-review-games/audio/"),
    coursewareAudio: cosUrl("Primary/Jump Pup/jump-pup-courseware/audio/"),
  },
  "Play Kitty": {
    audio: cosUrl("Primary/Play Kitty/audio/"),
    courseware: cosUrl("Primary/Play Kitty/play-kitty-courseware/"),
    wordsImg: cosUrl("Primary/Play Kitty/play-kitty-courseware/images/words/"),
    reviewAudio: cosUrl("Primary/Play Kitty/play-kitty-review-games/audio/"),
    coursewareAudio: cosUrl("Primary/Play Kitty/play-kitty-courseware/audio/"),
  },
  "Peek Otter": {
    audio: cosUrl("Primary/Peek Otter/audio/"),
    courseware: cosUrl("Primary/Peek Otter/peek-otter-courseware/"),
    wordsImg: cosUrl("Primary/Peek Otter/peek-otter-courseware/images/words/"),
    reviewAudio: cosUrl("Primary/Peek Otter/peek-otter-review-games/audio/"),
    coursewareAudio: cosUrl("Primary/Peek Otter/peek-otter-courseware/audio/"),
  },
  "Helpers in your neighborhood": {
    audio: cosUrl("Primary/Helpers in your neighborhood/audio/"),
    courseware: cosUrl("Primary/Helpers in your neighborhood/helpers-neighborhood-courseware/"),
    wordsImg: cosUrl("Primary/Helpers in your neighborhood/helpers-neighborhood-courseware/images/words/"),
    reviewAudio: cosUrl("Primary/Helpers in your neighborhood/audio/"),
    coursewareAudio: cosUrl("Primary/Helpers in your neighborhood/audio/"),
  },
};

function detectBook(filePath) {
  const rel = path.relative(PRIMARY, filePath).replace(/\\/g, "/");
  if (rel.startsWith("Helpers in your neighborhood/")) return "Helpers in your neighborhood";
  for (const name of Object.keys(BOOKS)) {
    if (name === "Helpers in your neighborhood") continue;
    if (rel.startsWith(name + "/") || rel === name) return name;
  }
  return null;
}

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
  const rel = path.relative(PRIMARY, filePath).replace(/\\/g, "/");
  const book = detectBook(filePath);

  // 抄写作业 img：IMG_BASE 已是 COS 绝对路径，禁止 homework 前缀双重拼接
  s = s.replace(
    /src="https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Primary\/[^"]+-homework\/\$\{IMG_BASE\}\$\{([^}]+)\}\.png"/g,
    'src="${IMG_BASE}${$1}.png"'
  );

  // 修正错误的 ../assets/ COS 路径
  s = s.replace(/Primary\/Jump Pup\/\.\.\/assets\//g, "Primary/assets/");
  s = s.replace(/Primary\/Play Kitty\/\.\.\/assets\//g, "Primary/assets/");
  s = s.replace(/Primary\/Peek Otter\/\.\.\/assets\//g, "Primary/assets/");

  if (book) {
    const b = BOOKS[book];

    // words-data.js IMG_BASE
    s = s.replace(
      /IMG_BASE:\s*["']\.\.\/[^"']+courseware\/images\/words\/["']/g,
      `IMG_BASE: "${b.wordsImg}"`
    );

    // homework 抄写 IMG_BASE
    s = s.replace(
      /const IMG_BASE = ['"]\.\.\/[^'"]+courseware\/images\/words\/['"]/g,
      `const IMG_BASE = '${b.wordsImg}'`
    );
    s = s.replace(
      /const IMG_BASE = ['"]\.\/assets\/images\/[^'"]+\/['"]/g,
      `const IMG_BASE = '${b.wordsImg}'`
    );
    s = s.replace(
      /var IMG_BASE = ["']\.\.\/[^"']+courseware\/images\/words\/["']/g,
      `var IMG_BASE = "${b.wordsImg}"`
    );
    s = s.replace(
      /svgPlaceholderDataUrl\(word, '\.\/assets\/images\/[^']+' \+ word \+ '\.png'\)/g,
      "svgPlaceholderDataUrl(word, IMG_BASE + word + '.png')"
    );

    // 听写：去掉 homework 前缀的错误 COS 拼接
    s = s.replace(
      new RegExp(
        `src="https://s-class-1403296481\\.cos\\.ap-chengdu\\.myqcloud\\.com/s-class/Primary/${book.replace(/ /g, " ")}/[^"]+-homework/\\$\\{IMG_BASE\\}`,
        "g"
      ),
      'src="${IMG_BASE}'
    );

    // 抄写作业 img 模板：IMG_BASE 已是 COS 绝对路径，勿再拼 homework 前缀
    s = s.replace(
      /src="https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Primary\/(?:Jump%20Pup|Play%20Kitty|Peek%20Otter|Jump Pup|Play Kitty|Peek Otter)\/[^"]*-homework\/\$\{IMG_BASE\}\$\{([^}]+)\}\.png"/g,
      'src="${IMG_BASE}${$1}.png"'
    );
    for (const hwFolder of [
      "jump-pup-homework",
      "play-kitty-homework",
      "peek-otter-homework",
    ]) {
      const bad = `https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/${book}/${hwFolder}/\${IMG_BASE}`;
      s = s.split(bad).join("${IMG_BASE}");
    }

    // script src → COS
    if (rel.includes("-homework/")) {
      s = s.replace(
        /<script src="\.\.\/audio\/audio-manifest\.js"><\/script>/g,
        `<script src="${b.audio}audio-manifest.js"></script>`
      );
      s = s.replace(
        /<script src="\.\.\/audio\/local-audio\.js"><\/script>/g,
        `<script src="${b.audio}local-audio.js"></script>`
      );
    } else if (rel.includes("-review-games/")) {
      s = s.replace(
        /<script src="audio\/audio-manifest\.js"><\/script>/g,
        `<script src="${b.reviewAudio}audio-manifest.js"></script>`
      );
      s = s.replace(
        /<script src="audio\/local-audio\.js"><\/script>/g,
        `<script src="${b.reviewAudio}local-audio.js"></script>`
      );
    } else if (rel.includes("-courseware/index.html")) {
      s = s.replace(
        /<script src="media\/story-timings\.js"><\/script>\s*/g,
        `<script src="${b.courseware}media/story-timings.js"></script>\n  `
      );
      s = s.replace(
        /<script src="audio\/audio-manifest\.js"><\/script>/g,
        `<script src="${b.coursewareAudio}audio-manifest.js"></script>`
      );
      s = s.replace(
        /<script src="audio\/local-audio\.js"><\/script>/g,
        `<script src="${b.coursewareAudio}local-audio.js"></script>`
      );

      if (!s.includes("var MEDIA_COS =")) {
        s = s.replace(
          /(\<script\>\s*\n)/,
          `$1    var MEDIA_COS = "${b.courseware}";\n`
        );
        if (!s.includes("var MEDIA_COS =")) {
          s = s.replace(
            /(<script>\s*\r?\n\s*"use strict";?\s*\r?\n)/,
            `$1    var MEDIA_COS = "${b.courseware}";\n`
          );
        }
      } else {
        s = s.replace(
          /var MEDIA_COS = ["'][^"']*["'];/,
          `var MEDIA_COS = "${b.courseware}";`
        );
      }

      s = s.replace(
        /function wordImg\(w\) \{ return "images\/words\/" \+ w\.key\.toLowerCase\(\) \+ "\.png"; \}/g,
        `function wordImg(w) { return MEDIA_COS + "images/words/" + w.key.toLowerCase() + ".png"; }`
      );
      s = s.replace(
        /var imgSrc = "images\/story\/" \+ z \+ n \+ "\.png";/g,
        `var imgSrc = MEDIA_COS + "images/story/" + z + n + ".png";`
      );
      s = s.replace(
        /fetch\("media\/story-timings\.json"/g,
        `fetch(MEDIA_COS + "media/story-timings.json"`
      );
      s = s.replace(
        /var relAbs = \(function \(\) \{\s*try \{ return new URL\(rel, window\.location\.href\)\.href; \} catch \(e\) \{ return rel; \}\s*\}\)\(\);/g,
        `var relAbs = MEDIA_COS + rel;`
      );
    }
  }

  // Primary/index 与子目录 index 的 assets（相对路径残留）
  s = s.replace(/src="assets\//g, `src="${cosUrl("Primary/assets/")}`);
  s = s.replace(/src="\.\.\/assets\//g, `src="${cosUrl("Primary/assets/")}`);

  // 涂色页 images/*.png
  if (rel.includes("-coloring/index.html") && book) {
    const coloringBase = cosUrl(`Primary/${book}/${rel.split("/")[1]}/images/`);
    s = s.replace(/src="images\//g, `src="${coloringBase}`);
  }

  // COS URL 中书名字段未编码（Jump Pup → Jump%20Pup）
  for (const name of Object.keys(BOOKS)) {
    s = s.replace(
      new RegExp(`/Primary/${name.replace(/ /g, " ")}/`, "g"),
      `/Primary/${encodeURIComponent(name)}/`
    );
  }

  // 抄写作业 / 听写：去掉错误的 homework 前缀（兼容未带 .png 的残留）
  s = s.replace(
    /src="https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Primary\/(?:Jump%20Pup|Play%20Kitty|Peek%20Otter|Jump Pup|Play Kitty|Peek Otter)\/[^"]*-homework\/\$\{IMG_BASE\}\$\{([^}]+)\}\.png"/g,
    'src="${IMG_BASE}${$1}.png"'
  );
  s = s.replace(
    /src="https:\/\/s-class-1403296481\.cos\.ap-chengdu\.myqcloud\.com\/s-class\/Primary\/(?:Jump%20Pup|Play%20Kitty|Peek%20Otter|Jump Pup|Play Kitty|Peek Otter)\/[^"]*-homework\/\$\{IMG_BASE\}/g,
    'src="${IMG_BASE}'
  );

  return s;
}

let changed = 0;
for (const file of walk(PRIMARY)) {
  const before = fs.readFileSync(file, "utf8");
  const after = patchContent(file, before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log("patched", path.relative(ROOT, file));
  }
}
console.log(`\nDone: ${changed} files updated.`);
