#!/usr/bin/env node
/** 从 extracts 聚合 Wave 3 注册表条目 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXTRACT = path.join(ROOT, "extracts/set-08-27.json");

const META = [
  { id: "G-present-continuous-psle", type: "grammar", title: "现在进行时 · 小升初补页", target_path: "Grammar/KP-现在进行时小升初/" },
  { id: "G-present-perfect", type: "grammar", title: "现在完成时 · 入门", target_path: "Grammar/KP-现在完成时/" },
  { id: "G-passive-voice", type: "grammar", title: "被动语态 · 入门", target_path: "Grammar/KP-被动语态/" },
  { id: "G-object-clause", type: "grammar", title: "宾语从句 · 陈述语序", target_path: "Grammar/KP-宾语从句/" },
  { id: "G-like-doing", type: "grammar", title: "like / enjoy / finish + doing", target_path: "Grammar/KP-like-doing/" },
  { id: "G-pronouns-object", type: "grammar", title: "宾格代词 me / him / them", target_path: "Grammar/KP-宾格代词/" },
  { id: "G-some-any-no", type: "grammar", title: "some / any / no", target_path: "Grammar/KP-some-any-no/" },
  { id: "V-family-words", type: "vocab", title: "家庭成员词汇", target_path: "primary_vocab/V05-family-words/" },
  { id: "V-antonyms", type: "vocab", title: "反义词填空", target_path: "primary_vocab/V06-antonyms/" },
  { id: "V-make-let-help", type: "vocab", title: "make / let / help sb do", target_path: "primary_vocab/V07-make-let-help/" },
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
    wave: 3,
    priority: 3,
    psle_ref_count: (byId[m.id] || []).length,
    psle_refs,
  };
});

const wave3 = { version: 1, updated: "2026-08-01", wave: 3, items };
fs.writeFileSync(path.join(ROOT, "wave3.json"), JSON.stringify(wave3, null, 2) + "\n");

const masterPath = path.join(ROOT, "master.json");
const master = JSON.parse(fs.readFileSync(masterPath, "utf8"));
master.waves = [1, 2, 3];
master.updated = "2026-08-01";
const existing = new Set(master.items.map((i) => i.id));
for (const item of items) {
  if (!existing.has(item.id)) master.items.push(item);
}
fs.writeFileSync(masterPath, JSON.stringify(master, null, 2) + "\n");
console.log("Wrote wave3.json + updated master.json (" + master.items.length + " items)");
