import json
import re
import glob
import os

base = os.path.dirname(os.path.abspath(__file__))
files = sorted(glob.glob(os.path.join(base, "set_*_typeflow.html")))

COMP_FORMS = re.compile(
    r"\b(?:"
    r"bigger|smaller|taller|shorter|longer|higher|lower|"
    r"faster|slower|stronger|weaker|harder|easier|nicer|finer|"
    r"older|younger|newer|heavier|lighter|"
    r"wider|narrower|deeper|thinner|thicker|"
    r"cheaper|dearer|happier|sadder|busier|prettier|fatter|thinner|"
    r"better|worse|more|less|most|least|"
    r"biggest|smallest|tallest|shortest|longest|highest|lowest|"
    r"fastest|slowest|strongest|weakest|hardest|easiest|"
    r"oldest|youngest|newest|latest|earliest|"
    r"heaviest|lightest|widest|narrowest|deepest|thinnest|thickest|"
    r"cheapest|dearest|happiest|saddest|busiest|prettiest|"
    r"farthest|furthest|nearest|closest|"
    r"larger|largest|greater|greatest|"
    r"hotter|hottest|colder|coldest|warmer|warmest|cooler|coolest|"
    r"cleaner|cleanest|dirtier|dirtiest|"
    r"healthier|healthiest|"
    r"more\s+\w+|most\s+\w+|less\s+\w+|least\s+\w+|"
    r"\w+er\s+than|\w+est\b|"
    r"as\s+\w+\s+as"
    r")\b",
    re.I,
)

PROMPT_COMP = re.compile(
    r"\(\s*(?:young|old|tall|short|heavy|light|big|small|fast|slow|"
    r"strong|weak|hard|easy|nice|fine|long|high|low|wide|narrow|"
    r"deep|thin|thick|cheap|dear|happy|sad|busy|pretty|fat|thin|"
    r"health|healthier|interesting|beautiful|important|popular|"
    r"comfortable|dangerous|expensive|exciting|boring|careful|useful|"
    r"wonderful|excited|carefully|quickly|slowly|good|bad|well|"
    r"tall|heavy|young|old|big|small|long|short|health"
    r")\s*\)",
    re.I,
)


def text_of_item(item):
    parts = []
    for k in ("stem", "context_note", "answer_area_hint"):
        parts.append(item.get(k) or "")
    opts = item.get("options") or {}
    if isinstance(opts, dict):
        parts.extend(str(v) for v in opts.values() if v)
    t = item.get("teaching") or {}
    for k in ("correct_answer", "explanation_md", "knowledge_expansion_md"):
        parts.append(t.get(k) or "")
    return " ".join(parts)


