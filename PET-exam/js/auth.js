/**
 * js/auth.js - 统一身份认证 (Key修正版)
 */
const Auth = {
    currentUser: null,
    timerInterval: null,

    init: function() {
        // ✅ 修正：统一使用 'current-user'，与 index.html 保持一致
        const u = localStorage.getItem('current-user');
        if(u) this.currentUser = u;
        // 如果没有用户，是否强制登录视页面而定，这里暂不强制
    },

    // 登录逻辑 (供独立登录页使用)
    login: function() {
        const val = document.getElementById('login-name').value;
        if(val) {
            localStorage.setItem('current-user', val); // ✅ 统一 Key
            location.reload();
        }
    },

    // 通用计时器 (可选)
    startTimer: function(elementId) {
        let sec = 0;
        const el = document.getElementById(elementId || 'exam-timer');
        if(!el) return;
        this.timerInterval = setInterval(() => {
            sec++;
            const m = Math.floor(sec/60).toString().padStart(2,'0');
            const s = (sec%60).toString().padStart(2,'0');
            el.textContent = `${m}:${s}`;
        }, 1000);
    },
    
    stopTimer: function() { clearInterval(this.timerInterval); }
};