/**
 * Hello, penguins! · 课件科普竞赛
 * 中英双语版 + English 版 · 全部配图
 */
(function (global) {
  "use strict";

  var IMG = "images/science/";

  var SPECIES = [
    { id: "emperor", en: "Emperor penguin", zh: "皇帝企鹅", photos: ["emperor-ice.jpg", "emperor-huddle.jpg", "emperor-big.jpg"] },
    { id: "magellanic", en: "Magellanic penguin", zh: "麦哲伦企鹅", photos: ["magellanic-beach.jpg", "magellanic-nest.jpg", "magellanic-pair.jpg"] },
    { id: "snares", en: "Snares penguin", zh: "斯奈斯企鹅", photos: ["snares-forest.jpg", "snares-roots.jpg", "snares-crest.jpg"] },
    { id: "fairy", en: "Fairy / little penguin", zh: "小蓝企鹅（神仙企鹅）", photos: ["fairy-small.jpg", "fairy-beach.jpg"] },
    { id: "rockhopper", en: "Rockhopper penguin", zh: "冠企鹅 / 跳岩企鹅", photos: ["rockhopper-fancy.jpg", "rockhopper-crest.jpg", "rockhopper-hop.jpg"] },
    { id: "adelie", en: "Adélie penguin", zh: "阿德利企鹅", photos: ["adelie-plain.jpg", "adelie-ice.jpg", "adelie-group.jpg"] },
    { id: "chinstrap", en: "Chinstrap penguin", zh: "南极企鹅（帽带企鹅）", photos: ["chinstrap-shuffle.jpg", "chinstrap-group.jpg"] },
    { id: "humboldt", en: "Humboldt penguin", zh: "洪堡企鹅", photos: ["humboldt-fish.jpg", "humboldt-land.jpg"] },
    { id: "gentoo", en: "Gentoo penguin", zh: "巴布亚企鹅（金图企鹅）", photos: ["gentoo-land.jpg", "gentoo-beach.jpg", "gentoo-jump.jpg"] },
    { id: "king", en: "King penguin", zh: "国王企鹅", photos: ["king-plain.jpg"] },
    { id: "galapagos", en: "Galápagos penguin", zh: "加拉帕戈斯企鹅", photos: ["galapagos.jpg"] },
    { id: "african", en: "African penguin", zh: "非洲企鹅", photos: ["african.jpg"] },
    { id: "macaroni", en: "Macaroni penguin", zh: "马卡罗尼企鹅", photos: ["macaroni.jpg"] },
    { id: "yellow", en: "Yellow-eyed penguin", zh: "黄眼企鹅", photos: ["yellow-eyed.jpg"] },
    { id: "fiordland", en: "Fiordland penguin", zh: "峡湾企鹅", photos: ["fiordland.jpg"] }
  ];

  var BANK = [
    q("who", "emperor-big.jpg", "Which penguin is the biggest?", "哪种企鹅最大？", ["Emperor penguin", "Fairy penguin", "Adélie penguin", "Rockhopper penguin"], 0, "Emperor penguins can be about 1.1 m tall.", "皇帝企鹅大约高 1.1 米，是最大的企鹅。"),
    q("who", "fairy-small.jpg", "Which penguin is the smallest?", "哪种企鹅最小？", ["Emperor penguin", "Fairy / little penguin", "King penguin", "Gentoo penguin"], 1, "Little (fairy) penguins are about 30–35 cm tall.", "小蓝企鹅大约只有 30–35 厘米高。"),
    q("who", "rockhopper-fancy.jpg", "Which penguin has fancy yellow crests?", "哪种企鹅有花哨的黄冠？", ["Adélie penguin", "Rockhopper penguin", "Emperor penguin", "Humboldt penguin"], 1, "Rockhoppers have bright yellow eyebrow crests.", "跳岩企鹅有鲜艳的黄色眉冠。"),
    q("who", "adelie-plain.jpg", "Which penguin looks plain black and white?", "哪种企鹅看起来黑白朴素？", ["Rockhopper penguin", "Macaroni penguin", "Adélie penguin", "Snares penguin"], 2, "Adélie penguins have a simple tuxedo look.", "阿德利企鹅的黑白礼服很朴素。"),
    q("who", "chinstrap-shuffle.jpg", "Which penguin has a black strap under its chin?", "哪种企鹅下巴有一条黑带？", ["Chinstrap penguin", "King penguin", "Fairy penguin", "Gentoo penguin"], 0, "The black line looks like a helmet chinstrap.", "那条黑线像头盔的帽带。"),
    q("who", "magellanic-beach.jpg", "Which penguin lives on the beach and digs nest burrows?", "哪种企鹅住在沙滩上并挖洞筑巢？", ["Emperor penguin", "Magellanic penguin", "Adélie penguin", "Chinstrap penguin"], 1, "Magellanic penguins nest in dirt and sand.", "麦哲伦企鹅在泥土和沙子里筑巢。"),
    q("who", "snares-forest.jpg", "Which penguin lives in the forest?", "哪种企鹅住在森林里？", ["Snares penguin", "Emperor penguin", "Adélie penguin", "Humboldt penguin"], 0, "Snares penguins nest in coastal forest on the Snares Islands.", "斯奈斯企鹅在新西兰斯奈斯群岛的海岸森林筑巢。"),
    q("who", "humboldt-fish.jpg", "Which penguin lives by the Humboldt Current and goes fishing?", "哪种企鹅住在洪堡寒流附近并去捕鱼？", ["Gentoo penguin", "Humboldt penguin", "Fairy penguin", "King penguin"], 1, "Humboldt penguins live on the coasts of Peru and Chile.", "洪堡企鹅生活在秘鲁和智利海岸。"),
    q("who", "gentoo-land.jpg", "Which penguin has a bright orange-red bill and a white flash above the eye?", "哪种企鹅有橙红喙、眼睛上方有白斑？", ["Gentoo penguin", "Adélie penguin", "Chinstrap penguin", "African penguin"], 0, "Gentoos are fast swimmers and often hop back onto land.", "巴布亚企鹅游得很快，常跳回陆地。"),
    q("who", "galapagos.jpg", "Which penguin lives nearest the equator?", "哪种企鹅住得最靠近赤道？", ["Emperor penguin", "Galápagos penguin", "Adélie penguin", "Chinstrap penguin"], 1, "Galápagos penguins live on the Galápagos Islands.", "加拉帕戈斯企鹅住在赤道附近的群岛上。"),
    q("who", "african.jpg", "Which penguin lives in southern Africa?", "哪种企鹅生活在非洲南部？", ["African penguin", "Emperor penguin", "Snares penguin", "Rockhopper penguin"], 0, "African penguins nest on coasts and islands of Namibia and South Africa.", "非洲企鹅在纳米比亚和南非海岸筑巢。"),
    q("who", "macaroni.jpg", "Which crested penguin has orange-gold head feathers?", "哪种冠企鹅有橙金色头羽？", ["Adélie penguin", "Macaroni penguin", "Fairy penguin", "Humboldt penguin"], 1, "Macaroni penguins have long golden crests.", "马卡罗尼企鹅有长长的金色冠羽。"),
    q("who", "yellow-eyed.jpg", "Which penguin has pale yellow eyes?", "哪种企鹅有淡黄色的眼睛？", ["Yellow-eyed penguin", "Chinstrap penguin", "Gentoo penguin", "Emperor penguin"], 0, "Yellow-eyed penguins live in New Zealand forests and coasts.", "黄眼企鹅生活在新西兰的森林和海岸。"),
    q("who", "king-plain.jpg", "Which penguin looks like a smaller cousin of the emperor?", "哪种企鹅看起来像小号的皇帝企鹅？", ["Fairy penguin", "King penguin", "Rockhopper penguin", "Magellanic penguin"], 1, "King penguins are tall with orange neck patches, but smaller than emperors.", "国王企鹅颈部有橙色，比皇帝企鹅小一些。"),
    q("who", "fiordland.jpg", "Which crested penguin lives in rainy New Zealand fiords?", "哪种冠企鹅住在多雨的新西兰峡湾？", ["Fiordland penguin", "Adélie penguin", "Emperor penguin", "Humboldt penguin"], 0, "Fiordland penguins nest in temperate rainforest.", "峡湾企鹅在温带雨林里筑巢。"),
    q("hab", "emperor-ice.jpg", "Where do emperor penguins live?", "皇帝企鹅住在哪里？", ["On the ice in Antarctica", "In a hot desert", "In a tropical rainforest", "Only in zoos"], 0, "They breed on sea ice in the Antarctic winter.", "它们在南极冬天的海冰上繁殖。"),
    q("hab", "emperor-huddle.jpg", "Why do emperor penguins huddle?", "皇帝企鹅为什么挤成一团？", ["To keep warm", "To fly", "To hide from rainforests", "To make sandcastles"], 0, "The huddle shares heat in freezing wind.", "挤成一团可以在寒风里互相取暖。"),
    q("hab", "magellanic-nest.jpg", "Where do Magellanic penguins make nests?", "麦哲伦企鹅在哪里筑巢？", ["In dirt and sand burrows", "On floating icebergs only", "In tree holes like owls", "Under the sea"], 0, "They dig burrows on beaches and coasts of South America.", "它们在南美洲海滩挖洞筑巢。"),
    q("hab", "snares-roots.jpg", "How do Snares penguins walk in the forest?", "斯奈斯企鹅在森林里怎么走？", ["They waddle over tree roots", "They fly from branch to branch", "They hop on the moon", "They skate on glass"], 0, "Their forest floor is full of roots and mud.", "森林地面有很多树根和泥。"),
    q("hab", "adelie-ice.jpg", "Adélie penguins live mainly…", "阿德利企鹅主要住在……", ["On Antarctic ice and rocky shores", "In African deserts", "In city parks", "Only underwater forever"], 0, "They nest on ice-free coastal rocks in Antarctica.", "它们在南极无冰的海岸岩石上筑巢。"),
    q("hab", "humboldt-land.jpg", "Humboldt penguins live along…", "洪堡企鹅生活在……", ["The Pacific coast of Peru and Chile", "The North Pole", "The Amazon River only", "High Himalaya mountains"], 0, "Cold Humboldt Current water is full of fish.", "寒冷的洪堡寒流里有很多鱼。"),
    q("hab", "african.jpg", "African penguins nest…", "非洲企鹅筑巢在……", ["On sandy and rocky coasts of southern Africa", "On Antarctic ice sheets", "In pine forests of Canada", "Only on ships"], 0, "They also use burrows and nest boxes.", "它们也用洞穴和巢箱。"),
    q("hab", "galapagos.jpg", "Galápagos penguins can live where it is…", "加拉帕戈斯企鹅能住在……", ["Near the equator, but in cool current water", "Only at the South Pole", "In hot dry Sahara sand", "In freshwater lakes of Europe"], 0, "A cool ocean current keeps the islands livable.", "凉爽的洋流让赤道岛屿也能住企鹅。"),
    q("tf", "penguin-swim.jpg", "Penguins use their wings to swim.", "企鹅用翅膀游泳。", ["True", "False"], 0, "Wings work like flippers underwater.", "翅膀在水下像鳍一样划水。"),
    q("tf", "story-cant", "Penguins can fly in the sky like eagles.", "企鹅能像鹰一样在天上飞。", ["True", "False"], 1, "Penguins can't fly in air, but they 'fly' in water.", "企鹅不能在空中飞，但能在水里“飞”。", "cant-fly"),
    q("tf", "penguin-slide.jpg", "Some penguins slide on their bellies on ice.", "有的企鹅会用肚子在冰上滑。", ["True", "False"], 0, "This tobogganing saves energy.", "这样滑行更省力。"),
    q("tf", "chinstrap-shuffle.jpg", "Penguins can shuffle with small steps on ice.", "企鹅能在冰上小步走。", ["True", "False"], 0, "Shuffling keeps them from slipping.", "小步走不容易滑倒。"),
    q("tf", "penguin-waddle.jpg", "Penguins waddle when they walk on land.", "企鹅在陆地上走路会摇摇摆摆。", ["True", "False"], 0, "Short legs and a round body make a waddle.", "短腿和圆身体让它们摇摇摆摆。"),
    q("tf", "emperor-huddle.jpg", "Huddling helps penguins keep warm.", "挤成一团能帮助企鹅保暖。", ["True", "False"], 0, "Birds on the outside slowly swap to the inside.", "外面的企鹅会慢慢换到里面。"),
    q("tf", "penguin-fish.jpg", "Many penguins eat fish, krill, or squid.", "许多企鹅吃鱼、磷虾或鱿鱼。", ["True", "False"], 0, "Different kinds hunt different food.", "不同种类的企鹅食物不完全一样。"),
    q("tf", "gentoo-jump.jpg", "After a swim, penguins can go back on land.", "游完泳，企鹅能回到陆地上。", ["True", "False"], 0, "They hop, climb, or walk onto rocks and beaches.", "它们跳、爬或走上岩石和沙滩。"),
    q("tf", "rockhopper-hop.jpg", "Rockhopper penguins hop on rocks.", "跳岩企鹅会在岩石上跳。", ["True", "False"], 0, "That is how they got their English name.", "英文名 rockhopper 就是跳岩的意思。"),
    q("tf", "magellanic-pair.jpg", "All penguins live only on ice.", "所有企鹅都只住在冰上。", ["True", "False"], 1, "Some live on beaches, islands, and even forest.", "有的住沙滩、海岛，甚至森林。"),
    q("tf", "king-plain.jpg", "Penguins are birds, not fish.", "企鹅是鸟，不是鱼。", ["True", "False"], 0, "They have feathers, lay eggs, and are warm-blooded.", "它们有羽毛、会下蛋，是温血动物。"),
    q("tf", "adelie-group.jpg", "Penguins have dense feathers that help keep water out.", "企鹅有浓密羽毛，能帮助防水。", ["True", "False"], 0, "They also have a fat layer for the cold.", "它们还有脂肪层来御寒。"),
    q("can", "penguin-swim.jpg", "Can penguins swim well?", "企鹅游得好吗？", ["Yes, they can", "No, they can't"], 0, "Some gentoos swim over 30 km/h in short bursts.", "有的巴布亚企鹅短时可游得很快。"),
    q("can", "emperor-walk.jpg", "Can emperor penguins live in very cold places?", "皇帝企鹅能住在很冷的地方吗？", ["Yes, they can", "No, they can't"], 0, "They breed in the Antarctic winter.", "它们在南极冬天繁殖。"),
    q("can", "fairy-beach.jpg", "Can little penguins live on beaches and in burrows?", "小蓝企鹅能住在沙滩和洞穴里吗？", ["Yes, they can", "No, they can't"], 0, "They come ashore at dusk in many places.", "很多地方它们黄昏才上岸。"),
    q("look", "emperor-big.jpg", "This kind is…", "这种企鹅……", ["Big", "The smallest", "A flying eagle", "A polar bear"], 0, "Emperors are the giants of the penguin world.", "皇帝企鹅是企鹅里的巨人。"),
    q("look", "fairy-small.jpg", "This kind is…", "这种企鹅……", ["Small", "The biggest", "A whale", "A cactus"], 0, "Fairy penguins are also called little penguins.", "神仙企鹅也叫小蓝企鹅。"),
    q("look", "rockhopper-crest.jpg", "This kind looks…", "这种企鹅看起来……", ["Fancy", "Plain all over with no crest", "Like a shark", "Invisible"], 0, "Yellow crests make rockhoppers look fancy.", "黄冠让跳岩企鹅看起来很花哨。"),
    q("look", "adelie-plain.jpg", "This kind looks…", "这种企鹅看起来……", ["Plain", "Covered in rainbow crests", "Like a parrot", "Golden all over"], 0, "Adélies have a clean black-and-white look.", "阿德利企鹅是干净的黑白配。"),
    q("look", "macaroni.jpg", "Macaroni penguins look fancy because of…", "马卡罗尼企鹅花哨是因为……", ["Golden head crests", "Pink ice skates", "Tree houses", "Red umbrellas"], 0, "They are crested penguins, like rockhoppers.", "它们和跳岩企鹅一样属于冠企鹅。"),
    q("look", "yellow-eyed.jpg", "A special clue for yellow-eyed penguins is…", "黄眼企鹅的特别线索是……", ["Pale yellow eyes and a yellow band", "A black chinstrap only", "Living only on icebergs", "Giant size like emperors"], 0, "They are shy forest-coast penguins of New Zealand.", "它们是新西兰害羞的森林海岸企鹅。"),
    q("fact", "penguin-splash.jpg", "What does Splash! mean in the story?", "课文里的 Splash! 是什么意思？", ["Water flying as penguins hit the sea", "A kind of ice cream", "A sleeping song", "A type of nest"], 0, "Penguins porpoise and splash when they hunt.", "企鹅追鱼时会跳出水面、溅起水花。"),
    q("fact", "gentoo-jump.jpg", "Gentoo penguins are known as…", "巴布亚企鹅常被认为是……", ["Very fast underwater swimmers", "The only flying penguins", "Desert lizards", "Tree snakes"], 0, "They often return to the same landing rocks.", "它们常常回到同一块登陆岩。"),
    q("fact", "humboldt-fish.jpg", "It's time to go fishing means penguins…", "It's time to go fishing 是指企鹅……", ["Hunt food in the sea", "Buy tickets for a plane", "Plant trees", "Build snowmen only"], 0, "Parents bring fish back for chicks.", "家长会把鱼带回来给雏鸟。"),
    q("fact", "snares-forest.jpg", "There are many kinds of penguins — about how many living species?", "企鹅大约有多少现生物种？", ["About 18 living species", "Only 2", "More than 1,000", "Zero"], 0, "Scientists group them into several genera.", "科学家把它们分成好几属。"),
    q("fact", "emperor-walk.jpg", "Male emperor penguins are famous for…", "雄性皇帝企鹅很有名是因为……", ["Keeping the egg warm on their feet", "Building stick nests in oak trees", "Flying to Africa", "Drinking only juice"], 0, "They fast for weeks while the female hunts.", "雌鸟去捕猎时，雄鸟会禁食好几周。"),
    q("fact", "african.jpg", "African penguins make a sound like…", "非洲企鹅的叫声有点像……", ["A donkey bray", "A lion roar", "A bee buzz", "Silent mime"], 0, "People sometimes nicknamed them jackass penguins.", "人们有时叫它们“驴企鹅”。"),
    q("fact", "galapagos.jpg", "Wild penguins live in the Southern Hemisphere — except one kind that lives…", "野生企鹅几乎都在南半球，只有一种住在……", ["Near the equator in Galápagos", "On the North Pole ice cap", "In the Sahara", "On the Moon"], 0, "They are the most northerly wild penguins.", "它们是分布最北的野生企鹅。")
  ];

  function q(kind, img, en, zh, choices, ans, factEn, factZh, imgKind) {
    return { kind: kind, img: img, en: en, zh: zh, choices: choices, ans: ans, factEn: factEn, factZh: factZh, imgKind: imgKind || "sci" };
  }

  var state = { mode: "hub", lang: "bi", score: 0, streak: 0, i: 0, list: [], sel: null, locked: false, selPhoto: null, selText: null, matched: {} };

  function src(file, kind) {
    if (kind === "story") return "images/story/" + file;
    if (kind === "word") return "images/words/" + file;
    if (file === "story-cant" || file === "cant-fly") return "images/story/13.png";
    return IMG + file;
  }

  function speak(text) {
    if (window.LocalAudio && LocalAudio.speak) return LocalAudio.speak(text, { slow: false });
    if (window.NgAzureTTS && NgAzureTTS.speak) return NgAzureTTS.speak(text, {});
    return Promise.resolve(false);
  }

  function celebrate() {
    var el = document.getElementById("okCelebrate");
    if (!el) return;
    el.setAttribute("aria-hidden", "false");
    el.classList.add("is-on");
    setTimeout(function () {
      el.classList.remove("is-on");
      el.setAttribute("aria-hidden", "true");
    }, 1400);
  }

  function shuffle(arr) {
    var a = arr.slice();
    var i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = (Math.random() * (i + 1)) | 0;
      t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function imgTag(file, alt, kind) {
    return '<img src="' + src(file, kind) + '" alt="' + (alt || "") + '" loading="lazy">';
  }

  function btn(label, cls, id) {
    return '<button type="button" class="btn' + (cls ? " " + cls : "") + '" id="' + id + '">' + label + "</button>";
  }

  function t(en, zh) {
    if (state.lang === "en") return en;
    return en + (zh ? "<small>" + zh + "</small>" : "");
  }

  function renderHub(root) {
    state.mode = "hub";
    root.innerHTML =
      '<div class="lc-head"><h2>🐧 科普竞赛</h2>' +
      "<p>真实企鹅照片 · 中英双语或全英文 · 比一比谁的常识多。</p></div>" +
      '<div class="lc-hub">' +
      '<button type="button" class="lc-card" id="pgBi">' +
      '<div class="lc-card-photos">' +
      imgTag("emperor-huddle.jpg") + imgTag("magellanic-beach.jpg") +
      imgTag("snares-forest.jpg") + imgTag("rockhopper-fancy.jpg") +
      "</div><div class=\"lc-card-body\"><span class=\"lc-badge\">Bilingual</span>" +
      "<b>中英双语竞赛</b><span>题目中英对照，看图作答，适合中文讲解课。</span></div></button>" +
      '<button type="button" class="lc-card" id="pgEn">' +
      '<div class="lc-card-photos">' +
      imgTag("fairy-small.jpg") + imgTag("adelie-plain.jpg") +
      imgTag("penguin-swim.jpg") + imgTag("gentoo-land.jpg") +
      "</div><div class=\"lc-card-body\"><span class=\"lc-badge\">English</span>" +
      "<b>English Science Cup</b><span>English-only quiz with photos. Race for a high score.</span></div></button>" +
      "</div>";
    document.getElementById("pgBi").onclick = function () { state.lang = "bi"; renderMenu(root); };
    document.getElementById("pgEn").onclick = function () { state.lang = "en"; renderMenu(root); };
  }

  function renderMenu(root) {
    var bi = state.lang === "bi";
    root.innerHTML =
      '<div class="lc-head"><h2>' + (bi ? "选择比赛" : "Choose a contest") + "</h2>" +
      "<p>" + (bi ? "每题都有照片。答对加分，连对有奖励。" : "Every item has a photo. Streaks add bonus points.") + "</p></div>" +
      '<div class="lc-toolbar">' + btn(bi ? "← 竞赛首页" : "← Hub", "", "pgBack") +
      '<span class="sub">' + (bi ? "当前：中英双语" : "Mode: English") + "</span></div>" +
      '<div class="lc-hub three">' +
      menuCard("who", bi ? "认企鹅" : "Who is this?", bi ? "看照片选种类" : "Name the species", ["emperor-big.jpg", "chinstrap-shuffle.jpg", "humboldt-fish.jpg", "galapagos.jpg"]) +
      menuCard("hab", bi ? "住哪里" : "Where do they live?", bi ? "冰 / 沙滩 / 森林 / 洋流" : "Ice, beach, forest, current", ["emperor-ice.jpg", "magellanic-nest.jpg", "snares-roots.jpg", "african.jpg"]) +
      menuCard("tf", bi ? "真假赛" : "True or false", bi ? "对还是错？看图判断" : "True or false with photos", ["penguin-swim.jpg", "penguin-slide.jpg", "emperor-huddle.jpg", "king-plain.jpg"]) +
      menuCard("look", bi ? "大·小·花哨·朴素" : "Big, small, fancy, plain", bi ? "外貌与课文对应" : "Match looks from the book", ["fairy-small.jpg", "rockhopper-fancy.jpg", "adelie-plain.jpg", "macaroni.jpg"]) +
      menuCard("mix", bi ? "全能赛 15 题" : "Marathon 15", bi ? "混合题型争高分" : "Mixed facts, high score", ["penguin-splash.jpg", "penguin-fish.jpg", "yellow-eyed.jpg", "fiordland.jpg"]) +
      menuCard("match", bi ? "种类配对" : "Photo match", bi ? "照片配英文名" : "Match photos to names", ["gentoo-land.jpg", "magellanic-pair.jpg", "rockhopper-crest.jpg", "adelie-group.jpg"]) +
      "</div>";
    document.getElementById("pgBack").onclick = function () { renderHub(root); };
    root.querySelectorAll("[data-game]").forEach(function (el) {
      el.onclick = function () {
        var g = el.getAttribute("data-game");
        if (g === "match") startMatch(root);
        else startQuiz(root, g);
      };
    });
  }

  function menuCard(id, title, desc, photos) {
    return '<button type="button" class="lc-card" data-game="' + id + '">' +
      '<div class="lc-card-photos">' + photos.map(function (f) { return imgTag(f); }).join("") + "</div>" +
      '<div class="lc-card-body"><span class="lc-badge">Quiz</span><b>' + title + "</b><span>" + desc + "</span></div></button>";
  }

  function startQuiz(root, kind) {
    var pool = BANK.filter(function (item) {
      if (kind === "mix") return true;
      if (kind === "who") return item.kind === "who";
      if (kind === "hab") return item.kind === "hab";
      if (kind === "tf") return item.kind === "tf";
      if (kind === "look") return item.kind === "look" || item.kind === "can" || item.kind === "fact";
      return true;
    });
    var n = kind === "mix" ? 15 : Math.min(10, pool.length);
    state.list = shuffle(pool).slice(0, n);
    state.i = 0;
    state.score = 0;
    state.streak = 0;
    state.sel = null;
    state.locked = false;
    drawQuiz(root);
  }

  function drawQuiz(root) {
    var item = state.list[state.i];
    if (!item) {
      finishQuiz(root);
      return;
    }
    var bi = state.lang === "bi";
    var qHtml = bi ? item.en + "<small>" + item.zh + "</small>" : item.en;
    var choices = item.choices.map(function (c, idx) {
      var label = c;
      if (bi && item.kind !== "who" && item.kind !== "look" && item.kind !== "fact" && item.kind !== "hab" && item.kind !== "can" && item.kind !== "tf") {
        label = c;
      }
      return '<button type="button" class="pg-choice" data-i="' + idx + '"><b>' + label + "</b></button>";
    }).join("");
    root.innerHTML =
      '<div class="lc-head"><h2>' + (bi ? "科普竞赛" : "Science Cup") + "</h2>" +
      "<p>" + (bi ? "第 " : "Q ") + (state.i + 1) + " / " + state.list.length +
      ' · <span class="pg-score">' + (bi ? "得分 " : "Score ") + state.score + "</span></p></div>" +
      '<div class="lc-toolbar">' + btn(bi ? "← 比赛菜单" : "← Menu", "", "pgBack") +
      btn(bi ? "听题目" : "Listen", "primary", "pgHear") +
      '<span class="sub" id="pgHint">' + (bi ? "点照片旁的答案" : "Tap an answer") + "</span></div>" +
      '<div class="pg-quiz"><div class="pg-photo">' + imgTag(item.img, item.en, item.imgKind === "story" ? "story" : "sci") + "</div>" +
      '<div class="pg-q"><h3>' + qHtml + "</h3>" +
      '<div class="pg-choices">' + choices + "</div>" +
      '<p class="lc-msg" id="lcMsg"></p><div class="pg-fact" id="pgFact" hidden></div></div></div>';
    document.getElementById("pgBack").onclick = function () { renderMenu(root); };
    document.getElementById("pgHear").onclick = function () { speak(item.en); };
    speak(item.en);
    root.querySelectorAll(".pg-choice").forEach(function (b) {
      b.onclick = function () {
        if (state.locked) return;
        pick(root, item, parseInt(b.getAttribute("data-i"), 10));
      };
    });
  }

  function pick(root, item, idx) {
    state.locked = true;
    var ok = idx === item.ans;
    root.querySelectorAll(".pg-choice").forEach(function (b) {
      var i = parseInt(b.getAttribute("data-i"), 10);
      if (i === item.ans) b.classList.add("is-ok");
      if (i === idx && !ok) b.classList.add("is-bad");
    });
    var msg = document.getElementById("lcMsg");
    var fact = document.getElementById("pgFact");
    if (ok) {
      state.streak += 1;
      var add = 10 + Math.min(10, (state.streak - 1) * 2);
      state.score += add;
      if (msg) {
        msg.className = "lc-msg ok";
        msg.textContent = state.lang === "en" ? "Correct! +" + add : "正确！+" + add;
      }
      celebrate();
    } else {
      state.streak = 0;
      if (msg) {
        msg.className = "lc-msg bad";
        msg.textContent = state.lang === "en" ? "Not this one." : "还不对，看看绿框。";
      }
    }
    if (fact) {
      fact.hidden = false;
      fact.innerHTML = state.lang === "en" ? item.factEn : "<b>" + item.factEn + "</b><br>" + item.factZh;
    }
    setTimeout(function () {
      state.i += 1;
      state.locked = false;
      drawQuiz(root);
    }, 1700);
  }

  function finishQuiz(root) {
    var bi = state.lang === "bi";
    root.innerHTML =
      '<div class="lc-head"><h2>' + (bi ? "比赛结束" : "Finished") + "</h2></div>" +
      '<div class="lc-toolbar">' + btn(bi ? "← 再选一场" : "← Menu", "primary", "pgBack") + "</div>" +
      '<p class="lc-msg ok" style="font-size:1.2rem">🐧 ' + (bi ? "得分 " : "Score ") + state.score + "</p>" +
      "<p class=\"lc-head\"><p>" + (bi ? "你已经用照片认识了更多企鹅常识。" : "You used photos to learn more penguin facts.") + "</p></p>";
    celebrate();
    document.getElementById("pgBack").onclick = function () { renderMenu(root); };
  }

  function startMatch(root) {
    state.matched = {};
    state.selPhoto = null;
    state.selText = null;
    var pack = shuffle(SPECIES).slice(0, 6);
    state.roundItems = pack;
    state.photoOrder = shuffle(pack.map(function (s) { return s.id; }));
    state.textOrder = shuffle(pack.map(function (s) { return s.id; }));
    drawMatch(root);
  }

  function itemById(id) {
    var i;
    for (i = 0; i < SPECIES.length; i++) if (SPECIES[i].id === id) return SPECIES[i];
    return null;
  }

  function drawMatch(root) {
    var bi = state.lang === "bi";
    root.innerHTML =
      '<div class="lc-head"><h2>' + (bi ? "种类配对" : "Match the penguins") + "</h2>" +
      "<p>" + (bi ? "点照片，再点英文名。" : "Tap a photo, then the English name.") + "</p></div>" +
      '<div class="lc-toolbar">' + btn(bi ? "← 比赛菜单" : "← Menu", "", "pgBack") +
      '<span class="sub">' + (bi ? "已配对 " : "Matched ") + '<b id="lcPairN">0</b> / 6</span></div>' +
      '<div class="lc-match"><div class="lc-match-col" id="lcPhotos"></div><div class="lc-match-col" id="lcTexts"></div></div>' +
      '<p class="lc-msg" id="lcMsg"></p>';
    document.getElementById("pgBack").onclick = function () { renderMenu(root); };
    paintMatch(root);
  }

  function paintMatch(root) {
    var photos = document.getElementById("lcPhotos");
    var texts = document.getElementById("lcTexts");
    photos.innerHTML = "";
    texts.innerHTML = "";
    state.photoOrder.forEach(function (id) {
      var it = itemById(id);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lc-m-photo" + (state.matched[id] ? " is-ok" : "") + (state.selPhoto === id ? " is-sel" : "");
      b.setAttribute("data-id", id);
      b.innerHTML = imgTag(it.photos[0], it.en);
      b.onclick = function () {
        if (state.matched[id]) return;
        state.selPhoto = state.selPhoto === id ? null : id;
        tryPair(root);
        refreshMatch(root);
      };
      photos.appendChild(b);
    });
    state.textOrder.forEach(function (id) {
      var it = itemById(id);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lc-m-text" + (state.matched[id] ? " is-ok" : "") + (state.selText === id ? " is-sel" : "");
      b.setAttribute("data-id", id);
      b.innerHTML = "<div><b>" + it.en + "</b>" + (state.lang === "bi" ? "<small>" + it.zh + "</small>" : "") + "</div>";
      b.onclick = function () {
        if (state.matched[id]) return;
        state.selText = state.selText === id ? null : id;
        speak(it.en);
        tryPair(root);
        refreshMatch(root);
      };
      texts.appendChild(b);
    });
    var n = Object.keys(state.matched).length;
    var pairN = document.getElementById("lcPairN");
    if (pairN) pairN.textContent = String(n);
  }

  function refreshMatch(root) {
    root.querySelectorAll(".lc-m-photo").forEach(function (el) {
      var id = el.getAttribute("data-id");
      el.classList.toggle("is-sel", state.selPhoto === id && !state.matched[id]);
      el.classList.toggle("is-ok", !!state.matched[id]);
    });
    root.querySelectorAll(".lc-m-text").forEach(function (el) {
      var id = el.getAttribute("data-id");
      el.classList.toggle("is-sel", state.selText === id && !state.matched[id]);
      el.classList.toggle("is-ok", !!state.matched[id]);
    });
  }

  function tryPair(root) {
    if (!state.selPhoto || !state.selText) return;
    var msg = document.getElementById("lcMsg");
    if (state.selPhoto === state.selText) {
      state.matched[state.selPhoto] = true;
      state.selPhoto = null;
      state.selText = null;
      celebrate();
      var n = Object.keys(state.matched).length;
      if (msg) {
        msg.className = "lc-msg ok";
        msg.textContent = n === 6 ? (state.lang === "en" ? "All matched!" : "全部配上了！") : (state.lang === "en" ? "Match!" : "配对正确！");
      }
      paintMatch(root);
      if (n === 6) {
        setTimeout(function () { renderMenu(root); }, 2200);
      }
    } else {
      if (msg) {
        msg.className = "lc-msg bad";
        msg.textContent = state.lang === "en" ? "Try another name." : "再看看照片里的种类。";
      }
      state.selPhoto = null;
      state.selText = null;
      refreshMatch(root);
    }
  }

  function mount() {
    var root = document.getElementById("lcRoot");
    if (!root) return;
    renderHub(root);
  }

  global.PenguinScienceGames = { mount: mount };
})(typeof window !== "undefined" ? window : this);
