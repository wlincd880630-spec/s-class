/**
 * 导出 L01 课堂同步讲义 → handout2/
 */
import { existsSync, mkdirSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "handout2");
const HTML = join(ROOT, "L01", "lesson01-handout-classroom-full.html");
const OUT_PDF = join(OUT_DIR, "L01-一般现在时-课堂同步讲义.pdf");

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (p && existsSync(p)) return p;
  }
  throw new Error("未找到 Chrome/Edge");
}

mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"]
});

const page = await browser.newPage();
await page.goto(pathToFileURL(HTML).href, {
  waitUntil: "networkidle0",
  timeout: 120000
});
await page.evaluate(() => {
  document.body.classList.add("handout-continuous");
  document.dispatchEvent(new Event("beforeprint"));
});
await page.emulateMediaType("print");
await new Promise((r) => setTimeout(r, 800));

const pdfOpts = {
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" }
};

const { renameSync, unlinkSync } = await import("fs");

async function writePdf(path) {
  await page.pdf({ path, ...pdfOpts });
}

try {
  await writePdf(OUT_PDF);
} catch (e) {
  if (e?.code === "EBUSY") {
    const tmp = `${OUT_PDF}.tmp.pdf`;
    await writePdf(tmp);
    try {
      unlinkSync(OUT_PDF);
    } catch {
      /* 原文件被占用 */
    }
    try {
      renameSync(tmp, OUT_PDF);
    } catch {
      const alt = OUT_PDF.replace(/\.pdf$/i, "-新版.pdf");
      renameSync(tmp, alt);
      console.log("OK", alt, "(原 PDF 被占用)");
      await page.close();
      await browser.close();
      process.exit(0);
    }
  } else {
    throw e;
  }
}

await page.close();
await browser.close();
console.log("OK", OUT_PDF);
