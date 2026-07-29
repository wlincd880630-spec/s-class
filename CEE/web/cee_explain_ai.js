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

    function typeLabel(type) {
        return TYPE_LABELS[type] || type || '词汇';
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

        let explainBlocks = '';
        questions.forEach(function (q) {
            const num = escapeHtml(String(q.number != null ? q.number : ''));
            const answer = escapeHtml(String(q.answerText || ''));
            const explanation = escapeHtml(q.explanation || '');
            const kps = Array.isArray(q.knowledge_points) ? q.knowledge_points.map(escapeHtml).join('、') : '';
            const supplement = escapeHtml(q.supplement || '');
            const extra = escapeHtml(q.extraLine || '');
            explainBlocks += '<div class="q-block">' +
                '<div class="q-head"><span class="q-num">[' + num + ']</span> ' +
                (extra ? '<span class="q-extra">' + extra + '</span> ' : '') +
                '<span class="q-ans">答案：' + answer + '</span></div>' +
                (explanation ? '<p class="q-exp">' + explanation + '</p>' : '') +
                (kps ? '<p class="q-kp">考点：' + kps + '</p>' : '') +
                (supplement ? '<pre class="q-sup">' + supplement + '</pre>' : '') +
                '</div>';
        });

        let vocabBlocks = '';
        vocabItems.forEach(function (it, idx) {
            vocabBlocks += '<div class="v-block">' +
                '<div class="v-head"><span class="v-idx">' + (idx + 1) + '.</span> ' +
                '<span class="v-term">' + escapeHtml(it.term) + '</span> ' +
                '<span class="v-type">' + escapeHtml(typeLabel(it.type)) + '</span></div>' +
                '<p><strong>EN</strong> ' + escapeHtml(it.definition_en) + '</p>' +
                '<p><strong>中文</strong> ' + escapeHtml(it.definition_zh) + '</p>' +
                (it.from_passage ? '<p class="v-from">原文关联：' + escapeHtml(it.from_passage) + '</p>' : '') +
                '<p class="v-ex"><strong>例句</strong> ' + escapeHtml(it.example_en) + '</p>' +
                '<p class="v-ex-zh">' + escapeHtml(it.example_zh) + '</p>' +
                '</div>';
        });

        const css = [
            '*{box-sizing:border-box;margin:0;padding:0;}',
            'body{font-family:"Times New Roman","SimSun","宋体",serif;font-size:11pt;line-height:1.75;color:#1a1a1a;background:#f0f0f0;}',
            '.page{width:210mm;margin:16px auto;background:#fff;padding:14mm 16mm;box-shadow:0 2px 16px rgba(0,0,0,0.12);}',
            '.header{text-align:center;border-bottom:2px solid #1a1a1a;padding-bottom:8px;margin-bottom:14px;}',
            '.header .brand{font-size:10pt;letter-spacing:1px;color:#555;margin-bottom:2px;}',
            '.header .exam-title{font-size:18pt;font-weight:bold;letter-spacing:3px;margin-bottom:2px;}',
            '.header .exam-sub{font-size:10.5pt;color:#444;}',
            '.sec{margin:16px 0 8px;font-size:13pt;font-weight:bold;border-left:4px solid #334155;padding-left:8px;}',
            '.passage{text-align:justify;font-size:10.5pt;line-height:1.9;padding:10px 12px;border:1px solid #ddd;margin-bottom:12px;}',
            '.passage p{text-indent:2em;margin-bottom:6px;}',
            '.q-block{border-bottom:1px dotted #ccc;padding:8px 0;page-break-inside:avoid;}',
            '.q-head{font-weight:bold;margin-bottom:4px;}',
            '.q-num{color:#1e293b;}.q-ans{color:#1d4ed8;}.q-extra{color:#047857;font-weight:normal;margin-right:6px;}',
            '.q-exp{margin:4px 0;}.q-kp{color:#555;font-size:10pt;}.q-sup{white-space:pre-wrap;font-family:inherit;font-size:9.5pt;color:#475569;background:#f8fafc;padding:6px 8px;border-radius:4px;margin-top:4px;}',
            '.v-block{border:1px solid #e2e8f0;border-radius:6px;padding:8px 10px;margin-bottom:8px;page-break-inside:avoid;}',
            '.v-head{margin-bottom:4px;}.v-idx{color:#64748b;}.v-term{font-weight:bold;font-size:12pt;}.v-type{display:inline-block;font-size:9pt;border:1px solid #94a3b8;border-radius:3px;padding:0 5px;margin-left:6px;color:#475569;}',
            '.v-from{font-size:9.5pt;color:#64748b;}.v-ex{margin-top:4px;}.v-ex-zh{color:#475569;font-size:10pt;}',
            '.footer{margin-top:14px;text-align:center;font-size:9pt;color:#888;border-top:1px solid #ddd;padding-top:6px;}',
            '.note{font-size:9.5pt;color:#666;margin-bottom:8px;}',
            '@media print{body{background:#fff;}.page{margin:0;box-shadow:none;width:100%;padding:12mm 14mm;}@page{size:A4;margin:0;}}'
        ].join('');

        return '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>' + title + '（第' + pid + '套）</title><style>' + css + '</style></head><body><div class="page">' +
            '<div class="header"><div class="brand">S-Class · 高三英语 CEE</div>' +
            '<div class="exam-title">' + title + '</div>' +
            '<div class="exam-sub">第 ' + pid + ' 套' + (subtitle ? ' · ' + subtitle : '') + '</div></div>' +
            '<div class="sec">一、完整短文（答案已填入）</div>' +
            '<div class="passage">' + (passageHtml || '<p>（无短文）</p>') + '</div>' +
            '<div class="sec">二、题目解析</div>' +
            (explainBlocks || '<p class="note">暂无解析内容</p>') +
            '<div class="sec">三、词汇 · 词组 · 固定搭配 · 固定表达（约 ' + vocabItems.length + ' 项）</div>' +
            '<p class="note">含中英文释义与高使用价值例句（DeepSeek 生成），建议结合原文语境背记。</p>' +
            (vocabBlocks || '<p class="note">词汇包尚未生成</p>') +
            '<div class="footer">S-Class · s-class.top/CEE · Paper ' + pid + '</div>' +
            '</div></body></html>';
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
        buildExplainPdfHtml: buildExplainPdfHtml,
        openPrintWindow: openPrintWindow
    };
})(typeof window !== 'undefined' ? window : this);
