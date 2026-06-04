#!/usr/bin/env node
/**
 * 将各讲 index.html 的列表项统一为 L13 结构：num + link-body + label [(+ desc)]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walkIndexFiles(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (["node_modules", ".git", "scripts"].includes(name)) continue;
      walkIndexFiles(p, acc);
    } else if (name === "index.html") acc.push(p);
  }
  return acc;
}

function normalize(html) {
  if (html.includes("link-body")) return html;

  return html.replace(
    /<li>\s*<a href="([^"]+)">\s*<span class="num">(\d+)<\/span>\s*<span class="label">([\s\S]*?)<\/span>\s*<\/a>\s*<\/li>/g,
    (_, href, num, label) =>
      `      <li>\n        <a href="${href}">\n          <span class="num">${num}</span>\n          <span class="link-body">\n            <span class="label">${label.trim()}</span>\n          </span>\n        </a>\n      </li>`
  );
}

let n = 0;
for (const fp of walkIndexFiles(ROOT)) {
  if (fp === path.join(ROOT, "index.html")) continue;
  let html = fs.readFileSync(fp, "utf8");
  if (!html.includes('class="g-index"')) continue;
  const next = normalize(html);
  if (next !== html) {
    fs.writeFileSync(fp, next, "utf8");
    n++;
    console.log("OK", path.relative(ROOT, fp));
  }
}
console.log("Normalized:", n, "files");
