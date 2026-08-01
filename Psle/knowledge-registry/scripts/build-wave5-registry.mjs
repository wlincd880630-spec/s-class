#!/usr/bin/env node
/** 从 extracts 聚合 Wave 5 注册表条目 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXTRACT = path.join(ROOT, "extracts/set-08-27.json");

const META = [
  { id: "G-plural-rules", type: "grammar", title: "名词规则复数 · libraries/babies", target_path: "Grammar/KP-规则复数/" },
  { id: "G-question-tags", type: "grammar", title: "反义疑问句 · Let's/shall we", target_path: "Grammar/KP-反义疑问句/" },
  { id: "G-relative-clause", type: "grammar", title: "定语从句 · who/which/that 入门", target_path: "Grammar/KP-定语从句/" },
  { id: "G-both-either-neither", type: "grammar", title: "both…and / either…or", target_path: "Grammar/KP-both-either/" },
  { id: "G-reflexive-pronouns", type: "grammar", title: "反身代词 myself/yourself", target_path: "Grammar/KP-反身代词/" },
  { id: "G-so-such", type: "grammar", title: "so…that / such…that", target_path: "Grammar/KP-so-such/" },
  { id: "G-want-need-doing", type: "grammar", title: "want to / need doing", target_path: "Grammar/KP-want-need/" },
  { id: "V-word-formation", type: "vocab", title: "词性转换 careful/carefully", target_path: "primary_vocab/V11-word-formation/" },
  { id: "V-school-places", type: "vocab", title: "学校场所词汇 library/playground", target_path: "primary_vocab/V12-school-places/" },
  { id: "V-weather-seasons", type: "vocab", title: "天气与季节 sunny/winter", target_path: "primary_vocab/V13-weather-seasons/" },
];

const refs = JSON.parse(fs.readFileSync(EXTRACT, "utf8"));
const byId = Object.fromEntries(META.map((m) => [m.id, []]));
for (const r of refs) {
  if (byId[r.kp_id]) byId[r.kp_id].push({ set: r.set, num: r.num, stem: r.stem, answer: r.answer });
}

const items = META.map((m) => ({
  ...m,
  status: "published",
  wave: 5,
  priority: 5,
  psle_ref_count: (byId[m.id] || []).length,
  psle_refs: (byId[m.id] || []).slice(0, 5),
}));

fs.writeFileSync(path.join(ROOT, "wave5.json"), JSON.stringify({ version: 1, updated: "2026-08-01", wave: 5, items }, null, 2) + "\n");

const masterPath = path.join(ROOT, "master.json");
const master = JSON.parse(fs.readFileSync(masterPath, "utf8"));
master.waves = [1, 2, 3, 4, 5];
master.updated = "2026-08-01";
const existing = new Set(master.items.map((i) => i.id));
for (const item of items) {
  if (!existing.has(item.id)) master.items.push(item);
}
fs.writeFileSync(masterPath, JSON.stringify(master, null, 2) + "\n");
console.log("Wrote wave5.json + updated master.json (" + master.items.length + " items)");
