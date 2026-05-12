#!/usr/bin/env node
/**
 * L09 Page 03 — Vertex Imagen 离线生成 PNG（无 SVG），供 clueboard 页使用。
 * 输出：../assets/l09-page03-corkboard-bg.png
 *       ../assets/l09-page03-manila-card.png（可选小图，拼贴用）
 *
 * 依赖：gcloud auth print-access-token；模型默认 imagen-3.0-fast-generate-001（可用 IMAGEN_MODEL_ID 覆盖）。
 */
import fs from "fs";
import path from "path";
import { execFileSync, execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const L09_ROOT = path.join(__dirname, "..");
const ASSETS = path.join(L09_ROOT, "assets");

const PROJECT = String(process.env.VERTEX_PROJECT_ID || "project-ec12c6e5-5e03-4771-add").trim();
const LOCATION = String(process.env.VERTEX_LOCATION || "us-central1").trim();
const MODEL = String(process.env.IMAGEN_MODEL_ID || "imagen-3.0-fast-generate-001").trim();

const PROMPTS = [
  {
    file: "l09-page03-corkboard-bg.png",
    aspectRatio: "16:9",
    prompt:
      "2D educational illustration for Chinese junior high ESL, bold clean black outlines, cel-shaded flat colors, " +
      "warm cream paper tones #fff9f0, soft orange #f0ad4e and blue #4a90d9 accents, friendly textbook cartoon, slight paper grain, 16:9, no readable text, no letters, no numbers. " +
      "Detective office cork bulletin board wall filling the frame: tan cork texture, scattered round pushpins in red and brass, " +
      "a few blank sticky notes and polaroid corners, string/yarn hint but no text, cozy classroom investigation mood, not scary.",
  },
  {
    file: "l09-page03-manila-card.png",
    aspectRatio: "4:3",
    prompt:
      "2D educational illustration, bold outlines, cel-shaded, warm manila envelope paper #f5e6c8, soft shadows, 4:3 horizontal. " +
      "Single rectangular kraft index card lying on cork board, empty center for UI overlay, rounded corners, two small brass brads in upper corners, no text, no watermark.",
  },
];

function getAccessToken() {
  const env = String(process.env.GOOGLE_ACCESS_TOKEN || "").trim();
  if (env) return env;
  for (const bin of ["gcloud", "gcloud.cmd"]) {
    try {
      return String(execFileSync(bin, ["auth", "print-access-token"], { encoding: "utf8" })).trim();
    } catch (_) {}
  }
  try {
    return String(
      execFileSync(
        "C:\\Users\\wl88i\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd",
        ["auth", "print-access-token"],
        { encoding: "utf8" }
      )
    ).trim();
  } catch (_) {}
  try {
    return String(
      execSync(
        '"C:\\Users\\wl88i\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd" auth print-access-token',
        { encoding: "utf8", shell: true }
      )
    ).trim();
  } catch (_) {}
  console.error("无法取得 access token。");
  process.exit(1);
}

async function imagenPredict(token, promptText, aspectRatio) {
  const url =
    `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}` +
    `/publishers/google/models/${MODEL}:predict`;
  const body = {
    instances: [{ prompt: String(promptText || "") }],
    parameters: { sampleCount: 1, aspectRatio: aspectRatio || "16:9" },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "x-goog-user-project": PROJECT,
    },
    body: JSON.stringify(body),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Imagen ${res.status} ${JSON.stringify(j)}`);
  const pred = (j.predictions && j.predictions[0]) || null;
  const b64 =
    (pred && pred.bytesBase64Encoded) ||
    (pred && pred.bytesBase64) ||
    j.bytesBase64Encoded ||
    null;
  if (!b64) throw new Error("无图像 bytes: " + JSON.stringify(j).slice(0, 400));
  return b64;
}

async function main() {
  fs.mkdirSync(ASSETS, { recursive: true });
  const token = getAccessToken();
  for (const item of PROMPTS) {
    const out = path.join(ASSETS, item.file);
    console.log("生成:", item.file);
    const b64 = await imagenPredict(token, item.prompt, item.aspectRatio);
    fs.writeFileSync(out, Buffer.from(b64, "base64"));
    console.log("已写入:", out);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
