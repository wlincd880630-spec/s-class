/**
 * Lesson 14 · 被动语态 · 扩充语料库 v3.2
 * 教材：人教九年级 Unit 5～7、13 + 成都中考改编
 * 原则：主题轮转 · 四层难度 · 各页独立测验池 · 茶叶/拉链仅作锚点
 */
(function (global) {
  "use strict";

  var VERSION = "3.2";

  var BANK = {
    unit5: [
      { en: "Sky lanterns are made of bamboo and covered with paper.", zh: "天灯由竹子和纸制成。", tag: "Unit 5 · 工艺" },
      { en: "Paper is folded before it is cut with scissors.", zh: "纸先折好再被剪。", tag: "Unit 5 · 工序" },
      { en: "Clay is shaped by hand and fired at high heat.", zh: "泥塑被手工塑形后烧制。", tag: "Unit 5" },
      { en: "This ring is made of silver and was made in Thailand.", zh: "银戒在泰国制造。", tag: "Unit 5" },
      { en: "Mobile phones are made in factories.", zh: "手机在工厂制造。", tag: "Unit 5 · 科技" },
      { en: "Kites are made by hand in Weifang.", zh: "潍坊风筝手工制作。", tag: "Unit 5" },
      { en: "The model plane is made of used wood and glass.", zh: "模型飞机由旧木玻璃制成。", tag: "Unit 5" },
      { en: "Wine is produced from grapes.", zh: "葡萄酒由葡萄酿造。", tag: "Unit 5 · from" },
      { en: "Silk scarves are woven by skilled workers.", zh: "丝巾由熟练工人织造。", tag: "Unit 5 · 拓展" },
      { en: "Tea leaves are picked by hand on the mountains.", zh: "茶叶在山坡被手工采摘。", tag: "Unit 5 · 锚点" }
    ],
    unit6: [
      { en: "The telephone was invented by Alexander Graham Bell in 1876.", zh: "电话 1876 年由贝尔发明。", tag: "Unit 6" },
      { en: "Potato chips were invented by mistake in 1853.", zh: "薯片 1853 年偶然发明。", tag: "Unit 6" },
      { en: "Basketball was invented by James Naismith in 1891.", zh: "篮球 1891 年由 Naismith 发明。", tag: "Unit 6" },
      { en: "Printing was invented in China.", zh: "印刷术在中国发明。", tag: "Unit 6" },
      { en: "The bridge was built last year.", zh: "桥去年建好。", tag: "Unit 6" },
      { en: "The zipper was invented by Whitcomb Judson in 1893.", zh: "拉链 1893 年由 Judson 发明。", tag: "Unit 6 · 锚点" },
      { en: "Tea was discovered by accident about 5,000 years ago.", zh: "茶约五千年前偶然发现。", tag: "Unit 6" },
      { en: "The compass was first used for travel.", zh: "指南针最早用于旅行。", tag: "Unit 6 · 拓展" },
      { en: "This special pen was invented by Liu Jie.", zh: "这支笔由刘杰发明。", tag: "Unit 6 · 写作" },
      { en: "English was spoken in many countries long ago.", zh: "很久以前多国说英语。", tag: "Unit 6 · 4c" }
    ],
    unit7: [
      { en: "Teenagers should be allowed to choose their own clothes.", zh: "青少年应被允许自选衣服。", tag: "Unit 7" },
      { en: "Sixteen-year-olds should not be allowed to drive.", zh: "十六岁不应被允许开车。", tag: "Unit 7" },
      { en: "We may be allowed to take photos in the museum.", zh: "博物馆里或许可拍照。", tag: "Unit 7" },
      { en: "Peter should be allowed to take the test later.", zh: "Peter 应被允许晚点考试。", tag: "Unit 7" },
      { en: "Students shouldn't be allowed to use phones in class.", zh: "课上不应允许用手机。", tag: "Unit 7 · 拓展" },
      { en: "Children shouldn't be allowed to stay up until midnight.", zh: "孩子不应被允许熬夜。", tag: "Unit 7" }
    ],
    unit13: [
      { en: "The air is badly polluted in big cities.", zh: "大城市空气被严重污染。", tag: "Unit 13" },
      { en: "Trees should be planted on hills.", zh: "山上应植树。", tag: "Unit 13" },
      { en: "Public transportation should be used more often.", zh: "应更多使用公共交通。", tag: "Unit 13" },
      { en: "Plastic bags should be banned in shops.", zh: "商店应禁用塑料袋。", tag: "Unit 13 · 拓展" },
      { en: "Sharks should be protected in the ocean.", zh: "海洋中应保护鲨鱼。", tag: "Unit 13 · 拓展" }
    ],
    exam: [
      { en: "His eyes may be hurt badly by the strong light.", zh: "眼睛可能被强光伤害。", tag: "2021成都" },
      { en: "Houses are made of wood in this village.", zh: "村里房屋由木头建成。", tag: "2021成都" },
      { en: "You aren't allowed to enter without a ticket.", zh: "无票不许入内。", tag: "2019成都" },
      { en: "Do to others what you wish to be done to you.", zh: "己所不欲勿施于人。", tag: "2020成都" },
      { en: "The report must be handed in before Friday.", zh: "报告必须在周五前上交。", tag: "中考拓展" }
    ],
    school: [
      { en: "Our classroom is cleaned every afternoon.", zh: "教室每天下午被打扫。", tag: "校园" },
      { en: "The school rules should be followed by everyone.", zh: "校规应被人人遵守。", tag: "校园" },
      { en: "The sports meeting was held last week.", zh: "运动会上周举行。", tag: "校园" },
      { en: "Late homework will not be accepted.", zh: "迟交作业将不被接受。", tag: "校园" }
    ],
    future: [
      { en: "The bridge will be built next year.", zh: "桥将于明年被建好。", tag: "将来·工程" },
      { en: "More trees will be planted next spring.", zh: "明年春天将种更多树。", tag: "将来·环保" },
      { en: "A new school will be opened in September.", zh: "九月将开办新学校。", tag: "将来·校园" },
      { en: "The work won't be finished today.", zh: "今天工作将做不完。", tag: "将来·否定" },
      { en: "Will the meeting be held on Friday?", zh: "会议周五举行吗？", tag: "将来·疑问" },
      { en: "When will the new museum be opened?", zh: "新博物馆何时开放？", tag: "将来·When" },
      { en: "Mobile phones will be made in smarter factories.", zh: "手机将在更智能的工厂制造。", tag: "将来·科技" },
      { en: "English will be spoken at the opening ceremony.", zh: "开幕式将说英语。", tag: "将来·活动" },
      { en: "Plastic bags will be banned in all shops.", zh: "所有商店将禁用塑料袋。", tag: "将来·政策" },
      { en: "The sports field will be used for the concert.", zh: "运动场将用于音乐会。", tag: "将来·用途" }
    ],
    perfect: [
      { en: "Homework has been finished.", zh: "作业已经被做完。", tag: "完成·作业" },
      { en: "The work has not been finished yet.", zh: "工作尚未完成。", tag: "完成·yet" },
      { en: "Has the classroom been cleaned yet?", zh: "教室打扫了吗？", tag: "完成·疑问" },
      { en: "Many trees have been planted this year.", zh: "今年已种许多树。", tag: "完成·环保" },
      { en: "The film has been seen before.", zh: "这部电影以前看过。", tag: "完成·经历" },
      { en: "English has been spoken here for years.", zh: "这里说英语多年了。", tag: "完成·持续" },
      { en: "The rules have been followed by everyone.", zh: "人人已遵守规则。", tag: "完成·校园" },
      { en: "The letter has already been sent.", zh: "信已经寄出。", tag: "完成·already" },
      { en: "The windows have been broken.", zh: "窗户已被打破。", tag: "完成·结果" },
      { en: "How many phones have been made this year?", zh: "今年制造了多少手机？", tag: "完成·How many" }
    ]
  };

  var CORPUS_TABLE = [
    ["Unit 5", "Sky lanterns are made of bamboo.", "手工艺·材质"],
    ["Unit 5", "Paper is folded before it is cut.", "工序被动链"],
    ["Unit 5", "Mobile phones are made in factories.", "科技制造"],
    ["Unit 6", "Potato chips were invented by mistake.", "偶然发明"],
    ["Unit 6", "The telephone was invented in 1876.", "发明史·年份"],
    ["Unit 6", "Basketball was invented by Naismith.", "人物+by"],
    ["Unit 6", "Printing was invented in China.", "地点 in"],
    ["Unit 7", "should be allowed to …", "情态被动"],
    ["Unit 7", "shouldn't be allowed to drive", "否定规则"],
    ["Unit 13", "is badly polluted", "环保报道"],
    ["Unit 13", "should be planted / used", "建议被动"],
    ["中考", "may be hurt by …", "情态+被动"],
    ["中考", "aren't allowed to enter", "禁止被动"],
    ["校园", "is cleaned / rules followed", "日常被动"],
    ["本课", "主动→被动四步", "宾语→主语·be+V3"],
    ["拓展", "will be + done", "一般将来被动"],
    ["拓展", "have/has been + done", "现在完成被动"]
  ];

  /** 分层 A：be / 语态形式判断（基础→进阶） */
  var TIER_A = [
    { zh: "工艺·复数", stem: "Sky lanterns ___ made of bamboo.", ans: "are", opts: ["are", "is", "was"], fb: "lanterns 复数 → are" },
    { zh: "发明·单数", stem: "The telephone ___ invented in 1876.", ans: "was", opts: ["was", "were", "is"], fb: "telephone 单数 → was" },
    { zh: "发明·复数", stem: "Potato chips ___ invented by mistake.", ans: "were", opts: ["was", "were", "are"], fb: "chips 复数 → were" },
    { zh: "工序·不可数", stem: "Paper ___ folded before it is cut.", ans: "is", opts: ["is", "are", "was"], fb: "paper 不可数 → is" },
    { zh: "情态·允许", stem: "Teenagers ___ be allowed to choose clothes.", ans: "should", opts: ["should", "should be", "are"], fb: "should be allowed to" },
    { zh: "环保", stem: "The air ___ badly polluted in big cities.", ans: "is", opts: ["is", "are", "was"], fb: "air 不可数 → is polluted" },
    { zh: "材质", stem: "This ring ___ made of silver.", ans: "is", opts: ["is", "are", "was"], fb: "ring 单数 → is made of" },
    { zh: "建议", stem: "Trees ___ be planted on hills.", ans: "should", opts: ["should", "should be", "are"], fb: "should be planted" },
    { zh: "科技", stem: "Mobile phones ___ made in factories.", ans: "are", opts: ["are", "is", "was"], fb: "phones 复数 → are" },
    { zh: "中考", stem: "His eyes may ___ hurt by strong light.", ans: "be", opts: ["be", "been", "being"], fb: "may be hurt" },
    { zh: "校园", stem: "Our classroom ___ cleaned every afternoon.", ans: "is", opts: ["is", "are", "was"], fb: "classroom 单数 → is" },
    { zh: "过去·桥", stem: "The bridge ___ built last year.", ans: "was", opts: ["was", "were", "is"], fb: "last year → was built" },
    { zh: "疑问", stem: "___ your shirts made of cotton?", ans: "Are", opts: ["Are", "Do", "Is"], fb: "Are + 主语 + done" },
    { zh: "完成时预习", stem: "Homework has ___ finished.", ans: "been", opts: ["been", "be", "was"], fb: "has been + V3" },
    { zh: "must被动", stem: "The report must ___ handed in today.", ans: "be", opts: ["be", "been", "—"], fb: "must be + V3" },
    { zh: "I 作主语", stem: "I ___ invited to the party.", ans: "am", opts: ["am", "is", "are"], fb: "I → am invited" },
    { zh: "语言", stem: "English ___ spoken in many countries.", ans: "is", opts: ["is", "are", "was"], fb: "language 单数 → is spoken" },
    { zh: "风筝", stem: "Kites ___ made by hand in Weifang.", ans: "are", opts: ["are", "is", "was"], fb: "kites 复数 → are" },
    { zh: "篮球", stem: "Basketball ___ invented in 1891.", ans: "was", opts: ["was", "were", "is"], fb: "basketball 单数 → was" },
    { zh: "印刷", stem: "Printing ___ invented in China.", ans: "was", opts: ["was", "were", "is"], fb: "Printing 单数概念 → was" },
    { zh: "否定情态", stem: "Students ___ be allowed to use phones in class.", ans: "shouldn't", opts: ["shouldn't", "should", "aren't"], fb: "shouldn't be allowed" },
    { zh: "aren't", stem: "You ___ allowed to enter without a ticket.", ans: "aren't", opts: ["aren't", "don't", "isn't"], fb: "aren't allowed to" }
  ];

  /** 分层 B：主动→被动转换（每题 3 项，干扰项含常见错） */
  var TIER_B = [
    { zh: "风筝·潍坊", stem: "主动：They make kites by hand in Weifang.", ans: "Kites are made by hand in Weifang.", opts: ["Kites are made by hand in Weifang.", "Kites is made by hand in Weifang.", "Kites made by hand in Weifang."], fb: "kites → are made" },
    { zh: "薯片", stem: "主动：George Crum invented potato chips.", ans: "Potato chips were invented by George Crum.", opts: ["Potato chips were invented by George Crum.", "Potato chips was invented by George Crum.", "Potato chips invented George Crum."], fb: "were invented + by" },
    { zh: "折纸", stem: "主动：People fold paper before they cut it.", ans: "Paper is folded before it is cut.", opts: ["Paper is folded before it is cut.", "Paper are folded before it is cut.", "Paper is fold before it is cut."], fb: "Paper is folded" },
    { zh: "电话", stem: "主动：Bell invented the telephone.", ans: "The telephone was invented by Bell.", opts: ["The telephone was invented by Bell.", "The telephone invented Bell.", "The telephone was invent by Bell."], fb: "was invented by" },
    { zh: "手机", stem: "主动：They make mobile phones in factories.", ans: "Mobile phones are made in factories.", opts: ["Mobile phones are made in factories.", "Mobile phones is made in factories.", "Mobile phones make in factories."], fb: "phones → are made" },
    { zh: "Peter补考", stem: "主动：The teacher allows Peter to take the test later.", ans: "Peter should be allowed to take the test later.", opts: ["Peter should be allowed to take the test later.", "Peter should allowed to take the test later.", "Peter should be allow to take the test later."], fb: "should be allowed to" },
    { zh: "污染", stem: "主动：People pollute the air in big cities.", ans: "The air is polluted in big cities.", opts: ["The air is polluted in big cities.", "The air are polluted in big cities.", "The air is pollute in big cities."], fb: "air → is polluted" },
    { zh: "建桥", stem: "主动：They built the bridge last year.", ans: "The bridge was built last year.", opts: ["The bridge was built last year.", "The bridge is built last year.", "The bridge were built last year."], fb: "was built" },
    { zh: "泥塑", stem: "主动：Workers shape clay by hand.", ans: "Clay is shaped by hand.", opts: ["Clay is shaped by hand.", "Clay are shaped by hand.", "Clay is shape by hand."], fb: "Clay is shaped" },
    { zh: "钢笔", stem: "主动：Liu Jie invented this special pen.", ans: "This pen was invented by Liu Jie.", opts: ["This pen was invented by Liu Jie.", "This pen invented Liu Jie.", "This pen was invent by Liu Jie."], fb: "was invented by" },
    { zh: "篮球", stem: "主动：James Naismith invented basketball.", ans: "Basketball was invented by James Naismith.", opts: ["Basketball was invented by James Naismith.", "Basketball was invented in James Naismith.", "Basketball invented James Naismith."], fb: "was invented by" },
    { zh: "银戒", stem: "主动：They made this ring in Thailand.", ans: "This ring was made in Thailand.", opts: ["This ring was made in Thailand.", "This ring was made by Thailand.", "This ring is made in Thailand."], fb: "was made in（地点）" },
    { zh: "作业", stem: "主动：Students should finish homework on time.", ans: "Homework should be finished on time.", opts: ["Homework should be finished on time.", "Homework should finish on time.", "Homework should be finish on time."], fb: "should be finished" },
    { zh: "天灯", stem: "主动：Workers make sky lanterns of bamboo.", ans: "Sky lanterns are made of bamboo.", opts: ["Sky lanterns are made of bamboo.", "Sky lanterns is made of bamboo.", "Sky lanterns are make of bamboo."], fb: "are made of" },
    { zh: "印刷", stem: "主动：People invented printing in China.", ans: "Printing was invented in China.", opts: ["Printing was invented in China.", "Printing was invented by China.", "Printing invented in China."], fb: "was invented in" },
    { zh: "教室", stem: "主动：The students clean the classroom every day.", ans: "The classroom is cleaned every day.", opts: ["The classroom is cleaned every day.", "The classroom are cleaned every day.", "The classroom is clean every day."], fb: "is cleaned" },
    { zh: "丝巾", stem: "主动：Skilled workers weave silk scarves.", ans: "Silk scarves are woven by skilled workers.", opts: ["Silk scarves are woven by skilled workers.", "Silk scarves is woven by skilled workers.", "Silk scarves woven by skilled workers."], fb: "are woven by" },
    { zh: "报告", stem: "主动：You must hand in the report today.", ans: "The report must be handed in today.", opts: ["The report must be handed in today.", "The report must hand in today.", "The report must be hand in today."], fb: "must be handed in" },
    { zh: "茶·锚点", stem: "主动：People grow tea on the mountains.", ans: "Tea is grown on the mountains.", opts: ["Tea is grown on the mountains.", "Tea are grown on the mountains.", "Tea grows on the mountains."], fb: "Tea is grown" },
    { zh: "博物馆", stem: "主动：The museum allows us to take photos.", ans: "We may be allowed to take photos in the museum.", opts: ["We may be allowed to take photos in the museum.", "We may allow to take photos in the museum.", "We may be allow to take photos in the museum."], fb: "may be allowed to" }
  ];

  /** 分层 C：汉译英 / 选完整句 */
  var TIER_C = [
    { zh: "天灯", ans: "Sky lanterns are made of bamboo and paper.", opts: ["Sky lanterns are made of bamboo and paper.", "Sky lanterns make of bamboo.", "Sky lanterns are make of bamboo."], fb: "are made of" },
    { zh: "薯片", ans: "Potato chips were invented by mistake.", opts: ["Potato chips were invented by mistake.", "Potato chips was invented by mistake.", "Potato chips invented by mistake."], fb: "were invented" },
    { zh: "不应开车", ans: "Sixteen-year-olds should not be allowed to drive.", opts: ["Sixteen-year-olds should not be allowed to drive.", "Sixteen-year-olds should not allowed to drive.", "Sixteen-year-olds should not be allow to drive."], fb: "should not be allowed to" },
    { zh: "污染", ans: "The air is badly polluted in big cities.", opts: ["The air is badly polluted in big cities.", "The air badly pollutes in big cities.", "The air is badly pollute in big cities."], fb: "is badly polluted" },
    { zh: "博物馆", ans: "We may be allowed to take photos in the museum.", opts: ["We may be allowed to take photos in the museum.", "We may allowed to take photos in the museum.", "We may be allow to take photos in the museum."], fb: "may be allowed to" },
    { zh: "印刷", ans: "Printing was invented in China.", opts: ["Printing was invented in China.", "Printing invented in China.", "Printing was invent in China."], fb: "was invented in" },
    { zh: "无票", ans: "You aren't allowed to enter without a ticket.", opts: ["You aren't allowed to enter without a ticket.", "You don't allowed to enter without a ticket.", "You aren't allow to enter without a ticket."], fb: "aren't allowed to" },
    { zh: "植树", ans: "Trees should be planted on hills.", opts: ["Trees should be planted on hills.", "Trees should plant on hills.", "Trees should be plant on hills."], fb: "should be planted" },
    { zh: "手机", ans: "Mobile phones are made in factories.", opts: ["Mobile phones are made in factories.", "Mobile phones is made in factories.", "Mobile phones make in factories."], fb: "are made in factories" },
    { zh: "折纸", ans: "Paper is folded before it is cut.", opts: ["Paper is folded before it is cut.", "Paper is fold before it is cut.", "Paper are folded before it is cut."], fb: "is folded" },
    { zh: "篮球", ans: "Basketball was invented by James Naismith.", opts: ["Basketball was invented by James Naismith.", "Basketball was invented in James Naismith.", "Basketball invented James Naismith."], fb: "was invented by" },
    { zh: "教室", ans: "Our classroom is cleaned every afternoon.", opts: ["Our classroom is cleaned every afternoon.", "Our classroom are cleaned every afternoon.", "Our classroom is clean every afternoon."], fb: "is cleaned" },
    { zh: "报告", ans: "The report must be handed in before Friday.", opts: ["The report must be handed in before Friday.", "The report must hand in before Friday.", "The report must be hand in before Friday."], fb: "must be handed in" },
    { zh: "眼睛", ans: "His eyes may be hurt badly by the strong light.", opts: ["His eyes may be hurt badly by the strong light.", "His eyes may hurt badly by the strong light.", "His eyes may be hurt bad by the strong light."], fb: "may be hurt by" }
  ];

  /** 分层 D：综合·辨错·中考风格（较难） */
  var TIER_D = [
    { zh: "辨错", stem: "哪句正确？", ans: "Potato chips were invented by mistake.", opts: ["Potato chips was invented by mistake.", "Potato chips were invented by mistake.", "Potato chips invented by mistake."], fb: "复数 were + invented" },
    { zh: "辨错", stem: "哪句正确？", ans: "Teenagers should be allowed to choose their own clothes.", opts: ["Teenagers should allow to choose their own clothes.", "Teenagers should be allowed to choose their own clothes.", "Teenagers should be allow to choose their own clothes."], fb: "should be allowed to" },
    { zh: "辨错", stem: "哪句正确？", ans: "The telephone was invented in 1876.", opts: ["The telephone was invented by 1876.", "The telephone was invented in 1876.", "The telephone invented in 1876."], fb: "年份 in，不是 by" },
    { zh: "语篇", stem: "短文：Phones ___ in factories. 选词", ans: "are made", opts: ["are made", "are make", "is made"], fb: "phones 复数" },
    { zh: "双空", stem: "Shirts ___ cotton and ___ China.", ans: "are made of … in", opts: ["are made of … in", "are made in … of", "are made from … by"], fb: "of 材质 + in 产地" },
    { zh: "疑问", stem: "正确问句：电话何时发明？", ans: "When was the telephone invented?", opts: ["When was the telephone invented?", "When the telephone was invented?", "When is the telephone invented?"], fb: "When was + 主语 + done" },
    { zh: "情态+by", stem: "The work ___ by noon.", ans: "must be finished", opts: ["must finish", "must be finished", "must be finish"], fb: "must be + V3" },
    { zh: "主动被动", stem: "They built the bridge. →", ans: "The bridge was built.", opts: ["The bridge was built.", "The bridge is built.", "The bridge built."], fb: "was built（保留时间状语另加）" },
    { zh: "中考", stem: "Do to others what you wish ___ to you.", ans: "to be done", opts: ["to do", "to be done", "be done"], fb: "wish to be done to you" },
    { zh: "完成被动", stem: "Homework has already ___ .", ans: "been finished", opts: ["been finished", "been finish", "finished"], fb: "has been finished" },
    { zh: "将来被动", stem: "The bridge ___ next year.", ans: "will be built", opts: ["will be built", "will built", "will be build"], fb: "will be + V3" },
    { zh: "将来否定", stem: "The work ___ today.", ans: "won't be finished", opts: ["won't be finished", "will not finish", "won't finish"], fb: "won't be + V3" }
  ];

  /** 分层 E：一般将来被动 will be + done */
  var TIER_E = [
    { zh: "建桥", stem: "The bridge ___ next year.", ans: "will be built", opts: ["will be built", "will built", "will be build"], fb: "will be + built" },
    { zh: "植树", stem: "More trees ___ next spring.", ans: "will be planted", opts: ["will be planted", "will plant", "will be plant"], fb: "will be planted" },
    { zh: "新校", stem: "A new school ___ in September.", ans: "will be opened", opts: ["will be opened", "will open", "will be open"], fb: "will be opened" },
    { zh: "否定", stem: "The work ___ today.", ans: "won't be finished", opts: ["won't be finished", "will not finish", "won't finish"], fb: "won't be + V3" },
    { zh: "疑问", stem: "___ the meeting ___ on Friday?", ans: "Will … be held", opts: ["Will … be held", "Will … hold", "Is … held"], fb: "Will + 主语 + be + done" },
    { zh: "When", stem: "When ___ the museum ___?", ans: "will … be opened", opts: ["will … be opened", "will … open", "was … opened"], fb: "When will … be opened" },
    { zh: "手机", stem: "Phones ___ in smarter factories.", ans: "will be made", opts: ["will be made", "will make", "will be make"], fb: "will be made" },
    { zh: "英语", stem: "English ___ at the ceremony.", ans: "will be spoken", opts: ["will be spoken", "will speak", "will be speak"], fb: "will be spoken" },
    { zh: "塑料袋", stem: "Plastic bags ___ in shops.", ans: "will be banned", opts: ["will be banned", "will ban", "will be ban"], fb: "will be banned" },
    { zh: "操场", stem: "The field ___ for the concert.", ans: "will be used", opts: ["will be used", "will use", "will be use"], fb: "will be used for" },
    { zh: "转换", stem: "主动：They will build the bridge.", ans: "The bridge will be built.", opts: ["The bridge will be built.", "The bridge will built.", "The bridge will be build."], fb: "宾语→主语 + will be + V3" },
    { zh: "转换2", stem: "主动：We will plant more trees.", ans: "More trees will be planted.", opts: ["More trees will be planted.", "More trees will plant.", "More trees will be plant."], fb: "will be planted" },
    { zh: "辨错", stem: "哪句正确？", ans: "Homework will not be accepted late.", opts: ["Homework will not accept late.", "Homework will not be accepted late.", "Homework will not be accept late."], fb: "will not be accepted" },
    { zh: "辨错2", stem: "哪句正确？", ans: "Will more trees be planted?", opts: ["Will more trees be planted?", "Will more trees planted?", "Will more trees be plant?"], fb: "Will + be + V3" },
    { zh: "going to", stem: "The show ___ tomorrow.（拓展）", ans: "is going to be held", opts: ["is going to be held", "is going to hold", "will hold"], fb: "be going to be + done" },
    { zh: "迟交", stem: "Late homework ___ .", ans: "will not be accepted", opts: ["will not be accepted", "will not accept", "will not be accept"], fb: "will not be accepted" }
  ];

  /** 分层 F：现在完成被动 have/has been + done */
  var TIER_F = [
    { zh: "作业", stem: "Homework ___ .", ans: "has been finished", opts: ["has been finished", "has finished", "has been finish"], fb: "has been + V3" },
    { zh: "yet", stem: "The work has not ___ yet.", ans: "been finished", opts: ["been finished", "been finish", "finished"], fb: "has not been finished yet" },
    { zh: "疑问", stem: "___ the classroom ___ yet?", ans: "Has … been cleaned", opts: ["Has … been cleaned", "Has … cleaned", "Have … been cleaned"], fb: "Has + 主语 + been + done" },
    { zh: "植树", stem: "Many trees ___ this year.", ans: "have been planted", opts: ["have been planted", "have planted", "has been planted"], fb: "trees 复数 → have been" },
    { zh: "电影", stem: "The film ___ before.", ans: "has been seen", opts: ["has been seen", "has saw", "has been saw"], fb: "has been seen" },
    { zh: "规则", stem: "The rules ___ by everyone.", ans: "have been followed", opts: ["have been followed", "have followed", "has been followed"], fb: "rules 复数 → have been" },
    { zh: "already", stem: "The letter has ___ sent.", ans: "already been", opts: ["already been", "been already", "already be"], fb: "has already been sent" },
    { zh: "窗户", stem: "The windows ___ .", ans: "have been broken", opts: ["have been broken", "have broke", "has been broken"], fb: "windows → have been broken" },
    { zh: "How many", stem: "How many phones ___ this year?", ans: "have been made", opts: ["have been made", "have made", "has been made"], fb: "phones 复数 → have been made" },
    { zh: "have/has", stem: "English ___ here for years.", ans: "has been spoken", opts: ["has been spoken", "have been spoken", "has spoken"], fb: "English 单数 → has been spoken" },
    { zh: "转换", stem: "主动：They have finished the work.", ans: "The work has been finished.", opts: ["The work has been finished.", "The work has finished.", "The work have been finished."], fb: "has been finished" },
    { zh: "转换2", stem: "主动：People have planted many trees.", ans: "Many trees have been planted.", opts: ["Many trees have been planted.", "Many trees have planted.", "Many trees has been planted."], fb: "have been planted" },
    { zh: "辨错", stem: "哪句正确？", ans: "Homework has been finished.", opts: ["Homework has been finish.", "Homework has been finished.", "Homework has finished."], fb: "has been + V3" },
    { zh: "辨错2", stem: "哪句正确？", ans: "Has the homework been finished yet?", opts: ["Has the homework been finished yet?", "Has the homework finished yet?", "Has the homework been finish yet?"], fb: "Has + been + done" },
    { zh: "not yet", stem: "The museum ___ yet.", ans: "hasn't been opened", opts: ["hasn't been opened", "hasn't opened", "hasn't been open"], fb: "hasn't been opened yet" },
    { zh: "since", stem: "Tea ___ in Hangzhou for centuries.", ans: "has been grown", opts: ["has been grown", "has grown", "have been grown"], fb: "tea → has been grown" }
  ];

  /** 综合测 · 跨单元（Page 10 等） */
  var QUIZ_MIX = [
    { zh: "构成", stem: "Lanterns ___ made of bamboo.", ans: "are", opts: ["are", "is", "was"], fb: "are made of" },
    { zh: "过去", stem: "Chips ___ invented by mistake.", ans: "were", opts: ["was", "were", "are"], fb: "were invented" },
    { zh: "by", stem: "The telephone was invented ___ Bell.", ans: "by", opts: ["by", "in", "on"], fb: "by + 人" },
    { zh: "地点", stem: "The ring was made ___ Thailand.", ans: "in", opts: ["by", "in", "from"], fb: "in + 国家" },
    { zh: "情态", stem: "Students should ___ allowed to choose.", ans: "be", opts: ["be", "been", "—"], fb: "should be allowed" },
    { zh: "语态", stem: "Potato chips were invented by mistake.", ans: "被动", opts: ["主动", "被动"], fb: "were invented" },
    { zh: "made of", stem: "The model plane is made ___ wood.", ans: "of", opts: ["of", "from", "in"], fb: "made of 材料" },
    { zh: "环保", stem: "Trees should ___ planted.", ans: "be", opts: ["be", "been", "—"], fb: "should be planted" },
    { zh: "转换", stem: "主动：They make phones in factories.", ans: "Phones are made in factories.", opts: ["Phones are made in factories.", "Phones make in factories.", "Phones is made in factories."], fb: "Phones are made" },
    { zh: "中考", stem: "Eyes may ___ hurt by strong light.", ans: "be", opts: ["be", "been", "being"], fb: "may be hurt" },
    { zh: "否定", stem: "Kites ___ made of plastic.", ans: "are not", opts: ["are not", "is not", "not are"], fb: "are not made of" },
    { zh: "疑问", stem: "___ the shirts made in China?", ans: "Are", opts: ["Are", "Do", "Were"], fb: "Are they made" },
    { zh: "from", stem: "Wine is made ___ grapes.", ans: "from", opts: ["of", "from", "in"], fb: "made from" },
    { zh: "校园", stem: "The classroom ___ every day.", ans: "is cleaned", opts: ["is cleaned", "is clean", "cleans"], fb: "is cleaned" },
    { zh: "must", stem: "The report must ___ today.", ans: "be handed in", opts: ["be handed in", "hand in", "be hand in"], fb: "must be handed in" },
    { zh: "was/were", stem: "The windows ___ broken yesterday.", ans: "were", opts: ["was", "were", "are"], fb: "windows → were" },
    { zh: "allow", stem: "You ___ to enter without a ticket.", ans: "aren't allowed", opts: ["aren't allowed", "don't allow", "not allow"], fb: "aren't allowed to" },
    { zh: "by hand", stem: "The tea was picked ___ hand.", ans: "by", opts: ["by", "in", "with"], fb: "by hand" },
    { zh: "转换2", stem: "主动：Naismith invented basketball.", ans: "Basketball was invented by Naismith.", opts: ["Basketball was invented by Naismith.", "Basketball invented Naismith.", "Basketball was invent by Naismith."], fb: "was invented by" },
    { zh: "has been", stem: "The work has ___ done.", ans: "been", opts: ["been", "be", "was"], fb: "has been done" },
    { zh: "辨错", stem: "哪句正确？", ans: "Paper is folded before it is cut.", opts: ["Paper is fold before it is cut.", "Paper is folded before it is cut.", "Paper are folded before it is cut."], fb: "is folded" },
    { zh: "情态问", stem: "___ teens be allowed to work on weekends?", ans: "Should", opts: ["Should", "Do", "Are"], fb: "Should … be allowed" },
    { zh: "印刷", stem: "Printing ___ invented in China.", ans: "was", opts: ["was", "were", "is"], fb: "was invented" },
    { zh: "污染", stem: "The air ___ in big cities.", ans: "is polluted", opts: ["is polluted", "pollutes", "is pollute"], fb: "is polluted" },
    { zh: "woven", stem: "Silk scarves ___ by workers.", ans: "are woven", opts: ["are woven", "is woven", "are weave"], fb: "are woven by" },
    { zh: "spoken", stem: "English ___ in many countries.", ans: "is spoken", opts: ["is spoken", "speaks", "is speak"], fb: "is spoken" },
    { zh: "am", stem: "I ___ invited to speak.", ans: "am", opts: ["am", "is", "are"], fb: "I am invited" },
    { zh: "综合", stem: "We may ___ to take photos here.", ans: "be allowed", opts: ["be allowed", "allow", "allowed"], fb: "may be allowed to" },
    { zh: "将来", stem: "The bridge ___ next year.", ans: "will be built", opts: ["will be built", "will built", "was built"], fb: "will be built" },
    { zh: "完成", stem: "Homework ___ .", ans: "has been finished", opts: ["has been finished", "has finished", "was finished"], fb: "has been finished" },
    { zh: "When将来", stem: "When ___ the school ___?", ans: "will … be opened", opts: ["will … be opened", "will … open", "was … opened"], fb: "When will … be opened" },
    { zh: "yet", stem: "The work has not ___ yet.", ans: "been finished", opts: ["been finished", "finished", "been finish"], fb: "has not been finished yet" }
  ];

  function q(stem, ans, opts, fb, extra) {
    var item = { stem: stem, ans: ans, opts: opts, fb: fb || "" };
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        item[k] = extra[k];
      });
    }
    return item;
  }

  function ql(stem, ans, opts, fb) {
    return q(stem, ans, opts, fb, { stem: "听录音，选择与音频一致的句子。", audio: ans });
  }

  /** 各页专用测验池（替换 HTML 内联 quiz*，主题错开） */
  var PAGE_QUIZZES = {
    page02: {
      quizBe: [
        q("Sky lanterns ___ made of bamboo.", "are made", ["are made", "is made", "are make"], "复数 are + made"),
        q("The compass ___ first used for travel.", "was used", ["was used", "is used", "were used"], "过去 was used"),
        q("English ___ in many countries.", "is spoken", ["is spoken", "is speak", "are spoken"], "is spoken"),
        q("Our classroom ___ every afternoon.", "is cleaned", ["is cleaned", "is clean", "are cleaned"], "is cleaned"),
        q("Silk scarves ___ by skilled workers.", "are woven", ["are woven", "is woven", "are weave"], "are woven by"),
        q("The report must ___ today.", "be handed in", ["be handed in", "must hand in", "be hand in"], "must be + V3"),
        q("I ___ to the parents' meeting.", "am invited", ["am invited", "am invite", "is invited"], "I → am"),
        q("Vaccines ___ in cold rooms.", "are stored", ["are stored", "is stored", "are store"], "are stored"),
        q("The air ___ in big cities.", "is polluted", ["is polluted", "is pollute", "are polluted"], "is polluted"),
        q("Homework ___ on time.", "should be finished", ["should be finished", "should finish", "should be finish"], "情态被动"),
        q("Mobile phones ___ in factories.", "are made", ["are made", "is made", "are make"], "are made"),
        q("The bridge ___ last year.（预习）", "was built", ["was built", "is built", "were built"], "was built")
      ],
      quizPp: [
        q("Lanterns are ___ of bamboo.", "made", ["make", "made", "making"], "made"),
        q("Tea is ___ in Hangzhou.", "grown", ["grow", "grown", "grew"], "grown"),
        q("Letters are ___ every morning.", "sent", ["send", "sent", "sended"], "sent"),
        q("The window was ___ yesterday.", "broken", ["broke", "broken", "breaked"], "broken"),
        q("The story was ___ in 2020.", "written", ["wrote", "written", "writed"], "written"),
        q("The film has been ___ before.", "seen", ["saw", "seen", "see"], "seen"),
        q("The rules should be ___ by everyone.", "followed", ["follow", "followed", "following"], "followed"),
        q("The tea is ___ by hand.", "picked", ["pick", "picked", "picking"], "picked"),
        q("Chips were ___ by mistake.", "invented", ["invent", "invented", "inventing"], "invented"),
        q("The city is ___ by tourists.", "visited", ["visit", "visited", "visiting"], "visited")
      ],
      quizFix: [
        q("哪句正确？", "Sky lanterns are made of bamboo.", ["Sky lanterns is made of bamboo.", "Sky lanterns are made of bamboo.", "Sky lanterns are make of bamboo."], "are made of"),
        q("哪句正确？", "English is spoken in many countries.", ["English is speak in many countries.", "English is spoken in many countries.", "English are spoken in many countries."], "is spoken"),
        q("哪句正确？", "Our classroom is cleaned every day.", ["Our classroom are cleaned every day.", "Our classroom is cleaned every day.", "Our classroom is clean every day."], "is cleaned"),
        q("哪句正确？", "The report must be handed in today.", ["The report must hand in today.", "The report must be handed in today.", "The report must be hand in today."], "must be handed in"),
        q("哪句正确？", "I am invited to the party.", ["I am invite to the party.", "I am invited to the party.", "I is invited to the party."], "am invited"),
        q("哪句正确？", "Mobile phones are made in factories.", ["Mobile phones is made in factories.", "Mobile phones are made in factories.", "Mobile phones are make in factories."], "are made"),
        q("哪句正确？", "Silk scarves are woven by workers.", ["Silk scarves is woven by workers.", "Silk scarves are woven by workers.", "Silk scarves are weave by workers."], "are woven")
      ],
      quizNegQ: [
        q("否定：教室不是每天打扫。", "The classroom is not cleaned on Sundays.", ["The classroom not is cleaned on Sundays.", "The classroom is not cleaned on Sundays.", "The classroom doesn't cleaned on Sundays."], "is not + done"),
        q("疑问：英语在很多国家被说吗？", "Is English spoken in many countries?", ["Does English spoken in many countries?", "Is English spoken in many countries?", "Is English speak in many countries?"], "Is + done"),
        q("否定：风筝不是塑料做的。", "Kites are not made of plastic.", ["Kites are not made of plastic.", "Kites is not made of plastic.", "Kites not are made of plastic."], "are not made of"),
        q("疑问：衬衫是棉做的吗？", "Are your shirts made of cotton?", ["Do your shirts made of cotton?", "Are your shirts made of cotton?", "Are your shirts make of cotton?"], "Are + done"),
        q("否定：作业不能迟交。", "Late homework will not be accepted.", ["Late homework will not accept.", "Late homework will not be accepted.", "Late homework will not be accept."], "will not be accepted"),
        q("疑问：手机在工厂制造吗？", "Are mobile phones made in factories?", ["Are mobile phones made in factories?", "Do mobile phones made in factories?", "Are mobile phones make in factories?"], "Are + done")
      ],
      quizListen: [
        ql("Sky lanterns are made of bamboo.", "Sky lanterns are made of bamboo.", ["Workers make sky lanterns of bamboo.", "Sky lanterns are made of bamboo.", "Sky lanterns make bamboo."], "are made of"),
        ql("English is spoken in many countries.", "English is spoken in many countries.", ["People speak English in many countries.", "English is spoken in many countries.", "English is speak in many countries."], "is spoken"),
        ql("Our classroom is cleaned every afternoon.", "Our classroom is cleaned every afternoon.", ["Students clean the classroom every afternoon.", "Our classroom is cleaned every afternoon.", "Our classroom is clean every afternoon."], "is cleaned"),
        ql("The report must be handed in today.", "The report must be handed in today.", ["You must hand in the report today.", "The report must be handed in today.", "The report must hand in today."], "must be handed in"),
        ql("Mobile phones are made in factories.", "Mobile phones are made in factories.", ["They make mobile phones in factories.", "Mobile phones are made in factories.", "Mobile phones is made in factories."], "are made"),
        ql("Silk scarves are woven by skilled workers.", "Silk scarves are woven by skilled workers.", ["Skilled workers weave silk scarves.", "Silk scarves are woven by skilled workers.", "Silk scarves weave workers."], "are woven")
      ]
    },
    page03: {
      quizPassive: TIER_B.slice(0, 12),
      quizObject: [
        q("Workers make sky lanterns. 被动主语？", "Sky lanterns", ["Workers", "bamboo", "Sky lanterns"], "制品作主语"),
        q("George Crum invented potato chips. 新主语？", "Potato chips", ["George Crum", "mistake", "Potato chips"], "chips 是承受者"),
        q("They make mobile phones. 新主语？", "Mobile phones", ["They", "factories", "Mobile phones"], "phones 是宾语"),
        q("People pollute the air. 新主语？", "The air", ["People", "cities", "The air"], "air 是承受者"),
        q("Students clean the classroom. 新主语？", "The classroom", ["Students", "every day", "The classroom"], "classroom 是宾语"),
        q("Skilled workers weave scarves. 新主语？", "Silk scarves", ["workers", "Silk scarves", "silk"], "scarves 是宾语"),
        q("The museum allows photos. 新主语？", "We", ["The museum", "photos", "We"], "我们承受「被允许」"),
        q("You must hand in the report. 新主语？", "The report", ["You", "today", "The report"], "report 是宾语")
      ],
      quizFix: TIER_D.slice(0, 6),
      quizModalPast: [
        q("Students should finish homework. →", "Homework should be finished.", ["Homework should finish.", "Homework should be finished.", "Homework should be finish."], "should be + V3"),
        q("They built the bridge last year. →", "The bridge was built last year.", ["The bridge was built last year.", "The bridge is built last year.", "The bridge were built last year."], "was built"),
        q("Naismith invented basketball. →", "Basketball was invented by Naismith.", ["Basketball was invented by Naismith.", "Basketball invented Naismith.", "Basketball was invent by Naismith."], "was invented by"),
        q("People invented printing in China. →", "Printing was invented in China.", ["Printing was invented in China.", "Printing was invented by China.", "Printing invented in China."], "was invented in"),
        q("The teacher allows Peter to test later. →", "Peter should be allowed to take the test later.", ["Peter should be allowed to take the test later.", "Peter should allow to take the test later.", "Peter should allowed to take the test later."], "should be allowed to"),
        q("Workers shape clay. →", "Clay is shaped by hand.", ["Clay is shaped by hand.", "Clay are shaped by hand.", "Clay is shape by hand."], "is shaped"),
        q("They made this ring in Thailand. →", "This ring was made in Thailand.", ["This ring was made in Thailand.", "This ring was made by Thailand.", "This ring is made in Thailand."], "was made in"),
        q("People grow tea on mountains. →", "Tea is grown on the mountains.", ["Tea is grown on the mountains.", "Tea are grown on the mountains.", "Tea grows on the mountains."], "Tea is grown")
      ],
      quizListen: [
        ql("Kites are made by hand in Weifang.", "Kites are made by hand in Weifang.", ["They make kites by hand.", "Kites are made by hand in Weifang.", "Kites is made by hand."], "are made"),
        ql("Potato chips were invented by mistake.", "Potato chips were invented by mistake.", ["George Crum invented chips.", "Potato chips were invented by mistake.", "Potato chips was invented by mistake."], "were invented"),
        ql("Mobile phones are made in factories.", "Mobile phones are made in factories.", ["They make phones in factories.", "Mobile phones are made in factories.", "Mobile phones make in factories."], "are made"),
        ql("Homework should be finished on time.", "Homework should be finished on time.", ["Students should finish homework.", "Homework should be finished on time.", "Homework should finish on time."], "should be finished"),
        ql("The air is polluted in big cities.", "The air is polluted in big cities.", ["People pollute the air.", "The air is polluted in big cities.", "The air is pollute in big cities."], "is polluted")
      ]
    },
    page04: {
      quizFill: [
        q("Potato chips were invented ___ mistake.", "by", ["by", "in", "on"], "by mistake 固定"),
        q("The telephone was invented ___ Bell.", "by", ["by", "in", "on"], "by + 人"),
        q("Shirts are made ___ China.", "in", ["by", "in", "from"], "in China 产地"),
        q("The telephone was invented ___ 1876.", "in", ["by", "in", "on"], "in + 年份"),
        q("The tea was picked ___ hand.", "by", ["by", "with", "in"], "by hand"),
        q("Tea is grown ___ Hangzhou.", "in", ["by", "in", "(no by)"], "地点 in"),
        q("Basketball was invented ___ Naismith.", "by", ["by", "in", "from"], "by + 人"),
        q("Homework should be finished ___ students?（省略）", "(no by)", ["by", "in", "(no by)"], "不必 by students"),
        q("Printing was invented ___ China.", "in", ["by", "in", "on"], "in China"),
        q("The bridge was built ___ workers.（强调）", "by", ["by", "in", "on"], "by workers"),
        q("Sky lanterns are made ___ bamboo.", "of", ["of", "in", "from"], "made of 材料"),
        q("Mobile phones are made ___ factories.", "in", ["by", "in", "on"], "in factories")
      ],
      quizSentence: TIER_C.slice(0, 8),
      quizFix: TIER_D.slice(0, 6),
      quizColloc: QUIZ_MIX.slice(0, 8)
    },
    page05: {
      quizPast: TIER_A.slice(6, 16),
      quizWasWere: [
        q("The zipper ___ invented in 1893.", "was", ["was", "were", "is"], "zipper 单数"),
        q("Potato chips ___ invented by mistake.", "were", ["was", "were", "are"], "chips 复数"),
        q("The telephones ___ invented in 1876.", "were", ["was", "were", "is"], "telephones 复数"),
        q("Basketball ___ invented in 1891.", "was", ["was", "were", "is"], "basketball 单数"),
        q("The windows ___ broken yesterday.", "were", ["was", "were", "are"], "windows 复数"),
        q("English ___ spoken long ago.", "was", ["was", "were", "is"], "English 单数"),
        q("The students ___ invited to the party.", "were", ["was", "were", "are"], "students 复数"),
        q("Tea ___ discovered by accident.", "was", ["was", "were", "is"], "tea 不可数")
      ],
      quizFix: TIER_D.slice(0, 6),
      quizWhen: [
        q("问句：电话何时发明？", "When was the telephone invented?", ["When was the telephone invented?", "When the telephone was invented?", "When is the telephone invented?"], "When was"),
        q("问句：拉链何时发明？", "When was the zipper invented?", ["When was the zipper invented?", "When were the zipper invented?", "When was the zipper invent?"], "When was"),
        q("答句：1876 年。", "It was invented in 1876.", ["It invented in 1876.", "It was invented in 1876.", "It is invented in 1876."], "It was invented"),
        q("问句：桥何时建好？", "When was the bridge built?", ["When was the bridge built?", "When were the bridge built?", "When was the bridge build?"], "When was … built"),
        q("Basketball ___ invented in 1891?", "Was", ["Was", "Were", "Is"], "Was … invented"),
        q("The windows ___ broken yesterday?", "Were", ["Was", "Were", "Are"], "Were … broken"),
        q("答句：去年。", "It was built last year.", ["It built last year.", "It was built last year.", "It was build last year."], "was built"),
        q("Tea ___ discovered by accident?", "Was", ["Was", "Were", "Is"], "Was tea discovered")
      ],
      quizListen: [
        ql("Potato chips were invented by mistake.", "Potato chips were invented by mistake.", ["George Crum invented chips.", "Potato chips were invented by mistake.", "Potato chips was invented by mistake."], "were invented"),
        ql("When was the telephone invented?", "When was the telephone invented?", ["When is the telephone invented?", "When was the telephone invented?", "When were the telephone invented?"], "When was"),
        ql("Basketball was invented by James Naismith.", "Basketball was invented by James Naismith.", ["James Naismith invented basketball.", "Basketball was invented by James Naismith.", "Basketball invented James Naismith."], "was invented by"),
        ql("The bridge was built last year.", "The bridge was built last year.", ["They built the bridge last year.", "The bridge was built last year.", "The bridge were built last year."], "was built"),
        ql("Printing was invented in China.", "Printing was invented in China.", ["People invented printing in China.", "Printing was invented in China.", "Printing invented in China."], "was invented in")
      ],
      quizVoice: [
        q("Bell invented the telephone.", "主动", ["主动", "被动"], "Bell 施动"),
        q("The telephone was invented by Bell.", "被动", ["主动", "被动"], "was invented"),
        q("They built the bridge last year.", "主动", ["主动", "被动"], "They 施动"),
        q("The bridge was built last year.", "被动", ["主动", "被动"], "bridge 承受"),
        q("George Crum invented potato chips.", "主动", ["主动", "被动"], "Crum 施动"),
        q("Potato chips were invented by mistake.", "被动", ["主动", "被动"], "were invented")
      ]
    },
    page06: {
      quizAff: [
        q("Teenagers ___ to choose their own clothes.", "should be allowed", ["should be allowed", "should allow", "should be allow"], "should be allowed to"),
        q("Homework ___ on time.", "should be finished", ["should be finished", "should finish", "should be finish"], "should be + V3"),
        q("We ___ to take photos in the museum.", "may be allowed", ["may be allowed", "may allow", "may allowed"], "may be allowed to"),
        q("Peter ___ to take the test later.", "should be allowed", ["should be allowed", "should allowed", "should allow"], "should be allowed to"),
        q("The rules ___ by everyone.", "should be followed", ["should be followed", "should follow", "should followed"], "should be followed"),
        q("Smoking ___ in public places.", "should not be allowed", ["should not be allowed", "should not allow", "are not allowed"], "should not be allowed"),
        q("Children ___ to stay up until midnight.", "shouldn't be allowed", ["shouldn't be allowed", "shouldn't allow", "should allowed"], "shouldn't be allowed to"),
        q("The work ___ by noon.", "must be finished", ["must be finished", "must finish", "must be finish"], "must be finished"),
        q("Students ___ to use phones in class.", "shouldn't be allowed", ["shouldn't be allowed", "shouldn't allowed", "should be allowed"], "shouldn't be allowed to"),
        q("Teens ___ to get their ears pierced.", "should be allowed", ["should be allowed", "should allow", "should be allow"], "should be allowed to"),
        q("The report ___ before Friday.", "must be handed in", ["must be handed in", "must hand in", "must be hand in"], "must be handed in"),
        q("Trees ___ on hills.", "should be planted", ["should be planted", "should plant", "should be plant"], "should be planted")
      ],
      quizNeg: [
        q("Sixteen-year-olds ___ to drive.", "shouldn't be allowed", ["shouldn't allow", "shouldn't be allowed", "shouldn't allowed"], "shouldn't be allowed to"),
        q("Students ___ to use phones at night.", "shouldn't be allowed", ["shouldn't be allowed", "shouldn't allowed", "should be allowed"], "shouldn't"),
        q("You ___ to enter without a ticket.", "aren't allowed", ["don't allow", "aren't allowed", "not allow"], "aren't allowed to"),
        q("Children ___ to stay up until midnight.", "shouldn't be allowed", ["shouldn't be allowed", "should allow", "should be allow"], "shouldn't be allowed"),
        q("He ___ to smoke here.", "isn't allowed", ["doesn't allow", "isn't allowed", "not allowed"], "isn't allowed to"),
        q("Smoking ___ in the hospital.", "is not allowed", ["is not allowed", "does not allow", "not is allowed"], "is not allowed"),
        q("Late homework will not ___.","be accepted",["be accepted","accept","be accept"],"will not be accepted"),
        q("Students ___ to cheat in exams.", "must not be allowed", ["must not be allowed", "must not allow", "must not allowed"], "must not be allowed to")
      ],
      quizFix: TIER_D.slice(1, 7),
      quizQuestion: [
        q("___ teenagers be allowed to work on weekends?", "Should", ["Should", "Do", "Are"], "Should 提前"),
        q("___ Peter be allowed to take the test later?", "Should", ["Should", "Do", "Are"], "Should Peter be…"),
        q("正确答句：是的，应该。", "Yes, they should.", ["Yes, they should.", "Yes, they should be.", "Yes, they are allowed should."], "简短回答用 should"),
        q("___ we allowed to take photos here?", "Are", ["Are", "Should", "Do"], "Are we allowed to…?"),
        q("正确疑问：16 岁应被允许开车吗？", "Should sixteen-year-olds be allowed to drive?", ["Should sixteen-year-olds be allowed to drive?", "Do sixteen-year-olds should be allowed to drive?", "Are sixteen-year-olds should allowed to drive?"], "Should … be allowed"),
        q("___ children be allowed to choose clothes?", "Should", ["Should", "Are", "Do"], "Should children be…"),
        q("We ___ to speak in class.", "should be allowed", ["should be allowed", "should allow", "should allowed"], "should be allowed to"),
        q("The rules ___ by all students.", "should be followed", ["should be followed", "should follow", "should followed"], "should be followed")
      ],
      quizListen: [
        ql("Teenagers should be allowed to choose their own clothes.", "Teenagers should be allowed to choose their own clothes.", ["Teenagers should allow to choose their own clothes.", "Teenagers should be allowed to choose their own clothes.", "Teenagers should be allow to choose."], "should be allowed to"),
        ql("Sixteen-year-olds shouldn't be allowed to drive.", "Sixteen-year-olds shouldn't be allowed to drive.", ["Sixteen-year-olds shouldn't allow to drive.", "Sixteen-year-olds shouldn't be allowed to drive.", "Sixteen-year-olds shouldn't be allow to drive."], "shouldn't be allowed"),
        ql("Should teenagers be allowed to work on weekends?", "Should teenagers be allowed to work on weekends?", ["Do teenagers should be allowed to work on weekends?", "Should teenagers be allowed to work on weekends?", "Are teenagers should allowed to work on weekends?"], "Should…be allowed"),
        ql("You aren't allowed to enter without a ticket.", "You aren't allowed to enter without a ticket.", ["You don't allowed to enter without a ticket.", "You aren't allowed to enter without a ticket.", "You aren't allow to enter without a ticket."], "aren't allowed to"),
        ql("We may be allowed to take photos in the museum.", "We may be allowed to take photos in the museum.", ["We may allow to take photos in the museum.", "We may be allowed to take photos in the museum.", "We may be allow to take photos."], "may be allowed to")
      ]
    },
    page07: {
      quizOfFromIn: [
        q("Shirts ___ cotton.", "are made of", ["are made of", "are made from", "are made in"], "of 材质"),
        q("Wine ___ grapes.", "is made from", ["is made from", "is made of", "is made in"], "from 变化"),
        q("They ___ China.", "are made in", ["are made in", "are made of", "are made by"], "in 产地"),
        q("The desk ___ wood.", "is made of", ["is made of", "is made from", "is made in"], "of 可见"),
        q("Paper ___ wood.", "is made from", ["is made from", "is made of", "is made in"], "from"),
        q("Kites ___ paper and bamboo.", "are made of", ["are made of", "are made from", "are made in"], "of"),
        q("The machine was ___ Germany.", "made in", ["made in", "made of", "made from"], "in"),
        q("Tea is grown ___ Hangzhou.", "in", ["in", "of", "by"], "in 地点"),
        q("Are they ___ cotton?", "made of", ["made of", "made from", "made in"], "made of"),
        q("Butter is made ___ milk.", "from", ["from", "of", "in"], "from 变化")
      ],
      quizSentence: TIER_C.slice(2, 10),
      quizFix: TIER_D.slice(0, 6),
      quizMixed: QUIZ_MIX.slice(6, 14),
      quizListen: [
        ql("Are your shirts made of cotton?", "Are your shirts made of cotton?", ["Are your shirts made from cotton?", "Are your shirts made of cotton?", "Are your shirts made in cotton?"], "made of"),
        ql("Wine is made from grapes.", "Wine is made from grapes.", ["Wine is made of grapes.", "Wine is made from grapes.", "Wine is made in grapes."], "made from"),
        ql("They are made in China.", "They are made in China.", ["They are made of China.", "They are made in China.", "They are made from China."], "made in"),
        ql("The desk is made of wood.", "The desk is made of wood.", ["The desk is made from wood.", "The desk is made of wood.", "The desk is made in wood."], "made of"),
        ql("Kites are made of paper and bamboo.", "Kites are made of paper and bamboo.", ["Kites are made in paper.", "Kites are made of paper and bamboo.", "Kites are made from paper only."], "made of")
      ]
    },
    page08: {
      quizFind: [
        q("哪一个是被动语块？", "are made of bamboo", ["make of bamboo", "are made of bamboo", "made of bamboo"], "be + made of"),
        q("哪一个是被动语块？", "is folded before it is cut", ["folds before cut", "is folded before it is cut", "folded before cut"], "工序被动"),
        q("哪一个是被动语块？", "was invented by Bell", ["Bell invented", "was invented by Bell", "invented Bell"], "was invented by"),
        q("哪一个是被动语块？", "were invented by mistake", ["invented by mistake", "were invented by mistake", "invent by mistake"], "were invented"),
        q("哪一个是被动语块？", "should not be allowed to drive", ["should not allow to drive", "should not be allowed to drive", "should not allowed to drive"], "情态被动"),
        q("哪一个是被动语块？", "is badly polluted", ["pollutes badly", "is badly polluted", "badly pollute"], "is polluted"),
        q("哪一个是被动语块？", "should be planted", ["should plant", "should be planted", "should planted"], "should be + V3"),
        q("哪一个是被动语块？", "are sent worldwide", ["send worldwide", "are sent worldwide", "sent worldwide"], "are sent"),
        q("哪一个是被动语块？", "is shaped by hand", ["shapes by hand", "is shaped by hand", "shaped by hand"], "is shaped"),
        q("哪一个是被动语块？", "may be allowed to take photos", ["may allow photos", "may be allowed to take photos", "may allowed to take photos"], "may be allowed to")
      ],
      quizMean: [
        q("made in China 在语篇中表示？", "产地", ["产地", "材料", "发明者"], "在中国制造"),
        q("was invented in 1876 表示？", "发明时间", ["发明时间", "制造材料", "被污染"], "1876 年被发明"),
        q("is badly polluted 表示？", "空气被污染", ["空气被污染", "手工制作", "被运送"], "污染状态"),
        q("should be planted 表示？", "建议植树", ["建议植树", "中国制造", "偶然发明"], "应该被种植"),
        q("are sent all over the world 表示？", "被运往各地", ["被运往各地", "棉制作", "被 Bell 发明"], "are sent"),
        q("invented by mistake 表示？", "偶然发明", ["偶然发明", "产地", "建议公交"], "by mistake"),
        q("made by hand 表示？", "手工制作", ["手工制作", "在中国", "被污染"], "by hand"),
        q("should be used more 表示？", "应多使用（公交）", ["应多使用（公交）", "不应开车", "在 1876 年"], "should be used"),
        q("made of bamboo 表示？", "材料", ["材料", "产地", "发明者"], "made of 材质"),
        q("may be allowed to take photos 表示？", "或许可拍照", ["或许可拍照", "被污染", "偶然发明"], "may be allowed to")
      ],
      quizFix: TIER_D.slice(0, 8),
      quizWhich: [
        q("「Sky lanterns are made of bamboo.」来自？", "传统手工艺", ["传统手工艺", "发明馆", "规则与环保"], "第一篇"),
        q("「Potato chips were invented by mistake.」来自？", "发明馆", ["传统手工艺", "发明馆", "规则与环保"], "第二篇"),
        q("「The air is badly polluted.」来自？", "规则与环保", ["传统手工艺", "发明馆", "规则与环保"], "第三篇"),
        q("「Trees should be planted.」来自？", "规则与环保", ["传统手工艺", "发明馆", "规则与环保"], "环保建议"),
        q("「Paper is folded before it is cut.」来自？", "传统手工艺", ["传统手工艺", "发明馆", "规则与环保"], "剪纸工序"),
        q("「The telephone was invented by Bell.」来自？", "发明馆", ["传统手工艺", "发明馆", "规则与环保"], "发明篇"),
        q("「Clay is shaped by hand.」来自？", "传统手工艺", ["传统手工艺", "发明馆", "规则与环保"], "泥塑"),
        q("「Teens should not be allowed to drive.」来自？", "规则与环保", ["传统手工艺", "发明馆", "规则与环保"], "规则篇"),
        q("「Printing was invented in China.」来自？", "发明馆", ["传统手工艺", "发明馆", "规则与环保"], "印刷术"),
        q("「We may be allowed to take photos.」来自？", "规则与环保", ["传统手工艺", "发明馆", "规则与环保"], "博物馆规则"),
        q("「The bridge will be built next year.」来自？", "将来与完成", ["传统手工艺", "将来与完成", "发明馆"], "第四篇·将来"),
        q("「Homework has been finished.」来自？", "将来与完成", ["传统手工艺", "将来与完成", "发明馆"], "第四篇·完成")
      ]
    },
    page12: {
      quizFuture: TIER_E.slice(0, 10),
      quizWill: [
        q("The bridge ___ next year.", "will be built", ["will be built", "will built", "will be build"], "will be + V3"),
        q("More trees ___ next spring.", "will be planted", ["will be planted", "will plant", "will be plant"], "will be planted"),
        q("The work ___ today.", "won't be finished", ["won't be finished", "will not finish", "won't finish"], "won't be + V3"),
        q("___ English ___ at the ceremony?", "Will … be spoken", ["Will … be spoken", "Will … speak", "Is … spoken"], "Will … be spoken"),
        q("Plastic bags ___ in shops.", "will be banned", ["will be banned", "will ban", "will be ban"], "will be banned"),
        q("Phones ___ in factories.", "will be made", ["will be made", "will make", "will be make"], "will be made"),
        q("The field ___ for the concert.", "will be used", ["will be used", "will use", "will be use"], "will be used"),
        q("Late homework ___ .", "will not be accepted", ["will not be accepted", "will not accept", "will not be accept"], "will not be accepted")
      ],
      quizFutureWhen: [
        q("When ___ the museum ___?", "will … be opened", ["will … be opened", "will … open", "was … opened"], "When will … be opened"),
        q("When ___ the bridge ___?", "will … be built", ["will … be built", "will … build", "was … built"], "When will … be built"),
        q("When ___ more trees ___?", "will … be planted", ["will … be planted", "will … plant", "were … planted"], "When will … be planted"),
        q("When ___ the meeting ___?", "will … be held", ["will … be held", "will … hold", "was … held"], "When will … be held"),
        q("When ___ the school ___?", "will … be opened", ["will … be opened", "will … open", "was … opened"], "When will … be opened"),
        q("When ___ phones ___ in the new factory?", "will … be made", ["will … be made", "will … make", "are … made"], "When will … be made"),
        q("When ___ the sports field ___?", "will … be used", ["will … be used", "will … use", "was … used"], "When will … be used"),
        q("When ___ plastic bags ___?", "will … be banned", ["will … be banned", "will … ban", "were … banned"], "When will … be banned")
      ],
      quizFutureFix: [
        q("哪句正确？", "The bridge will be built next year.", ["The bridge will built next year.", "The bridge will be built next year.", "The bridge will be build next year."], "will be + V3"),
        q("哪句正确？", "More trees will be planted.", ["More trees will plant.", "More trees will be planted.", "More trees will be plant."], "will be planted"),
        q("哪句正确？", "Will the meeting be held on Friday?", ["Will the meeting held on Friday?", "Will the meeting be held on Friday?", "Will the meeting be hold on Friday?"], "Will + be + done"),
        q("哪句正确？", "The work won't be finished today.", ["The work won't finish today.", "The work won't be finished today.", "The work won't be finish today."], "won't be + V3"),
        q("哪句正确？", "When will the new school be opened?", ["When will the new school opened?", "When will the new school be opened?", "When will the new school be open?"], "When will … be opened"),
        q("哪句正确？", "Homework will not be accepted late.", ["Homework will not accept late.", "Homework will not be accepted late.", "Homework will not be accept late."], "will not be accepted")
      ],
      quizFutureListen: [
        ql("The bridge will be built next year.", "The bridge will be built next year.", ["They will build the bridge next year.", "The bridge will be built next year.", "The bridge will built next year."], "will be built"),
        ql("More trees will be planted next spring.", "More trees will be planted next spring.", ["We will plant more trees.", "More trees will be planted next spring.", "More trees will plant next spring."], "will be planted"),
        ql("The work won't be finished today.", "The work won't be finished today.", ["The work won't finish today.", "The work won't be finished today.", "The work won't be finish today."], "won't be finished"),
        ql("When will the new museum be opened?", "When will the new museum be opened?", ["When will the new museum open?", "When will the new museum be opened?", "When was the new museum opened?"], "When will … be opened"),
        ql("Plastic bags will be banned in shops.", "Plastic bags will be banned in shops.", ["Shops will ban plastic bags.", "Plastic bags will be banned in shops.", "Plastic bags will ban in shops."], "will be banned")
      ],
      quizPerfect: TIER_F.slice(0, 10),
      quizPerfectAdv: [
        q("Homework has ___ .", "been finished", ["been finished", "been finish", "finished"], "has been finished"),
        q("The work has not ___ yet.", "been finished", ["been finished", "finished", "been finish"], "has not been finished yet"),
        q("The letter has ___ sent.", "already been", ["already been", "been already", "already be"], "has already been sent"),
        q("___ the classroom ___ yet?", "Has … been cleaned", ["Has … been cleaned", "Has … cleaned", "Have … been cleaned"], "Has … been cleaned"),
        q("Many trees ___ this year.", "have been planted", ["have been planted", "have planted", "has been planted"], "have been planted"),
        q("The film ___ before.", "has been seen", ["has been seen", "has saw", "has been saw"], "has been seen"),
        q("The museum ___ yet.", "hasn't been opened", ["hasn't been opened", "hasn't opened", "hasn't been open"], "hasn't been opened yet"),
        q("How many phones ___ this year?", "have been made", ["have been made", "have made", "has been made"], "have been made")
      ],
      quizPerfectFix: [
        q("哪句正确？", "Homework has been finished.", ["Homework has been finish.", "Homework has been finished.", "Homework has finished."], "has been + V3"),
        q("哪句正确？", "The work has not been finished yet.", ["The work has not finished yet.", "The work has not been finished yet.", "The work has not been finish yet."], "has not been finished yet"),
        q("哪句正确？", "Has the homework been finished yet?", ["Has the homework finished yet?", "Has the homework been finished yet?", "Has the homework been finish yet?"], "Has + been + done"),
        q("哪句正确？", "Many trees have been planted.", ["Many trees have planted.", "Many trees have been planted.", "Many trees has been planted."], "have been planted"),
        q("哪句正确？", "The letter has already been sent.", ["The letter has already sent.", "The letter has already been sent.", "The letter has already been send."], "has already been sent"),
        q("哪句正确？", "English has been spoken here for years.", ["English has spoken here for years.", "English has been spoken here for years.", "English have been spoken here for years."], "has been spoken")
      ],
      quizCompete: TIER_E.slice(4, 8).concat(TIER_F.slice(4, 8)).concat([
        q("竞赛：The bridge ___ next year.", "will be built", ["will be built", "was built", "has been built"], "将来 will be"),
        q("竞赛：Homework ___ .", "has been finished", ["has been finished", "will be finished", "was finished"], "完成 has been")
      ])
    }
  };

  PAGE_QUIZZES.page05.quizWas = PAGE_QUIZZES.page05.quizWasWere;
  PAGE_QUIZZES.page07.quizFill = PAGE_QUIZZES.page07.quizOfFromIn;

  PAGE_QUIZZES.page04.quizListen = [
    ql("The zipper was invented by Whitcomb Judson.", "The zipper was invented by Whitcomb Judson.", ["The zipper was invented in Judson.", "The zipper was invented by Whitcomb Judson.", "The zipper invented Judson."], "by Judson"),
    ql("Tea is grown in Hangzhou.", "Tea is grown in Hangzhou.", ["Tea is grown by Hangzhou.", "Tea is grown in Hangzhou.", "Tea is grown by people."], "in Hangzhou"),
    ql("The telephone was invented in 1876.", "The telephone was invented in 1876.", ["The telephone was invented by 1876.", "The telephone was invented in 1876.", "The telephone invented 1876."], "in 1876"),
    ql("The tea was picked by hand.", "The tea was picked by hand.", ["The tea was picked in hand.", "The tea was picked by hand.", "The tea picked by hand."], "by hand"),
    ql("Shirts are made in China.", "Shirts are made in China.", ["Shirts are made by China.", "Shirts are made in China.", "Shirts made in China."], "made in China")
  ];

  PAGE_QUIZZES.page08.quizListen = [
    ql("Sky lanterns are made of bamboo.", "Sky lanterns are made of bamboo.", ["Workers make sky lanterns.", "Sky lanterns are made of bamboo.", "Sky lanterns make bamboo."], "craft"),
    ql("Potato chips were invented by mistake.", "Potato chips were invented by mistake.", ["George Crum invented chips.", "Potato chips were invented by mistake.", "Potato chips was invented."], "invent"),
    ql("Teenagers should be allowed to choose clothes.", "Teenagers should be allowed to choose their own clothes.", ["Teenagers should allow clothes.", "Teenagers should be allowed to choose their own clothes.", "Teenagers should be allow."], "rules"),
    ql("The air is badly polluted in big cities.", "The air is badly polluted in big cities.", ["People pollute air.", "The air is badly polluted in big cities.", "The air badly pollutes."], "environment"),
    ql("Mobile phones are made in factories.", "Mobile phones are made in factories.", ["They make phones.", "Mobile phones are made in factories.", "Mobile phones is made."], "tech")
  ];

  var PAGE10 = {
    formQuiz: TIER_A.slice(0, 10),
    transQuiz: TIER_B.slice(0, 12),
    byQuiz: PAGE_QUIZZES.page04.quizFill,
    modQuiz: PAGE_QUIZZES.page06.quizAff.slice(0, 8),
    madeQuiz: PAGE_QUIZZES.page07.quizOfFromIn,
    mixQuiz: QUIZ_MIX.slice(0, 12),
    futureQuiz: TIER_E.slice(0, 10),
    perfectQuiz: TIER_F.slice(0, 8)
  };

  var PAGES = {
    page01: {
      scenes: [
        { tag: "天灯·工艺", img: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L14/assets/img/l14-p01-scene-sky-lanterns.png", zh: "节日夜空：天灯由竹子和纸制成。", sound: "Sky lanterns are made of bamboo and covered with paper.", en: "Sky lanterns are made of bamboo and covered with paper." },
        { tag: "银戒·产地", img: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L14/assets/img/l14-p01-scene-silver-ring.png", zh: "泰国商店：银戒在泰国制造。", sound: "This ring is made of silver. It was made in Thailand.", en: "This ring is made of silver and was made in Thailand." },
        { tag: "剪纸·工序", img: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L14/assets/img/l14-p01-scene-paper-cut.png", zh: "红纸先被折好，再被剪出图案。", sound: "Paper is folded before it is cut with scissors.", en: "Paper is folded before it is cut with scissors." },
        { tag: "薯片·偶然", img: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L14/assets/img/l14-p01-scene-potato-chips.png", zh: "1853 年：薯片被偶然发明。", sound: "Potato chips were invented by mistake in eighteen fifty-three.", en: "Potato chips were invented by mistake in 1853." },
        { tag: "电话·发明", img: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L14/assets/img/l14-p01-scene-telephone.png", zh: "1876 年：电话被贝尔发明。", sound: "The telephone was invented by Alexander Graham Bell in eighteen seventy-six.", en: "The telephone was invented by Alexander Graham Bell in 1876." },
        { tag: "规则·允许", img: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L14/assets/img/l14-p01-scene-museum-photos.png", zh: "博物馆里或许可被允许拍照。", sound: "We may be allowed to take photos in the museum.", en: "We may be allowed to take photos in the museum." },
        { tag: "环保·污染", img: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L14/assets/img/l14-p01-scene-air-pollution.png", zh: "大城市空气被严重污染。", sound: "The air is badly polluted in big cities.", en: "The air is badly polluted in big cities." },
        { tag: "手机·工厂", img: "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L14/assets/img/l14-p01-scene-mobile-factory.png", zh: "手机在工厂里被大量制造。", sound: "Mobile phones are made in factories and sent worldwide.", en: "Mobile phones are made in factories." }
      ],
      insights: [
        { q: "Sky lanterns are made of bamboo.", a: "天灯承受「被制成」→ 强调材质与工艺。" },
        { q: "This ring was made in Thailand.", a: "强调产地，不必先说工匠。" },
        { q: "Potato chips were invented by mistake.", a: "薯片承受「被发明」→ 过去被动 were invented。" },
        { q: "We may be allowed to take photos.", a: "我们承受「被允许」→ may be allowed to。" },
        { q: "The air is badly polluted.", a: "空气承受「被污染」→ 环保报道常用被动。" },
        { q: "Paper is folded before it is cut.", a: "工序链：先被折，再被剪。" }
      ],
      socratic: [
        { q: "Paper is folded before it is cut. 动作发生在谁身上？", opts: ["剪刀", "纸", "人"], ans: "纸", fb: "fold / cut 落在 paper 上。" },
        { q: "Potato chips were invented by mistake. 哪句主语是承受者？", opts: ["George invented chips.", "Potato chips were invented."], ans: "Potato chips were invented.", fb: "被动让 chips 作主语。" },
        { q: "被动句常想强调什么？", opts: ["谁施动", "承受者/结果/地点", "将来计划"], ans: "承受者/结果/地点", fb: "如 was made in Thailand 强调产地。" }
      ],
      lab: [
        { parts: ["Sky lanterns", "___", "made of bamboo."], receiver: "are", agent: "—", fb: "✓ 复数 → are made。" },
        { parts: ["The telephone", "___", "invented in 1876."], receiver: "was", agent: "—", fb: "✓ was + invented。" },
        { parts: ["We may", "___", "allowed to take photos."], receiver: "be", agent: "—", fb: "✓ may be allowed to。" },
        { parts: ["Potato chips", "___", "invented by mistake."], receiver: "were", agent: "—", fb: "✓ 复数 → were invented。" }
      ],
      compare: [
        { active: "Workers make sky lanterns.", passive: "Sky lanterns are made of bamboo.", note: "强调制品与材料" },
        { active: "Bell invented the telephone.", passive: "The telephone was invented by Bell.", note: "by + 发明者" },
        { active: "George Crum invented potato chips.", passive: "Potato chips were invented by mistake.", note: "强调偶然发明" },
        { active: "They fold paper before cutting.", passive: "Paper is folded before it is cut.", note: "工序被动" },
        { active: "The museum allows us to take photos.", passive: "We may be allowed to take photos in the museum.", note: "情态被动" },
        { active: "They will build the bridge next year.", passive: "The bridge will be built next year.", note: "将来被动 will be + V3" },
        { active: "They have finished the homework.", passive: "Homework has been finished.", note: "完成被动 has been + V3" }
      ],
      passiveFormMatrix: [
        {
          id: "present",
          label: "一般现在被动",
          formula: "am / is / are + 过去分词 (V3)",
          beHint: "be 随主语：I am · he/she/it 单数 is · you/we/they 复数 are",
          forms: [
            { kind: "肯定句", structure: "主语 + am/is/are + 过去分词", zh: "……被……（强调承受者/结果）", en: "Sky lanterns are made of bamboo." },
            { kind: "否定句", structure: "主语 + am/is/are + not + 过去分词", zh: "……不被……", en: "Kites are not made of plastic." },
            { kind: "一般疑问句", structure: "Am/Is/Are + 主语 + 过去分词 ?", zh: "……被……吗？", en: "Are mobile phones made in factories?" },
            { kind: "特殊疑问句", structure: "疑问词 + am/is/are + 主语 + 过去分词 ?", zh: "什么/哪里/怎样被……？", en: "What are sky lanterns made of?" }
          ]
        },
        {
          id: "past",
          label: "一般过去被动",
          formula: "was / were + 过去分词 (V3)",
          beHint: "单数/不可数 was · 复数 were",
          forms: [
            { kind: "肯定句", structure: "主语 + was/were + 过去分词", zh: "……过去被……", en: "The telephone was invented in 1876." },
            { kind: "否定句", structure: "主语 + was/were + not + 过去分词", zh: "……过去没有被……", en: "The bridge was not built last year." },
            { kind: "一般疑问句", structure: "Was/Were + 主语 + 过去分词 ?", zh: "……过去被……吗？", en: "Was the telephone invented in 1876?" },
            { kind: "特殊疑问句", structure: "疑问词 + was/were + 主语 + 过去分词 ?", zh: "何时/何地/如何被……？", en: "When was the telephone invented?" }
          ]
        },
        {
          id: "future",
          label: "一般将来被动",
          formula: "will be + 过去分词 (V3)",
          beHint: "will + be + done · 也可用 be going to be + done（拓展）",
          forms: [
            { kind: "肯定句", structure: "主语 + will be + 过去分词", zh: "……将被……（将来）", en: "The bridge will be built next year." },
            { kind: "否定句", structure: "主语 + will not (won't) be + 过去分词", zh: "……将不会被……", en: "The work won't be finished today." },
            { kind: "一般疑问句", structure: "Will + 主语 + be + 过去分词 ?", zh: "……将被……吗？", en: "Will more trees be planted next spring?" },
            { kind: "特殊疑问句", structure: "疑问词 + will + 主语 + be + 过去分词 ?", zh: "何时/何地将被……？", en: "When will the new school be opened?" }
          ]
        },
        {
          id: "present-perfect",
          label: "现在完成被动",
          formula: "have / has + been + 过去分词 (V3)",
          beHint: "have/has + been + done · 单数/不可数 has · 复数 have（拓展预习）",
          forms: [
            { kind: "肯定句", structure: "主语 + have/has + been + 过去分词", zh: "……已经被……（与现在有联系）", en: "Homework has been finished." },
            { kind: "否定句", structure: "主语 + have/has + not + been + 过去分词", zh: "……还没有被……", en: "The work has not been finished yet." },
            { kind: "一般疑问句", structure: "Have/Has + 主语 + been + 过去分词 ?", zh: "……已经被……了吗？", en: "Has the homework been finished yet?" },
            { kind: "特殊疑问句", structure: "疑问词 + have/has + 主语 + been + 过去分词 ?", zh: "多少/多久已经被……？", en: "How many mobile phones have been made this year?" }
          ]
        },
        {
          id: "modal",
          label: "情态被动",
          formula: "情态动词 + be + 过去分词 (+ to …)",
          beHint: "常见：should / may / can + be + done",
          forms: [
            { kind: "肯定句", structure: "主语 + 情态 + be + 过去分词 (+ to …)", zh: "……应该/可以/能够被……", en: "Teenagers should be allowed to choose their own clothes." },
            { kind: "否定句", structure: "主语 + 情态 + not + be + 过去分词", zh: "……不应该/不能被……", en: "Sixteen-year-olds should not be allowed to drive." },
            { kind: "一般疑问句", structure: "情态 + 主语 + be + 过去分词 ?", zh: "……应该/可以被……吗？", en: "Should teenagers be allowed to choose clothes?" },
            { kind: "特殊疑问句", structure: "疑问词 + 情态 + 主语 + be + 过去分词 ?", zh: "谁/何时应该被……？", en: "When may we be allowed to take photos in the museum?" }
          ]
        }
      ],
      quizReceiver: [
        { stem: "Sky lanterns are made of bamboo. 承受者是？", ans: "Sky lanterns", opts: ["bamboo", "Sky lanterns", "paper"], fb: "天灯承受被制作。" },
        { stem: "Potato chips were invented by mistake. 承受者是？", ans: "Potato chips", opts: ["George Crum", "Potato chips", "mistake"], fb: "薯片承受被发明。" },
        { stem: "The telephone was invented in 1876. 承受者是？", ans: "The telephone", opts: ["Bell", "The telephone", "1876"], fb: "电话承受被发明。" },
        { stem: "Paper is cut with scissors. 承受者是？", ans: "Paper", opts: ["scissors", "Paper", "people"], fb: "纸承受被剪。" },
        { stem: "The air is badly polluted. 承受者是？", ans: "The air", opts: ["cities", "people", "The air"], fb: "空气承受被污染。" },
        { stem: "Mobile phones are made in factories. 承受者是？", ans: "Mobile phones", opts: ["factories", "Mobile phones", "workers"], fb: "手机承受被制造。" },
        { stem: "This ring was made in Thailand. 承受者是？", ans: "This ring", opts: ["silver", "This ring", "Thailand"], fb: "戒指承受被制造。" },
        { stem: "Trees should be planted on hills. 承受者是？", ans: "Trees", opts: ["hills", "Trees", "people"], fb: "树承受被种植。" }
      ],
      quizVoice: [
        { stem: "Workers shape clay by hand.", ans: "主动", opts: ["主动", "被动"], fb: "Workers 施动。" },
        { stem: "Clay is shaped by hand.", ans: "被动", opts: ["主动", "被动"], fb: "is shaped。" },
        { stem: "They make mobile phones.", ans: "主动", opts: ["主动", "被动"], fb: "They 施动。" },
        { stem: "Mobile phones are made in factories.", ans: "被动", opts: ["主动", "被动"], fb: "are made。" },
        { stem: "Potato chips were invented by mistake.", ans: "被动", opts: ["主动", "被动"], fb: "were invented。" },
        { stem: "We may be allowed to take photos.", ans: "被动", opts: ["主动", "被动"], fb: "may be allowed to。" }
      ],
      traps: [
        { wrong: "Sky lanterns is made of bamboo.", right: "Sky lanterns are made of bamboo.", note: "复数 → are。" },
        { wrong: "Potato chips was invented by mistake.", right: "Potato chips were invented by mistake.", note: "chips 复数 → were。" },
        { wrong: "The telephone was invent in 1876.", right: "The telephone was invented in 1876.", note: "invent → invented。" },
        { wrong: "We may allowed to take photos.", right: "We may be allowed to take photos.", note: "may be allowed to。" },
        { wrong: "Paper are folded before it is cut.", right: "Paper is folded before it is cut.", note: "paper 不可数 → is。" }
      ],
      corpus: CORPUS_TABLE
    },
    page12: {
      goals: [
        "掌握一般将来被动：will be + 过去分词",
        "会问会答：When will … be …?",
        "掌握现在完成被动：have/has been + 过去分词",
        "会用 already / yet / not yet",
        "六种测验 + 抢答竞赛",
        "进入分层练习场 Page 09"
      ],
      socraticFuture: [
        { q: "The bridge ___ next year.", opts: ["will be built", "was built", "has been built"], ans: "will be built", fb: "next year → 将来 will be + V3。" },
        { q: "The work ___ today.", opts: ["won't be finished", "wasn't finished", "hasn't finished"], ans: "won't be finished", fb: "won't be + done。" },
        { q: "When ___ the museum ___?", opts: ["will … be opened", "was … opened", "is … opened"], ans: "will … be opened", fb: "When will + 主语 + be + done?" }
      ],
      socraticPerfect: [
        { q: "Homework ___ .", opts: ["has been finished", "has finished", "was finished"], ans: "has been finished", fb: "has been + V3。" },
        { q: "The work has not ___ yet.", opts: ["been finished", "finished", "been finish"], ans: "been finished", fb: "has not been finished yet。" },
        { q: "Many trees ___ this year.", opts: ["have been planted", "have planted", "has been planted"], ans: "have been planted", fb: "trees 复数 → have been planted。" }
      ],
      willRows: [
        { subj: "肯定", be: "will be + V3", ex: "The bridge will be built next year." },
        { subj: "否定", be: "won't be + V3", ex: "The work won't be finished today." },
        { subj: "疑问", be: "Will + 主语 + be + V3 ?", ex: "Will more trees be planted?" },
        { subj: "When", be: "When will + 主语 + be + V3 ?", ex: "When will the new school be opened?" }
      ],
      perfectRows: [
        { subj: "I / he / she / it / 单数", be: "has been", ex: "Homework has been finished." },
        { subj: "you / we / they / 复数", be: "have been", ex: "Many trees have been planted." },
        { subj: "already", be: "has/have already been + V3", ex: "The letter has already been sent." },
        { subj: "yet / not yet", be: "has/have not been + V3 yet", ex: "The work has not been finished yet." }
      ],
      whenWillItems: [
        { q: "When will the bridge be built?", a: "It will be built next year.", zh: "桥 · 明年" },
        { q: "When will more trees be planted?", a: "They will be planted next spring.", zh: "树 · 明年春" },
        { q: "When will the new school be opened?", a: "It will be opened in September.", zh: "新校 · 九月" },
        { q: "When will the meeting be held?", a: "It will be held on Friday.", zh: "会议 · 周五" },
        { q: "When will plastic bags be banned?", a: "They will be banned next month.", zh: "塑料袋 · 下月" },
        { q: "When will the sports field be used?", a: "It will be used for the concert.", zh: "操场 · 音乐会" }
      ],
      futureRead: BANK.future,
      perfectRead: BANK.perfect,
      traps: [
        { wrong: "The bridge will built next year.", right: "The bridge will be built next year.", note: "will 后要有 be + V3。" },
        { wrong: "More trees will plant next spring.", right: "More trees will be planted next spring.", note: "承受者作主语 → will be planted。" },
        { wrong: "When will the museum opened?", right: "When will the museum be opened?", note: "will 后接 be + done。" },
        { wrong: "Homework has been finish.", right: "Homework has been finished.", note: "has been + 过去分词。" },
        { wrong: "The work has not finished yet.", right: "The work has not been finished yet.", note: "要用 been，不是原形 finish。" },
        { wrong: "Many trees has been planted.", right: "Many trees have been planted.", note: "trees 复数 → have been。" },
        { wrong: "The bridge was built next year.", right: "The bridge will be built next year.", note: "next year → 将来，不是 was。" },
        { wrong: "Homework has finished.", right: "Homework has been finished.", note: "作业是承受者 → has been finished。" }
      ],
      summaryChips: ["will be + done", "won't be + done", "When will … be …?", "has/has been + done", "already / yet", "have vs has"],
      checklist: [
        "我会写：will be / won't be + V3",
        "我会问：When will … be …?",
        "我会写：has/have been + V3",
        "我会用 already / yet",
        "我完成六种测验与抢答"
      ],
      corpus: [
        ["将来", "will be built", "工程·校园"],
        ["将来", "When will … be opened?", "问时间"],
        ["完成", "has been finished", "作业·结果"],
        ["完成", "have been planted", "环保·复数"],
        ["对比", "was → will → has been", "三时态被动"],
        ["易错", "will be / has been", "漏 be"],
        ["易错", "have vs has", "主语一致"],
        ["Page 09", "E/F 分层", "巩固练习"]
      ]
    }
  };

  if (PAGES.page01 && PAGE_QUIZZES.page02) {
    PAGES.page01.quizListen = PAGE_QUIZZES.page02.quizListen;
  }

  function getPage(pageId, overrides) {
    var base = PAGES[pageId] || {};
    var merged = Object.assign({}, base, overrides || {});
    var quizzes = PAGE_QUIZZES[pageId];
    if (quizzes) {
      Object.assign(merged, quizzes);
    }
    return merged;
  }

  function enrichPageQuizzes(pageId, localP14) {
    var out = Object.assign({}, localP14 || {});
    var quizzes = PAGE_QUIZZES[pageId];
    if (quizzes) {
      Object.assign(out, quizzes);
    }
    return out;
  }

  function getPage10() {
    return PAGE10;
  }

  function getPage12(overrides) {
    return getPage("page12", overrides);
  }

  function sliceTier(tier, count, offset) {
    var pool =
      tier === "A" ? TIER_A
      : tier === "B" ? TIER_B
      : tier === "C" ? TIER_C
      : tier === "D" ? TIER_D
      : tier === "E" ? TIER_E
      : tier === "F" ? TIER_F
      : QUIZ_MIX;
    var off = offset || 0;
    var n = count || pool.length;
    return pool.slice(off, off + n);
  }

  global.L14Corpus = {
    version: VERSION,
    BANK: BANK,
    CORPUS_TABLE: CORPUS_TABLE,
    TIER_A: TIER_A,
    TIER_B: TIER_B,
    TIER_C: TIER_C,
    TIER_D: TIER_D,
    TIER_E: TIER_E,
    TIER_F: TIER_F,
    QUIZ_MIX: QUIZ_MIX,
    PAGE_QUIZZES: PAGE_QUIZZES,
    PAGE10: PAGE10,
    PAGES: PAGES,
    getPage: getPage,
    enrichPageQuizzes: enrichPageQuizzes,
    getPage10: getPage10,
    getPage12: getPage12,
    sliceTier: sliceTier
  };
})(typeof window !== "undefined" ? window : this);
