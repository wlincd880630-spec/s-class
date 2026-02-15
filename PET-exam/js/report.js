/**
 * js/report.js - 智能名字抓取版
 */
const Report = {
    serviceID: "service_6dfbs2n",
    templateID: "template_29lkfcs",
    publicKey: "1QhXV5G_92GdK7_DF", 

    submitExam: async function(testName, score, total, wrongList, timeStr) {
        // 🔥 核心修复：双重保险获取姓名
        let studentName = "匿名考生";
        
        // 1. 尝试从 Auth 对象获取
        if (typeof Auth !== 'undefined' && Auth.currentUser) {
            studentName = Auth.currentUser;
        } 
        // 2. 如果失败，直接查 LocalStorage (兜底)
        else {
            studentName = localStorage.getItem('current-user') || "匿名考生";
        }

        let wrongDetailsText = "";
        if (wrongList.length === 0) {
            wrongDetailsText = "🎉 太棒了！本次考试全对！(Perfect Score)";
        } else {
            wrongDetailsText = wrongList.map(item => {
                let str = `❌ [Q${item.id}] ${item.title}`;
                if (item.isChoice) {
                    const userText = item.userDesc ? ` (${item.userDesc})` : "";
                    const correctText = item.correctDesc ? ` (${item.correctDesc})` : "";
                    str += `\n   您的选择: ${item.user}${userText}`;
                    str += `\n   正确答案: ${item.correct}${correctText}`;
                } else {
                    str += `\n   您的答案: ${item.user}`;
                    str += `\n   正确答案: ${item.correct}`;
                }
                return str;
            }).join('\n\n------------------------\n\n');
        }

        const emailParams = {
            student_name: studentName, // ✅ 这里现在肯定是登录名了
            test_id: testName,
            score: `${score} / ${total}`,
            time_spent: timeStr,
            wrong_answers: wrongDetailsText,
            exam_date: new Date().toLocaleString('zh-CN', { hour12: false })
        };

        console.log("正在发送成绩单...", emailParams);
        
        try {
            const response = await emailjs.send(this.serviceID, this.templateID, emailParams, this.publicKey);
            console.log("✅ 邮件发送成功!", response.status, response.text);
            return response;
        } catch (error) {
            console.error("❌ 邮件发送失败:", error);
            alert("成绩单发送失败，请检查网络连接。");
            throw error;
        }
    }
};