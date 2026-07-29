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
        const Q_ACCENTS = ['qa-indigo', 'qa-rose', 'qa-amber', 'qa-teal', 'qa-sky', 'qa-violet'];

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
            const accent = Q_ACCENTS[qi % Q_ACCENTS.length];
            explainBlocks +=
                '<article class="q-card ' + accent + '">' +
                '<div class="q-rail"></div>' +
                '<div class="q-main">' +
                '<header class="q-card-head">' +
                '<span class="q-badge">' + (qi + 1) + '</span>' +
                '<span class="q-num">第 ' + num + ' 题</span>' +
                (extra ? '<span class="q-extra">' + extra + '</span>' : '') +
                '<span class="q-ans"><em>答案</em>' + answer + '</span>' +
                '</header>' +
                '<div class="q-card-body">' +
                (explanation ? '<div class="q-exp"><span class="label-exp">解析</span><p>' + explanation + '</p></div>' : '') +
                (kps ? '<div class="q-kp-row"><span class="label-kp">考点</span><div class="kp-list">' + kps + '</div></div>' : '') +
                (supplementHtml ? '<div class="q-sup"><div class="sup-head"><span class="label-sup">选项补充</span></div>' + supplementHtml + '</div>' : '') +
                '</div></div></article>';
        });

        let vocabBlocks = '';
        vocabItems.forEach(function (it, idx) {
            const hl = HIGHLIGHT_CLASSES[idx % HIGHLIGHT_CLASSES.length];
            const form = it.form_in_passage || '';
            const showForm = form && form.toLowerCase() !== String(it.term || '').toLowerCase();
            vocabBlocks +=
                '<article class="v-card ' + hl + '-card">' +
                '<div class="v-topbar"></div>' +
                '<header class="v-card-head">' +
                '<span class="v-idx">' + (idx + 1) + '</span>' +
                '<div class="v-titles">' +
                '<div class="v-term-row"><span class="v-term">' + escapeHtml(it.term) + '</span>' +
                (it.pos ? '<span class="v-pos">' + escapeHtml(it.pos) + '</span>' : '') +
                '</div>' +
                (showForm ? '<div class="v-form">原文形态 <mark class="vocab-hl ' + hl + '">' + escapeHtml(form) + '</mark></div>' : '') +
                '</div>' +
                '<span class="v-type ' + typeClass(it.type) + '">' + escapeHtml(typeLabel(it.type)) + '</span>' +
                '</header>' +
                '<div class="v-body">' +
                '<div class="v-defs">' +
                '<div class="v-def v-def-en"><span class="def-tag">EN</span><span>' + escapeHtml(it.definition_en) + '</span></div>' +
                '<div class="v-def v-def-zh"><span class="def-tag">中文</span><span>' + escapeHtml(it.definition_zh) + '</span></div>' +
                '</div>' +
                (it.grammar_note
                    ? '<div class="v-grammar"><span class="grammar-tag">语法</span><span>' + escapeHtml(it.grammar_note) + '</span></div>'
                    : '') +
                (it.from_passage
                    ? '<div class="v-from"><span class="from-tag">原文</span><span>' + escapeHtml(it.from_passage) + '</span></div>'
                    : '') +
                '<div class="v-ex-box">' +
                '<div class="v-ex-label">高价值例句</div>' +
                '<p class="v-ex-en">' + escapeHtml(it.example_en) + '</p>' +
                '<p class="v-ex-zh">' + escapeHtml(it.example_zh) + '</p>' +
                '</div></div></article>';
        });

        const metaBits = [];
        if (questions.length) metaBits.push(questions.length + ' 题解析');
        if (vocabItems.length) metaBits.push(vocabItems.length + ' 条词汇');
        const metaLine = metaBits.join(' · ') || '解析讲义';

        const css = [
            'html,body{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important;}',
            ':root{--c-primary:' + t.primary + ';--c-primary-dark:' + t.primaryDark + ';--c-primary-soft:' + t.primarySoft + ';--c-primary-mid:' + t.primaryMid + ';--c-accent:' + t.accent + ';--c-accent-soft:' + t.accentSoft + ';--c-ans:' + t.ans + ';--ink:#0f172a;--muted:#64748b;}',
            '*{box-sizing:border-box;margin:0;padding:0;}',
            'body{font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;font-size:10pt;line-height:1.65;color:var(--ink);background:#94a3b8;}',
            '.sheet{width:210mm;margin:12px auto;background:#fff;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,.2);}',
            '.hero{position:relative;padding:22px 14mm 20px;color:#fff;background:linear-gradient(125deg,' + t.headerFrom + ' 0%,' + t.headerTo + ' 48%,' + t.headerVia + ' 100%);overflow:hidden;}',
            '.hero-deco{position:absolute;border-radius:50%;pointer-events:none;}',
            '.deco-1{width:180px;height:180px;right:-40px;top:-50px;background:rgba(255,255,255,.12);}',
            '.deco-2{width:110px;height:110px;right:80px;bottom:-40px;background:rgba(255,255,255,.08);}',
            '.deco-3{width:70px;height:70px;left:8%;bottom:10px;background:rgba(251,191,36,.35);}',
            '.hero-inner{position:relative;z-index:1;}',
            '.hero-brand{display:inline-block;font-size:9pt;font-weight:700;letter-spacing:3px;padding:4px 12px;border-radius:999px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);margin-bottom:12px;}',
            '.hero-title{font-size:22pt;font-weight:900;letter-spacing:1px;line-height:1.2;margin-bottom:6px;text-shadow:0 2px 8px rgba(0,0,0,.15);}',
            '.hero-sub{font-size:11pt;opacity:.95;font-weight:500;}',
            '.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px;}',
            '.stat{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28);border-radius:12px;padding:10px 12px;}',
            '.stat b{display:block;font-size:16pt;font-weight:900;line-height:1.1;}',
            '.stat span{font-size:8.5pt;opacity:.9;}',
            '.ribbon{height:8px;background:linear-gradient(90deg,#fbbf24,#f472b6,#38bdf8,#a3e635,#c084fc,#fb923c);}',
            '.pad{padding:14px 12mm 6px;background:linear-gradient(180deg,#f8fafc 0%,#fff 120px);}',
            '.sec{display:flex;align-items:center;gap:10px;margin:8px 0 12px;page-break-after:avoid;}',
            '.sec-num{width:34px;height:34px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14pt;color:#fff;background:linear-gradient(135deg,var(--c-primary),var(--c-accent));box-shadow:0 4px 12px rgba(79,70,229,.3);}',
            '.sec-text h3{font-size:14pt;font-weight:900;color:var(--c-primary-dark);letter-spacing:.3px;}',
            '.sec-text p{font-size:8.5pt;color:var(--muted);margin-top:1px;}',
            '.sec-line{flex:1;height:4px;border-radius:4px;background:linear-gradient(90deg,var(--c-primary-mid),#fda4af,transparent);}',
            '.tip{display:flex;gap:10px;align-items:flex-start;margin:0 0 12px;padding:10px 12px;border-radius:12px;background:linear-gradient(100deg,#fff7ed,#fce7f3 40%,#e0f2fe);border:1px solid #fdba74;font-size:9pt;color:#9a3412;}',
            '.tip-ico{flex-shrink:0;width:22px;height:22px;border-radius:8px;background:#f59e0b;color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:11pt;}',
            '.passage-wrap{position:relative;border-radius:16px;padding:3px;background:linear-gradient(135deg,#6366f1,#ec4899,#f59e0b,#22d3ee);margin-bottom:8px;}',
            '.passage{background:#fffbeb;border-radius:14px;padding:14px 16px;text-align:justify;font-size:10.5pt;line-height:2.1;color:#1e293b;}',
            '.passage p{text-indent:2em;margin-bottom:8px;}.passage p:last-child{margin-bottom:0;}',
            'mark.vocab-hl{padding:2px 4px;border-radius:5px;font-style:normal;font-weight:800;box-decoration-break:clone;-webkit-box-decoration-break:clone;border-bottom:2px solid rgba(0,0,0,.12);}',
            'mark.vocab-hl .hl-n{font-size:7pt;margin-left:2px;font-weight:900;vertical-align:super;opacity:.9;}',
            '.hl-amber{background:#fde047;color:#854d0e;}.hl-sky{background:#7dd3fc;color:#075985;}',
            '.hl-rose{background:#fda4af;color:#9f1239;}.hl-lime{background:#bef264;color:#3f6212;}',
            '.hl-violet{background:#c4b5fd;color:#5b21b6;}.hl-cyan{background:#67e8f9;color:#155e75;}',
            '.hl-orange{background:#fdba74;color:#9a3412;}.hl-pink{background:#f9a8d4;color:#9d174d;}',
            '.hl-teal{background:#5eead4;color:#115e59;}.hl-indigo{background:#a5b4fc;color:#3730a3;}',
            '.q-card{display:flex;margin-bottom:12px;border-radius:14px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;box-shadow:0 3px 12px rgba(15,23,42,.06);page-break-inside:avoid;}',
            '.q-rail{width:8px;flex-shrink:0;}',
            '.qa-indigo .q-rail{background:linear-gradient(180deg,#6366f1,#818cf8);}.qa-indigo .q-badge{background:#6366f1;}',
            '.qa-rose .q-rail{background:linear-gradient(180deg,#f43f5e,#fb7185);}.qa-rose .q-badge{background:#f43f5e;}',
            '.qa-amber .q-rail{background:linear-gradient(180deg,#f59e0b,#fbbf24);}.qa-amber .q-badge{background:#f59e0b;}',
            '.qa-teal .q-rail{background:linear-gradient(180deg,#14b8a6,#2dd4bf);}.qa-teal .q-badge{background:#14b8a6;}',
            '.qa-sky .q-rail{background:linear-gradient(180deg,#0ea5e9,#38bdf8);}.qa-sky .q-badge{background:#0ea5e9;}',
            '.qa-violet .q-rail{background:linear-gradient(180deg,#8b5cf6,#a78bfa);}.qa-violet .q-badge{background:#8b5cf6;}',
            '.q-main{flex:1;min-width:0;}',
            '.q-card-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:10px 12px;background:linear-gradient(90deg,#f8fafc,#fff);border-bottom:1px solid #f1f5f9;}',
            '.q-badge{width:26px;height:26px;border-radius:9px;color:#fff;font-size:10pt;font-weight:900;display:inline-flex;align-items:center;justify-content:center;}',
            '.q-num{font-weight:900;font-size:11.5pt;color:#0f172a;}',
            '.q-extra{font-size:8.5pt;font-weight:700;color:#047857;background:#d1fae5;border:1px solid #6ee7b7;padding:2px 9px;border-radius:999px;}',
            '.q-ans{margin-left:auto;font-weight:900;font-size:10.5pt;color:#fff;background:linear-gradient(90deg,#4f46e5,#db2777);padding:4px 12px;border-radius:999px;box-shadow:0 2px 6px rgba(79,70,229,.25);}',
            '.q-ans em{font-style:normal;font-weight:600;opacity:.85;margin-right:5px;font-size:8.5pt;}',
            '.q-card-body{padding:10px 12px 12px;}',
            '.q-exp{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;padding:8px 10px;background:#fff7ed;border-radius:10px;border:1px solid #fed7aa;}',
            '.q-exp p{flex:1;color:#431407;font-size:9.5pt;line-height:1.6;}',
            '.label-exp,.label-kp,.label-sup{flex-shrink:0;font-size:8pt;font-weight:900;padding:3px 8px;border-radius:6px;color:#fff;}',
            '.label-exp{background:linear-gradient(90deg,#ea580c,#f59e0b);}',
            '.label-kp{background:linear-gradient(90deg,#2563eb,#38bdf8);}',
            '.label-sup{background:linear-gradient(90deg,#475569,#64748b);}',
            '.q-kp-row{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;}',
            '.kp-list{display:flex;flex-wrap:wrap;gap:5px;}',
            '.kp-chip{font-size:8.5pt;font-weight:700;padding:3px 9px;border-radius:999px;background:#dbeafe;color:#1e40af;border:1px solid #93c5fd;}',
            '.q-sup{background:#f0fdf4;border:1px dashed #34d399;border-radius:12px;padding:8px 10px;}',
            '.sup-head{margin-bottom:6px;}',
            '.opt-grid{display:grid;gap:6px;}',
            '.opt-row{display:flex;gap:8px;align-items:flex-start;padding:8px 9px;background:#fff;border-radius:10px;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,.03);}',
            '.opt-key{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#ec4899);color:#fff;font-size:9pt;font-weight:900;display:inline-flex;align-items:center;justify-content:center;}',
            '.opt-main{flex:1;min-width:0;}',
            '.opt-word{font-weight:900;font-size:10.5pt;color:#0f172a;margin-bottom:2px;font-family:Georgia,"Times New Roman",serif;}',
            '.opt-body{font-size:8.5pt;color:#475569;line-height:1.5;}',
            '.opt-label{display:inline-block;font-size:7.5pt;font-weight:900;color:#9a3412;background:#ffedd5;padding:1px 5px;border-radius:4px;margin:0 3px;}',
            '.vocab-section{page-break-before:always;break-before:page;padding:0 0 14px;background:#f1f5f9;}',
            '.vocab-hero{margin:0;padding:18px 12mm;color:#fff;position:relative;overflow:hidden;background:linear-gradient(120deg,#4f46e5 0%,#7c3aed 40%,#db2777 78%,#f59e0b 100%);}',
            '.theme-emerald .vocab-hero{background:linear-gradient(120deg,#047857 0%,#0d9488 40%,#0284c7 78%,#eab308 100%);}',
            '.vocab-hero::after{content:"";position:absolute;right:-20px;top:-30px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.12);}',
            '.vocab-hero h2{position:relative;z-index:1;font-size:16pt;font-weight:900;margin:0 0 4px;letter-spacing:.5px;}',
            '.vocab-hero p{position:relative;z-index:1;font-size:9pt;opacity:.95;margin:0;}',
            '.vocab-pad{padding:12px 10mm 0;}',
            '.v-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}',
            '.v-card{background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 3px 10px rgba(15,23,42,.06);page-break-inside:avoid;display:flex;flex-direction:column;}',
            '.v-topbar{height:6px;}',
            '.hl-amber-card .v-topbar{background:#f59e0b;}.hl-sky-card .v-topbar{background:#0ea5e9;}',
            '.hl-rose-card .v-topbar{background:#f43f5e;}.hl-lime-card .v-topbar{background:#84cc16;}',
            '.hl-violet-card .v-topbar{background:#8b5cf6;}.hl-cyan-card .v-topbar{background:#06b6d4;}',
            '.hl-orange-card .v-topbar{background:#f97316;}.hl-pink-card .v-topbar{background:#ec4899;}',
            '.hl-teal-card .v-topbar{background:#14b8a6;}.hl-indigo-card .v-topbar{background:#6366f1;}',
            '.v-card-head{display:flex;gap:8px;align-items:flex-start;padding:8px 10px;background:linear-gradient(180deg,#fafafa,#fff);border-bottom:1px solid #f1f5f9;}',
            '.v-idx{min-width:24px;height:24px;padding:0 5px;border-radius:8px;background:#0f172a;color:#fff;font-size:9pt;font-weight:900;display:inline-flex;align-items:center;justify-content:center;}',
            '.v-titles{flex:1;min-width:0;}',
            '.v-term-row{display:flex;flex-wrap:wrap;align-items:center;gap:5px;}',
            '.v-term{font-weight:900;font-size:11.5pt;color:#0f172a;font-family:Georgia,"Times New Roman",serif;}',
            '.v-pos{font-size:7.5pt;font-weight:800;color:#4f46e5;background:#eef2ff;border:1px solid #c7d2fe;padding:1px 6px;border-radius:999px;}',
            '.v-form{font-size:8pt;color:#64748b;margin-top:3px;font-weight:600;}',
            '.v-type{flex-shrink:0;font-size:7.5pt;font-weight:900;padding:3px 8px;border-radius:999px;}',
            '.type-vocab{background:#e0e7ff;color:#3730a3;}.type-phrase{background:#cffafe;color:#0e7490;}',
            '.type-colloc{background:#ffedd5;color:#c2410c;}.type-fixed{background:#fce7f3;color:#be185d;}',
            '.v-body{padding:8px 10px 10px;flex:1;display:flex;flex-direction:column;gap:6px;}',
            '.v-defs{display:grid;gap:4px;}',
            '.v-def{display:flex;gap:6px;align-items:flex-start;font-size:8.5pt;color:#334155;line-height:1.45;}',
            '.def-tag{flex-shrink:0;font-size:7pt;font-weight:900;padding:2px 6px;border-radius:5px;color:#fff;}',
            '.v-def-en .def-tag{background:#4f46e5;}.v-def-zh .def-tag{background:#db2777;}',
            '.v-grammar{display:flex;gap:6px;align-items:flex-start;padding:7px 8px;border-radius:9px;background:linear-gradient(90deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7;font-size:8pt;color:#065f46;line-height:1.45;}',
            '.grammar-tag{flex-shrink:0;font-size:7pt;font-weight:900;padding:2px 6px;border-radius:5px;background:#059669;color:#fff;}',
            '.v-from{display:flex;gap:6px;align-items:flex-start;padding:6px 8px;border-radius:8px;background:#f0f9ff;border-left:4px solid #0ea5e9;font-size:8pt;color:#0369a1;line-height:1.4;}',
            '.from-tag{flex-shrink:0;font-weight:900;font-size:7pt;color:#0284c7;}',
            '.v-ex-box{margin-top:auto;padding:8px 9px;border-radius:10px;background:linear-gradient(135deg,#ede9fe,#fce7f3);border:1px solid #ddd6fe;}',
            '.v-ex-label{font-size:7.5pt;font-weight:900;color:#7c3aed;letter-spacing:.5px;margin-bottom:3px;}',
            '.v-ex-en{font-size:9pt;color:#1e293b;font-family:Georgia,"Times New Roman",serif;line-height:1.45;margin-bottom:2px;}',
            '.v-ex-zh{font-size:8pt;color:#64748b;}',
            '.footer{margin:14px 10mm 0;padding:10px 0;border-top:3px solid #c7d2fe;text-align:center;font-size:8.5pt;color:#94a3b8;}',
            '.footer strong{color:#4f46e5;font-weight:800;}',
            '.toolbar{position:sticky;top:0;z-index:20;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 14px;background:linear-gradient(90deg,#0f172a,#312e81);color:#fff;font-size:10pt;}',
            '.toolbar button{border:0;border-radius:999px;padding:8px 16px;font-weight:800;cursor:pointer;background:linear-gradient(90deg,#fbbf24,#f97316);color:#111;}',
            '.toolbar span{opacity:.9;font-size:9pt;}',
            '@media print{',
            '  .toolbar{display:none!important;}',
            '  body{background:#fff!important;}',
            '  .sheet{margin:0;box-shadow:none;width:100%;}',
            '  @page{size:A4;margin:7mm;}',
            '  .vocab-section{page-break-before:always!important;break-before:page!important;}',
            '  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;color-adjust:exact!important;}',
            '}'
        ].join('');

        return '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">' +
            '<title>' + title + '（第' + pid + '套）</title>' +
            '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet">' +
            '<style>' + css + '</style></head><body>' +
            '<div class="toolbar"><span>S-Class 彩色解析讲义 · 打印时请勾选「背景图形」</span>' +
            '<button type="button" onclick="window.print()">打印 / 另存 PDF</button></div>' +
            '<div class="sheet theme-' + t.name + '">' +
            '<div class="hero">' +
            '<div class="hero-deco deco-1"></div><div class="hero-deco deco-2"></div><div class="hero-deco deco-3"></div>' +
            '<div class="hero-inner">' +
            '<div class="hero-brand">S-CLASS · 高三英语 CEE</div>' +
            '<div class="hero-title">' + title + '</div>' +
            '<div class="hero-sub">第 ' + pid + ' 套' + (subtitle ? ' · ' + subtitle : '') + ' · ' + escapeHtml(metaLine) + '</div>' +
            '<div class="stats">' +
            '<div class="stat"><b>' + questions.length + '</b><span>题目解析</span></div>' +
            '<div class="stat"><b>' + vocabItems.length + '</b><span>词汇精讲</span></div>' +
            '<div class="stat"><b>V3</b><span>彩色排版讲义</span></div>' +
            '</div></div></div>' +
            '<div class="ribbon"></div>' +
            '<div class="pad">' +
            '<div class="sec"><div class="sec-num">1</div><div class="sec-text"><h3>完整短文</h3><p>答案已填入 · 精讲词汇彩色标注</p></div><div class="sec-line"></div></div>' +
            '<div class="tip"><div class="tip-ico">!</div><div>彩色高亮 = 词汇精讲条目在原文中的形式；上标数字对应第 3 部分序号。打印/另存 PDF 时请开启「背景图形 / Background graphics」以保留配色。</div></div>' +
            '<div class="passage-wrap"><div class="passage">' + (passageHtml || '<p>（无短文）</p>') + '</div></div>' +
            '<div class="sec"><div class="sec-num">2</div><div class="sec-text"><h3>题目解析</h3><p>答案 · 解析 · 考点 · 选项补充</p></div><div class="sec-line"></div></div>' +
            (explainBlocks || '<p class="tip">暂无解析内容</p>') +
            '</div>' +
            '<div class="vocab-section">' +
            '<div class="vocab-hero"><h2>3 · 词汇 · 词组 · 固定搭配 · 固定表达</h2>' +
            '<p>共 ' + vocabItems.length + ' 项 · 原型词条 · 句中语法用法 · 高价值例句</p></div>' +
            '<div class="vocab-pad"><div class="v-grid">' + (vocabBlocks || '<p class="tip">词汇包尚未生成</p>') + '</div>' +
            '<div class="footer"><strong>S-Class</strong> · s-class.top/CEE · Paper ' + pid + ' · 彩色解析讲义</div></div>' +
            '</div></div></body></html>';
    }

    function openPrintWindow(html) {
        const w = window.open('', '_blank');
        if (!w) throw new Error('弹窗被拦截，请允许本站打开新窗口后重试');
        w.document.write(html);
        w.document.close();
        w.focus();
        // 先展示彩色排版预览，由用户点击工具栏「打印 / 另存 PDF」
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
