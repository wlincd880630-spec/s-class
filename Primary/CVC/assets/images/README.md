# 图片资源说明

作业页与主站会从本目录读取 **PNG** 图片。若文件夹为空或缺少对应文件，页面会显示 **彩色占位图**（提示路径）；放入正确文件后 **刷新页面** 即可显示真图。

## 单词图（CVC抄写作业.html）

- **目录**：`assets/images/words/`
- **命名**：与单词拼写一致，小写，扩展名 `.png`  
  例：`cat.png`、`sun.png`

## 句子连环图（CVC句子抄写作业.html / sentence.html）

- **目录**：`assets/images/sentences/`
- **命名**：与 `SENTENCES[].imgs` 或主站 `sentenceImagePrompts` 中键名一致，如：  
  `u-4-1.png`、`u-4-2.png`、`u-4-3.png`（每句三张横排）

可从主项目其它副本拷贝 `assets/images`，或使用站点内生成脚本导出 PNG 后放入上述路径。
