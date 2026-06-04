/**
 * 修复讲义页：IIFE 未执行、错误的 btnPrint 引用、冗余打印脚本
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts", "handout-catalog.json"), "utf8")
);

const IIFE_FIX_FILES = [
  "L02/lesson02-handout-writing.html",
  "L06/lesson06-page10-handout.html",
  "L07/lesson07-page10-handout-zhongkao.html",
];

/** 仅绑定打印、且 grammar-handout.js 已覆盖 → 删除整块 */
const REMOVE_REDUNDANT_PRINT_SCRIPT = [
  "L06/lesson06-page10-handout.html",
  "L02/lesson02-handout-writing.html",
];

function fixIifeEnd(html) {
  return html.replace(
    /(<script>\s*\(function \(\) \{[\s\S]*?)\}\);\s*(\n\s*<\/script>)/,
    (full, head, tail) => {
      if (head.includes("})();")) return full;
      return head + "})();" + tail;
    }
  );
}

function removeRedundantPrintBlock(html) {
  return html.replace(
    /\n\s*<script>\s*\(function \(\) \{[\s\S]*?btnHandoutPrint|btnPrint[\s\S]*?\}\);\s*<\/script>/,
    ""
  );
}

function fixBtnPrintScript(html) {
  return html
    .replace(
      /<script>\s*\/\* AZURE[\s\S]*?document\.getElementById\("btnPrint"\)[\s\S]*?<\/script>\s*/i,
      ""
    )
    .replace(
      /<script>\s*document\.getElementById\("btnPrint"\)\.addEventListener\("click"[\s\S]*?<\/script>\s*/i,
      ""
    );
}

function fixL05NextLesson(html) {
  return html.replace(
    /<aside class="lesson06-card"[^>]*>[\s\S]*?<\/aside>/,
    `<aside class="lesson06-card no-print" id="lesson06Card">
          <h2>下一讲</h2>
          <p>情态动词：区分能力、许可、义务与禁止的不同说法。</p>
          <a href="../L06/lesson06-page01-leadin.html">进入情态动词讲义 →</a>
        </aside>`
  );
}

function fixL10Structure(html) {
  if (html.includes('<main class="sheet"') && html.includes("handout-pdf-source")) return html;
  let out = html.replace(
    /<div class="wrap grammar-handout-table-wrap">/,
    `<main class="sheet grammar-handout-table-wrap" id="handout-pdf-source">`
  );
  out = out.replace(/<\/table>\s*<\/div>\s*<script>/, `</table>
    <p class="foot grammar-handout-footer">使用说明：对照「一般过去时」与「现在完成时」例句，注意时间状语与说话人视角；🔊 仅屏幕朗读。</p>
  </main>
  <script>`);
  out = out.replace(
    /<style>[\s\S]*?<\/style>\s*(?=<link rel="stylesheet" href="assets\/grammar-lesson-pager)/,
    `<style>
    table.verb-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 0.82rem; }
    table.verb-table th, table.verb-table td { border: 1px solid #dde3ea; padding: 0.45rem 0.5rem; vertical-align: top; }
    table.verb-table th { background: linear-gradient(135deg, #0f766e, #0d9488); color: #fff; font-size: 0.78rem; }
    .lemma { font-weight: 800; color: var(--gh-accent-ink); }
    .col-zh { color: #37474f; font-size: 0.8rem; }
    .col-en { font-size: 0.8rem; line-height: 1.45; }
    .spk-a { color: #c2410c; font-weight: 700; }
    .spk-b { color: #0369a1; font-weight: 700; }
    .tts-chip { font-size: 0.72rem; padding: 0.1rem 0.4rem; margin-left: 0.25rem; border-radius: 999px; border: 1px solid #e85d4c; background: #fff; cursor: pointer; }
  </style>
  `
  );
  if (!out.includes('<section class="intro">')) {
    out = out.replace(
      /<div class="print-header">[\s\S]*?<\/div>\s*\n\s*\n/,
      (m) =>
        m +
        `      <section class="intro">
        <strong>使用方法：</strong>① 熟记不规则动词三形式 ② 对比两列例句中的时间标志 ③ 口头复述 A/B 对话。
        建议每天 <strong>10 分钟</strong>：看 5 行动词 → 各读 1 句过去时与完成时。
      </section>

`
    );
  }
  return out;
}

let changed = 0;
for (const rel of Object.keys(CATALOG)) {
  const fp = path.join(ROOT, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, "utf8");
  const before = html;

  if (REMOVE_REDUNDANT_PRINT_SCRIPT.includes(rel)) {
    html = removeRedundantPrintBlock(html);
  } else if (IIFE_FIX_FILES.includes(rel)) {
    html = fixIifeEnd(html);
  }

  html = fixBtnPrintScript(html);

  if (rel === "L05/lesson05-page09-handout.html") html = fixL05NextLesson(html);
  if (rel === "L10/L10-handout.html") html = fixL10Structure(html);

  if (html !== before) {
    fs.writeFileSync(fp, html, "utf8");
    console.log("fixed", rel);
    changed++;
  }
}

const staticFiles = ["grammar-handout.css", "grammar-handout.js"];
for (const dir of fs.readdirSync(ROOT)) {
  const full = path.join(ROOT, dir);
  if (!fs.statSync(full).isDirectory() || !/^L\d{2}/.test(dir)) continue;
  const assets = path.join(full, "assets");
  if (!fs.existsSync(assets)) continue;
  for (const f of staticFiles) {
    const src = path.join(ROOT, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(assets, f));
  }
}

console.log(changed ? `\n${changed} file(s) updated` : "no changes");
