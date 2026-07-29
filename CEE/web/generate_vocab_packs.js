#!/usr/bin/env node
/**
 * 为 CEE/enriched_questions 全部试卷预生成词汇精讲包（完形 + 词形）
 * 写入 section_1_cloze.vocab_pack / section_2_word_form.vocab_pack
 *
 * 用法：
 *   node CEE/web/generate_vocab_packs.js
 *   node CEE/web/generate_vocab_packs.js --only=09,16
 *   node CEE/web/generate_vocab_packs.js --force
 *   node CEE/web/generate_vocab_packs.js --concurrency=3
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'enriched_questions');
const AI_JS = path.join(__dirname, 'cee_explain_ai.js');
const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY || 'sk-daa16008e81843deba6fefe9dce51465';

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const onlyArg = args.find(a => a.startsWith('--only='));
const ONLY = onlyArg
    ? onlyArg.slice('--only='.length).split(',').map(s => s.trim().padStart(2, '0')).filter(Boolean)
    : null;
const concArg = args.find(a => a.startsWith('--concurrency='));
const CONCURRENCY = Math.max(1, parseInt(concArg ? concArg.split('=')[1] : '3', 10) || 3);

function loadAI() {
    const sandbox = { window: {}, console, fetch };
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(AI_JS, 'utf8'), sandbox);
    return sandbox.window.CeeExplainAI;
}

function fillClozePassage(section) {
    if (!section || !section.passage) return '';
    let p = section.passage;
    (section.questions || []).forEach(q => {
        const word = q.options && q.correct_answer != null ? (q.options[q.correct_answer] || '') : '';
        p = p.split('[' + q.number + ']').join(word);
    });
    return p;
}

function fillWordFormPassage(s2) {
    if (!s2) return '';
    if ((s2.passage || '').trim()) {
        let full = s2.passage.trim();
        (s2.questions || []).forEach(q => {
            full = full.split('[' + q.number + ']').join((q.correct_form || '').trim());
        });
        return full;
    }
    const qs = s2.questions || [];
    if (!qs.length) return '';
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

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function generatePack(AI, passage, label, retries) {
    const attempts = retries == null ? 3 : retries;
    let lastErr;
    for (let i = 0; i < attempts; i++) {
        try {
            const raw = await AI.callDeepSeek(DEEPSEEK_KEY, AI.buildVocabPackPrompt(passage), { temperature: 0.45 });
            const pack = AI.normalizeVocabPack(AI.parseJsonFromDeepSeek(raw));
            if (!pack.length) throw new Error('empty pack');
            if (!AI.isVocabPackCurrent(pack)) throw new Error('pack missing grammar_note');
            return pack;
        } catch (e) {
            lastErr = e;
            console.error('  retry', i + 1, label, e.message || e);
            await sleep(1500 * (i + 1));
        }
    }
    throw lastErr;
}

async function mapPool(items, concurrency, worker) {
    const results = new Array(items.length);
    let next = 0;
    async function run() {
        while (next < items.length) {
            const i = next++;
            results[i] = await worker(items[i], i);
        }
    }
    const runners = [];
    for (let k = 0; k < Math.min(concurrency, items.length); k++) runners.push(run());
    await Promise.all(runners);
    return results;
}

function listPapers() {
    return fs.readdirSync(DATA_DIR)
        .filter(f => /^\d{2}\.json$/.test(f))
        .sort()
        .map(f => f.replace(/\.json$/, ''))
        .filter(id => !ONLY || ONLY.includes(id));
}

async function processPaper(AI, id) {
    const file = path.join(DATA_DIR, id + '.json');
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let changed = false;
    const report = { id, cloze: 'skip', wordform: 'skip' };

    if (data.section_1_cloze) {
        const existing = data.section_1_cloze.vocab_pack;
        if (!FORCE && AI.isVocabPackCurrent(existing)) {
            report.cloze = 'cached(' + existing.length + ')';
        } else {
            const passage = fillClozePassage(data.section_1_cloze);
            if (!passage.trim()) {
                report.cloze = 'empty-passage';
            } else {
                console.log('[' + id + '] generating cloze vocab…');
                const pack = await generatePack(AI, passage, id + '-cloze');
                data.section_1_cloze.vocab_pack = pack;
                data.section_1_cloze.vocab_pack_meta = {
                    generated_at: new Date().toISOString(),
                    version: 2,
                    count: pack.length,
                    note: 'lemma + grammar_note + form_in_passage'
                };
                changed = true;
                report.cloze = 'ok(' + pack.length + ')';
            }
        }
    }

    if (data.section_2_word_form) {
        const existing = data.section_2_word_form.vocab_pack;
        if (!FORCE && AI.isVocabPackCurrent(existing)) {
            report.wordform = 'cached(' + existing.length + ')';
        } else {
            const passage = fillWordFormPassage(data.section_2_word_form);
            if (!passage.trim()) {
                report.wordform = 'empty-passage';
            } else {
                console.log('[' + id + '] generating wordform vocab…');
                const pack = await generatePack(AI, passage, id + '-wordform');
                data.section_2_word_form.vocab_pack = pack;
                data.section_2_word_form.vocab_pack_meta = {
                    generated_at: new Date().toISOString(),
                    version: 2,
                    count: pack.length,
                    note: 'lemma + grammar_note + form_in_passage'
                };
                changed = true;
                report.wordform = 'ok(' + pack.length + ')';
            }
        }
    }

    if (changed) {
        fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    }
    console.log('[' + id + '] cloze=' + report.cloze + ' wordform=' + report.wordform);
    return report;
}

async function main() {
    if (!fs.existsSync(DATA_DIR)) throw new Error('missing ' + DATA_DIR);
    const AI = loadAI();
    const papers = listPapers();
    console.log('papers=', papers.length, 'concurrency=', CONCURRENCY, 'force=', FORCE);
    const reports = await mapPool(papers, CONCURRENCY, async (id) => {
        try {
            return await processPaper(AI, id);
        } catch (e) {
            console.error('[' + id + '] FAILED', e.message || e);
            return { id, cloze: 'fail', wordform: 'fail', error: String(e.message || e) };
        }
    });
    const fails = reports.filter(r => r && (r.cloze === 'fail' || r.wordform === 'fail' || r.error));
    console.log('done. fails=', fails.length);
    if (fails.length) {
        console.log(JSON.stringify(fails, null, 2));
        process.exitCode = 1;
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
