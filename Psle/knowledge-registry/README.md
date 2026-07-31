# PSLE 知识点注册表

## 结构
- `master.json` — 全量知识点索引（含 PSLE 溯源）
- `wave1.json` — Wave 1 试点清单（8 条）
- `extracts/` — 真题挖掘原始数据
- `wave1/lessons/*.json` — 单知识点课件 spec（供 `gen-lesson.mjs` 生成）
- `reviews/` — 互审记录
- `templates/` — 语法/词汇课件规范

## 提取考点
```bash
node Psle/knowledge-registry/scripts/extract-sets.mjs 1 2 3 4 5 7
```

## 生成课件
```bash
node Grammar/kp-shared/gen-lesson.mjs Psle/knowledge-registry/wave1/lessons/G-comparative-than.json
```

## Wave 1 已发布
| ID | 路径 |
|----|------|
| G-comparative-than | Grammar/L04-小学比较级/ |
| G-superlative-one-of-most | Grammar/L05-小学最高级/ |
| G-noun-plural-irregular | Grammar/L06-小学名词复数/ |
| G-there-be | Grammar/L07-小学There-be/ |
| G-present-simple-3rd | Grammar/KP-三单小升初/ |
| G-past-irregular-verbs | Grammar/KP-不规则过去式/ |
| V-look-forward-to | primary_vocab/V01-look-forward-to/ |
| V-on-sale-shopping | primary_vocab/V02-on-sale-shopping/ |
