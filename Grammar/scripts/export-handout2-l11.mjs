/**
 * 导出 L11 状语从句 · 课堂同步讲义 PDF → handout2/
 */
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { mkdirSync } from "fs";
import { exportHandoutPdf } from "./lib/export-handout-pdf.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "handout2");
const OUT_PDF = join(OUT_DIR, "L11-状语从句-课堂同步讲义.pdf");

mkdirSync(OUT_DIR, { recursive: true });
const path = await exportHandoutPdf({
  htmlPath: join(ROOT, "L11", "lesson11-handout-classroom-full.html"),
  outPdf: OUT_PDF
});
console.log("OK", path);
