#!/usr/bin/env node
/** 移除 sync-all-lesson-tts-local 误留的 Azure fetch 残余代码块 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(p, acc);
    } else if (/\.html$/i.test(name)) acc.push(p);
  }
  return acc;
}

/**
 * 本地 playAudio / speakAzure 结尾误留 `}, body: ssml ...` 整段 Azure 残余。
 * 保留本地实现，删掉其后到下一个顶层 function 之间的垃圾。
 */
const ORPHAN_RE =
  /(\}\s*finally\s*\{[\s\S]*?\n\s*\}\s*)\n\s*\},\s*\n\s*body:\s*ssml[\s\S]*?\n\s*\}\s*\n(\s*(?:async\s+)?function\s+)/g;

let fixed = 0;
for (const file of walk(ROOT)) {
  let c = fs.readFileSync(file, "utf8");
  if (!/},\s*\n\s*body:\s*ssml/.test(c)) continue;
  const next = c.replace(ORPHAN_RE, "$1\n  }\n$2");
  if (next !== c) {
    fs.writeFileSync(file, next, "utf8");
    fixed++;
    console.log("fixed:", path.relative(ROOT, file));
  }
}
console.log("total fixed:", fixed);
