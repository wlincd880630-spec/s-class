/**
 * js/ai-hub.js - S-Class 旗舰版 v3.1 (防卡死增强版)
 */
const AIConfig = {
    key: "sk-daa16008e81843deba6fefe9dce51465", 
    endpoint: "https://api.deepseek.com/v1/chat/completions",
    model: "deepseek-chat"
};

const AIHub = {
    async callDeepSeek(systemPrompt, userPrompt) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时

        try {
            const res = await fetch(AIConfig.endpoint, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${AIConfig.key}` 
                },
                body: JSON.stringify({
                    model: AIConfig.model,
                    messages: [
                        {role: "system", content: systemPrompt},
                        {role: "user", content: userPrompt}
                    ],
                    temperature: 0.7
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                console.error("AI Error:", errData);
                throw new Error(errData.error?.message || `HTTP Error ${res.status}`);
            }

            const d = await res.json();
            if (!d.choices || d.choices.length === 0) throw new Error("AI 返回内容为空");
            
            return d.choices[0].message.content.trim().replace(/\n/g, "<br>");

        } catch(e) {
            clearTimeout(timeoutId);
            console.error("AIHub Exception:", e);
            if (e.name === 'AbortError') return "<span style='color:red'>⚠️ 请求超时，请检查网络。</span>";
            return `<span style='color:red'>⚠️ AI 服务异常: ${e.message.substring(0, 50)}...</span>`;
        }
    },

    async expandVocabulary(text) {
        // 智能判断：长难句走翻译，单词走查词
        const isSentence = text.trim().split(/\s+/).length > 3;
        
        if (isSentence) {
            return this.callDeepSeek(
                "你是一个精通中英互译的翻译家。请将用户提供的英文句子翻译成地道、优雅的中文。只输出翻译结果，不要任何废话。",
                `请翻译: "${text.replace(/["']/g, "")}"`
            );
        } else {
            return this.callDeepSeek(
                "你是一个英语助教。请解释该单词(中文含义)，给出音标，并提供一个PET水平的例句。格式：<b>含义</b>...<br><b>例句</b>...",
                `解释单词: "${text.replace(/[^a-zA-Z\s]/g, "")}"` // 过滤特殊字符
            );
        }
    },

    async evaluateTranslation(original, student) {
        return this.callDeepSeek(
            "你是一个面对小初高的英文教师及翻译理解考官。请给学生的【口译】打分(1-10)，并简短点评翻译的准确度，忽略人称代词和姓名、地点的翻译，着重看学生是否理解整体内容， 如有不理解的地方你需要教学生理解，并给出准确翻译样本。格式：分数 - 点评 - 样本翻译",
            `原句: "${original}"\n学生口译: "${student}"`
        );
    },

    async generateReportComment(score, total) {
        return this.callDeepSeek("你是一个幽默的老师。给出一句简短鼓励。", `得分: ${score}/${total}`);
    },

    async analyzeStudyBehavior(logs) {
        if (logs.vocab.length === 0 && logs.trans.length === 0) return "<i>您还没有进行足够的深度学习活动（查词或翻译），无法生成报告。</i>";
        
        const prompt = `
            学生完成了 PET 阅读复习。数据如下：
            1. 查词: ${logs.vocab.join(", ") || "无"}
            2. 朗读: ${logs.tts.length} 句
            3. 翻译: ${logs.trans.map(t=>t.student).join("; ") || "无"}
            
            请生成一份《深度学习诊断书》(HTML格式)，包含词汇盲区分析、语法建议和下一步计划。
        `;
        return this.callDeepSeek("你是一个资深英语教育专家。", prompt);
    }
};