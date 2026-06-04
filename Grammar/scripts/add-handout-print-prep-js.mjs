#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, "scripts", "handout-catalog.json"), "utf8")
);
const TAG = '<script src="../shared/grammar-handout-print-prep.js"></script>';

for (const rel of Object.keys(catalog)) {
  const file = path.join(root, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("grammar-handout-print-prep.js")) continue;
  if (!html.includes("</body>")) continue;
  html = html.replace("</body>", `  ${TAG}\n</body>`);
  fs.writeFileSync(file, html, "utf8");
  console.log("added prep js:", rel);
}
console.log("done");
