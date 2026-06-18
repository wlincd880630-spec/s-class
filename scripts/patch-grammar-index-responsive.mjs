import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "Grammar");

const LESSONS = ["L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14"];

function styleBlock(lesson) {
  return `  <style>
    /* ${lesson} · 目录页自适应（仅本页） */
    html {
      -webkit-text-size-adjust: 100%;
      text-size-adjust: 100%;
    }
    body.g-index-scaled {
      min-height: 100dvh;
      overflow-x: clip;
      -webkit-tap-highlight-color: rgba(14, 165, 233, 0.12);
      padding:
        max(1.5rem, env(safe-area-inset-top))
        max(1rem, env(safe-area-inset-right))
        max(2.5rem, env(safe-area-inset-bottom))
        max(1rem, env(safe-area-inset-left));
    }
    body.g-index-scaled .g-index li a,
    body.g-index-scaled .g-index .back a {
      min-height: 44px;
      touch-action: manipulation;
    }
    @media screen and (max-width: 720px) {
      html.g-index-scaled {
        zoom: 1 !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
      }
      body.g-index-scaled {
        padding:
          max(1rem, env(safe-area-inset-top))
          max(0.65rem, env(safe-area-inset-right))
          max(2rem, env(safe-area-inset-bottom))
          max(0.65rem, env(safe-area-inset-left));
      }
      @supports not (zoom: 1) {
        body.g-index-scaled {
          transform: none !important;
          width: 100% !important;
          max-width: none !important;
        }
      }
      body.g-index-scaled .g-index {
        border-radius: 16px;
        padding: 1.15rem 1rem 1.25rem;
      }
      body.g-index-scaled .g-index::before {
        margin: -1.15rem -1rem 1rem;
      }
      body.g-index-scaled .g-index li a {
        padding: 0.75rem 0.8rem;
      }
    }
    @media (hover: none) and (pointer: coarse) {
      body.g-index-scaled .g-index li a:hover {
        transform: none;
        box-shadow: none;
        background: #fff;
        border-color: rgba(148, 163, 184, 0.35);
      }
      body.g-index-scaled .g-index li a:active {
        background: #f0f9ff;
        border-color: rgba(14, 165, 233, 0.45);
      }
    }
  </style>`;
}

for (const lesson of LESSONS) {
  const file = path.join(root, lesson, "index.html");
  if (!fs.existsSync(file)) {
    console.warn("skip missing:", file);
    continue;
  }
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("viewport-fit=cover") && html.includes("目录页自适应")) {
    console.log("already patched:", lesson);
    continue;
  }
  html = html.replace(
    /<meta name="viewport" content="width=device-width, initial-scale=1" \/>/,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />'
  );
  if (!html.includes("目录页自适应")) {
    html = html.replace(
      /(<link rel="stylesheet" href="\.\.\/shared\/grammar-logo\.css" \/>)\r?\n/,
      `$1\n${styleBlock(lesson)}\n`
    );
  }
  html = html.replace(
    /<main class="g-index">\s*<p class="g-index-logo-wrap">/,
    '<main class="g-index">\n    <p class="g-index-logo-wrap">'
  );
  fs.writeFileSync(file, html, "utf8");
  console.log("patched:", lesson);
}

// L13-定语从句：补全与标准目录相同的页面内覆盖（已有 viewport-fit 与专用 assets）
const l13rc = path.join(root, "L13-定语从句", "index.html");
if (fs.existsSync(l13rc)) {
  let html = fs.readFileSync(l13rc, "utf8");
  if (!html.includes("目录页自适应")) {
    html = html.replace(
      /(<link rel="stylesheet" href="\.\.\/shared\/grammar-logo\.css" \/>)\r?\n/,
      `$1\n${styleBlock("L13-定语从句")}\n`
    );
    fs.writeFileSync(l13rc, html, "utf8");
    console.log("patched: L13-定语从句");
  }
}