def classify(text, item):
    teaching = item.get("teaching") or {}
    expl = (teaching.get("explanation_md") or "") + (teaching.get("knowledge_expansion_md") or "")
    stem = item.get("stem") or ""
    opts = item.get("options") or {}
    opt_text = " ".join(str(v) for v in opts.values() if v) if isinstance(opts, dict) else ""
    ans = teaching.get("correct_answer") or ""

    tags = []

    if re.search(r"比较级|最高级|comparative|superlative|形容词比较|副词比较", expl, re.I):
        tags.append("解析标注比较/最高级")

    if re.search(r"\bas\s+\w+\s+as\b", stem + " " + opt_text + " " + ans, re.I):
        tags.append("原级比较 as…as")

    if re.search(r"\bthan\b", stem, re.I) or re.search(r"\bthan\b", opt_text, re.I):
        if COMP_FORMS.search(stem + " " + opt_text) or re.search(
            r"\b(?:more|less|better|worse|older|younger|taller|shorter|bigger|smaller|heavier|longer|faster|harder|easier)\b",
            stem + " " + opt_text,
            re.I,
        ):
            tags.append("比较级 + than")

    if re.search(r"\bone of the most\b|\bthe most\b|\bthe least\b|\bthe best\b|\bthe worst\b|\bthe \w+est\b", stem + " " + opt_text, re.I):
        tags.append("最高级结构")

    if PROMPT_COMP.search(stem):
        tags.append("括号内原形→比较/最高级")

    if re.search(r"反义词|比较级", (item.get("section_instruction") or "") + expl):
        if COMP_FORMS.search(stem) or COMP_FORMS.search(ans):
            tags.append("比较级填空/反义")

    # sentence transform with comp words
    if item.get("item_type") == "sentence_transform" and COMP_FORMS.search(stem):
        tags.append("连词成句含比较级")

    # options are clearly comp forms only
    if isinstance(opts, dict):
        comp_opts = [v for v in opts.values() if v and COMP_FORMS.search(str(v))]
        if len(comp_opts) >= 2 and re.search(r"\bthan\b|_____|比较|更|最", stem, re.I):
            tags.append("选项为比较级形式")

    if not tags:
        return None

    # exclude weak reading-only hits
    weak_only = all(
        t in ("解析标注比较/最高级",)
        for t in tags
    ) and item.get("item_type") == "reading" and not COMP_FORMS.search(stem)
    if weak_only and not re.search(r"比较级|最高级|than|更|最", stem):
        # reading about "better marks" etc - check if stem tests grammar
        if not re.search(r"\b(?:better|best|worse|worst|more|most|less|least|\w+er|\w+est)\b", stem, re.I):
            return None

    # exclude "best title" reading unless explanation says comparative
    if item.get("item_type") == "reading" and re.search(r"best title|best price|the best", stem, re.I):
        if not re.search(r"比较级|最高级", expl):
            return None

    kind = "比较级"
    if any(x in " ".join(tags) for x in ("最高级", "the most", "one of the most", "est")):
        if "比较级" in " ".join(tags) or "than" in " ".join(tags):
            kind = "比较级+最高级"
        else:
            kind = "最高级"
    elif re.search(r"\bbest\b|\bmost\b", ans, re.I) and not re.search(r"\bthan\b", stem, re.I):
        kind = "最高级"

    return {"tags": tags, "kind": kind}


results = []
for fp in files:
    set_num = re.search(r"set_(\d+)", os.path.basename(fp)).group(1)
    with open(fp, encoding="utf-8") as f:
        content = f.read()
    m = re.search(
        r'<script type="application/json" id="exam-embed">(.*?)</script>',
        content,
        re.S,
    )
    if not m:
        continue
    data = json.loads(m.group(1))
    for sec in data.get("sections", []):
        sec_title = sec.get("section_title", "")
        for item in sec.get("items", []):
            text = text_of_item(item)
            meta = classify(text, item)
            if not meta:
                continue
            stem = (item.get("stem") or "").replace("\n", " ")
            opts = item.get("options") or {}
            opt_str = ""
            if isinstance(opts, dict) and any(opts.values()):
                opt_str = " | ".join(f"{k}. {v}" for k, v in sorted(opts.items()) if v)
            ans = (item.get("teaching") or {}).get("correct_answer", "")
            results.append(
                {
                    "set": int(set_num),
                    "section": sec_title,
                    "num": item.get("number"),
                    "type": item.get("item_type"),
                    "kind": meta["kind"],
                    "stem": stem,
                    "options": opt_str,
                    "answer": ans,
                    "tags": meta["tags"],
                }
            )

results.sort(key=lambda x: (x["set"], str(x["num"])))

out_path = os.path.join(base, "_comp_super_list.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"共 {len(results)} 题（已写入 {out_path}）\n")
for r in results:
    print(f"【第{r['set']:02d}套】{r['section']} · 第{r['num']}题 · {r['kind']}")
    print(f"  题干: {r['stem'][:280]}")
    if r["options"]:
        print(f"  选项: {r['options'][:280]}")
    print(f"  答案: {r['answer']}")
    print()
