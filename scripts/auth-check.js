/**
 * 全站登录检查：未登录时跳转到站点根目录 index.html 进行 Authing 登录。
 * 当前页若是 index.html（任意目录层级）则不跳转。
 * 同时加载触屏书写/白板工具（annotate-board.js）。
 */
(function () {
    'use strict';

    var pathname = location.pathname || '';
    var path = pathname.replace(/^\//, '').replace(/\/$/, '');
    var parts = path.split('/').filter(Boolean);
    var fileName = (parts[parts.length - 1] || '').toLowerCase();

    // 相对站点根的深度（文件名所在层级之上）
    var depth = parts.length ? parts.length - 1 : 0;
    // 无扩展名路径段视为目录（如 /AEIS/P01/）
    if (parts.length && fileName.indexOf('.') === -1) {
        depth = parts.length;
    }

    function loadAnnotateBoard() {
        if (window.__SCLASS_ANNOTATE_LOADED) return;
        if (document.querySelector('script[src*="annotate-board.js"]')) return;
        var prefix = '';
        for (var i = 0; i < depth; i++) prefix += '../';
        var s = document.createElement('script');
        s.src = prefix + 'scripts/annotate-board.js';
        s.defer = true;
        s.onerror = function () { /* 本地相对路径失败时静默忽略 */ };
        (document.head || document.documentElement).appendChild(s);
    }

    // 书写工具：登录页与课程页均可使用
    try { loadAnnotateBoard(); } catch (e) {}

    // 首页：根路径 / 或任意层级的 index.html
    if (!path || fileName === 'index.html') {
        return;
    }

    var user = localStorage.getItem('authing-user') || localStorage.getItem('current-user');
    if (user && String(user).trim()) {
        return;
    }

    if (depth <= 0) {
        window.location.replace('index.html');
        return;
    }

    var rootIndex = '';
    for (var i = 0; i < depth; i++) {
        rootIndex += '../';
    }
    rootIndex += 'index.html';
    window.location.replace(rootIndex);
})();
