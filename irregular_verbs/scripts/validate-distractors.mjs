#!/usr/bin/env node
/**
 * Exhaustive validation for the shared distractor and letter-pool engine.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const context = { window: {} };

for (const filename of ["verbs-data.js", "pdf-examples-data.js", "shared.js", "distractors.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, filename), "utf8"), context, {
    filename,
  });
}

const data = context.window.IRREGULAR_VERBS_DATA;
const D = context.window.IrregularVerbsDistractors;
const failures = [];
const fields = ["past", "pp"];

function fail(message) {
  failures.push(message);
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function forms(verb, field) {
  if (verb.id === "can" && field === "pp") return [];
  return String(verb[field] ?? "")
    .split(/\s*\/\s*/)
    .map((part) => part.trim())
    .filter((part) => part && part !== "—");
}

function accepted(verb, field) {
  return new Set(forms(verb, field).map(normalize));
}

function letters(value) {
  return String(value ?? "").toLowerCase().match(/[a-z]/g) ?? [];
}

function looksNear(target, option) {
  const a = normalize(target);
  const b = normalize(option);
  if (a[0] !== b[0]) return Math.abs(a.length - b.length) <= 1;
  return Math.abs(a.length - b.length) <= 2;
}

function checkChoice(question, verb, field, count, label) {
  if (!question) {
    fail(`${label}: question is null`);
    return;
  }
  if (!Array.isArray(question.options) || question.options.length !== count) {
    fail(`${label}: expected ${count} options, got ${question.options?.length ?? 0}`);
    return;
  }
  const unique = new Set(question.options.map(normalize));
  if (unique.size !== count) fail(`${label}: options are not unique`);
  const validAnswers = accepted(verb, field);
  const correctCount = question.options.filter((option) => validAnswers.has(normalize(option))).length;
  if (correctCount !== 1) fail(`${label}: expected one correct option, found ${correctCount}`);
  if (!validAnswers.has(normalize(question.correct))) fail(`${label}: invalid correct value`);
  const invented = question.distractors.filter((option) => !validAnswers.has(normalize(option)));
  if (invented.length < Math.min(2, count - 1)) {
    fail(`${label}: expected highly confusing distractors`);
  }
  question.distractors.forEach((option) => {
    const isRealForm = data.verbs.some((item) =>
      ["base", "past", "pp"].some((key) => forms(item, key === "base" ? "past" : key).includes(option) || item.base === option),
    );
    if (!isRealForm && !looksNear(question.correct, option) && normalize(option)[0] !== normalize(question.correct)[0]) {
      fail(`${label}: distractor ${option} is not near ${question.correct}`);
    }
  });
  const selfCheck = D.validateQuestion(question, verb, field);
  if (!selfCheck.valid) fail(`${label}: engine self-check failed: ${selfCheck.errors.join("; ")}`);
}

if (!data || !Array.isArray(data.verbs) || data.verbs.length !== 80) {
  fail(`expected 80 verbs, found ${data?.verbs?.length ?? 0}`);
}
if (!D) fail("window.IrregularVerbsDistractors was not exported");

let choiceCount = 0;
let chineseCount = 0;
let gapCount = 0;
let letterCount = 0;
let identityCount = 0;

for (const verb of data.verbs) {
  for (const field of fields) {
    const label = `${verb.id}.${field}`;
    const unavailable = verb.id === "can" && field === "pp";
    if (unavailable) {
      if (D.canonical(verb, field) !== null) fail(`${label}: canonical must be null`);
      if (D.createChoiceQuestion({ verb, field }) !== null) fail(`${label}: choice must be null`);
      if (D.createChineseQuestion({ verb, field, optionCount: 4 }) !== null) {
        fail(`${label}: Chinese question must be null`);
      }
      if (D.createLetterQuestion({ verb, field, mode: "double" }) !== null) {
        fail(`${label}: letter question must be null`);
      }
      continue;
    }

    const choice = D.createChoiceQuestion({ verb, field, optionCount: 4, excludePrompt: true });
    checkChoice(choice, verb, field, 4, `${label} choice`);
    choiceCount += 1;

    const chinese = D.createChineseQuestion({ verb, field, optionCount: 4 });
    if (chinese) {
      checkChoice(chinese, verb, field, 4, `${label} Chinese`);
      chineseCount += 1;
    }

    const gap = D.createGapQuestion({ verb, field });
    checkChoice(gap, verb, field, 5, `${label} gap`);
    gapCount += 1;

    for (const mode of ["free", "double", "sort"]) {
      const letterQuestion = D.createLetterQuestion({ verb, field, mode });
      if (!letterQuestion) {
        fail(`${label} ${mode}: letter question is null`);
        continue;
      }
      const targetLetters = letters(letterQuestion.target);
      if (mode === "free" && letterQuestion.letters.length !== 0) {
        fail(`${label} free: must hide letter pool`);
      }
      if (mode === "sort" && letterQuestion.letters.slice().sort().join("") !== targetLetters.slice().sort().join("")) {
        fail(`${label} sort: pool is not an anagram`);
      }
      if (mode === "double" && letterQuestion.letters.length !== targetLetters.length * 2) {
        fail(`${label} double: letter pool is not exactly 2N`);
      }
      if (mode !== "free" && !D.canSpell(letterQuestion.target, letterQuestion.letters)) {
        fail(`${label} ${mode}: letter pool cannot spell target`);
      }
      const letterSelfCheck = D.validateLetterQuestion(letterQuestion, verb, field);
      if (!letterSelfCheck.valid) {
        fail(`${label} ${mode}: letter self-check failed: ${letterSelfCheck.errors.join("; ")}`);
      }
      letterCount += 1;
    }

    const identity = D.createIdentityQuestion({ verb, field, levelId: "j1" });
    if (!identity) {
      fail(`${label}: identity question is null`);
    } else {
      if (!identity.baseOptions.includes(verb.base)) fail(`${label}: identity missing base`);
      if (!identity.meaningOptions.includes(verb.cn)) fail(`${label}: identity missing meaning`);
      if (identity.baseOptions.length !== 4) fail(`${label}: identity base options`);
      if (identity.meaningOptions.length !== 4) fail(`${label}: identity meaning options`);
      identityCount += 1;
    }
  }
}

const hang = data.verbs.find((verb) => verb.id === "hang");
const hangQuestion = D.createChoiceQuestion({ verb: hang, field: "past", optionCount: 4, excludePrompt: true });
if (normalize(hangQuestion.correct) !== "hung") fail("hang.past correct must be hung");
hangQuestion.distractors.forEach((option) => {
  if (!/^h[a-z]{2,4}$/.test(normalize(option))) {
    fail(`hang.past distractor is not a hang-family lookalike: ${option}`);
  }
});

const be = data.verbs.find((verb) => verb.id === "be");
if (normalize(D.canonical(be, "past")) !== "was") fail("be.past default canonical must be was");
if (normalize(D.canonical(be, "past", { variant: "were" })) !== "were") {
  fail("be.past canonical must support were");
}

if (failures.length) {
  console.error(`Distractor validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Distractor validation passed: 80 verbs, ${choiceCount} four-option choices, ` +
    `${chineseCount} Chinese questions, ${gapCount} gap questions, ` +
    `${letterCount} letter pools, ${identityCount} identity questions; can.pp skipped.`,
);
