/**
 * 出版社级讲义审校清单：结构、打印、脚本、禁用出处用语
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts", "handout-catalog.json"), "utf8")
);

const BANNED = [
  /中考/g,
  /人教版|外研版|教材页/g,
  /考点汇总|常考题型|成都考情/g,
  /背诵讲义/g,
  /第\s*\d+\s*讲/g,
  /出版级|结案报告|教研报告/g,
];

const REQUIRED = [
  { id: "grammar-handout.css", test: (h) => /grammar-handout\.css/.test(h) },
  { id: "grammar-handout-page", test: (h) => /grammar-handout-page/.test(h) },
  { id: "grammar-handout-top", test: (h) => /grammar-handout-top/.test(h) },
  { id: "btnHandoutPrint", test: (h) => /id="btnHandoutPrint"/.test(h) },
  { id: "doc-title", test: (h) => /<h1 class="doc-title">/.test(h) },
  { id: "doc-subtitle", test: (h) => /Steven's Class/.test(h) },
  { id: "print-header", test: (h) => /class="print-header"/.test(h) },
];

function lastInlineScript(html) {
  const blocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map((m) => m[1].trim());
  return blocks.filter((c) => c && !c.includes("src=")).pop() || "";
}

function walkHandouts() {
  const out = [];
  for (const rel of Object.keys(CATALOG)) {
    const fp = path.join(ROOT, rel.replace(/\//g, path.sep));
    if (fs.existsSync(fp)) out.push({ rel, fp, meta: CATALOG[rel] });
  }
  return out;
}

const issues = [];

for (const { rel, fp, meta } of walkHandouts()) {
  const html = fs.readFileSync(fp, "utf8");
  const row = { file: rel, topic: meta.topic, problems: [] };

  for (const r of REQUIRED) {
    if (!r.test(html)) row.problems.push(`缺少: ${r.id}`);
  }

  const titleM = html.match(/<h1 class="doc-title">([^<]+)</);
  if (titleM && titleM[1].trim() !== meta.topic) {
    row.problems.push(`标题不一致: 「${titleM[1].trim()}」≠ 目录「${meta.topic}」`);
  }

  for (const re of BANNED) {
    const m = html.match(re);
    if (m) row.problems.push(`禁用用语: ${m[0]}`);
  }

  if (meta.variant === "sheet" && !/<main class="sheet[\s"]/.test(html)) {
    row.problems.push("sheet 型讲义缺少 <main class=\"sheet\">");
  }

  if (meta.variant === "interactive") {
    if (!/class="print-handout"/.test(html)) {
      row.problems.push("互动讲义缺少打印区 .print-handout");
    }
    const printBlock = html.match(/<section class="print-handout">([\s\S]*?)<\/section>/);
    if (printBlock && !/<h1 class="doc-title">/.test(printBlock[1])) {
      row.problems.push("打印区缺少 doc-title");
    }
    if (printBlock && !/class="print-header"/.test(printBlock[1])) {
      row.problems.push("打印区缺少 print-header");
    }
  }

  const last = lastInlineScript(html);
  if (last.includes("(function") && !/\}\)\(\);\s*$/.test(last)) {
    if (/\}\);\s*$/.test(last)) row.problems.push("IIFE 未执行: 以 }); 结尾而非 })();");
  }

  if (/getElementById\("btnPrint"\)/.test(html) && !/id="btnPrint"/.test(html)) {
    row.problems.push('脚本引用 btnPrint 但页面无 id="btnPrint"');
  }

  if (issues.length || row.problems.length) {
    if (row.problems.length) issues.push(row);
  }
}

console.log("# Handout 审校报告\n");
if (!issues.length) {
  console.log("全部 12 份讲义通过结构清单。");
} else {
  for (const r of issues) {
    console.log(`\n## ${r.file}（${r.topic}）`);
    r.problems.forEach((p) => console.log(`- ${p}`));
  }
  console.log(`\n共 ${issues.length} 个文件有待处理。`);
}
