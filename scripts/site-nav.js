/**
 * S-Class 全站多级页面导航
 * 以文档流插入顶栏（非悬浮遮罩），提供「返回上一级」与面包屑。
 */
(function () {
    'use strict';

    if (window.__SCLASS_PAGE_NAV__) return;
    window.__SCLASS_PAGE_NAV__ = true;

    if (window !== window.top) return;

    var STAGES = {
        primary: { label: '小学', hash: 'stage-primary' },
        junior: { label: '初中', hash: 'stage-junior' },
        senior: { label: '高中', hash: 'stage-senior' },
        abroad: { label: '留学', hash: 'stage-abroad' },
        extra: { label: '拓展', hash: 'stage-extra' }
    };

    var ROUTES = [
        { prefix: 'PET-exam', stage: 'primary', hub: { label: 'PET 模考', href: 'PET-exam/index.html' } },
        { prefix: 'PET/studio', stage: 'primary', hub: { label: 'PET 课程', href: 'PET/index.html' }, sub: { label: '混合游戏', href: 'PET/studio/index.html' } },
        { prefix: 'PET', stage: 'primary', hub: { label: 'PET 课程', href: 'PET/index.html' } },
        { prefix: 'Primary/School_textbook', stage: 'primary', hub: { label: '外研单词', href: 'Primary/School_textbook/Courseware/index.html' } },
        { prefix: 'Primary/The_Alphabet', stage: 'primary', hub: { label: '字母 A–Z', href: 'Primary/The_Alphabet/index.html' } },
        { prefix: 'Primary/Alphabet', stage: 'primary', hub: { label: '字母世界', href: 'Primary/Alphabet/index.html' } },
        { prefix: 'Primary/phonics', stage: 'primary', hub: { label: '自然拼读', href: 'Primary/phonics/index.html' } },
        { prefix: 'Primary', stage: 'primary', hub: { label: '分级阅读', href: 'Primary/index.html' } },
        { prefix: 'P/', stage: 'primary', hub: { label: '语音课', href: 'P/语音课/index.html' } },
        { prefix: 'Psle', stage: 'primary', hub: { label: '小升初', href: 'Psle/index.html' } },
        { prefix: '2026EXAM/HET', stage: 'junior', hub: { label: '中考真题', href: 'HET/index.html' } },
        { prefix: '2026EXAM/CEE', stage: 'senior', hub: { label: '高考英语', href: 'CEE/web/index.html' } },
        { prefix: 'HET', stage: 'junior', hub: { label: '中考真题', href: 'HET/index.html' } },
        { prefix: 'junior_vocab', stage: 'junior', hub: { label: '初中词汇', href: 'junior_vocab/Courseware/index.html' } },
        { prefix: 'irregular_verbs', stage: 'junior', hub: { label: '不规则动词', href: 'irregular_verbs/index.html' } },
        { prefix: 'Grammar', stage: 'junior', hub: { label: '语法', href: 'Grammar/index.html' } },
        { prefix: 'REFH', stage: 'junior', hub: { label: '精读', href: 'REFH/index.html' } },
        { prefix: 'CEE', stage: 'senior', hub: { label: '高考英语', href: 'CEE/web/index.html' } },
        { prefix: 'IELTS-exam', stage: 'abroad', hub: { label: '雅思', href: 'IELTS-exam/index.html' } },
        { prefix: 'AEIS', stage: 'abroad', hub: { label: 'AEIS', href: 'AEIS/index.html' } },
        { prefix: 'Video_Lab', stage: 'extra', hub: { label: 'Video Lab', href: 'Video_Lab/index.html' } },
        { prefix: 'encyclopedia', stage: 'extra', hub: { label: '百科', href: 'encyclopedia/index.html' } },
        { prefix: 'FU2', stage: 'primary', hub: { label: 'NG 阅读', href: 'FU/index.html' } },
        { prefix: 'FU3', stage: 'primary', hub: { label: 'NG 阅读', href: 'FU/index.html' } },
        { prefix: 'FU/', stage: 'primary', hub: { label: 'NG 阅读', href: 'FU/index.html' } },
        { prefix: 'TED', stage: 'extra', hub: { label: '拓展', href: 'index.html#stage-extra' } },
        { prefix: 'Class', stage: null, hub: { label: '班级', href: 'Class/index.html' } }
    ];

    var FOLDER_LABELS = {
        'Play Kitty': 'Play Kitty',
        'Jump Pup': 'Jump Pup',
        'Peek Otter': 'Peek Otter',
        'Dive Dolphin': 'Dive Dolphin',
        'Hello Penguins': 'Hello Penguins',
        'Flutter Butterfly': 'Flutter Butterfly',
        'Helpers in your neighborhood': '社区帮手',
        'What are reptiles': '爬行动物',
        'Worlds Largest Deserts': '最大的沙漠',
        'The_Alphabet': '字母 A–Z',
        'Alphabet': '字母世界',
        'School_textbook': '外研单词',
        'Courseware': '课件',
        'phonics': '自然拼读',
        'studio': '混合游戏',
        'An Interview with Fitz Cahall': 'Fitz 访谈',
        'Review on Vocab and preparation for the video task': '词汇复习',
        'Video Task': '视频任务',
        '词形填空练习': '词形填空',
        '完成图表练习': '完成图表',
        'L00-主谓宾与非谓语': '主谓宾与非谓语',
        'L00-主系表与非谓语': '主系表与非谓语',
        'L13-定语从句': '定语从句',
        'pronouns': '代词',
        'Listening': '听力',
        'Reading': '阅读',
        'games': '游戏',
        'web': '高考模考'
    };

    var LESSON_LABELS = {
        L01: '一般现在时',
        L02: '现在进行时',
        L03: '一般过去时',
        L05: '代词与介词',
        L06: '情态动词',
        L07: '比较级与最高级',
        L08: '一般将来时',
        L09: '过去进行时',
        L10: '现在完成时',
        L11: '状语从句',
        L12: '宾语从句',
        L13: '过去完成时',
        L14: '被动语态',
        L15: '词性转换'
    };

    function relPathFromRoot() {
        var path = (location.pathname || '').replace(/\\/g, '/');
        if (!path || path === '/') return 'index.html';
        path = path.replace(/^\//, '');
        if (!path) return 'index.html';
        if (/\/$/.test(path)) path += 'index.html';
        return path;
    }

    function isHomePage(rel) {
        return !rel || rel === 'index.html';
    }

    function dirname(p) {
        var i = p.lastIndexOf('/');
        return i < 0 ? '' : p.slice(0, i);
    }

    function basename(p) {
        var i = p.lastIndexOf('/');
        return i < 0 ? p : p.slice(i + 1);
    }

    function decodeSeg(seg) {
        try { return decodeURIComponent(seg); } catch (e) { return seg; }
    }

    function prettyFolder(seg) {
        var raw = decodeSeg(seg);
        if (FOLDER_LABELS[raw]) return FOLDER_LABELS[raw];
        if (LESSON_LABELS[raw]) return LESSON_LABELS[raw];
        var m = /^P(\d{2})$/.exec(raw);
        if (m) return 'Practice ' + m[1];
        m = /^G(\d)_B(\d)$/.exec(raw);
        if (m) return (['', '七', '八', '九'][Number(m[1])] || m[1]) + '年级' + (m[2] === '1' ? '上' : '下');
        m = /^0?(\d{1,2})$/.exec(raw);
        if (m) return '第 ' + Number(m[1]) + ' 课';
        m = /^Unit(\d+)_passage$/i.exec(raw);
        if (m) return 'Unit ' + m[1] + ' 口语';
        m = /^Unit(\d+)_summary$/i.exec(raw);
        if (m) return 'Unit ' + m[1] + ' 复习';
        m = /^FU(\d+)$/.exec(raw);
        if (m) return 'FU' + m[1];
        m = /^set_(\d+)/i.exec(raw);
        if (m) return '第 ' + Number(m[1]) + ' 套';
        if (/^index\.html$/i.test(raw)) return '目录';
        return raw.replace(/[_-]+/g, ' ').replace(/\.html$/i, '');
    }

    function shouldSkipDirCrumb(seg, isLastDir, file) {
        if (/^\d{1,2}$/.test(seg)) return true;
        if (/^Unit\d+_(passage|summary)$/i.test(seg)) return true;
        if (/^FU\d{3}$/.test(seg) && file.toLowerCase().indexOf(seg.toLowerCase()) === 0) return true;
        return false;
    }

    function prettyPage(file) {
        var raw = decodeSeg(file).replace(/\.html?$/i, '');
        if (/^index$/i.test(raw)) return '目录';
        if (/^review$/i.test(raw)) return '复习';
        if (/^learn$/i.test(raw)) return '学习';
        var m = /^0?(\d{1,2})$/.exec(raw);
        if (m) return '第 ' + Number(m[1]) + ' 课';
        return raw.replace(/[_-]+/g, ' ');
    }

    function matchRoute(rel) {
        for (var i = 0; i < ROUTES.length; i++) {
            var r = ROUTES[i];
            if (rel === r.prefix || rel.indexOf(r.prefix) === 0) return r;
        }
        return null;
    }

    function sameHref(a, b) {
        function norm(p) {
            p = String(p || '');
            var hash = '';
            var hi = p.indexOf('#');
            if (hi >= 0) {
                hash = p.slice(hi);
                p = p.slice(0, hi);
            }
            p = p.replace(/^\.\//, '').replace(/\/+$/, '');
            if (!p) p = 'index.html';
            if (!/\.html?$/i.test(p) && p.indexOf('?') < 0) p += '/index.html';
            return p + hash;
        }
        return norm(a) === norm(b);
    }

    function buildCrumbs(rel, root) {
        var crumbs = [{ label: '首页', href: root + 'index.html' }];
        var route = matchRoute(rel);
        if (route && route.stage && STAGES[route.stage]) {
            var st = STAGES[route.stage];
            crumbs.push({ label: st.label, href: root + 'index.html#' + st.hash });
        }
        if (route && route.hub) {
            crumbs.push({ label: route.hub.label, href: root + route.hub.href });
        }
        if (route && route.sub) {
            crumbs.push({ label: route.sub.label, href: root + route.sub.href });
        }

        var hubHref = route && route.sub ? route.sub.href : (route && route.hub ? route.hub.href : '');
        var hubDir = hubHref ? dirname(hubHref) : '';
        var dir = dirname(rel);
        var file = basename(rel);
        var isIndex = /^index\.html$/i.test(file);

        var dirSegs = dir ? dir.split('/').filter(Boolean) : [];
        var hubSegs = hubDir ? hubDir.split('/').filter(Boolean) : [];
        var extra = dirSegs.slice(hubSegs.length);
        var acc = hubDir;

        extra.forEach(function (seg, idx) {
            acc = acc ? acc + '/' + seg : seg;
            var isLastDir = idx === extra.length - 1;
            if (shouldSkipDirCrumb(seg, isLastDir, file)) return;
            crumbs.push({ label: prettyFolder(seg), href: root + acc + '/index.html' });
        });

        if (!isIndex) {
            crumbs.push({ label: prettyPage(file), href: null });
        }

        var last = crumbs[crumbs.length - 1];
        var currentRel = rel;
            if (last && last.href && sameHref(last.href.replace(root, ''), currentRel)) {
            last.href = null;
        } else if (isIndex && extra.length) {
            last = crumbs[crumbs.length - 1];
            if (last) last.href = null;
        } else if (isIndex && route && route.hub && sameHref(route.hub.href, rel)) {
            last = crumbs[crumbs.length - 1];
            if (last) last.href = null;
        }

        var deduped = [];
        crumbs.forEach(function (c) {
            var prev = deduped[deduped.length - 1];
            if (prev && prev.label === c.label && !!prev.href === !!c.href) return;
            if (prev && c.href && prev.href && sameHref(prev.href, c.href)) return;
            deduped.push(c);
        });
        return deduped;
    }

    function parentOf(crumbs) {
        for (var i = crumbs.length - 1; i >= 0; i--) {
            if (crumbs[i].href) return crumbs[i];
        }
        return crumbs[0];
    }

    function rootPrefix() {
        var rel = relPathFromRoot();
        var dir = dirname(rel);
        if (!dir) return '';
        return dir.split('/').map(function () { return '..'; }).join('/') + '/';
    }

    function loadCss(root) {
        if (document.getElementById('sclass-page-nav-css')) return;
        var link = document.createElement('link');
        link.id = 'sclass-page-nav-css';
        link.rel = 'stylesheet';
        link.href = root + 'styles/s-class-page-nav.css?v=2';
        document.head.appendChild(link);
    }

    function injectCriticalCss() {
        if (document.getElementById('sclass-page-nav-critical')) return;
        var style = document.createElement('style');
        style.id = 'sclass-page-nav-critical';
        style.textContent =
            '.sclass-page-nav{box-sizing:border-box;display:flex;align-items:center;flex-wrap:wrap;gap:10px;' +
            'width:100%;max-width:100%;align-self:flex-start;flex:0 0 auto;min-height:44px;margin:0;' +
            'padding:8px 16px;background:#fff;border-bottom:1px solid rgba(15,23,42,.1);' +
            'font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei",system-ui,sans-serif;' +
            'font-size:13px;line-height:1.4;color:#0f172a;position:relative;z-index:200}' +
            'html.sclass-has-page-nav body:has(> .app),html.sclass-has-page-nav body.deck{' +
            'flex-direction:column;justify-content:flex-start;align-items:center}' +
            '.sclass-page-nav-back{display:inline-flex;align-items:center;gap:6px;flex-shrink:0;' +
            'min-height:32px;padding:4px 12px 4px 10px;border-radius:999px;border:1px solid rgba(15,23,42,.1);' +
            'background:#f8fafc;color:#0f172a!important;font-weight:700!important;text-decoration:none!important;white-space:nowrap}' +
            '.sclass-page-nav-back svg{width:14px!important;height:14px!important;max-width:14px!important;' +
            'max-height:14px!important;flex-shrink:0;display:block;overflow:visible}' +
            '.sclass-page-nav-crumbs{display:flex;align-items:center;flex-wrap:wrap;gap:4px 2px;min-width:0;color:#64748b}' +
            '.sclass-page-nav a{color:#0f766e;text-decoration:none;font-weight:600}' +
            '.sclass-page-nav-crumbs a{color:#64748b;font-weight:500}' +
            '.sclass-page-nav-sep{padding:0 4px;color:#cbd5e1}' +
            '.sclass-page-nav-current{color:#0f172a;font-weight:700}';
        document.head.appendChild(style);
    }

    function svgArrow() {
        return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" ' +
            'style="width:14px;height:14px;max-width:14px;max-height:14px;flex-shrink:0;display:block">' +
            '<path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>';
    }

    function mount() {
        if (document.documentElement.getAttribute('data-no-page-nav') === '1') return;
        if (document.getElementById('sclass-page-nav')) return;

        var rel = relPathFromRoot();
        if (isHomePage(rel)) return;

        var root = rootPrefix();
        injectCriticalCss();
        loadCss(root);

        var crumbs = buildCrumbs(rel, root);
        var parent = parentOf(crumbs);
        var backHref = parent && parent.href ? parent.href : root + 'index.html';
        var backLabel = parent && parent.label ? '返回' + parent.label : '返回上一级';

        var nav = document.createElement('nav');
        nav.id = 'sclass-page-nav';
        nav.className = 'sclass-page-nav';
        nav.setAttribute('aria-label', '页面导航');

        var back = document.createElement('a');
        back.className = 'sclass-page-nav-back';
        back.href = backHref;
        back.innerHTML = svgArrow() + '<span></span>';
        back.querySelector('span').textContent = backLabel;
        nav.appendChild(back);

        var ol = document.createElement('div');
        ol.className = 'sclass-page-nav-crumbs';
        crumbs.forEach(function (c, i) {
            if (i) {
                var sep = document.createElement('span');
                sep.className = 'sclass-page-nav-sep';
                sep.textContent = '/';
                ol.appendChild(sep);
            }
            if (c.href) {
                var a = document.createElement('a');
                a.href = c.href;
                a.textContent = c.label;
                ol.appendChild(a);
            } else {
                var cur = document.createElement('span');
                cur.className = 'sclass-page-nav-current';
                cur.textContent = c.label;
                ol.appendChild(cur);
            }
        });
        nav.appendChild(ol);

        var body = document.body;
        if (!body) return;
        body.insertBefore(nav, body.firstChild);
        document.documentElement.classList.add('sclass-has-page-nav');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
