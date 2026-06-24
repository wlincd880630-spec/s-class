#!/usr/bin/env node
/**
 * 从 2018–2026 成都中考 HTML 为 Tier2/3 词汇匹配真题原文例句
 * 输出 Grammar/L15/data/tier-exam-sentences.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MANUAL_EXAM } from "./tier-vocab-examples-data.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "Grammar/L15/data/tier-exam-sentences.json");

const EXAMS = [
  [2018, "HET/2018成都中考.html"],
  [2019, "HET/2019成都中考.html"],
  [2020, "HET/2020成都中考.html"],
  [2021, "HET/2021成都中考.html"],
  [2022, "HET/2022成都中考.html"],
  [2023, "HET/2023成都中考.html"],
  [2024, "HET/2024成都中考.html"],
  [2025, "HET/2025成都中考.html"],
  [2026, "2026EXAM/HET/2026成都中考英语真题.html"],
];

/** @type {[string, string, string][]} */
const TIER_WORDS = [
  ["passenger", "乘客", "2018"], ["pilot", "飞行员", "2018"], ["accent", "口音", "2018"],
  ["grammar", "语法", "2018"], ["suspect", "嫌疑犯", "2019"], ["medium", "中等的", "2019"],
  ["typhoon", "台风", "2019"], ["irony", "反讽", "2019"], ["vegetation", "植被", "2019"],
  ["algae", "藻类", "2019"], ["insect", "昆虫", "2019"], ["scanner", "扫描仪", "2020"],
  ["convenient", "方便的", "2020"], ["parrot", "鹦鹉", "2020"], ["couplet", "对联/诗联", "2020"],
  ["churro", "西班牙油条", "2020"], ["independent", "独立的", "2020"], ["translator", "翻译家", "2021"],
  ["breeding", "繁殖", "2021"], ["intangible", "非物质的", "2021"], ["barcode", "条形码", "2021"],
  ["plover", "千鸟", "2022"], ["scrub jay", "灌丛鸦", "2022"], ["chimpanzee", "黑猩猩", "2022"],
  ["brainstorming", "头脑风暴", "2022"], ["mulberry", "桑葚", "2022"], ["silkworm", "蚕", "2022"],
  ["pancake", "薄饼", "2023"], ["impressionist", "印象派画家", "2023"], ["pitch", "音高", "2023"],
  ["stressed", "受压的", "2023"], ["longitude", "经度", "2023"], ["projection", "投影", "2023"],
  ["whiskers", "（猫）胡须", "2024"], ["pupils", "瞳孔", "2024"], ["empathy", "共情", "2025"],
  ["heartbreak", "心碎", "2025"], ["hurdles", "跨栏", "2025"], ["archaeological", "考古的", "2025"],
  ["homestay", "民宿", "2025"], ["ecologist", "生态学家", "2025"], ["terracotta", "陶制的", "2026"],
  ["coating", "涂层", "2026"], ["elderly", "年长者", "2026"], ["rainforest", "雨林", "2026"],
  ["composer", "作曲家", "2026"], ["tuba", "大号", "2026"], ["photographer", "摄影师", "2026"],
  ["positive", "积极的", "2026"], ["patience", "耐心", "2026"], ["difficulties", "困难", "2026"],
  ["happiness", "幸福", "2026"], ["impervious", "不受影响的", "2026"], ["museum", "博物馆", "2026"],
  ["necessary", "必要的", "2025"], ["surprised", "惊讶的", "2025"], ["vacuum", "吸尘", "2025"],
  ["maintenance", "维修", "2025"], ["electronic", "电子的", "2025"], ["international", "国际的", "2025"],
  ["organised", "组织的", "2025"], ["gradually", "逐渐地", "2025"], ["apartment", "公寓", "2025"],
  ["confidence", "自信", "2018"], ["shyness", "害羞", "2018"], ["creativity", "创造力", "2019"],
  ["official", "官员", "2020"], ["virtue", "美德", "2020"], ["poetry", "诗歌", "2021"],
  ["precision", "精确", "2021"], ["disabled", "残疾的", "2022"], ["marathon", "马拉松", "2022"],
  ["platform", "平台", "2022"], ["machine", "机器", "2023"], ["advantage", "优势", "2023"],
  ["chance", "机会", "2023"], ["difference", "差异", "2023"], ["talent", "天赋", "2024"],
  ["solve", "解决", "2024"], ["agree", "同意", "2024"], ["enjoy", "享受", "2025"],
  ["offer", "提供", "2025"], ["rule", "规则", "2025"],
  ["disgust", "厌恶", "2018"], ["triggered", "触发", "2018"], ["polypropylene", "聚丙烯", "2023"],
  ["fungi", "真菌", "2023"], ["Sanjiangyuan", "三江源", "2023"], ["Tiangong Space Station", "天宫空间站", "2023"],
  ["Meteorologica", "气象学（著作）", "2024"], ["radiosonde", "无线电探空仪", "2024"],
  ["Hurricane Lee", "飓风李", "2024"], ["James Webb Space Telescope", "韦布望远镜", "2023"],
  ["Dipteryx oleifera", "巴拿马树种", "2025"], ["conductive", "可传导的", "2025"],
  ["parasitic", "寄生的", "2025"], ["knocker-uppers", "职业叫醒人", "2026"],
  ["understatement", "轻描淡写", "2019"], ["anthropomorphism", "拟人化", "2023"],
  ["remix", "混音改编", "2026"], ["snow leopard", "雪豹", "2026"],
  ["Café Schokolade", "维也纳巧克力咖啡馆", "2026"], ["Forest Listeners", "森林聆听者项目", "2026"],
  ["Boyi", "伯益（上古环保官）", "2022"], ["impossible foods", "植物肉公司", "2019"],
  ["personification", "拟人修辞", "2020"], ["Xu Yuanchong", "许渊冲", "2021"],
  ["Monet", "莫奈", "2023"], ["Shakespeare", "莎士比亚", "2024"], ["Aristotle", "亚里士多德", "2024"],
  ["Terracotta Warriors", "兵马俑", "2026"], ["Su Shi / Dongpo", "苏轼/东坡", "2026"],
  ["Huangzhou", "黄州", "2026"], ["Dongpo Pork", "东坡肉", "2026"], ["Saihanba", "塞罕坝", "2019"],
  ["Niu Yu", "牛钰", "2022"], ["Dashiban", "大石板村", "2025"],
];

function escRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normKey(word) {
  return String(word).split("/")[0].trim().toLowerCase();
}

function cleanPara(html) {
  return html
    .replace(/<span[^>]*class="[^"]*blank[^"]*"[^>]*>[\s\S]*?<\/span>/gi, " ")
    .replace(/<input[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\([^)]*[\u4e00-\u9fff][^)]*\)/g, " ")
    .replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractParagraphs(html) {
  const out = [];
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = cleanPara(m[1]);
    if (text.length >= 25) out.push(text);
  }
  return out;
}

function toSentences(text) {
  return text
    .split(/(?<=[.!?…"」])\s+(?=[A-Z"「(])/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 20);
}

function wordPattern(word) {
  const v = word.split("/")[0].trim();
  const parts = v.split(/\s+/);
  if (parts.length > 1) {
    return new RegExp(parts.map(escRe).join("\\s+"), "i");
  }
  const base = escRe(v);
  if (base.endsWith("s")) {
    return new RegExp(`\\b${base}\\b`, "i");
  }
  return new RegExp(`\\b${base}(?:s|es)?\\b`, "i");
}

function scoreSentence(s, preferredYear, year) {
  let score = 0;
  if (String(year) === String(preferredYear)) score += 50;
  if (!/___|blank|q\d+/i.test(s)) score += 20;
  if (s.length >= 60 && s.length <= 280) score += 15;
  if (/^[A-Z]/.test(s)) score += 5;
  if (/feel thankful|scientists|museum|exam|students/i.test(s)) score -= 5;
  return score;
}

function findInYear(paragraphs, word, year) {
  const pat = wordPattern(word);
  let best = null;
  let bestScore = -1;
  for (const para of paragraphs) {
    for (const sent of toSentences(para)) {
      if (!pat.test(sent)) continue;
      const sc = scoreSentence(sent, year, year);
      if (sc > bestScore) {
        bestScore = sc;
        best = sent.replace(/\s+/g, " ").trim();
      }
    }
  }
  return best;
}

const byYear = {};
for (const [year, rel] of EXAMS) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) continue;
  byYear[year] = extractParagraphs(fs.readFileSync(fp, "utf8"));
}

const result = {};
let manual = 0;
let auto = 0;
let missing = 0;

for (const [word, zh, prefYear] of TIER_WORDS) {
  const key = normKey(word);
  if (MANUAL_EXAM[key]) {
    result[key] = { ...MANUAL_EXAM[key], word, zh, source: "manual" };
    manual++;
    continue;
  }

  let sentence = findInYear(byYear[prefYear] || [], word, prefYear);
  if (!sentence) {
    for (const [y, paras] of Object.entries(byYear)) {
      if (y === String(prefYear)) continue;
      const s = findInYear(paras, word, prefYear);
      if (s) {
        sentence = s;
        break;
      }
    }
  }

  if (sentence) {
    result[key] = {
      examEn: sentence,
      examZh: `${prefYear}成都中考阅读/完形语篇中出现「${word}」（${zh}）。`,
      examYear: prefYear,
      word,
      zh,
      source: "auto",
    };
    auto++;
  } else {
    result[key] = {
      examEn: "",
      examZh: "",
      examYear: prefYear,
      word,
      zh,
      source: "missing",
    };
    missing++;
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
console.log(`tier exam sentences: manual=${manual} auto=${auto} missing=${missing} → ${OUT}`);
