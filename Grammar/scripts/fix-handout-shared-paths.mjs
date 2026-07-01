#!/usr/bin/env node
/** 修正讲义中错误的 ../../grammar-handout-* 路径为 ../shared/ */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walkHandouts(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "scripts") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walkHandouts(p, acc);
    else if (/handout/i.test(name) && name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function relToShared(fromDir) {
  let r = path.relative(fromDir, path.join(ROOT, "shared")).replace(/\\/g, "/");
  if (!r.endsWith("/")) r += "/";
  return r;
}

let n = 0;
for (const fp of walkHandouts(ROOT)) {
  const sp = relToShared(path.dirname(fp));
  let html = fs.readFileSync(fp, "utf8");
  const before = html;
  html = html.replace(/\.\.\/\.\.\/grammar-handout-lookup\.css/g, `${sp}grammar-handout-lookup.css`);
  html = html.replace(/\.\.\/\.\.\/grammar-handout-lookup\.js/g, `${sp}grammar-handout-lookup.js`);
  html = html.replace(/\.\.\/\.\.\/grammar-handout-tts\.css/g, `${sp}grammar-handout-tts.css`);
  html = html.replace(/\.\.\/\.\.\/play-local-mp3\.js/g, `${sp}play-local-mp3.js`);
  html = html.replace(/\.\.\/\.\.\/lesson-local-audio\.js/g, `${sp}lesson-local-audio.js`);
  html = html.replace(/\.\.\/\.\.\/lesson-speak-local-only\.js/g, `${sp}lesson-speak-local-only.js`);
  html = html.replace(/\.\.\/\.\.\/handout-tts\.js/g, `${sp}handout-tts.js`);
  if (html !== before) {
    fs.writeFileSync(fp, html, "utf8");
    n++;
    console.log(path.relative(ROOT, fp));
  }
}
console.log("fixed", n);
