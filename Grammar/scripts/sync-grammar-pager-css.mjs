#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sharedPager = fs.readFileSync(path.join(ROOT, "shared", "grammar-lesson-pager.css"), "utf8");
let n = 0;
for (const name of fs.readdirSync(ROOT)) {
  const fp = path.join(ROOT, name, "assets", "grammar-lesson-pager.css");
  if (!fs.existsSync(fp)) continue;
  if (fs.readFileSync(fp, "utf8") !== sharedPager) {
    fs.writeFileSync(fp, sharedPager, "utf8");
    n++;
  }
}
console.log("synced", n, "grammar-lesson-pager.css copies");
