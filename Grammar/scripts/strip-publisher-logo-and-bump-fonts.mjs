/**
 * 清理各讲 publisher.css：去掉 @page / ::after logo 覆盖；抬高过小字号
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (name.endsWith("handout-publisher.css")) ASSETS.push(p);
    else if (!name.includes(".")) {
      try {
        walk(p);
      } catch {
        /* ignore */
      }
    }
  }
}
walk(ROOT);

function bumpFontSize(pt) {
  if (pt >= 14) return pt; // 封面大标题
  if (pt < 8) return 9.5;
  if (pt < 9.5) return 10.5;
  if (pt < 10.5) return 10.5;
  return pt;
}

function processCss(text) {
  let out = text;
  out = out.replace(/@page\s*\{[^}]*\}\s*/gs, "");
  out = out.replace(/body[^{]*::after\s*\{[^}]*\}\s*/gs, "");
  out = out.replace(
    /body[^{]*\.handout-cover-logo\s*\{[^}]*\}\s*/gs,
    ""
  );
  out = out.replace(/font-size:\s*([\d.]+)pt/gi, (full, num) => {
    const pt = parseFloat(num);
    const next = bumpFontSize(pt);
    if (next === pt) return full;
    const s = Number.isInteger(next) ? String(next) : String(next);
    return `font-size: ${s}pt`;
  });
  return out;
}

for (const file of ASSETS) {
  const before = readFileSync(file, "utf8");
  const after = processCss(before);
  if (after !== before) {
    writeFileSync(file, after, "utf8");
    console.log("OK", file.replace(ROOT + "\\", ""));
  }
}
