# 成都中考定语从句语料库 · 生成说明

## 一键生成

```bash
# 1. 从 HET/ 真题 HTML 提取候选句
python3 Grammar/scripts/build-l13-chengdu-rc-corpus.py

# 2. 使用 DeepSeek 校验并生成教学内容（需 API Key，勿提交到仓库）
export DEEPSEEK_API_KEY='your-key'
python3 Grammar/scripts/enrich-l13-chengdu-rc-corpus.py
```

输出：
- `Grammar/L13-定语从句/data/l13rc-chengdu-zk-raw.json` — 规则提取候选
- `Grammar/L13-定语从句/data/l13rc-chengdu-zk-enriched.json` — 校验后条目
- `Grammar/L13-定语从句/l13rc-chengdu-zk-corpus.js` — 语料中心加载数据

## 数据来源

- `HET/2018成都中考.html` … `HET/2025成都中考.html`
- `2026EXAM/HET/2026成都中考英语真题.html`
- `HET/2026 Mock 1/2026成都英语黑卷.html`
- `HET/2026 Mock 2/2026成都英语白卷.html`

覆盖题型：阅读理解、12选10、6选5、图表阅读、完形填空。
