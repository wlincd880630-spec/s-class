#!/usr/bin/env node
/**
 * Verb Atlas 数据与页面静态校验。
 * 用法：
 *   node irregular_verbs/scripts/validate-module.mjs
 *   node irregular_verbs/scripts/validate-module.mjs --online
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const ONLINE = process.argv.includes("--online");
const REQUIRED_PAGES = [
  "index.html",
  "learn.html",
  "games/index.html",
  "games/game1-triple-match.html",
  "games/game2-listen-pick.html",
  "games/game3-sentence-gap.html",
  "games/game4-time-tunnel.html",
  "games/game5-memory-flip.html",
  "games/game6-base-past.html",
  "games/game7-base-participle.html",
  "games/game8-chinese-form.html",
  "games/game9-letter-sort.html",
  "games/game10-form-identity.html",
];

function loadData() {
  const context = { window: {} };
  vm.runInNewContext(
    fs.readFileSync(path.join(ROOT, "verbs-data.js"), "utf8"),
    context,
  );
  return context.window.IRREGULAR_VERBS_DATA;
}

function firstForms(value) {
  return String(value || "")
    .split(/\s*\/\s*/)
    .map((part) => part.trim())
    .filter((part) => part && part !== "—");
}

function escapeRe(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function presentForms(verb) {
  if (verb.id === "be") return ["am", "is", "are", "be"];
  if (verb.id === "have") return ["have", "has"];
  if (verb.id === "do") return ["do", "does"];
  if (verb.id === "can") return ["can"];
  const base = verb.base;
  const third = /[^aeiou]y$/i.test(base)
    ? `${base.slice(0, -1)}ies`
    : /(?:o|s|x|z|ch|sh)$/i.test(base)
      ? `${base}es`
      : `${base}s`;
  return [base, third];
}

function containsAny(sentence, forms) {
  return forms.some((form) => new RegExp(`\\b${escapeRe(form)}\\b`, "i").test(sentence));
}

function validateVerb(verb, index, failures) {
  const label = `verbs[${index}] ${verb?.id || "unknown"}`;
  for (const field of ["id", "base", "past", "pp", "cn", "ipa"]) {
    if (typeof verb?.[field] !== "string" || !verb[field].trim()) {
      failures.push(`${label}: 缺少 ${field}`);
    }
  }
  for (const key of ["verb", "present", "past", "perfect"]) {
    const url = verb?.images?.[key];
    if (!/^https:\/\/.+\/images-v2\/.+\.webp$/.test(url || "")) {
      failures.push(`${label}: images.${key} 不是新版 WebP COS URL`);
    }
  }
  for (const key of ["present", "past", "perfect"]) {
    const example = verb?.examples?.[key];
    if (!example?.en || !example?.cn || !example?.tense || !example?.level) {
      failures.push(`${label}: examples.${key} 不完整`);
    }
  }

  if (!containsAny(verb.examples.present.en, presentForms(verb))) {
    failures.push(`${label}: 一般现在时例句未使用目标动词`);
  }
  if (!containsAny(verb.examples.past.en, firstForms(verb.past))) {
    failures.push(`${label}: 一般过去时例句未使用过去式`);
  }
  if (verb.id === "can") {
    if (!/\bhas been able to\b/i.test(verb.examples.perfect.en)) {
      failures.push(`${label}: can 的完成意义应使用 has been able to`);
    }
  } else if (!containsAny(verb.examples.perfect.en, firstForms(verb.pp))) {
    failures.push(`${label}: 现在完成时例句未使用过去分词`);
  }
}

async function checkImages(data, failures) {
  const urls = data.verbs.flatMap((verb) => Object.values(verb.images));
  const batches = [];
  for (let index = 0; index < urls.length; index += 16) {
    batches.push(urls.slice(index, index + 16));
  }
  for (const batch of batches) {
    const results = await Promise.all(
      batch.map(async (url) => {
        try {
          const response = await fetch(url, { method: "HEAD" });
          return response.ok && /image\/webp/i.test(response.headers.get("content-type") || "")
            ? null
            : `${response.status} ${url}`;
        } catch (error) {
          return `${error.message} ${url}`;
        }
      }),
    );
    failures.push(...results.filter(Boolean));
  }
}

async function main() {
  const failures = [];
  const data = loadData();
  if (!data || !Array.isArray(data.verbs)) {
    throw new Error("无法载入 IRREGULAR_VERBS_DATA");
  }
  if (data.verbs.length !== 80) {
    failures.push(`词数应为 80，实际 ${data.verbs.length}`);
  }
  const ids = new Set();
  data.verbs.forEach((verb, index) => {
    if (ids.has(verb.id)) failures.push(`重复 id：${verb.id}`);
    ids.add(verb.id);
    validateVerb(verb, index, failures);
  });
  for (const page of REQUIRED_PAGES) {
    if (!fs.existsSync(path.join(ROOT, page))) failures.push(`缺少页面：${page}`);
  }
  if (ONLINE) await checkImages(data, failures);

  if (failures.length) {
    console.error(`校验失败（${failures.length}）：`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log(
    `校验通过：80 个动词、240 条例句、13 个页面${ONLINE ? "、320 张 COS WebP" : ""}。`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
