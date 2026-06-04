#!/usr/bin/env node
/** 为 handout 中「背 N 句」等打印隐藏标记包裹 span.handout-print-hide */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, "scripts", "handout-catalog.json"), "utf8")
);

const PARENS_RE = /（[^）]*背[^）]*）/g;
const EACH_RE = /（每类背[^）]*）/g;
const DOT_RE = /·\s*背\s*\d+\s*句/g;

function wrapSegment(html, re) {
  return html.replace(re, (m) => {
    if (m.includes("handout-print-hide")) return m;
    return `<span class="handout-print-hide">${m}</span>`;
  });
}

function processHtml(html) {
  if (html.includes("<script") && html.includes("usageHost")) return html;
  let out = html;
  out = wrapSegment(out, PARENS_RE);
  out = wrapSegment(out, EACH_RE);
  out = wrapSegment(out, DOT_RE);
  out = out.replace(
    /<span class="handout-print-hide"><span class="handout-print-hide">/g,
    '<span class="handout-print-hide">'
  );
  out = out.replace(/<\/span><\/span>/g, (m, i, s) => {
    const before = s.slice(Math.max(0, i - 80), i);
    return before.includes("handout-print-hide") ? "</span>" : m;
  });
  return out;
}

for (const rel of Object.keys(catalog)) {
  const file = path.join(root, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = processHtml(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    console.log("wrapped:", rel);
  }
}

console.log("done");
