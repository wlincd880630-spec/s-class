/**
 * CEE 解析页共用：DeepSeek 语境取词、词汇包提取、解析 PDF 导出
 */
(function (global) {
    'use strict';

    function escapeHtml(s) {
        return String(s || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function parseJsonFromDeepSeek(raw) {
        let text = String(raw || '');
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) text = jsonMatch[0];
        text = text.replace(/```json\s*|\s*```/g, '').trim();
        return JSON.parse(text);
    }

    async function callDeepSeek(apiKey, prompt, opts) {
        const options = opts || {};
        const res = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: options.model || 'deepseek-v4-flash',
                messages: [{ role: 'user', content: prompt }],
                temperature: options.temperature != null ? options.temperature : 0.4
            })
        });
        if (!res.ok) throw new Error('DeepSeek HTTP ' + res.status);
        const data = await res.json();
        return data.choices && data.choices[0] && data.choices[0].message
            ? data.choices[0].message.content || ''
            : '';
    }

    /** 从全文中找包含目标词的句子（优先完整句） */
    function findContextSentence(passage, word) {
        if (!passage || !word) return '';
        const clean = String(passage).replace(/\s+/g, ' ').trim();
        const re = new RegExp('[^.!?\\n]*\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b[^.!?\\n]*[.!?]?', 'i');
        const m = clean.match(re);
        return m ? m[0].trim() : '';
    }

    function buildDictPrompt(word, passage, contextSentence) {
        const ctx = contextSentence || '';
        const passageBrief = String(passage || '').slice(0, 2200);
        return [
            'You are an English vocabulary assistant for Chinese high school students (Gaokao / CEE).',
            'Target word/phrase: "' + word + '".',
            ctx ? 'Sentence from the article containing the word: "' + ctx + '".' : '',
            'Full article context (blanks already filled with correct answers):\n"""' + passageBrief + '"""',
            'Provide JSON only (no other text) with this exact shape:',
            '{',
            '  "definition_en": "standard concise English definition, high school level",',
            '  "definition_zh": "标准词典式中文释义",',
            '  "context_meaning_en": "meaning of this word AS USED in the article sentence/context (not generic dictionary sense if different)",',
            '  "context_meaning_zh": "针对本文语境的中文词义解释（说明在本文中具体指什么、为何这样用）",',
            '  "usage_examples": [',
            '    {"en": "Gaokao-level example showing a common related usage/collocation", "zh": "中文翻译"},',
            '    {"en": "Second high-value related usage example", "zh": "中文翻译"}',
            '  ],',
            '  "usage_summary": "用 1-3 句中文总结该词的常见搭配、语域与写作/阅读使用要点",',
            '  "examples": [',
            '    {"en": "One complete English sentence suitable for Gaokao reading or writing", "zh": "该句的中文翻译"},',
            '    {"en": "Second memorable Gaokao-relevant sentence", "zh": "该句的中文翻译"}',
            '  ]',
            '}',
            'Requirements: examples must be 高中难度, 高度使用记忆价值, 符合高考阅读或写作场景.',
            'Distinguish clearly: definition_* = 标准词义; context_meaning_* = 本文语境词义; usage_* = 相关用法拓展.',
            'Output only valid JSON.'
        ].filter(Boolean).join('\n');
    }

    function normalizeDictResult(parsed) {
        const p = parsed || {};
        return {
            definition_en: p.definition_en || '',
            definition_zh: p.definition_zh || '',
            context_meaning_en: p.context_meaning_en || '',
            context_meaning_zh: p.context_meaning_zh || '',
            usage_examples: Array.isArray(p.usage_examples) ? p.usage_examples : [],
            usage_summary: p.usage_summary || '',
            examples: Array.isArray(p.examples) ? p.examples : []
        };
    }

    function buildVocabPackPrompt(passage) {
        const text = String(passage || '').slice(0, 3500);
        return [
            'You are an expert Gaokao English teacher preparing a vocabulary handout from one cloze/word-form passage.',
            'Passage (correct answers already filled in):\n"""' + text + '"""',
            'Extract about 28-32 HIGH-VALUE learning items from this passage, mixing these types:',
            '- vocabulary (核心词汇)',
            '- phrase (词组)',
            '- collocation (固定搭配)',
            '- fixed_expression (固定表达/习语，如 be at a loss as to what to do)',
            'Prefer items that appear in or are strongly implied by the passage; include multi-word expressions when valuable.',
            'For EACH item provide bilingual explanations and ONE high-value example sentence generated by you (Gaokao writing/reading level, memorable).',
            'Return JSON only:',
            '{',
            '  "items": [',
            '    {',
            '      "term": "exact English word/phrase/expression",',
            '      "type": "vocabulary|phrase|collocation|fixed_expression",',
            '      "definition_en": "concise English meaning",',
            '      "definition_zh": "中文释义",',
            '      "example_en": "one high-value complete English sentence using the term",',
            '      "example_zh": "该例句中文翻译",',
            '      "from_passage": "short quote or paraphrase showing how it relates to the article (optional)"',
            '    }',
            '  ]',
            '}',
            'Aim for roughly 30 items total. Prioritize usefulness for Gaokao reading and writing.',
            'Output only valid JSON.'
        ].join('\n');
    }

    function normalizeVocabPack(parsed) {
        const items = Array.isArray(parsed && parsed.items) ? parsed.items : [];
        return items.map(function (it) {
            return {
                term: it.term || '',
                type: it.type || 'vocabulary',
                definition_en: it.definition_en || '',
                definition_zh: it.definition_zh || '',
                example_en: it.example_en || '',
                example_zh: it.example_zh || '',
                from_passage: it.from_passage || ''
            };
        }).filter(function (it) { return it.term; });
    }

    var TYPE_LABELS = {
        vocabulary: '词汇',
        phrase: '词组',
        collocation: '固定搭配',
        fixed_expression: '固定表达'
    };

    var TYPE_CLASS = {
        vocabulary: 'type-vocab',
        phrase: 'type-phrase',
        collocation: 'type-colloc',
        fixed_expression: 'type-fixed'
    };

    function typeLabel(type) {
        return TYPE_LABELS[type] || type || '词汇';
    }

    function typeClass(type) {
        return TYPE_CLASS[type] || 'type-vocab';
    }

    /** 将 A(word): ... 形式的补充拆成可读选项卡 */
    function formatSupplementHtml(raw) {
        const text = String(raw || '').trim();
        if (!text) return '';
        const lines = text.split(/\n+/).map(function (l) { return l.trim(); }).filter(Boolean);
        const optionRe = /^([A-D])\s*[\(（]([^）\)]+)[\)）]\s*[:：]?\s*(.*)$/;
        const parsed = [];
        lines.forEach(function (line) {
            const m = line.match(optionRe);
            if (m) {
                parsed.push({ key: m[1], word: m[2], body: m[3] || '' });
            } else if (parsed.length) {
                parsed[parsed.length - 1].body += (parsed[parsed.length - 1].body ? ' ' : '') + line;
            }
        });
        if (parsed.length >= 2) {
            return '<div class="opt-grid">' + parsed.map(function (op) {
                let body = escapeHtml(op.body);
                body = body
                    .replace(/语境句[:：]/g, '<span class="opt-label">语境句</span>')
                    .replace(/固定搭配[:：]/g, '<span class="opt-label">固定搭配</span>');
                return '<div class="opt-row">' +
                    '<span class="opt-key">' + escapeHtml(op.key) + '</span>' +
                    '<div class="opt-main"><div class="opt-word">' + escapeHtml(op.word) + '</div>' +
                    '<div class="opt-body">' + body + '</div></div></div>';
            }).join('') + '</div>';
        }
        return '<pre>' + escapeHtml(text) + '</pre>';
    }

    /** theme: 'indigo' (完形) | 'emerald' (词形) */
    function themeVars(theme) {
        if (theme === 'emerald') {
            return {
                name: 'emerald',
                primary: '#059669',
                primaryDark: '#047857',
                primarySoft: '#ecfdf5',
                primaryMid: '#d1fae5',
                accent: '#0d9488',
                accentSoft: '#f0fdfa',
                headerFrom: '#059669',
                headerTo: '#0d9488',
                ans: '#047857',
                chipBg: '#d1fae5',
                chipFg: '#065f46'
            };
        }
        return {
            name: 'indigo',
            primary: '#4f46e5',
            primaryDark: '#4338ca',
            primarySoft: '#eef2ff',
            primaryMid: '#e0e7ff',
            accent: '#7c3aed',
            accentSoft: '#f5f3ff',
            headerFrom: '#4f46e5',
            headerTo: '#7c3aed',
            ans: '#4338ca',
            chipBg: '#e0e7ff',
            chipFg: '#3730a3'
        };
    }

    function buildExplainPdfHtml(opts) {
        const o = opts || {};
        const t = themeVars(o.theme);
        const pid = escapeHtml(String(o.paperId || ''));
        const title = escapeHtml(o.title || '答案解析与词汇精讲');
        const subtitle = escapeHtml(o.subtitle || '');
        const passageHtml = (o.passageText || '')
            .split(/\n\n+/)
            .filter(Boolean)
            .map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; })
            .join('');
        const questions = o.questions || [];
        const vocabItems = o.vocabItems || [];

        let explainBlocks = '';
        questions.forEach(function (q, qi) {
            const num = escapeHtml(String(q.number != null ? q.number : ''));
            const answer = escapeHtml(String(q.answerText || ''));
            const explanation = escapeHtml(q.explanation || '');
            const kps = Array.isArray(q.knowledge_points)
                ? q.knowledge_points.map(function (kp) {
                    return '<span class="kp-chip">' + escapeHtml(kp) + '</span>';
                }).join('')
                : '';
            const extra = escapeHtml(q.extraLine || '');
            const supplementHtml = formatSupplementHtml(q.supplement || '');
            explainBlocks +=
                '<article class="q-card">' +
                '<header class="q-card-head">' +
                '<span class="q-badge">' + (qi + 1) + '</span>' +
                '<span class="q-num">第 ' + num + ' 题</span>' +
                (extra ? '<span class="q-extra">' + extra + '</span>' : '') +
                '<span class="q-ans"><em>答案</em> ' + answer + '</span>' +
                '</header>' +
                '<div class="q-card-body">' +
                (explanation ? '<p class="q-exp"><span class="label-exp">解析</span>' + explanation + '</p>' : '') +
                (kps ? '<div class="q-kp-row"><span class="label-kp">考点</span>' + kps + '</div>' : '') +
                (supplementHtml ? '<div class="q-sup"><span class="label-sup">补充</span>' + supplementHtml + '</div>' : '') +
                '</div></article>';
        });

        let vocabBlocks = '';
        vocabItems.forEach(function (it, idx) {
            vocabBlocks +=
                '<article class="v-card">' +
                '<header class="v-card-head">' +
                '<span class="v-idx">' + (idx + 1) + '</span>' +
                '<span class="v-term">' + escapeHtml(it.term) + '</span>' +
                '<span class="v-type ' + typeClass(it.type) + '">' + escapeHtml(typeLabel(it.type)) + '</span>' +
                '</header>' +
                '<div class="v-defs">' +
                '<div class="v-def v-def-en"><span class="def-tag">EN</span><span>' + escapeHtml(it.definition_en) + '</span></div>' +
                '<div class="v-def v-def-zh"><span class="def-tag">中文</span><span>' + escapeHtml(it.definition_zh) + '</span></div>' +
                '</div>' +
                (it.from_passage
                    ? '<p class="v-from"><span class="from-tag">原文</span>' + escapeHtml(it.from_passage) + '</p>'
                    : '') +
                '<div class="v-ex-box">' +
                '<p class="v-ex-en">' + escapeHtml(it.example_en) + '</p>' +
                '<p class="v-ex-zh">' + escapeHtml(it.example_zh) + '</p>' +
                '</div></article>';
        });

        const metaBits = [];
        if (questions.length) metaBits.push(questions.length + ' 题解析');
        if (vocabItems.length) metaBits.push(vocabItems.length + ' 条词汇精讲');
        const metaLine = metaBits.join(' · ') || '解析讲义';

        const css = [
            ':root{--c-primary:' + t.primary + ';--c-primary-dark:' + t.primaryDark + ';--c-primary-soft:' + t.primarySoft + ';--c-primary-mid:' + t.primaryMid + ';--c-accent:' + t.accent + ';--c-accent-soft:' + t.accentSoft + ';--c-ans:' + t.ans + ';--c-chip-bg:' + t.chipBg + ';--c-chip-fg:' + t.chipFg + ';--c-ink:#1e293b;--c-muted:#64748b;--c-line:#e2e8f0;--c-paper:#ffffff;--c-wash:#f8fafc;}',
            '*{box-sizing:border-box;margin:0;padding:0;}',
            'body{font-family:"Noto Sans SC","Source Han Sans SC","PingFang SC","Microsoft YaHei",sans-serif;font-size:10.5pt;line-height:1.7;color:var(--c-ink);background:linear-gradient(165deg,#f1f5f9 0%,#eef2ff 45%,#f8fafc 100%);-webkit-print-color-adjust:exact;print-color-adjust:exact;}',
            '.page{width:210mm;margin:18px auto;background:var(--c-paper);padding:0 0 12mm;box-shadow:0 8px 32px rgba(15,23,42,0.12);overflow:hidden;border-radius:4px;}',
            '.hero{background:linear-gradient(135deg,' + t.headerFrom + ' 0%,' + t.headerTo + ' 100%);color:#fff;padding:18px 16mm 16px;position:relative;}',
            '.hero::after{content:"";position:absolute;left:0;right:0;bottom:0;height:6px;background:linear-gradient(90deg,rgba(255,255,255,0.35),rgba(255,255,255,0.05));}',
            '.hero-brand{font-size:9.5pt;letter-spacing:2px;opacity:0.9;margin-bottom:6px;font-weight:500;}',
            '.hero-title{font-size:18pt;font-weight:700;letter-spacing:1px;line-height:1.3;margin-bottom:4px;}',
            '.hero-sub{font-size:10pt;opacity:0.92;}',
            '.hero-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;}',
            '.hero-chip{display:inline-flex;align-items:center;padding:3px 10px;border-radius:999px;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.28);font-size:9pt;backdrop-filter:blur(4px);}',
            '.content{padding:12px 15mm 0;}',
            '.sec{display:flex;align-items:center;gap:10px;margin:18px 0 10px;page-break-after:avoid;}',
            '.sec-num{flex-shrink:0;width:28px;height:28px;border-radius:8px;background:var(--c-primary);color:#fff;font-weight:700;font-size:11pt;display:flex;align-items:center;justify-content:center;}',
            '.sec-title{font-size:13pt;font-weight:700;color:var(--c-primary-dark);letter-spacing:0.5px;}',
            '.sec-line{flex:1;height:2px;background:linear-gradient(90deg,var(--c-primary-mid),transparent);border-radius:2px;}',
            '.note{font-size:9pt;color:var(--c-muted);margin:0 0 10px;padding:8px 12px;background:var(--c-wash);border-radius:8px;border-left:3px solid var(--c-primary);}',
            '.passage{text-align:justify;font-size:10.5pt;line-height:1.95;padding:14px 16px;margin-bottom:6px;background:linear-gradient(180deg,var(--c-primary-soft),#fff);border:1px solid var(--c-primary-mid);border-radius:12px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.8);}',
            '.passage p{text-indent:2em;margin-bottom:8px;color:#334155;}.passage p:last-child{margin-bottom:0;}',
            '.q-card{margin-bottom:10px;border:1px solid var(--c-line);border-radius:12px;overflow:hidden;background:#fff;page-break-inside:avoid;box-shadow:0 1px 3px rgba(15,23,42,0.04);}',
            '.q-card-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 12px;background:linear-gradient(90deg,var(--c-primary-soft),#fff);border-bottom:1px solid var(--c-primary-mid);}',
            '.q-badge{width:22px;height:22px;border-radius:6px;background:var(--c-primary);color:#fff;font-size:9pt;font-weight:700;display:inline-flex;align-items:center;justify-content:center;}',
            '.q-num{font-weight:700;color:var(--c-primary-dark);font-size:10.5pt;}',
            '.q-extra{font-size:9pt;color:#047857;background:#ecfdf5;border:1px solid #a7f3d0;padding:1px 8px;border-radius:999px;}',
            '.q-ans{margin-left:auto;font-weight:700;color:var(--c-ans);font-size:10.5pt;background:var(--c-chip-bg);padding:2px 10px;border-radius:999px;}',
            '.q-ans em{font-style:normal;font-weight:600;opacity:0.75;margin-right:4px;font-size:9pt;}',
            '.q-card-body{padding:10px 12px 12px;}',
            '.q-exp{margin:0 0 8px;color:#334155;}.label-exp,.label-kp,.label-sup{display:inline-block;font-size:8.5pt;font-weight:700;padding:1px 7px;border-radius:4px;margin-right:6px;vertical-align:baseline;}',
            '.label-exp{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;}',
            '.label-kp{background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;}',
            '.label-sup{background:#f8fafc;color:#475569;border:1px solid #cbd5e1;}',
            '.q-kp-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:6px;}',
            '.kp-chip{display:inline-block;font-size:8.5pt;padding:1px 8px;border-radius:999px;background:var(--c-chip-bg);color:var(--c-chip-fg);border:1px solid var(--c-primary-mid);}',
            '.q-sup{margin-top:6px;background:var(--c-wash);border:1px dashed #cbd5e1;border-radius:8px;padding:8px 10px;}',
            '.q-sup pre{white-space:pre-wrap;font-family:inherit;font-size:9pt;color:#475569;margin-top:4px;line-height:1.65;}',
            '.opt-grid{display:grid;gap:6px;margin-top:8px;}',
            '.opt-row{display:flex;gap:8px;align-items:flex-start;padding:7px 8px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;}',
            '.opt-key{flex-shrink:0;width:20px;height:20px;border-radius:50%;background:var(--c-primary);color:#fff;font-size:9pt;font-weight:700;display:inline-flex;align-items:center;justify-content:center;}',
            '.opt-main{flex:1;min-width:0;}',
            '.opt-word{font-weight:700;color:#0f172a;font-size:10pt;margin-bottom:2px;font-family:Georgia,"Times New Roman",serif;}',
            '.opt-body{font-size:8.5pt;color:#475569;line-height:1.55;}',
            '.opt-label{display:inline-block;font-size:7.5pt;font-weight:700;color:var(--c-primary-dark);background:var(--c-primary-soft);padding:0 5px;border-radius:3px;margin:0 3px 0 2px;}',
            '.v-grid{display:grid;grid-template-columns:1fr;gap:10px;}',
            '.v-card{border:1px solid var(--c-line);border-radius:12px;overflow:hidden;background:#fff;page-break-inside:avoid;box-shadow:0 1px 3px rgba(15,23,42,0.04);}',
            '.v-card-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 12px;background:linear-gradient(90deg,var(--c-accent-soft),#fff);border-bottom:1px solid #ede9fe;}',
            '.v-idx{min-width:22px;height:22px;padding:0 5px;border-radius:6px;background:#0f172a;color:#fff;font-size:9pt;font-weight:700;display:inline-flex;align-items:center;justify-content:center;}',
            '.v-term{font-weight:700;font-size:12pt;color:#0f172a;font-family:Georgia,"Times New Roman",serif;letter-spacing:0.2px;}',
            '.v-type{margin-left:auto;font-size:8.5pt;font-weight:700;padding:2px 9px;border-radius:999px;border:1px solid transparent;}',
            '.type-vocab{background:#eef2ff;color:#4338ca;border-color:#c7d2fe;}',
            '.type-phrase{background:#ecfeff;color:#0e7490;border-color:#a5f3fc;}',
            '.type-colloc{background:#fff7ed;color:#c2410c;border-color:#fed7aa;}',
            '.type-fixed{background:#fdf2f8;color:#be185d;border-color:#fbcfe8;}',
            '.v-defs{padding:8px 12px 4px;display:grid;gap:4px;}',
            '.v-def{display:flex;gap:8px;align-items:flex-start;font-size:9.5pt;color:#334155;}',
            '.def-tag{flex-shrink:0;font-size:8pt;font-weight:700;padding:1px 6px;border-radius:4px;line-height:1.4;}',
            '.v-def-en .def-tag{background:#e0e7ff;color:#3730a3;}',
            '.v-def-zh .def-tag{background:#fce7f3;color:#9d174d;}',
            '.v-from{margin:4px 12px 0;font-size:8.5pt;color:var(--c-muted);padding:6px 8px;background:#f8fafc;border-radius:6px;border-left:3px solid #94a3b8;}',
            '.from-tag{display:inline-block;font-weight:700;color:#475569;margin-right:6px;font-size:8pt;}',
            '.v-ex-box{margin:8px 12px 12px;padding:8px 10px;border-radius:8px;background:linear-gradient(135deg,var(--c-primary-soft),var(--c-accent-soft));border:1px solid var(--c-primary-mid);}',
            '.v-ex-en{font-size:10pt;color:#1e293b;font-family:Georgia,"Times New Roman",serif;line-height:1.55;margin-bottom:3px;}',
            '.v-ex-en::before{content:"例句 · ";font-family:"Noto Sans SC","Microsoft YaHei",sans-serif;font-size:8pt;font-weight:700;color:var(--c-primary);letter-spacing:0.5px;}',
            '.v-ex-zh{font-size:9pt;color:#64748b;}',
            '.footer{margin:18px 15mm 0;padding-top:10px;border-top:1px solid var(--c-line);text-align:center;font-size:8.5pt;color:#94a3b8;}',
            '.footer strong{color:var(--c-primary);font-weight:600;}',
            '@media print{body{background:#fff;}.page{margin:0;box-shadow:none;width:100%;border-radius:0;}@page{size:A4;margin:8mm;}',
            '.hero{-webkit-print-color-adjust:exact;print-color-adjust:exact;}.q-card,.v-card,.passage,.v-ex-box,.note,.q-sup{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}'
        ].join('');

        return '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">' +
            '<title>' + title + '（第' + pid + '套）</title>' +
            '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">' +
            '<style>' + css + '</style></head><body><div class="page theme-' + t.name + '">' +
            '<div class="hero">' +
            '<div class="hero-brand">S-CLASS · 高三英语 CEE</div>' +
            '<div class="hero-title">' + title + '</div>' +
            '<div class="hero-sub">第 ' + pid + ' 套' + (subtitle ? ' · ' + subtitle : '') + '</div>' +
            '<div class="hero-meta"><span class="hero-chip">' + escapeHtml(metaLine) + '</span>' +
            '<span class="hero-chip">DeepSeek 语境词汇</span></div>' +
            '</div>' +
            '<div class="content">' +
            '<div class="sec"><span class="sec-num">1</span><span class="sec-title">完整短文（答案已填入）</span><span class="sec-line"></span></div>' +
            '<div class="passage">' + (passageHtml || '<p>（无短文）</p>') + '</div>' +
            '<div class="sec"><span class="sec-num">2</span><span class="sec-title">题目解析</span><span class="sec-line"></span></div>' +
            (explainBlocks || '<p class="note">暂无解析内容</p>') +
            '<div class="sec"><span class="sec-num">3</span><span class="sec-title">词汇 · 词组 · 固定搭配 · 固定表达</span><span class="sec-line"></span></div>' +
            '<p class="note">共 <strong>' + vocabItems.length + '</strong> 项 · 含中英文释义与高使用价值例句（DeepSeek 生成），建议结合原文语境背记。</p>' +
            '<div class="v-grid">' + (vocabBlocks || '<p class="note">词汇包尚未生成</p>') + '</div>' +
            '</div>' +
            '<div class="footer"><strong>S-Class</strong> · s-class.top/CEE · Paper ' + pid + ' · 解析讲义</div>' +
            '</div></body></html>';
    }

    function openPrintWindow(html) {
        const w = window.open('', '_blank');
        if (!w) throw new Error('弹窗被拦截，请允许本站打开新窗口后重试');
        w.document.write(html);
        w.document.close();
        w.focus();
        // 等一帧样式与可选字体加载后再唤起打印，避免灰白未渲染
        setTimeout(function () {
            try {
                if (w.document.fonts && w.document.fonts.ready) {
                    w.document.fonts.ready.then(function () { w.print(); }).catch(function () { w.print(); });
                } else {
                    w.print();
                }
            } catch (_) {
                w.print();
            }
        }, 600);
        return w;
    }

    global.CeeExplainAI = {
        escapeHtml: escapeHtml,
        parseJsonFromDeepSeek: parseJsonFromDeepSeek,
        callDeepSeek: callDeepSeek,
        findContextSentence: findContextSentence,
        buildDictPrompt: buildDictPrompt,
        normalizeDictResult: normalizeDictResult,
        buildVocabPackPrompt: buildVocabPackPrompt,
        normalizeVocabPack: normalizeVocabPack,
        typeLabel: typeLabel,
        buildExplainPdfHtml: buildExplainPdfHtml,
        openPrintWindow: openPrintWindow
    };
})(typeof window !== 'undefined' ? window : this);
