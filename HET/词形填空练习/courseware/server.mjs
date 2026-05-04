/**
 * 本地课件服务器：托管静态文件 + 代理 Azure TTS（避免浏览器直连 Speech API 的 CORS 问题）。
 * 用法：node server.mjs
 * 浏览器打开：http://127.0.0.1:3456/
 *
 * 可通过环境变量覆盖密钥与区域：
 *   set AZURE_SPEECH_KEY=你的密钥
 *   set AZURE_SPEECH_REGION=eastus2
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3456;

const AZURE_KEY =
  process.env.AZURE_SPEECH_KEY ||
  "DKRXk8ueSfo5NdIOMqFRTCAfpeGDezJ3Snf5K8gGgtyqxiWdugLzJQQJ99BLACHYHv6XJ3w3AAAYACOGUYP9";
const REGION = process.env.AZURE_SPEECH_REGION || "eastus2";
const TTS_URL = `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function azureTts(ssml) {
  const res = await fetch(TTS_URL, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": AZURE_KEY,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
    },
    body: ssml,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Azure TTS ${res.status}: ${t}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (req.method === "POST" && url.pathname === "/api/tts") {
    let body = "";
    for await (const c of req) body += c;
    let payload;
    try {
      payload = JSON.parse(body || "{}");
    } catch {
      res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "Invalid JSON" }));
      return;
    }
    const text = (payload.text || "").trim();
    const voice = payload.voice || "en-US-JennyNeural";
    if (!text) {
      res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "Missing text" }));
      return;
    }
    const ssml = `<speak version="1.0" xml:lang="en-US"><voice name="${escapeXml(voice)}">${escapeXml(
      text
    )}</voice></speak>`;
    try {
      const audio = await azureTts(ssml);
      res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, max-age=3600",
      });
      res.end(audio);
    } catch (e) {
      console.error("[tts]", e);
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: String(e.message || e) }));
    }
    return;
  }

  let filePath = url.pathname === "/" ? "/index.html" : url.pathname;
  filePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, "");
  const abs = path.join(__dirname, filePath);
  if (!abs.startsWith(__dirname)) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(abs, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(abs);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(
      `端口 ${PORT} 已被占用（EADDRINUSE）。请先结束占用该端口的进程，或设置环境变量 PORT=其他端口 后重试。`
    );
    console.error(`PowerShell 示例：Get-NetTCPConnection -LocalPort ${PORT} | Select-Object OwningProcess`);
  } else {
    console.error(err);
  }
  process.exit(1);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`课件服务: http://127.0.0.1:${PORT}/`);
  console.log(`Azure 区域: ${REGION}（密钥来自环境变量 AZURE_SPEECH_KEY 或内置默认值）`);
});
