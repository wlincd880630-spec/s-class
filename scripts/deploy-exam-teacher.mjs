#!/usr/bin/env node
/**
 * 部署试卷教师版：复制源 HTML → 修正 COS 路径 → 注入查词模块
 * 用法: node scripts/deploy-exam-teacher.mjs [mock2|mock1|zhenti]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LOOKUP_CSS = "../HET/exam-shared/exam-lookup.css?v=2";
const LOOKUP_JS = "../HET/exam-shared/exam-lookup.js?v=2";

const COS = "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class";

const PRESETS = {
  mock1: {
    src: "D:/英语2026中考/英语/黑卷/2026成都英语黑卷-教师版.html",
    out: path.join(ROOT, "HET/2026 Mock 1/2026成都英语黑卷-答案与解析.html"),
    studentHref: "2026成都英语黑卷.html",
    title: "2026成都中考英语（黑卷）·答案与解析",
    cosBase: `${COS}/HET/2026 Mock 1`,
    depth: 2,
    parseData: "mock1",
  },
  mock2: {
    src: "D:/英语2026中考/英语/白卷/2026成都英语白卷-教师版.html",
    out: path.join(ROOT, "HET/2026 Mock 2/2026成都英语白卷-答案与解析.html"),
    studentHref: "2026成都英语白卷.html",
    title: "2026成都中考英语（白卷）·答案与解析",
    cosBase: `${COS}/HET/2026 Mock 2`,
    depth: 2,
    parseData: "mock2",
  },
};

function patchTeacherHtml(html, cfg) {
  const relLookup = cfg.depth >= 3 ? "../../HET/exam-shared" : "../exam-shared";
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${cfg.title}</title>`);

  // 相对图片 → COS
  html = html.replace(/src="([A-E])\.png"/g, `src="${cfg.cosBase}/$1.png"`);
  html = html.replace(/src="writing\.png"/g, `src="${cfg.cosBase}/writing.png"`);
  html = html.replace(/src="q46_(peter|lily|lucy)\.png"/g, `src="${cfg.cosBase}/q46_$1.png"`);
  html = html.replace(/src="listening\.mp3"/g, `src="${cfg.cosBase}/listening.mp3"`);

  const toolbarInject = `
<div class="toolbar no-print teacher-toolbar">
  <h1>${cfg.title}</h1>
  <a class="toolbar-link" href="${cfg.studentHref}">返回作答</a>
  <button type="button" id="btnApiSettings">API 设置</button>
</div>`;

  if (html.includes('class="toolbar no-print"')) {
    html = html.replace(/<div class="toolbar no-print">[\s\S]*?<\/div>/, toolbarInject);
  } else {
    html = html.replace(/<body[^>]*>/, (m) => m + toolbarInject);
  }

  const injectHead =
    `<link rel="stylesheet" href="${relLookup}/exam-lookup.css?v=7">\n` +
    `<link rel="stylesheet" href="${relLookup}/exam-teacher-ui.css?v=7">\n`;
  const injectFoot =
    `<script src="${relLookup}/exam-lookup.js?v=7"></script>\n` +
    `<script src="${relLookup}/parse-data/${cfg.parseData || "mock2"}.js?v=1"></script>\n` +
    `<script src="${relLookup}/exam-parse-ai.js?v=2"></script>\n` +
    `<script src="${relLookup}/exam-teacher-ui.js?v=7"></script>\n`;

  if (!html.includes("exam-lookup.css")) {
    html = html.replace("</head>", injectHead + "</head>");
  } else if (!html.includes("exam-teacher-ui.css")) {
    html = html.replace(/exam-lookup\.css[^"]*"/, `exam-lookup.css?v=3"`);
    html = html.replace("</head>", `<link rel="stylesheet" href="${relLookup}/exam-teacher-ui.css?v=6">\n</head>`);
  }
  if (!html.includes("exam-lookup.js")) {
    html = html.replace("</body>", injectFoot + "</body>");
  } else if (!html.includes("exam-teacher-ui.js")) {
    html = html.replace(/exam-lookup\.js[^"]*"/, `exam-lookup.js?v=3"`);
    html = html.replace("</body>", `<script src="${relLookup}/exam-teacher-ui.js?v=6"></script>\n</body>`);
  }

  return html;
}

function main() {
  const key = process.argv[2] || "mock2";
  const cfg = PRESETS[key];
  if (!cfg) {
    console.error("未知 preset:", key, Object.keys(PRESETS));
    process.exit(1);
  }
  if (!fs.existsSync(cfg.src)) {
    console.error("源文件不存在:", cfg.src);
    process.exit(1);
  }
  let html = fs.readFileSync(cfg.src, "utf8");
  html = patchTeacherHtml(html, { ...cfg, depth: 2 });
  fs.mkdirSync(path.dirname(cfg.out), { recursive: true });
  fs.writeFileSync(cfg.out, html, "utf8");
  console.log("Written:", cfg.out, "size", fs.statSync(cfg.out).size);
}

main();
