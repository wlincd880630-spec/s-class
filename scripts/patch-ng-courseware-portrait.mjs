/**
 * 国家地理 courseware · 手机强制纵向长页布局
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PRIMARY = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "Primary");

const COURSEWARE = [
  "Jump Pup/jump-pup-courseware/index.html",
  "Play Kitty/play-kitty-courseware/index.html",
  "Peek Otter/peek-otter-courseware/index.html",
  "Helpers in your neighborhood/helpers-neighborhood-courseware/index.html",
];

const OLD_BLOCK = `    @media (max-width: 720px) {
      .book-top { align-items: flex-start; }
      .book-top-right { width: 100%; }
      .book-top-right .btns { justify-content: stretch; }
      .book-top-right .btn { flex: 1 1 calc(33% - 0.35rem); min-height: 44px; text-align: center; }
      @supports (zoom: 1) {
        #view-words .view-body--words { zoom: 1; }
        #view-review > .view-body { zoom: 1; }
        #view-story .view-body--story { zoom: 1; }
      }
      @supports not (zoom: 1) {
        #view-words .view-body--words,
        #view-review > .view-body,
        #view-story .view-body--story {
          transform: none; width: 100%; max-width: 100%;
        }
      }
      .app {
        width: 100vw;
        height: 100dvh;
        max-width: 100vw;
        max-height: 100dvh;
      }
    }`;

const NEW_BLOCK = `    /* 手机 / 窄屏：强制纵向长页，取消 16:9 横屏幻灯片 */
    @media (pointer: coarse) and (max-width: 1024px), (max-width: 820px) {
      body {
        display: block;
        padding:
          max(2.75rem, calc(env(safe-area-inset-top) + 2.2rem))
          max(4px, env(safe-area-inset-right))
          max(6px, env(safe-area-inset-bottom))
          max(4px, env(safe-area-inset-left));
      }
      .app {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: calc(100dvh - 3rem);
        max-height: none;
        aspect-ratio: auto;
        overflow: visible;
        margin: 0;
        padding: 0.35rem 0.4rem 0.65rem;
      }
      .book-cover {
        min-height: calc(100dvh - 3.5rem);
        max-height: none;
        overflow: visible;
      }
      .book-inner {
        overflow: visible;
        flex: 1 1 auto;
      }
      .book-top { align-items: flex-start; }
      .book-top-right { width: 100%; }
      .book-top-right .btns { justify-content: stretch; }
      .book-top-right .btn {
        flex: 1 1 calc(33.33% - 0.35rem);
        min-height: 44px;
        text-align: center;
        white-space: normal;
        font-size: clamp(0.72rem, 2.8vw, 0.82rem);
        line-height: 1.2;
      }
      .book-main {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        flex: 1 1 auto;
        min-height: 55dvh;
      }
      @supports (zoom: 1) {
        #view-words .view-body--words,
        #view-review > .view-body,
        #view-story .view-body--story { zoom: 1; }
      }
      @supports not (zoom: 1) {
        #view-words .view-body--words,
        #view-review > .view-body,
        #view-story .view-body--story {
          transform: none;
          width: 100%;
          max-width: 100%;
          align-self: stretch;
        }
      }
      .word-study-wrap { flex-direction: column; align-items: center; }
      .word-col-art { max-width: 100%; flex: 0 0 auto; width: 100%; }
      .word-col-art .art-img { max-height: min(40dvh, 16rem); }
      .view-body--story .story-sentence--xl.story-sentence-row { flex-direction: column; }
      .view-body--story .story-col--art { flex: 0 0 auto; max-width: 100%; }
      .opt-img { flex: 1 1 100%; max-width: 100%; }
    }`;

for (const rel of COURSEWARE) {
  const file = path.join(PRIMARY, rel);
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes(OLD_BLOCK)) {
    if (html.includes("手机 / 窄屏：强制纵向长页")) {
      console.log("skip (already patched):", rel);
      continue;
    }
    console.error("block not found:", rel);
    process.exitCode = 1;
    continue;
  }
  html = html.replace(OLD_BLOCK, NEW_BLOCK);
  html = html.replace(/primary-responsive\.css\?v=\d+/g, "primary-responsive.css?v=2");
  html = html.replace(/primary-responsive\.js\?v=\d+/g, "primary-responsive.js?v=2");
  fs.writeFileSync(file, html, "utf8");
  console.log("patched:", rel);
}
