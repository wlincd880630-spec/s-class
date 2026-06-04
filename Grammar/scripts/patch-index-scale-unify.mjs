import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scaleLinkRoot = '  <link rel="stylesheet" href="shared/grammar-index-scale.css" />\n';
const scaleLinkLesson = '  <link rel="stylesheet" href="../shared/grammar-index-scale.css" />\n';

function patchIndex(file, scaleHref) {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("g-index")) return false;

  let changed = false;

  if (!html.includes("l00-course") && !html.includes("g-index-scaled")) {
    html = html.replace(/<html lang="zh-CN">/, '<html lang="zh-CN" class="g-index-scaled">');
    changed = true;
  }

  html = html.replace(/<body([^>]*)>/, (m, attrs) => {
    if (/\bg-index-scaled\b/.test(attrs) || /\bl00-course\b/.test(attrs)) return m;
    if (/class="([^"]*)"/.test(attrs)) {
      const next = m.replace(/class="([^"]*)"/, 'class="$1 g-index-scaled"');
      if (next !== m) changed = true;
      return next;
    }
    changed = true;
    return `<body class="g-index-scaled"${attrs}>`;
  });

  const link = scaleHref === "grammar-index-scale.css" ? scaleLinkRoot : scaleLinkLesson;
  if (!html.includes("grammar-index-scale.css")) {
    if (html.includes('href="shared/grammar-index.css"')) {
      html = html.replace(
        /(<link rel="stylesheet" href="(?:\.\.\/)?grammar-index\.css" \/>)\n/,
        `$1\n${link}`
      );
    } else {
      html = html.replace("</head>", `${link}</head>`);
    }
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html, "utf8");
    return true;
  }
  return false;
}

// 根目录总目录
if (patchIndex(path.join(root, "index.html"), "grammar-index-scale.css")) {
  console.log("patched index.html");
}

// 各讲目录（含 L00，补 g-index-scaled；L00 仍保留 l00-course + l00-scale）
for (const name of fs.readdirSync(root, { withFileTypes: true })) {
  if (!name.isDirectory() || !/^L\d/.test(name.name)) continue;
  const indexFile = path.join(root, name.name, "index.html");
  if (!fs.existsSync(indexFile)) continue;
  if (patchIndex(indexFile, "../grammar-index-scale.css")) {
    console.log("patched", path.relative(root, indexFile));
  }
}

// 同步 L00 l00-scale.css
const l00Scale = path.join(root, "L00-主谓宾与非谓语", "assets", "l00-scale.css");
for (const course of ["L00-主谓宾与非谓语", "L00-主系表与非谓语"]) {
  fs.copyFileSync(l00Scale, path.join(root, course, "assets", "l00-scale.css"));
}
