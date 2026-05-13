/**
 * Lesson 10 Page 3 — 不规则动词表导出 PDF（打印另存为）
 * 每词：中文完整场景 + 一般过去时（闭合过去时间）+ 现在完成时（与现在相连 / 经历至今）
 */
(function (global) {
  "use strict";

  global.VERB_PDF_DATA = [
    { b: "be", p: "was / were", pp: "been", zh: "回忆上周五晚「人在不在」；再谈从开学到现在「一直忙」的状态。", s: "A: Were you at the English corner last Friday at 7 p.m.? B: Yes, I was there, but I left early at eight.", x: "A: You look exhausted. B: I have been swamped with club work since the term began, so I still feel tired now." },
    { b: "do", p: "did", pp: "done", zh: "同桌问「昨晚那一晚」有没有写完；再问「从周一到现在」是否已搞定。", s: "A: Did you do the chemistry lab report last night? B: Yes, I did it before I went to bed.", x: "A: Can we hand in the report today? B: Relax—I have already done every graph this morning, and Ms Wang has not asked for it yet." },
    { b: "go", p: "went", pp: "gone", zh: "聊「上个假期去了哪」；再问「人现在是否还在外地」。", s: "A: Where did you go during the winter holiday two years ago? B: I went to Harbin with my parents.", x: "A: Is Uncle Wang still in Shenzhen? B: Yes, he has gone there on business, and he has not come back this week." },
    { b: "see", p: "saw", pp: "seen", zh: "说「上周那场电影那一次」；再说「到目前为止看过几遍」。", s: "A: Did you see the new sci-fi movie last Saturday? B: Yes, I saw it with my cousin in the evening.", x: "A: Is the film worth watching again? B: I have seen it twice already, and I still want to buy the novel." },
    { b: "give", p: "gave", pp: "given", zh: "班长回忆「运动会那天谁发的」号码布；再说「本学期帮了多少次」。", s: "A: Who gave us the running numbers on Sports Day last month? B: The PE teacher gave them to us before the race.", x: "A: Why do you trust Lin so much? B: She has given me honest advice many times this term, so I listen to her." },
    { b: "take", p: "took", pp: "taken", zh: "爸爸「今早那一次」送校；妈妈统计「今天一共拍了多少张」活动照。", s: "A: How did you get to school this morning? B: Dad took me in the car because it was raining hard at seven.", x: "A: Your album looks great. B: Dad has taken over fifty photos today, and he has not uploaded them yet." },
    { b: "make", p: "made", pp: "made", zh: "手工课「昨天那节课」成果；谈「从月考后到现在」进步。", s: "A: What did you make in yesterday's craft lesson? B: We made a paper bridge, and it broke in the test.", x: "A: Your pronunciation sounds confident. B: I have made steady progress since the mock exam, and I still practise every day." },
    { b: "come", p: "came", pp: "come", zh: "聚会「那晚谁迟到」；亲戚「是否已经到」国内。", s: "A: Why was the party noisy last night? B: My cousin came two hours late, so everyone was waiting.", x: "A: Has Aunt Li arrived from Canada? B: Yes, she has come back this week, but she has not visited us yet." },
    { b: "run", p: "ran", pp: "run", zh: "体育课「昨天跑了几圈」；晨练「这周是否坚持」。", s: "A: How many laps did you run in PE yesterday? B: I ran five laps, and I felt dizzy afterwards.", x: "A: You look fit. B: I have run every morning this week, and I have not skipped a day so far." },
    { b: "eat", p: "ate", pp: "eaten", zh: "食堂「午饭那一顿」；讨论「从早上到现在吃了啥」是否健康。", s: "A: What did you eat for lunch at the cafeteria yesterday? B: I ate fried rice and a pear.", x: "A: You still look hungry. B: I have only eaten an apple since breakfast, so I need a snack before training." },
    { b: "read", p: "read", pp: "read (same spelling)", zh: "图书馆「昨晚借的那本」读了几页；报告「这周已经读了多少章」。", s: "A: How much did you read of Treasure Island last night? B: I read two chapters before I fell asleep.", x: "A: Are you ready for the book report? B: I have read eight chapters so far, but I have not finished the ending yet." },
    { b: "write", p: "wrote", pp: "written", zh: "笔友「上周回信那一次」；邮箱「今天已经写了几封」。", s: "A: When did you last write to your pen pal? B: I wrote a long letter last Sunday afternoon.", x: "A: Any news from the exchange school? B: I have written three emails this week, and I have not received a reply yet." },
    { b: "speak", p: "spoke", pp: "spoken", zh: "演讲比赛「当时说了啥语言」；主任「是否已经谈过话」。", s: "A: How did you perform in the speech contest last term? B: I spoke English for three minutes without notes.", x: "A: Has the head teacher spoken to you about the poster? B: Yes, she has spoken to me twice already, and I have fixed the mistakes." },
    { b: "break", p: "broke", pp: "broken", zh: "篮球赛「那次摔断」眼镜；朋友「是否又一次食言」。", s: "A: Why did you wear old glasses last Friday? B: I broke the new pair during basketball practice that afternoon.", x: "A: Can we trust Tom's promise? B: He has broken three small promises this month, so I am still angry with him." },
    { b: "choose", p: "chose", pp: "chosen", zh: "分组「上周选了哪组」；反思「是否总选同一话题」。", s: "A: Which group did you choose for the project last week? B: We chose Group C because we liked the topic.", x: "A: Your PPT looks familiar. B: We have chosen similar titles twice already, so the teacher has asked us to change it." },
    { b: "forget", p: "forgot", pp: "forgotten", zh: "今早出门「那一刻忘了啥」；室友抱怨「第几次忘带钥匙」。", s: "A: Why were you late this morning? B: I forgot my student card at home, so the guard stopped me for five minutes.", x: "A: You knocked again—seriously? B: Sorry, I have forgotten my keys again this week, and my mum has not copied a spare key yet." },
    { b: "get", p: "got", pp: "got / gotten (Am.)", zh: "「中午那条消息」何时收到；统计「这周已收几封」邮件。", s: "A: When did you receive the notice about the trip? B: I got the message at noon yesterday on my phone.", x: "A: Any updates from the coach? B: I have got four messages this week, but I have not replied to the last one yet." },
    { b: "know", p: "knew", pp: "known", zh: "考完试「当时知不知道答案」；介绍「认识多久」。", s: "A: Did you know the last question on yesterday's test? B: No, I did not know it until the teacher explained it.", x: "A: You two finish each other's sentences. B: We have known each other since Grade Six, so we have shared many secrets." },
    { b: "think", p: "thought", pp: "thought", zh: "争论「昨天谁以为简单」；表态「已经考虑清楚」。", s: "A: You looked confident before the exam yesterday. B: I thought it was easy, but the reading part was hard.", x: "A: Will you join the debate team? B: I have thought about it for a week, and I still want to try, but I have not signed up yet." },
    { b: "buy", p: "bought", pp: "bought", zh: "妈妈「昨天菜场买了啥」；吐槽「这个月又买多少零食」。", s: "A: What did your mum buy at the market yesterday? B: She bought fish, tofu, and a big bag of oranges.", x: "A: Our cupboard is full of chips. B: Mum has bought too many snacks again this month, and Dad has not stopped her yet." },
    { b: "bring", p: "brought", pp: "brought", zh: "野餐「那天谁带了饮料」；图书角「是否已经搬完书」。", s: "A: Who brought the juice to the picnic last Sunday? B: Lily brought two bottles, and Tom brought sandwiches.", x: "A: Is the reading corner ready? B: We have brought all the donated books from the library, but we have not labelled them yet." },
    { b: "teach", p: "taught", pp: "taught", zh: "回忆「上学期教了哪一单元」；介绍「老师在此任教多久」。", s: "A: Which unit did Mr Li teach you last term? B: He taught us Unit 8 about festivals.", x: "A: Is Mr Li new here? B: No, he has taught in this school for ten years, and he has won many prizes already." },
    { b: "catch", p: "caught", pp: "caught", zh: "院子里「猫昨天抓到啥」；新闻「小偷是否落网」。", s: "A: Why was the cat proud yesterday? B: It caught a mouse in the yard in the afternoon.", x: "A: Is the bike thief still free? B: No, the police have caught him at last, and they have not told us the details yet." },
    { b: "build", p: "built", pp: "built", zh: "「去年竣工」的那座桥；这一带「至今盖了几栋」。", s: "A: When did workers finish the new footbridge? B: They built it last year before the flood season.", x: "A: This block looks new. B: Workers have built three small blocks here since 2022, and they have not started the park yet." },
    { b: "send", p: "sent", pp: "sent", zh: "「昨天下午」发邮件；确认「文件是否都已发出」。", s: "A: Did you email the files yesterday afternoon? B: Yes, I sent them at four o'clock before I left school.", x: "A: Has the monitor received our video? B: I have sent all the clips to her inbox this morning, but she has not downloaded them yet." },
    { b: "spend", p: "spent", pp: "spent", zh: "问「昨天午饭花了多少」；抱怨「本月零花钱是否已花光」。", s: "A: How much did you spend on lunch yesterday? B: I spent forty yuan because I ordered an extra drink.", x: "A: Can you lend me ten yuan? B: Sorry, I have spent all my pocket money this month, and my parents have not given me more yet." },
    { b: "sit", p: "sat", pp: "sat", zh: "「那节课」坐哪；等公交「从八点坐到现在」。", s: "A: Where did you sit in yesterday's English class? B: I sat near the window so I could see the board clearly.", x: "A: You look stiff. B: I have sat on this bench since eight o'clock, and the bus has not come yet." },
    { b: "stand", p: "stood", pp: "stood", zh: "「提问那一刻」站起来；排队「已经站了多久」。", s: "A: Why did you stand up suddenly in class? B: I stood up to answer the teacher's question.", x: "A: You look tired in this queue. B: I have stood here for forty minutes, and the ticket window has not opened yet." },
    { b: "understand", p: "understood", pp: "understood", zh: "讲解前「懂不懂」；讲解后「现在是否全懂」。", s: "A: Did you understand the grammar rule before Ms Chen explained it? B: No, I did not understand it until she drew the timeline.", x: "A: Can you explain the exercise to me? B: Yes, I have understood every sentence on this page, and I have not found a trap yet." },
    { b: "find", p: "found", pp: "found", zh: "「钥匙昨天在哪找到」；改作文「已经找出几处错」。", s: "A: Where did you find your keys yesterday? B: I found them under the chair after I cleaned the room.", x: "A: Is the draft OK now? B: I have found many spelling mistakes so far, but I have not fixed the last paragraph yet." },
    { b: "have", p: "had", pp: "had", zh: "「上周那次」感冒；今天「到目前为止喝了几碗粥」。", s: "A: Why were you absent last week? B: I had a bad cold, so I stayed in bed for three days.", x: "A: You look stronger today. B: I have had two bowls of porridge this morning, and the nurse has not taken my temperature yet." },
    { b: "hear", p: "heard", pp: "heard", zh: "「昨晚怪声」听见没；春游「有没有听到任何消息」。", s: "A: Did you hear that strange noise last night? B: Yes, I heard it twice, but I was too scared to check.", x: "A: When do we leave for the spring outing? B: I have heard nothing official yet, and the class monitor has not announced the time." },
    { b: "tell", p: "told", pp: "told", zh: "「昨晚爸爸」讲故事；爸爸「已经叮嘱几遍」早睡。", s: "A: What did your dad do before bed yesterday? B: He told me a funny story about his school days.", x: "A: Why are you off the phone so early? B: Dad has told me not to stay up late again this week, and I have listened—so far." },
    { b: "sell", p: "sold", pp: "sold", zh: "促销「那天卖了多少票」；演唱会「是否售罄」。", s: "A: How many tickets did the shop sell on the first day of the sale? B: It sold more than a hundred tickets in the morning.", x: "A: Can we still buy concert tickets? B: The shop has sold out of them already, and it has not received a new batch yet." },
    { b: "say", p: "said", pp: "said", zh: "「今早打招呼」；道歉「已经说了几次对不起」。", s: "A: Did you meet Lily this morning? B: Yes, she said hello to me at the school gate.", x: "A: Is she still angry? B: I have said sorry twice already, but she has not answered my message yet." },
    { b: "pay", p: "paid", pp: "paid", zh: "「昨天杂志付了多少钱」；账单「是否都已付清」。", s: "A: How much did you pay for the magazine yesterday? B: I paid thirty yuan because it included a poster.", x: "A: Can we watch the paid channel? B: Dad has paid all the bills online this month, but he has not told us the password yet." },
    { b: "meet", p: "met", pp: "met", zh: "「七点那次」在校门口见；「这个月见过几次」。", s: "A: Where did you meet your coach last Monday? B: We met at the school gate at seven exactly.", x: "A: You two look close. B: We have met several times this month for training, but we have not exchanged phone numbers yet." },
    { b: "leave", p: "left", pp: "left", zh: "「五点放学」离开；抱怨「老师又留了多少作业」至今。", s: "A: What time did you leave school last Friday? B: We left at five because the club meeting ended early.", x: "A: Why are you still writing at nine? B: The teachers have left too much homework again this week, and I have not finished maths yet." },
    { b: "sleep", p: "slept", pp: "slept", zh: "「昨晚宝宝」睡得好不好；「今天白天」睡了多久。", s: "A: Did the baby cry last night? B: No, the baby slept well until six in the morning.", x: "A: The baby looks cranky. B: She has slept only three hours today, and she has not napped since lunch." },
    { b: "keep", p: "kept", pp: "kept", zh: "「昨天关窗」保持关闭；日记「坚持写了多久」。", s: "A: Why was the classroom cool yesterday? B: I kept the window closed because the wind was strong.", x: "A: Your handwriting is neat. B: I have kept this English diary for two years, and I have not missed a week yet." },
    { b: "mean", p: "meant", pp: "meant", zh: "举手「当时想表达啥」；心愿「一直想去做」。", s: "A: Why did the coach raise his hand during the drill? B: He meant \"stop\" because someone was hurt.", x: "A: Will you visit your grandparents in the village? B: I have always meant to go with my parents, but we have not found time yet." },
    { b: "lend", p: "lent", pp: "lent", zh: "「昨天借字典」；本学期「借过几次钱」玩笑。", s: "A: How did you finish the translation yesterday? B: Ann lent me her dictionary after class.", x: "A: You still owe me milk tea. B: True—she has lent me money twice this term, and I have not paid her back yet." },
    { b: "win", p: "won", pp: "won", zh: "「上周五那场球」赢没；赛季「至今全胜吗」。", s: "A: Did our school team win the match last Friday? B: Yes, we won by two goals in the rain.", x: "A: Our banner looks new. B: We have won every game this season so far, and we have not lost a single match yet." },
    { b: "lose", p: "lost", pp: "lost", zh: "「公交车上」丢卡；今年「丢过几次钥匙」自嘲。", s: "A: Why did you borrow my card yesterday? B: I lost my student card on the bus in the morning.", x: "A: Be careful with the new key. B: I have lost my keys only once this year, and I have not told my parents yet." },
    { b: "feel", p: "felt", pp: "felt", zh: "「演讲前那一刻」紧张；吃药后「现在感觉好些没」。", s: "A: How did you feel before the speech yesterday? B: I felt nervous, and my hands shook for the first minute.", x: "A: You look brighter today. B: I have felt much better since I took the medicine, and I have not had a fever this afternoon." },
    { b: "swim", p: "swam", pp: "swum", zh: "「去年暑假」在池里游；训练「今天已经游了几圈」。", s: "A: Where did you swim last summer? B: We swam in the city pool every weekend in July.", x: "A: Ready for the relay? B: We have swum ten warm-up laps already, and the coach has not blown the whistle yet." },
    { b: "drink", p: "drank", pp: "drunk", zh: "「今早喝牛奶」；健康「今天可乐喝太多没」。", s: "A: What did you drink before school this morning? B: I drank milk and a cup of soy milk at home.", x: "A: Your face is red. B: I have drunk too much cola today, and Mum has not noticed the empty cans yet." },
    { b: "sing", p: "sang", pp: "sung", zh: "「派对那晚」唱了什么；合唱团「加入多久」。", s: "A: What did you sing at the birthday party last night? B: I sang an English song and a chorus with friends.", x: "A: Your voice is confident now. B: I have sung in the school choir for a year, and I have not missed a rehearsal yet." },
    { b: "ring", p: "rang", pp: "rung", zh: "「半夜电话」响没；刚才「五分钟响几次」烦人。", s: "A: Did the phone wake you at midnight? B: Yes, it rang twice, but it was a wrong number.", x: "A: Why do you look annoyed? B: The phone has rung three times in five minutes, and nobody has answered it yet." },
    { b: "begin", p: "began", pp: "begun", zh: "「那节课」迟到开始；电影「是否已经开场」。", s: "A: Why did we miss the first part of the lecture? B: Class began ten minutes late because the projector broke.", x: "A: Can we still enter Cinema 3? B: The film has begun already, so please be quiet—we have not found our seats yet." },
    { b: "drive", p: "drove", pp: "driven", zh: "「今早」谁开车送站；爸爸「今天累计开了多远」。", s: "A: How did you get to the station on time this morning? B: Dad drove me through the new tunnel before rush hour.", x: "A: Dad looks tired tonight. B: He has driven over a hundred kilometres today, and he has not rested yet." },
    { b: "ride", p: "rode", pp: "ridden", zh: "「昨天」骑车去图书馆；人生「是否骑过马」经历。", s: "A: How did you carry those heavy books yesterday? B: I rode a bike to the library and used a basket.", x: "A: Would you like to try the horse camp? B: I have never ridden a horse before, so I have not signed the form yet." },
    { b: "wear", p: "wore", pp: "worn", zh: "「昨天」穿什么外套；「这周每天」同一顶帽子。", s: "A: Why did people stare at you yesterday? B: I wore a bright red jacket because it was photo day.", x: "A: Is that hat your favourite? B: I have worn the same hat every day this week, and my friends have laughed—but I like it." },
    { b: "throw", p: "threw", pp: "thrown", zh: "「传球那一刻」；扔垃圾「是否已经扔完」。", s: "A: How did you score the goal yesterday? B: Tom threw the ball to me, and I shot quickly.", x: "A: Where are the ads? B: I have thrown away all the junk mail this morning, but I have not checked the mailbox again yet." },
    { b: "fly", p: "flew", pp: "flown", zh: "「深秋」候鸟南飞；航班「是否已飞过海面」。", s: "A: Where did the wild geese go last autumn? B: They flew south when the weather turned cold in October.", x: "A: Is the flight smooth? B: The plane has flown over the sea safely, and we have not felt strong bumps yet." },
    { b: "draw", p: "drew", pp: "drawn", zh: "「美术课那次」画熊猫；「给孩子们」画过多少漫画。", s: "A: What did you draw in art class last week? B: I drew a panda family with bamboo in ink.", x: "A: Your sketchbook is thick. B: The artist has drawn many comics for kids this year, and she has not sold them online yet." },
    { b: "grow", p: "grew", pp: "grown", zh: "「夏天」植物长得快；竹子「今年长高了多少」。", s: "A: Why did the garden look messy last summer? B: The plants grew fast because it rained every day.", x: "A: The bamboo looks tall. B: It has grown very tall this year, and Grandpa has not trimmed it yet." },
    { b: "fall", p: "fell", pp: "fallen", zh: "「昨夜下雪」安静落下；物价「本月是否又跌」新闻。", s: "A: Did you hear the snow last night? B: Yes, snow fell quietly after midnight, and the streets were white.", x: "A: Is rent cheaper now? B: Prices have fallen again this month, but we have not signed a new contract yet." },
    { b: "show", p: "showed", pp: "shown / showed", zh: "「地理课那次」展示地图；视频「老师已经放几遍」。", s: "A: What did the teacher show you in geography class yesterday? B: She showed us a big map of Europe on the screen.", x: "A: Do we need to watch it again? B: She has shown this video twice already, and we have not taken notes on the last part yet." }
  ];

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  global.exportVerbPdfPrint = function () {
    var rows = global.VERB_PDF_DATA;
    if (!rows || !rows.length) {
      alert("动词数据未加载，请检查 l10-verb-pdf.js 是否已引入。");
      return;
    }
    var now = new Date();
    var dateStr =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0");
    var title = "Lesson 10 · 不规则动词表（与 Page 2 衔接）";
    var sub =
      "一般过去时 = 动作发生在「已结束的过去时间」；现在完成时 = 与「现在」仍有关联（经历 / 结果 / 从过去持续到现在）。共 " +
      rows.length +
      " 词 · " +
      dateStr;

    var thead =
      "<tr>" +
      '<th class="c0">原形</th>' +
      '<th class="c1">过去式</th>' +
      '<th class="c2">过去分词</th>' +
      '<th class="c3 zh">场景（中文）</th>' +
      '<th class="c4 past">一般过去时（对话 · 闭合时间）</th>' +
      '<th class="c5 perf">现在完成时（对话 · 与现在相连）</th>' +
      "</tr>";

    var tbody = rows
      .map(function (r, i) {
        return (
          '<tr class="' +
          (i % 2 === 0 ? "ze" : "zo") +
          '">' +
          "<td><strong>" +
          esc(r.b) +
          "</strong></td>" +
          "<td>" +
          esc(r.p) +
          "</td>" +
          "<td>" +
          esc(r.pp) +
          "</td>" +
          '<td class="zh">' +
          esc(r.zh) +
          "</td>" +
          '<td class="ex past">' +
          esc(r.s) +
          "</td>" +
          '<td class="ex perf">' +
          esc(r.x) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    var html =
      "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"UTF-8\"/><title>" +
      esc(title) +
      "</title>" +
      "<style>" +
      "@page { size: A4 landscape; margin: 8mm; }" +
      "* { box-sizing: border-box; }" +
      "body { margin: 0; padding: 12px 14px 20px; font-family: 'Microsoft YaHei','PingFang SC','Segoe UI',sans-serif; color: #1a2332; background: #eef2f7; }" +
      ".banner { border-radius: 14px; padding: 16px 20px; margin-bottom: 12px; background: linear-gradient(120deg,#1e6b8c 0%,#2a9d8f 42%,#e76f51 100%); color: #fff; box-shadow: 0 8px 24px rgba(26,35,50,0.18); }" +
      ".banner h1 { margin: 0 0 6px; font-size: 1.22rem; letter-spacing: 0.02em; }" +
      ".banner p { margin: 0; opacity: 0.95; font-size: 0.82rem; line-height: 1.45; }" +
      ".hint { font-size: 0.74rem; color: #5a6a7e; margin: 0 0 10px; padding: 8px 12px; background: #fffdf5; border-left: 4px solid #ffb703; border-radius: 8px; line-height: 1.5; }" +
      "table { width: 100%; border-collapse: collapse; font-size: 7.6pt; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(26,35,50,0.08); table-layout: fixed; }" +
      "thead th { padding: 8px 5px; text-align: left; font-weight: 700; color: #fff; border: 1px solid rgba(255,255,255,0.25); vertical-align: top; line-height: 1.35; }" +
      "thead .c0 { background: linear-gradient(135deg,#155a78,#1e6b8c); width: 5.5%; }" +
      "thead .c1 { background: linear-gradient(135deg,#0d5c63,#1f8a7a); width: 8%; }" +
      "thead .c2 { background: linear-gradient(135deg,#6a4c93,#8e6db3); width: 9%; }" +
      "thead .c3.zh { background: linear-gradient(135deg,#b45309,#e76f51); width: 16%; color: #fff; }" +
      "thead .c4.past { background: linear-gradient(135deg,#9a3412,#c2410c); width: 29%; }" +
      "thead .c5.perf { background: linear-gradient(135deg,#0c4a6e,#0369a1); width: 32.5%; }" +
      "tbody td { padding: 6px 5px; border: 1px solid #e2e8f0; vertical-align: top; line-height: 1.42; word-wrap: break-word; }" +
      "tbody tr.ze { background: #fafcff; }" +
      "tbody tr.zo { background: #f0fdf9; }" +
      "tbody td.zh { color: #0f172a; font-size: 7.8pt; background: #fff8f0; }" +
      "tbody td.ex { font-family: 'Segoe UI','Cambria',serif; color: #334155; font-size: 7.5pt; }" +
      "tbody td.ex.past { border-left: 3px solid #ea580c; }" +
      "tbody td.ex.perf { border-left: 3px solid #0284c7; }" +
      ".foot { margin-top: 10px; font-size: 0.7rem; color: #64748b; text-align: center; line-height: 1.4; }" +
      "@media print { body { background: #fff; padding: 0; } .banner,thead th,tbody tr.ze,tbody tr.zo,tbody td.zh { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }" +
      "</style></head><body>" +
      '<div class="banner"><h1>' +
      esc(title) +
      "</h1><p>" +
      esc(sub) +
      "</p></div>" +
      '<p class="hint">打印 → <strong>另存为 PDF</strong>。建议勾选「背景图形」。左列中文先交代<strong>完整语境</strong>；英例中<strong>一般过去时常带 last / yesterday / ago / in 2022</strong> 等闭合时间；<strong>现在完成时常带 since / for / already / yet / this week / so far</strong> 等与「此刻」挂钩的表达。</p>' +
      "<table><thead>" +
      thead +
      "</thead><tbody>" +
      tbody +
      "</tbody></table>" +
      '<p class="foot">L10-02-present-perfect-form · 过去时 vs 现在完成时 · 课堂讲义 PDF</p>' +
      "</body></html>";

    var w = global.open("", "_blank");
    if (!w) {
      alert("无法打开新窗口，请允许弹出窗口后重试。");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.onload = function () {
      try {
        w.focus();
        w.print();
      } catch (e) {}
    };
  };
})(typeof window !== "undefined" ? window : this);
