#!/usr/bin/env node
/**
 * L09 Page 03 — 6 个教材/中考风格场景 × 每场景 4 个 Veo 分镜 → ffmpeg 拼成无缝循环片。
 * 输出目录：../assets/vertex/l09-page03/
 * 文件：scene-NN-sh01…sh04.mp4 + scene-NN-loop.mp4
 *
 * GCS 默认：gs://project-ec12c6e5-5e03-4771-add-junior-english-db/vertex-veo/l09-page03/
 * 环境变量：L09_PAGE03_VEO_GCS_URI 可覆盖；VERTEX_PROJECT_ID、VERTEX_LOCATION、VEO_MODEL_ID、GOOGLE_ACCESS_TOKEN 同 Page02 脚本。
 *
 * 断点续跑：已存在且大于 1KB 的 scene-NN-shMM.mp4 会跳过；四镜齐则只补拼 loop。
 * 长任务会刷新 access token（每次发起生成、每次轮询前），避免 401。
 */
import fs from "fs";
import path from "path";
import { execFileSync, execSync, spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const L09_ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(L09_ROOT, "assets", "vertex", "l09-page03");

const PROJECT = String(process.env.VERTEX_PROJECT_ID || "project-ec12c6e5-5e03-4771-add").trim();
const LOCATION = String(process.env.VERTEX_LOCATION || "us-central1").trim();
const MODEL = String(process.env.VEO_MODEL_ID || "veo-2.0-generate-001").trim();
const DEFAULT_GCS =
  "gs://project-ec12c6e5-5e03-4771-add-junior-english-db/vertex-veo/l09-page03/";
const STORAGE_URI = String(process.env.L09_PAGE03_VEO_GCS_URI || DEFAULT_GCS).trim();

const CEL =
  "Cel-shaded educational cartoon, bold clean black outlines, soft flat colors, 16:9 landscape, warm cream paper accents, friendly Chinese junior-high ESL textbook style, family-friendly, no subtitles, no readable text, no logos, no watermark. ";

const SCENARIOS = [
  {
    id: "scene-01",
    label: "While 从句·过进 + 主句·一过",
    shots: [
      CEL +
        "SHOT 1 ONLY: evening cartoon highway, family car interior from back seat, parents driving calmly, warm dashboard lights, windshield shows straight road and soft sunset.",
      CEL +
        "SHOT 2 ONLY: different angle—side tracking of same cartoon car on two-lane road, trees along roadside, sky still calm with a few grey clouds building.",
      CEL +
        "SHOT 3 ONLY: exterior wind picks up—trees bend, leaves and dust swirl, clouds roll faster, dramatic but not scary, no people injured.",
      CEL +
        "SHOT 4 ONLY: first heavy rain streaks hit windshield, wipers start moving faster, drivers look alert—storm clearly begins (started).",
    ],
  },
  {
    id: "scene-02",
    label: "主句·过进 + when + 点过",
    shots: [
      CEL +
        "SHOT 1 ONLY: same friendly cartoon car driving at dusk, wide shot from front-three-quarter, wipers off, calm mood.",
      CEL +
        "SHOT 2 ONLY: interior over-shoulder view of road ahead, hands on wheel, subtle motion of driving continues.",
      CEL +
        "SHOT 3 ONLY: sudden strong sideways gust—car slightly tilts cartoon exaggeration, trees whip, sky flashes lighter grey, surprise moment.",
      CEL +
        "SHOT 4 ONLY: rain suddenly sheets down, wipers frantic, tail lights of other cars glow—clear interrupting weather event while driving continues.",
    ],
  },
  {
    id: "scene-03",
    label: "While + 过进 / 主句·一过（公园遇鸟）",
    shots: [
      CEL +
        "SHOT 1 ONLY: teenage boy in navy hoodie walks along sunny park paved path, medium-wide from behind, peaceful.",
      CEL +
        "SHOT 2 ONLY: clearly different camera—mild high angle as boy keeps walking, benches and green trees, still relaxed.",
      CEL +
        "SHOT 3 ONLY: close-up small injured brown bird on ground near path edge, weak wing flutter, not gory, no blood.",
      CEL +
        "SHOT 4 ONLY: boy stops, surprised gentle face, bends slightly toward bird—discovery moment before touching.",
    ],
  },
  {
    id: "scene-04",
    label: "主句·过进 + while + 从句·过进（双线天气）",
    shots: [
      CEL +
        "SHOT 1 ONLY: heavy grey cartoon rain sky, big rain streaks, mood cozy-not-scary, no text.",
      CEL +
        "SHOT 2 ONLY: wet road reflections, cartoon car tires moving through shallow puddles, wipers mid-speed.",
      CEL +
        "SHOT 3 ONLY: interior car passengers relaxed silhouettes, driver concentrates, raindrops on side window bokeh.",
      CEL +
        "SHOT 4 ONLY: rear windshield view of rainy street lights streaking, car still moving—both rain scene and driving feel continuous.",
    ],
  },
  {
    id: "scene-05",
    label: "While + 双过进（妈妈做饭·我做作业）",
    shots: [
      CEL +
        "SHOT 1 ONLY: warm kitchen, mother cartoon character stirring pot steam rising, stove glow, cozy evening.",
      CEL +
        "SHOT 2 ONLY: teenager at desk lamp, papers and pencil, doing homework focused expression, bedroom or dining corner.",
      CEL +
        "SHOT 3 ONLY: stylized vertical split frame—left half kitchen mother cooking motion, right half desk homework motion, same wall clock visible in both halves.",
      CEL +
        "SHOT 4 ONLY: doorway POV showing both rooms at once—both characters still in their continuous actions, same evening light.",
    ],
  },
  {
    id: "scene-06",
    label: "When + 点过 + 主句·过进（铃响·仍在讨论）",
    shots: [
      CEL +
        "SHOT 1 ONLY: classroom cartoon, small group of students around table with exam papers, animated talking gestures, friendly stress.",
      CEL +
        "SHOT 2 ONLY: close-up wall school bell vibrating with cartoon motion lines, ringing moment, no letters on bell.",
      CEL +
        "SHOT 3 ONLY: students look up startled then some point at papers continuing discussion, expressive faces.",
      CEL +
        "SHOT 4 ONLY: wider classroom shot—teacher silhouette at door, clock on wall, students still leaning over papers discussing.",
    ],
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

function veoBaseUrl() {
  return `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}`;
}

async function startGeneration(token, promptText) {
  const url = `${veoBaseUrl()}:predictLongRunning`;
  const body = {
    instances: [{ prompt: String(promptText || "") }],
    parameters: {
      storageUri: STORAGE_URI.endsWith("/") ? STORAGE_URI : `${STORAGE_URI}/`,
      sampleCount: 1,
      aspectRatio: "16:9",
      duration: 6,
      negativePrompt:
        "photorealistic, horror, blood, gore, readable text, watermark, logo, live-action CCTV horror",
    },
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
  if (!res.ok) throw new Error("predictLongRunning " + res.status + " " + JSON.stringify(j));
  const opName = j.name || j.operationName;
  if (!opName) throw new Error("no op " + JSON.stringify(j));
  return opName;
}

async function fetchOperation(token, operationName) {
  const url = `${veoBaseUrl()}:fetchPredictOperation`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "x-goog-user-project": PROJECT,
    },
    body: JSON.stringify({ operationName }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error("fetchPredictOperation " + res.status + " " + JSON.stringify(j));
  return j;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function pollUntilDone(getToken, opName) {
  let last = null;
  for (let i = 0; i < 80; i++) {
    await sleep(15000);
    last = await fetchOperation(getToken(), opName);
    if (last.done === true) return last;
    console.log(new Date().toISOString(), "…", i + 1);
  }
  throw new Error("timeout");
}

function extractGcs(doneBody) {
  const v = (doneBody.response && doneBody.response.videos && doneBody.response.videos[0]) || null;
  const u = v && (v.gcsUri || v.gcs_uri);
  if (!u) throw new Error("no gcs " + JSON.stringify(doneBody).slice(0, 400));
  return u;
}

function tryGsutilCopy(gcsUri, destPath) {
  for (const bin of ["gsutil", "gsutil.cmd"]) {
    const r = spawnSync(bin, ["-q", "cp", gcsUri, destPath], { encoding: "utf8" });
    if (!r.error && r.status === 0) return true;
  }
  try {
    execSync(`gsutil -q cp "${gcsUri}" "${destPath}"`, { encoding: "utf8", shell: true });
    return true;
  } catch (_) {}
  return false;
}

function tryConcatFfmpeg(absPaths, outPath) {
  const listPath = path.join(OUT_DIR, ".concat-temp.txt");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(
    listPath,
    absPaths.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n"),
    "utf8"
  );
  const run = (args) => {
    try {
      execFileSync("ffmpeg", args, { stdio: "inherit" });
      return true;
    } catch (_) {
      return false;
    }
  };
  const common = ["-y", "-f", "concat", "-safe", "0", "-i", listPath];
  if (run([...common, "-c", "copy", outPath])) return true;
  return run([
    ...common,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "22",
    "-preset",
    "fast",
    "-movflags",
    "+faststart",
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    outPath,
  ]);
}

async function runOneShot(getToken, label, prompt) {
  console.log("\n>>>", label);
  const startTok = getToken();
  const op = await startGeneration(startTok, prompt);
  const done = await pollUntilDone(getToken, op);
  if (done.error) throw new Error(JSON.stringify(done.error));
  return extractGcs(done);
}

function fileLooksComplete(p) {
  try {
    const st = fs.statSync(p);
    return st.isFile() && st.size > 1024;
  } catch (_) {
    return false;
  }
}

async function main() {
  if (!STORAGE_URI.startsWith("gs://")) {
    console.error("L09_PAGE03_VEO_GCS_URI 无效");
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const getToken = () => getAccessToken();
  console.log("OUT", OUT_DIR, "GCS", STORAGE_URI);

  for (const sc of SCENARIOS) {
    const locals = [];
    for (let i = 0; i < sc.shots.length; i++) {
      const fn = `${sc.id}-sh${String(i + 1).padStart(2, "0")}.mp4`;
      const dest = path.join(OUT_DIR, fn);
      if (fileLooksComplete(dest)) {
        console.log("skip existing", dest);
        locals.push(path.resolve(dest));
        continue;
      }
      const gcs = await runOneShot(
        getToken,
        `${sc.id} 分镜 ${i + 1}/${sc.shots.length}`,
        sc.shots[i]
      );
      if (!tryGsutilCopy(gcs, dest)) {
        console.error("gsutil fail", gcs, dest);
        process.exit(2);
      }
      console.log("saved", dest);
      locals.push(path.resolve(dest));
    }
    const loopPath = path.join(OUT_DIR, `${sc.id}-loop.mp4`);
    if (fileLooksComplete(loopPath)) {
      console.log("skip existing loop", loopPath);
      continue;
    }
    if (tryConcatFfmpeg(locals, loopPath)) console.log("LOOP OK", loopPath);
    else console.warn("ffmpeg concat failed", sc.id);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
