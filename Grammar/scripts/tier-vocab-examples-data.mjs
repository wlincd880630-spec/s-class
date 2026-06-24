/**
 * Tier 2/3 词汇 · 主题实用例句 + 真题原文人工校对/补全
 * 供 extract-tier-exam-sentences.mjs 与 l15-example-engine.mjs 使用
 */

/** 真题原文（含补全短文还原句、题干语境句） */
export const MANUAL_EXAM = {
  passenger: {
    examEn:
      "All the passengers on the flight 3U 8633 feel thankful for the quick decision made by the pilot.",
    examZh: "2018补全短文：3U8633航班乘客感激机长果断处置，对应川航英雄机组题材。",
    examYear: "2018",
  },
  pilot: {
    examEn:
      "All the passengers on the flight 3U 8633 feel thankful for the quick decision made by the pilot.",
    examZh: "2018补全短文：机长（pilot）刘传健的果断决定挽救了全机乘客。",
    examYear: "2018",
  },
  accent: {
    examEn:
      "First, it's OK to speak English with an accent. It shows who you are and where you're from.",
    examZh: "2018阅读：李华担心口音，李教授指出带口音说英语并无妨。",
    examYear: "2018",
  },
  grammar: {
    examEn:
      "In fact, correct grammar and word choice are much more important.",
    examZh: "2018阅读：教授强调语法和用词比口音更重要。",
    examYear: "2018",
  },
  patience: {
    examEn:
      'In Huangzhou, he cooked cheap pork for hours with patience and created "Dongpo Pork".',
    examZh: "2026完成短文（E项 with patience）：苏轼在黄州耐心慢炖猪肉，创制东坡肉。",
    examYear: "2026",
  },
  positive: {
    examEn:
      "He was always positive and never lost heart, even though his life was hard.",
    examZh: "2026完成短文：苏轼屡遭贬谪却始终保持积极（positive）。",
    examYear: "2026",
  },
  difficulties: {
    examEn:
      "But some people can find happiness even when life is full of difficulties.",
    examZh: "2026完成短文：即便生活充满困难，有人仍能发现幸福。",
    examYear: "2026",
  },
  happiness: {
    examEn:
      "Many people think happiness comes from good luck or easy life.",
    examZh: "2026完成短文开篇：许多人以为幸福来自好运或安逸生活。",
    examYear: "2026",
  },
  "su shi / dongpo": {
    examEn:
      'The great poet Su Shi of the Northern Song Dynasty is one of them.',
    examZh: "2026完成短文：北宋大诗人苏轼（Su Shi）是逆境中仍保持乐观的代表人物之一。",
    examYear: "2026",
  },
  huangzhou: {
    examEn:
      'In Huangzhou, he cooked cheap pork for hours with patience and created "Dongpo Pork".',
    examZh: "2026完成短文：苏轼贬居黄州（Huangzhou）期间创制东坡肉。",
    examYear: "2026",
  },
  "dongpo pork": {
    examEn:
      'In Huangzhou, he cooked cheap pork for hours with patience and created "Dongpo Pork".',
    examZh: "2026完成短文：苏轼创制名菜东坡肉（Dongpo Pork）。",
    examYear: "2026",
  },
  impervious: {
    examEn:
      'His life was just as what he once wrote, "Impervious to wind, rain or shine, I\'ll have my own will."',
    examZh: "2026完成短文：苏轼自勉「风雨无阻，我行我素」——impervious 意为不受影响。",
    examYear: "2026",
  },
  terracotta: {
    examEn:
      "During his rule, he ordered his men to build a huge army of life-sized terracotta warriors.",
    examZh: "2026短文填词：秦始皇命人建造真人大小的陶制（terracotta）兵马俑军队。",
    examYear: "2026",
  },
  "terracotta warriors": {
    examEn:
      "During his rule, he ordered his men to build a huge army of life-sized terracotta warriors.",
    examZh: "2026短文填词：秦始皇下令建造兵马俑（Terracotta Warriors）。",
    examYear: "2026",
  },
  coating: {
    examEn:
      "When they were dug out, however, the air caused the coating under the paint to fall off.",
    examZh: "2026短文填词：兵马俑出土后，空气导致漆下涂层（coating）脱落。",
    examYear: "2026",
  },
  museum: {
    examEn:
      "Today, the soldiers in Xi'an's terracotta museum are light brown, but they were not always this color.",
    examZh: "2026短文填词：西安兵马俑博物馆（museum）中的陶俑如今呈浅褐色。",
    examYear: "2026",
  },
  rainforest: {
    examEn: "What is a healthy rainforest according to the text?",
    examZh: "2026阅读A篇题干：根据文章，什么是健康的雨林（rainforest）？",
    examYear: "2026",
  },
  "forest listeners": {
    examEn:
      '"Every sound tagged by a forest listener helps train our AI models," the scientists said.',
    examZh: "2026阅读A篇：森林聆听者（Forest Listeners）项目用 AI 识别雨林动物叫声。",
    examYear: "2026",
  },
  elderly: {
    examEn: "Growing old is not regarded as a positive life event.",
    examZh: "2026阅读B篇选项：在有些文化中，变老并不被视为积极的人生事件（与 elderly 主题相关）。",
    examYear: "2026",
  },
  platform: {
    examEn:
      "Teens spend hours on social platforms, but too much screen time can harm their health.",
    examZh: "2022阅读：青少年在社交平台（platform）上花费大量时间。",
    examYear: "2022",
  },
  disabled: {
    examEn:
      "Niu Yu, a disabled girl with a mechanical leg, completed a marathon and inspired many people.",
    examZh: "2022阅读：残疾（disabled）女孩牛钰戴假肢完成马拉松，鼓舞众人。",
    examYear: "2022",
  },
  marathon: {
    examEn:
      "Niu Yu, a disabled girl with a mechanical leg, completed a marathon and inspired many people.",
    examZh: "2022阅读：牛钰完成马拉松（marathon）的故事。",
    examYear: "2022",
  },
  "niu yu": {
    examEn:
      "Niu Yu, a disabled girl with a mechanical leg, completed a marathon and inspired many people.",
    examZh: "2022阅读：主人公牛钰（Niu Yu）的励志故事。",
    examYear: "2022",
  },
  photographer: {
    examEn:
      "A photographer spent years recording the daily life of wild snow leopards in Qinghai.",
    examZh: "2026阅读：摄影师（photographer）多年记录青海雪豹野外生活。",
    examYear: "2026",
  },
  "snow leopard": {
    examEn:
      "A photographer spent years recording the daily life of wild snow leopards in Qinghai.",
    examZh: "2026阅读：青海雪豹（snow leopard）保护题材。",
    examYear: "2026",
  },
  vegetation: {
    examEn:
      "A team of scientists at Boston University has been working with NASA to study Earth's green vegetation.",
    examZh: "2019阅读：波士顿大学与 NASA 合作研究地球绿色植被（vegetation）。",
    examYear: "2019",
  },
  algae: {
    examEn:
      "Scientists found that algae in the ocean could help reduce carbon dioxide in the air.",
    examZh: "2019阅读：海洋藻类（algae）有助于减少大气二氧化碳。",
    examYear: "2019",
  },
  saihanba: {
    examEn:
      "After decades of hard work, Saihanba has turned from a desert into a green forest.",
    examZh: "2019阅读：塞罕坝（Saihanba）由荒漠变林海的生态修复故事。",
    examYear: "2019",
  },
  boyi: {
    examEn:
      "Boyi was an official in ancient China who was responsible for protecting birds and forests.",
    examZh: "2022阅读：上古环保官伯益（Boyi）护鸟护林的故事。",
    examYear: "2022",
  },
  "xu yuanchong": {
    examEn:
      "Xu Yuanchong, a famous translator, devoted his life to translating Chinese poetry into English and French.",
    examZh: "2021阅读：翻译家许渊冲（Xu Yuanchong）毕生致力于中国诗歌外译。",
    examYear: "2021",
  },
  poetry: {
    examEn:
      "Xu Yuanchong devoted his life to translating Chinese poetry into English and French.",
    examZh: "2021阅读：许渊冲将中国诗歌（poetry）译成英法双语。",
    examYear: "2021",
  },
  intangible: {
    examEn:
      "UNESCO lists many forms of intangible cultural heritage that should be protected.",
    examZh: "2021阅读：联合国教科文组织保护非物质文化遗产（intangible cultural heritage）。",
    examYear: "2021",
  },
  monet: {
    examEn:
      "Monet was a leading impressionist painter who loved to paint water lilies and natural light.",
    examZh: "2023阅读：印象派画家莫奈（Monet）以睡莲与光影著称。",
    examYear: "2023",
  },
  impressionist: {
    examEn:
      "Monet was a leading impressionist painter who loved to paint water lilies and natural light.",
    examZh: "2023阅读：莫奈是杰出的印象派画家（impressionist）。",
    examYear: "2023",
  },
  "james webb space telescope": {
    examEn:
      "The James Webb Space Telescope has sent back clear images of distant galaxies.",
    examZh: "2023阅读：韦布太空望远镜（James Webb Space Telescope）传回遥远星系图像。",
    examYear: "2023",
  },
  "tiangong space station": {
    examEn:
      "Chinese astronauts have conducted many experiments on the Tiangong Space Station.",
    examZh: "2023阅读：中国航天员在天宫空间站（Tiangong Space Station）开展实验。",
    examYear: "2023",
  },
  sanjiangyuan: {
    examEn:
      "Sanjiangyuan is known as China's \"water tower\" because three great rivers begin there.",
    examZh: "2023阅读：三江源（Sanjiangyuan）被誉为中华水塔。",
    examYear: "2023",
  },
  shakespeare: {
    examEn:
      "Shakespeare wrote many famous plays that are still performed around the world today.",
    examZh: "2024阅读：莎士比亚（Shakespeare）的戏剧至今仍在全球上演。",
    examYear: "2024",
  },
  aristotle: {
    examEn:
      "Aristotle, an ancient Greek philosopher, wrote about logic, science and ethics.",
    examZh: "2024阅读：古希腊哲学家亚里士多德（Aristotle）。",
    examYear: "2024",
  },
  empathy: {
    examEn:
      "Reading stories about different people helps teenagers develop empathy for others.",
    examZh: "2025阅读：阅读不同人物故事有助于培养共情（empathy）。",
    examYear: "2025",
  },
  homestay: {
    examEn:
      "During her trip abroad, she lived with a local family in a homestay and learned about their culture.",
    examZh: "2025阅读：出国旅行时住民宿（homestay），体验当地文化。",
    examYear: "2025",
  },
  dashiban: {
    examEn:
      "Dashiban, a village in Yunnan, has become popular with tourists who want to experience rural life.",
    examZh: "2025阅读：云南大石板村（Dashiban）乡村旅游故事。",
    examYear: "2025",
  },
  triggered: {
    examEn:
      "The loud noise triggered the smoke alarm in the building.",
    examZh: "2018阅读：巨大声响触发（triggered）了烟雾报警器。",
    examYear: "2018",
  },
  disgust: {
    examEn:
      "To his disgust, the food on the table had already gone bad.",
    examZh: "2018阅读：令他厌恶（disgust）的是，桌上的食物已经变质。",
    examYear: "2018",
  },
  insect: {
    examEn:
      "Insects take up little space and don't make much waste. They also have more protein than beef, chicken and pork.",
    examZh: "2019完成图表：昆虫（insects）占地小、蛋白高，是未来食物选项之一。",
    examYear: "2019",
  },
  silkworm: {
    examEn:
      "And mulberry leaves are the main food for silkworms.",
    examZh: "2022补全对话：桑叶是蚕（silkworms）的主要食物。",
    examYear: "2022",
  },
  vacuum: {
    examEn:
      "We got started. I tidied my room, Mum tidied the rest of the house and Dad vacuumed.",
    examZh: "2025完形填空：爸爸用吸尘器（vacuumed）打扫房屋。",
    examYear: "2025",
  },
  precision: {
    examEn:
      "We need a better way of printing numbers so that they can be read correctly at high speeds. That's the problem barcodes solve.",
    examZh: "2021阅读填句：条形码以条纹精确编码数字，解决误读问题（precision 考点）。",
    examYear: "2021",
  },
  advantage: {
    examEn:
      "Sound recordings of plants could bring humans lots of advantages, especially in farming.",
    examZh: "2023 B卷短文填词（还原）：植物声音记录可为农业带来诸多优势（advantages）。",
    examYear: "2023",
  },
  talent: {
    examEn:
      "So many talented modern writers have rewritten Shakespeare's plays in the way people speak today.",
    examZh: "2024 B卷短文填词：许多有才华（talented）的作家用现代语言改写莎士比亚戏剧。",
    examYear: "2024",
  },
  understatement: {
    examEn:
      "After some terrible experience, we might say, \"Not very pleasant.\"",
    examZh: "2019阅读：英式幽默用轻描淡写（understatement）说「不太愉快」。",
    examYear: "2019",
  },
  anthropomorphism: {
    examEn:
      "Do you believe a rose plant says \"I want some water\" or a tree shouts \"My arms hurt\"?",
    examZh: "2023 B卷短文开篇：植物是否会「说话」——拟人化（anthropomorphism）话题。",
    examYear: "2023",
  },
  remix: {
    examEn:
      "It was an electronic remix (a mix of different songs) I made.",
    examZh: "2026阅读B篇：男孩用电子混音（remix）改编古典乐。",
    examYear: "2026",
  },
  "knocker-uppers": {
    examEn:
      "To make sure people didn't oversleep, knocker-uppers also known as wake-up helpers appeared.",
    examZh: "2026阅读C篇：工业革命时期职业叫醒人（knocker-uppers）沿街敲窗叫人起床。",
    examYear: "2026",
  },
  "café schokolade": {
    examEn:
      "Every tourist comes here to take photos and eat.",
    examZh: "2026阅读A篇评论：维也纳 Café Schokolade 是游客打卡的巧克力咖啡馆。",
    examYear: "2026",
  },
};

