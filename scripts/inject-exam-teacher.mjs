#!/usr/bin/env node
/**
 * 将学生版试卷 + answers.json 合成为教师版 HTML
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function teacherKeyBlock(qid, data) {
  const ans = data.answer ?? "—";
  const alts = (data.alts || []).filter((a) => a !== ans);
  let altHtml = "";
  if (alts.length && typeof ans === "string" && ans.length > 2) {
    altHtml = `<p class="ex-sec"><strong>【可接受变体】</strong></p><div class="ex-body">${alts.map((a) => `<span class="ans-letter">${esc(a)}</span>`).join("、")}</div>`;
  } else if (alts.length && data.alt_answers) {
    altHtml = `<p class="ex-sec"><strong>【可接受变体】</strong></p><div class="ex-body">${data.alt_answers.map((a) => esc(a)).join("、")}</div>`;
  }
  const listen = data.listen
    ? `<p class="tk-listen"><strong>听力原文：</strong><em>${esc(String(data.listen).replace(/^听力原文：/, ""))}</em></p>`
    : "";
  const evidence = data.evidence
    ? `<p class="ex-sec"><strong>【证据】</strong></p><div class="ex-body"><em>${esc(data.evidence)}</em></div>`
    : "";
  const parse = data.parse
    ? `<div class="tk-parse"><p class="ex-sec"><strong>【解析】</strong></p><div class="ex-body">${esc(data.parse)}</div>${evidence}</div>`
    : "";
  return `<div class="teacher-key" id="key-${qid}"><p class="tk-head"><strong>第 ${qid} 题</strong> 参考答案：<span class="tk-ans">${esc(ans)}</span></p>${listen}${parse}${altHtml}</div>`;
}

function applyAnswers(html, answers) {
  for (const [qid, data] of Object.entries(answers)) {
    if (qid === "writing" || !data || typeof data !== "object") continue;
    const num = qid.replace(/^q/, "");
    const ans = String(data.answer || "").trim();
    if (!ans) continue;

    const el = html.match(new RegExp(`id="q${num}"[^>]*>`));
    if (!el) continue;

    // 选择题：标记正确选项
    if (/^[A-E]$/.test(ans)) {
      html = html.replace(
        new RegExp(`<label class="opt([^"]*)"([^>]*for="q${num}_${ans}"[^>]*)>`, "i"),
        `<label class="opt opt-correct$1"$2>`
      );
      html = html.replace(
        new RegExp(`(<input[^>]*name="q${num}"[^>]*value="${ans}"[^>]*)>`, "i"),
        `$1 checked disabled>`
      );
      html = html.replace(
        new RegExp(`(<input[^>]*name="q${num}"[^>]*)>`, "gi"),
        "$1 disabled>"
      );
    } else {
      html = html.replace(
        new RegExp(`(<input[^>]*name="q${num}"[^>]*)(>)`, "gi"),
        (full, attrs, close) => {
          if (attrs.includes('type="radio"')) return full;
          if (attrs.includes("teacher-fill")) return full;
          return `${attrs} disabled><span class="teacher-fill screen-only">${esc(ans)}</span>${close}`;
        }
      );
    }

    // 在题目容器后插入解析
    const keyBlock = teacherKeyBlock(num, data);
    const unitRe = new RegExp(
      `(<div class="q-row-opts-grid print-q-page" id="q${num}"[^>]*>[\\s\\S]*?</div>)`,
      "i"
    );
    if (unitRe.test(html)) {
      html = html.replace(unitRe, `$1${keyBlock}`);
    } else {
      const itemRe = new RegExp(
        `(<div class="q-item[^"]*"[^>]*id="q${num}"[^>]*>[\\s\\S]*?</div>\\s*</div>)`,
        "i"
      );
      if (itemRe.test(html)) {
        html = html.replace(itemRe, `$1${keyBlock}`);
      } else {
        const picRe = new RegExp(
          `(<div class="pic-ans-row[^"]*"[^>]*id="q${num}"[^>]*>[\\s\\S]*?</div>)`,
          "i"
        );
        if (picRe.test(html)) {
          html = html.replace(
            picRe,
            `<div class="q-unit q-unit-pic" id="q${num}"><div class="pic-ans-row"><div class="pic-q-line"><span class="exam-ans-pre">${esc(ans)}</span><span class="q-num">${num}.</span><span class="pic-ans-label">答案：</span><strong class="ans-letter-inline">${esc(ans)}</strong></div></div>${keyBlock}</div>`
          );
        }
      }
    }
  }
  return html;
}

function injectShell(html, cfg) {
  html = html.replace(/<body([^>]*)>/, '<body class="teacher-edition"$1>');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${cfg.title}</title>`);

  const toolbar = `
<div class="toolbar no-print teacher-toolbar">
  <h1>${cfg.title}</h1>
  <a class="toolbar-link" href="${cfg.studentHref}">返回作答</a>
  <button type="button" id="btnApiSettings">API 设置</button>
</div>`;

  html = html.replace(/<div class="toolbar no-print">[\s\S]*?<\/div>/, toolbar);
  if (!html.includes("teacher-toolbar")) {
    html = html.replace(/<body[^>]*>/, (m) => m + toolbar);
  }

  const rel = cfg.lookupRel || "../../exam-shared";
  if (!html.includes("exam-lookup.css")) {
    html = html.replace("</head>", `<link rel="stylesheet" href="${rel}/exam-lookup.css?v=3">\n<link rel="stylesheet" href="${rel}/exam-teacher-ui.css?v=1">\n</head>`);
  }
  if (!html.includes("exam-lookup.js")) {
    html = html.replace("</body>", `<script src="${rel}/exam-lookup.js?v=3"></script>\n<script src="${rel}/exam-teacher-ui.js?v=1"></script>\n</body>`);
  }

  if (cfg.cosBase) {
    html = html.replace(/src="([A-E])\.png"/g, `src="${cfg.cosBase}/$1.png"`);
    html = html.replace(/src="writing\.png"/g, `src="${cfg.cosBase}/writing.png"`);
    html = html.replace(/src="q46_(peter|lily|lucy)\.png"/g, `src="${cfg.cosBase}/q46_$1.png"`);
  }

  // 教师版样式片段
  const teacherCss = `
body.teacher-edition .notice-exam, body.teacher-edition .notice-screen, body.teacher-edition .student-bar { display:none; }
body.teacher-edition .teacher-key {
  margin:12px 0 0; padding:12px 14px; background:#f8fafc; border-left:4px solid #2563eb;
  border-radius:0 8px 8px 0; font-size:13px;
}
body.teacher-edition .tk-ans { color:#dc2626; font-weight:700; }
body.teacher-edition .opt-correct { background:#fef2f2 !important; border:1px solid #fecaca !important; }
body.teacher-edition .teacher-fill { color:#dc2626; font-weight:700; }
body.teacher-edition input[type="radio"], body.teacher-edition input[type="text"], body.teacher-edition textarea { pointer-events:none; }
`;
  html = html.replace("</style>", teacherCss + "\n</style>");

  return html;
}

function main() {
  const [studentPath, answersPath, outPath, ...rest] = process.argv.slice(2);
  if (!studentPath || !answersPath || !outPath) {
    console.error("Usage: inject-exam-teacher.mjs <student.html> <answers.json> <out.html> [--title=] [--student=] [--cos=] [--lookup=]");
    process.exit(1);
  }
  const opts = {};
  rest.forEach((a) => {
    const m = a.match(/^--(\w+)=(.*)$/);
    if (m) opts[m[1]] = m[2];
  });

  let answersRaw = fs.readFileSync(answersPath, "utf8");
  const jsonMatch = answersRaw.match(/\{[\s\S]*\}/);
  const answers = JSON.parse(jsonMatch ? jsonMatch[0] : answersRaw);

  let html = fs.readFileSync(studentPath, "utf8");
  html = applyAnswers(html, answers);
  html = html.replace(/\bdisabled(\s+disabled)+\b/g, "disabled");
  html = injectShell(html, {
    title: opts.title || "答案与解析",
    studentHref: opts.student || path.basename(studentPath),
    cosBase: opts.cos || "",
    lookupRel: opts.lookup || "../../exam-shared",
  });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, "utf8");
  console.log("Written", outPath, fs.statSync(outPath).size);
}

main();
