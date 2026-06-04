/**
 * 从 catalog 第 N 项起导出（用于补跑中断的批量任务）
 * 用法：node scripts/export-remaining-handouts.mjs 5
 */
import { readFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "handout");
const CATALOG_PATH = join(ROOT, "scripts", "handout-catalog.json");
const startIndex = Math.max(1, parseInt(process.argv[2] || "1", 10));

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

function safeFileName(meta, relPath) {
  const topic = String(meta.topic || "讲义")
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, "")
    .slice(0, 32);
  const prefix =
    meta.lessonNum != null && meta.lessonNum !== ""
      ? `L${String(meta.lessonNum).padStart(2, "0")}-`
      : "";
  const stem = relPath.replace(/\.html$/i, "").split("/").pop() || "";
  let tag = "";
  if (/junior/i.test(stem)) tag = "-初中";
  else if (/senior/i.test(stem)) tag = "-高中";
  if (/L13-定语从句|rel-clause/i.test(relPath) && topic === "定语从句") {
    return `${prefix}定语从句-专项.pdf`;
  }
  return `${prefix}${topic}${tag}.pdf`;
}

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (p && existsSync(p)) return p;
  }
  throw new Error("未找到 Chrome/Edge");
}

async function exportOne(browser, htmlRel, meta) {
  const absHtml = join(ROOT, htmlRel.replace(/\//g, "\\"));
  const outPath = join(OUT_DIR, safeFileName(meta, htmlRel));
  const page = await browser.newPage();
  try {
    await page.goto(pathToFileURL(absHtml).href, {
      waitUntil: "networkidle0",
      timeout: 120000
    });
    await page.evaluate(() => {
      document.body.classList.add("handout-continuous");
      document.dispatchEvent(new Event("beforeprint"));
    });
    await page.emulateMediaType("print");
    await new Promise((r) => setTimeout(r, 600));
    const pdfOpts = {
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" }
    };
    try {
      await page.pdf({ path: outPath, ...pdfOpts });
    } catch (e) {
      if (e?.code === "EBUSY") {
        const tmpPath = `${outPath}.tmp.pdf`;
        await page.pdf({ path: tmpPath, ...pdfOpts });
        const { renameSync, unlinkSync } = await import("fs");
        try {
          unlinkSync(outPath);
        } catch {
          /* 原文件占用 */
        }
        try {
          renameSync(tmpPath, outPath);
        } catch {
          const altPath = outPath.replace(/\.pdf$/i, "-新版.pdf");
          renameSync(tmpPath, altPath);
          console.log("OK", altPath.split(/[/\\]/).pop(), "(原 PDF 被占用)");
          return;
        }
      } else {
        throw e;
      }
    }
    console.log("OK", outPath.split("\\").pop());
  } finally {
    await page.close();
  }
}

const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
const entries = Object.entries(catalog);
const slice = entries.slice(startIndex - 1);
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"]
});
for (const [rel, meta] of slice) {
  await exportOne(browser, rel, meta);
}
await browser.close();
console.log("Done", slice.length, "files from index", startIndex);
