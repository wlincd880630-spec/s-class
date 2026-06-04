#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(
  fs.readFileSync(path.join(root, "scripts", "handout-catalog.json"), "utf8")
);
const LINK = '<link rel="stylesheet" href="../shared/grammar-handout-ex-pair.css" />\n';
const RE = /<link rel="stylesheet" href="\.\.\/grammar-handout-ex-pair\.css" \/>\s*\n/;

for (const rel of Object.keys(catalog)) {
  const file = path.join(root, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("grammar-handout-ex-pair.css")) {
    console.log("ok:", rel);
    continue;
  }
  const anchor = html.match(
    /<link rel="stylesheet" href="\.\.\/grammar-handout\.css"[^>]*\/>\s*\n/i
  );
  if (!anchor) {
    console.warn("skip:", rel);
    continue;
  }
  html = html.replace(anchor[0], anchor[0] + "  " + LINK);
  fs.writeFileSync(file, html, "utf8");
  console.log("added:", rel);
}
console.log("done");
