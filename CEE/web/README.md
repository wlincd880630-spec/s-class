# 高三英语 · 完形填空与词形变化 练习页

## 页面结构

- **index.html**：首页，三个模块（阅读 / 完形填空 / 词形变化填空），点击试卷编号进入对应做题页。
- **cloze_player.html**：完形填空单页，支持 `?paper=01` 等参数。
- **wordform_player.html**：词形填空单页，支持 `?paper=01` 等参数；部分空有所给词提示、部分无提示。

## 功能

- **做题阶段**：完形填空（14 分钟限时，满 10 分钟可提交）/ 词形变化填空（10 分钟限时，满 7 分钟可提交）；左侧文章、右侧选项；选后左侧自动补全。
- **答案解析**：原文中用颜色区分学生答案正误（绿/红），展示解析、考点、补充；**点击文中任意词汇**可调用 DeepSeek 查**标准词义**、**本文语境词义**、相关用法拓展与例句，并支持 Azure 词汇/例句发音。
- **解析 PDF**：解析阶段可「导出解析 PDF」，内容含全部题目解析，以及约 30 条词汇/词组/固定搭配/固定表达（**原型词条** + 句中语法用法 + 中英释义 + DeepSeek 例句）；短文中彩色高亮对应词形；词汇精讲部分单独换页。
- **朗读与翻译**：每句 Azure TTS 发音、学生录音朗读与翻译，提交后 DeepSeek 评价（发音分 + 翻译评价与标准译文）。
- **报告**：完成后通过 EmailJS 发送报告（格式参照 s-class，含姓名、得分、时长等）。

## 使用前准备

1. **数据**：将 `enriched_questions` 目录放在与 `web` 同级（即 `CEE/enriched_questions/`），内含 `01.json`～`45.json`。若已有总库 `english_questions_db_with_answers.json` 或 `english_questions_db.json`，可运行项目根目录下：
   ```bash
   python export_papers_to_enriched.py
   ```
   自动按 paper_id 导出到 `enriched_questions/`。
2. **本地服务器**：因浏览器限制，需通过 HTTP 打开页面并请求 JSON。在项目根目录运行：
   ```bash
   cd d:\2026\CEE
   python -m http.server 8080
   ```
   浏览器访问：`http://localhost:8080/web/index.html`
3. **登录名**：页面会读取 `localStorage` 的 `authing-user` 或 `current-user` 显示姓名；若与 s-class 共用，登录后即可显示。
4. **预生成词汇包（可选/维护用）**：解析 PDF 优先读取各卷 JSON 内的 `vocab_pack`。若需全量重新生成：
   ```bash
   node CEE/web/generate_vocab_packs.js --concurrency=3
   # 强制重生成：加 --force；指定试卷：--only=09,16
   ```

## 配置（按需修改）

- **Azure 语音**：在 `cloze_player.html`、`wordform_player.html` 内修改 `AZURE_KEY`、`AZURE_REGION`（TTS/STT）。
- **DeepSeek**：在上述两个 player 内修改 `DEEPSEEK_KEY`（翻译、朗读评价、取词释义）。
- **EmailJS**：在上述两个 player 内修改 `EMAILJS_PUBLIC`、`EMAILJS_SERVICE`、`EMAILJS_TEMPLATE`（报告模板建议与 s-class 一致，如 `template_zso8ebh`）。

## 自适应说明

页面使用 Tailwind 响应式布局（如 `lg:grid-cols-2`），在手机端为单列、平板与桌面为双列，支持多终端使用。
