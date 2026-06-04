/**
 * 取消课件自动朗读；仅 .tts-btn「朗读」点击后播放
 */
(function () {
  'use strict';

  var depth = 0;

  var Manual = {
    allow: function () {
      depth++;
    },
    release: function () {
      depth = Math.max(0, depth - 1);
    },
    isAllowed: function () {
      return depth > 0;
    },
    withAllow: function (fn) {
      var self = this;
      this.allow();
      try {
        var r = fn();
        if (r && typeof r.then === 'function') {
          return r.finally(function () {
            self.release();
          });
        }
        self.release();
        return r;
      } catch (e) {
        self.release();
        throw e;
      }
    },
  };

  window.L13RCManualTTS = Manual;

  var READ_SVG =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';

  function installSpeakGuard() {
    if (window.__l13rcSpeakGuarded) return;
    var raw = window.speak;
    if (typeof raw !== 'function') return;
    window.__l13rcSpeakRaw = raw;
    window.speak = async function (text) {
      if (!Manual.isAllowed()) return;
      return raw.call(window, text);
    };
    window.__l13rcSpeakGuarded = true;
  }

  function getReadText(btn) {
    var t = btn.getAttribute('data-text');
    if (t && t.trim()) return t.replace(/\s+/g, ' ').trim();
    var host =
      btn.closest('.sentence-block, .picture-pick-text, .step-item, .page, .build-line') ||
      btn.parentElement;
    if (host) {
      var target = host.querySelector('.tts-target');
      if (target) return target.textContent.replace(/\s+/g, ' ').trim();
      var p = host.querySelector('p');
      if (p) return p.textContent.replace(/\s+/g, ' ').trim();
    }
    return '';
  }

  function resetPlaying(btn) {
    document.querySelectorAll('.tts-btn.playing').forEach(function (b) {
      if (b !== btn) {
        b.classList.remove('playing');
        b.disabled = false;
      }
    });
  }

  async function playFromButton(btn) {
    var text = getReadText(btn);
    if (!text || !window.__l13rcSpeakRaw) return;
    resetPlaying(btn);
    btn.disabled = true;
    btn.classList.add('playing');
    try {
      if (window.unlockAudio) await window.unlockAudio();
      await Manual.withAllow(function () {
        return window.__l13rcSpeakRaw(text);
      });
    } catch (e) {
      console.warn('[L13RC Manual TTS]', e);
    } finally {
      btn.disabled = false;
      btn.classList.remove('playing');
    }
  }

  function bindReadButtons(root) {
    (root || document).querySelectorAll('.tts-btn').forEach(function (btn) {
      if (btn.__l13rcManualBound) return;
      btn.__l13rcManualBound = true;
      if (!btn.getAttribute('aria-label') && !btn.querySelector('svg')) {
        btn.insertAdjacentHTML('afterbegin', READ_SVG);
      }
      if (!btn.textContent.trim() || btn.textContent.trim() === '播放') {
        btn.textContent = '';
        btn.insertAdjacentHTML('beforeend', '朗读');
      }
      btn.setAttribute('type', 'button');
      var onclick = btn.getAttribute('onclick') || '';
      if (/page0Play|PlayS1|PlayClue|PlayQ2/.test(onclick)) {
        return;
      }
      btn.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          playFromButton(btn);
        },
        true
      );
    });
  }

  function wrapPlayFns() {
    Object.keys(window).forEach(function (key) {
      if (!/^page0Play/.test(key)) return;
      var fn = window[key];
      if (typeof fn !== 'function' || fn.__l13rcManualWrapped) return;
      window[key] = function () {
        return Manual.withAllow(function () {
          return fn.apply(window, arguments);
        });
      };
      window[key].__l13rcManualWrapped = true;
    });
  }

  function patchStartGuideSafe() {
    if (!window.startGuideSafe || window.startGuideSafe.__l13rcManualStart) return;

    window.startGuideSafe = function () {
      var btn = document.getElementById('page1-start-guide');
      var status = document.getElementById('page1-status');
      var reveal = function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('guide-hidden', 'hidden');
        el.classList.add('guide-reveal');
      };

      if (btn) {
        btn.disabled = true;
        btn.textContent = '正在启动...';
      }
      if (status) status.textContent = '请点击「朗读」收听描述';

      reveal('p0-step-ready');
      reveal('p0-ready-line');
      reveal('p0-ready-q');
      reveal('p0-ready-choices');
      var clueBtn = document.getElementById('p0-play-clue-btn');
      if (clueBtn) clueBtn.classList.remove('guide-hidden', 'hidden');

      if (status) status.textContent = '请选择 YES / NO，或点击「朗读」';
      if (btn) {
        btn.disabled = false;
        btn.textContent = '已开始';
      }
      window.__guideBootFallbackRunning = false;
    };
    window.startGuideSafe.__l13rcManualStart = true;
  }

  function renameStepButtons() {
    document.querySelectorAll('button, .reveal-btn').forEach(function (btn) {
      if (btn.textContent && btn.textContent.indexOf('显示下一步并朗读') !== -1) {
        btn.textContent = btn.textContent.replace('显示下一步并朗读', '显示下一步');
      }
      if (btn.textContent && btn.textContent.indexOf('正在启动语音引导') !== -1) {
        btn.textContent = '正在启动...';
      }
    });
  }

  function injectReadButtonsInActivePage() {
    var page = document.querySelector('.page.active');
    if (!page) return;
    var blocks = page.querySelectorAll(
      '.sentence-block, .en-display, .build-line, .p5-demo-line, .picture-pick-copy > p'
    );
    blocks.forEach(function (block) {
      if (block.querySelector('.tts-btn')) return;
      var text = '';
      var target = block.querySelector('.tts-target');
      if (target) text = target.textContent;
      else {
        var p = block.querySelector('p');
        if (p) text = p.textContent;
        else if (block.matches('.build-line, .p5-demo-line')) text = block.textContent;
      }
      text = String(text || '')
        .replace(/\s+/g, ' ')
        .trim();
      if (text.length < 8 || !/[a-zA-Z]/.test(text)) return;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tts-btn inline-tts l13rc-injected-read';
      btn.setAttribute('data-text', text);
      btn.setAttribute('aria-label', '朗读');
      btn.innerHTML = READ_SVG + '朗读';
      block.appendChild(btn);
      bindReadButtons(block);
    });
  }

  function boot() {
    document.body.classList.add('l13rc-manual-tts');
    installSpeakGuard();
    wrapPlayFns();
    patchStartGuideSafe();
    bindReadButtons();
    injectReadButtonsInActivePage();
    renameStepButtons();
  }

  function onPageChange() {
    installSpeakGuard();
    bindReadButtons();
    injectReadButtonsInActivePage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(boot, 0);
      setTimeout(boot, 400);
    });
  } else {
    setTimeout(boot, 0);
    setTimeout(boot, 400);
  }

  window.addEventListener('load', boot);

  var origGo = window.goToPage;
  if (typeof origGo === 'function' && !origGo.__l13rcManualHook) {
    window.goToPage = function () {
      var r = origGo.apply(window, arguments);
      setTimeout(onPageChange, 50);
      return r;
    };
    window.goToPage.__l13rcManualHook = true;
  }

  var origSafe = window.goToPageSafe;
  if (typeof origSafe === 'function' && !origSafe.__l13rcManualHook) {
    window.goToPageSafe = function () {
      var r = origSafe.apply(window, arguments);
      setTimeout(onPageChange, 50);
      return r;
    };
    window.goToPageSafe.__l13rcManualHook = true;
  }

  document.addEventListener(
    'click',
    function (e) {
      if (e.target.closest('[data-go-page], [onclick*="goToPage"]')) {
        setTimeout(onPageChange, 80);
      }
    },
    true
  );
})();
