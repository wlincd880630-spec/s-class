/**
 * 修复课堂同步讲义附录 PDF 排版
 */
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function walkCss(root, nameEndsWith) {
  const out = [];
  function walk(dir) {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith(nameEndsWith)) out.push(p);
    }
  }
  walk(root);
  return out;
}

function fixPublisher(file) {
  let css = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const before = css;

  css = css.replace(
    /body\.grammar-handout-page\.([a-z0-9-]+)\.\1-classroom \.handout-section \+ \.handout-section,\n  body\.grammar-handout-page\.\1\.\1-classroom section\[id\^="sync-"\]/g,
    `body.grammar-handout-page.$1.$1-classroom section.lesson-sync-page + section.lesson-sync-page,\n  body.grammar-handout-page.$1.$1-classroom section[id^="sync-"]`
  );

  const appendixBlock = (slug) => `  body.grammar-handout-page.${slug}.${slug}-classroom section[id^="sec-"] + section[id^="sec-"],
  body.grammar-handout-page.${slug}.${slug}-classroom .handout-tail-group .handout-section {
    break-before: auto !important;
    page-break-before: auto !important;
    break-inside: auto !important;
    page-break-inside: auto !important;
  }

`;

  css = css.replace(
    /body\.grammar-handout-page\.([a-z0-9-]+)\.\1-classroom section\[id\^="sync-"\] \+ section\[id\^="sync-"\] \{\n    break-before: page !important;\n    page-break-before: always !important;\n  \}\n/g,
    (m, slug) => {
      if (css.includes(`${slug}-classroom section[id^="sec-"] + section`)) {
        return m;
      }
      return m + "\n" + appendixBlock(slug);
    }
  );

  css = css.replace(
    /body\.grammar-handout-page\.([a-z0-9-]+)\.\1-classroom #sec-1 \{\n    break-before: page !important;\n    page-break-before: always !important;\n  \}/g,
    `body.grammar-handout-page.$1.$1-classroom #sec-1 {
    break-before: auto !important;
    page-break-before: auto !important;
  }`
  );

  if (css !== before) {
    writeFileSync(file, css, "utf8");
    console.log("publisher OK", file);
    return true;
  }
  console.warn("publisher unchanged", file);
  return false;
}

function fixClassroomCss(file) {
  let css = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const before = css;

  css = css.replace(
    /  (body\.[a-z0-9-]+-handout-classroom) \.appendix-label \{\n    break-before: page !important;\n    page-break-before: always !important;\n  \}/g,
    `  $1 .appendix-label {
    break-before: page !important;
    page-break-before: always !important;
    break-after: avoid !important;
    page-break-after: avoid !important;
    margin-bottom: 0.35rem !important;
  }

  $1 #sec-1 {
    break-before: auto !important;
    page-break-before: auto !important;
  }`
  );

  if (css !== before) {
    writeFileSync(file, css, "utf8");
    console.log("classroom css OK", file);
    return true;
  }
  return false;
}

const publishers = walkCss(ROOT, "-handout-classroom-publisher.css");
const classroomCss = walkCss(ROOT, "-handout-classroom.css");

let n = 0;
for (const f of publishers) if (fixPublisher(f)) n++;
for (const f of classroomCss) fixClassroomCss(f);
console.log("updated publishers:", n);
