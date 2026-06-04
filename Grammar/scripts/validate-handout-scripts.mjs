import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    if (fs.statSync(fp).isDirectory() && !name.startsWith(".") && name !== "node_modules") walk(fp, out);
    else if (/handout/i.test(name) && name.endsWith(".html")) out.push(fp);
  }
  return out;
}

let bad = 0;
for (const fp of walk(ROOT)) {
  const html = fs.readFileSync(fp, "utf8");
  const re = /<script>([\s\S]*?)<\/script>/gi;
  let m;
  let i = 0;
  while ((m = re.exec(html))) {
    if (m[1].includes("src=")) continue;
    const code = m[1].trim();
    if (!code || /^\s*window\./.test(code) && code.length < 400) {
      i++;
      continue;
    }
    try {
      new Function(code);
    } catch (e) {
      console.log("FAIL", path.relative(ROOT, fp), "block", i, e.message);
      console.log(code.slice(-120));
      bad++;
    }
    const t = code.trim();
    if (
      /^\(function\s*\(/.test(t) &&
      /\}\);\s*$/.test(t) &&
      !/\}\)\(\)/.test(t)
    ) {
      console.log("WARN", path.relative(ROOT, fp), "block", i, "IIFE 未调用 })();");
      bad++;
    }
    i++;
  }
}
console.log(bad ? `\n${bad} errors` : "all handout inline scripts OK");
