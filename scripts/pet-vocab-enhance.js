/**
 * PET 词汇课件增强：
 * - Step 2：完整显示图片（contain + 点击放大）
 * - Step 3：例句单词点击 → Azure 朗读 + DeepSeek 语境查词；支持键盘输入查词
 * - Step 4：实体键盘可输入拼写
 * - Step 7：朗读句子同样支持单词点击查词
 *
 * 在 Vue.createApp 之前加载，会挂上 $wrapWords 供模板使用。
 */
(function () {
    'use strict';

    var DEEPSEEK_KEY = window.PET_DEEPSEEK_KEY || 'sk-daa16008e81843deba6fefe9dce51465';
    var DEFAULT_AZURE_KEY = '4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO';
    var DEFAULT_AZURE_REGION = 'southeastasia';
    var lookupCache = Object.create(null);
    var lookupReqId = 0;

    function azureKey() {
        if (typeof window.AZURE_KEY === 'string' && window.AZURE_KEY) return window.AZURE_KEY;
        if (typeof AZURE_KEY === 'string' && AZURE_KEY) return AZURE_KEY;
        return window.PET_AZURE_KEY || DEFAULT_AZURE_KEY;
    }
    function azureRegion() {
        if (typeof window.AZURE_REGION === 'string' && window.AZURE_REGION) return window.AZURE_REGION;
        if (typeof AZURE_REGION === 'string' && AZURE_REGION) return AZURE_REGION;
        return window.PET_AZURE_REGION || DEFAULT_AZURE_REGION;
    }

    function escapeHtml(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function wrapWords(sentence) {
        if (sentence == null || sentence === '') return '';
        var src = String(sentence);
        return src.replace(/[A-Za-z][A-Za-z']*/g, function (word) {
            return '<span class="pet-word-click" data-word="' + escapeHtml(word) +
                '" data-sentence="' + escapeHtml(src) +
                '" title="点击查询并朗读">' + escapeHtml(word) + '</span>';
        });
    }

    function speakText(text) {
        var t = String(text || '').trim();
        if (!t) return;
        if (window.PetSpeech && typeof window.PetSpeech.playTTS === 'function') {
            window.PetSpeech.playTTS(azureKey(), azureRegion(), t);
            return;
        }
        var SpeechSDK = window.SpeechSDK;
        if (SpeechSDK) {
            try {
                var config = SpeechSDK.SpeechConfig.fromSubscription(azureKey(), azureRegion());
                config.speechSynthesisVoiceName = 'en-GB-RyanNeural';
                var synth = new SpeechSDK.SpeechSynthesizer(config);
                synth.speakTextAsync(t, function () { try { synth.close(); } catch (_) {} }, function () {
                    try { synth.close(); } catch (_) {}
                    browserSpeak(t);
                });
                return;
            } catch (_) {}
        }
        browserSpeak(t);
    }

    function browserSpeak(t) {
        try {
            var u = new SpeechSynthesisUtterance(t);
            u.lang = 'en-GB';
            u.rate = 0.9;
            speechSynthesis.cancel();
            speechSynthesis.speak(u);
        } catch (_) {}
    }

    function injectCss() {
        if (document.getElementById('pet-vocab-enhance-css')) return;
        var css = document.createElement('style');
        css.id = 'pet-vocab-enhance-css';
        css.textContent = [
            '.pet-step2-image{position:relative;width:100%;min-height:200px;background:#020617;display:flex;align-items:center;justify-content:center;border-radius:1rem;overflow:hidden;}',
            '.pet-step2-image img,.pet-step2-img,div.relative.w-full.h-56.bg-black>img{width:auto!important;height:auto!important;max-width:100%!important;max-height:min(68vh,620px)!important;object-fit:contain!important;object-position:center!important;opacity:1!important;display:block;margin:0 auto;cursor:zoom-in;}',
            'div.relative.w-full.h-56.bg-black{height:auto!important;min-height:200px;overflow:hidden;background:#020617;display:flex;align-items:center;justify-content:center;}',
            '.pet-word-click{cursor:pointer;border-radius:4px;padding:0 1px;transition:background .15s,color .15s;user-select:text;-webkit-user-select:text;}',
            '.pet-word-click:hover,.pet-word-click:focus{background:rgba(99,102,241,.35);color:#c7d2fe;outline:none;}',
            '.pet-word-modal{position:fixed;inset:0;z-index:1200;background:rgba(2,6,23,.72);display:none;align-items:center;justify-content:center;padding:20px;}',
            '.pet-word-modal.show{display:flex;}',
            '.pet-word-modal-box{background:#1e293b;border:1px solid #334155;border-radius:18px;max-width:440px;width:100%;max-height:80vh;overflow:auto;box-shadow:0 24px 60px rgba(0,0,0,.45);}',
            '.pet-word-modal-hd{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid #334155;}',
            '.pet-word-modal-word{font-size:1.35rem;font-weight:900;color:#c7d2fe;flex:1;word-break:break-word;}',
            '.pet-word-modal-speak{background:#4f46e5;color:#fff;border:none;border-radius:10px;padding:8px 12px;font-weight:800;cursor:pointer;font-size:.85rem;}',
            '.pet-word-modal-close{background:transparent;border:none;color:#94a3b8;font-size:1.3rem;cursor:pointer;padding:4px 8px;}',
            '.pet-word-modal-bd{padding:16px 18px 20px;color:#e2e8f0;font-size:.95rem;line-height:1.7;}',
            '.pet-word-modal-sent{font-size:.8rem;color:#94a3b8;margin-bottom:10px;padding:8px 10px;background:#0f172a;border-radius:8px;}',
            '.pet-word-modal-loading{color:#94a3b8;}',
            '.pet-word-modal-error{color:#f87171;}',
            '.pet-lookup-bar{display:flex;gap:8px;margin:0 auto 16px;align-items:center;justify-content:center;width:100%;max-width:480px;}',
            '.pet-lookup-bar input{flex:1;min-width:0;background:#0f172a;border:1px solid #475569;border-radius:12px;color:#f8fafc;padding:10px 12px;font-size:1rem;font-weight:700;outline:none;text-align:center;}',
            '.pet-lookup-bar input:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.25);}',
            '.pet-lookup-bar button{background:#4f46e5;color:#fff;border:none;border-radius:12px;padding:10px 14px;font-weight:800;cursor:pointer;white-space:nowrap;}',
            '.pet-lookup-hint,.pet-spell-hint{font-size:.75rem;color:#64748b;margin:8px auto 14px;font-weight:700;text-align:center;width:100%;}',
            '.pet-spell-wrap,.pet-spell-panel,.glass-panel div.w-full:has(>button.mb-8){display:flex!important;flex-direction:column!important;align-items:center!important;text-align:center!important;width:100%!important;}',
            '.pet-spell-wrap>button,.pet-spell-panel>button,button.mb-8.w-16.h-16{margin-left:auto!important;margin-right:auto!important;}',
            '.pet-spell-slots,.glass-panel div.flex.justify-center.gap-2.mb-10{display:flex!important;flex-direction:row!important;justify-content:center!important;align-items:center!important;flex-wrap:wrap!important;gap:8px!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;}',
            '.pet-spell-slots>div{display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;line-height:1;}',
            '.pet-spell-keys,.glass-panel div:has(>.key-btn){display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;justify-content:center!important;align-content:center!important;margin-left:auto!important;margin-right:auto!important;max-width:36rem!important;width:100%!important;}',
            '.key-btn:disabled{display:none!important;width:0!important;height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;transform:none!important;}',
            '.pet-spell-hint{text-align:center!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;}',
            '.pet-spell-input{display:block;width:min(420px,92%);margin:4px auto 16px;text-align:center;font-size:1.65rem;font-weight:900;letter-spacing:.18em;padding:12px 14px;border:2px solid #6366f1;border-radius:16px;background:#0f172a;color:#e0e7ff;outline:none;text-transform:uppercase;}',
            '.pet-spell-input:focus{box-shadow:0 0 0 4px rgba(99,102,241,.28);}',
            '.pet-img-lightbox{position:fixed;inset:0;z-index:1300;background:rgba(2,6,23,.88);display:none;align-items:center;justify-content:center;padding:16px;cursor:zoom-out;}',
            '.pet-img-lightbox.show{display:flex;}',
            '.pet-img-lightbox img{max-width:96vw;max-height:92vh;object-fit:contain;border-radius:12px;box-shadow:0 20px 50px rgba(0,0,0,.5);}'
        ].join('');
        document.head.appendChild(css);
    }

    function injectModal() {
        if (document.getElementById('pet-word-modal')) return;
        var modal = document.createElement('div');
        modal.id = 'pet-word-modal';
        modal.className = 'pet-word-modal';
        modal.innerHTML =
            '<div class="pet-word-modal-box" role="dialog" aria-modal="true">' +
                '<div class="pet-word-modal-hd">' +
                    '<div class="pet-word-modal-word" id="pet-word-modal-word"></div>' +
                    '<button type="button" class="pet-word-modal-speak" id="pet-word-modal-speak" title="Azure 朗读"><i class="fas fa-volume-up"></i> 朗读</button>' +
                    '<button type="button" class="pet-word-modal-close" id="pet-word-modal-close" aria-label="关闭">&times;</button>' +
                '</div>' +
                '<div class="pet-word-modal-bd" id="pet-word-modal-body"></div>' +
            '</div>';
        document.body.appendChild(modal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
        document.getElementById('pet-word-modal-close').addEventListener('click', closeModal);
        document.getElementById('pet-word-modal-speak').addEventListener('click', function () {
            speakText(document.getElementById('pet-word-modal-word').textContent);
        });

        var box = document.createElement('div');
        box.id = 'pet-img-lightbox';
        box.className = 'pet-img-lightbox';
        box.innerHTML = '<img alt="完整图片">';
        box.addEventListener('click', function () { box.classList.remove('show'); });
        document.body.appendChild(box);
    }

    function closeModal() {
        var modal = document.getElementById('pet-word-modal');
        if (modal) modal.classList.remove('show');
    }

    function openLightbox(src) {
        if (!src) return;
        var box = document.getElementById('pet-img-lightbox');
        if (!box) return;
        box.querySelector('img').src = src;
        box.classList.add('show');
    }

    function lookupWord(word, sentence) {
        var w = String(word || '').trim();
        if (!w) return;
        speakText(w);
        var modal = document.getElementById('pet-word-modal');
        var title = document.getElementById('pet-word-modal-word');
        var body = document.getElementById('pet-word-modal-body');
        title.textContent = w;
        modal.classList.add('show');
        var cacheKey = (w + '|' + (sentence || '')).toLowerCase();
        if (lookupCache[cacheKey]) {
            body.innerHTML = lookupCache[cacheKey];
            return;
        }
        var req = ++lookupReqId;
        body.innerHTML = '<div class="pet-word-modal-loading"><i class="fas fa-spinner fa-spin"></i> DeepSeek 正在根据语境查询…</div>';
        var prompt =
            '你是 PET / 初中英语教师。请根据下面这句话的语境，解释句中这个单词（或短语）的含义。\n' +
            '【整句】' + (sentence || '（无例句，按常用义解释）') + '\n' +
            '【待解释的词】"' + w + '"\n\n' +
            '要求：\n' +
            '1. 词义必须基于该词在此句中的具体用法（若无例句则给最常用义）\n' +
            '2. 给出音标（若能确定）、词性、中文释义\n' +
            '3. 可补 1 条简单英文例句及中文翻译\n' +
            '4. 面向 PET / 八年级学生，控制在 120 字内，用简洁中文';

        fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + DEEPSEEK_KEY
            },
            body: JSON.stringify({
                model: 'deepseek-v4-flash',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.2,
                max_tokens: 400
            })
        }).then(function (res) {
            if (!res.ok) throw new Error('API ' + res.status);
            return res.json();
        }).then(function (data) {
            if (req !== lookupReqId) return;
            var content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '未获取到释义';
            var html = '';
            if (sentence) html += '<div class="pet-word-modal-sent">' + escapeHtml(sentence) + '</div>';
            html += content.replace(/\n/g, '<br>');
            lookupCache[cacheKey] = html;
            body.innerHTML = html;
        }).catch(function (e) {
            if (req !== lookupReqId) return;
            body.innerHTML = '<div class="pet-word-modal-error">查词失败：' + escapeHtml(e.message || '网络错误') + '。请检查网络后重试。</div>';
        });
    }

    function currentStepLabel() {
        var nodes = document.querySelectorAll('.w-full.max-w-2xl .uppercase span');
        for (var i = 0; i < nodes.length; i++) {
            var t = (nodes[i].textContent || '').trim();
            var m = t.match(/Step\s+(\d+)/i);
            if (m) return parseInt(m[1], 10);
        }
        return 0;
    }

    function isTypingTarget(el) {
        if (!el) return false;
        var tag = (el.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
        if (el.isContentEditable) return true;
        return false;
    }

    function enhanceSentences() {
        var nodes = document.querySelectorAll('.pet-clickable-sentence');
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            if (el.querySelector('.pet-word-click')) continue;
            var raw = el.getAttribute('data-sentence') || el.textContent || '';
            raw = raw.replace(/^["“]+|["”]+$/g, '').trim();
            if (!raw) continue;
            var hadQuotes = /^\s*["“]/.test(el.textContent || '');
            el.innerHTML = (hadQuotes ? '"' : '') + wrapWords(raw) + (hadQuotes ? '"' : '');
        }
    }

    function ensureLookupBar() {
        if (currentStepLabel() !== 3) return;
        var usage = null;
        var heads = document.querySelectorAll('h4');
        for (var i = 0; i < heads.length; i++) {
            if ((heads[i].textContent || '').trim().toUpperCase() === 'USAGE') {
                usage = heads[i].closest('.bg-indigo-900\\/30, .mb-6') || heads[i].parentElement;
                break;
            }
        }
        if (!usage) return;
        var host = usage.parentElement;
        if (!host || host.querySelector('.pet-lookup-bar')) return;
        var bar = document.createElement('div');
        bar.className = 'pet-lookup-bar';
        bar.innerHTML =
            '<input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="输入单词，回车查询（键盘输入）">' +
            '<button type="button"><i class="fas fa-search"></i> 查询</button>';
        var hint = document.createElement('p');
        hint.className = 'pet-lookup-hint';
        hint.textContent = '点击例句中的单词可朗读并查词；也可在上方用键盘输入任意单词查询。';
        usage.insertAdjacentElement('afterend', hint);
        usage.insertAdjacentElement('afterend', bar);
        var input = bar.querySelector('input');
        var btn = bar.querySelector('button');
        function submit() {
            var word = (input.value || '').trim();
            if (!word) { input.focus(); return; }
            var sentence = '';
            var first = document.querySelector('.pet-clickable-sentence, .pet-word-click');
            if (first) sentence = first.getAttribute('data-sentence') || (first.textContent || '').replace(/^["“]+|["”]+$/g, '');
            lookupWord(word, sentence);
        }
        btn.addEventListener('click', submit);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submit();
            }
        });
    }

    function clickReset() {
        var reset = Array.prototype.find.call(document.querySelectorAll('button'), function (b) {
            return /Reset/i.test(b.textContent || '');
        });
        if (reset) reset.click();
    }

    function clickLetter(letter) {
        letter = String(letter || '').toUpperCase();
        var keys = document.querySelectorAll('.key-btn');
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].disabled) continue;
            if ((keys[i].textContent || '').trim().toUpperCase() === letter) {
                keys[i].click();
                return true;
            }
        }
        return false;
    }

    function readSpellSlots(slots) {
        if (!slots) return '';
        var letters = [];
        Array.prototype.forEach.call(slots.children, function (el) {
            var t = (el.textContent || '').trim();
            if (t && t.toUpperCase() !== 'SPACE') letters.push(t);
        });
        return letters.join('');
    }

    function ensureSpellHint() {
        if (currentStepLabel() !== 4) return;
        var key = document.querySelector('.key-btn');
        if (!key || !key.parentElement) return;
        var keysWrap = key.parentElement;
        var stepRoot = keysWrap.parentElement;
        if (stepRoot) {
            stepRoot.classList.add('pet-spell-wrap', 'pet-spell-panel');
            stepRoot.style.setProperty('display', 'flex', 'important');
            stepRoot.style.setProperty('flex-direction', 'column', 'important');
            stepRoot.style.setProperty('align-items', 'center', 'important');
            stepRoot.style.setProperty('text-align', 'center', 'important');
            stepRoot.style.setProperty('width', '100%', 'important');
        }
        keysWrap.classList.add('pet-spell-keys');
        keysWrap.style.setProperty('display', 'flex', 'important');
        keysWrap.style.setProperty('flex-wrap', 'wrap', 'important');
        keysWrap.style.setProperty('justify-content', 'center', 'important');
        keysWrap.style.setProperty('margin-left', 'auto', 'important');
        keysWrap.style.setProperty('margin-right', 'auto', 'important');
        keysWrap.style.setProperty('width', '100%', 'important');
        var slots = stepRoot && (stepRoot.querySelector('.pet-spell-slots') || stepRoot.querySelector('.flex.justify-center.gap-2'));
        if (slots) {
            slots.classList.add('pet-spell-slots');
            slots.style.setProperty('display', 'flex', 'important');
            slots.style.setProperty('justify-content', 'center', 'important');
            slots.style.setProperty('align-items', 'center', 'important');
            slots.style.setProperty('width', '100%', 'important');
            slots.style.setProperty('margin-left', 'auto', 'important');
            slots.style.setProperty('margin-right', 'auto', 'important');
        }
        var speaker = stepRoot && stepRoot.querySelector('button.mb-8, button.w-16');
        if (speaker) {
            speaker.style.setProperty('margin-left', 'auto', 'important');
            speaker.style.setProperty('margin-right', 'auto', 'important');
        }
        if (!stepRoot) return;
        if (stepRoot.querySelector('.pet-spell-input')) return;
        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'pet-spell-input';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('aria-label', '拼写输入');
        input.placeholder = '在此居中输入拼写';
        keysWrap.insertAdjacentElement('beforebegin', input);
        if (!stepRoot.querySelector('.pet-spell-hint')) {
            var hint = document.createElement('p');
            hint.className = 'pet-spell-hint';
            hint.textContent = '字母居中显示；可用此输入框、下方按键或电脑键盘，Backspace 重置。';
            keysWrap.insertAdjacentElement('afterend', hint);
        }
        function syncFromSlots() {
            if (document.activeElement !== input) input.value = readSpellSlots(slots);
        }
        input.addEventListener('input', function () {
            var next = (input.value || '').replace(/[^a-zA-Z]/g, '');
            input.value = next;
            var cur = readSpellSlots(slots);
            if (next.length < cur.length || next.slice(0, cur.length).toLowerCase() !== cur.toLowerCase()) {
                clickReset();
                cur = '';
            }
            next.slice(cur.length).split('').forEach(clickLetter);
        });
        if (!stepRoot.__petSpellObs && slots) {
            stepRoot.__petSpellObs = new MutationObserver(syncFromSlots);
            stepRoot.__petSpellObs.observe(slots, { childList: true, subtree: true, characterData: true });
        }
        syncFromSlots();
    }

    function bindClicks() {
        document.addEventListener('click', function (e) {
            var wordEl = e.target.closest && e.target.closest('.pet-word-click');
            if (wordEl) {
                e.preventDefault();
                e.stopPropagation();
                lookupWord(wordEl.getAttribute('data-word'), wordEl.getAttribute('data-sentence'));
                return;
            }
            var img = e.target.closest && e.target.closest('.pet-step2-image img, .pet-step2-img, div.relative.w-full.h-56.bg-black > img');
            if (img && img.tagName === 'IMG' && img.src) {
                e.preventDefault();
                openLightbox(img.src);
            }
        }, true);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal();
                var lb = document.getElementById('pet-img-lightbox');
                if (lb) lb.classList.remove('show');
            }
            if (isTypingTarget(e.target)) return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (currentStepLabel() !== 4) return;
            if (e.key === 'Backspace' || e.key === 'Delete') {
                var reset = Array.prototype.find.call(document.querySelectorAll('button'), function (b) {
                    return /Reset/i.test(b.textContent || '');
                });
                if (reset) {
                    e.preventDefault();
                    reset.click();
                }
                return;
            }
            if (!/^[a-zA-Z]$/.test(e.key)) return;
            var letter = e.key.toUpperCase();
            var keys = document.querySelectorAll('.key-btn');
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].disabled) continue;
                if ((keys[i].textContent || '').trim().toUpperCase() === letter) {
                    e.preventDefault();
                    keys[i].click();
                    return;
                }
            }
        });
    }

    function installVueHelpers() {
        if (!window.Vue || !Vue.createApp || Vue.createApp.__petVocabPatched) return;
        var orig = Vue.createApp;
        Vue.createApp = function () {
            var app = orig.apply(this, arguments);
            app.config.globalProperties.$wrapWords = wrapWords;
            return app;
        };
        Vue.createApp.__petVocabPatched = true;
    }

    function startObserver() {
        var scheduled = false;
        function tick() {
            scheduled = false;
            enhanceSentences();
            ensureLookupBar();
            if (currentStepLabel() === 4) ensureSpellHint();
        }
        function schedule() {
            if (scheduled) return;
            scheduled = true;
            requestAnimationFrame(tick);
        }
        var obs = new MutationObserver(schedule);
        obs.observe(document.body, { childList: true, subtree: true });
        schedule();
        setInterval(schedule, 800);
    }

    window.PetVocabEnhance = {
        wrapWords: wrapWords,
        lookupWord: lookupWord,
        speakText: speakText
    };

    function boot() {
        injectCss();
        injectModal();
        bindClicks();
        startObserver();
    }

    installVueHelpers();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            installVueHelpers();
            boot();
        });
    } else {
        boot();
    }
})();
