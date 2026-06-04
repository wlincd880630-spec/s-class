#!/usr/bin/env node
/**
 * 本地 HTTP 冒烟：抽查总目录 + 各课 index + 每课首屏课件
 */
import fs from "fs";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer-core";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

function findChrome() {
  for (const p of CHROME_PATHS) if (p && fs.existsSync(p)) return p;
  throw new Error("未找到 Chrome/Edge");
}

const LESSONS = fs.readdirSync(ROOT).filter((n) => /^L\d{2}|^L00-/.test(n));

function firstLessonPage(lessonDir) {
  const names = fs.readdirSync(lessonDir).filter((n) => /\.html$/i.test(n) && n !== "index.html");
  const prefer = names.find((n) => /page01|01-warmup|page1\.html|Demo.*01/i.test(n));
  return prefer || names.sort()[0] || null;
}

const urls = [
  "/index.html",
  ...LESSONS.map((l) => `/${l}/index.html`)
];

for (const l of LESSONS) {
  const fp = firstLessonPage(path.join(ROOT, l));
  if (fp) urls.push(`/${l}/${fp}`);
}

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const abs = path.normalize(path.join(ROOT, p.replace(/^\//, "")));
  if (!abs.startsWith(ROOT) || !fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
    res.writeHead(404);
    res.end("404");
    return;
  }
  const ext = path.extname(abs).toLowerCase();
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".mp3": "audio/mpeg"
  };
  res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
  res.end(fs.readFileSync(abs));
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox"]
});

const page = await browser.newPage();
const failed = [];

page.on("response", (res) => {
  const u = res.url();
  if (!u.startsWith(base)) return;
  if (res.status() >= 400) failed.push({ status: res.status(), url: u.replace(base, "") });
});

page.on("pageerror", (err) => failed.push({ status: "JS", url: err.message.slice(0, 120) }));

for (const u of urls) {
  failed.length = 0;
  await page.goto(base + u, { waitUntil: "networkidle0", timeout: 60000 }).catch((e) => {
    failed.push({ status: "NAV", url: e.message.slice(0, 80) });
  });
  const title = await page.title().catch(() => "");
  const ok = failed.length === 0;
  console.log(ok ? "OK" : "FAIL", u, title.slice(0, 40));
  if (!ok) failed.slice(0, 5).forEach((f) => console.log("   ", f.status, f.url));
}

await browser.close();
server.close();
console.log("\n抽查页数:", urls.length);
