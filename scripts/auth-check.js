/**
 * 全站登录检查：未登录时跳转到首页 index.html 进行 Authing 登录。
 * 首页自身不跳转。依赖 localStorage 的 authing-user 或 current-user。
 */
(function() {
    'use strict';
    var path = (location.pathname || '').replace(/^\//, '').replace(/\/$/, '');
    if (!path || path === 'index.html') return;
    var parts = path.split('/').filter(Boolean);
    if (parts.length === 1 && parts[0] === 'index.html') return;
    var user = localStorage.getItem('authing-user') || localStorage.getItem('current-user');
    if (user && String(user).trim()) return;
    var up = parts.length - 1;
    var rootIndex = up === 0 ? 'index.html' : (function(){ var a = []; for (var i = 0; i < up; i++) a.push('..'); return a.join('/') + '/index.html'; })();
    window.location.replace(rootIndex);
})();
