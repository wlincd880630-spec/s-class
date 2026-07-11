/**
 * L13 句子融合 · 统一动态展示
 * 普通定语从句走七步合并；介词+which 课件额外展示“错误 which 形式 → 介词前移”。
 */
(function (global) {
  'use strict';

  var lessonMatch = decodeURIComponent(global.location.pathname).match(
    /课件Demo_Lesson_Relative_Clause_(0[123])\.html$/i
  );
  if (!lessonMatch) return;

  var lesson = lessonMatch[1];
  var configs = {
    '01': {
      '5': {
        main: 'The man is my father.',
        support: 'The man is waiting at the gate.',
        commonA: 'The man',
        commonB: 'The man',
        antecedent: 'The man',
        relation: 'who',
        lead: 'The man ...',
        embedded: 'The man the man is waiting at the gate ...',
        raw: 'The man the man is waiting at the gate is my father.',
        duplicate: 'the man',
        final: 'The man who is waiting at the gate is my father.',
      },
      '6': {
        main: 'The girl is my sister.',
        support: 'She is sitting on the bench.',
        commonA: 'The girl',
        commonB: 'She',
        antecedent: 'The girl',
        relation: 'who',
        lead: 'The girl ...',
        embedded: 'The girl the girl is sitting on the bench ...',
        raw: 'The girl the girl is sitting on the bench is my sister.',
        duplicate: 'the girl',
        final: 'The girl who is sitting on the bench is my sister.',
      },
      '7': {
        main: 'The student is feeling sick.',
        support: 'The teacher likes him very much.',
        commonA: 'The student',
        commonB: 'him',
        antecedent: 'The student',
        relation: 'whom',
        lead: 'The student ...',
        embedded: 'The student the teacher likes the student very much ...',
        raw: 'The student the teacher likes the student very much is feeling sick.',
        duplicate: 'the student',
        final: 'The student whom the teacher likes very much is feeling sick.',
      },
      '8': {
        main: 'The teacher is very experienced.',
        support: 'We met the teacher yesterday.',
        commonA: 'The teacher',
        commonB: 'the teacher',
        antecedent: 'The teacher',
        relation: 'whom',
        lead: 'The teacher ...',
        embedded: 'The teacher we met the teacher yesterday ...',
        raw: 'The teacher we met the teacher yesterday is very experienced.',
        duplicate: 'the teacher',
        final: 'The teacher whom we met yesterday is very experienced.',
      },
    },
    '02': {
      '5': {
        main: 'The movie is about a hero.',
        support: 'The movie is popular.',
        commonA: 'The movie',
        commonB: 'The movie',
        antecedent: 'The movie',
        relation: 'which',
        lead: 'The movie ...',
        embedded: 'The movie the movie is popular ...',
        raw: 'The movie the movie is popular is about a hero.',
        duplicate: 'the movie',
        final: 'The movie which is popular is about a hero.',
      },
      '6': {
        main: 'The building is a hotel.',
        support: 'It stands at the corner.',
        commonA: 'The building',
        commonB: 'It',
        antecedent: 'The building',
        relation: 'which / that',
        lead: 'The building ...',
        embedded: 'The building the building stands at the corner ...',
        raw: 'The building the building stands at the corner is a hotel.',
        duplicate: 'the building',
        final: 'The building which stands at the corner is a hotel.',
      },
      '7': {
        main: 'The Martian is an exciting sci-fi movie.',
        support: 'I highly recommend it to everyone.',
        commonA: 'The Martian',
        commonB: 'it',
        antecedent: 'The Martian',
        relation: 'which / that',
        lead: 'The Martian ...',
        embedded: 'The Martian I highly recommend The Martian to everyone ...',
        raw: 'The Martian I highly recommend The Martian to everyone is an exciting sci-fi movie.',
        duplicate: 'The Martian',
        final: 'The Martian which I highly recommend to everyone is an exciting sci-fi movie.',
      },
      '8': {
        main: 'The social media application is really helpful for making friends.',
        support: 'My deskmate recommended it.',
        commonA: 'The social media application',
        commonB: 'it',
        antecedent: 'The social media application',
        relation: 'which / that',
        lead: 'The social media application ...',
        embedded: 'The social media application my deskmate recommended the social media application ...',
        raw: 'The social media application my deskmate recommended the social media application is really helpful for making friends.',
        duplicate: 'the social media application',
        final: 'The social media application which my deskmate recommended is really helpful for making friends.',
      },
    },
    '03': {
      '0': {
        mode: 'prep',
        pageStyle: 'qa',
        qaPrefix: 'p0',
        prep: 'on',
        prepPhrase: 'on that day',
        awkward: 'I will never forget the day which I gave a speech in front of the whole school on.',
        adverbialRole: '时间状语',
        main: 'I will never forget the day.',
        support: 'I gave a speech in front of the whole school on that day.',
        commonA: 'the day',
        commonB: 'that day',
        antecedent: 'the day',
        relation: 'on which / when',
        lead: 'I will never forget the day ...',
        embedded: 'I will never forget the day I gave a speech in front of the whole school on that day ...',
        raw: 'I will never forget the day I gave a speech in front of the whole school on that day.',
        duplicate: 'that day',
        final: 'I will never forget the day on which I gave a speech in front of the whole school.',
      },
      '1': {
        mode: 'prep',
        pageStyle: 'steps',
        stepPrefix: 'p1',
        answerAreaId: 'p1-answer-area',
        prep: 'during',
        prepPhrase: 'during this period',
        awkward:
          'High school is a golden period which we grow rapidly both physically and mentally during.',
        adverbialRole: '时间状语',
        main: 'High school is a golden period.',
        support: 'We grow rapidly both physically and mentally during this period.',
        commonA: 'a golden period',
        commonB: 'this period',
        antecedent: 'a golden period',
        relation: 'during which',
        lead: 'High school is a golden period ...',
        embedded:
          'High school is a golden period we grow rapidly both physically and mentally during this period ...',
        raw: 'High school is a golden period we grow rapidly both physically and mentally during this period.',
        duplicate: 'this period',
        final: 'High school is a golden period during which we grow rapidly both physically and mentally.',
      },
      '3': {
        mode: 'prep',
        pageStyle: 'qa',
        qaPrefix: 'p3',
        prep: 'in',
        prepPhrase: 'in this space',
        awkward:
          'The school library is a quiet space which we can fully focus on our exam preparation in.',
        adverbialRole: '地点状语',
        main: 'The school library is a quiet space.',
        support: 'We can fully focus on our exam preparation in this space.',
        commonA: 'a quiet space',
        commonB: 'this space',
        antecedent: 'a quiet space',
        relation: 'in which / where',
        lead: 'The school library is a quiet space ...',
        embedded:
          'The school library is a quiet space we can fully focus on our exam preparation in this space ...',
        raw: 'The school library is a quiet space we can fully focus on our exam preparation in this space.',
        duplicate: 'this space',
        final: 'The school library is a quiet space in which we can fully focus on our exam preparation.',
      },
      '4': {
        mode: 'prep',
        pageStyle: 'steps',
        stepPrefix: 'p4',
        answerAreaId: 'p4-answer-area',
        prep: 'on',
        prepPhrase: 'on this platform',
        awkward:
          'Our school has provided us with an excellent platform which we can show our hidden talents on.',
        adverbialRole: '地点状语',
        main: 'Our school has provided us with an excellent platform.',
        support: 'We can show our hidden talents on this platform.',
        commonA: 'an excellent platform',
        commonB: 'this platform',
        antecedent: 'an excellent platform',
        relation: 'on which / where',
        lead: 'Our school has provided us with an excellent platform ...',
        embedded:
          'Our school has provided us with an excellent platform we can show our hidden talents on this platform ...',
        raw: 'Our school has provided us with an excellent platform we can show our hidden talents on this platform.',
        duplicate: 'this platform',
        final:
          'Our school has provided us with an excellent platform on which we can show our hidden talents.',
      },
    },
  };

  var pageConfigs = configs[lesson] || {};
  var states = new WeakMap();
  var standardStepLabels = [
    '找共同名词（先行词）',
    '确定主句与补充信息',
    '主句写到先行词为止',
    '把补充句放到先行词后',
    '补全主句剩余内容',
    '删除重复的人或物',
    '用关系词替换并紧挨先行词',
  ];
  var prepStepLabels = [
    '找共同名词（先行词）',
    '确定主句与补充信息',
    '主句写到先行词为止',
    '把补充句放到先行词后',
    '补全主句剩余内容',
    '用 which 替换从句中的先行词',
    '介词与 which 一起前移',
  ];
  var prepQaLabels = [
    '共同描述的对象',
    '哪句话是主句',
    '先合并带 which 的句子',
    '是否存在不自然之处',
    '介词如何与 which 组合',
    '介词+which 的成分',
  ];

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function mark(text, token, className, last) {
    var source = String(text);
    var needle = String(token);
    var haystack = source.toLowerCase();
    var target = needle.toLowerCase();
    var index = last ? haystack.lastIndexOf(target) : haystack.indexOf(target);
    if (index < 0) return esc(source);
    return (
      esc(source.slice(0, index)) +
      '<span class="' +
      className +
      '">' +
      esc(source.slice(index, index + needle.length)) +
      '</span>' +
      esc(source.slice(index + needle.length))
    );
  }

  function markAwkward(config) {
    var text = mark(config.awkward, 'which', 'is-relation', false);
    return mark(text, config.prep, 'is-prep-split', true);
  }

  function markPrepFinal(config) {
    var phrase = config.prep + ' which';
    return mark(config.final, phrase, 'is-relation', false);
  }

  function stepPlan(config) {
    if (!config || config.mode !== 'prep') {
      return { labels: standardStepLabels, count: standardStepLabels.length };
    }
    if (config.pageStyle === 'qa') {
      return { labels: prepQaLabels, count: prepQaLabels.length };
    }
    return { labels: prepStepLabels, count: prepStepLabels.length };
  }

  function ensureStage(page, config) {
    var left = page.querySelector('.p5-left');
    if (!left) return null;

    left.querySelectorAll(':scope > .sentence-block').forEach(function (legacy) {
      legacy.classList.add('l13rc-legacy-merge-hidden');
    });

    var media = left.querySelector(':scope > .image-row, :scope > .image-card');
    if (media) media.classList.remove('guide-hidden', 'hidden');

    var stage = left.querySelector(':scope > .l13rc-merge-stage');
    if (!stage) {
      stage = document.createElement('section');
      stage.className = 'l13rc-merge-stage';
      stage.setAttribute('aria-live', 'polite');
      if (media) media.insertAdjacentElement('afterend', stage);
      else left.prepend(stage);
    }

    if (!states.has(page)) states.set(page, { index: -1 });
    render(page, config, -1);
    return stage;
  }

  function originalPair(config, index) {
    var main =
      index >= 0 ? mark(config.main, config.commonA, 'is-common', false) : esc(config.main);
    var support =
      index >= 0 ? mark(config.support, config.commonB, 'is-common', false) : esc(config.support);
    return (
      '<section class="l13rc-merge-originals"><span>原始两句话 · 全程保留</span>' +
      '<div class="l13rc-merge-pair"><p><b>1</b> ' +
      main +
      '</p><p><b>2</b> ' +
      support +
      '</p></div></section>'
    );
  }

  function stageBodyStandard(config, index) {
    if (index < 0) {
      return '<p class="l13rc-merge-placeholder">点击“显示下一步”，逐步完成句子融合。</p>';
    }
    if (index === 0) {
      return '<p class="l13rc-merge-note">高亮部分指向同一个人或物，它就是先行词。</p>';
    }
    if (index === 1) {
      return (
        '<div class="l13rc-merge-role"><span>主句</span><p>' +
        esc(config.main) +
        '</p></div><div class="l13rc-merge-role is-support"><span>补充句</span><p>' +
        esc(config.support) +
        '</p></div>'
      );
    }
    if (index === 2) {
      return (
        '<p class="l13rc-merge-build">' +
        mark(config.lead, config.antecedent, 'is-antecedent', false) +
        '</p>'
      );
    }
    if (index === 3) {
      return (
        '<p class="l13rc-merge-build">' +
        mark(config.embedded, config.duplicate, 'is-inserted', true) +
        '</p><p class="l13rc-merge-note">这里只嵌入补充句，主句后半段暂时不写。</p>'
      );
    }
    if (index === 4) {
      return (
        '<p class="l13rc-merge-build">' +
        mark(config.raw, config.duplicate, 'is-duplicate', true) +
        '</p><p class="l13rc-merge-note">现在补上主句剩余内容，主句才完整。</p>'
      );
    }
    if (index === 5) {
      return (
        '<p class="l13rc-merge-build">' +
        mark(config.raw, config.duplicate, 'is-deleted', true) +
        '</p><p class="l13rc-merge-note is-warning">同一人或物重复出现，删掉从句中的重复项。</p>'
      );
    }
    return (
      '<p class="l13rc-merge-build is-final">' +
      mark(config.final, config.relation.split(' / ')[0], 'is-relation', false) +
      '</p><p class="l13rc-merge-note is-success">融合完成：关系词紧挨先行词。</p>'
    );
  }

  function stageBodyPrepSteps(config, index) {
    if (index < 0) {
      return '<p class="l13rc-merge-placeholder">点击“显示下一步”，逐步完成句子融合。</p>';
    }
    if (index <= 4) return stageBodyStandard(config, index);
    if (index === 5) {
      return (
        '<p class="l13rc-merge-build">' +
        markAwkward(config) +
        '</p><p class="l13rc-merge-note is-warning">which 已替换先行词，但介词仍留在句末，义群被拆开。</p>'
      );
    }
    return (
      '<p class="l13rc-merge-build is-final">' +
      markPrepFinal(config) +
      '</p><p class="l13rc-merge-note is-success">融合完成：' +
      esc(config.prep + ' which') +
      ' 在从句中充当' +
      esc(config.adverbialRole) +
      '。</p>'
    );
  }

  function stageBodyPrepQa(config, index) {
    if (index < 0) {
      return '<p class="l13rc-merge-placeholder">点击“显示下一步”，逐步完成句子融合。</p>';
    }
    if (index === 0) {
      return '<p class="l13rc-merge-note">高亮部分指向同一个时间或地点，它就是先行词。</p>';
    }
    if (index === 1) {
      return (
        '<div class="l13rc-merge-role"><span>主句</span><p>' +
        esc(config.main) +
        '</p></div><div class="l13rc-merge-role is-support"><span>补充句</span><p>' +
        esc(config.support) +
        '</p></div>'
      );
    }
    if (index === 2) {
      return (
        '<p class="l13rc-merge-build">' +
        markAwkward(config) +
        '</p><p class="l13rc-merge-note">先按普通 which 合并，得到带 which 的句子。</p>'
      );
    }
    if (index === 3) {
      return (
        '<p class="l13rc-merge-build">' +
        markAwkward(config) +
        '</p><p class="l13rc-merge-note is-warning">' +
        esc(config.prepPhrase || config.prep + ' ' + config.commonB) +
        ' 是完整义群，介词不宜与 which 分离。</p>'
      );
    }
    if (index === 4) {
      return (
        '<p class="l13rc-merge-build is-final">' +
        markPrepFinal(config) +
        '</p><p class="l13rc-merge-note is-success">把介词与 which 一起移到先行词之后，保持义群完整。</p>'
      );
    }
    return (
      '<p class="l13rc-merge-build is-final">' +
      markPrepFinal(config) +
      '</p><p class="l13rc-merge-note is-success">' +
      esc(config.prep + ' which') +
      ' 在从句中充当' +
      esc(config.adverbialRole) +
      '。</p>'
    );
  }

  function stageBody(config, index) {
    if (config.mode === 'prep' && config.pageStyle === 'qa') {
      return stageBodyPrepQa(config, index);
    }
    if (config.mode === 'prep') {
      return stageBodyPrepSteps(config, index);
    }
    return stageBodyStandard(config, index);
  }

  function render(page, config, index) {
    var stage = page.querySelector('.l13rc-merge-stage');
    if (!stage) return;
    var plan = stepPlan(config);
    var safeIndex = Math.max(-1, Math.min(plan.count - 1, index));
    var dots = plan.labels
      .map(function (_, dotIndex) {
        var className = dotIndex < safeIndex ? 'is-done' : dotIndex === safeIndex ? 'is-active' : '';
        return '<span class="' + className + '">' + (dotIndex + 1) + '</span>';
      })
      .join('');
    stage.innerHTML =
      '<header><div><span>动态融合</span><strong>' +
      (safeIndex < 0 ? '两个简单句' : plan.labels[safeIndex]) +
      '</strong></div><div class="l13rc-merge-dots" aria-hidden="true">' +
      dots +
      '</div></header><div class="l13rc-merge-canvas">' +
      originalPair(config, safeIndex) +
      '<section class="l13rc-merge-process"><span>当前融合过程</span>' +
      stageBody(config, safeIndex) +
      '</section></div>';
    stage.classList.remove('is-updating');
    void stage.offsetWidth;
    stage.classList.add('is-updating');
  }

  function revealNode(node) {
    if (!node) return;
    node.classList.remove('guide-hidden', 'hidden');
    node.style.display = '';
    void node.offsetWidth;
    node.classList.add('guide-reveal');
  }

  function hideNode(node) {
    if (!node) return;
    node.classList.add('guide-hidden');
    node.classList.remove('guide-reveal');
  }

  function revealRightStep(page, config, index) {
    if (config.mode === 'prep' && config.pageStyle === 'qa') {
      var n = index + 1;
      var prefix = config.qaPrefix;
      revealNode(document.getElementById(prefix + '-q' + n));
      revealNode(document.getElementById(prefix + '-a' + n));
      var active = document.getElementById(prefix + '-q' + n);
      if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }

    if (config.mode === 'prep' && config.pageStyle === 'steps') {
      var step = document.getElementById(config.stepPrefix + '-s' + (index + 1));
      revealNode(step);
      if (index >= stepPlan(config).count - 1 && config.answerAreaId) {
        revealNode(document.getElementById(config.answerAreaId));
      }
      if (step) step.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }

    var steps = page.querySelectorAll('.p5-right .step-item');
    if (steps[index]) {
      revealNode(steps[index]);
      steps[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function resetRightPanel(page, config) {
    if (config.mode === 'prep' && config.pageStyle === 'qa') {
      var prefix = config.qaPrefix;
      for (var i = 1; i <= 6; i++) {
        hideNode(document.getElementById(prefix + '-q' + i));
        hideNode(document.getElementById(prefix + '-a' + i));
      }
      return;
    }

    if (config.mode === 'prep' && config.pageStyle === 'steps') {
      for (var j = 1; j <= 7; j++) {
        hideNode(document.getElementById(config.stepPrefix + '-s' + j));
      }
      hideNode(document.getElementById(config.answerAreaId));
      return;
    }

    page.querySelectorAll('.p5-right .step-item').forEach(function (step) {
      hideNode(step);
    });
  }

  function configFor(page) {
    return page && pageConfigs[page.getAttribute('data-page')];
  }

  function reset(page) {
    var config = configFor(page);
    if (!config) return false;
    var state = states.get(page) || { index: -1 };
    state.index = -1;
    states.set(page, state);
    resetRightPanel(page, config);
    ensureStage(page, config);
    return true;
  }

  function handleFooterClick(button, page) {
    var config = configFor(page);
    if (!config) return false;
    var text = (button.textContent || '').trim();
    var isPrimary =
      button.classList.contains('l13rc-action-primary') ||
      /显示下一步|下一步|重新演示/.test(text);
    if (!isPrimary) return false;

    var plan = stepPlan(config);
    var state = states.get(page) || { index: -1 };
    if (state.index >= plan.count - 1) {
      reset(page);
      button.textContent = '显示下一步';
      return true;
    }

    state.index += 1;
    states.set(page, state);
    revealRightStep(page, config, state.index);
    render(page, config, state.index);
    button.textContent =
      state.index >= plan.count - 1
        ? '重新演示'
        : '下一步 · ' + (state.index + 2) + ' / ' + plan.count;
    return true;
  }

  var currentActive = null;

  function activateCurrent() {
    var active = document.querySelector('.page.active[data-page]');
    if (active === currentActive) return;
    currentActive = active;
    if (active && configFor(active)) reset(active);
  }

  var observer = new MutationObserver(function (records) {
    if (
      records.some(function (record) {
        return (
          record.type === 'attributes' &&
          record.attributeName === 'class' &&
          record.target.matches &&
          record.target.matches('.page[data-page]')
        );
      })
    ) {
      requestAnimationFrame(activateCurrent);
    }
  });
  observer.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });

  global.L13RCMergeAnimations = {
    handleFooterClick: handleFooterClick,
    reset: reset,
  };

  activateCurrent();
})(window);
