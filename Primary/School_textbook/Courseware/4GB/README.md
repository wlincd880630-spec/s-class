# 四年级下册英语单词互动课件

外研版小学英语（三年级起点）四年级下册 · 2026新版

## 文件结构

```
Courseware/
├── index.html          # 导航主页
├── learn.html          # 单词学习
├── review-game1~5.html # 五个复习游戏
├── test.html           # 综合测试
├── assets/
│   ├── css/common.css
│   ├── js/utils.js
│   └── data/data.js    # 109 个单词数据
└── scripts/generate_data.py
```

## 使用方式

1. 用浏览器直接打开 `index.html`（推荐 Chrome / Edge）
2. 朗读与跟读功能需要联网（Azure 语音服务）
3. 麦克风权限用于发音评估

## 数据更新

例句分两类：
- **教材原文**：来自 `教材文字/4下-外研版三起点-新版/` 各 Module 课文
- **拓展语境**：由 Deepseek 生成的真实生活场景句

```bash
# 重新生成拓展例句（需 Deepseek API）
python Courseware/scripts/generate_context_sentences.py

# 重新生成 data.js
python Courseware/scripts/generate_data.py
```

## 单元说明

| 单元 | 主题 | 词数 |
|------|------|------|
| Unit 1 | 职业与家人 | 30 |
| Unit 2 | 情感与生活 | 21 |
| Unit 3 | 才能与表演 | 10 |
| Unit 4 | 植物生长 | 14 |
| Unit 5 | 文化博览与家乡 | 19 |
| Unit 6 | 服装打扮 | 15 |

## 技术栈

- 原生 HTML + CSS + JavaScript
- Font Awesome 6 图标
- Azure Cognitive Services Speech SDK（TTS + 发音评估）
- localStorage 学习进度持久化
- html2canvas 测试报告截图导出
