/**
 * API config for PET passage pages (AI / backend).
 * callAI 用于 AI 教师评价（朗读/翻译反馈），默认走 DeepSeek。
 * 可在本脚本之前设置 window.PET_DEEPSEEK_KEY 覆盖密钥。
 */
(function() {
    if (typeof window.API_BASE === 'undefined') window.API_BASE = '';
    if (typeof window.callAI === 'undefined') {
        var DEEPSEEK_KEY = window.PET_DEEPSEEK_KEY || 'sk-daa16008e81843deba6fefe9dce51465';
        window.callAI = function(opts) {
            var messages = opts && opts.messages;
            if (!messages || !messages.length) return Promise.resolve({ error: '缺少 messages' });
            return fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + DEEPSEEK_KEY },
                body: JSON.stringify({ model: 'deepseek-chat', messages: messages })
            })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    var content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
                    if (content) return { content: content };
                    return { error: data.error && data.error.message ? data.error.message : '评价服务返回异常' };
                })
                .catch(function(e) {
                    return { error: e.message || '评价服务连接失败' };
                });
        };
    }
})();
