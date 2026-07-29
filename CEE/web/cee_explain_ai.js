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

    /** 四类词条分色：印刷友好、对比清晰 */
    var TYPE_THEME = {
        vocabulary: { label: '词汇', key: 'vocab', accent: '#0f766e', soft: '#ecfdf5', chip: '#134e4a' },
        phrase: { label: '词组', key: 'phrase', accent: '#1d4ed8', soft: '#eff6ff', chip: '#1e3a8a' },
        collocation: { label: '固定搭配', key: 'colloc', accent: '#c2410c', soft: '#fff7ed', chip: '#9a3412' },
        fixed_expression: { label: '固定表达', key: 'fixed', accent: '#be123c', soft: '#fff1f2', chip: '#9f1239' }
    };

    function typeLabel(type) {
        return TYPE_LABELS[type] || type || '词汇';
    }

    function typeTheme(type) {
        return TYPE_THEME[type] || TYPE_THEME.vocabulary;
    }

    function buildExplainPdfHtml(opts) {
        const o = opts || {};
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
        const today = (function () {
            const d = new Date();
            return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        })();

        let explainBlocks = '';
        questions.forEach(function (q) {
            const num = escapeHtml(String(q.number != null ? q.number : ''));
            const answer = escapeHtml(String(q.answerText || ''));
            const explanation = escapeHtml(q.explanation || '');
            const kps = Array.isArray(q.knowledge_points) ? q.knowledge_points.map(escapeHtml).join('、') : '';
            const supplement = escapeHtml(q.supplement || '');
            const extra = escapeHtml(q.extraLine || '');
            explainBlocks +=
                '<article class="q-block">' +
                '<header class="q-head">' +
                '<span class="q-num">' + num + '</span>' +
                '<div class="q-head-main">' +
                (extra ? '<span class="q-extra">' + extra + '</span>' : '') +
                '<span class="q-ans">答案 · ' + answer + '</span>' +
                '</div></header>' +
                (explanation ? '<p class="q-exp">' + explanation + '</p>' : '') +
                (kps ? '<p class="q-kp"><span class="q-kp-label">考点</span>' + kps + '</p>' : '') +
                (supplement ? '<pre class="q-sup">' + supplement + '</pre>' : '') +
                '</article>';
        });

        const typeCounts = { vocabulary: 0, phrase: 0, collocation: 0, fixed_expression: 0 };
        vocabItems.forEach(function (it) {
            if (typeCounts[it.type] != null) typeCounts[it.type]++;
            else typeCounts.vocabulary++;
        });

        let vocabBlocks = '';
        vocabItems.forEach(function (it, idx) {
            const theme = typeTheme(it.type);
            vocabBlocks +=
                '<article class="v-card v-' + theme.key + '" style="--v-accent:' + theme.accent + ';--v-soft:' + theme.soft + ';--v-chip:' + theme.chip + '">' +
                '<header class="v-head">' +
                '<span class="v-idx">' + String(idx + 1).padStart(2, '0') + '</span>' +
                '<div class="v-title">' +
                '<strong class="v-term" lang="en">' + escapeHtml(it.term) + '</strong>' +
                '<span class="v-type">' + escapeHtml(theme.label) + '</span>' +
                '</div></header>' +
                '<div class="v-body">' +
                '<div class="v-row v-row-en"><span class="v-label">EN</span><p>' + escapeHtml(it.definition_en) + '</p></div>' +
                '<div class="v-row v-row-zh"><span class="v-label">中文</span><p>' + escapeHtml(it.definition_zh) + '</p></div>' +
                (it.from_passage
                    ? '<div class="v-row v-row-from"><span class="v-label">原文</span><p>' + escapeHtml(it.from_passage) + '</p></div>'
                    : '') +
                '<div class="v-ex-box">' +
                '<div class="v-ex-kicker">例句 · Example</div>' +
                '<p class="v-ex" lang="en">' + escapeHtml(it.example_en) + '</p>' +
                '<p class="v-ex-zh">' + escapeHtml(it.example_zh) + '</p>' +
                '</div></div></article>';
        });

        const legendChips = [
            ['vocabulary', typeCounts.vocabulary],
            ['phrase', typeCounts.phrase],
            ['collocation', typeCounts.collocation],
            ['fixed_expression', typeCounts.fixed_expression]
        ]
            .filter(function (pair) { return pair[1] > 0; })
            .map(function (pair) {
                const th = typeTheme(pair[0]);
                return (
                    '<span class="legend-chip" style="--chip:' + th.accent + ';--chip-soft:' + th.soft + '">' +
                    escapeHtml(th.label) + ' · ' + pair[1] +
                    '</span>'
                );
            })
            .join('');

        const css = [
            '*{box-sizing:border-box;margin:0;padding:0;}',
            'body{font-family:"Noto Sans SC","Source Han Sans SC","PingFang SC","Microsoft YaHei",sans-serif;font-size:10.5pt;line-height:1.65;color:#0f172a;background:#e8eef6;}',
            '.page{width:210mm;min-height:297mm;margin:18px auto;background:#fff;padding:0;box-shadow:0 8px 28px rgba(15,23,42,.12);overflow:hidden;}',
            '.doc-hero{position:relative;padding:22px 18mm 20px;color:#fff;background:linear-gradient(135deg,#0b1f3a 0%,#0f3d5e 42%,#0f766e 100%);}',
            '.doc-hero::after{content:"";position:absolute;right:-30px;top:-40px;width:180px;height:180px;border-radius:50%;background:rgba(125,211,252,.18);}',
            '.doc-hero-inner{position:relative;z-index:1;}',
            '.brand-row{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px;}',
            '.brand-pill,.meta-pill{display:inline-flex;align-items:center;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:4px 11px;font-size:9pt;font-weight:700;letter-spacing:.08em;}',
            '.meta-pill{background:rgba(255,255,255,.12);}',
            '.hero-kicker{font-size:9pt;font-weight:800;letter-spacing:.2em;color:#7dd3fc;text-transform:uppercase;margin-bottom:6px;}',
            '.exam-title{font-size:20pt;font-weight:800;letter-spacing:.04em;line-height:1.2;margin-bottom:6px;}',
            '.exam-sub{font-size:10.5pt;color:rgba(255,255,255,.86);}',
            '.hero-stats{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;}',
            '.hero-stat{min-width:88px;padding:8px 12px;border-radius:12px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);}',
            '.hero-stat span{display:block;font-size:8.5pt;color:rgba(255,255,255,.7);margin-bottom:2px;}',
            '.hero-stat strong{font-size:12pt;}',
            '.doc-body{padding:12px 15mm 16mm;}',
            '.sec{display:flex;align-items:center;gap:10px;margin:18px 0 10px;padding:8px 12px;border-radius:12px;background:linear-gradient(90deg,#f1f5f9,#fff);border:1px solid #e2e8f0;page-break-after:avoid;}',
            '.sec-index{display:grid;place-items:center;width:28px;height:28px;border-radius:9px;background:#0f3d5e;color:#fff;font-size:10pt;font-weight:800;}',
            '.sec-copy{display:grid;gap:1px;}',
            '.sec-copy strong{font-size:12.5pt;letter-spacing:.02em;}',
            '.sec-copy span{font-size:9pt;color:#64748b;}',
            '.sec-passage .sec-index{background:#0f766e;}',
            '.sec-explain .sec-index{background:#1d4ed8;}',
            '.passage{text-align:justify;font-size:10.2pt;line-height:1.9;padding:12px 14px;border-radius:14px;border:1px solid #cce3dc;background:linear-gradient(180deg,#f3fbf8,#fff);margin-bottom:8px;}',
            '.passage p{text-indent:2em;margin-bottom:7px;}',
            '.passage p:last-child{margin-bottom:0;}',
            '.q-block{margin-bottom:10px;padding:10px 12px;border-radius:14px;border:1px solid #dbe4f0;background:#fff;border-left:5px solid #1d4ed8;page-break-inside:avoid;break-inside:avoid;}',
            '.q-head{display:flex;align-items:center;gap:10px;margin-bottom:6px;}',
            '.q-num{display:grid;place-items:center;min-width:30px;height:30px;padding:0 6px;border-radius:10px;background:#1d4ed8;color:#fff;font-weight:800;font-size:10pt;}',
            '.q-head-main{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;}',
            '.q-ans{font-weight:800;color:#1e3a8a;}',
            '.q-extra{color:#0f766e;font-size:9.5pt;font-weight:700;}',
            '.q-exp{margin:4px 0 6px;color:#1e293b;}',
            '.q-kp{display:flex;align-items:flex-start;gap:8px;font-size:9.5pt;color:#475569;margin-bottom:4px;}',
            '.q-kp-label{flex:0 0 auto;border-radius:999px;padding:1px 8px;background:#e2e8f0;color:#334155;font-weight:700;}',
            '.q-sup{white-space:pre-wrap;font-family:inherit;font-size:9pt;color:#475569;background:#f8fafc;padding:8px 10px;border-radius:10px;border:1px dashed #cbd5e1;margin-top:4px;}',
            /* —— 词汇专章：强制另页 —— */
            '.vocab-section{page-break-before:always;break-before:page;margin-top:0;}',
            '.vocab-banner{position:relative;overflow:hidden;margin:0 0 12px;padding:16px 16px 14px;border-radius:16px;color:#fff;background:linear-gradient(125deg,#0b1f3a 0%,#134e4a 48%,#1d4ed8 120%);page-break-after:avoid;break-after:avoid;page-break-inside:avoid;}',
            '.vocab-banner::before{content:"";position:absolute;right:-20px;bottom:-40px;width:140px;height:140px;border-radius:50%;background:rgba(251,191,36,.16);}',
            '.vocab-banner-kicker{position:relative;z-index:1;font-size:8.5pt;font-weight:800;letter-spacing:.18em;color:#a5f3fc;margin-bottom:4px;}',
            '.vocab-banner h2{position:relative;z-index:1;font-size:15pt;font-weight:800;letter-spacing:.02em;margin-bottom:4px;}',
            '.vocab-banner p{position:relative;z-index:1;font-size:9.5pt;color:rgba(255,255,255,.88);max-width:520px;}',
            '.vocab-legend{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;}',
            '.legend-chip{display:inline-flex;align-items:center;border-radius:999px;padding:3px 10px;font-size:8.5pt;font-weight:800;color:var(--chip);background:var(--chip-soft);border:1px solid #cbd5e1;}',
            '.v-card{margin-bottom:10px;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;background:#fff;page-break-inside:avoid;break-inside:avoid;box-shadow:0 1px 0 rgba(15,23,42,.04);}',
            '.v-head{display:flex;align-items:center;gap:10px;padding:9px 12px;background:linear-gradient(90deg,var(--v-soft),#fff 62%);border-bottom:1px solid #e2e8f0;}',
            '.v-idx{display:grid;place-items:center;width:28px;height:28px;border-radius:9px;background:var(--v-accent);color:#fff;font-size:9pt;font-weight:800;}',
            '.v-title{display:flex;flex-wrap:wrap;align-items:center;gap:8px;min-width:0;flex:1;}',
            '.v-term{font-family:"Times New Roman",Georgia,"Noto Serif SC",serif;font-size:13pt;font-weight:700;color:#0f172a;letter-spacing:.01em;}',
            '.v-type{display:inline-flex;align-items:center;border-radius:999px;padding:2px 9px;font-size:8.5pt;font-weight:800;color:#fff;background:var(--v-chip);}',
            '.v-body{padding:8px 12px 10px;border-left:5px solid var(--v-accent);}',
            '.v-row{display:grid;grid-template-columns:42px 1fr;gap:8px;align-items:start;margin-bottom:5px;}',
            '.v-label{display:inline-flex;justify-content:center;align-items:center;height:20px;border-radius:6px;font-size:8pt;font-weight:800;letter-spacing:.04em;}',
            '.v-row-en .v-label{background:#dbeafe;color:#1d4ed8;}',
            '.v-row-zh .v-label{background:#d1fae5;color:#047857;}',
            '.v-row-from .v-label{background:#fef3c7;color:#b45309;}',
            '.v-row p{font-size:10pt;color:#1e293b;line-height:1.55;}',
            '.v-row-from p{font-size:9.5pt;color:#64748b;font-style:italic;}',
            '.v-ex-box{margin-top:6px;padding:8px 10px;border-radius:10px;background:var(--v-soft);border:1px solid #e2e8f0;}',
            '.v-ex-kicker{font-size:8pt;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--v-chip);margin-bottom:3px;}',
            '.v-ex{font-family:"Times New Roman",Georgia,serif;font-size:10.5pt;color:#0f172a;margin-bottom:2px;}',
            '.v-ex-zh{font-size:9.5pt;color:#475569;}',
            '.footer{margin-top:16px;text-align:center;font-size:8.5pt;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:8px;}',
            '.note{font-size:9.5pt;color:#64748b;margin-bottom:8px;}',
            '@media print{',
            'body{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;}',
            '.page{margin:0;box-shadow:none;width:100%;min-height:auto;}',
            '.vocab-section{page-break-before:always;break-before:page;}',
            '.v-card,.q-block{page-break-inside:avoid;break-inside:avoid;}',
            '.vocab-banner{page-break-after:avoid;break-after:avoid;}',
            '@page{size:A4;margin:10mm 11mm;}',
            '}'
        ].join('');

        return (
            '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>' +
            title +
            '（第' +
            pid +
            '套）</title><style>' +
            css +
            '</style></head><body><div class="page">' +
            '<header class="doc-hero"><div class="doc-hero-inner">' +
            '<div class="brand-row"><span class="brand-pill">S-CLASS · CEE</span>' +
            '<span class="meta-pill">第 ' +
            pid +
            ' 套</span></div>' +
            '<p class="hero-kicker">Explain &amp; Vocab Atlas</p>' +
            '<h1 class="exam-title">' +
            title +
            '</h1>' +
            '<p class="exam-sub">' +
            (subtitle ? subtitle + ' · ' : '') +
            '答案解析 · 语境词汇精讲 · ' +
            today +
            '</p>' +
            '<div class="hero-stats">' +
            '<div class="hero-stat"><span>题目</span><strong>' +
            questions.length +
            '</strong></div>' +
            '<div class="hero-stat"><span>词汇项</span><strong>' +
            vocabItems.length +
            '</strong></div>' +
            '<div class="hero-stat"><span>模块</span><strong>解析 PDF</strong></div>' +
            '</div></div></header>' +
            '<div class="doc-body">' +
            '<div class="sec sec-passage"><span class="sec-index">01</span><div class="sec-copy"><strong>完整短文</strong><span>答案已填入 · 建议通读后再看解析</span></div></div>' +
            '<div class="passage">' +
            (passageHtml || '<p>（无短文）</p>') +
            '</div>' +
            '<div class="sec sec-explain"><span class="sec-index">02</span><div class="sec-copy"><strong>题目解析</strong><span>答案 · 考点 · 选项/变形补充</span></div></div>' +
            (explainBlocks || '<p class="note">暂无解析内容</p>') +
            '<section class="vocab-section">' +
            '<div class="vocab-banner">' +
            '<p class="vocab-banner-kicker">SECTION 03 · VOCABULARY PACK</p>' +
            '<h2>词汇 · 词组 · 固定搭配 · 固定表达</h2>' +
            '<p>共 ' +
            vocabItems.length +
            ' 项 · 中英释义 + 原文关联 + 高使用价值例句（DeepSeek）。建议结合短文语境背记。</p>' +
            (legendChips ? '<div class="vocab-legend">' + legendChips + '</div>' : '') +
            '</div>' +
            (vocabBlocks || '<p class="note">词汇包尚未生成</p>') +
            '</section>' +
            '<div class="footer">S-Class · s-class.top/CEE · Paper ' +
            pid +
            ' · 印刷请开启「背景图形」以保留配色</div>' +
            '</div></div></body></html>'
        );
    }

    function openPrintWindow(html) {
        const w = window.open('', '_blank');
        if (!w) throw new Error('弹窗被拦截，请允许本站打开新窗口后重试');
        w.document.write(html);
        w.document.close();
        w.focus();
        setTimeout(function () { w.print(); }, 400);
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
        typeTheme: typeTheme,
        TYPE_THEME: TYPE_THEME,
        buildExplainPdfHtml: buildExplainPdfHtml,
        openPrintWindow: openPrintWindow
    };
})(typeof window !== 'undefined' ? window : this);
