import json
import re

p = r"d:\s-class\Psle\set_05_typeflow.html"
text = open(p, encoding="utf-8").read()
m = re.search(r'id="exam-embed">(.+?)</script>', text, re.S)
if not m:
    raise SystemExit("no embed")
data = json.loads(m.group(1))
for si, sec in enumerate(data["sections"]):
    title = sec.get("section_title", "")[:40]
    for it in sec.get("items", []):
        n = str(it.get("number", ""))
        opts = it.get("options") or {}
        if isinstance(opts, dict) and any(str(v).strip() for v in opts.values()):
            ca = (it.get("teaching") or {}).get("correct_answer", "")
            print(f"sec{si} num={n} | {title} | ans={ca}")
            print(f"  opts: {opts}")
            stem = (it.get("stem") or "")[:120].replace("\n", " ")
            print(f"  stem: {stem}...")
            expl = ((it.get("teaching") or {}).get("explanation_md") or "")[:200]
            print(f"  expl: {expl}...")
            print()