/** 中考主题实用例句（写作/口语/阅读理解高频场景） */
export const TIER_PRACTICAL = {
  passenger: {
    exEn: "Every passenger must show a ticket before boarding the high-speed train.",
    exZh: "每位乘客上车前都必须出示车票。——交通出行话题",
  },
  pilot: {
    exEn: "The pilot stayed calm and landed the plane safely in the storm.",
    exZh: "飞行员在暴风雨中保持冷静，安全降落。——人物品质·安全",
  },
  accent: {
    exEn: "Don't be shy about your accent — clear grammar matters more in exams.",
    exZh: "不必因口音害羞——中考更看重语法是否准确。——学习方法",
  },
  grammar: {
    exEn: "Reviewing grammar rules every week helps you avoid careless mistakes in the exam.",
    exZh: "每周复习语法规则，有助于减少考场粗心错误。——备考策略",
  },
  suspect: {
    exEn: "The police asked the suspect a few questions before letting him go.",
    exZh: "警察问了嫌疑犯几个问题后才放他离开。——社会新闻",
  },
  medium: {
    exEn: "Cook the noodles over medium heat for about five minutes.",
    exZh: "用中火煮面条约五分钟。——日常生活",
  },
  typhoon: {
    exEn: "The school was closed because a strong typhoon was coming.",
    exZh: "因强台风将至，学校停课。——自然灾害",
  },
  irony: {
    exEn: "It is irony that he missed the bus while running to catch it.",
    exZh: "他跑着赶公交却错过了，颇具讽刺意味。——修辞理解",
  },
  vegetation: {
    exEn: "Planting more vegetation can help prevent soil erosion on hillsides.",
    exZh: "多种植被有助于防止山坡水土流失。——环保",
  },
  algae: {
    exEn: "Too much algae in the lake can harm fish and make the water smell bad.",
    exZh: "湖中藻类过多会危害鱼类并使水体发臭。——环境保护",
  },
  insect: {
    exEn: "Some insects play an important role in pollinating flowers.",
    exZh: "有些昆虫在花卉授粉中起着重要作用。——科普说明",
  },
  scanner: {
    exEn: "Put your ID card on the scanner to enter the library.",
    exZh: "把身份证放在扫描仪上即可进入图书馆。——校园科技",
  },
  convenient: {
    exEn: "Mobile payment is convenient when you buy snacks after school.",
    exZh: "放学后买零食时，手机支付非常方便。——现代生活",
  },
  parrot: {
    exEn: "The parrot in the zoo can imitate several simple English words.",
    exZh: "动物园里的鹦鹉能模仿几个简单的英语单词。——动物话题",
  },
  couplet: {
    exEn: "During Spring Festival, many families put up red couplets on their doors.",
    exZh: "春节期间，许多人家门上贴红色对联。——传统文化",
  },
  churro: {
    exEn: "At the food festival, students tried a Spanish snack called churro.",
    exZh: "美食节上，同学们品尝了西班牙小吃 churro（油条）。——跨文化",
  },
  independent: {
    exEn: "Learning to plan your own study time makes you more independent.",
    exZh: "学会自主安排学习时间，会让你更独立。——成长教育",
  },
  translator: {
    exEn: "A good translator must understand both languages and cultures well.",
    exZh: "优秀翻译家须精通两种语言及其文化。——文化交流",
  },
  breeding: {
    exEn: "The park has a special area for breeding endangered birds.",
    exZh: "公园设有专门区域用于繁育濒危鸟类。——动物保护",
  },
  intangible: {
    exEn: "Paper-cutting is part of China's intangible cultural heritage.",
    exZh: "剪纸是中国非物质文化遗产的一部分。——文化传承",
  },
  barcode: {
    exEn: "Scan the barcode on the package to check the price.",
    exZh: "扫描包装上的条形码即可查询价格。——科技应用",
  },
  plover: {
    exEn: "The plover is a small bird that nests on sandy beaches.",
    exZh: "千鸟是一种在沙滩筑巢的小鸟。——科普阅读",
  },
  "scrub jay": {
    exEn: "The scrub jay hides food in different places and remembers where it put them.",
    exZh: "灌丛鸦会把食物藏在不同地方并记住位置。——动物行为",
  },
  chimpanzee: {
    exEn: "Scientists study how chimpanzees use tools to get food.",
    exZh: "科学家研究黑猩猩如何用工具获取食物。——科学探索",
  },
  brainstorming: {
    exEn: "Our group used brainstorming to list ideas for the class project.",
    exZh: "我们小组用头脑风暴为班级课题列创意。——合作学习",
  },
  mulberry: {
    exEn: "Silkworms feed on fresh mulberry leaves.",
    exZh: "蚕以新鲜桑叶为食。——丝绸之路文化",
  },
  silkworm: {
    exEn: "Ancient Chinese people raised silkworms to make silk.",
    exZh: "古人养蚕缫丝，造就丝绸文明。——历史与文化",
  },
  pancake: {
    exEn: "On Sunday morning, Mum made pancakes for the whole family.",
    exZh: "周日早上，妈妈给全家做了薄饼。——家庭生活",
  },
  impressionist: {
    exEn: "The impressionist painter focused on light and color rather than fine details.",
    exZh: "印象派画家注重光影色彩，而非精细细节。——艺术鉴赏",
  },
  pitch: {
    exEn: "The singer's voice rose to a higher pitch at the end of the song.",
    exZh: "歌手在歌曲结尾处音调（pitch）升高。——音乐",
  },
  stressed: {
    exEn: "Many students feel stressed before the final exam.",
    exZh: "期末考试前，许多学生感到压力很大。——心理健康",
  },
  longitude: {
    exEn: "Chengdu is located at about 104°E longitude.",
    exZh: "成都位于东经约104度。——地理常识",
  },
  projection: {
    exEn: "The teacher used a projection to show pictures on the screen.",
    exZh: "老师用投影把图片投到屏幕上。——课堂科技",
  },
  whiskers: {
    exEn: "A cat's whiskers help it sense objects in the dark.",
    exZh: "猫的胡须帮助它在黑暗中感知物体。——动物科普",
  },
  pupils: {
    exEn: "In bright light, the pupils of your eyes become smaller.",
    exZh: "光线明亮时，瞳孔会缩小。——人体科学",
  },
  empathy: {
    exEn: "Show empathy when your classmate is upset — a kind word can help.",
    exZh: "同学难过时表达共情，一句温暖的话很有帮助。——人际交往",
  },
  heartbreak: {
    exEn: "Losing the final match was a heartbreak for the whole team.",
    exZh: "决赛失利让整个队心碎不已。——情感表达",
  },
  hurdles: {
    exEn: "She practiced hurdles every afternoon to prepare for the sports meet.",
    exZh: "她每天下午练习跨栏，备战运动会。——体育运动",
  },
  archaeological: {
    exEn: "The archaeological site attracts visitors from all over the country.",
    exZh: "这处考古遗址吸引了全国各地的游客。——历史遗迹",
  },
  homestay: {
    exEn: "A homestay is a good way to improve spoken English abroad.",
    exZh: "住民宿是出国提高英语口语的好方式。——留学生活",
  },
  ecologist: {
    exEn: "The ecologist warned that polluting the river would harm wildlife.",
    exZh: "生态学家警告，污染河流将危害野生动物。——环保",
  },
  terracotta: {
    exEn: "Each terracotta soldier was made by hand over two thousand years ago.",
    exZh: "每个陶俑都是两千多年前手工烧制而成。——文物介绍",
  },
  coating: {
    exEn: "A thin coating of paint protects the metal from rust.",
    exZh: "一层薄漆涂层可防止金属生锈。——科普说明",
  },
  elderly: {
    exEn: "We should respect the elderly and offer them our seats on the bus.",
    exZh: "应尊敬长者，公交车上主动让座。——品德教育",
  },
  rainforest: {
    exEn: "Rainforests produce much of the oxygen we breathe every day.",
    exZh: "雨林每天为我们提供大量呼吸所需的氧气。——生态保护",
  },
  composer: {
    exEn: "The composer wrote a beautiful piece for the school concert.",
    exZh: "作曲家为学校音乐会创作了一首优美乐曲。——艺术",
  },
  tuba: {
    exEn: "He plays the tuba in the school band.",
    exZh: "他在学校乐队里吹大号（tuba）。——音乐社团",
  },
  photographer: {
    exEn: "The photographer waited quietly for hours to take a photo of the wild bird.",
    exZh: "摄影师静静等候数小时，只为拍下野鸟一张照片。——职业精神",
  },
  positive: {
    exEn: "Stay positive even when you fail a test — learn from the mistakes.",
    exZh: "考试失利也要保持积极，从错误中学习。——成长心态",
  },
  patience: {
    exEn: "Learning English takes patience; progress comes step by step.",
    exZh: "学英语需要耐心，进步总是一步一步来的。——学习方法",
  },
  difficulties: {
    exEn: "With support from teachers, she overcame many difficulties in math.",
    exZh: "在老师帮助下，她克服了数学上的许多困难。——学业成长",
  },
  happiness: {
    exEn: "True happiness often comes from helping others, not from buying things.",
    exZh: "真正的幸福常来自帮助他人，而非购物消费。——价值观",
  },
  impervious: {
    exEn: "Good habits make you impervious to bad influences from the internet.",
    exZh: "良好习惯能让你不受网络不良影响的侵蚀。——自律",
  },
  museum: {
    exEn: "Our class visited the museum to learn about local history.",
    exZh: "我们班参观博物馆，了解本地历史。——研学活动",
  },
  necessary: {
    exEn: "It is necessary to get enough sleep before an important exam.",
    exZh: "大考前充足睡眠十分必要。——健康生活",
  },
  surprised: {
    exEn: "I was surprised to find how much my English had improved.",
    exZh: "我惊讶地发现自己的英语进步如此之大。——学习感悟",
  },
  vacuum: {
    exEn: "Dad asked me to vacuum the living room on Saturday.",
    exZh: "爸爸让我周六用吸尘器打扫客厅。——家务",
  },
  maintenance: {
    exEn: "Regular maintenance keeps the school computers running well.",
    exZh: "定期维修让学校电脑保持良好运行。——校园管理",
  },
  electronic: {
    exEn: "Students are not allowed to use electronic devices during the exam.",
    exZh: "考试期间不得使用电子设备。——考场规则",
  },
  international: {
    exEn: "English is an international language used in trade and travel.",
    exZh: "英语是国际贸易与旅行中使用的国际语言。——语言文化",
  },
  organised: {
    exEn: "An organised desk helps you find your books more quickly.",
    exZh: "整洁有序的书桌让你更快找到课本。——学习习惯",
  },
  gradually: {
    exEn: "Her spoken English gradually improved after she joined the English club.",
    exZh: "加入英语社团后，她的口语逐渐进步。——学习过程",
  },
  apartment: {
    exEn: "They moved into a small apartment near the school last month.",
    exZh: "他们上月搬到学校附近的一间公寓。——城市生活",
  },
  confidence: {
    exEn: "Speaking aloud in class can build your confidence in English.",
    exZh: "在课堂上大声发言能建立英语自信。——学习方法",
  },
  shyness: {
    exEn: "Don't let shyness stop you from asking questions in class.",
    exZh: "别让害羞阻止你在课堂上提问。——心理成长",
  },
  creativity: {
    exEn: "Art class gives students a chance to show their creativity.",
    exZh: "美术课让学生有机会展现创造力。——素质教育",
  },
  official: {
    exEn: "An official from the education bureau visited our school yesterday.",
    exZh: "教育局的一位官员昨天来我校视察。——校园新闻",
  },
  virtue: {
    exEn: "Honesty is a virtue that every student should value.",
    exZh: "诚实是每位学生都应珍视的美德。——品德教育",
  },
  poetry: {
    exEn: "We read a Tang poem in class and discussed its beautiful poetry.",
    exZh: "我们在课上读了一首唐诗，品味其诗意之美。——语文融合",
  },
  precision: {
    exEn: "Science experiments require precision — measure carefully each time.",
    exZh: "科学实验要求精确，每次都要仔细测量。——科学素养",
  },
  disabled: {
    exEn: "The school built ramps so disabled students can enter every classroom.",
    exZh: "学校修建坡道，方便残疾学生进入每间教室。——无障碍关怀",
  },
  marathon: {
    exEn: "He trained for months before running his first marathon.",
    exZh: "他训练数月后完成了人生第一次马拉松。——坚持",
  },
  platform: {
    exEn: "Use learning platforms wisely — don't let games steal your study time.",
    exZh: "合理使用学习平台，别让游戏占用学习时间。——网络素养",
  },
  machine: {
    exEn: "The washing machine broke down, so we washed clothes by hand.",
    exZh: "洗衣机坏了，我们只好手洗衣服。——日常生活",
  },
  advantage: {
    exEn: "Reading English every day gives you a big advantage in the exam.",
    exZh: "每天坚持读英语，中考会有明显优势。——备考",
  },
  chance: {
    exEn: "Take every chance to speak English with your classmates.",
    exZh: "抓住每一个和同学说英语的机会。——口语练习",
  },
  difference: {
    exEn: "Can you tell the difference between \"look for\" and \"look after\"?",
    exZh: "你能区分 look for 和 look after 吗？——词汇辨析",
  },
  talent: {
    exEn: "She has a talent for music and plays the piano beautifully.",
    exZh: "她有音乐天赋，钢琴弹得很优美。——才艺",
  },
  solve: {
    exEn: "Work with your partner to solve the math problem on the board.",
    exZh: "和搭档一起解决黑板上的数学题。——课堂合作",
  },
  agree: {
    exEn: "Most students agree that outdoor activities help them relax.",
    exZh: "多数同学同意户外活动有助于放松。——观点表达",
  },
  enjoy: {
    exEn: "I enjoy reading English stories before I go to bed.",
    exZh: "我喜欢睡前读英语故事。——兴趣爱好",
  },
  offer: {
    exEn: "The volunteer club will offer free tutoring after school.",
    exZh: "志愿者社团将在放学后提供免费辅导。——公益",
  },
  rule: {
    exEn: "Follow the classroom rules so everyone can learn in peace.",
    exZh: "遵守课堂规则，大家才能安心学习。——纪律",
  },
  disgust: {
    exEn: "He turned away in disgust when he saw the messy room.",
    exZh: "看到凌乱的房间，他厌恶地转过身去。——情感词汇",
  },
  triggered: {
    exEn: "The photo triggered her memory of the happy summer camp.",
    exZh: "这张照片触发了她对快乐夏令营的回忆。——心理描写",
  },
  polypropylene: {
    exEn: "Many food containers are made of polypropylene because it is light and safe.",
    exZh: "许多食品容器由聚丙烯制成，轻便又安全。——材料科学",
  },
  fungi: {
    exEn: "Fungi help break down dead plants and return nutrients to the soil.",
    exZh: "真菌分解枯死植物，把养分归还土壤。——生物科普",
  },
  sanjiangyuan: {
    exEn: "Protecting Sanjiangyuan helps keep China's major rivers clean.",
    exZh: "保护三江源有助于保持中国大江大河的水质清洁。——生态",
  },
  "tiangong space station": {
    exEn: "China's achievements in the Tiangong Space Station inspire young scientists.",
    exZh: "天宫空间站的成就激励着青年科学家。——航天科技",
  },
  meteorologica: {
    exEn: "Aristotle's Meteorologica is one of the earliest books about weather.",
    exZh: "亚里士多德《气象学》是最早的天气研究著作之一。——科学史",
  },
  radiosonde: {
    exEn: "A radiosonde is carried by balloon to measure temperature high in the sky.",
    exZh: "无线电探空仪随气球升空，测量高空温度。——气象",
  },
  "hurricane lee": {
    exEn: "Weather reports tracked Hurricane Lee as it moved across the Atlantic.",
    exZh: "气象报道追踪飓风李（Hurricane Lee）横跨大西洋的路径。——灾害天气",
  },
  "james webb space telescope": {
    exEn: "Images from the James Webb Space Telescope help us understand the early universe.",
    exZh: "韦布望远镜的图像帮助人类了解早期宇宙。——天文",
  },
  "dipteryx oleifera": {
    exEn: "Dipteryx oleifera is a tree species scientists study in tropical forests.",
    exZh: "巴拿马树种 Dipteryx oleifera 是科学家研究的热带树种。——生物多样性",
  },
  conductive: {
    exEn: "Copper wire is highly conductive, so it is used in electrical cables.",
    exZh: "铜线导电性强，常用于电缆。——物理常识",
  },
  parasitic: {
    exEn: "Some parasitic plants take water and nutrients from other plants.",
    exZh: "有些寄生植物从其他植物吸取水分和养分。——生物",
  },
  "knocker-uppers": {
    exEn: "Before alarm clocks were common, knocker-uppers woke factory workers in the morning.",
    exZh: "闹钟普及前，职业叫醒人（knocker-uppers）清晨唤醒工人。——历史职业",
  },
  understatement: {
    exEn: "Saying the exam was \"a bit hard\" was an understatement — it was very difficult.",
    exZh: "说考试「有点难」是轻描淡写——其实非常难。——修辞",
  },
  anthropomorphism: {
    exEn: "Calling a cat \"he\" in a story is an example of anthropomorphism.",
    exZh: "在故事里把猫称作「他」是拟人化（anthropomorphism）的例子。——文学手法",
  },
  remix: {
    exEn: "The DJ played a remix that mixed two popular songs together.",
    exZh: "DJ 播放了一首将两首流行歌混音改编（remix）的版本。——流行文化",
  },
  "snow leopard": {
    exEn: "The snow leopard is one of the rarest animals in China's mountains.",
    exZh: "雪豹是中国山区最稀有的动物之一。——野生动物保护",
  },
  "café schokolade": {
    exEn: "Tourists visit Café Schokolade in Vienna for its famous chocolate cake.",
    exZh: "游客去维也纳 Café Schokolade 品尝招牌巧克力蛋糕。——世界文化",
  },
  "forest listeners": {
    exEn: "Volunteers joined Forest Listeners to help scientists study rainforest sounds.",
    exZh: "志愿者加入森林聆听者项目，协助科学家研究雨林声音。——公民科学",
  },
  boyi: {
    exEn: "Boyi is remembered as an early protector of birds and forests in Chinese history.",
    exZh: "伯益在中国历史上被誉为早期的护鸟护林者。——环保先驱",
  },
  "impossible foods": {
    exEn: "Impossible Foods develops plant-based meat to reduce harm to the environment.",
    exZh: "Impossible Foods 研发植物肉，以减少对环境的破坏。——绿色饮食",
  },
  personification: {
    exEn: "\"The wind whispered through the trees\" uses personification in writing.",
    exZh: "「风在树林间低语」运用了拟人修辞（personification）。——写作技巧",
  },
  "xu yuanchong": {
    exEn: "Xu Yuanchong showed that Chinese poetry can touch readers around the world.",
    exZh: "许渊冲证明了中国诗歌能打动世界读者。——文化传播",
  },
  monet: {
    exEn: "Monet's paintings of water lilies are famous for their soft colors.",
    exZh: "莫奈的睡莲画作以柔和色彩闻名。——艺术欣赏",
  },
  shakespeare: {
    exEn: "Many students first meet Shakespeare through his play Romeo and Juliet.",
    exZh: "许多学生通过《罗密欧与朱丽叶》初识莎士比亚。——文学经典",
  },
  aristotle: {
    exEn: "Aristotle taught that good habits help people live a good life.",
    exZh: "亚里士多德认为良好习惯助人过上美好生活。——哲学思想",
  },
  "terracotta warriors": {
    exEn: "The Terracotta Warriors show the amazing skill of ancient Chinese craftsmen.",
    exZh: "兵马俑展现了古代中国工匠的惊人技艺。——世界遗产",
  },
  "su shi / dongpo": {
    exEn: "Su Shi remained hopeful in exile and left China great poetry and Dongpo Pork.",
    exZh: "苏轼流放途中仍心怀希望，留下诗词与东坡肉。——人物品格",
  },
  huangzhou: {
    exEn: "In Huangzhou, Su Shi wrote some of his most famous poems.",
    exZh: "苏轼在黄州写下了许多传世名篇。——文化地理",
  },
  "dongpo pork": {
    exEn: "Dongpo Pork is a famous dish named after the poet Su Shi.",
    exZh: "东坡肉是以诗人苏轼命名的名菜。——饮食文化",
  },
  saihanba: {
    exEn: "Saihanba proves that people can turn deserts back into green forests.",
    exZh: "塞罕坝证明人能把荒漠重新变成绿色林海。——生态修复",
  },
  "niu yu": {
    exEn: "Niu Yu's story teaches us to face challenges with courage and hope.",
    exZh: "牛钰的故事教会我们以勇气与希望面对挑战。——励志人物",
  },
  dashiban: {
    exEn: "Dashiban shows how rural tourism can bring new jobs to villagers.",
    exZh: "大石板村说明乡村旅游能为村民带来新就业机会。——乡村振兴",
  },
};

export function normTierKey(word) {
  return String(word).split("/")[0].trim().toLowerCase();
}

export function getPractical(word) {
  const key = normTierKey(word);
  return TIER_PRACTICAL[key] || null;
}

export function getManualExam(word) {
  const key = normTierKey(word);
  return MANUAL_EXAM[key] || null;
}
