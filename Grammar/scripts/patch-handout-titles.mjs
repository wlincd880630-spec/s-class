import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "handout-catalog.json"), "utf8")
);

const BRAND = "Steven's Class";

function buildTopChrome(topic) {
  return `  <header class="grammar-handout-top">
    <div class="top-bar-main">
      <strong>${topic}</strong>
      <span class="subtitle-line">${BRAND}</span>
    </div>
    <a class="grammar-handout-index-link" href="index.html">本讲目录</a>
  </header>`;
}

function patchHandout(html, meta) {
  const topic = meta.topic;
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${topic}</title>`);
  out = out.replace(/<h1 class="doc-title">[^<]*<\/h1>/gi, `<h1 class="doc-title">${topic}</h1>`);
  out = out.replace(/<p class="doc-subtitle">[^<]*<\/p>/gi, `<p class="doc-subtitle">${BRAND}</p>`);

  if (/<header class="grammar-handout-top">/i.test(out)) {
    out = out.replace(/<header class="grammar-handout-top">[\s\S]*?<\/header>/i, buildTopChrome(topic));
  }

  out = out.replace(/\s*<p class="handout-subtitle" id="docSubtitle"><\/p>\s*/gi, "\n");
  out = out.replace(
    /\s*document\.getElementById\("docSubtitle"\)\.textContent\s*=\s*HANDOUT_DATA\.title;\s*\n/g,
    ""
  );

  if (meta.variant === "interactive") {
    out = out.replace(
      /<div class="print-kicker">[^<]*<\/div>/i,
      `<div class="print-kicker">${BRAND}</div>`
    );
    out = out.replace(/<h1>[^<]*<\/h1>/i, (m, offset, s) => {
      const before = s.slice(Math.max(0, offset - 80), offset);
      if (before.includes("print-cover")) return `<h1>${topic}</h1>`;
      return m;
    });
    out = out.replace(/<p class="print-subtitle">[^<]*<\/p>\s*/i, "");
  }

  if (meta.lessonNum === 8) {
    out = out.replace(/\s*<p class="doc-tag">[^<]*<\/p>\s*/i, "\n");
  }

  if (meta.lessonNum === 13) {
    out = out.replace(/<p class="cover-kicker">[^<]*<\/p>/i, `<p class="cover-kicker">${BRAND}</p>`);
    out = out.replace(/<p class="cover-topic">[^<]*<\/p>/i, `<p class="cover-topic">${topic}</p>`);
  }

  return out;
}

let n = 0;
for (const [rel, meta] of Object.entries(CATALOG)) {
  const fp = path.join(ROOT, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(fp)) {
    console.warn("skip missing", rel);
    continue;
  }
  const before = fs.readFileSync(fp, "utf8");
  const after = patchHandout(before, meta);
  if (after !== before) {
    fs.writeFileSync(fp, after, "utf8");
    console.log("OK", rel, "→", meta.topic);
    n++;
  }
}
console.log("\nPatched", n, "handout files");
