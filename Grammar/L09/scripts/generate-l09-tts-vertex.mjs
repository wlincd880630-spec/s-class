/**
 * 第09讲：批量生成朗读用 MP3，并写入 ../assets/l09-tts-manifest.js
 *
 * 默认使用 Google Cloud Text-to-Speech REST（与 Vertex 同属 GCP 项目即可启用）。
 *   环境变量：GOOGLE_CLOUD_API_KEY — 在 GCP 控制台创建并启用「Cloud Text-to-Speech API」的 API 密钥。
 *   或使用 OAuth：GOOGLE_ACCESS_TOKEN（例如 `gcloud auth print-access-token` 输出，有效期较短）。
 *
 * 占位 / 离线（无密钥时用 ffmpeg 生成约 0.55s 可听提示音 MP3，避免「几乎静音」误判为无声）：
 *   node generate-l09-tts-vertex.mjs --silence
 *
 * 依赖：本机已安装 ffmpeg 且在 PATH 中（仅 --silence 模式需要）。
 */
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const L09_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(L09_ROOT, "assets", "tts-mp3");
const MANIFEST_OUT = path.join(L09_ROOT, "assets", "l09-tts-manifest.js");
/** 推送后课件域名与仓库路径一致时，朗读 MP3 走腾讯 COS（与 Grammar/L01 等同桶前缀）。 */
const COS_TTS_MP3_BASE =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L09/assets/tts-mp3/";

/** 与 lesson-tts-bootstrap.js 中 norm 一致 */
function norm(s) {
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 全站朗读句（含 Page01/03/05/06/08 与讲义；重复句会自动去重） */
const RAW_PHRASES = [
  // Page 01
  "Suspect, what did you do yesterday?",
  "Maria, what did you do yesterday after school?",
  "Tom, what did you do yesterday evening?",

  // Page 03 · ORAL_PRACTICE
  "While we were walking to the bus stop, it started to hail.",
  "We were listening to music when the teacher walked in.",
  "While I was looking for my phone, I found a fifty dollar bill on the bench.",
  "It was getting windy while we were tying up the tent.",
  "While my uncle was repairing the bike, I was cleaning the tools.",
  "When the lights went out, everyone was still chatting and laughing.",

  // Page 05 · SCRIPT
  "Last Wednesday night, I was driving home slowly in heavy rain. I was listening to the weather report when suddenly a dog rushed into the street. While I was braking as hard as I could, my phone rang once. Then I heard a long horn and a crash behind us.",

  // Page 06 · 朗读全文
  "Last Friday night, while Museum Agent Lin was updating the night log, she was drinking tea quietly at her desk. Then the alarm on Level 3 rang twice. She immediately found out that the Star Blue diamond in Hall B was missing. On the way to the back stairs, she came across a half-open toolbox — and a single black hair on its handle.",

  // Page 08 / 讲义 · 知识卡例句
  "We were driving home when the strong winds started.",
  "It was raining hard while we were driving back.",
  "While I was waiting at the bus stop, the sky grew darker and darker.",
  "She was reading a novel when the lights in the library suddenly flickered.",
  "The wind was getting stronger while we were walking along the river.",
  "I was watching the road carefully because the rain was beating against the windshield.",
  "While we were playing football, it started to rain heavily.",
  "I was listening to music when my phone suddenly rang.",
  "He was typing an email when the boss knocked on the door.",
  "We were cooking dinner when someone knocked loudly at the gate.",
  "She was jogging in the park when she heard a long, sharp horn.",
  "They were still discussing the plan when the fire alarm went off.",
  "When he found out the truth, he stayed calm.",
  "While I was walking in the park, I came across an injured bird.",
  "I didn't notice the warning sign until I came across it near the gate.",
  "She realized she was on the wrong bus when the conductor called the next stop.",
  "We heard a strange noise while we were exploring the old house.",
  "He found out the meeting was canceled when he checked his email that morning.",
  "While I was doing my homework, my mother was cooking dinner.",
  "While they were sleeping, a thief broke into the house.",
  "While Dad was repairing the bike, I was holding the flashlight for him.",
  "While the students were writing the test, the teacher was walking around quietly.",
  "While one team was celebrating on the field, the other team was leaving in silence.",
  "While the baby was sleeping, Grandma was knitting beside the window.",

  // 讲义 · 看图写话抢分骨架
  "While I was walking in the park last Sunday, I came across a small bird on the grass.",
  "When I saw it was hurt, I decided to take it to a nearby pet clinic.",
  "While we were waiting in line, I found out that the vet could help wild birds, too.",
  "When we got to the clinic, the assistant was talking to another worried owner.",
  "I was holding the little bird carefully while the vet was examining its wing.",
  "When the doctor finished the check, I felt relieved and thanked him warmly.",
  "It was getting dark when we left the clinic with a small box of medicine.",
  "Last Sunday was busy, but I was glad I was able to help a life in need."
];

function slugForPhrase(phrase) {
  const h = crypto.createHash("sha256").update(norm(phrase), "utf8").digest("hex");
  return "l09-" + h.slice(0, 12);
}

/** 无 GCP 密钥时的占位：短正弦音，便于用扬声器确认「本地 MP3 链路」已接通（正式课请改用 API 合成真人声）。 */
function writeMp3BeepPlaceholder(outPath) {
  const r = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-f",
      "lavfi",
      "-i",
      "sine=frequency=523:sample_rate=24000:duration=0.55",
      "-acodec",
      "libmp3lame",
      "-q:a",
      "5",
      outPath
    ],
    { stdio: "inherit", encoding: "utf8" }
  );
  if (r.status !== 0) {
    throw new Error("ffmpeg 生成占位 MP3 失败，请确认已安装 ffmpeg 并在 PATH 中。");
  }
}

