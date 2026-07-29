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
            'Extract about 28-32 HIGH-VALUE learning items. Mix types: vocabulary / phrase / collocation / fixed_expression.',
            '',
            'CRITICAL lemma & grammar rules (must follow):',
            '1) "term" MUST be the BASE/LEMMA form for learning, NOT the declined surface form alone.',
            '   - Example: passage has "remains vivid" → term = "remain vivid" (NOT "remains vivid").',
            '   - Example: passage has "was wheeled into" / "wheeled into" → term = "wheel" as a VERB (NOT "wheeled into").',
            '   - Prefer dictionary headwords / infinitive / adjective base / phrase lemma.',
            '2) "form_in_passage" = the EXACT span as it appears in the passage (for highlighting), e.g. "remains vivid", "wheeled".',
            '3) "grammar_note" (Chinese, required): explain HOW the form is used in THIS sentence — tense, person/number, voice, participle, etc.',
            '   - For remains vivid: explain 一般现在时、主语第三人称单数时谓语用 remains（单数第三人称形式），搭配 remain vivid。',
            '   - For was wheeled into: explain 被动语态，wheeled 为动词过去分词；wheel 作动词义为「用轮椅/推车运送」。',
            '4) For multi-word fixed expressions that are idiomatic as a whole (e.g. be at a loss as to what to do), keep the full expression as term, and still give grammar/usage note.',
            '5) Avoid listing only inflectional fragments without lemma (do not list "remains" alone if the teaching point is remain vivid).',
            '',
            'For EACH item also provide bilingual definitions and ONE high-value Gaokao-level example using the LEMMA form when natural.',
            'Return JSON only:',
            '{',
            '  "items": [',
            '    {',
            '      "term": "lemma / base form to memorize",',
            '      "form_in_passage": "exact surface string from the passage for highlighting",',
            '      "type": "vocabulary|phrase|collocation|fixed_expression",',
            '      "pos": "verb|noun|adj|adv|phrase|...",',
            '      "definition_en": "concise English meaning of the lemma",',
            '      "definition_zh": "中文释义（针对原型/词条）",',
            '      "grammar_note": "中文：说明句中语法用法（时态/语态/人称/分词等）及与原文形式的对应关系",',
            '      "example_en": "one high-value complete English sentence",',
            '      "example_zh": "该例句中文翻译",',
            '      "from_passage": "short quote from the article containing the form"',
            '    }',
            '  ]',
            '}',
            'Aim for roughly 30 items. Output only valid JSON.'
        ].join('\n');
    }

    function normalizeVocabPack(parsed) {
        const items = Array.isArray(parsed && parsed.items) ? parsed.items : [];
        return items.map(function (it) {
            return {
                term: String(it.term || '').trim(),
                form_in_passage: String(it.form_in_passage || it.term || '').trim(),
                type: it.type || 'vocabulary',
                pos: String(it.pos || '').trim(),
                definition_en: it.definition_en || '',
                definition_zh: it.definition_zh || '',
                grammar_note: it.grammar_note || '',
                example_en: it.example_en || '',
                example_zh: it.example_zh || '',
                from_passage: it.from_passage || ''
            };
        }).filter(function (it) { return it.term; });
    }

    /** 旧缓存无 grammar_note 时需重新生成 */
    function isVocabPackCurrent(items) {
        if (!Array.isArray(items) || !items.length) return false;
        var withNote = 0;
        items.forEach(function (it) { if (it && it.grammar_note) withNote++; });
        return withNote >= Math.min(3, items.length);
    }

    var HIGHLIGHT_CLASSES = [
        'hl-amber', 'hl-sky', 'hl-rose', 'hl-lime', 'hl-violet',
        'hl-cyan', 'hl-orange', 'hl-pink', 'hl-teal', 'hl-indigo'
    ];

    function escapeRegExp(s) {
        return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /** 在纯文本短文中按 form_in_passage 着色标记（优先长匹配，避免重叠） */
    function highlightPassageHtml(passageText, vocabItems) {
        var text = String(passageText || '');
        if (!text) return '<p>（无短文）</p>';
        var spans = [];
        (vocabItems || []).forEach(function (it, idx) {
            var form = String(it.form_in_passage || it.term || '').trim();
            if (!form || form.length < 2) return;
            spans.push({ form: form, idx: idx, color: HIGHLIGHT_CLASSES[idx % HIGHLIGHT_CLASSES.length] });
        });
        spans.sort(function (a, b) { return b.form.length - a.form.length; });

        var occupied = [];
        function overlaps(start, end) {
            for (var i = 0; i < occupied.length; i++) {
                if (!(end <= occupied[i][0] || start >= occupied[i][1])) return true;
            }
            return false;
        }

        var marks = [];
        spans.forEach(function (sp) {
            var re = new RegExp(escapeRegExp(sp.form), 'gi');
            var m;
            while ((m = re.exec(text)) !== null) {
                var start = m.index;
                var end = start + m[0].length;
                if (overlaps(start, end)) continue;
                occupied.push([start, end]);
                marks.push({ start: start, end: end, text: m[0], color: sp.color, n: sp.idx + 1 });
                break; // 每个词条只高亮首次出现，避免整篇过花
            }
        });
        marks.sort(function (a, b) { return a.start - b.start; });

        var out = '';
        var cursor = 0;
        marks.forEach(function (mk) {
            out += escapeHtml(text.slice(cursor, mk.start));
            out += '<mark class="vocab-hl ' + mk.color + '" title="#' + mk.n + '">' +
                escapeHtml(mk.text) + '<sup class="hl-n">' + mk.n + '</sup></mark>';
            cursor = mk.end;
        });
        out += escapeHtml(text.slice(cursor));

        return out.split(/\n\n+/).filter(Boolean).map(function (p) {
            return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
        }).join('') || ('<p>' + escapeHtml(text) + '</p>');
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
                primaryMid: '#a7f3d0',
                accent: '#0891b2',
                accentSoft: '#ecfeff',
                headerFrom: '#047857',
                headerTo: '#0d9488',
                headerVia: '#0891b2',
                ans: '#047857',
                chipBg: '#d1fae5',
                chipFg: '#065f46'
            };
        }
        return {
            name: 'indigo',
            primary: '#4f46e5',
            primaryDark: '#3730a3',
            primarySoft: '#eef2ff',
            primaryMid: '#c7d2fe',
            accent: '#db2777',
            accentSoft: '#fdf2f8',
            headerFrom: '#4338ca',
            headerTo: '#7c3aed',
            headerVia: '#db2777',
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
        const questions = o.questions || [];
        const vocabItems = o.vocabItems || [];
        const passageHtml = highlightPassageHtml(o.passageText || '', vocabItems);

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
            const hl = HIGHLIGHT_CLASSES[idx % HIGHLIGHT_CLASSES.length];
            const form = it.form_in_passage || '';
            const showForm = form && form.toLowerCase() !== String(it.term || '').toLowerCase();
            vocabBlocks +=
                '<article class="v-card ' + hl + '-card">' +
                '<header class="v-card-head">' +
                '<span class="v-idx">' + (idx + 1) + '</span>' +
                '<div class="v-titles">' +
                '<span class="v-term">' + escapeHtml(it.term) + '</span>' +
                (it.pos ? '<span class="v-pos">' + escapeHtml(it.pos) + '</span>' : '') +
                (showForm ? '<span class="v-form">原文：<mark class="vocab-hl ' + hl + '">' + escapeHtml(form) + '</mark></span>' : '') +
                '</div>' +
                '<span class="v-type ' + typeClass(it.type) + '">' + escapeHtml(typeLabel(it.type)) + '</span>' +
                '</header>' +
                '<div class="v-defs">' +
                '<div class="v-def v-def-en"><span class="def-tag">EN</span><span>' + escapeHtml(it.definition_en) + '</span></div>' +
                '<div class="v-def v-def-zh"><span class="def-tag">中文</span><span>' + escapeHtml(it.definition_zh) + '</span></div>' +
                '</div>' +
                (it.grammar_note
                    ? '<div class="v-grammar"><span class="grammar-tag">语法用法</span><span>' + escapeHtml(it.grammar_note) + '</span></div>'
                    : '') +
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
            'body{font-family:"Noto Sans SC","Source Han Sans SC","PingFang SC","Microsoft YaHei",sans-serif;font-size:10.5pt;line-height:1.7;color:var(--c-ink);background:#e2e8f0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}',
            '.page{width:210mm;margin:18px auto;background:var(--c-paper);padding:0 0 10mm;box-shadow:0 10px 40px rgba(15,23,42,0.14);overflow:hidden;border-radius:6px;}',
            '.hero{background:linear-gradient(120deg,' + t.headerFrom + ' 0%,' + t.headerTo + ' 55%,' + t.headerVia + ' 100%);color:#fff;padding:20px 15mm 18px;position:relative;}',
            '.hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 90% 20%,rgba(255,255,255,0.22),transparent 55%),radial-gradient(ellipse at 10% 100%,rgba(255,255,255,0.12),transparent 40%);pointer-events:none;}',
            '.hero>*{position:relative;z-index:1;}',
            '.hero-brand{font-size:9.5pt;letter-spacing:2.5px;opacity:0.92;margin-bottom:6px;font-weight:600;}',
            '.hero-title{font-size:19pt;font-weight:800;letter-spacing:0.5px;line-height:1.25;margin-bottom:4px;text-shadow:0 1px 2px rgba(0,0,0,0.12);}',
            '.hero-sub{font-size:10pt;opacity:0.95;}',
            '.hero-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;}',
            '.hero-chip{display:inline-flex;align-items:center;padding:4px 12px;border-radius:999px;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.35);font-size:9pt;font-weight:500;}',
            '.content{padding:10px 14mm 0;}',
            '.sec{display:flex;align-items:center;gap:10px;margin:16px 0 10px;page-break-after:avoid;}',
            '.sec-num{flex-shrink:0;width:30px;height:30px;border-radius:10px;background:linear-gradient(135deg,var(--c-primary),var(--c-accent));color:#fff;font-weight:800;font-size:12pt;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(79,70,229,0.28);}',
            '.sec-title{font-size:13.5pt;font-weight:800;color:var(--c-primary-dark);letter-spacing:0.3px;}',
            '.sec-line{flex:1;height:3px;background:linear-gradient(90deg,var(--c-primary-mid),var(--c-accent-soft),transparent);border-radius:3px;}',
            '.note{font-size:9pt;color:#475569;margin:0 0 10px;padding:9px 12px;background:linear-gradient(90deg,#fff7ed,#fdf2f8 50%,#eef2ff);border-radius:10px;border:1px solid #fed7aa;}',
            '.note strong{color:var(--c-primary-dark);}',
            '.passage{text-align:justify;font-size:10.5pt;line-height:2.05;padding:14px 16px;margin-bottom:6px;background:linear-gradient(180deg,#fff 0%,var(--c-primary-soft) 100%);border:2px solid var(--c-primary-mid);border-radius:14px;}',
            '.passage p{text-indent:2em;margin-bottom:8px;color:#1e293b;}.passage p:last-child{margin-bottom:0;}',
            'mark.vocab-hl{padding:1px 3px;border-radius:4px;font-style:normal;font-weight:700;box-decoration-break:clone;-webkit-box-decoration-break:clone;}',
            'mark.vocab-hl .hl-n{font-size:7pt;margin-left:1px;opacity:0.85;font-weight:800;vertical-align:super;}',
            '.hl-amber{background:#fde68a;color:#92400e;}.hl-sky{background:#bae6fd;color:#075985;}',
            '.hl-rose{background:#fecdd3;color:#9f1239;}.hl-lime{background:#d9f99d;color:#3f6212;}',
            '.hl-violet{background:#ddd6fe;color:#5b21b6;}.hl-cyan{background:#a5f3fc;color:#155e75;}',
            '.hl-orange{background:#fdba74;color:#9a3412;}.hl-pink{background:#fbcfe8;color:#9d174d;}',
            '.hl-teal{background:#99f6e4;color:#115e59;}.hl-indigo{background:#c7d2fe;color:#3730a3;}',
            '.q-card{margin-bottom:11px;border:1px solid var(--c-line);border-radius:14px;overflow:hidden;background:#fff;page-break-inside:avoid;box-shadow:0 2px 8px rgba(15,23,42,0.05);}',
            '.q-card-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:9px 12px;background:linear-gradient(100deg,var(--c-primary-soft),#fff 70%,var(--c-accent-soft));border-bottom:2px solid var(--c-primary-mid);}',
            '.q-badge{width:24px;height:24px;border-radius:8px;background:linear-gradient(135deg,var(--c-primary),var(--c-accent));color:#fff;font-size:9.5pt;font-weight:800;display:inline-flex;align-items:center;justify-content:center;}',
            '.q-num{font-weight:800;color:var(--c-primary-dark);font-size:11pt;}',
            '.q-extra{font-size:9pt;color:#047857;background:#ecfdf5;border:1px solid #6ee7b7;padding:2px 9px;border-radius:999px;font-weight:600;}',
            '.q-ans{margin-left:auto;font-weight:800;color:var(--c-ans);font-size:10.5pt;background:linear-gradient(90deg,var(--c-chip-bg),#fce7f3);padding:3px 12px;border-radius:999px;border:1px solid var(--c-primary-mid);}',
            '.q-ans em{font-style:normal;font-weight:600;opacity:0.7;margin-right:4px;font-size:9pt;}',
            '.q-card-body{padding:10px 12px 12px;background:linear-gradient(180deg,#fff,#fafbff);}',
            '.q-exp{margin:0 0 8px;color:#334155;}.label-exp,.label-kp,.label-sup{display:inline-block;font-size:8.5pt;font-weight:800;padding:2px 8px;border-radius:5px;margin-right:6px;vertical-align:baseline;}',
            '.label-exp{background:linear-gradient(90deg,#ffedd5,#fed7aa);color:#9a3412;border:1px solid #fdba74;}',
            '.label-kp{background:linear-gradient(90deg,#dbeafe,#bfdbfe);color:#1e40af;border:1px solid #93c5fd;}',
            '.label-sup{background:linear-gradient(90deg,#f1f5f9,#e2e8f0);color:#334155;border:1px solid #cbd5e1;}',
            '.q-kp-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:6px;}',
            '.kp-chip{display:inline-block;font-size:8.5pt;padding:2px 9px;border-radius:999px;background:var(--c-chip-bg);color:var(--c-chip-fg);border:1px solid var(--c-primary-mid);font-weight:600;}',
            '.q-sup{margin-top:6px;background:#fffbeb;border:1px dashed #f59e0b;border-radius:10px;padding:8px 10px;}',
            '.q-sup pre{white-space:pre-wrap;font-family:inherit;font-size:9pt;color:#475569;margin-top:4px;line-height:1.65;}',
            '.opt-grid{display:grid;gap:6px;margin-top:8px;}',
            '.opt-row{display:flex;gap:8px;align-items:flex-start;padding:8px 9px;background:#fff;border:1px solid #e2e8f0;border-left:4px solid var(--c-primary);border-radius:8px;}',
            '.opt-key{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,var(--c-primary),var(--c-accent));color:#fff;font-size:9pt;font-weight:800;display:inline-flex;align-items:center;justify-content:center;}',
            '.opt-main{flex:1;min-width:0;}',
            '.opt-word{font-weight:800;color:#0f172a;font-size:10.5pt;margin-bottom:2px;font-family:Georgia,"Times New Roman",serif;}',
            '.opt-body{font-size:8.5pt;color:#475569;line-height:1.55;}',
            '.opt-label{display:inline-block;font-size:7.5pt;font-weight:800;color:#9a3412;background:#ffedd5;padding:0 5px;border-radius:3px;margin:0 3px 0 2px;}',
            /* 词汇部分强制换页 */
            '.vocab-section{page-break-before:always;break-before:page;padding-top:4px;}',
            '.vocab-hero{margin:0 0 12px;padding:14px 16px;border-radius:14px;background:linear-gradient(120deg,#4f46e5 0%,#7c3aed 40%,#db2777 100%);color:#fff;box-shadow:0 6px 18px rgba(79,70,229,0.25);}',
            '.theme-emerald .vocab-hero{background:linear-gradient(120deg,#047857 0%,#0d9488 45%,#0891b2 100%);}',
            '.vocab-hero h2{font-size:15pt;font-weight:800;margin:0 0 4px;letter-spacing:0.5px;}',
            '.vocab-hero p{font-size:9pt;opacity:0.95;margin:0;line-height:1.5;}',
            '.v-grid{display:grid;grid-template-columns:1fr;gap:11px;}',
            '.v-card{border:1px solid var(--c-line);border-radius:14px;overflow:hidden;background:#fff;page-break-inside:avoid;box-shadow:0 2px 10px rgba(15,23,42,0.06);border-top:4px solid #c7d2fe;}',
            '.hl-amber-card{border-top-color:#f59e0b;}.hl-sky-card{border-top-color:#0ea5e9;}.hl-rose-card{border-top-color:#f43f5e;}',
            '.hl-lime-card{border-top-color:#84cc16;}.hl-violet-card{border-top-color:#8b5cf6;}.hl-cyan-card{border-top-color:#06b6d4;}',
            '.hl-orange-card{border-top-color:#f97316;}.hl-pink-card{border-top-color:#ec4899;}.hl-teal-card{border-top-color:#14b8a6;}.hl-indigo-card{border-top-color:#6366f1;}',
            '.v-card-head{display:flex;flex-wrap:wrap;align-items:flex-start;gap:8px;padding:10px 12px;background:linear-gradient(100deg,#faf5ff,#fff 55%,#fff1f2);border-bottom:1px solid #fce7f3;}',
            '.v-idx{min-width:24px;height:24px;padding:0 6px;border-radius:8px;background:linear-gradient(135deg,#0f172a,#334155);color:#fff;font-size:9.5pt;font-weight:800;display:inline-flex;align-items:center;justify-content:center;}',
            '.v-titles{flex:1;min-width:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 10px;}',
            '.v-term{font-weight:800;font-size:13pt;color:#0f172a;font-family:Georgia,"Times New Roman",serif;letter-spacing:0.2px;}',
            '.v-pos{font-size:8pt;font-weight:700;color:#6366f1;background:#eef2ff;border:1px solid #c7d2fe;padding:1px 7px;border-radius:999px;text-transform:lowercase;}',
            '.v-form{font-size:8.5pt;color:#64748b;font-weight:500;}',
            '.v-type{margin-left:auto;font-size:8.5pt;font-weight:800;padding:3px 10px;border-radius:999px;border:1px solid transparent;}',
            '.type-vocab{background:#eef2ff;color:#4338ca;border-color:#a5b4fc;}',
            '.type-phrase{background:#ecfeff;color:#0e7490;border-color:#67e8f9;}',
            '.type-colloc{background:#fff7ed;color:#c2410c;border-color:#fdba74;}',
            '.type-fixed{background:#fdf2f8;color:#be185d;border-color:#f9a8d4;}',
            '.v-defs{padding:8px 12px 2px;display:grid;gap:5px;}',
            '.v-def{display:flex;gap:8px;align-items:flex-start;font-size:9.5pt;color:#334155;}',
            '.def-tag{flex-shrink:0;font-size:8pt;font-weight:800;padding:2px 7px;border-radius:5px;line-height:1.4;}',
            '.v-def-en .def-tag{background:#c7d2fe;color:#312e81;}',
            '.v-def-zh .def-tag{background:#fbcfe8;color:#9d174d;}',
            '.v-grammar{margin:6px 12px 0;padding:8px 10px;border-radius:9px;background:linear-gradient(90deg,#ecfdf5,#eff6ff);border:1px solid #6ee7b7;display:flex;gap:8px;align-items:flex-start;font-size:9pt;color:#065f46;line-height:1.55;}',
            '.grammar-tag{flex-shrink:0;font-size:8pt;font-weight:800;padding:2px 7px;border-radius:5px;background:#059669;color:#fff;}',
            '.v-from{margin:6px 12px 0;font-size:8.5pt;color:var(--c-muted);padding:6px 8px;background:#f8fafc;border-radius:7px;border-left:4px solid #38bdf8;}',
            '.from-tag{display:inline-block;font-weight:800;color:#0369a1;margin-right:6px;font-size:8pt;}',
            '.v-ex-box{margin:8px 12px 12px;padding:9px 11px;border-radius:10px;background:linear-gradient(135deg,#eef2ff,#fdf2f8);border:1px solid #ddd6fe;}',
            '.v-ex-en{font-size:10pt;color:#1e293b;font-family:Georgia,"Times New Roman",serif;line-height:1.55;margin-bottom:3px;}',
            '.v-ex-en::before{content:"例句 · ";font-family:"Noto Sans SC","Microsoft YaHei",sans-serif;font-size:8pt;font-weight:800;color:#7c3aed;letter-spacing:0.5px;}',
            '.v-ex-zh{font-size:9pt;color:#64748b;}',
            '.footer{margin:16px 14mm 0;padding-top:10px;border-top:2px solid var(--c-primary-mid);text-align:center;font-size:8.5pt;color:#94a3b8;}',
            '.footer strong{color:var(--c-primary);font-weight:700;}',
            '@media print{body{background:#fff;}.page{margin:0;box-shadow:none;width:100%;border-radius:0;}@page{size:A4;margin:8mm;}',
            '.vocab-section{page-break-before:always!important;break-before:page!important;}',
            '.hero,.vocab-hero,.q-card,.v-card,.passage,.v-ex-box,.v-grammar,.note,.q-sup,mark.vocab-hl{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}'
        ].join('');

        return '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">' +
            '<title>' + title + '（第' + pid + '套）</title>' +
            '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;800&display=swap" rel="stylesheet">' +
            '<style>' + css + '</style></head><body><div class="page theme-' + t.name + '">' +
            '<div class="hero">' +
            '<div class="hero-brand">S-CLASS · 高三英语 CEE</div>' +
            '<div class="hero-title">' + title + '</div>' +
            '<div class="hero-sub">第 ' + pid + ' 套' + (subtitle ? ' · ' + subtitle : '') + '</div>' +
            '<div class="hero-meta"><span class="hero-chip">' + escapeHtml(metaLine) + '</span>' +
            '<span class="hero-chip">原型词条 · 语法用法</span>' +
            '<span class="hero-chip">短文彩色标注</span></div>' +
            '</div>' +
            '<div class="content">' +
            '<div class="sec"><span class="sec-num">1</span><span class="sec-title">完整短文（答案已填入 · 词汇彩色标注）</span><span class="sec-line"></span></div>' +
            '<p class="note">短文中彩色高亮为精讲词汇在原文中的形式；上标数字对应「词汇精讲」条目序号。</p>' +
            '<div class="passage">' + (passageHtml || '<p>（无短文）</p>') + '</div>' +
            '<div class="sec"><span class="sec-num">2</span><span class="sec-title">题目解析</span><span class="sec-line"></span></div>' +
            (explainBlocks || '<p class="note">暂无解析内容</p>') +
            '</div>' +
            '<div class="content vocab-section">' +
            '<div class="vocab-hero">' +
            '<h2>3 · 词汇 · 词组 · 固定搭配 · 固定表达</h2>' +
            '<p>共 ' + vocabItems.length + ' 项 · 词条为原型/基本式 · 含句中语法用法说明与高价值例句（DeepSeek）</p>' +
            '</div>' +
            '<div class="v-grid">' + (vocabBlocks || '<p class="note">词汇包尚未生成</p>') + '</div>' +
            '<div class="footer"><strong>S-Class</strong> · s-class.top/CEE · Paper ' + pid + ' · 解析讲义</div>' +
            '</div>' +
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
        isVocabPackCurrent: isVocabPackCurrent,
        highlightPassageHtml: highlightPassageHtml,
        typeLabel: typeLabel,
        buildExplainPdfHtml: buildExplainPdfHtml,
        openPrintWindow: openPrintWindow
    };
})(typeof window !== 'undefined' ? window : this);
