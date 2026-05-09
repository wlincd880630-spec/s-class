"""Patch Psle set_05_typeflow.html exam-embed JSON."""
import json
import re

path = r"d:\s-class\Psle\set_05_typeflow.html"
html = open(path, encoding="utf-8").read()
m = re.search(r'(<script type="application/json" id="exam-embed">)(.+?)(</script>)', html, re.DOTALL)
if not m:
    raise SystemExit("embed not found")
prefix, raw_json, suffix = m.group(1), m.group(2), m.group(3)
data = json.loads(raw_json)

cloze = data["sections"][2]
reading = data["sections"][3]

for it in cloze["items"]:
    if it["number"] == "2":
        it["options"]["D"] = "program"
        it["teaching"]["explanation_md"] = (
            '本题考查名词词义辨析。根据上下文，`"Happy Farm" is a computer __.` 意为'
            '“‘开心农场’是一款电脑……”。结合网游语境，它是一款电脑“游戏”（game），选项 B 正确。'
            '选项 D 设计为 program（程序），与 game 区分，避免重复选项干扰。'
            '选项 C sport（体育运动）偏重体能项目；选项 A form（形式）不切题。故选 B。'
        )
        # simplify knowledge/socratic if they mention duplicate - optional skip
    if it["number"] == "4":
        it["options"] = {"A": "did", "B": "do", "C": "does", "D": "doing"}
        it["teaching"]["correct_answer"] = "D"
        it["teaching"]["explanation_md"] = (
            "本题考查介词 after 后的动词形式。`after` 作介词时，其后若接动词，须用动名词（-ing）。"
            "句意为“每天晚上做完作业之后，我打开电脑……”，故应填 doing（do one's homework 的动名词形式）。"
            "选项 A did、B do、C does 均不能直接跟在介词 after 后作宾语。正确答案为 D。"
        )
        it["teaching"]["knowledge_expansion_md"] = (
            "### 介词后跟动名词 (Gerund)\n\n"
            "介词（如 after, before, without, by）后的动词须用 -ing 形式。\n\n"
            "* `After finishing my homework, I watched TV.`\n"
            "* 本题：`Every night after doing my homework, ...`\n"
        )
        # Trim socratic to match - replace first track only
        it["teaching"]["socratic_tracks"] = [
            {
                "title": "介词 + doing",
                "steps": [
                    {
                        "question": "`after` 后面若接动词，应使用什么形式？",
                        "hint": "介词后面需要名词性成分，动词要变为动名词。",
                        "takeaway": "after doing my homework 符合语法。",
                    },
                    {
                        "question": "四个选项中哪一个为动名词？",
                        "hint": "doing 是 do 的 -ing 形式。",
                        "takeaway": "选 D。",
                    },
                ],
            }
        ]

