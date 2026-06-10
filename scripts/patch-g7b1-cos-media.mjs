#!/usr/bin/env node
/**
 * 将 junior_vocab/G7_B1 内词汇页的图片、音频链接统一为腾讯云 COS（MEDIA_BASE + mediaUrl）。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const G7_B1 = path.join(ROOT, "junior_vocab", "G7_B1");
const COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/junior_vocab/G7_B1/";

const OLD_MEDIA_RE =
  /const MEDIA_BASE = \(typeof window !== "undefined" && window\.MEDIA_BASE\) \? window\.MEDIA_BASE : "";\r?\nfunction mediaUrl\(path\) \{[^\n]+\}/;

const PEP_BLOCK =
  `const COS_VOCAB_ROOT = "${COS}";\n` +
  "function mediaBaseForUnit(n) { return COS_VOCAB_ROOT + \"Unit\" + n + \"/\"; }\n" +
  "function mediaUrl(path) {\n" +
  "  if (!path) return \"\";\n" +
  "  if (path.startsWith(\"http\")) return path;\n" +
  "  const n = typeof currentUnit !== \"undefined\" ? currentUnit : 1;\n" +
  "  return mediaBaseForUnit(n) + path.replace(/^\\//, \"\");\n" +
  "}";

function unitBlock(n) {
  const base = `${COS}Unit${n}/`;
  return (
    `const MEDIA_BASE = "${base}";\n` +
    `function mediaUrl(path) { if (!path) return ""; var p = path.replace(/^Unit${n}\\/?/, ""); return path.startsWith("http") ? path : (MEDIA_BASE + (p ? p.replace(/^\\//, "") : "")); }`
  );
}

let patched = 0;

for (let n = 1; n <= 7; n++) {
  const fp = path.join(G7_B1, `Unit${n}`, `Unit${n}.html`);
  if (!fs.existsSync(fp)) continue;
  let s = fs.readFileSync(fp, "utf8");
  if (!OLD_MEDIA_RE.test(s)) {
    if (s.includes("cos.ap-chengdu.myqcloud.com/s-class/junior_vocab/G7_B1")) {
      console.log("skip (already patched):", path.relative(ROOT, fp));
      continue;
    }
    console.warn("pattern not found:", fp);
    continue;
  }
  s = s.replace(OLD_MEDIA_RE, unitBlock(n));
  fs.writeFileSync(fp, s, "utf8");
  patched++;
  console.log("patched:", path.relative(ROOT, fp));
}

const pep = path.join(G7_B1, "pep_vocab_learn.html");
if (fs.existsSync(pep)) {
  let s = fs.readFileSync(pep, "utf8");
  if (OLD_MEDIA_RE.test(s)) {
    s = s.replace(OLD_MEDIA_RE, PEP_BLOCK);
    fs.writeFileSync(pep, s, "utf8");
    patched++;
    console.log("patched:", path.relative(ROOT, pep));
  } else if (s.includes("COS_VOCAB_ROOT")) {
    console.log("skip (already patched): pep_vocab_learn.html");
  } else {
    console.warn("pattern not found: pep_vocab_learn.html");
  }
}

console.log(`Done. ${patched} file(s) updated.`);
