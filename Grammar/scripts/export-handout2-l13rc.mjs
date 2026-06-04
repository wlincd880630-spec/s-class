/**
 * 导出 L13-定语从句 · 课堂同步讲义 PDF → handout2/
 */
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { mkdirSync } from "fs";
import { exportHandoutPdf } from "./lib/export-handout-pdf.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "handout2");

mkdirSync(OUT_DIR, { recursive: true });
const path = await exportHandoutPdf({
  htmlPath: join(ROOT, "L13-定语从句", "rel-clause-handout-classroom-full.html"),
  outPdf: join(OUT_DIR, "L13-定语从句-课堂同步讲义.pdf")
});
console.log("OK", path);
