(function () {
    'use strict';
    const { createApp, ref, computed, onMounted } = Vue;
    const AZURE_KEY = "3C2ai7PPgPnOLlhb1c7gBw207PAVNfVJni6JnESsPjYPaVyFeQ9YJQQJ99CGAC3pKaRXJ3w3AAAYACOG0Zbc";
    const AZURE_REGION = "eastasia";
    const DEEPSEEK_KEY = "sk-daa16008e81843deba6fefe9dce51465";
    const EMAILJS_PUBLIC = "1QhXV5G_92GdK7_DF";
    const EMAILJS_SERVICE = "service_6dfbs2n";
    const EMAILJS_TEMPLATE = "template_zso8ebh";

    function getStudentName() { return localStorage.getItem('authing-user') || localStorage.getItem('current-user') || ''; }
    function getPaperFromUrl() { const m = /[?&]paper=(\d+)/i.exec(location.search); return m ? m[1].padStart(2, '0') : ''; }

    createApp({
        setup() {
            const selectedPaperId = ref(getPaperFromUrl() || '01');
            const paperData = ref(null);
            const studentName = ref(getStudentName());
            const stage = ref('do');
            const timerStarted = ref(false);
            const timeLeft = ref(10 * 60);
            const timerInterval = ref(null);
            const choicesWord = ref({});
            const showScoreModal = ref(false);
            const scoreCorrect = ref(0);
            const scoreTotal = ref(0);
            const elapsed = ref(0);
            const WORD_MIN_SUBMIT = 7 * 60;
            const adminMode = ref(false);
            const titleClickCount = ref(0);
            const readSentences = ref([]);
            const currentReadIdx = ref(0);
            const sttEn = ref(''), sttCn = ref(''), isPlaying = ref(false), isRecordingEn = ref(false), isRecordingCn = ref(false), isEvaluating = ref(false), readEval = ref('');
            const recognizer = ref(null);
            let sttBuffer = '';
            const sessionStart = ref(new Date());
            const showDictModal = ref(false);
            const dictWord = ref('');
            const dictLoading = ref(false);
            const dictResult = ref(null);
            const dictError = ref('');
            const dictContextSentence = ref('');
            const explainPassageRef = ref(null);
            const dictLookupLog = ref([]);
            const readTranslateLog = ref([]);
            const vocabPack = ref([]);
            const vocabPackLoading = ref(false);
            const vocabPackError = ref('');
            const explainPdfLoading = ref(false);

            const canSubmit = computed(() => {
                if (!timerStarted.value) return false;
                if (adminMode.value) return true;
                return elapsed.value >= WORD_MIN_SUBMIT;
            });
            const submitDoLabel = computed(() => {
                if (!timerStarted.value) return '请先开始计时';
                if (adminMode.value) return '提交（管理员）';
                const mins = Math.floor(elapsed.value / 60);
                return elapsed.value >= WORD_MIN_SUBMIT ? '提交' : '请答题满 7 分钟后再提交（已 ' + mins + ' 分钟）';
            });

            function tryAdminMode() {
                titleClickCount.value++;
                if (titleClickCount.value >= 3) {
                    titleClickCount.value = 0;
                    const pwd = prompt('请输入管理员密码：');
                    if (pwd === '123888') { adminMode.value = true; alert('已进入管理员模式。'); }
                }
            }
            function formatTime(sec) { const m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }

            function getWordAtClick(ev) {
                const x = ev.clientX, y = ev.clientY;
                let range = null;
                if (document.caretRangeFromPoint) {
                    range = document.caretRangeFromPoint(x, y);
                } else if (document.caretPositionFromPoint) {
                    const pos = document.caretPositionFromPoint(x, y);
                    if (pos && pos.offsetNode) {
                        range = document.createRange();
                        range.setStart(pos.offsetNode, pos.offset);
                        range.setEnd(pos.offsetNode, pos.offset);
                    }
                }
                if (!range) return null;
                const isWordChar = (c) => /[a-zA-Z\-']/.test(c);
                const startNode = range.startContainer;
                const endNode = range.endContainer;
                let startOffset = range.startOffset, endOffset = range.endOffset;
                const startText = startNode.textContent || '';
                while (startOffset > 0 && isWordChar(startText[startOffset - 1])) startOffset--;
                const endText = endNode.textContent || '';
                while (endOffset < endText.length && isWordChar(endText[endOffset])) endOffset++;
                try {
                    range.setStart(startNode, startOffset);
                    range.setEnd(endNode, endOffset);
                } catch (_) { return null; }
                let word = range.toString().trim();
                if (!word || word.length > 35) return null;
                if (!/^[a-zA-Z\-']+$/.test(word)) return null;
                return word;
            }

            function getFilledPassageText() {
                const s2 = paperData.value?.section_2_word_form;
                if (!s2?.questions?.length) return '';
                if ((s2.passage || '').trim()) {
                    let fullPassage = s2.passage.trim();
                    s2.questions.forEach(q => {
                        fullPassage = fullPassage.split('[' + q.number + ']').join((q.correct_form || '').trim());
                    });
                    return fullPassage;
                }
                const qs = s2.questions;
                const sorted = [...qs].sort((a, b) => a.number - b.number);
                const blankRe = /_{2,}/;
                const paras = [];
                let i = 0;
                while (i < sorted.length) {
                    const group = [sorted[i]];
                    let mergedText = (sorted[i].sentence || '').replace(blankRe, '[' + sorted[i].number + ']');
                    let j = i + 1;
                    while (j < sorted.length) {
                        const s = sorted[j].sentence || '';
                        if (!group.some(qq => s.indexOf('[' + qq.number + ']') !== -1)) break;
                        group.push(sorted[j]);
                        mergedText = s.replace(blankRe, '[' + sorted[j].number + ']');
                        j++;
                    }
                    sorted.slice(i, j).forEach(q => {
                        mergedText = mergedText.split('[' + q.number + ']').join((q.correct_form || '').trim());
                    });
                    paras.push(mergedText);
                    i = j;
                }
                return paras.join('\n\n');
            }

            function onPassageClick(ev) {
                if (stage.value !== 'explain') return;
                const word = getWordAtClick(ev);
                if (!word) return;
                dictWord.value = word;
                dictResult.value = null;
                dictError.value = '';
                dictContextSentence.value = CeeExplainAI.findContextSentence(getFilledPassageText(), word);
                showDictModal.value = true;
                dictLoading.value = true;
                fetchDict(word);
            }

            async function fetchDict(word) {
                const passage = getFilledPassageText();
                const ctx = dictContextSentence.value || CeeExplainAI.findContextSentence(passage, word);
                dictContextSentence.value = ctx;
                const prompt = CeeExplainAI.buildDictPrompt(word, passage, ctx);
                try {
                    const raw = await CeeExplainAI.callDeepSeek(DEEPSEEK_KEY, prompt);
                    const parsed = CeeExplainAI.parseJsonFromDeepSeek(raw);
                    dictResult.value = CeeExplainAI.normalizeDictResult(parsed);
                    dictLookupLog.value = [...dictLookupLog.value, {
                        word: word,
                        definition_zh: dictResult.value.definition_zh || '',
                        context_meaning_zh: dictResult.value.context_meaning_zh || ''
                    }];
                } catch (e) {
                    dictError.value = '查询失败，请重试';
                    console.error(e);
                }
                dictLoading.value = false;
            }

            function speakText(text) {
                if (!text || isPlaying.value) return;
                const toSpeak = textForTTS(text);
                if (!toSpeak) return;
                isPlaying.value = true;
                const config = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
                config.speechSynthesisVoiceName = "en-GB-RyanNeural";
                const synth = new SpeechSDK.SpeechSynthesizer(config);
                synth.speakTextAsync(toSpeak, () => { isPlaying.value = false; synth.close(); }, () => { isPlaying.value = false; synth.close(); });
            }

            function closeDictModal() {
                showDictModal.value = false;
                dictWord.value = '';
                dictResult.value = null;
                dictError.value = '';
                dictContextSentence.value = '';
            }

            async function loadPaper() {
                const id = selectedPaperId.value;
                if (!id) { paperData.value = null; return; }
                try {
                    const r = await fetch('../enriched_questions/' + id + '.json');
                    if (!r.ok) throw new Error('Network');
                    paperData.value = await r.json();
                    stage.value = 'do';
                    timerStarted.value = false;
                    timeLeft.value = 10 * 60;
                    elapsed.value = 0;
                    choicesWord.value = {};
                    showScoreModal.value = false;
                    readSentences.value = [];
                    currentReadIdx.value = 0;
                    dictLookupLog.value = [];
                    readTranslateLog.value = [];
                    vocabPack.value = [];
                    vocabPackError.value = '';
                    sessionStart.value = new Date();
                } catch (e) {
                    console.error(e);
                    paperData.value = null;
                }
            }

            function setWordChoice(num, val) {
                choicesWord.value = { ...choicesWord.value, [num]: val };
            }

            function startTimer() {
                if (timerStarted.value) return;
                timerStarted.value = true;
                const total = 10 * 60;
                timeLeft.value = total;
                elapsed.value = 0;
                timerInterval.value = setInterval(() => {
                    elapsed.value += 1;
                    timeLeft.value = Math.max(0, total - elapsed.value);
                    if (timeLeft.value <= 0 && timerInterval.value) {
                        clearInterval(timerInterval.value);
                        timerInterval.value = null;
                    }
                }, 1000);
            }

            const wordFormPassageSegments = computed(() => {
                const s2 = paperData.value?.section_2_word_form;
                const qs = s2?.questions;
                if (!qs?.length) return [];
                const numToQ = {};
                qs.forEach(q => { numToQ[q.number] = q; });
                let passage = (s2.passage || '').trim();
                if (passage) {
                    const blanksInOrder = [];
                    let pos = 0;
                    for (;;) {
                        const m = passage.slice(pos).match(/\[(\d+)\]/);
                        if (!m) break;
                        blanksInOrder.push(parseInt(m[1], 10));
                        pos += m.index + m[0].length;
                    }
                    const segs = [];
                    let rest = passage;
                    blanksInOrder.forEach(num => {
                        const tag = '[' + num + ']';
                        const idxPos = rest.indexOf(tag);
                        if (idxPos === -1) return;
                        segs.push({ type: 'text', text: rest.slice(0, idxPos) });
                        const given = numToQ[num]?.given_word;
                        segs.push({ type: 'blank', num: num, given: (given != null && given !== '') ? given : null });
                        rest = rest.slice(idxPos + tag.length);
                    });
                    segs.push({ type: 'text', text: rest });
                    return segs;
                }
                const sorted = [...qs].sort((a, b) => a.number - b.number);
                const blankRe = /_{2,}/;
                const segs = [];
                let i = 0;
                while (i < sorted.length) {
                    const group = [sorted[i]];
                    let mergedText = (sorted[i].sentence || '').replace(blankRe, '[' + sorted[i].number + ']');
                    let j = i + 1;
                    while (j < sorted.length) {
                        const s = sorted[j].sentence || '';
                        if (!group.some(qq => s.indexOf('[' + qq.number + ']') !== -1)) break;
                        group.push(sorted[j]);
                        mergedText = s.replace(blankRe, '[' + sorted[j].number + ']');
                        j++;
                    }
                    const blanksInOrder = [];
                    let pos = 0;
                    for (;;) {
                        const m = mergedText.slice(pos).match(/\[(\d+)\]/);
                        if (!m) break;
                        blanksInOrder.push(parseInt(m[1], 10));
                        pos += m.index + m[0].length;
                    }
                    if (segs.length) segs.push({ type: 'text', text: '\n\n' });
                    let rest = mergedText;
                    blanksInOrder.forEach(num => {
                        const tag = '[' + num + ']';
                        const idxPos = rest.indexOf(tag);
                        if (idxPos === -1) return;
                        segs.push({ type: 'text', text: rest.slice(0, idxPos) });
                        const given = numToQ[num]?.given_word;
                        segs.push({ type: 'blank', num: num, given: (given != null && given !== '') ? given : null });
                        rest = rest.slice(idxPos + tag.length);
                    });
                    segs.push({ type: 'text', text: rest });
                    i = j;
                }
                return segs;
            });

            function submitDo() {
                if (!canSubmit.value || !paperData.value) return;
                const qs = paperData.value.section_2_word_form.questions || [];
                let correct = 0;
                qs.forEach(q => {
                    const u = (choicesWord.value[q.number] || '').trim().toLowerCase();
                    const c = (q.correct_form || '').trim().toLowerCase();
                    if (u === c) correct++;
                });
                scoreCorrect.value = correct;
                scoreTotal.value = qs.length;
                showScoreModal.value = true;
            }

            function closeScoreAndGoExplain() { showScoreModal.value = false; stage.value = 'explain'; }

            const explainWordPassageHtml = computed(() => {
                const s2 = paperData.value?.section_2_word_form;
                const qs = s2?.questions;
                if (!qs?.length) return '';
                let p = (s2.passage || '').trim();
                if (p) {
                    qs.forEach(q => {
                        const u = (choicesWord.value[q.number] || '').trim();
                        const c = (q.correct_form || '').trim();
                        const isRight = u.toLowerCase() === c.toLowerCase();
                        const span = '<span class="' + (isRight ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') + ' px-1 rounded">' + (u || '未填') + '</span>';
                        const withCorrect = !isRight && c ? span + ' <span class="bg-emerald-100 text-emerald-800 px-1 rounded">(' + c + ')</span>' : span;
                        p = p.split('[' + q.number + ']').join(withCorrect);
                    });
                    return p.replace(/\n/g, '<br><br>');
                }
                const sorted = [...qs].sort((a, b) => a.number - b.number);
                const blankRe = /_{2,}/;
                const paras = [];
                let idx = 0;
                while (idx < sorted.length) {
                    const group = [sorted[idx]];
                    let mergedText = (sorted[idx].sentence || '').replace(blankRe, '[' + sorted[idx].number + ']');
                    let j = idx + 1;
                    while (j < sorted.length) {
                        const s = sorted[j].sentence || '';
                        if (!group.some(qq => s.indexOf('[' + qq.number + ']') !== -1)) break;
                        group.push(sorted[j]);
                        mergedText = s.replace(blankRe, '[' + sorted[j].number + ']');
                        j++;
                    }
                    paras.push(mergedText);
                    idx = j;
                }
                p = paras.join('\n\n');
                sorted.forEach(q => {
                    const u = (choicesWord.value[q.number] || '').trim();
                    const c = (q.correct_form || '').trim();
                    const isRight = u.toLowerCase() === c.toLowerCase();
                    const span = '<span class="' + (isRight ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') + ' px-1 rounded">' + (u || '未填') + '</span>';
                    const withCorrect = !isRight && c ? span + ' <span class="bg-emerald-100 text-emerald-800 px-1 rounded">(' + c + ')</span>' : span;
                    p = p.split('[' + q.number + ']').join(withCorrect);
                });
                return p.replace(/\n/g, '<br><br>');
            });

            function goReadTranslate() {
                stage.value = 'read';
                const fullPassage = getFilledPassageText();
                if (!fullPassage) {
                    readSentences.value = ['No content.'];
                    currentReadIdx.value = 0;
                    sttEn.value = ''; sttCn.value = ''; readEval.value = '';
                    return;
                }
                readSentences.value = fullPassage.split(/(?<=[.!?])\s+/).filter(Boolean).map(s => s.trim());
                if (!readSentences.value.length) readSentences.value = ['No sentences.'];
                currentReadIdx.value = 0;
                sttEn.value = ''; sttCn.value = ''; readEval.value = '';
                readTranslateLog.value = [];
            }

            const currentReadSentence = computed(() => readSentences.value[currentReadIdx.value] || '');

            function textForTTS(text) {
                if (!text) return '';
                return text.replace(/（[^）]+）/g, '').replace(/\([^)]*[\u4e00-\u9fa5][^)]*\)/g, '').replace(/\s+/g, ' ').trim();
            }
            function playTTS() {
                const raw = currentReadSentence.value;
                const toSpeak = textForTTS(raw);
                if (!toSpeak) return;
                isPlaying.value = true;
                const config = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
                config.speechSynthesisVoiceName = "en-GB-RyanNeural";
                const synth = new SpeechSDK.SpeechSynthesizer(config);
                synth.speakTextAsync(toSpeak, () => { isPlaying.value = false; synth.close(); }, () => { isPlaying.value = false; synth.close(); });
            }

            function toggleRecord(lang) {
                const isEn = lang === 'en';
                if ((isEn && isRecordingEn.value) || (!isEn && isRecordingCn.value)) { stopRecord(isEn); return; }
                stopRecord(null);
                sttBuffer = '';
                if (isEn) isRecordingEn.value = true; else isRecordingCn.value = true;
                const config = SpeechSDK.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
                config.speechRecognitionLanguage = isEn ? "en-GB" : "zh-CN";
                const audio = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
                const rec = new SpeechSDK.SpeechRecognizer(config, audio);
                rec.recognized = (s, e) => { if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech && e.result.text) sttBuffer += (sttBuffer ? ' ' : '') + e.result.text; };
                rec.startContinuousRecognitionAsync(() => { recognizer.value = rec; }, (err) => { console.error(err); if (isEn) isRecordingEn.value = false; else isRecordingCn.value = false; });
            }
            function stopRecord(forLang) {
                if (!recognizer.value) { isRecordingEn.value = false; isRecordingCn.value = false; return; }
                const rec = recognizer.value;
                recognizer.value = null;
                rec.stopContinuousRecognitionAsync(() => {
                    if (forLang === true) sttEn.value = sttBuffer; else if (forLang === false) sttCn.value = sttBuffer;
                    rec.close();
                    sttBuffer = '';
                    isRecordingEn.value = false;
                    isRecordingCn.value = false;
                }, () => {
                    if (forLang === true) sttEn.value = sttBuffer; else if (forLang === false) sttCn.value = sttBuffer;
                    try { rec.close(); } catch (_) {}
                    isRecordingEn.value = false;
                    isRecordingCn.value = false;
                });
            }

            async function evaluateRead() {
                if (!sttEn.value) return;
                isEvaluating.value = true;
                readEval.value = '';
                const prompt = 'Task: English Tutor. Target: "' + currentReadSentence.value + '" Student Reading: "' + sttEn.value + '" Student Translation: "' + sttCn.value + '". Rules: 1) Give Pronunciation Score 0-100. 2) Check translation. 3) Give standard translation. Output concise Chinese Markdown.';
                try {
                    const res = await fetch("https://api.deepseek.com/chat/completions", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + DEEPSEEK_KEY },
                        body: JSON.stringify({ model: "deepseek-v4-flash", messages: [{ role: "user", content: prompt }] })
                    });
                    const data = await res.json();
                    readEval.value = data.choices?.[0]?.message?.content || '评价失败';
                    readTranslateLog.value = [...readTranslateLog.value, { sentence: currentReadSentence.value, sttEn: sttEn.value, sttCn: sttCn.value, eval: readEval.value }];
                } catch (e) { readEval.value = '评价服务连接失败'; }
                isEvaluating.value = false;
            }

            function prevRead() { if (currentReadIdx.value > 0) { currentReadIdx.value--; sttEn.value = ''; sttCn.value = ''; readEval.value = ''; } }
            function nextRead() { if (currentReadIdx.value < readSentences.value.length - 1) { currentReadIdx.value++; sttEn.value = ''; sttCn.value = ''; readEval.value = ''; } }
            function renderMarkdown(t) { return typeof marked !== 'undefined' ? marked.parse(t || '') : (t || ''); }

            function formatDateTime(d) {
                const pad = n => ('0' + n).slice(-2);
                return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
            }
            function formatDuration(ms) { const s = Math.floor(ms / 1000), m = Math.floor(s / 60); return m + 'min ' + (s % 60) + 's'; }
            function escapeHtml(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

            onMounted(() => loadPaper());

            function finishAndSendReport() {
                const endTime = new Date();
                const durationMs = endTime - sessionStart.value;
                const contentName = 'CEE 高三英语 ' + (paperData.value?.paper_id || selectedPaperId.value) + ' - 词形变化填空';
                const qs = paperData.value?.section_2_word_form?.questions || [];
                let detailsRows = '';
                qs.forEach(q => {
                    const userAns = (choicesWord.value[q.number] || '').trim() || '未填';
                    const correctAns = (q.correct_form || '').trim();
                    const isRight = userAns !== '未填' && userAns.toLowerCase() === correctAns.toLowerCase();
                    const hint = (q.given_word != null && q.given_word !== '') ? q.given_word : '无提示';
                    detailsRows += '<tr><td>' + q.number + '</td><td>' + hint + '</td><td>' + userAns + '</td><td>' + correctAns + '</td><td>' + (isRight ? '✓' : '✗') + '</td></tr>';
                });
                let details_html = '<p><strong>得分：' + scoreCorrect.value + ' / ' + scoreTotal.value + '</strong></p><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px;"><thead><tr><th>题号</th><th>所给词/提示</th><th>学生答案</th><th>正确答案</th><th>对错</th></tr></thead><tbody>' + detailsRows + '</tbody></table>';
                if (dictLookupLog.value.length) {
                    details_html += '<p style="margin-top:16px;"><strong>📖 点读查词记录</strong></p><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:520px;"><thead><tr><th>词汇</th><th>释义</th></tr></thead><tbody>';
                    dictLookupLog.value.forEach((e) => { details_html += '<tr><td>' + escapeHtml(e.word) + '</td><td>' + escapeHtml(e.definition_zh) + '</td></tr>'; });
                    details_html += '</tbody></table>';
                }
                if (readTranslateLog.value.length) {
                    details_html += '<p style="margin-top:16px;"><strong>🎤 朗读与翻译 · AI 评价结果</strong></p>';
                    readTranslateLog.value.forEach((item, i) => {
                        details_html += '<div style="margin-bottom:14px;padding:10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;"><p><strong>句 ' + (i + 1) + '</strong> 原文：' + escapeHtml(item.sentence) + '</p><p>学生朗读：' + escapeHtml(item.sttEn) + '</p><p>学生翻译：' + escapeHtml(item.sttCn) + '</p><div style="margin-top:8px;">' + (typeof marked !== 'undefined' ? marked.parse(item.eval || '') : escapeHtml(item.eval)) + '</div></div>';
                    });
                }
                const templateParams = {
                    student_name: studentName.value || 'Unknown',
                    content_name: contentName,
                    page_url: location.href,
                    page_url_display: contentName,
                    start_time: formatDateTime(sessionStart.value),
                    end_time: formatDateTime(endTime),
                    duration: formatDuration(durationMs),
                    score: scoreCorrect.value,
                    total: scoreTotal.value,
                    accuracy: scoreTotal.value ? (Math.round(scoreCorrect.value / scoreTotal.value * 100) + '%') : '-',
                    details_html: details_html
                };
                emailjs.init(EMAILJS_PUBLIC);
                emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams).then(() => alert('报告已发送')).catch(() => alert('报告发送失败'));
            }

            async function ensureVocabPack() {
                if (vocabPack.value && vocabPack.value.length) return vocabPack.value;
                vocabPackLoading.value = true;
                vocabPackError.value = '';
                try {
                    const passage = getFilledPassageText();
                    const prompt = CeeExplainAI.buildVocabPackPrompt(passage);
                    const raw = await CeeExplainAI.callDeepSeek(DEEPSEEK_KEY, prompt, { temperature: 0.5 });
                    const parsed = CeeExplainAI.parseJsonFromDeepSeek(raw);
                    vocabPack.value = CeeExplainAI.normalizeVocabPack(parsed);
                    if (!vocabPack.value.length) throw new Error('empty vocab pack');
                } catch (e) {
                    console.error(e);
                    vocabPackError.value = '词汇包生成失败，请重试';
                    throw e;
                } finally {
                    vocabPackLoading.value = false;
                }
                return vocabPack.value;
            }

            async function downloadExplainPdf() {
                if (!paperData.value?.section_2_word_form || explainPdfLoading.value) return;
                explainPdfLoading.value = true;
                try {
                    await ensureVocabPack();
                    const pid = String(paperData.value.paper_id || selectedPaperId.value);
                    const qs = paperData.value.section_2_word_form.questions || [];
                    const questions = qs.map(function (q) {
                        const hint = (q.given_word != null && q.given_word !== '')
                            ? ('所给词: ' + q.given_word)
                            : '无提示';
                        return {
                            number: q.number,
                            answerText: q.correct_form || '',
                            extraLine: hint,
                            explanation: q.explanation || '',
                            knowledge_points: q.knowledge_points || [],
                            supplement: q.supplement || ''
                        };
                    });
                    const html = CeeExplainAI.buildExplainPdfHtml({
                        paperId: pid,
                        title: '词形填空 · 答案解析与词汇精讲',
                        subtitle: 'Word Form · Explanations & Vocabulary',
                        passageText: getFilledPassageText(),
                        questions: questions,
                        vocabItems: vocabPack.value
                    });
                    CeeExplainAI.openPrintWindow(html);
                } catch (e) {
                    alert(vocabPackError.value || '导出解析 PDF 失败，请重试');
                } finally {
                    explainPdfLoading.value = false;
                }
            }

            function downloadPdf() {
                if (!paperData.value?.section_2_word_form) return;
                const pid = String(paperData.value.paper_id || selectedPaperId.value);
                const s2 = paperData.value.section_2_word_form;
                let passage = (s2.passage || '').trim();
                const qs = s2.questions || [];
                var totalScore = qs.length * 2;
                var parts = passage.split(/(\[\d+\])/);
                var passageEscaped = parts.map(function (p) {
                    var m = p.match(/^\[(\d+)\]$/);
                    if (m) return '<span class="blank">' + m[1] + '</span>';
                    return (p || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                }).join('');
                var paras = passageEscaped.split(/\n\n+/).filter(Boolean);
                var passageHtml = paras.map(function (p) { return '<p>' + p + '</p>'; }).join('\n      ');
                var hintsGridHtml = '';
                qs.forEach(function (q) {
                    var hint = (q.given_word != null && q.given_word !== '') ? '所给词：' + escapeHtml(String(q.given_word)) : '无提示';
                    hintsGridHtml += '<div class="question-item"><span class="question-num">' + q.number + '.</span><span class="option">' + hint + '</span></div>\n      ';
                });
                var answerGridHtml = '';
                qs.forEach(function (q) {
                    answerGridHtml += '<div class="answer-cell"><div class="cell-num">' + q.number + '</div><div class="cell-answer"></div></div>\n        ';
                });
                var manusCss = '*{box-sizing:border-box;margin:0;padding:0;}body{font-family:"Times New Roman","SimSun","宋体",serif;font-size:12pt;line-height:1.8;color:#1a1a1a;background:#f0f0f0;}' +
                    '.page{width:210mm;margin:20px auto;background:#fff;padding:16mm 20mm;box-shadow:0 2px 16px rgba(0,0,0,0.15);}' +
                    '.header{text-align:center;border-bottom:2.5px solid #059669;padding-bottom:8px;margin-bottom:12px;}' +
                    '.header .school-name{font-size:10.5pt;letter-spacing:2px;color:#444;margin-bottom:3px;}' +
                    '.header .exam-title{font-size:20pt;font-weight:bold;letter-spacing:5px;color:#1a1a1a;margin-bottom:3px;}' +
                    '.header .exam-subtitle{font-size:11.5pt;color:#333;letter-spacing:2px;}' +
                    '.info-bar{display:flex;justify-content:space-between;align-items:center;border:1px solid #999;padding:6px 12px;margin-bottom:12px;background:#fafafa;font-size:10.5pt;}' +
                    '.info-item{display:flex;align-items:center;gap:4px;}.info-label{font-weight:bold;white-space:nowrap;}.info-line{display:inline-block;width:68px;border-bottom:1px solid #555;height:16px;}' +
                    '.instructions{border:1px solid #ccc;padding:7px 12px;margin-bottom:12px;background:#f9f9f9;font-size:10.5pt;}' +
                    '.section-title{font-size:13.5pt;font-weight:bold;text-align:center;margin:12px 0 5px 0;letter-spacing:1px;}' +
                    '.section-subtitle{font-size:10.5pt;text-align:center;color:#555;margin-bottom:12px;}' +
                    '.passage{text-align:justify;font-size:11.5pt;line-height:2.0;padding:12px 14px;border:1px solid #ddd;background:#fff;page-break-inside:avoid;break-inside:avoid;}' +
                    '.passage p{text-indent:2em;margin-bottom:6px;}.passage p:last-child{margin-bottom:0;}' +
                    '.blank{display:inline-block;min-width:24px;border-bottom:1.5px solid #1a1a1a;text-align:center;font-size:9pt;font-weight:bold;color:#1a1a1a;vertical-align:bottom;padding:0 2px;line-height:1.2;position:relative;top:2px;}' +
                    '.page-two{page-break-before:always;break-before:page;}' +
                    '.page-two-header{text-align:center;border-bottom:1.5px solid #059669;padding-bottom:6px;margin-bottom:12px;font-size:11pt;color:#333;letter-spacing:1px;}' +
                    '.divider{border:none;border-top:1px dashed #aaa;margin:12px 0;}' +
                    '.questions-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;}' +
                    '.question-item{display:flex;align-items:flex-start;gap:6px;padding:4px 6px;border-bottom:1px dotted #ddd;font-size:11pt;line-height:1.6;}' +
                    '.question-num{font-weight:bold;white-space:nowrap;min-width:30px;color:#1a1a1a;}' +
                    '.option{flex:1;font-size:10.5pt;}' +
                    '.answer-sheet{margin-top:16px;border:2px solid #1a1a1a;padding:10px 14px;page-break-inside:avoid;break-inside:avoid;}' +
                    '.answer-sheet-title{font-size:13.5pt;font-weight:bold;text-align:center;margin-bottom:8px;letter-spacing:2px;border-bottom:1px solid #999;padding-bottom:5px;}' +
                    '.answer-sheet-note{font-size:9.5pt;color:#666;text-align:center;margin-bottom:8px;}' +
                    '.answer-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;}' +
                    '.answer-cell{border:1px solid #999;text-align:center;}' +
                    '.answer-cell .cell-num{background:#f0f0f0;font-weight:bold;font-size:10pt;padding:3px 0;border-bottom:1px solid #999;}' +
                    '.answer-cell .cell-answer{min-height:22px;border-bottom:1px solid #ccc;margin:2px 4px;}' +
                    '.footer{margin-top:12px;text-align:center;font-size:9pt;color:#888;border-top:1px solid #ddd;padding-top:6px;}';
                var printCss = '@media print{body{background:white;}.page{margin:0;box-shadow:none;padding:14mm 18mm;width:100%;}@page{size:A4;margin:0;}' +
                    '.page-two{page-break-before:always!important;break-before:page!important;}' +
                    '.passage{page-break-inside:avoid!important;break-inside:avoid!important;}' +
                    '.answer-sheet{page-break-inside:avoid!important;break-inside:avoid!important;}}';
                var html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>高三英语词形填空练习卷（第' + pid + '套）</title><style>' + manusCss + printCss + '</style></head><body><div class="page">' +
                    '<div class="page-one">' +
                    '<div class="header"><div class="school-name">高三英语 &middot; College Entrance Exam Practice</div><div class="exam-title">词 形 变 化 填 空 练 习 卷</div><div class="exam-subtitle">第 ' + pid + ' 套 &nbsp;&middot;&nbsp; Word Form &nbsp;&middot;&nbsp; Paper ' + pid + '</div></div>' +
                    '<div class="info-bar"><div class="info-item"><span class="info-label">姓名：</span><span class="info-line"></span></div><div class="info-item"><span class="info-label">班级：</span><span class="info-line"></span></div><div class="info-item"><span class="info-label">学号：</span><span class="info-line"></span></div><div class="info-item"><span class="info-label">日期：</span><span class="info-line"></span></div><div class="info-item"><span class="info-label">得分：</span><span class="info-line"></span></div></div>' +
                    '<div class="instructions"><strong>【考试说明】</strong>&nbsp;本题为词形变化填空，共 <strong>' + qs.length + '</strong> 小题，每小题 <strong>2</strong> 分，满分 <strong>' + totalScore + '</strong> 分。部分空有所给词作为提示，部分空无提示。请根据括号或题号说明填入正确词形，并将答案书写在答题卡相应位置。建议完成时间：<strong>10 分钟</strong>。</div>' +
                    '<div class="section-title">第二节 &nbsp; 词形变化填空</div><div class="section-subtitle">阅读下面短文，根据所给词或语境提示填入正确的词形。</div>' +
                    '<div class="passage">' + passageHtml + '</div></div>' +
                    '<div class="page-two"><div class="page-two-header">高三英语词形填空练习卷 &middot; 第' + pid + '套 &nbsp;|&nbsp; 题号提示与答题卡</div>' +
                    '<div class="questions-grid">' + hintsGridHtml + '</div><hr class="divider">' +
                    '<div class="answer-sheet"><div class="answer-sheet-title">答 题 卡（词形填空）</div><div class="answer-sheet-note">请将答案书写在对应题号下方的横线上。</div>' +
                    '<div class="answer-grid">' + answerGridHtml + '</div></div>' +
                    '<div class="footer">高三英语词形填空练习卷 &middot; 第' + pid + '套 &nbsp;|&nbsp; 本卷共' + qs.length + '题，满分' + totalScore + '分 &nbsp;|&nbsp; s-class.top</div></div></div></body></html>';
                var w = window.open('', '_blank');
                w.document.write(html);
                w.document.close();
                w.focus();
                setTimeout(function () { w.print(); }, 300);
            }

            return {
                selectedPaperId, paperData, studentName, stage, timerStarted, timeLeft, choicesWord,
                showScoreModal, scoreCorrect, scoreTotal, canSubmit, submitDoLabel,
                wordFormPassageSegments, explainWordPassageHtml,
                readSentences, currentReadIdx, currentReadSentence, sttEn, sttCn, isPlaying, isRecordingEn, isRecordingCn, isEvaluating, readEval,
                showDictModal, dictWord, dictLoading, dictResult, dictError, dictContextSentence,
                vocabPack, vocabPackLoading, vocabPackError, explainPdfLoading,
                loadPaper, startTimer, setWordChoice, submitDo, closeScoreAndGoExplain, goReadTranslate, downloadPdf, downloadExplainPdf,
                playTTS, toggleRecord, evaluateRead, prevRead, nextRead, renderMarkdown, finishAndSendReport,
                onPassageClick, speakText, closeDictModal,
                formatTime, tryAdminMode, adminMode
            };
        }
    }).mount('#app');
})();
