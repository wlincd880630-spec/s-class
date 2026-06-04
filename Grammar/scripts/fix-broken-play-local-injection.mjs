#!/usr/bin/env node
/**
 * 修复误插入内联 <script> 中的 play-local-mp3 标签（会导致页面乱码/脚本报错）。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const TAG = '  <script src="../shared/play-local-mp3.js"></script>';
const BAD = /  <script>\r?\n<script src="\.\.\/shared\/play-local-mp3\.js"><\/script>\r?\n/g;

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkHtml(p, acc);
    else if (name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

let fixed = 0;
let headAdded = 0;

for (const fp of walkHtml(ROOT)) {
  let c = fs.readFileSync(fp, "utf8");
  if (!BAD.test(c) && !c.includes('<script src="../shared/play-local-mp3.js"></script>\n  /* inlined')) continue;

  const before = c;
  c = c.replace(BAD, "  <script>\n");

  if (!c.includes("play-local-mp3.js")) {
    const m = c.match(/<head[^>]*>/i);
    if (m) {
      const at = m.index + m[0].length;
      c = c.slice(0, at) + "\n" + TAG + c.slice(at);
      headAdded++;
    }
  } else if (!c.match(/<head[\s\S]{0,800}play-local-mp3\.js/)) {
    const m = c.match(/<head[^>]*>/i);
    if (m && !before.match(/<head[\s\S]{0,800}play-local-mp3\.js/)) {
      const at = m.index + m[0].length;
      c = c.slice(0, at) + "\n" + TAG + c.slice(at);
      headAdded++;
    }
  }

  if (c !== before) {
    fs.writeFileSync(fp, c, "utf8");
    fixed++;
    console.log(path.relative(ROOT, fp));
  }
}

console.log("fixed files:", fixed, "head inject:", headAdded);
