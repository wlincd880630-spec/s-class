/**
 * 单份导出讲义 HTML -> PDF（A4 · 背景图形）
 * 用法：node scripts/export-one-handout-pdf.mjs "L00-主系表与非谓语/link-handout-junior.html"
 */
import { existsSync, mkdirSync, readFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "handout");
const CATALOG_PATH = join(ROOT, "scripts", "handout-catalog.json");

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
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
  throw new Error("未找到 Chrome/Edge，请设置环境变量 CHROME_PATH");
}

async function main() {
  const target = process.argv[2];
  if (!target) {
    throw new Error("请提供 catalog 中的 HTML 相对路径");
  }

  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  const meta = catalog[target];
  if (!meta) {
    throw new Error(`catalog 中不存在：${target}`);
  }

  const absHtml = join(ROOT, target.replace(/\//g, "\\"));
  if (!existsSync(absHtml)) {
    throw new Error(`HTML 文件不存在：${absHtml}`);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const chromePath = findChrome();
  const outName = safeFileName(meta, target);
  const outPath = join(OUT_DIR, outName);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"]
  });

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
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 800));
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
        const tmpPath = outPath + ".tmp.pdf";
        await page.pdf({ path: tmpPath, ...pdfOpts });
        const { renameSync, unlinkSync } = await import("fs");
        try {
          unlinkSync(outPath);
        } catch {
          /* 原文件被占用时跳过删除 */
        }
        try {
          renameSync(tmpPath, outPath);
        } catch {
          const altPath = outPath.replace(/\.pdf$/i, "-新版.pdf");
          renameSync(tmpPath, altPath);
          console.log(`OK ${outName} (原文件占用，已写入 ${altPath.split(/[/\\]/).pop()})`);
          return;
        }
      } else {
        throw e;
      }
    }
    console.log(`OK ${outName}`);
  } finally {
    await page.close();
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
