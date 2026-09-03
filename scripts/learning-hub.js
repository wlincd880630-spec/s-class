/**
 * 首页学习目录：学段 → 模块 两级导航
 */
(function () {
    'use strict';

    var STAGES = [
        {
            id: 'primary',
            icon: 'fa-seedling',
            title: '小学',
            desc: '字母 · 阅读 · 教材 · PET',
            modules: [
                { title: '分级阅读', desc: '绘本与科学阅读', href: 'Primary/index.html' },
                { title: '字母世界', desc: 'A–Z 课件与游戏', href: 'Primary/Alphabet/index.html' },
                { title: '字母 A–Z', desc: '听写 · 描红 · 练习', href: 'Primary/The_Alphabet/index.html' },
                { title: '自然拼读', desc: 'CVC · Magic E', href: 'Primary/phonics/index.html' },
                { title: '外研单词', desc: '三至六年级', href: 'Primary/School_textbook/Courseware/index.html' },
                { title: '语音课', desc: '音节与 Magic E', href: 'P/语音课/index.html' },
                { title: 'PET 课程', desc: '18 单元词汇与口语', href: 'PET/index.html' },
                { title: 'PET 模考', desc: '听力 · 阅读', href: 'PET-exam/index.html' },
                { title: '小升初', desc: '综合卷与真题', href: 'Psle/index.html' },
                { title: 'NG 阅读', desc: 'Pathway 专题', href: 'FU/index.html' }
            ]
        },
        {
            id: 'junior',
            icon: 'fa-book-open',
            title: '初中',
            desc: '中考 · 词汇 · 语法 · 精读',
            modules: [
                { title: '中考真题', desc: '成都中考与专项', href: 'HET/index.html' },
                { title: '初中词汇', desc: '人教版七至九年级', href: 'junior_vocab/Courseware/index.html' },
                { title: '不规则动词', desc: '三态学习与游戏', href: 'irregular_verbs/index.html' },
                { title: '语法', desc: '时态 · 从句 · 语态', href: 'Grammar/index.html' },
                { title: '精读', desc: 'REFH 新闻阅读', href: 'REFH/index.html' }
            ]
        },
        {
            id: 'senior',
            icon: 'fa-graduation-cap',
            title: '高中',
            desc: '高考英语全题型',
            modules: [
                { title: '高考英语', desc: '阅读 · 完形 · 词形', href: 'CEE/web/index.html' },
                { title: '2026 全国二卷', desc: '最新高考真题', href: '2026EXAM/CEE/2026高考全国二卷英语.html' }
            ]
        },
        {
            id: 'abroad',
            icon: 'fa-globe-americas',
            title: '留学',
            desc: '雅思 · AEIS',
            modules: [
                { title: '雅思', desc: 'IELTS 听力等', href: 'IELTS-exam/index.html' },
                { title: 'AEIS', desc: '新加坡入学词汇', href: 'AEIS/index.html' }
            ]
        },
        {
            id: 'extra',
            icon: 'fa-layer-group',
            title: '拓展',
            desc: '视频课 · 百科',
            modules: [
                { title: 'Video Lab', desc: '视频精讲', href: 'Video_Lab/index.html' },
                { title: '学生百科', desc: '跨学科英语', href: 'encyclopedia/index.html' }
            ]
        }
    ];

    function el(html) {
        var d = document.createElement('div');
        d.innerHTML = html.trim();
        return d.firstChild;
    }

    function stageById(id) {
        for (var i = 0; i < STAGES.length; i++) {
            if (STAGES[i].id === id) return STAGES[i];
        }
        return null;
    }

    function renderRoot(root) {
        var html = '' +
            '<div class="learning-toolbar">' +
            '  <button type="button" class="btn-back-hub" onclick="exitLearningMode()"><i class="fas fa-arrow-left"></i> 返回首页</button>' +
            '  <nav class="hub-crumb" aria-label="当前位置"><span>学习</span></nav>' +
            '</div>' +
            '<div class="catalog-head">' +
            '  <span class="section-tag">学习目录</span>' +
            '  <h2>选择学段</h2>' +
            '  <p>先选学段，再进入课程</p>' +
            '</div>' +
            '<div class="hub-stage-grid" role="list"></div>';
        root.innerHTML = html;
        var grid = root.querySelector('.hub-stage-grid');
        STAGES.forEach(function (s) {
            var card = el(
                '<button type="button" class="hub-stage-card hub-stage-card--' + s.id + '" role="listitem">' +
                '  <span class="hub-stage-icon"><i class="fas ' + s.icon + '"></i></span>' +
                '  <span class="hub-stage-copy"><strong>' + s.title + '</strong><em>' + s.desc + '</em></span>' +
                '  <i class="fas fa-arrow-right" aria-hidden="true"></i>' +
                '</button>'
            );
            card.addEventListener('click', function () {
                if (typeof enterLearningMode === 'function') enterLearningMode('stage-' + s.id);
            });
            grid.appendChild(card);
        });
    }

    function renderStage(root, stage) {
        var html = '' +
            '<div class="learning-toolbar">' +
            '  <button type="button" class="btn-back-hub" data-hub-back><i class="fas fa-arrow-left"></i> 返回上一级</button>' +
            '  <nav class="hub-crumb" aria-label="当前位置">' +
            '    <a href="#learning" data-hub-home>学习</a>' +
            '    <span class="hub-crumb-sep">/</span>' +
            '    <span>' + stage.title + '</span>' +
            '  </nav>' +
            '</div>' +
            '<div class="catalog-head">' +
            '  <span class="section-tag">' + stage.title + '</span>' +
            '  <h2>' + stage.title + '课程</h2>' +
            '  <p>' + stage.desc + '</p>' +
            '</div>' +
            '<div class="hub-module-grid" role="list"></div>';
        root.innerHTML = html;
        root.querySelector('[data-hub-back]').addEventListener('click', function () {
            if (typeof enterLearningMode === 'function') enterLearningMode('');
        });
        root.querySelector('[data-hub-home]').addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof enterLearningMode === 'function') enterLearningMode('');
        });
        var grid = root.querySelector('.hub-module-grid');
        stage.modules.forEach(function (m) {
            var a = el(
                '<a class="hub-module-card" role="listitem" href="' + m.href + '">' +
                '  <strong>' + m.title + '</strong>' +
                '  <em>' + m.desc + '</em>' +
                '  <i class="fas fa-arrow-right" aria-hidden="true"></i>' +
                '</a>'
            );
            grid.appendChild(a);
        });
    }

    function open(view) {
        var mount = document.getElementById('learning-hub-root');
        if (!mount) return;
        var id = String(view || 'root').replace(/^stage-/, '');
        if (!id || id === 'learning') id = 'root';
        var stage = id === 'root' ? null : stageById(id);
        if (stage) renderStage(mount, stage);
        else renderRoot(mount);
        var links = document.querySelectorAll('.nav-menu a[data-stage]');
        links.forEach(function (a) {
            a.classList.toggle('is-active', stage && a.getAttribute('data-stage') === stage.id);
        });
        var learnLink = document.getElementById('nav-learning');
        if (learnLink) learnLink.classList.toggle('is-active', true);
    }

    window.LearningHub = {
        open: open,
        stages: STAGES
    };
})();
