#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const COVERED = new Set([
  "G-present-simple-3rd", "G-comparative-than", "G-superlative-one-of-most", "G-noun-plural-irregular",
  "G-there-be", "G-past-irregular-verbs", "V-look-forward-to", "V-on-sale-shopping", "G-modals-can-should",
  "G-articles-a-an-the", "G-countable-uncountable", "G-imperative", "G-future-will", "G-exclamatory",
  "G-too-enough", "G-few-little", "V-too-either-also", "V-forget-remember-doing", "G-present-continuous-psle",
  "G-present-perfect", "G-passive-voice", "G-object-clause", "G-like-doing", "G-pronouns-object",
  "G-some-any-no", "V-family-words", "V-antonyms", "V-make-let-help", "G-prepositions", "G-question-words",
  "G-conjunctions", "G-possessive", "G-as-as", "G-adverbs-frequency", "G-stop-try-doing",
  "V-ask-phrases", "V-synonyms", "V-feelings",
]);

const topics = [
  { id: "G-question-tags", re: /反义疑问|tag question|shall we|won't you|isn't it|don't they/i },
  { id: "G-relative-clause", re: /定语从句|relative|who lives|which is|that helps/i },
  { id: "G-both-either-neither", re: /both.*and|either.*or|neither.*nor|两者都|既不/i },
  { id: "G-reflexive-pronouns", re: /反身代词|myself|yourself|himself|herself|themselves/i },
  { id: "G-used-to", re: /used to|be used to|习惯于|过去常常/i },
  { id: "G-want-need-doing", re: /want to|need to|need doing|would like to/i },
  { id: "G-question-order", re: /连词成句|word order|排列|语序/i },
  { id: "G-plural-rules", re: /变复数|libraries|babies|potatoes|以.*结尾/i },
  { id: "V-word-formation", re: /词性转换|word formation|后缀|前缀|careful|carefully|happiness/i },
  { id: "V-hobbies", re: /hobby|collect stamps|interest in|爱好|collecting/i },
  { id: "V-school-places", re: /library|playground|classroom|music room|art room|学校场所/i },
  { id: "V-weather-seasons", re: /weather|season|spring|summer|autumn|winter|天气|季节/i },
  { id: "V-food-drinks", re: /breakfast|lunch|dinner|vegetable|fruit|食物|饮料/i },
  { id: "G-so-such", re: /\bso\s+\w+|such a\b|so that/i },
  { id: "G-gerund-subject", re: /动名词作主语|Swimming is|Reading is/i },
];

const counts = Object.fromEntries(topics.map((t) => [t.id, 0]));
const samples = Object.fromEntries(topics.map((t) => [t.id, []]));

for (let n = 1; n <= 27; n++) {
  const name = n < 10 ? `set_0${n}_typeflow.html` : `set_${n}_typeflow.html`;
  const file = path.join(ROOT, "Psle", name);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(/id="exam-embed">([\s\S]*?)<\/script>/);
  if (!m) continue;
  const data = JSON.parse(m[1]);
  for (const sec of data.sections || []) {
    for (const item of sec.items || []) {
      const blob = JSON.stringify(item);
      for (const t of topics) {
        if (COVERED.has(t.id)) continue;
        if (t.re.test(blob)) {
          counts[t.id]++;
          if (samples[t.id].length < 1) {
            samples[t.id].push({
              set: n,
              num: item.number,
              stem: String(item.stem || "").replace(/<[^>]+>/g, "").slice(0, 90),
            });
          }
        }
      }
    }
  }
}

topics
  .filter((t) => !COVERED.has(t.id))
  .sort((a, b) => counts[b.id] - counts[a.id])
  .forEach((t) => console.log(counts[t.id], t.id, JSON.stringify(samples[t.id][0] || "")));
