import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), "lesson-title-catalog.json");

const LESSON_DIRS = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^(L\d{2}(?:-[^/]+)?|L00-)/.test(d.name))
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b, "zh-CN"));

function pad2(n) {
  return String(n).padStart(2, "0");
}

function detectKind(file) {
  const n = file.toLowerCase();
  if (/handout/.test(n)) return "handout";
  if (/teacher-notes/.test(n)) return "teacher";
  if (/final-test|exercise|exam|assessment-exit|comprehensive-test/.test(n)) return "exam";
  if (/00-index|overview|index\.html/.test(n)) return "overview";
  if (/练习demo/i.test(n)) return "practice";
  if (/课件demo/i.test(n)) return "lesson";
  if (/page\d+-practice\.html$/i.test(n)) return "exam";
  if (/wrap|summary|finale|archive$/.test(n) && /page\d+/.test(n)) return "summary";
  if (/quiz/.test(n)) return "quiz";
  return "page";
}

function buildHtmlTitle(meta, pageIndex, label, kind) {
  const { lessonNum, topic, titleMode = "lesson" } = meta;
  const pp = pad2(pageIndex);
  if (titleMode === "topic") {
    switch (kind) {
      case "handout":
        return `${topic} · 背诵讲义`;
      case "exam":
        return `${topic} · 综合测试`;
      case "teacher":
        return `${topic} · 教师备注`;
      default:
        return `${topic} · 第${pp}页 · ${label}`;
    }
  }
  const nn = pad2(lessonNum);
  switch (kind) {
    case "handout":
      return `第${nn}讲 · 背诵讲义 · ${topic}`;
    case "exam":
      return `第${nn}讲 · 综合测试 · ${topic}`;
    case "quiz":
      return `第${nn}讲 · 第${pad2(pageIndex)}页 · ${label}`;
    case "teacher":
      return `第${nn}讲 · 教师备注 · ${topic}`;
    case "overview":
      return `第${nn}讲 · 第01页 · 课程总览`;
    case "practice":
      return `第${nn}讲 · 课堂练习 · ${label}`;
    case "lesson":
      return `第${nn}讲 · 课件 · ${label}`;
    case "summary":
      return `第${nn}讲 · 第${pad2(pageIndex)}页 · ${label}`;
    default:
      return `第${nn}讲 · 第${pad2(pageIndex)}页 · ${label}`;
  }
}

function parseIndexOrder(lessonDir) {
  const idx = path.join(lessonDir, "index.html");
  if (!fs.existsSync(idx)) return [];
  const html = fs.readFileSync(idx, "utf8");
  const hrefs = [];
  for (const m of html.matchAll(/<a\s+href="([^"#?]+\.html)"/gi)) {
    const h = m[1].trim();
    if (h.startsWith("../") || /^index\.html$/i.test(h)) continue;
    if (!hrefs.includes(h)) hrefs.push(h);
  }
  return hrefs;
}

function fallbackOrder(lessonDir) {
  return fs
    .readdirSync(lessonDir)
    .filter((n) => /\.html$/i.test(n) && n !== "index.html")
    .sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function replaceTitle(html, newTitle) {
  if (/<title>[^<]*<\/title>/i.test(html)) {
    return html.replace(/<title>[^<]*<\/title>/i, `<title>${newTitle}</title>`);
  }
  return html.replace(/<head>/i, `<head>\n  <title>${newTitle}</title>`);
}

function buildIndexOl(entries) {
  const lines = entries.map((e, i) => {
    const num = pad2(i + 1);
    const descBlock = e.desc
      ? `\n            <span class="desc">${e.desc}</span>`
      : "";
    return `      <li>
        <a href="${e.file}">
          <span class="num">${num}</span>
          <span class="link-body">
            <span class="label">${e.label}</span>${descBlock}
          </span>
        </a>
      </li>`;
  });
  return `<ol>\n${lines.join("\n")}\n    </ol>`;
}

function patchLessonIndex(lessonDir, meta, entries) {
  const idxPath = path.join(lessonDir, "index.html");
  let html = fs.readFileSync(idxPath, "utf8");
  const indexTitle = `${meta.topic} · 目录`;
  html = replaceTitle(html, indexTitle);
  html = html.replace(/<h1>[^<]*<\/h1>/i, `<h1>${meta.topic}</h1>`);
  html = html.replace(/<ol>[\s\S]*?<\/ol>/i, buildIndexOl(entries));
  fs.writeFileSync(idxPath, html, "utf8");
}

function getLabel(file, meta, catalogPages) {
  if (catalogPages[file]) return catalogPages[file];
  return file.replace(/\.html$/i, "").replace(/^.*\//, "");
}

let catalog = {};
if (fs.existsSync(CATALOG_PATH)) {
  catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8"));
}

let htmlPatched = 0;
let indexPatched = 0;

for (const dirName of LESSON_DIRS) {
  const lessonDir = path.join(ROOT, dirName);
  const meta = catalog[dirName];
  if (!meta) {
    console.warn("skip (no catalog):", dirName);
    continue;
  }

  let order = parseIndexOrder(lessonDir);
  if (!order.length) order = fallbackOrder(lessonDir);

  // L01：补上缺失的 page01
  if (dirName === "L01" && !order.includes("lesson01-page01-present.html")) {
    order.unshift("lesson01-page01-present.html");
  }

  const entries = [];
  order.forEach((file, i) => {
    const label = getLabel(file, meta, meta.pages || {});
    const kind = detectKind(file);
    const pageIndex = i + 1;
    const htmlTitle = buildHtmlTitle(meta, pageIndex, label, kind);
    entries.push({ file, label, desc: meta.pageDesc?.[file] || "" });

    const fp = path.join(lessonDir, file);
    if (!fs.existsSync(fp)) return;
    let html = fs.readFileSync(fp, "utf8");
    const next = replaceTitle(html, htmlTitle);
    if (next !== html) {
      fs.writeFileSync(fp, next, "utf8");
      htmlPatched++;
    }
  });

  patchLessonIndex(lessonDir, meta, entries);
  indexPatched++;
  console.log("OK", dirName, `(${entries.length} pages)`);
}

// 根目录课程总目录 desc 标准化
const rootCatalog = catalog._root;
if (rootCatalog) {
  let rootHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  for (const item of rootCatalog.courses) {
    const re = new RegExp(
      `(<li data-title="${item.dataTitle}">[\\s\\S]*?<span class="desc">)[^<]*(</span>)`,
      "i"
    );
    rootHtml = rootHtml.replace(re, `$1${item.desc}$2`);
  }
  fs.writeFileSync(path.join(ROOT, "index.html"), rootHtml, "utf8");
  console.log("OK root index.html descriptions");
}

console.log("\nHTML titles:", htmlPatched, "| lesson indexes:", indexPatched);
