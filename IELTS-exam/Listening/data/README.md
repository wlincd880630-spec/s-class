# 听力题目数据格式说明

播放器 `player.html` 从本目录加载 `*_Listening.json`，建议数据按以下规范编写，以便播放器逻辑简单、少分支。

## 文件命名

- `剑桥雅思真题{书号}_Test{套号}_Listening.json`  
- 例如：`剑桥雅思真题11_Test1_Listening.json`

## 顶层结构

```json
{
  "metadata": { "book": "11", "test": "1", "module": "Listening", "type": "Question_Paper" },
  "sections": [
    {
      "section_number": 1,
      "elements": [ ... ]
    }
  ]
}
```

## 元素 (elements) 类型与 content 约定

| type | content 推荐格式 | 说明 |
|------|------------------|------|
| `heading` | 字符串 | SECTION 标题或小题标题。可选 `role`：`"topic"`=大标题（居中），`"sub"`=小标题（左对齐）；不写则按「本 Section 第一个非 SECTION 标题为大标题」推断。 |
| `instruction` | 字符串，多行用 `\n` | 可拆成多行展示；行间距由 CSS 控制 |
| `text` | 字符串 | 纯说明/Example，支持 `\n`，Example 后换行 |
| `question_block` | 题干字符串 + 可选 `options` 数组 | 单选题/多选 |
| `table` | **推荐** 见下表 | 表格统一用 `headers`+`rows` 或纯字符串，避免键值对形式 |
| `list` | 字符串数组 | 每项可为「题号+空格+内容」或含 `....................` 的填空 |
| `map` | `{ "image": "文件名", "choices": [...] }` | 地图题 |

### table 的 content 规范（推荐）

- **标准表格**（唯一推荐的对象形式）：  
  `{ "headers": ["列名1", "列名2", ...], "rows": [ { "列名1": "单元格", "列名2": "..." }, ... ] }`  
  单元格内可含 `....................` 表示填空，题号由播放器从占位符解析。
- **纯文本/选项块**：`content` 直接为字符串（如多行 `"A ...\nB ..."`），播放器按段落与填空解析。

旧数据中「键值对」形式的 table（如 `{"Subject of drawing": "line1\nline2", "Change to be made": "..."}`）可用脚本统一转换为 `headers`+`rows`，见根目录 `normalize-listening-json.js`。

## 填空与题号

- 填空统一用连续点表示：`....................`，题号写在占位符或题号后（如 `7. Paxton ....................`）。
- 题号仅在输入框的 placeholder 中展示，不重复出现在正文里。

## 其他

- 行间距、大标题居中、副标题左对齐、Example 换行、以 `–` 开头的子项缩进等均由播放器 CSS/JS 处理，数据只需提供正确换行与结构。
