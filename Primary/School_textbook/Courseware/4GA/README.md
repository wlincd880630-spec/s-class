# 四年级上册英语单词互动课件

外研版小学英语（三年级起点）四年级上册 · 新版

## 文件结构

```
Courseware/4GA/
├── index.html          # 导航主页
├── learn.html          # 单词学习
├── review-game1~6.html # 六个复习游戏
├── test.html           # 综合测试
├── assets/
│   ├── css/common.css
│   ├── js/utils.js
│   └── data/data.js    # 153 个单词数据
└── scripts/
    ├── generate_data.py
    ├── generate_textbook_sentences.py
    ├── generate_phonemes.py
    └── generate_context_sentences.py
```

## 使用方式

1. 用浏览器直接打开 `index.html`（推荐 Chrome / Edge）
2. 朗读与跟读功能需要联网（Azure 语音服务）
3. 麦克风权限用于发音评估

## 数据更新

```bash
# 从教材文字提取原句
python Courseware/4GA/scripts/generate_textbook_sentences.py

# 生成拓展例句（需 Deepseek API）
python Courseware/4GA/scripts/generate_context_sentences.py

# 生成音素拆分（需 Deepseek API）
python Courseware/4GA/scripts/generate_phonemes.py

# 重新生成 data.js
python Courseware/4GA/scripts/generate_data.py
```

## 单元说明

| 单元 | 主题 | 词数 |
|------|------|------|
| Unit 1 | 我爱运动 | 29 |
| Unit 2 | 在家帮忙 | 37 |
| Unit 3 | 天气怎么样 | 21 |
| Unit 4 | 美妙的季节 | 7 |
| Unit 5 | 出发吧 | 26 |
| Unit 6 | 找到你的路 | 33 |

## 技术栈

- 原生 HTML + CSS + JavaScript
- Font Awesome 6 图标
- Azure Cognitive Services Speech SDK（TTS + 发音评估）
- localStorage 学习进度持久化
- html2canvas 测试报告截图导出
