#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "HET", "完成图表练习", "courseware");

function patchCss(s) {
  if (!s.includes("read-float-toolbar")) return s;

  if (!s.includes(".slide-body.is-reading-slide .slide-body-inner")) {
    s = s.replace(
      /(\.reading-slide-wrap\s*\{)/,
      `    .slide-body.is-reading-slide .slide-body-inner {
      display: flex;
      flex-direction: column;
      min-height: min(54vh, calc((100vh - 140px) / 1.575));
    }
$1`
    );
  }

  s = s.replace(
    /\.reading-slide-wrap\s*\{[^}]+\}/,
    `.reading-slide-wrap {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      position: relative;
    }`
  );

  s = s.replace(
    /\.reading-para-stage\s*\{[^}]+\}/,
    `.reading-para-stage {
      font-size: clamp(13px, 1.45vw, 20px);
      line-height: 1.75;
      letter-spacing: 0.01em;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 4px 2px 8px 2px;
      scrollbar-width: thin;
      scrollbar-color: rgba(201,162,77,.4) transparent;
    }
    .reading-para-stage::-webkit-scrollbar { width: 6px; }
    .reading-para-stage::-webkit-scrollbar-thumb { background: rgba(201,162,77,.35); border-radius: 4px; }`
  );

  s = s.replace(
    /\.read-float-toolbar\s*\{[^}]+\}/,
    `.read-float-toolbar {
      flex-shrink: 0;
      position: static;
      z-index: 30;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: stretch;
      gap: 8px;
      width: 100%;
      margin-top: auto;
      padding: 12px 0 4px;
      pointer-events: auto;
      background: linear-gradient(180deg, transparent 0%, rgba(12,11,9,.94) 18%);
      border-top: 1px solid rgba(201,162,77,.28);
    }`
  );

  s = s.replace(
    /\.read-float-toolbar button\s*\{[^}]+\}/,
    `.read-float-toolbar button {
      pointer-events: auto;
      flex: 1 1 140px;
      min-height: 42px;
      padding: 8px 12px;
      font-size: clamp(12px, 1.1vw, 15px);
      line-height: 1.25;
      text-align: center;
      background: rgba(28, 24, 20, 0.96);
      color: var(--ng-cream);
      border: 1px solid var(--ng-gold-dim);
      border-radius: 6px;
      cursor: pointer;
      font: inherit;
      font-weight: 600;
      box-shadow: 0 3px 10px rgba(0,0,0,.4);
    }`
  );

  s = s.replace(
    /\.socratic-out\s*\{[^}]+\}/,
    `.socratic-out {
      flex-shrink: 0;
      overflow: visible;
      margin: 0 0 8px;
      padding: 8px 10px;
      background: rgba(74,124,124,.12);
      border: 1px solid rgba(74,124,124,.4);
      border-radius: 8px;
    }`
  );

  s = s.replace(
    /\.lookup-panel\s*\{[^}]+\}/,
    `.lookup-panel {
      position: fixed; right: 0; top: 0; bottom: 0; width: min(720px, 96vw);
      background: #1a1612; border-left: 1px solid var(--ng-line);
      transform: translateX(100%); transition: transform .25s ease; z-index: 90;
      display: flex; flex-direction: column;
      box-shadow: -8px 0 40px rgba(0,0,0,.5);
    }`
  );

  s = s.replace(
    /\.lookup-panel header h2\s*\{[^}]+\}/,
    `.lookup-panel header h2 { margin: 0; font-size: 32px; color: var(--ng-gold); }`
  );

  s = s.replace(
    /\.lookup-panel \.lookup-body\s*\{[^}]+\}/,
    `.lookup-panel .lookup-body {
      flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden;
      padding: 18px 20px;
      font-size: 28px; line-height: 1.65; color: #e8dfd0;
      scrollbar-width: thin;
      scrollbar-color: rgba(201,162,77,.55) rgba(0,0,0,.25);
    }
    .lookup-panel .lookup-body::-webkit-scrollbar { width: 12px; }
    .lookup-panel .lookup-body::-webkit-scrollbar-thumb {
      background: rgba(201,162,77,.48); border-radius: 8px; border: 2px solid rgba(0,0,0,.15);
    }
    .lookup-panel .lookup-body::-webkit-scrollbar-track { background: rgba(0,0,0,.22); }`
  );

  s = s.replace(
    /\.lookup-head\s*\{[^}]+\}/,
    `.lookup-head { margin: 0 0 12px; color: #fff; font-size: 40px; }`
  );

  s = s.replace(
    /\.lookup-section-title\s*\{[^}]+\}/,
    `.lookup-section-title { margin: 14px 0 8px; color: var(--ng-gold); font-size: 26px; }`
  );

  s = s.replace(
    /\.lookup-usage-list\s*\{[^}]+\}/,
    `.lookup-usage-list { margin: 0; padding: 0 0 0 1.1em; list-style: disc; font-size: 28px; }`
  );

  s = s.replace(
    /\.lookup-usage-item\s*\{[^}]+\}/,
    `.lookup-usage-item { margin-bottom: 14px; line-height: 1.55; font-size: 28px; }`
  );

  s = s.replace(
    /\.lookup-ex-en\s*\{[^}]+\}/,
    `.lookup-ex-en {
      margin: 6px 0 4px; padding: 8px 10px;
      background: rgba(74,124,124,.15); border-radius: 4px;
      font-size: 26px; color: #dff5f3; font-style: italic;
    }`
  );

  s = s.replace(
    /\.lookup-ex-zh\s*\{[^}]+\}/,
    `.lookup-ex-zh { margin: 0; font-size: 24px; color: #c4b8a4; }`
  );

  s = s.replace(
    /\.lookup-muted\s*\{[^}]+\}/,
    `.lookup-muted { color: var(--ng-muted); font-size: 28px; }`
  );

  s = s.replace(
    /\.lookup-bad\s*\{[^}]+\}/,
    `.lookup-bad { color: var(--bad); font-size: 28px; }`
  );

  s = s.replace(
    /\.lookup-raw\s*\{[^}]+\}/,
    `.lookup-raw { white-space: pre-wrap; font-size: 26px; }`
  );

  s = s.replace(
    /\.lookup-panel header\s*\{[^}]+\}/,
    `.lookup-panel header {
      display: flex; justify-content: space-between; align-items: center;
      flex-shrink: 0;
      padding: 14px 18px; border-bottom: 1px solid var(--ng-line);
    }`
  );

  s = s.replace(
    /\.lookup-close\s*\{[^}]+\}/,
    `.lookup-close {
      background: transparent; border: 1px solid var(--ng-line); color: var(--ng-cream);
      padding: 8px 16px; cursor: pointer; border-radius: 4px; font: inherit; font-size: 18px;
    }`
  );

  return s;
}

let changed = 0;
for (const name of fs.readdirSync(DIR)) {
  if (!name.endsWith("完成图表.html") || name.includes("handout")) continue;
  const file = path.join(DIR, name);
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes("read-float-toolbar")) continue;
  const after = patchCss(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log("patched", name);
  }
}
console.log(`Done: ${changed} files.`);
