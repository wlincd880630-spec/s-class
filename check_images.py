import json
import os

base = r"D:\2026\初中\人教版英语七年级上单词表"
for u in [2, 3, 4]:
    with open(os.path.join(base, f"Unit{u}", f"Unit{u}.json"), encoding="utf-8") as f:
        data = json.load(f)
    img_dir = os.path.join(base, f"Unit{u}", "images")
    os.makedirs(img_dir, exist_ok=True)
    missing = []
    skipped = 0
    for w in data["words"]:
        slug = w["word"].replace(" ", "_")
        f1 = os.path.join(img_dir, f"{slug}_1.png")
        f2 = os.path.join(img_dir, f"{slug}_2.png")
        if os.path.exists(f1) and os.path.exists(f2):
            skipped += 1
        else:
            prompts = w.get("image_prompts") or []
            if not os.path.exists(f1) and len(prompts) > 0:
                missing.append((slug, 1, prompts[0], u))
            if not os.path.exists(f2) and len(prompts) > 1:
                missing.append((slug, 2, prompts[1], u))
    print(f"Unit {u}: words={len(data['words'])}, skipped={skipped}, missing={len(missing)}")
    out = os.path.join(base, f"Unit{u}", "missing.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(missing, f, ensure_ascii=False, indent=2)
