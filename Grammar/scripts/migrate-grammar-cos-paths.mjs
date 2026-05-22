/**
 * 将 Grammar 内旧文件夹名的图片/音频/视频 COS 路径改为重命名后的路径。
 * 运行：node Grammar/scripts/migrate-grammar-cos-paths.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRAMMAR = path.join(__dirname, "..");

/** @type {[string, string][]} */
const REPLACEMENTS = [
  ["Grammar/DQ主谓宾和非谓语", "Grammar/L00-主谓宾与非谓语"],
  ["Grammar/DQ主系表和非谓语", "Grammar/L00-主系表与非谓语"],
  ["Grammar/定语从句", "Grammar/L13-定语从句"],
  // manifest / 上传脚本用的相对 key（对齐 s-class/Grammar/...）
  ["主系表和非谓语/", "Grammar/L00-主系表与非谓语/"],
  ["主谓宾和非谓语/", "Grammar/L00-主谓宾与非谓语/"],
];

const EXT = new Set([".html", ".js", ".json", ".mjs", ".css", ".md"]);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "scripts" || name === "node_modules") continue;
      walk(p, out);
    } else if (EXT.has(path.extname(name).toLowerCase())) {
      out.push(p);
    }
  }
  return out;
}

let filesChanged = 0;
let totalReplacements = 0;

for (const file of walk(GRAMMAR)) {
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  let count = 0;
  for (const [from, to] of REPLACEMENTS) {
    const parts = text.split(from);
    if (parts.length > 1) {
      count += parts.length - 1;
      text = parts.join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, text, "utf8");
    filesChanged++;
    totalReplacements += count;
    console.log(`${path.relative(GRAMMAR, file)} (${count})`);
  }
}

console.log(`\nDone: ${filesChanged} files, ${totalReplacements} replacements.`);
