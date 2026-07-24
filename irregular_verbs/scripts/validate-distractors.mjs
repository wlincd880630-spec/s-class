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

for (const filename of ["verbs-data.js", "shared.js", "distractors.js"]) {
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

function signature(value) {
  return letters(value).sort().join("");
}

function isAAA(verb) {
  return (
    forms(verb, "past").length === 1 &&
    forms(verb, "pp").length === 1 &&
    normalize(verb.base) === normalize(verb.past) &&
    normalize(verb.base) === normalize(verb.pp)
  );
}

function checkChoice(question, verb, field, count, label) {
  if (!question) {
    fail(`${label}: question is null`);
    return;
  }
  if (!Array.isArray(question.options) || question.options.length !== count) {
    fail(`${label}: expected ${count} options`);
    return;
  }
  const unique = new Set(question.options.map(normalize));
  if (unique.size !== count) fail(`${label}: options are not unique`);
  const validAnswers = accepted(verb, field);
  const correctCount = question.options.filter((option) => validAnswers.has(normalize(option))).length;
  if (correctCount !== 1) fail(`${label}: expected one correct option, found ${correctCount}`);
  if (!validAnswers.has(normalize(question.correct))) fail(`${label}: invalid correct value`);
  const selfCheck = D.validateQuestion(question, verb, field);
  if (!selfCheck.valid) fail(`${label}: engine self-check failed: ${selfCheck.errors.join("; ")}`);
  try {
    D.assertSingleCorrect(question, verb, field);
  } catch (error) {
    fail(`${label}: assertSingleCorrect threw: ${error.message}`);
  }
}

if (!data || !Array.isArray(data.verbs) || data.verbs.length !== 80) {
  fail(`expected 80 verbs, found ${data?.verbs?.length ?? 0}`);
}
if (!D) fail("window.IrregularVerbsDistractors was not exported");

const realAnswers = [];
for (const verb of data.verbs) {
  for (const field of fields) {
    for (const form of forms(verb, field)) realAnswers.push(form);
  }
}

let choiceCount = 0;
let chineseCount = 0;
let letterCount = 0;

for (const verb of data.verbs) {
  for (const field of fields) {
    const label = `${verb.id}.${field}`;
    const unavailable = verb.id === "can" && field === "pp";
    if (unavailable) {
      if (D.canonical(verb, field) !== null) fail(`${label}: canonical must be null`);
      if (D.createChoiceQuestion({ verb, field }) !== null) fail(`${label}: choice must be null`);
      if (D.createChineseQuestion({ verb, field }) !== null) fail(`${label}: Chinese question must be null`);
      if (D.createLetterQuestion({ verb, field }) !== null) fail(`${label}: letter question must be null`);
      continue;
    }

    const choice = D.createChoiceQuestion({ verb, field, optionCount: 4 });
    checkChoice(choice, verb, field, 4, `${label} choice`);
    choiceCount += 1;

    const chinese = D.createChineseQuestion({ verb, field });
    if (isAAA(verb)) {
      if (chinese !== null) fail(`${label}: AAA Chinese question must be null`);
    } else {
      checkChoice(chinese, verb, field, 2, `${label} Chinese`);
      chineseCount += 1;
      const otherField = field === "past" ? "pp" : "past";
      const otherForms = accepted(verb, otherField);
      if (
        otherForms.size &&
        !otherForms.has(normalize(D.canonical(verb, field))) &&
        !otherForms.has(normalize(chinese.distractors[0]))
      ) {
        fail(`${label}: Chinese question did not prioritize the other form`);
      }
    }

    const letterQuestion = D.createLetterQuestion({ verb, field });
    if (!letterQuestion) {
      fail(`${label}: letter question is null`);
      continue;
    }
    const targetLetters = letters(letterQuestion.target);
    if (letterQuestion.letters.length !== targetLetters.length * 2) {
      fail(`${label}: letter pool is not exactly 2N`);
    }
    if (!letterQuestion.letters.every((letter) => /^[a-z]$/i.test(String(letter)))) {
      fail(`${label}: letter pool contains a non-letter token`);
    }
    if (!D.canSpell(letterQuestion.target, letterQuestion.letters)) {
      fail(`${label}: letter pool cannot spell target`);
    }
    if (!accepted(verb, field).has(normalize(letterQuestion.target))) {
      fail(`${label}: letter target is not correct`);
    }

    // Exact anagrams cannot be separated by any unordered letter pool.
    for (const candidate of realAnswers) {
      if (
        normalize(candidate) === normalize(letterQuestion.target) ||
        letters(candidate).length !== targetLetters.length ||
        signature(candidate) === signature(letterQuestion.target)
      ) {
        continue;
      }
      if (D.canSpell(candidate, letterQuestion.letters)) {
        fail(`${label}: letter pool can also spell ${candidate}`);
        break;
      }
    }
    const letterSelfCheck = D.validateLetterQuestion(letterQuestion, verb, field);
    if (!letterSelfCheck.valid) {
      fail(`${label}: letter self-check failed: ${letterSelfCheck.errors.join("; ")}`);
    }
    letterCount += 1;
  }
}

const be = data.verbs.find((verb) => verb.id === "be");
if (normalize(D.canonical(be, "past")) !== "was") fail("be.past default canonical must be was");
if (normalize(D.canonical(be, "past", { variant: "were" })) !== "were") {
  fail("be.past canonical must support were");
}

const breakVerb = data.verbs.find((verb) => verb.id === "break");
const breakQuestion = D.createChoiceQuestion({ verb: breakVerb, field: "past" });
if (breakQuestion.distractors.join("|") !== "broken|spoke|woke") {
  fail(`break.past ranking mismatch: ${breakQuestion.distractors.join("|")}`);
}

const take = data.verbs.find((verb) => verb.id === "take");
const takeQuestion = D.createChoiceQuestion({ verb: take, field: "pp" });
if (!takeQuestion.distractors.some((option) => normalize(option) === "took")) {
  fail("take.pp must include took");
}

if (failures.length) {
  console.error(`Distractor validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Distractor validation passed: 80 verbs, ${choiceCount} four-option choices, ` +
    `${chineseCount} two-option Chinese questions, ${letterCount} exact-2N letter pools; can.pp skipped.`,
);
