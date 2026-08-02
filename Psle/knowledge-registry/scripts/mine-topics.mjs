#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const topics = [
  { id: "G-prepositions", re: /介词|preposition|in the morning|on Monday|at home|look at|listen to/i },
  { id: "G-question-words", re: /how often|how long|how many|how much|how old|疑问词|特殊疑问/i },
  { id: "G-conjunctions", re: /because|so that|although|连词|both.*and|either.*or|neither.*nor/i },
  { id: "G-possessive", re: /所有格|possessive|mine\b|yours\b|hers\b|ours\b|名词性物主/i },
  { id: "G-as-as", re: /as\s+\w+\s+as|同级比较|as tall as/i },
  { id: "G-question-tags", re: /反义疑问|tag question|shall we|won't you|isn't it/i },
  { id: "G-adverbs-frequency", re: /always|usually|often|sometimes|never|频度副词/i },
  { id: "G-stop-doing", re: /stop to|stop doing|try to|try doing/i },
  { id: "G-ask-phrases", re: /ask for|look after|look for|take care of|固定搭配|短语动词/i },
  { id: "G-relative-clause", re: /定语从句|relative clause|who lives|which is/i },
  { id: "V-synonyms", re: /同义词|synonym|意思相同|意思相近/i },
  { id: "V-word-formation", re: /词性转换|word formation|后缀|前缀|careful|carefully/i },
  { id: "V-feelings", re: /feel\b|excited|worried|nervous|情绪|感受/i },
  { id: "V-hobbies", re: /hobby|collect|stamp|interest in|爱好/i },
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
        if (t.re.test(blob)) {
          counts[t.id]++;
          if (samples[t.id].length < 2) {
            samples[t.id].push({
              set: n,
              num: item.number,
              stem: String(item.stem || "").replace(/<[^>]+>/g, "").slice(0, 80),
            });
          }
        }
      }
    }
  }
}

topics
  .sort((a, b) => counts[b.id] - counts[a.id])
  .forEach((t) => console.log(counts[t.id], t.id, JSON.stringify(samples[t.id][0] || "")));
