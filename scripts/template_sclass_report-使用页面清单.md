# 使用 template_sclass_report 发报告的 HTML 页面清单

以下所有页面在「完成/发送报告」时都会通过 **template_sclass_report** 给你发一封统一格式的报告邮件。

---

## AEIS（词汇练习 + 复习页）
- **AEIS/P01/index.html** ~ **AEIS/P34/index.html**（34 个练习页，点「Send Report to Teacher」时发送）
- **AEIS/P01/review.html** ~ **AEIS/P34/review.html**（34 个复习页，离开页面时发送）

## PET（词汇实验室 01–36 + 单元总结 + 单元阅读）
- **PET/01/01.html** ~ **PET/36/36.html**（36 个，完成 Mission 或到「Mission Complete」时发送）
- **PET/Unit1_summary/Unit1_summary.html** ~ **PET/Unit18_summary/Unit18_summary.html**（18 个总结 Quiz 完成时发送）
- **PET/Unit1_passage/Unit1_passage.html** ~ **PET/Unit18_passage/Unit18_passage.html** + **Unit9_passage.html**（19 个阅读页，离开时发送）

## PET-exam（听力 + 阅读）
- **PET-exam/index.html**（离开时发送）
- **PET-exam/Listening/player.html**（提交考试时发送）
- **PET-exam/Reading/player.html**（提交考试时发送）

## TED
- **TED/.../The_Worlds_First_Computer.html**（生成报告时发送）

## FU2（Fitz Cahall 等）
- **FU2/An Interview with Fitz Cahall/index.html**
- **FU2/An Interview with Fitz Cahall/FU201/01.html** ~ **FU210/10.html**
- **FU2/An Interview with Fitz Cahall/Review on Vocab.../index.html, 1.html~8.html**
- **FU2/An Interview with Fitz Cahall/Video Task/Video Comprehension.html, Commitment.html**
- **FU2/Unit 2 words study V1.html**

## FU3（全部子页面）
- **FU3/FU301/FU301.html** ~ **FU3/FU312/** 下各页
- **FU3/FU303/** 下各国家页（Arctic Ocean, Egypt, France, USA 等）
- **FU3/FU3HW/Week15/**（Boston_tour, Tower_Bridge）
- **FU3/FU3HW/Week16/Sanxingdui/Week_16-HW.html**
- **FU3/FU3HW/Week17/Italy_winter_olympics/Week_17-HW.html**
- **FU3/FU3HW/Week18/Verona_Arena.html**
- **FU3/Unit 3 words study V1.html**、**Unit 3 words study V1非语音版.html**

## Encyclopedia
- **encyclopedia/index.html**（完成 Quiz 时发送）

---

**合计：约 217 个 HTML 页面** 都会使用 **template_sclass_report** 发报告（具体数量以项目内实际包含 `SClass.sendReport` 的文件为准）。

确保在 EmailJS 后台已创建模板 ID 为 **template_sclass_report** 的模板，否则这些页面发送时会报错、收不到邮件。