for it in reading["items"]:
    if it["number"] == "8":
        it["teaching"]["correct_answer"] = "B"
        it["teaching"]["explanation_md"] = (
            "本题为细节推断题。题干问小红擅长什么。原文并未提到唱歌跳舞；"
            "她在回忆周末活动时写道：周一打篮球、周二排球、周三网球、周四乒乓球、周五喜欢踢足球，均为球类活动，"
            "可概括为 playing balls（打球类运动）。选项 D 在文中无依据。故选 B。"
        )
        it["teaching"]["socratic_tracks"] = [
            {
                "title": "回扣原文",
                "steps": [
                    {
                        "question": "文中写小红周末做了哪些运动？",
                        "hint": "寻找 basketball, volleyball, tennis, ping-pong, soccer 等词。",
                        "takeaway": "均为球类，对应 playing balls。",
                    },
                    {
                        "question": "文中有没有说她擅长 singing and dancing？",
                        "hint": "全文检索 singing / dancing。",
                        "takeaway": "未提及，故 D 不可选。",
                    },
                ],
            }
        ]
    if it["number"] == "9":
        it["teaching"]["correct_answer"] = "D"
        it["teaching"]["explanation_md"] = (
            "本题为数字推算题。开头仅交代周五下午语文老师布置写作文，并未写出全班人数。"
            "倒数第二段：教室里除小红外还有 five students（5 人），另有 Forty students 已上交作文离开；"
            "把小红本人计入：5 + 40 + 1 = 46。故全班共 46 人，选 D。"
        )
        it["teaching"]["knowledge_expansion_md"] = (
            "**数字题提示**：注意 except her / besides 等表述，避免漏计叙述者本人。\n"
            "- 在教室：除她外 5 人 → 教室当前共 6 人（含小红）。\n"
            "- 已离校上交：40 人。\n"
            "- 全班总数：40 + 5 + 1 = 46。\n"
        )
        it["teaching"]["socratic_tracks"] = [
            {
                "title": "分段定位",
                "steps": [
                    {
                        "question": "开头是否直接写出“46 名学生”？",
                        "hint": "只写了老师布置写作文与主题。",
                        "takeaway": "人数需从后段推算。",
                    },
                    {
                        "question": "如何由 five 与 forty 得到 46？",
                        "hint": "离校 40 人 + 仍在教室的另外 5 人 + 小红自己。",
                        "takeaway": "40 + 5 + 1 = 46。",
                    },
                ],
            }
        ]
    if it["number"] == "10":
        it["teaching"]["correct_answer"] = "A"
        it["teaching"]["explanation_md"] = (
            "本题考查人物推断。最后一段小红未认真构思作文，而是用“看女儿可知母亲”这类取巧方式完成，"
            "可见其机灵、淘气（naughty）。文中又明确写母亲 tall、healthy、really beautiful，并让读者由 daughter 推知母亲，"
            "可合理推断女儿也漂亮（beautiful）。选项 D“瘦小”等并非文意重点；B、C 与文意相反或矛盾。故选 A。"
        )
        it["teaching"]["knowledge_expansion_md"] = (
            "人物题需区分**直接描写**与**行为推断**：外貌词描写母亲，性格可从“偷懒/取巧完成作业”推断。\n"
        )
        it["teaching"]["socratic_tracks"] = [
            {
                "title": "证据整合",
                "steps": [
                    {
                        "question": "小红写作文的方式说明她怎样的性格？",
                        "hint": "未展开描写母亲，而用一句话搪塞。",
                        "takeaway": "淘气、爱耍小聪明。",
                    },
                    {
                        "question": "文中如何写母亲外貌？对推断小红有何帮助？",
                        "hint": "beautiful 与 daughter 的暗示。",
                        "takeaway": "可支持 beautiful。",
                    },
                ],
            }
        ]

# content_markdown patches
cm = data.get("content_markdown", "")
cm = cm.replace(
    "2. _____\n    A. form\n    B. game\n    C. sport\n    D. game\n",
    "2. _____\n    A. form\n    B. game\n    C. sport\n    D. program\n",
)
cm = cm.replace(
    "4. _____\n    A. did\n    B. do\n    C. do\n    D. does\n",
    "4. _____\n    A. did\n    B. do\n    C. does\n    D. doing\n",
)
data["content_markdown"] = cm

# proofread_notes
pn = data.get("proofread_notes", "")
pn = re.sub(
    r"3\. 完形填空部分存在以下问题，已按卷面如实记录：\n   - 第2小题选项B与D重复（均为'game'）。\n   - 第4小题选项B与C重复（均为'do'）。\n   - 第4小题根据语境'after __ my homework'，最佳答案应为'doing'，但选项中未提供，此为卷面固有问题。\n",
    "3. 完形填空：第2小题已将选项 D 由重复的 game 改为 program；第4小题已改为唯一选项并将正确答案定为 D（doing）。\n",
    pn,
)
data["proofread_notes"] = pn

new_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
new_html = html[: m.start()] + prefix + new_json + suffix + html[m.end() :]
open(path, "w", encoding="utf-8").write(new_html)
print("OK, written", path)
