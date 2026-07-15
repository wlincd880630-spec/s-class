/**
 * worth more than 朗读补丁：合并进 __L07_LOCAL_MANIFEST_EMBED__（线上 CDN 若未刷新主 manifest 仍可朗读）。
 * 须在 manifest.embed.js 之后、lesson-tts-l07-local.js 之前引入。
 */
(function (g) {
  "use strict";
  if (!g) return;
  var embed = g.__L07_LOCAL_MANIFEST_EMBED__;
  if (!embed) return;
  if (!embed.entries) embed.entries = [];

  var seen = Object.create(null);
  for (var i = 0; i < embed.entries.length; i++) {
    var t = String((embed.entries[i] && embed.entries[i].text) || "")
      .replace(/\s+/g, " ")
      .trim();
    if (t) seen[t] = 1;
  }

  var patch = [
    {
      text: "Which is worth more, the mobile phone on the left or the mobile phone on the right?",
      file: "l07_0227_bb88eb71b72056.mp3",
    },
    {
      text: "Which is worth more, the stamp or the coin?",
      file: "l07_0228_2bdc0ec9e33a01.mp3",
    },
    {
      text: "What is worth more than money or prizes?",
      file: "l07_0229_36a90fba92254f.mp3",
    },
    {
      text: "Which book is worth more to an English learner?",
      file: "l07_0230_9a9f7cd517da41.mp3",
    },
    {
      text: "The old stamp on the left is more worth than the silver coin on the right.",
      file: "l07_0231_2df5a07ced6148.mp3",
    },
    {
      text: "The old stamp is more worth than the silver coin.",
      file: "l07_0232_4b06a35e7b7f5b.mp3",
    },
    {
      text: "The old stamp on the left is worth more than the silver coin on the right.",
      file: "l07_0233_be2c27a7453ba5.mp3",
    },
    {
      text: "The old stamp is worth more than the silver coin.",
      file: "l07_0234_ae2adfc6e4b804.mp3",
    },
    {
      text: "Good health is worth more than anything else in the world.",
      file: "l07_0235_9b3a1446f727a9.mp3",
    },
    {
      text: "Good health is worth more than anything else.",
      file: "l07_0236_5fa82116de2ee3.mp3",
    },
    {
      text: "Good health is worth more than money.",
      file: "l07_0237_bfae8e3a56e065.mp3",
    },
    {
      text: "This second-hand dictionary is worth more than that new notebook.",
      file: "l07_0238_4a9da5c0ece83d.mp3",
    },
  ];

  for (var j = 0; j < patch.length; j++) {
    var key = patch[j].text.replace(/\s+/g, " ").trim();
    if (seen[key]) continue;
    seen[key] = 1;
    embed.entries.push({
      text: patch[j].text,
      file: patch[j].file,
      voice: "en-US-JennyNeural",
      provider: "azure",
    });
  }
})(typeof window !== "undefined" ? window : this);
