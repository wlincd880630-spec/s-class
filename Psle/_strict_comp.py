import json
import re
import glob
import os

base = os.path.dirname(os.path.abspath(__file__))
for fp in sorted(glob.glob(os.path.join(base, "set_*_typeflow.html"))):
    set_num = re.search(r"set_(\d+)", os.path.basename(fp)).group(1)
    with open(fp, encoding="utf-8") as f:
        content = f.read()
    m = re.search(r'id="exam-embed">(.*?)</script>', content, re.S)
    if not m:
        continue
    data = json.loads(m.group(1))
    for sec in data.get("sections", []):
        st = sec.get("section_title", "")
        for item in sec.get("items", []):
            t = item.get("teaching") or {}
            expl = (t.get("explanation_md") or "") + (t.get("knowledge_expansion_md") or "")
            if not re.search(r"比较级|最高级|comparative|superlative", expl, re.I):
                continue
            stem = (item.get("stem") or "").replace("\n", " ")
            ans = t.get("correct_answer", "")
            opts = item.get("options") or {}
            ot = " | ".join(f"{k}.{v}" for k, v in sorted(opts.items()) if v)
            print(f"=== 第{set_num}套 · {st} · 第{item.get('number')}题 ===")
            print(stem[:350])
            if ot:
                print("选项:", ot[:350])
            print("答案:", ans)
            print()
