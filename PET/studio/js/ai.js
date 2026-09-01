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
        max_tokens: 1600
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
        text = text.replace(/^```json\s*|\s*```$/g, "").trim();
        return JSON.parse(text);
      });
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

  global.PETStudio.aiExtra = extraQuestions;
})(window);
