import crypto from "crypto";

const phrases = [
  "I was hungry yesterday afternoon, because I hadn't eaten anything for breakfast that morning.",
  "When we met at the museum gate, Tom had been worried for an hour.",
  "We hadn't been ready when the teacher started the quiz.",
  "Had you finished your homework before the lights went out?",
  "Had we been in our seats before the film began?",
  "What had you done before the lights went out?",
  "How long had you been hungry before you ate lunch?",
  "I am hungry, because I haven't eaten anything for breakfast.",
];

const base =
  "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L13/assets/tts-mp3/";

for (const p of phrases) {
  const hash = crypto.createHash("sha1").update(p, "utf8").digest("hex").slice(0, 20);
  const url = base + hash + ".mp3";
  try {
    const r = await fetch(url, { method: "HEAD" });
    console.log(r.ok ? "COS OK" : "COS " + r.status, hash, p.slice(0, 60));
  } catch (e) {
    console.log("ERR", hash, p.slice(0, 60));
  }
}
