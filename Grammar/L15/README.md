# L15 · 词性转换与词汇

2018–2026 成都中考真题词汇专讲 · **全库 699 条**（≥500 目标已达成）

## 语料构成

| 分类 | 条数 | 说明 |
|------|------|------|
| 词性转换 | 85 | B 卷 12 选 10 + 后缀/不规则 |
| 动词词组 | 97 | 真题阅读/完形高频 |
| 形名词组 | 54 | 固定表达 |
| 固定搭配 | 70 | collocation |
| 习语/谚语/俚语 | 42 | idiom |
| 熟词僻义 | 45 | polysemy |
| 图表阅读 | 47 | chart |
| Tier 2 | 83 | 真题 Tier2 |
| Tier 3 | 36 | 真题 Tier3 |
| 预测补充 | 140 | 初中应掌握、真题未覆盖 |

## 入口

- 目录：`index.html`
- **全库检索**：`lesson15-page10-vocab-master.html`（搜索 / 分类 / 年份筛选）
- 背诵讲义：`lesson15-page09-handout.html`（全库分表）
- 课堂同步：`lesson15-handout-classroom-full.html`

## 构建

```bash
# 编译主语料库（写入 l15-corpus-pool.js + data/chengdu-exam-vocab-master.json）
node Grammar/scripts/build-l15-master-corpus.mjs

# 生成互动页 01–08、全库页 10、背诵讲义、目录
node Grammar/scripts/generate-l15-lessons.mjs

# 课堂同步讲义
node Grammar/scripts/build-l15-classroom-handout.mjs
```

## Azure TTS

```powershell
$env:AZURE_SPEECH_KEY="你的密钥"
$env:AZURE_SPEECH_REGION="southeastasia"
node Grammar/scripts/download-l15-tts-azure.mjs
```

## 词汇测验（5 种方式）

| 模式 | 说明 | 题量 |
|------|------|------|
| ① 语境填空 | 例句挖空，结合 ctx 选词 | 699 |
| ② 语境释义 | 读 exEn，选中文含义 | 699 |
| ③ 表达匹配 | 中文+语境，选英文表达 | 699 |
| ④ 词性转化 | 括号原形 → 正确变形 | 699 |
| ⑤ 辨义判断 | 熟词僻义 / 语境精确理解 | 699 |

入口：`lesson15-page11-vocab-quiz.html`（可按分类筛选）


| 页 | 文件 | 主题 |
|----|------|------|
| 01 | lesson15-page01-overview.html | 四步判定法 |
| 02 | lesson15-page02-suffix-lab.html | 后缀实验室（-ly / 名物化 / -ous·-ful / -able / 否定前缀 / 不规则） |
| 03 | lesson15-page03-exam-wordbanks.html | 九年真题词形归类（90 空）+ Tier2/3 |
| 04 | lesson15-page04-phrases.html | 词组 + 搭配 |
| 05 | lesson15-page05-idioms.html | 习语 + 僻义 |
| 06 | lesson15-page06-chart-vocab.html | 图表词汇 |
| 07 | lesson15-page07-gap-predict.html | 缺口 + 预测 |
| 08 | lesson15-page08-quiz.html | 热身 + 五种测验入口 |
| 09 | lesson15-page11-vocab-quiz.html | **全库测验 · 5 模式 × 699 题** |
| 10 | lesson15-page10-vocab-master.html | 全库检索 |
| 11 | lesson15-handout-classroom-full.html | 课堂同步填空 |
| 12 | lesson15-page09-handout.html | 背诵全库表 |
