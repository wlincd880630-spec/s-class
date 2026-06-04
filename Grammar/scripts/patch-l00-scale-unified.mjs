import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const courses = ["L00-主谓宾与非谓语", "L00-主系表与非谓语"];
const scaleSrc = path.join(root, "L00-主谓宾与非谓语", "assets", "l00-scale.css");
const scaleLink = '  <link rel="stylesheet" href="assets/l00-scale.css" />\n';

/** 删除各页内联的 zoom 媒体查询，避免与 l00-scale.css 冲突、导致窄屏未放大 */
const inlineZoomBlockRe =
  /\n\s*@media \(min-width: 640px\) \{\s*\n\s*html \{ overflow-x: hidden; \}\s*\n\s*body \{\s*\n\s*zoom: 1\.4;\s*\n\s*width: min\(920px, calc\(100vw \/ 1\.4\)\);\s*\n\s*max-width: 100%;\s*\n\s*margin-left: auto;\s*\n\s*margin-right: auto;\s*;?\s*\n\s*box-sizing: border-box;\s*;?\s*\n\s*\}\s*\n\s*\}/g;

const inlineZoomBlockRe2 =
  /\n\s*@media \(min-width: 640px\) \{\s*\n\s*html \{\s*\n\s*overflow-x: hidden;\s*\n\s*\}\s*\n\s*body \{\s*\n\s*zoom: 1\.4;\s*\n\s*width: min\(920px, calc\(100vw \/ 1\.4\)\);\s*\n\s*max-width: 100%;\s*\n\s*margin-left: auto;\s*\n\s*margin-right: auto;\s*\n\s*box-sizing: border-box;\s*\n\s*\}\s*\n\s*\}/g;

const inlineZoomBlockRe3 =
  /\n\s*@media \(min-width: 640px\) \{\s*\n\s*html \{ overflow-x: hidden; \}\s*\n\s*body \{\s*\n\s*zoom: 1\.4;\s*\n\s*width: min\(920px, calc\(100vw \/ 1\.4\)\);\s*\n\s*max-width: 100%;\s*\n\s*margin-left: auto;\s*\n\s*margin-right: auto;\s*\n\s*\}\s*\n\s*\}/g;

for (const course of courses) {
  fs.copyFileSync(scaleSrc, path.join(root, course, "assets", "l00-scale.css"));

  for (const name of fs.readdirSync(path.join(root, course))) {
    if (!name.endsWith(".html")) continue;
    const file = path.join(root, course, name);
    let html = fs.readFileSync(file, "utf8");

    if (!html.includes("l00-course")) {
      html = html.replace(/<html lang="zh-CN">/, '<html lang="zh-CN" class="l00-course">');
    }
    html = html.replace(/<body([^>]*)>/, (m, attrs) => {
      if (/\bl00-course\b/.test(attrs)) return m;
      if (/class="([^"]*)"/.test(attrs)) {
        return m.replace(/class="([^"]*)"/, 'class="$1 l00-course"');
      }
      return `<body class="l00-course"${attrs}>`;
    });

    let next = html
      .replace(inlineZoomBlockRe, "\n    /* 整体 140% 缩放见 assets/l00-scale.css */")
      .replace(inlineZoomBlockRe2, "\n    /* 整体 140% 缩放见 assets/l00-scale.css */")
      .replace(inlineZoomBlockRe3, "\n    /* 整体 140% 缩放见 assets/l00-scale.css */");

  // page1 特殊注释块
    next = next.replace(
      /\n\s*\/\* 平板[^*]*\*\/\s*\n\s*@media \(min-width: 640px\) \{[\s\S]*?\n\s*\}\s*\n/,
      "\n    /* 整体 140% 缩放见 assets/l00-scale.css */\n"
    );

    if (!next.includes("l00-scale.css")) {
      if (next.includes('href="assets/l00-unified-pager.css"')) {
        next = next.replace(
          /(<link rel="stylesheet" href="assets\/l00-unified-pager\.css" \/>)\n?/,
          `$1\n${scaleLink}`
        );
      } else if (next.includes('href="../shared/grammar-index.css"')) {
        next = next.replace(
          /(<link rel="stylesheet" href="\.\.\/grammar-index\.css" \/>)\n/,
          `$1\n${scaleLink}`
        );
      } else {
        next = next.replace("</head>", `${scaleLink}</head>`);
      }
    }

    // 保证 l00-scale 为 head 内最后一个 stylesheet
    next = next.replace(scaleLink, "");
    const headEnd = next.indexOf("</head>");
    if (headEnd !== -1 && !next.slice(0, headEnd).trimEnd().endsWith("l00-scale.css\" />")) {
      next = next.slice(0, headEnd) + scaleLink + next.slice(headEnd);
    } else if (headEnd !== -1) {
      const beforeHead = next.slice(0, headEnd);
      const afterHead = next.slice(headEnd);
      const withoutScale = beforeHead.replace(scaleLink, "");
      next = withoutScale + scaleLink + afterHead;
    }

    if (next !== html) {
      fs.writeFileSync(file, next, "utf8");
      console.log("patched", path.relative(root, file));
    }
  }
}
