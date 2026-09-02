/**
 * 融合 DeepSeek 与 Grok 两份讲义：按质量规则择优，不足则互补。
 * node scripts/merge-pet-handouts.mjs
 */
import fs from "fs";
import path from "path";
import { ROOT, LEVELS, UNITS } from "./pet-handout-lib.mjs";

const DS = path.join(ROOT, "PET/studio/data/handouts-deepseek");
const GK = path.join(ROOT, "PET/studio/data/handouts-grok");
const OUT = path.join(ROOT, "PET/studio/data/handouts");

const TEMPLATES = [
  /we talked about .+ in class/i,
  /this place looks /i,
  /please \w+ a better option/i,
  /students who .+ usually make faster progress/i,
  /the more \w+ it seemed at first/i,
  /without a clear \w+, the discussion/i,
  /a well-planned \w+ is often more/i
];

function load(dir, file) {
  const p = path.join(dir, file);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

function containsWord(sentence, word) {
  if (!word || !sentence) return false;
  const w = String(word).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  const head = w.split("\\s+")[0];
  return new RegExp(w, "i").test(sentence) || new RegExp("\\b" + head, "i").test(sentence);
}

function exampleScore(ex, word) {
  const s = String(ex.sentence || ex.en || "");
  let n = 0;
  if (s.length >= 24) n += 2;
  if (s.length >= 50) n += 1;
  if (containsWord(s, word)) n += 4;
  if (ex.trans || ex.cn) n += 1;
  if (TEMPLATES.some((re) => re.test(s))) n -= 8;
  return n;
}

function pickExamples(a, b, word) {
  const by = {};
  LEVELS.forEach((lv) => {
    const ea = (a || []).find((x) => x.level === lv);
    const eb = (b || []).find((x) => x.level === lv);
    const sa = ea ? exampleScore(ea, word) : -99;
    const sb = eb ? exampleScore(eb, word) : -99;
    const win = sb >= sa ? eb : ea;
    if (!win) return;
    by[lv] = {
      level: lv,
      sentence: win.sentence || win.en || "",
      trans: win.trans || win.cn || ""
    };
  });
  return LEVELS.map((lv) => by[lv]).filter(Boolean);
}

function zhScore(s) {
  s = String(s || "");
  const zh = (s.match(/[\u4e00-\u9fff]/g) || []).length;
  if (zh < 8) return 0;
  return Math.min(6, Math.floor(zh / 12)) + (s.length > 20 ? 1 : 0);
}

function familyScore(list) {
  return (list || []).filter((x) => x && x.word && x.meaning).length;
}

function mergeItem(ds, gk, word) {
  const usageZh = zhScore(gk && gk.usageZh) >= zhScore(ds && ds.usageZh) ? (gk || {}).usageZh : (ds || {}).usageZh;
  const family = familyScore(gk && gk.family) >= familyScore(ds && ds.family) ? (gk || {}).family : (ds || {}).family;
  return {
    usageZh: usageZh || "",
    family: family || [],
    examples: pickExamples((ds || {}).examples, (gk || {}).examples, word)
  };
}

function badStem(ex) {
  const q = String(ex.q || "");
  const lv = String(ex.level || "");
  if (/中考/.test(q) && /^(s1|s2|s3)$/.test(lv)) return true;
  if (/高考/.test(q) && /^(j1|j2)$/.test(lv)) return true;
  if (/最能说明.*已经学会|先看公式，再看例句|课文页码|插图颜色/.test(q)) return true;
  if (q.length < 8) return true;
  return false;
}

function exScore(ex) {
  let n = 2;
  if (badStem(ex)) return -20;
  if (/^(choice|fill|truefalse|rewrite|error)$/.test(ex.type)) n += 1;
  if (ex.explain) n += 1;
  if (ex.type === "choice" && (ex.options || []).length >= 4) n += 2;
  if (ex.q && ex.q.length > 18) n += 1;
  return n;
}

function mergeExercises(dsList, gkList) {
  const pool = [];
  const seen = new Set();
  function add(list, src) {
    (list || []).forEach((ex) => {
      const q = String(ex.q || "").trim();
      const lv = String(ex.level || "");
      if (!q || !lv || seen.has(lv + "|" + q)) return;
      seen.add(lv + "|" + q);
      pool.push(Object.assign({}, ex, { _src: src, _sc: exScore(ex) + (src === "gk" ? 0.2 : 0) }));
    });
  }
  add(gkList, "gk");
  add(dsList, "ds");
  pool.sort((a, b) => b._sc - a._sc);
  const types = ["choice", "fill", "truefalse", "rewrite", "error"];
  const by = { j1: [], j2: [], j3: [], s1: [], s2: [], s3: [] };
  function strip(ex) {
    const { _src, _sc, ...rest } = ex;
    return rest;
  }
  LEVELS.forEach((lv) => {
    const cand = pool.filter((ex) => ex.level === lv && ex._sc >= 0);
    const picked = [];
    const used = new Set();
    types.forEach((t) => {
      const hit = cand.find((ex) => ex.type === t && !used.has(ex.q));
      if (hit) {
        used.add(hit.q);
        picked.push(strip(hit));
      }
    });
    cand.forEach((ex) => {
      if (picked.length >= 18) return;
      if (used.has(ex.q)) return;
      used.add(ex.q);
      picked.push(strip(ex));
    });
    by[lv] = picked.slice(0, Math.max(15, Math.min(18, picked.length)));
  });
  return LEVELS.flatMap((lv) => by[lv]);
}

function mergeGrammar(dsG, gkG) {
  const ds = dsG || {};
  const gk = gkG || {};
  const usage = (gk.usage || "").length >= (ds.usage || "").length ? gk.usage : ds.usage;
  const forms = (gk.forms && gk.forms.length >= (ds.forms || []).length ? gk.forms : ds.forms) || [];
  const notes = (gk.notes && gk.notes.length >= (ds.notes || []).length ? gk.notes : ds.notes) || [];
  const examples = pickExamples(ds.examples, gk.examples, "").map((ex) => ({
    level: ex.level,
    en: ex.sentence,
    cn: ex.trans
  }));
  return {
    key: ds.key || gk.key,
    title: gk.title || ds.title,
    titleEn: gk.titleEn || ds.titleEn,
    usage: usage || "",
    forms,
    notes,
    examples,
    exercises: mergeExercises(ds.exercises, gk.exercises)
  };
}

function mergeMap(dsMap, gkMap) {
  const keys = new Set([...Object.keys(dsMap || {}), ...Object.keys(gkMap || {})]);
  const out = {};
  keys.forEach((k) => {
    out[k] = mergeItem((dsMap || {})[k], (gkMap || {})[k], k);
  });
  return out;
}

function stats(pack) {
  const mins = (pack.grammar || []).map((g) => {
    const c = {};
    LEVELS.forEach((lv) => {
      c[lv] = (g.exercises || []).filter((e) => e.level === lv).length;
    });
    return c;
  });
  const minPer = {};
  LEVELS.forEach((lv) => {
    minPer[lv] = mins.length ? Math.min(...mins.map((m) => m[lv] || 0)) : 0;
  });
  return minPer;
}

function mergeUnit(id) {
  const file = `u${String(id).padStart(2, "0")}.json`;
  const ds = load(DS, file);
  const gk = load(GK, file);
  if (!ds && !gk) return null;
  const grammar = [];
  const n = Math.max((ds && ds.grammar && ds.grammar.length) || 0, (gk && gk.grammar && gk.grammar.length) || 0);
  for (let i = 0; i < n; i++) {
    grammar.push(mergeGrammar(ds && ds.grammar && ds.grammar[i], gk && gk.grammar && gk.grammar[i]));
  }
  const pack = {
    unit: id,
    model: "merged:deepseek-v4-pro+grok-4.6",
    levels: LEVELS,
    vocab: mergeMap(ds && ds.vocab, gk && gk.vocab),
    colloc: mergeMap(ds && ds.colloc, gk && gk.colloc),
    grammar
  };
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, file), JSON.stringify(pack));
  const minPer = stats(pack);
  console.log("merged", file, "vocab", Object.keys(pack.vocab).length, "colloc", Object.keys(pack.colloc).length, "grammar", pack.grammar.length, "minPerLevel", JSON.stringify(minPer));
  return pack;
}

function pad(id) {
  return String(id).padStart(2, "0");
}

function indexPack(pack, id) {
  const per = stats(pack);
  const mins = Object.values(per);
  return {
    id,
    file: `u${pad(id)}.json`,
    vocab: Object.keys(pack.vocab || {}).length,
    colloc: Object.keys(pack.colloc || {}).length,
    grammar: (pack.grammar || []).length,
    minExercises: mins.length ? Math.min(...mins) : 0,
    minPerLevel: per
  };
}

function main() {
  const only = process.env.ONLY_UNIT ? Number(process.env.ONLY_UNIT) : 0;
  const index = {
    levels: LEVELS.map((id) => ({
      id,
      label: { j1: "初一", j2: "初二", j3: "初三", s1: "高一", s2: "高二", s3: "高三" }[id]
    })),
    units: []
  };
  UNITS.forEach((u) => {
    if (!only || u.id === only) {
      const file = `u${pad(u.id)}.json`;
      if (load(DS, file) || load(GK, file)) mergeUnit(u.id);
    }
    const pack = load(OUT, `u${pad(u.id)}.json`);
    if (!pack) return;
    index.units.push(indexPack(pack, u.id));
  });
  fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify(index, null, 2));
  console.log("index units", index.units.length);
}

main();
