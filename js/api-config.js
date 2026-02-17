/**
 * API config for PET passage pages (AI / backend).
 * Set window.API_BASE and window.callAI when you have a real backend.
 */
(function() {
    if (typeof window.API_BASE === 'undefined') window.API_BASE = '';
    if (typeof window.callAI === 'undefined') {
        window.callAI = function() {
            return Promise.reject(new Error('API_BASE not set'));
        };
    }
})();
