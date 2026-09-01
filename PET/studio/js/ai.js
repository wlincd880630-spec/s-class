/**
 * DeepSeek：为复习游戏 / 纸质卷加题
 */
(function (global) {
  "use strict";

  var KEY = global.PET_DEEPSEEK_KEY || "sk-daa16008e81843deba6fefe9dce51465";

  function callDeepSeek(prompt) {
    return fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + KEY
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 4096
      })
    })
      .then(function (r) {
        if (!r.ok) throw new Error("API " + r.status);
        return r.json();
      })
      .then(function (data) {
        var text =
          (data.choices &&
            data.choices[0] &&
            data.choices[0].message &&
            data.choices[0].message.content) ||
          "";
        return parseJsonArray(text).map(function (x) {
          var opts = x.options || [];
          var ans = x.answer;
          if (typeof ans === "string" && /^[A-D]$/i.test(ans.trim()) && opts.length) {
            ans = opts[ans.trim().toUpperCase().charCodeAt(0) - 65] || ans;
          }
          return { q: x.q, options: opts, answer: ans, explain: x.explain || "" };
        });
      });
  }

  function parseJsonArray(text) {
    text = String(text || "").replace(/```json|```/g, "").trim();
    var start = text.indexOf("[");
    var end = text.lastIndexOf("]");
    if (start === -1 || end <= start) throw new Error("DeepSeek 未返回数组");
    var arr = JSON.parse(text.slice(start, end + 1));
    if (!Array.isArray(arr)) throw new Error("DeepSeek 返回格式不对");
    return arr;
  }

  function extraQuestions(kind, items, count) {
    count = count || 6;
    var list = (items || [])
      .slice(0, 24)
      .map(function (x) {
        return (x.word || x.phrase || x.title) + " = " + (x.meaning || "");
      })
      .join("\n");
    var prompt =
      "你是 PET / 初中英语老师。根据下列单词/词组/语法点，生成 " +
      count +
      " 道中文界面的复习题。\n类型：" +
      kind +
      "\n词表：\n" +
      list +
      "\n\n只返回 JSON 数组，每项：" +
      '{"q":"题干","options":["A","B","C","D"],"answer":"正确选项原文","explain":"一句中文解析"}' +
      "\noptions 必须包含正确答案。不要 markdown。";
    return callDeepSeek(prompt);
  }

  function examSentences(items, exam) {
    var label = exam === "gaokao" ? "中国高考英语（书面表达 / 阅读理解）" : "中国中考英语";
    var list = (items || [])
      .map(function (x) {
        return (x.word || x.phrase || "") + " = " + (x.meaning || "");
      })
      .filter(Boolean)
      .join("\n");
    var prompt =
      "你是高中英语教师。为下列英语词组各写 1 句" +
      label +
      "风格的独立例句（不要课文原句）。\n要求：\n" +
      "1. 句子必须包含该词组，允许合理变形（如 look forward to → looking forward to）。\n" +
      "2. 高考句可稍长、稍正式；中考句简洁地道。\n" +
      "3. 不要抄阅读课文。\n词组：\n" +
      list +
      "\n\n只返回 JSON 数组，每项：" +
      '{"phrase":"词组原文","sentence":"英文例句","trans":"中文翻译"}' +
      "\n不要 markdown。";
    return fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + KEY
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 4096
      })
    })
      .then(function (r) {
        if (!r.ok) throw new Error("API " + r.status);
        return r.json();
      })
      .then(function (data) {
        var text =
          (data.choices &&
            data.choices[0] &&
            data.choices[0].message &&
            data.choices[0].message.content) ||
          "";
        return parseJsonArray(text).map(function (x) {
          return {
            phrase: x.phrase || x.word || "",
            sentence: x.sentence || x.en || "",
            trans: x.trans || x.cn || ""
          };
        });
      });
  }

  global.PETStudio.aiExtra = extraQuestions;
  global.PETStudio.aiExamSentences = examSentences;
})(window);
