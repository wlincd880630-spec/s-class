/**
 * 批量导出讲义 HTML → PDF（A4 · 背景图形）
 * 用法：node scripts/export-handouts-pdf.mjs
 */
import { readFileSync, mkdirSync, existsSync } from "fs";
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

const SKIP_HTML = new Set(["sentence-frame-handout.html"]);

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

async function exportOne(browser, htmlRel, meta, index, total) {
  const absHtml = join(ROOT, htmlRel.replace(/\//g, "\\"));
  if (!existsSync(absHtml)) {
    return { htmlRel, ok: false, error: "文件不存在" };
  }
  const outName = safeFileName(meta, htmlRel);
  const outPath = join(OUT_DIR, outName);
  const url = pathToFileURL(absHtml).href;

  const page = await browser.newPage();
  try {
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 120000
    });
    await page.evaluate(() => {
      document.body.classList.add("handout-continuous");
      if (typeof window.__handoutPreparePrint === "function") {
        window.__handoutPreparePrint();
      } else {
        document.dispatchEvent(new Event("beforeprint"));
      }
    });
    await page.emulateMediaType("print");
    await new Promise((r) => setTimeout(r, 800));
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
          /* 原文件被占用 */
        }
        try {
          renameSync(tmpPath, outPath);
        } catch {
          const altPath = outPath.replace(/\.pdf$/i, "-新版.pdf");
          renameSync(tmpPath, altPath);
        }
      } else {
        throw e;
      }
    }
    console.log(`[${index}/${total}] OK  ${outName}`);
    return { htmlRel, ok: true, outPath, outName };
  } catch (e) {
    console.error(`[${index}/${total}] FAIL ${htmlRel}: ${e.message}`);
    return { htmlRel, ok: false, error: e.message };
  } finally {
    await page.close();
  }
}

async function main() {
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
  const entries = Object.entries(catalog).filter(([rel]) => {
    const base = rel.split("/").pop();
    return !SKIP_HTML.has(base);
  });

  if (!entries.length) {
    console.error("catalog 为空");
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const chromePath = findChrome();
  console.log("输出目录:", OUT_DIR);
  console.log("浏览器:", chromePath);
  console.log("共", entries.length, "份讲义\n");

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"]
  });

  const results = [];
  let i = 0;
  for (const [rel, meta] of entries) {
    i += 1;
    results.push(await exportOne(browser, rel, meta, i, entries.length));
  }

  await browser.close();

  const ok = results.filter((r) => r.ok);
  const fail = results.filter((r) => !r.ok);
  console.log("\n完成:", ok.length, "成功,", fail.length, "失败");
  if (fail.length) {
    fail.forEach((f) => console.log(" -", f.htmlRel, f.error));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
