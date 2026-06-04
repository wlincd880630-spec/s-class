/**
 * 讲义 HTML → PDF（Puppeteer + Chrome/Edge）
 */
import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { pathToFileURL } from "url";
import puppeteer from "puppeteer-core";

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
  throw new Error("未找到 Chrome/Edge，请安装或设置 CHROME_PATH");
}

export async function exportHandoutPdf({ htmlPath, outPdf }) {
  mkdirSync(dirname(outPdf), { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });

  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, {
    waitUntil: "networkidle0",
    timeout: 120000
  });
  await page.evaluate(() => {
    document.body.classList.add("handout-continuous");
    document.dispatchEvent(new Event("beforeprint"));
  });
  await page.emulateMediaType("print");
  await new Promise((r) => setTimeout(r, 2000));

  const pdfOpts = {
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" }
  };

  try {
    await page.pdf({ path: outPdf, ...pdfOpts });
  } catch (e) {
    if (e?.code === "EBUSY" || e?.code === "EPERM") {
      const alt = outPdf.replace(/\.pdf$/i, "-新版.pdf");
      await page.pdf({ path: alt, ...pdfOpts });
      await page.close();
      await browser.close();
      return alt;
    }
    throw e;
  }

  await page.close();
  await browser.close();
  return outPdf;
}
