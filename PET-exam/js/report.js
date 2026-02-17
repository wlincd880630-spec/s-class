/**
 * js/report.js - 统一使用 SClass.sendReport (template_zso8ebh)
 */
const Report = {
    submitExam: async function(testName, score, total, wrongList, timeStr) {
        if (typeof SClass === 'undefined') {
            console.warn('SClass 未加载，无法发送报告');
            alert('报告发送失败，请刷新页面后重试。');
            return;
        }

        var studentName = (typeof Auth !== 'undefined' && Auth.currentUser) ? Auth.currentUser : (localStorage.getItem('current-user') || localStorage.getItem('authing-user') || '匿名考生');

        wrongList.forEach(function(item) {
            SClass.logError(item.title || ('Q' + item.id), item.user || '', item.correct || '');
        });

        var wrongDetailsHtml = '';
        if (wrongList.length > 0) {
            wrongDetailsHtml = '<p><b>错题明细：</b></p><ul style="margin:0;padding-left:20px;">';
            wrongList.forEach(function(item) {
                wrongDetailsHtml += '<li>Q' + item.id + ': 你的答案「' + (item.user || '') + '」 / 正确答案「' + (item.correct || '') + '」</li>';
            });
            wrongDetailsHtml += '</ul>';
        } else {
            wrongDetailsHtml = '<p>本次考试全对。</p>';
        }

        var pageLabel = 'PET ' + testName;
        SClass.sendReport({
            contentName: testName,
            page_label: pageLabel,
            score: score,
            total: total,
            extraHtml: '<p><b>用时：</b>' + (timeStr || '') + '</p>' + wrongDetailsHtml
        }).then(function(ok) {
            if (ok) console.log('报告已发送');
        });
    }
};
