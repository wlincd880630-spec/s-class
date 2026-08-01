#!/usr/bin/env node
/** 从 extracts 聚合 Wave 4 注册表条目 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXTRACT = path.join(ROOT, "extracts/set-08-27.json");

const META = [
  { id: "G-prepositions", type: "grammar", title: "介词 in / on / at", target_path: "Grammar/KP-介词小升初/" },
  { id: "G-question-words", type: "grammar", title: "特殊疑问词 How/What/Where", target_path: "Grammar/KP-特殊疑问词/" },
  { id: "G-conjunctions", type: "grammar", title: "连词 because / so / but", target_path: "Grammar/KP-连词/" },
  { id: "G-possessive", type: "grammar", title: "物主代词 my/mine · your/yours", target_path: "Grammar/KP-物主代词/" },
  { id: "G-as-as", type: "grammar", title: "同级比较 as…as", target_path: "Grammar/KP-同级比较as/" },
  { id: "G-adverbs-frequency", type: "grammar", title: "频度副词 always/usually/often", target_path: "Grammar/KP-频度副词/" },
  { id: "G-stop-try-doing", type: "grammar", title: "stop / try + to do / doing", target_path: "Grammar/KP-stop-try-doing/" },
  { id: "V-ask-phrases", type: "vocab", title: "ask for / look after / look for", target_path: "primary_vocab/V08-ask-phrases/" },
  { id: "V-synonyms", type: "vocab", title: "同义词替换 · 意思相同", target_path: "primary_vocab/V09-synonyms/" },
  { id: "V-feelings", type: "vocab", title: "情绪形容词 · feel/excited/worried", target_path: "primary_vocab/V10-feelings/" },
];

const refs = JSON.parse(fs.readFileSync(EXTRACT, "utf8"));
const byId = Object.fromEntries(META.map((m) => [m.id, []]));
for (const r of refs) {
  if (byId[r.kp_id]) byId[r.kp_id].push({ set: r.set, num: r.num, stem: r.stem, answer: r.answer });
}

const items = META.map((m) => {
  const psle_refs = (byId[m.id] || []).slice(0, 5);
  return {
    ...m,
    status: "published",
    wave: 4,
    priority: 4,
    psle_ref_count: (byId[m.id] || []).length,
    psle_refs,
  };
});

const wave4 = { version: 1, updated: "2026-08-01", wave: 4, items };
fs.writeFileSync(path.join(ROOT, "wave4.json"), JSON.stringify(wave4, null, 2) + "\n");

const masterPath = path.join(ROOT, "master.json");
const master = JSON.parse(fs.readFileSync(masterPath, "utf8"));
master.waves = [1, 2, 3, 4];
master.updated = "2026-08-01";
const existing = new Set(master.items.map((i) => i.id));
for (const item of items) {
  if (!existing.has(item.id)) master.items.push(item);
}
fs.writeFileSync(masterPath, JSON.stringify(master, null, 2) + "\n");
console.log("Wrote wave4.json + updated master.json (" + master.items.length + " items)");
