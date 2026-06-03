/**
 * 全站登录检查：未登录时跳转到站点根目录 index.html 进行 Authing 登录。
 * 当前页若是 index.html（任意目录层级）则不跳转。
 */
(function () {
    'use strict';

    var pathname = location.pathname || '';
    var path = pathname.replace(/^\//, '').replace(/\/$/, '');
    var parts = path.split('/').filter(Boolean);
    var fileName = (parts[parts.length - 1] || '').toLowerCase();

    // 首页：根路径 / 或任意层级的 index.html
    if (!path || fileName === 'index.html') {
        return;
    }

    var user = localStorage.getItem('authing-user') || localStorage.getItem('current-user');
    if (user && String(user).trim()) {
        return;
    }

    var depth = parts.length - 1;
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
