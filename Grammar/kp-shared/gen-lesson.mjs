#!/usr/bin/env node
/**
 * 从 wave1 lesson spec 生成单知识点互动课件（8 页标准结构）
 * 用法: node gen-lesson.mjs path/to/lesson.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

function escJson(obj) {
  return JSON.stringify(obj, null, 2);
}

function pageHtml(lesson, pageId, prev, next) {
  const rel = lesson.sharedRel || "../kp-shared";
  const gram = lesson.grammarRel || "..";
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${lesson.code} · ${pageId}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" />
  <link rel="stylesheet" href="${rel}/kp-shell.css" />
  <link rel="stylesheet" href="${rel}/kp-pager.css" />
  <link rel="stylesheet" href="${gram}/shared/grammar-handout-lookup.css" />
  <script src="${lesson.apiScript || "../../js/api-config.js"}"></script>
  <script src="${gram}/shared/lesson-tts-azure-config.js"></script>
  <script src="assets/kp-img.js"></script>
  <script src="assets/kp-scenes.js"></script>
  <script src="${rel}/kp-tts.js"></script>
  <script src="assets/kp-corpus.js"></script>
  <script src="${gram}/shared/grammar-handout-lookup.js"></script>
  <script src="assets/kp-data.js"></script>
  <script src="${rel}/kp-practice.js"></script>
  <script src="${rel}/kp-engine.js"></script>
  <script src="${rel}/kp-boot.js"></script>
  <link rel="stylesheet" href="${lesson.overlayCss || "../../scripts/drawing-overlay.css?v=1"}" />
</head>
<body class="kp-body" data-kp-id="${pageId}">
  <div id="kpApp" class="kp-stage" aria-live="polite"></div>
  <nav id="kpPager" class="kp-pager" aria-label="页面导航">
    <a class="kp-pager__prev${prev ? "" : " is-muted"}" href="${prev ? prev + ".html" : "index.html"}">${prev ? "← 上一页" : "← 目录"}</a>
    <a class="kp-pager__logo" href="${gram}/index.html"><img src="https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png" alt="Logo" width="96" height="34" decoding="async"/></a>
    <a class="kp-pager__next${next ? "" : " is-muted"}" href="${next ? next + ".html" : "index.html"}">${next ? "下一页 →" : "目录 →"}</a>
  </nav>
  <script src="${lesson.overlayJs || "../../scripts/drawing-overlay.js?v=1"}" defer></script>
</body>
</html>`;
}

function indexHtml(lesson) {
  const features = (lesson.features || [])
    .map((f) => `<span>${f}</span>`)
    .join("");
  const sections = {};
  lesson.pages.forEach((p, i) => {
    if (!sections[p.section]) sections[p.section] = [];
    sections[p.section].push({ p, n: i + 1 });
  });
  let list = "";
  Object.keys(sections).forEach((s) => {
    list += `<div class="kp-index-section"><h2>${s}</h2><ol>`;
    sections[s].forEach((x) => {
      list += `<li><a href="${x.p.id}.html"><span class="num">${String(x.n).padStart(2, "0")}</span><span>${x.p.title}</span></a></li>`;
    });
    list += "</ol></div>";
  });
  const rel = lesson.sharedRel || "../kp-shared";
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${lesson.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap" />
  <link rel="stylesheet" href="${rel}/kp-shell.css" />
  <style>
    body.kp-index-body{margin:0;min-height:100dvh;padding:1rem 1rem 2rem;background:linear-gradient(168deg,#ffeaa7 0%,#fab1a0 38%,#dfe6e9 100%);color:#2c2c2c;font-family:Nunito,system-ui,sans-serif}
    .kp-index{max-width:760px;margin:0 auto}
    .kp-index h1{font-size:clamp(1.4rem,4vw,1.8rem);font-weight:900;margin:.5rem 0;color:#e85d4c}
    .kp-index .badge{display:inline-block;font-size:.72rem;font-weight:900;padding:.15rem .55rem;border-radius:999px;background:#f0ad4e;color:#422006;vertical-align:middle;margin-left:.35rem}
    .kp-index .intro{color:#5a5a5a;font-size:.9rem;line-height:1.65;margin-bottom:1rem}
    .kp-index-hero{border-radius:16px;overflow:hidden;margin-bottom:1rem;border:4px solid #f0ad4e;background:#fff9f0;display:flex;align-items:center;justify-content:center;min-height:160px}
    .kp-index-hero img{width:100%;max-height:220px;object-fit:contain;display:block}
    .kp-features{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:1rem}
    .kp-features span{font-size:.7rem;font-weight:800;padding:.2rem .5rem;border-radius:999px;background:rgba(255,255,255,.65);color:#444;border:2px solid rgba(0,0,0,.08)}
    .kp-index-section{margin-bottom:1rem}
    .kp-index-section h2{font-size:.76rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#e85d4c;margin:0 0 .4rem}
    .kp-index ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.3rem}
    .kp-index li a{display:flex;align-items:center;gap:.6rem;padding:.6rem .8rem;border-radius:12px;background:#fff9f0;border:3px solid #f0ad4e;color:#2c2c2c;text-decoration:none;font-weight:700;font-size:.88rem;box-shadow:3px 4px 0 #e85d4c}
    .kp-index li a:hover{background:#fff3e0}
    .kp-index .num{flex-shrink:0;width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#4a90d9,#9b59b6);color:#fff;font-size:.72rem;font-weight:900;display:flex;align-items:center;justify-content:center}
    .kp-index .back{margin-top:1.2rem;text-align:center}
    .kp-index .back a{color:#5a5a5a;font-weight:700;text-decoration:none;font-size:.88rem}
    .kp-psle{margin:.8rem 0;padding:.65rem .8rem;border-radius:12px;background:rgba(255,255,255,.7);border:2px dashed #f0ad4e;font-size:.82rem;line-height:1.55}
  </style>
</head>
<body class="kp-index-body">
  <main class="kp-index">
    <p style="text-align:center;margin:0 0 .65rem"><img src="https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/logo2.png" alt="Steven's Class" width="160" height="48" decoding="async" style="opacity:.95"/></p>
    <div class="kp-index-hero"><img src="${lesson.heroImage}" alt="" onerror="this.style.display='none'"/></div>
    <h1>${lesson.title} <span class="badge">${lesson.badge || "小学语法"}</span></h1>
    <p class="intro">${lesson.intro}</p>
    ${lesson.psleNote ? `<div class="kp-psle"><strong>📌 真题溯源：</strong>${lesson.psleNote}</div>` : ""}
    ${lesson.juniorNote ? `<div class="kp-psle"><strong>🔗 知识树：</strong>${lesson.juniorNote}</div>` : ""}
    <div class="kp-features">${features}</div>
    ${list}
    <p class="back"><a href="${lesson.backLink || "../index.html"}">← 课程总目录</a>${lesson.juniorHref ? ` · <a href="${lesson.juniorHref}">${lesson.juniorLabel || "初中对应课 →"}</a>` : ""}</p>
  </main>
</body>
</html>`;
}

function buildDataJs(lesson) {
  return `(function (global) {
  "use strict";
  var PAGES = ${escJson(lesson.pages)};
  global.KpData = {
    courseTitle: ${JSON.stringify(lesson.title || "")},
    pages: PAGES,
    total: PAGES.length,
    indexOf: function (id) {
      for (var i = 0; i < PAGES.length; i++) if (PAGES[i].id === id) return i;
      return -1;
    },
    byId: function (id) {
      var i = this.indexOf(id);
      return i >= 0 ? PAGES[i] : null;
    },
  };
})(typeof window !== "undefined" ? window : null);`;
}

function buildImgJs(lesson) {
  const cos = lesson.cosBase;
  return `(function (global) {
  "use strict";
  var COS = "${cos}";
  global.KpImg = {
    url: function (name) {
      if (!name) return "";
      if (/^https?:\\/\\//i.test(name)) return name;
      return COS + String(name).replace(/^\\/+/, "");
    },
    local: function (name) {
      return "assets/img/" + String(name || "").replace(/^\\/+/, "");
    },
  };
})(typeof window !== "undefined" ? window : null);`;
}

function buildScenesJs(lesson) {
  const map = lesson.sceneMap || {};
  return `(function (global) {
  "use strict";
  global.KpScenes = ${escJson(map)};
})(typeof window !== "undefined" ? window : null);`;
}

function buildCorpusJs(lesson) {
  return `(function (global) {
  "use strict";
  global.KpCorpus = ${escJson(lesson.corpus || {})};
})(typeof window !== "undefined" ? window : null);`;
}

function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error("Usage: node gen-lesson.mjs <lesson.json>");
    process.exit(1);
  }
  const lesson = JSON.parse(fs.readFileSync(specPath, "utf8"));
  const outDir = path.resolve(ROOT, lesson.folder);
  const assets = path.join(outDir, "assets");
  const imgDir = path.join(assets, "img");
  fs.mkdirSync(imgDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, "index.html"), indexHtml(lesson));
  fs.writeFileSync(path.join(assets, "kp-data.js"), buildDataJs(lesson));
  fs.writeFileSync(path.join(assets, "kp-img.js"), buildImgJs(lesson));
  fs.writeFileSync(path.join(assets, "kp-scenes.js"), buildScenesJs(lesson));
  fs.writeFileSync(path.join(assets, "kp-corpus.js"), buildCorpusJs(lesson));

  const ids = lesson.pages.map((p) => p.id);
  ids.forEach((id, i) => {
    fs.writeFileSync(
      path.join(outDir, id + ".html"),
      pageHtml(lesson, id, i > 0 ? ids[i - 1] : null, i < ids.length - 1 ? ids[i + 1] : null)
    );
  });
  console.log("Generated", outDir, "(" + ids.length + " pages)");
}

export { ROOT, pageHtml, indexHtml, buildDataJs, buildCorpusJs, buildScenesJs };

const isDirect =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirect) main();
