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
    { id: "fiordland", en: "Fiordland penguin", zh: "峡湾企鹅", photos: ["fiordland.jpg"] },
    { id: "royal", en: "Royal penguin", zh: "皇家企鹅", photos: ["royal.jpg"] },
    { id: "erect", en: "Erect-crested penguin", zh: "直立冠企鹅", photos: ["erect-crested.jpg"] }
  ];

  var ZH_CHOICE = {
    "Emperor penguin": "皇帝企鹅",
    "Fairy penguin": "小蓝企鹅",
    "Fairy / little penguin": "小蓝企鹅（神仙企鹅）",
    "Adélie penguin": "阿德利企鹅",
    "Rockhopper penguin": "跳岩企鹅",
    "Chinstrap penguin": "帽带企鹅 / 南极企鹅",
    "Magellanic penguin": "麦哲伦企鹅",
    "Snares penguin": "斯奈斯企鹅",
    "Humboldt penguin": "洪堡企鹅",
    "Gentoo penguin": "巴布亚企鹅 / 金图企鹅",
    "Galápagos penguin": "加拉帕戈斯企鹅",
    "African penguin": "非洲企鹅",
    "Macaroni penguin": "马卡罗尼企鹅",
    "Yellow-eyed penguin": "黄眼企鹅",
    "King penguin": "国王企鹅",
    "Fiordland penguin": "峡湾企鹅",
    "Royal penguin": "皇家企鹅",
    "Erect-crested penguin": "直立冠企鹅",
    "True": "对（True）",
    "False": "错（False）",
    "Yes, they can": "能（Yes, they can）",
    "No, they can't": "不能（No, they can't）",
    "Big": "大的",
    "Small": "小的",
    "Fancy": "花哨的",
    "Plain": "朴素的",
    "The smallest": "最小的",
    "The biggest": "最大的",
    "To keep warm": "为了保暖",
    "To fly": "为了飞翔",
    "To hide from rainforests": "为了躲雨林",
    "To make sandcastles": "为了堆沙堡",
    "On the ice in Antarctica": "在南极的冰上",
    "In a hot desert": "在炎热沙漠",
    "In a tropical rainforest": "在热带雨林",
    "Only in zoos": "只住在动物园",
    "In dirt and sand burrows": "在泥土和沙子的洞穴里",
    "On floating icebergs only": "只住在浮冰上",
    "In tree holes like owls": "像猫头鹰一样住树洞",
    "Under the sea": "住在海底",
    "They waddle over tree roots": "摇摇摆摆走过树根",
    "They fly from branch to branch": "从一根树枝飞到另一根",
    "They hop on the moon": "在月亮上跳",
    "They skate on glass": "在玻璃上滑冰",
    "On Antarctic ice and rocky shores": "在南极冰面和岩石海岸",
    "In African deserts": "在非洲沙漠",
    "In city parks": "在城市公园",
    "Only underwater forever": "永远只待在水下",
    "The Pacific coast of Peru and Chile": "秘鲁和智利的太平洋海岸",
    "The North Pole": "北极",
    "The Amazon River only": "只在亚马孙河",
    "High Himalaya mountains": "喜马拉雅高山",
    "On sandy and rocky coasts of southern Africa": "非洲南部的沙滩和岩石海岸",
    "On Antarctic ice sheets": "在南极冰盖上",
    "In pine forests of Canada": "在加拿大松林",
    "Only on ships": "只住在船上",
    "Near the equator, but in cool current water": "靠近赤道，但有凉爽洋流",
    "Only at the South Pole": "只在南极点",
    "In hot dry Sahara sand": "在炎热干燥的撒哈拉",
    "In freshwater lakes of Europe": "在欧洲淡水湖",
    "A flying eagle": "会飞的鹰",
    "A polar bear": "北极熊",
    "A whale": "鲸",
    "A cactus": "仙人掌",
    "Covered in rainbow crests": "满头彩虹冠羽",
    "Like a shark": "像鲨鱼",
    "Invisible": "隐身的",
    "Like a parrot": "像鹦鹉",
    "Golden all over": "全身金色",
    "Golden head crests": "金色头冠",
    "Pink ice skates": "粉色冰鞋",
    "Tree houses": "树上小屋",
    "Red umbrellas": "红雨伞",
    "Pale yellow eyes and a yellow band": "淡黄色眼睛和黄带",
    "A black chinstrap only": "只有一条黑帽带",
    "Living only on icebergs": "只住在冰山上",
    "Giant size like emperors": "像皇帝企鹅一样巨大",
    "Water flying as penguins hit the sea": "企鹅入水溅起水花",
    "A kind of ice cream": "一种冰淇淋",
    "A sleeping song": "催眠曲",
    "A type of nest": "一种巢",
    "Very fast underwater swimmers": "水下游得很快",
    "The only flying penguins": "唯一会飞的企鹅",
    "Desert lizards": "沙漠蜥蜴",
    "Tree snakes": "树蛇",
    "Hunt food in the sea": "在海里捕食",
    "Buy tickets for a plane": "去买机票",
    "Plant trees": "去种树",
    "Build snowmen only": "只堆雪人",
    "About 18 living species": "大约 18 种现生企鹅",
    "Only 2": "只有 2 种",
    "More than 1,000": "超过 1000 种",
    "Zero": "一种都没有",
    "Keeping the egg warm on their feet": "把蛋放在脚上保暖",
    "Building stick nests in oak trees": "在橡树上用树枝筑巢",
    "Flying to Africa": "飞去非洲",
    "Drinking only juice": "只喝果汁",
    "A donkey bray": "像驴叫",
    "A lion roar": "像狮吼",
    "A bee buzz": "像蜜蜂嗡嗡",
    "Silent mime": "完全不发声",
    "Near the equator in Galápagos": "赤道附近的加拉帕戈斯",
    "On the North Pole ice cap": "北极冰盖上",
    "In the Sahara": "在撒哈拉",
    "On the Moon": "在月球上",
    "Plain all over with no crest": "全身朴素、没有冠羽",
    "A white face and yellow crest": "白脸加上黄冠",
    "Crests that stand up": "竖起来的冠羽",
    "Two eggs in a dirt burrow": "泥土洞穴里的蛋",
    "On his feet, under a warm pouch": "放在脚上、用育儿袋保暖",
    "Pebble beaches and grassy islands": "鹅卵石海滩和长草的海岛",
    "At dusk, in a little parade": "黄昏时成群上岸",
    "Krill, fish, or squid": "磷虾、鱼或鱿鱼",
    "Only bamboo leaves": "只吃竹叶",
    "Waterproof feathers and a fat layer": "防水羽毛和脂肪层",
    "Metal armor": "金属盔甲",
    "About 18": "大约 18 种",
    "They rotate from cold edge to warm center": "从冷的外圈换到暖的中心",
    "They fly home": "飞回家",
    "White faces, not black faces": "白脸，不是黑脸",
    "Upward yellow brushes": "向上竖起的黄冠",
    "Pink skin around the bill": "喙周围有粉红色皮肤",
    "A white bonnet stripe over the eyes": "眼睛上方的白色“帽檐”",
    "Ice-free beaches with huge colonies": "无冰海滩上的大群体",
    "Only on Arctic sea ice": "只在北极海冰上",
    "Go back on land": "回到陆地",
    "Stay in the sky": "待在天上",
    "Turn into fish": "变成鱼",
    "Live only in zoos": "只住动物园",
    "Rainy New Zealand forest and coasts": "多雨的新西兰森林和海岸",
    "The Sahara": "撒哈拉沙漠",
    "Shy forest-coast birds of New Zealand": "新西兰害羞的森林海岸鸟",
    "Short legs and a round body": "短腿和圆身体",
    "Long giraffe necks": "长颈鹿那样的长脖子",
    "Bicycle wheels": "自行车轮子",
    "Jet engines": "喷气发动机",
    "Hop up rocky slopes": "在岩石坡上跳",
    "Fly to the Moon": "飞去月球",
    "Build oak nests": "在橡树上筑巢",
    "In a sandcastle": "在沙堡里",
    "In a stick nest": "在树枝巢里",
    "In a backpack": "在背包里",
    "Only in refrigerators": "只放在冰箱里",
    "Never": "从来不上岸",
    "When they fly": "当它们飞翔时",
    "In bamboo forests": "在竹林里",
    "The father, on his feet": "爸爸，放在脚上",
    "A polar bear": "北极熊",
    "An eagle": "鹰",
    "A cactus": "仙人掌",
    "City parks": "城市公园",
    "City rooftops": "城市屋顶",
    "Hot Sahara dunes": "炎热的撒哈拉沙丘",
    "In oak tree houses": "在橡树小屋里",
    "Only at noon in the desert": "只在沙漠正午",
    "The North Pole ice cap": "北极冰盖",
    "The biggest penguins": "最大的企鹅",
    "They buy tickets for a plane": "去买机票",
    "They plant trees": "去种树"
  };

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
    q("fact", "galapagos.jpg", "Wild penguins live in the Southern Hemisphere — except one kind that lives…", "野生企鹅几乎都在南半球，只有一种住在……", ["Near the equator in Galápagos", "On the North Pole ice cap", "In the Sahara", "On the Moon"], 0, "They are the most northerly wild penguins.", "它们是分布最北的野生企鹅。"),
    q("who", "royal.jpg", "Which crested penguin has a white face?", "哪种冠企鹅是白脸的？", ["Royal penguin", "Macaroni penguin", "Adélie penguin", "Emperor penguin"], 0, "Royal penguins live on Macquarie Island. Their faces stay white.", "皇家企鹅住在麦夸里岛，脸是白色的。"),
    q("who", "erect-crested.jpg", "Which penguin has yellow crests that stand up?", "哪种企鹅的黄冠是竖起来的？", ["Erect-crested penguin", "Fairy penguin", "Adélie penguin", "Humboldt penguin"], 0, "Erect-crested penguins nest on New Zealand's subantarctic islands.", "直立冠企鹅在新西兰亚南极岛屿筑巢。"),
    q("who", "snares-group.jpg", "Which crested penguins live only on the Snares Islands?", "哪种冠企鹅只住在斯奈斯群岛？", ["Snares penguin", "Emperor penguin", "Galápagos penguin", "African penguin"], 0, "They nest in coastal forest unique to those islands.", "它们只在那些岛屿的海岸森林筑巢。"),
    q("who", "african-bray.jpg", "Which beach penguin has pink skin above the eyes?", "哪种沙滩企鹅眼睛上方有粉红色皮肤？", ["African penguin", "Emperor penguin", "Chinstrap penguin", "King penguin"], 0, "The pink patches help them cool down.", "粉红色的皮肤能帮助散热。"),
    q("who", "humboldt-rock.jpg", "Which banded penguin has pink skin around the bill?", "哪种有胸带的企鹅喙周围是粉红色的？", ["Humboldt penguin", "Adélie penguin", "Fairy penguin", "Gentoo penguin"], 0, "Humboldt penguins live on dry, rocky Pacific coasts.", "洪堡企鹅住在干燥多岩的太平洋海岸。"),
    q("who", "king-plain.jpg", "Which tall orange-neck penguin lives in huge ice-free colonies?", "哪种高大、颈部橙色、住在无冰大群体里的企鹅？", ["King penguin", "Fairy penguin", "Rockhopper penguin", "Galápagos penguin"], 0, "King penguins gather on pebble plains such as Salisbury Plain.", "国王企鹅会在像索尔兹伯里平原这样的卵石滩上聚成大群。"),
    q("hab", "penguin-egg.jpg", "Where do some beach penguins keep their eggs?", "有的沙滩企鹅把蛋放在哪里？", ["Two eggs in a dirt burrow", "In oak tree houses", "On the Moon", "Only in refrigerators"], 0, "Magellanic and African penguins often nest in burrows.", "麦哲伦企鹅和非洲企鹅常常在洞穴里筑巢。"),
    q("hab", "emperor-egg.jpg", "Where does a father emperor penguin keep the egg?", "皇帝企鹅爸爸把蛋放在哪里？", ["On his feet, under a warm pouch", "In a sandcastle", "In a stick nest", "In a backpack"], 0, "He balances one egg on his feet for weeks.", "他会把一枚蛋在脚上放好几周。"),
    q("hab", "gentoo-beach.jpg", "Gentoo penguins often nest on…", "巴布亚企鹅常常筑巢在……", ["Pebble beaches and grassy islands", "Hot Sahara dunes", "City rooftops", "The North Pole ice cap"], 0, "They collect pebbles to make a nest.", "它们会捡小石头来做巢。"),
    q("hab", "fairy-beach.jpg", "When do little penguins often go back on land?", "小蓝企鹅常常什么时候回到陆地？", ["At dusk, in a little parade", "Only at noon in the desert", "Never", "When they fly"], 0, "Coming ashore at dusk helps them hide from birds of prey.", "黄昏上岸可以躲开一些天敌。"),
    q("hab", "king-plain.jpg", "King penguins often live on…", "国王企鹅常常住在……", ["Ice-free beaches with huge colonies", "Only on Arctic sea ice", "In the Sahara", "In bamboo forests"], 0, "They do not breed on the high Antarctic plateau like emperors.", "它们不像皇帝企鹅那样在高南极冰原上繁殖。"),
    q("hab", "snares-forest.jpg", "Snares penguins are special because they…", "斯奈斯企鹅特别是因为它们……", ["They waddle over tree roots", "They fly from branch to branch", "They hop on the moon", "They skate on glass"], 0, "Very few penguins nest in real forest.", "很少有企鹅真正在森林里筑巢。"),
    q("tf", "emperor-egg.jpg", "Some father penguins keep the egg warm on their feet.", "有的企鹅爸爸会把蛋放在脚上保暖。", ["True", "False"], 0, "Emperor fathers fast while they incubate.", "皇帝企鹅爸爸孵蛋时会禁食。"),
    q("tf", "penguin-egg.jpg", "Every penguin builds a nest of sticks in a tall oak tree.", "每只企鹅都在高大橡树上用树枝筑巢。", ["True", "False"], 1, "Nests can be burrows, pebble scrapes, or even the father's feet.", "巢可能是洞穴、小石堆，甚至是爸爸的脚。"),
    q("tf", "african-bray.jpg", "African penguins can bray a bit like a donkey.", "非洲企鹅的叫声有点像驴。", ["True", "False"], 0, "That is why people once nicknamed them jackass penguins.", "所以人们曾经叫它们“驴企鹅”。"),
    q("tf", "royal.jpg", "Royal penguins have white faces.", "皇家企鹅的脸是白色的。", ["True", "False"], 0, "Macaroni penguins look similar but have black faces.", "马卡罗尼企鹅长得很像，但脸是黑的。"),
    q("tf", "king-plain.jpg", "King penguins are the same species as emperor penguins.", "国王企鹅和皇帝企鹅是同一个物种。", ["True", "False"], 1, "Kings are a bit smaller and breed on ice-free islands.", "国王企鹅更小一些，在无冰的海岛上繁殖。"),
    q("tf", "fairy-beach.jpg", "The smallest penguins can live on beaches, not only on ice.", "最小的企鹅也能住在沙滩上，不只住在冰上。", ["True", "False"], 0, "Little penguins live around Australia and New Zealand.", "小蓝企鹅生活在澳大利亚和新西兰一带。"),
    q("tf", "penguin-swim.jpg", "Penguins use their wings like flippers underwater.", "企鹅在水下把翅膀当鳍来用。", ["True", "False"], 0, "That is why they are such strong swimmers.", "所以它们是很强的游泳健将。"),
    q("look", "royal.jpg", "Royal penguins look fancy because they have…", "皇家企鹅花哨是因为它们有……", ["A white face and yellow crest", "Pink ice skates", "Tree houses", "Red umbrellas"], 0, "The white face is the easy clue.", "白脸是最好认的线索。"),
    q("look", "erect-crested.jpg", "Erect-crested penguins look fancy because of…", "直立冠企鹅花哨是因为……", ["Upward yellow brushes", "A black chinstrap only", "Giant size like emperors", "Living only on icebergs"], 0, "Their crests stand up like brushes.", "它们的冠羽像刷子一样竖着。"),
    q("look", "humboldt-rock.jpg", "A clue for Humboldt penguins is…", "洪堡企鹅的线索是……", ["Pink skin around the bill", "A white bonnet stripe over the eyes", "Giant size like emperors", "Living only on icebergs"], 0, "The pink face skin helps them dump heat.", "粉红面部皮肤能帮助散热。"),
    q("look", "gentoo-land.jpg", "A clue for gentoo penguins is…", "巴布亚企鹅的线索是……", ["A white bonnet stripe over the eyes", "Pink ice skates", "A cactus", "Invisible"], 0, "The white flash looks like a bonnet.", "那道白斑像一顶小帽子。"),
    q("life", "emperor-egg.jpg", "Who often keeps the emperor egg warm?", "谁常常给皇帝企鹅的蛋保暖？", ["The father, on his feet", "A polar bear", "An eagle", "A cactus"], 0, "The father stands through the Antarctic winter.", "爸爸会在南极冬天里一直站着。"),
    q("life", "penguin-egg.jpg", "Beach penguins may lay eggs…", "沙滩企鹅可能会把蛋产在……", ["Two eggs in a dirt burrow", "On the Moon", "In the Sahara", "Only on ships"], 0, "Two eggs are common for many smaller penguins.", "许多较小的企鹅一次会产两枚蛋。"),
    q("life", "penguin-fish.jpg", "What do many penguins hunt?", "许多企鹅捕食什么？", ["Krill, fish, or squid", "Only bamboo leaves", "Pink ice skates", "Red umbrellas"], 0, "Chicks wait on land for parents to bring food.", "雏鸟在陆地上等家长带回食物。"),
    q("life", "emperor-huddle.jpg", "How can a huddle keep working in the wind?", "挤团怎样在寒风里一直保暖？", ["They rotate from cold edge to warm center", "They fly home", "They buy tickets for a plane", "They plant trees"], 0, "Birds take turns on the cold outside.", "企鹅会轮流站到寒冷的外圈。"),
    q("life", "adelie-group.jpg", "What helps penguins stay warm and dry?", "什么帮助企鹅既保暖又防水？", ["Waterproof feathers and a fat layer", "Metal armor", "Pink ice skates", "Red umbrellas"], 0, "They preen oil onto feathers.", "它们会把油脂梳理到羽毛上。"),
    q("life", "snares-forest.jpg", "About how many living penguin species are there?", "现生企鹅大约有多少种？", ["About 18", "Only 2", "More than 1,000", "Zero"], 0, "Counts can shift a little as scientists split groups.", "科学家重新分类时，数字可能稍有变化。"),
    q("life", "gentoo-jump.jpg", "After fishing, penguins…", "捕完鱼以后，企鹅会……", ["Go back on land", "Stay in the sky", "Turn into fish", "Live only in zoos"], 0, "They hop, climb, or waddle onto rocks and beaches.", "它们跳、爬或摇摇摆摆走上岩石和沙滩。"),
    q("can", "chinstrap-shuffle.jpg", "Can penguins shuffle with small steps on ice?", "企鹅能在冰上小步走吗？", ["Yes, they can", "No, they can't"], 0, "Tiny steps help them keep balance.", "小步能帮助保持平衡。"),
    q("can", "penguin-slide.jpg", "Can some penguins slide on their bellies?", "有的企鹅能用肚子滑行吗？", ["Yes, they can", "No, they can't"], 0, "Tobogganing is faster than walking on snow.", "在雪上滑行比走路更快。"),
    q("can", "story-cant", "Can penguins fly in the air like eagles?", "企鹅能像鹰一样在天上飞吗？", ["No, they can't", "Yes, they can"], 0, "Their wings are made for water, not sky.", "它们的翅膀是为水准备的，不是为天空。", "cant-fly"),
    q("fact", "macaroni.jpg", "Macaroni penguins got a 'fancy' name from…", "马卡罗尼企鹅这个花哨名字来自……", ["Golden head crests", "Pink ice skates", "Tree houses", "Red umbrellas"], 0, "People once called flashy hats 'macaroni'.", "以前人们把花哨的帽子叫 macaroni。"),
    q("fact", "fiordland.jpg", "Fiordland penguins nest in…", "峡湾企鹅筑巢在……", ["Rainy New Zealand forest and coasts", "The Sahara", "The North Pole", "City parks"], 0, "They like dense, wet coastal forest.", "它们喜欢潮湿茂密的海岸森林。"),
    q("fact", "yellow-eyed.jpg", "Yellow-eyed penguins are often…", "黄眼企鹅常常……", ["Shy forest-coast birds of New Zealand", "The biggest penguins", "Desert lizards", "The only flying penguins"], 0, "They do not form giant ice huddles.", "它们不会在冰上挤成超级大团。"),
    q("fact", "penguin-waddle.jpg", "A waddle happens because penguins have…", "企鹅摇摇摆摆，是因为它们……", ["Short legs and a round body", "Long giraffe necks", "Bicycle wheels", "Jet engines"], 0, "The walk looks funny but works on land.", "这样走路看起来滑稽，但在陆地上很管用。"),
    q("fact", "rockhopper-hop.jpg", "Rockhoppers got their English name because they…", "跳岩企鹅的英文名是因为它们……", ["Hop up rocky slopes", "Fly to the Moon", "Build oak nests", "Live only in zoos"], 0, "They bounce from rock to rock.", "它们会从一块岩石跳到另一块。")
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

  function hubFig(file, cap) {
    return "<figure>" + imgTag(file, cap) + (cap ? "<figcaption>" + cap + "</figcaption>" : "") + "</figure>";
  }

  function bindActivate(el, fn) {
    if (!el) return;
    el.onclick = fn;
    el.onkeydown = function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        fn();
      }
    };
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
      '<div class="lc-card" id="pgBi" role="button" tabindex="0">' +
      '<div class="lc-card-photos">' +
      hubFig("emperor-huddle.jpg", "群居 Huddle") +
      hubFig("magellanic-beach.jpg", "沙滩 Beach") +
      hubFig("snares-forest.jpg", "森林 Forest") +
      hubFig("rockhopper-fancy.jpg", "花哨 Fancy") +
      "</div><div class=\"lc-card-body\"><span class=\"lc-badge\">Bilingual</span>" +
      "<b>中英双语竞赛</b><span>题目中英对照，看图作答，适合中文讲解课。</span></div></div>" +
      '<div class="lc-card" id="pgEn" role="button" tabindex="0">' +
      '<div class="lc-card-photos">' +
      hubFig("fairy-small.jpg", "小蓝 Fairy") +
      hubFig("adelie-plain.jpg", "朴素 Plain") +
      hubFig("penguin-swim.jpg", "游泳 Swim") +
      hubFig("gentoo-land.jpg", "上岸 Land") +
      "</div><div class=\"lc-card-body\"><span class=\"lc-badge\">English</span>" +
      "<b>English Science Cup</b><span>English-only quiz with photos. Race for a high score.</span></div></div>" +
      "</div>";
    bindActivate(document.getElementById("pgBi"), function () { state.lang = "bi"; renderMenu(root); });
    bindActivate(document.getElementById("pgEn"), function () { state.lang = "en"; renderMenu(root); });
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
      menuCard("hab", bi ? "住哪里" : "Where do they live?", bi ? "冰 / 沙滩 / 森林 / 洋流" : "Ice, beach, forest, current", ["magellanic-beach.jpg", "emperor-ice.jpg", "snares-roots.jpg", "african.jpg"]) +
      menuCard("tf", bi ? "真假赛" : "True or false", bi ? "对还是错？看图判断" : "True or false with photos", ["penguin-swim.jpg", "penguin-slide.jpg", "emperor-huddle.jpg", "king-plain.jpg"]) +
      menuCard("look", bi ? "大·小·花哨·朴素" : "Big, small, fancy, plain", bi ? "外貌与课文对应" : "Match looks from the book", ["rockhopper-fancy.jpg", "fairy-small.jpg", "adelie-plain.jpg", "macaroni.jpg"]) +
      menuCard("life", bi ? "蛋·雏鸟·食物" : "Eggs, chicks, food", bi ? "生命故事看图答题" : "Life-cycle photo facts", ["penguin-egg.jpg", "emperor-egg.jpg", "penguin-fish.jpg", "african-bray.jpg"]) +
      menuCard("mix", bi ? "全能赛 18 题" : "Marathon 18", bi ? "混合题型争高分" : "Mixed facts, high score", ["penguin-splash.jpg", "penguin-fish.jpg", "yellow-eyed.jpg", "royal.jpg"]) +
      menuCard("match", bi ? "种类配对" : "Photo match", bi ? "照片配中英文名" : "Match photos to names", ["gentoo-land.jpg", "magellanic-pair.jpg", "rockhopper-crest.jpg", "adelie-group.jpg"]) +
      "</div>";
    document.getElementById("pgBack").onclick = function () { renderHub(root); };
    root.querySelectorAll("[data-game]").forEach(function (el) {
      bindActivate(el, function () {
        var g = el.getAttribute("data-game");
        if (g === "match") startMatch(root);
        else startQuiz(root, g);
      });
    });
  }

  function menuCard(id, title, desc, photos) {
    return '<div class="lc-card" role="button" tabindex="0" data-game="' + id + '">' +
      '<div class="lc-card-photos lc-card-cover">' + imgTag(photos[0], title) + "</div>" +
      '<div class="lc-card-body"><span class="lc-badge">Quiz</span><b>' + title + "</b><span>" + desc + "</span></div></div>";
  }

  function startQuiz(root, kind) {
    var pool = BANK.filter(function (item) {
      if (kind === "mix") return true;
      if (kind === "who") return item.kind === "who";
      if (kind === "hab") return item.kind === "hab";
      if (kind === "tf") return item.kind === "tf";
      if (kind === "look") return item.kind === "look" || item.kind === "can" || item.kind === "fact";
      if (kind === "life") return item.kind === "life";
      return true;
    });
    var n = kind === "mix" ? 18 : Math.min(12, pool.length);
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
      var zh = ZH_CHOICE[c];
      var inner = "<b>" + c + "</b>" + (bi && zh ? "<small>" + zh + "</small>" : "");
      return '<button type="button" class="pg-choice" data-i="' + idx + '">' + inner + "</button>";
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
