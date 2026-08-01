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

## Wave 2 已发布（10 个知识点）
| ID | 路径 |
|----|------|
| G-modals-can-should | Grammar/KP-情态动词/ |
| G-articles-a-an-the | Grammar/L08-小学冠词/ |
| G-countable-uncountable | Grammar/L09-可数不可数/ |
| G-imperative | Grammar/L10-祈使句/ |
| G-future-will | Grammar/L11-一般将来时/ |
| G-exclamatory | Grammar/L12-感叹句/ |
| G-too-enough | Grammar/KP-too-enough/ |
| G-few-little | Grammar/KP-few-little/ |
| V-too-either-also | primary_vocab/V03-too-either-also/ |
| V-forget-remember-doing | primary_vocab/V04-forget-remember/ |

## 生成 Wave 2
```bash
node Psle/knowledge-registry/scripts/build-wave2-lessons.mjs
node Grammar/kp-shared/gen-lesson.mjs Psle/knowledge-registry/wave2/lessons/G-modals-can-should.json
```

## Wave 3 已发布（10 个知识点）
| ID | 路径 |
|----|------|
| G-present-continuous-psle | Grammar/KP-现在进行时小升初/ |
| G-present-perfect | Grammar/KP-现在完成时/ |
| G-passive-voice | Grammar/KP-被动语态/ |
| G-object-clause | Grammar/KP-宾语从句/ |
| G-like-doing | Grammar/KP-like-doing/ |
| G-pronouns-object | Grammar/KP-宾格代词/ |
| G-some-any-no | Grammar/KP-some-any-no/ |
| V-family-words | primary_vocab/V05-family-words/ |
| V-antonyms | primary_vocab/V06-antonyms/ |
| V-make-let-help | primary_vocab/V07-make-let-help/ |

## 生成 Wave 3
```bash
node Psle/knowledge-registry/scripts/build-wave3-lessons.mjs
for f in Psle/knowledge-registry/wave3/lessons/*.json; do node Grammar/kp-shared/gen-lesson.mjs "$f"; done
node Psle/knowledge-registry/scripts/build-wave3-registry.mjs
```