async function synthGoogleCloudTts(text, outPath, apiKey, accessToken) {
  let url = "https://texttospeech.googleapis.com/v1/text:synthesize";
  const headers = { "Content-Type": "application/json" };
  if (apiKey) {
    url += "?key=" + encodeURIComponent(apiKey);
  } else if (accessToken) {
    headers.Authorization = "Bearer " + accessToken;
  } else {
    throw new Error("缺少 GOOGLE_CLOUD_API_KEY 或 GOOGLE_ACCESS_TOKEN");
  }

  const body = {
    input: { text },
    voice: { languageCode: "en-US", name: "en-US-Neural2-J" },
    audioConfig: { audioEncoding: "MP3", speakingRate: 0.92, pitch: 0.0 }
  };

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  const raw = await res.text();
  if (!res.ok) {
    throw new Error("Text-to-Speech HTTP " + res.status + " " + raw.slice(0, 400));
  }
  let json;
  try {
    json = JSON.parse(raw);
  } catch (_) {
    throw new Error("Text-to-Speech 返回非 JSON：" + raw.slice(0, 200));
  }
  if (!json.audioContent) {
    throw new Error("Text-to-Speech 无 audioContent 字段");
  }
  const buf = Buffer.from(json.audioContent, "base64");
  fs.writeFileSync(outPath, buf);
}

function buildUniqueMap() {
  const map = new Map();
  for (const p of RAW_PHRASES) {
    const k = norm(p);
    if (!k) continue;
    if (!map.has(k)) map.set(k, p);
  }
  return map;
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const silenceMode = args.has("--silence");
  const apiKey = (process.env.GOOGLE_CLOUD_API_KEY || "").trim();
  const accessToken = (process.env.GOOGLE_ACCESS_TOKEN || "").trim();

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const unique = buildUniqueMap();
  const manifest = {};

  for (const [key, phrase] of unique) {
    const slug = slugForPhrase(key);
    const abs = path.join(L09_ROOT, "assets", "tts-mp3", slug + ".mp3");
    manifest[key] = COS_TTS_MP3_BASE + slug + ".mp3";

    if (silenceMode) {
      console.log("[beep-placeholder]", slug, key.slice(0, 72) + (key.length > 72 ? "…" : ""));
      writeMp3BeepPlaceholder(abs);
    } else if (apiKey || accessToken) {
      console.log("[tts]", slug, key.slice(0, 72) + (key.length > 72 ? "…" : ""));
      await synthGoogleCloudTts(phrase, abs, apiKey, accessToken);
    } else {
      throw new Error(
        "请设置 GOOGLE_CLOUD_API_KEY（或 GOOGLE_ACCESS_TOKEN）后重试，或加参数 --silence 生成本地提示音占位 MP3。"
      );
    }
  }

  const lines = [
    "/** 第09讲朗读 manifest — 由 scripts/generate-l09-tts-vertex.mjs 生成，请勿手改大段 */",
    '(function () {',
    '  "use strict";',
    "  window.__LESSON_TTS_MANIFEST = Object.assign(window.__LESSON_TTS_MANIFEST || {}, {"
  ];
  const keys = Object.keys(manifest).sort();
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const comma = i < keys.length - 1 ? "," : "";
    lines.push("    " + JSON.stringify(k) + ": " + JSON.stringify(manifest[k]) + comma);
  }
  lines.push("  });", "})();", "");
  fs.writeFileSync(MANIFEST_OUT, lines.join("\n"), "utf8");

  console.log("已写入", path.relative(L09_ROOT, MANIFEST_OUT));
  console.log("MP3 数量:", keys.length, "目录:", path.relative(L09_ROOT, OUT_DIR));
  console.log("manifest 内 URL 已指向腾讯 COS；请将", path.relative(L09_ROOT, OUT_DIR), "同步到桶内同路径。");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
