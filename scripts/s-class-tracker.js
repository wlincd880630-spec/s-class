/**
 * S-Class Unified Student Activity Tracker
 * 
 * Auto-detects Authing username, tracks session timing and activities,
 * sends standardized reports to teacher via EmailJS.
 *
 * Usage:
 *   Include this script in any HTML page:
 *   <script src="path/to/scripts/s-class-tracker.js"></script>
 *
 *   Then call on page completion:
 *   SClass.sendReport({ contentName: 'PET Unit 36', score: 92, total: 10 });
 */
(function () {
  var EMAILJS_PUBLIC_KEY = '1QhXV5G_92GdK7_DF';
  var EMAILJS_SERVICE_ID = 'service_6dfbs2n';
  var EMAILJS_TRACKER_TEMPLATE = 'template_zso8ebh';

  var startTime = new Date();
  var logs = [];
  var reportSent = false;

  function getUser() {
    return localStorage.getItem('authing-user') || '';
  }

  function formatDateTime(d) {
    var y = d.getFullYear();
    var mo = ('0' + (d.getMonth() + 1)).slice(-2);
    var da = ('0' + d.getDate()).slice(-2);
    var h = ('0' + d.getHours()).slice(-2);
    var mi = ('0' + d.getMinutes()).slice(-2);
    var s = ('0' + d.getSeconds()).slice(-2);
    return y + '-' + mo + '-' + da + ' ' + h + ':' + mi + ':' + s;
  }

  function formatDuration(ms) {
    var totalSec = Math.floor(ms / 1000);
    var h = Math.floor(totalSec / 3600);
    var m = Math.floor((totalSec % 3600) / 60);
    var s = totalSec % 60;
    if (h > 0) return h + 'h ' + m + 'min ' + s + 's';
    if (m > 0) return m + 'min ' + s + 's';
    return s + 's';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function buildDetailsHtml() {
    if (logs.length === 0) return '<p style="color:#999;">No detailed activity logged.</p>';

    var html = '<table style="border-collapse:collapse;width:100%;font-size:13px;font-family:Arial,sans-serif;">';
    html += '<tr style="background:#f0f0f0;"><th style="border:1px solid #ddd;padding:6px;text-align:left;">#</th>';
    html += '<th style="border:1px solid #ddd;padding:6px;text-align:left;">Type</th>';
    html += '<th style="border:1px solid #ddd;padding:6px;text-align:left;">Item</th>';
    html += '<th style="border:1px solid #ddd;padding:6px;text-align:left;">Result</th>';
    html += '<th style="border:1px solid #ddd;padding:6px;text-align:left;">Details</th></tr>';

    for (var i = 0; i < logs.length; i++) {
      var entry = logs[i];
      var rowColor = '';
      if (entry.result === 'wrong' || entry.result === 'error' || entry.result === 'incorrect') {
        rowColor = 'background:#fff0f0;';
      } else if (entry.result === 'correct' || entry.result === 'pass') {
        rowColor = 'background:#f0fff0;';
      }

      html += '<tr style="' + rowColor + '">';
      html += '<td style="border:1px solid #ddd;padding:5px;">' + (i + 1) + '</td>';
      html += '<td style="border:1px solid #ddd;padding:5px;">' + escapeHtml(entry.type) + '</td>';
      html += '<td style="border:1px solid #ddd;padding:5px;">' + escapeHtml(entry.item) + '</td>';
      html += '<td style="border:1px solid #ddd;padding:5px;">' + escapeHtml(entry.result) + '</td>';
      html += '<td style="border:1px solid #ddd;padding:5px;">' + escapeHtml(entry.details) + '</td>';
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }

  function ensureEmailJS(cb) {
    if (typeof emailjs !== 'undefined') { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = function () {
      try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { /* already init */ }
      cb();
    };
    s.onerror = function () { console.error('[SClass] Failed to load EmailJS SDK'); };
    document.head.appendChild(s);
  }

  window.SClass = {
    get user() { return getUser(); },
    startTime: startTime,
    logs: logs,

    /**
     * Log an activity.
     * @param {string} type  - 'word', 'quiz', 'grammar', 'spelling', 'listening', 'reading', 'lookup', etc.
     * @param {string} item  - The word, question, or content identifier
     * @param {string} result - 'correct', 'wrong', 'pass', 'skip', 'score:85', etc.
     * @param {string} [details] - Optional extra detail (user answer, correct answer, etc.)
     */
    log: function (type, item, result, details) {
      logs.push({
        type: type || '',
        item: item || '',
        result: result || '',
        details: details || '',
        time: new Date()
      });
    },

    logError: function (question, userAnswer, correctAnswer) {
      logs.push({
        type: 'quiz',
        item: question,
        result: 'wrong',
        details: 'Answer: ' + userAnswer + ' | Correct: ' + correctAnswer,
        time: new Date()
      });
    },

    logWord: function (word, action, detail) {
      logs.push({
        type: action || 'word',
        item: word,
        result: detail || '',
        details: '',
        time: new Date()
      });
    },

    /**
     * Send a report via EmailJS.
     * @param {Object} opts
     * @param {string} opts.contentName - e.g. 'PET Unit 36 - Vocabulary'
     * @param {number} [opts.score]     - numeric score
     * @param {number} [opts.total]     - total possible
     * @param {string} [opts.extraHtml] - additional HTML to append to report
     */
    sendReport: function (opts) {
      if (reportSent) { console.log('[SClass] Report already sent.'); return Promise.resolve(); }
      opts = opts || {};

      var endTime = new Date();
      var durationMs = endTime - startTime;
      var studentName = getUser() || 'Unknown';
      var contentName = opts.contentName || document.title || 'Unknown';
      var score = (opts.score !== undefined && opts.score !== null) ? String(opts.score) : '-';
      var total = (opts.total !== undefined && opts.total !== null) ? String(opts.total) : '-';
      var accuracy = '-';
      if (opts.score !== undefined && opts.total && opts.total > 0) {
        accuracy = Math.round((opts.score / opts.total) * 100) + '%';
      }

      var detailsHtml = buildDetailsHtml();
      if (opts.extraHtml) detailsHtml += opts.extraHtml;

      var templateParams = {
        student_name: studentName,
        content_name: contentName,
        page_url: location.href,
        start_time: formatDateTime(startTime),
        end_time: formatDateTime(endTime),
        duration: formatDuration(durationMs),
        score: score,
        total: total,
        accuracy: accuracy,
        details_html: detailsHtml
      };

      reportSent = true;

      return new Promise(function (resolve) {
        ensureEmailJS(function () {
          try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { /* already init */ }
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TRACKER_TEMPLATE, templateParams)
            .then(function () {
              console.log('[SClass] Report sent successfully.');
              resolve(true);
            }, function (err) {
              console.error('[SClass] Report send failed:', err);
              reportSent = false;
              resolve(false);
            });
        });
      });
    },

    reset: function () {
      logs.length = 0;
      startTime = new Date();
      reportSent = false;
    }
  };
})();
