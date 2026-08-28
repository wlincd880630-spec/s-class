/**
 * 可解码词库 + 奇形词（heart words）
 * img 对应 assets/img/<key>.jpg 的 3D 卡通关键词图。
 */
(function (global) {
  "use strict";

  function w(word, zh, ipa, phonemes, graphemes, img, stage, tags) {
    return {
      id: word,
      word: word,
      zh: zh,
      ipa: ipa,
      phonemes: phonemes,
      graphemes: graphemes,
      img: img,
      src: "assets/img/" + img + ".jpg",
      stage: stage,
      tags: tags || []
    };
  }

  var words = [
    /* L01 SAT · 可解码拼读 */
    w("at", "在", "/æt/", ["a", "t"], ["a", "t"], "apple", 1, ["cvc", "blend"]),
    w("sat", "坐过", "/sæt/", ["s", "a", "t"], ["s", "a", "t"], "sun", 1, ["cvc"]),
    w("as", "作为", "/æz/", ["a", "z"], ["a", "s"], "apple", 1, ["cvc"]),
    /* L01 SAT · Oxford 式首音词（先听图，不要求整词解码） */
    w("apple", "苹果", "/æpl/", ["a"], ["a"], "apple", 1, ["initial", "vocab"]),
    w("ax", "斧头", "/æks/", ["a"], ["a"], "kite", 1, ["initial", "vocab"]),
    w("alligator", "鳄鱼", "/ælɪɡeɪtə/", ["a"], ["a"], "goat", 1, ["initial", "vocab"]),
    w("sofa", "沙发", "/səʊfə/", ["s"], ["s"], "bed", 1, ["initial", "vocab"]),
    w("sandwich", "三明治", "/sænwɪtʃ/", ["s"], ["s"], "sandwich", 1, ["initial", "vocab"]),
    w("ten", "十", "/ten/", ["t"], ["t"], "coin", 1, ["initial", "vocab"]),
    w("tiger", "老虎", "/taɪɡə/", ["t"], ["t"], "cat", 1, ["initial", "vocab"]),
    w("table", "桌子", "/teɪbl/", ["t"], ["t"], "house", 1, ["initial", "vocab"]),
    /* L02 PIN */
    w("pin", "别针", "/pɪn/", ["p", "i", "n"], ["p", "i", "n"], "pan", 1, ["cvc"]),
    w("pan", "平底锅", "/pæn/", ["p", "a", "n"], ["p", "a", "n"], "pan", 1, ["cvc"]),
    w("tap", "水龙头 / 轻拍", "/tæp/", ["t", "a", "p"], ["t", "a", "p"], "tap", 1, ["cvc"]),
    w("sit", "坐", "/sɪt/", ["s", "i", "t"], ["s", "i", "t"], "sun", 1, ["cvc"]),
    w("nap", "小睡", "/næp/", ["n", "a", "p"], ["n", "a", "p"], "nest", 1, ["cvc"]),
    w("sip", "小口喝", "/sɪp/", ["s", "i", "p"], ["s", "i", "p"], "sun", 1, ["cvc"]),
    w("tin", "锡罐", "/tɪn/", ["t", "i", "n"], ["t", "i", "n"], "tap", 1, ["cvc"]),
    w("pat", "轻拍", "/pæt/", ["p", "a", "t"], ["p", "a", "t"], "pan", 1, ["cvc"]),
    /* L03 SATPIN */
    w("spin", "旋转", "/spɪn/", ["s", "p", "i", "n"], ["s", "p", "i", "n"], "sun", 1, ["blend"]),
    w("snap", "啪地一声", "/snæp/", ["s", "n", "a", "p"], ["s", "n", "a", "p"], "sun", 1, ["blend"]),
    w("ant", "蚂蚁", "/ænt/", ["a", "n", "t"], ["a", "n", "t"], "insect", 1, ["cvc"]),
    /* L04 m d g */
    w("mad", "生气的", "/mæd/", ["m", "a", "d"], ["m", "a", "d"], "moon", 1, ["cvc"]),
    w("dig", "挖", "/dɪg/", ["d", "i", "g"], ["d", "i", "g"], "dog", 1, ["cvc"]),
    w("gap", "缺口", "/gæp/", ["g", "a", "p"], ["g", "a", "p"], "goat", 1, ["cvc"]),
    w("sad", "难过的", "/sæd/", ["s", "a", "d"], ["s", "a", "d"], "sun", 1, ["cvc"]),
    w("map", "地图", "/mæp/", ["m", "a", "p"], ["m", "a", "p"], "map", 1, ["cvc"]),
    w("dog", "狗", "/dɒg/", ["d", "o", "g"], ["d", "o", "g"], "dog", 2, ["cvc"]),
    /* L05 o c k ck */
    w("cat", "猫", "/kæt/", ["c", "a", "t"], ["c", "a", "t"], "cat", 2, ["cvc"]),
    w("kid", "小孩", "/kɪd/", ["k", "i", "d"], ["k", "i", "d"], "kite", 2, ["cvc"]),
    w("sock", "袜子", "/sɒk/", ["s", "o", "ck"], ["s", "o", "ck"], "sock", 2, ["cvc", "ck"]),
    w("duck", "鸭子", "/dʌk/", ["d", "u", "ck"], ["d", "u", "ck"], "duck", 2, ["cvc", "ck"]),
    w("kit", "工具包", "/kɪt/", ["k", "i", "t"], ["k", "i", "t"], "kite", 2, ["cvc"]),
    w("cap", "帽子", "/kæp/", ["c", "a", "p"], ["c", "a", "p"], "hat", 2, ["cvc"]),
    /* L06 e u r */
    w("red", "红色", "/red/", ["r", "e", "d"], ["r", "e", "d"], "rabbit", 2, ["cvc"]),
    w("run", "跑", "/rʌn/", ["r", "u", "n"], ["r", "u", "n"], "rabbit", 2, ["cvc"]),
    w("mug", "杯子", "/mʌg/", ["m", "u", "g"], ["m", "u", "g"], "moon", 2, ["cvc"]),
    w("bed", "床", "/bed/", ["b", "e", "d"], ["b", "e", "d"], "bed", 2, ["cvc"]),
    w("sun", "太阳", "/sʌn/", ["s", "u", "n"], ["s", "u", "n"], "sun", 2, ["cvc"]),
    w("hen", "母鸡", "/hen/", ["h", "e", "n"], ["h", "e", "n"], "egg", 2, ["cvc"]),
    /* L07 h b f */
    w("hat", "帽子", "/hæt/", ["h", "a", "t"], ["h", "a", "t"], "hat", 2, ["cvc"]),
    w("bat", "球棒 / 蝙蝠", "/bæt/", ["b", "a", "t"], ["b", "a", "t"], "ball", 2, ["cvc"]),
    w("fan", "风扇", "/fæn/", ["f", "a", "n"], ["f", "a", "n"], "fish", 2, ["cvc"]),
    w("hop", "单脚跳", "/hɒp/", ["h", "o", "p"], ["h", "o", "p"], "hop", 2, ["cvc"]),
    w("big", "大的", "/bɪg/", ["b", "i", "g"], ["b", "i", "g"], "ball", 2, ["cvc"]),
    w("fog", "雾", "/fɒg/", ["f", "o", "g"], ["f", "o", "g"], "cloud", 2, ["cvc"]),
    /* L08 l j v */
    w("lip", "嘴唇", "/lɪp/", ["l", "i", "p"], ["l", "i", "p"], "leaf", 2, ["cvc"]),
    w("jam", "果酱", "/dʒæm/", ["j", "a", "m"], ["j", "a", "m"], "jam", 2, ["cvc"]),
    w("van", "面包车", "/væn/", ["v", "a", "n"], ["v", "a", "n"], "van", 2, ["cvc"]),
    w("leg", "腿", "/leg/", ["l", "e", "g"], ["l", "e", "g"], "leaf", 2, ["cvc"]),
    w("jet", "喷气机", "/dʒet/", ["j", "e", "t"], ["j", "e", "t"], "jam", 2, ["cvc"]),
    w("vet", "兽医", "/vet/", ["v", "e", "t"], ["v", "e", "t"], "van", 2, ["cvc"]),
    /* L09 w x y z */
    w("web", "蜘蛛网", "/web/", ["w", "e", "b"], ["w", "e", "b"], "web", 2, ["cvc"]),
    w("box", "盒子", "/bɒks/", ["b", "o", "x"], ["b", "o", "x"], "box", 2, ["cvc"]),
    w("yes", "是", "/jes/", ["y", "e", "s"], ["y", "e", "s"], "yoyo", 2, ["cvc"]),
    w("zip", "拉链", "/zɪp/", ["z", "i", "p"], ["z", "i", "p"], "zip", 2, ["cvc"]),
    w("wax", "蜡", "/wæks/", ["w", "a", "x"], ["w", "a", "x"], "web", 2, ["cvc"]),
    w("fox", "狐狸", "/fɒks/", ["f", "o", "x"], ["f", "o", "x"], "mascot", 2, ["cvc"]),
    /* L10 qu + review */
    w("quit", "退出", "/kwɪt/", ["qu", "i", "t"], ["qu", "i", "t"], "queen", 2, ["qu"]),
    w("quiz", "小测验", "/kwɪz/", ["qu", "i", "z"], ["qu", "i", "z"], "queen", 2, ["qu"]),
    w("pig", "小猪", "/pɪg/", ["p", "i", "g"], ["p", "i", "g"], "pig", 2, ["cvc"]),
    w("cub", "幼兽", "/kʌb/", ["c", "u", "b"], ["c", "u", "b"], "cub", 2, ["cvc"]),
    /* Stage 3 digraphs */
    w("ship", "船", "/ʃɪp/", ["sh", "i", "p"], ["sh", "i", "p"], "ship", 3, ["digraph"]),
    w("fish", "鱼", "/fɪʃ/", ["f", "i", "sh"], ["f", "i", "sh"], "fish", 3, ["digraph"]),
    w("shop", "商店", "/ʃɒp/", ["sh", "o", "p"], ["sh", "o", "p"], "ship", 3, ["digraph"]),
    w("chick", "小鸡", "/tʃɪk/", ["ch", "i", "ck"], ["ch", "i", "ck"], "chick", 3, ["digraph"]),
    w("chop", "砍", "/tʃɒp/", ["ch", "o", "p"], ["ch", "o", "p"], "chick", 3, ["digraph"]),
    w("chin", "下巴", "/tʃɪn/", ["ch", "i", "n"], ["ch", "i", "n"], "chick", 3, ["digraph"]),
    w("thumb", "拇指", "/θʌm/", ["th", "u", "m"], ["th", "u", "mb"], "thumb", 3, ["digraph", "silent"]),
    w("thin", "瘦的", "/θɪn/", ["th", "i", "n"], ["th", "i", "n"], "thumb", 3, ["digraph"]),
    w("this", "这个", "/ðɪs/", ["thv", "i", "s"], ["th", "i", "s"], "feather", 3, ["digraph", "sight-decodable"]),
    w("that", "那个", "/ðæt/", ["thv", "a", "t"], ["th", "a", "t"], "feather", 3, ["digraph"]),
    w("whale", "鲸", "/weɪl/", ["wh", "a_e", "l"], ["wh", "a", "le"], "whale", 3, ["digraph", "magic-e"]),
    w("when", "何时", "/wen/", ["wh", "e", "n"], ["wh", "e", "n"], "whale", 3, ["digraph"]),
    w("ring", "戒指 / 铃", "/rɪŋ/", ["r", "i", "ng"], ["r", "i", "ng"], "ring", 3, ["digraph"]),
    w("sing", "唱", "/sɪŋ/", ["s", "i", "ng"], ["s", "i", "ng"], "ring", 3, ["digraph"]),
    w("pink", "粉色", "/pɪŋk/", ["p", "i", "nk"], ["p", "i", "nk"], "pig", 3, ["cluster"]),
    w("sink", "水槽 / 下沉", "/sɪŋk/", ["s", "i", "nk"], ["s", "i", "nk"], "sun", 3, ["cluster"]),
    /* blends */
    w("stop", "停", "/stɒp/", ["s", "t", "o", "p"], ["s", "t", "o", "p"], "sun", 3, ["blend"]),
    w("frog", "青蛙", "/frɒg/", ["f", "r", "o", "g"], ["f", "r", "o", "g"], "goat", 3, ["blend"]),
    w("flag", "旗", "/flæg/", ["f", "l", "a", "g"], ["f", "l", "a", "g"], "leaf", 3, ["blend"]),
    w("crab", "螃蟹", "/kræb/", ["c", "r", "a", "b"], ["c", "r", "a", "b"], "cat", 3, ["blend"]),
    w("swim", "游泳", "/swɪm/", ["s", "w", "i", "m"], ["s", "w", "i", "m"], "fish", 3, ["blend"]),
    w("plug", "插头", "/plʌg/", ["p", "l", "u", "g"], ["p", "l", "u", "g"], "pan", 3, ["blend"]),
    w("drum", "鼓", "/drʌm/", ["d", "r", "u", "m"], ["d", "r", "u", "m"], "dog", 3, ["blend"]),
    w("slip", "滑", "/slɪp/", ["s", "l", "i", "p"], ["s", "l", "i", "p"], "sun", 3, ["blend"]),
    /* Stage 4 Magic E */
    w("cake", "蛋糕", "/keɪk/", ["c", "a_e", "k"], ["c", "a", "ke"], "cake", 4, ["magic-e"]),
    w("name", "名字", "/neɪm/", ["n", "a_e", "m"], ["n", "a", "me"], "nest", 4, ["magic-e"]),
    w("tape", "胶带", "/teɪp/", ["t", "a_e", "p"], ["t", "a", "pe"], "tap", 4, ["magic-e"]),
    w("kite", "风筝", "/kaɪt/", ["k", "i_e", "t"], ["k", "i", "te"], "kite", 4, ["magic-e"]),
    w("like", "喜欢", "/laɪk/", ["l", "i_e", "k"], ["l", "i", "ke"], "leaf", 4, ["magic-e"]),
    w("time", "时间", "/taɪm/", ["t", "i_e", "m"], ["t", "i", "me"], "tap", 4, ["magic-e"]),
    w("home", "家", "/həʊm/", ["h", "o_e", "m"], ["h", "o", "me"], "house", 4, ["magic-e"]),
    w("bone", "骨头", "/bəʊn/", ["b", "o_e", "n"], ["b", "o", "ne"], "dog", 4, ["magic-e"]),
    w("nose", "鼻子", "/nəʊz/", ["n", "o_e", "z"], ["n", "o", "se"], "nest", 4, ["magic-e"]),
    w("cube", "立方体", "/kjuːb/", ["c", "u_e", "b"], ["c", "u", "be"], "cub", 4, ["magic-e"]),
    w("tune", "曲子", "/tjuːn/", ["t", "u_e", "n"], ["t", "u", "ne"], "tap", 4, ["magic-e"]),
    w("these", "这些", "/ðiːz/", ["thv", "e_e", "z"], ["th", "e", "se"], "feather", 4, ["magic-e"]),
    /* vowel teams */
    w("rain", "雨", "/reɪn/", ["r", "ai", "n"], ["r", "ai", "n"], "rain", 4, ["team"]),
    w("tail", "尾巴", "/teɪl/", ["t", "ai", "l"], ["t", "ai", "l"], "cat", 4, ["team"]),
    w("play", "玩", "/pleɪ/", ["p", "l", "ay"], ["p", "l", "ay"], "ball", 4, ["team"]),
    w("day", "白天", "/deɪ/", ["d", "ay"], ["d", "ay"], "sun", 4, ["team"]),
    w("tree", "树", "/triː/", ["t", "r", "ee"], ["t", "r", "ee"], "tree", 4, ["team"]),
    w("see", "看见", "/siː/", ["s", "ee"], ["s", "ee"], "sun", 4, ["team"]),
    w("leaf", "叶子", "/liːf/", ["l", "ea", "f"], ["l", "ea", "f"], "leaf", 4, ["team"]),
    w("sea", "海", "/siː/", ["s", "ea"], ["s", "ea"], "fish", 4, ["team"]),
    w("night", "夜晚", "/naɪt/", ["n", "igh", "t"], ["n", "igh", "t"], "night", 4, ["team"]),
    w("light", "光", "/laɪt/", ["l", "igh", "t"], ["l", "igh", "t"], "sun", 4, ["team"]),
    w("boat", "小船", "/bəʊt/", ["b", "oa", "t"], ["b", "oa", "t"], "boat", 4, ["team"]),
    w("road", "路", "/rəʊd/", ["r", "oa", "d"], ["r", "oa", "d"], "car", 4, ["team"]),
    w("snow", "雪", "/snəʊ/", ["s", "n", "ow"], ["s", "n", "ow"], "cloud", 4, ["team"]),
    w("glue", "胶水", "/gluː/", ["g", "l", "ue"], ["g", "l", "ue"], "glue", 4, ["team"]),
    w("blue", "蓝色", "/bluː/", ["b", "l", "ue"], ["b", "l", "ue"], "glue", 4, ["team"]),
    /* Stage 5 r-controlled + diphthongs */
    w("car", "汽车", "/kɑː/", ["c", "ar"], ["c", "ar"], "car", 5, ["bossy-r"]),
    w("star", "星星", "/stɑː/", ["s", "t", "ar"], ["s", "t", "ar"], "night", 5, ["bossy-r"]),
    w("park", "公园", "/pɑːk/", ["p", "ar", "k"], ["p", "ar", "k"], "tree", 5, ["bossy-r"]),
    w("fork", "叉子", "/fɔːk/", ["f", "or", "k"], ["f", "or", "k"], "fork", 5, ["bossy-r"]),
    w("corn", "玉米", "/kɔːn/", ["c", "or", "n"], ["c", "or", "n"], "orange", 5, ["bossy-r"]),
    w("bird", "鸟", "/bɜːd/", ["b", "ir", "d"], ["b", "ir", "d"], "bird", 5, ["bossy-r"]),
    w("her", "她的", "/hɜː/", ["h", "er"], ["h", "er"], "hat", 5, ["bossy-r"]),
    w("fur", "毛皮", "/fɜː/", ["f", "ur"], ["f", "ur"], "rabbit", 5, ["bossy-r"]),
    w("moon", "月亮", "/muːn/", ["m", "oo", "n"], ["m", "oo", "n"], "moon", 5, ["oo"]),
    w("food", "食物", "/fuːd/", ["f", "oo", "d"], ["f", "oo", "d"], "jam", 5, ["oo"]),
    w("book", "书", "/bʊk/", ["b", "oo_s", "k"], ["b", "oo", "k"], "book", 5, ["oo"]),
    w("look", "看", "/lʊk/", ["l", "oo_s", "k"], ["l", "oo", "k"], "book", 5, ["oo"]),
    w("cloud", "云", "/klaʊd/", ["c", "l", "ou", "d"], ["c", "l", "ou", "d"], "cloud", 5, ["diphthong"]),
    w("house", "房子", "/haʊs/", ["h", "ou", "s"], ["h", "ou", "se"], "house", 5, ["diphthong"]),
    w("cow", "奶牛", "/kaʊ/", ["c", "ow_d"], ["c", "ow"], "cloud", 5, ["diphthong"]),
    w("now", "现在", "/naʊ/", ["n", "ow_d"], ["n", "ow"], "night", 5, ["diphthong"]),
    w("coin", "硬币", "/kɔɪn/", ["c", "oi", "n"], ["c", "oi", "n"], "coin", 5, ["diphthong"]),
    w("boil", "煮沸", "/bɔɪl/", ["b", "oi", "l"], ["b", "oi", "l"], "pan", 5, ["diphthong"]),
    w("boy", "男孩", "/bɔɪ/", ["b", "oy"], ["b", "oy"], "boy", 5, ["diphthong"]),
    w("toy", "玩具", "/tɔɪ/", ["t", "oy"], ["t", "oy"], "yoyo", 5, ["diphthong"]),
    w("straw", "吸管", "/strɔː/", ["s", "t", "r", "aw"], ["s", "t", "r", "aw"], "straw", 5, ["team"]),
    w("saw", "锯子 / 看见", "/sɔː/", ["s", "aw"], ["s", "aw"], "straw", 5, ["team"]),
    w("photo", "照片", "/ˈfəʊtəʊ/", ["ph", "o_e", "t", "o_e"], ["ph", "o", "to"], "photo", 5, ["ph", "multi"]),
    w("phone", "电话", "/fəʊn/", ["ph", "o_e", "n"], ["ph", "o", "ne"], "photo", 5, ["ph"]),
    w("ice", "冰", "/aɪs/", ["i_e", "soft_c"], ["i", "ce"], "ice", 5, ["soft-c"]),
    w("city", "城市", "/ˈsɪti/", ["soft_c", "i", "t", "y"], ["c", "i", "t", "y"], "house", 5, ["soft-c"]),
    w("gem", "宝石", "/dʒem/", ["soft_g", "e", "m"], ["g", "e", "m"], "ring", 5, ["soft-g"]),
    w("knee", "膝盖", "/niː/", ["n", "ee"], ["kn", "ee"], "hop", 5, ["silent"]),
    w("write", "写", "/raɪt/", ["r", "i_e", "t"], ["wr", "i", "te"], "book", 5, ["silent"]),
    w("lamb", "小羊", "/læm/", ["l", "a", "m"], ["l", "a", "mb"], "goat", 5, ["silent"]),
    /* Stage 6 multi */
    w("sunset", "日落", "/ˈsʌnset/", ["s", "u", "n", "s", "e", "t"], ["sun", "set"], "sun", 6, ["multi"]),
    w("picnic", "野餐", "/ˈpɪknɪk/", ["p", "i", "c", "n", "i", "c"], ["pic", "nic"], "jam", 6, ["multi"]),
    w("rabbit", "兔子", "/ˈræbɪt/", ["r", "a", "b", "i", "t"], ["rab", "bit"], "rabbit", 6, ["multi"]),
    w("basket", "篮子", "/ˈbɑːskɪt/", ["b", "a", "s", "k", "e", "t"], ["bas", "ket"], "ball", 6, ["multi"]),
    w("umbrella", "雨伞", "/ʌmˈbrelə/", ["u", "m", "b", "r", "e", "l", "schwa"], ["um", "brel", "la"], "umbrella", 6, ["multi"]),
    w("apple", "苹果", "/ˈæpəl/", ["a", "p", "l"], ["ap", "ple"], "apple", 6, ["cle"]),
    w("table", "桌子", "/ˈteɪbəl/", ["t", "a_e", "b", "l"], ["ta", "ble"], "pan", 6, ["cle"])
  ];

  var sight = [
    { word: "I", zh: "我", ipa: "/aɪ/", heart: "I", decodable: false, stage: 1, tip: "字母名就是读音，当作「心形词」整体认。" },
    { word: "a", zh: "一个", ipa: "/ə/ 或 /eɪ/", heart: "a", decodable: false, stage: 1, tip: "非重读常读 /ə/，强调时可读 /eɪ/。" },
    { word: "the", zh: "这/那", ipa: "/ðə/ /ðiː/", heart: "the", decodable: false, stage: 1, tip: "th 是浊音 /ð/；元音前可读 /ðiː/。" },
    { word: "to", zh: "到", ipa: "/tuː/ /tə/", heart: "o", decodable: false, stage: 1, tip: "o 不读短音，常弱读 /tə/。" },
    { word: "no", zh: "不", ipa: "/nəʊ/", heart: "", decodable: true, stage: 1, tip: "开音节：o 读字母名。" },
    { word: "go", zh: "去", ipa: "/gəʊ/", heart: "", decodable: true, stage: 1, tip: "开音节：o 读字母名。" },
    { word: "into", zh: "进入", ipa: "/ˈɪntə/", heart: "o", decodable: false, stage: 1, tip: "in 可拼，to 的 o 要记。" },
    { word: "he", zh: "他", ipa: "/hiː/", heart: "", decodable: true, stage: 2, tip: "开音节 e 读 /iː/。" },
    { word: "she", zh: "她", ipa: "/ʃiː/", heart: "", decodable: true, stage: 2, tip: "sh + 开音节 e。" },
    { word: "we", zh: "我们", ipa: "/wiː/", heart: "", decodable: true, stage: 2, tip: "开音节。" },
    { word: "me", zh: "我（宾格）", ipa: "/miː/", heart: "", decodable: true, stage: 2, tip: "开音节。" },
    { word: "be", zh: "是", ipa: "/biː/", heart: "", decodable: true, stage: 2, tip: "开音节。" },
    { word: "was", zh: "是（过去）", ipa: "/wɒz/", heart: "a", decodable: false, stage: 2, tip: "a 读 /ɒ/，s 读 /z/。" },
    { word: "you", zh: "你", ipa: "/juː/", heart: "ou", decodable: false, stage: 2, tip: "ou 整体记 /juː/。" },
    { word: "they", zh: "他们", ipa: "/ðeɪ/", heart: "ey", decodable: false, stage: 2, tip: "th 浊音，ey 读 /eɪ/。" },
    { word: "all", zh: "全部", ipa: "/ɔːl/", heart: "a", decodable: false, stage: 2, tip: "a 在 ll 前常读 /ɔː/。" },
    { word: "are", zh: "是", ipa: "/ɑː/", heart: "are", decodable: false, stage: 2, tip: "整体记 /ɑː/。" },
    { word: "my", zh: "我的", ipa: "/maɪ/", heart: "", decodable: true, stage: 2, tip: "词尾 y 读 /aɪ/。" },
    { word: "her", zh: "她的", ipa: "/hɜː/", heart: "", decodable: true, stage: 2, tip: "er 受 r 控制。" },
    { word: "said", zh: "说", ipa: "/sed/", heart: "ai", decodable: false, stage: 3, tip: "ai 破例读 /e/。" },
    { word: "have", zh: "有", ipa: "/hæv/", heart: "e", decodable: false, stage: 3, tip: "词尾 e 不让 a 变长音。" },
    { word: "like", zh: "喜欢", ipa: "/laɪk/", heart: "", decodable: true, stage: 4, tip: "标准 Magic E。" },
    { word: "so", zh: "所以", ipa: "/səʊ/", heart: "", decodable: true, stage: 3, tip: "开音节。" },
    { word: "do", zh: "做", ipa: "/duː/", heart: "o", decodable: false, stage: 3, tip: "o 读 /uː/。" },
    { word: "some", zh: "一些", ipa: "/sʌm/", heart: "o", decodable: false, stage: 3, tip: "o 读 /ʌ/，e 不发音。" },
    { word: "come", zh: "来", ipa: "/kʌm/", heart: "o", decodable: false, stage: 3, tip: "与 some 同一家族。" },
    { word: "were", zh: "是（过去复数）", ipa: "/wɜː/", heart: "ere", decodable: false, stage: 3, tip: "整体记 /wɜː/。" },
    { word: "there", zh: "那里", ipa: "/ðeə/", heart: "ere", decodable: false, stage: 3, tip: "th 浊音，ere 读 /eə/。" },
    { word: "little", zh: "小的", ipa: "/ˈlɪtəl/", heart: "", decodable: true, stage: 3, tip: "可按音节 lit-tle。" },
    { word: "one", zh: "一", ipa: "/wʌn/", heart: "o,e", decodable: false, stage: 3, tip: "完全不像拼写，整词记。" },
    { word: "when", zh: "何时", ipa: "/wen/", heart: "", decodable: true, stage: 3, tip: "wh = /w/。" },
    { word: "out", zh: "出去", ipa: "/aʊt/", heart: "", decodable: true, stage: 3, tip: "ou = /aʊ/。" },
    { word: "what", zh: "什么", ipa: "/wɒt/", heart: "a", decodable: false, stage: 3, tip: "a 读 /ɒ/。" },
    { word: "said", zh: "说", ipa: "/sed/", heart: "ai", decodable: false, stage: 4, tip: "高频破例。" },
    { word: "people", zh: "人们", ipa: "/ˈpiːpəl/", heart: "eo", decodable: false, stage: 4, tip: "eo 读 /iː/。" },
    { word: "their", zh: "他们的", ipa: "/ðeə/", heart: "eir", decodable: false, stage: 4, tip: "与 there 同音不同形。" },
    { word: "could", zh: "能够", ipa: "/kʊd/", heart: "oul", decodable: false, stage: 5, tip: "oul 读短 /ʊ/。" },
    { word: "would", zh: "会", ipa: "/wʊd/", heart: "oul", decodable: false, stage: 5, tip: "与 could、should 一家。" },
    { word: "should", zh: "应该", ipa: "/ʃʊd/", heart: "oul", decodable: false, stage: 5, tip: "sh + ould 家族。" },
    { word: "because", zh: "因为", ipa: "/bɪˈkɒz/", heart: "au,e", decodable: false, stage: 6, tip: "分音节 be-cause。" },
    { word: "once", zh: "曾经", ipa: "/wʌns/", heart: "o", decodable: false, stage: 6, tip: "o 读 /wʌ/。" },
    { word: "friend", zh: "朋友", ipa: "/frend/", heart: "ie", decodable: false, stage: 6, tip: "ie 读 /e/。" },
    { word: "two", zh: "二", ipa: "/tuː/", heart: "w", decodable: false, stage: 4, tip: "w 不发音。" },
    { word: "does", zh: "做（三单）", ipa: "/dʌz/", heart: "oe", decodable: false, stage: 4, tip: "oe 读 /ʌ/。" }
  ];

  var map = {};
  words.forEach(function (item) {
    map[item.word] = item;
  });

  function getWord(id) {
    if (map[id]) return map[id];
    for (var i = 0; i < sight.length; i++) {
      if (sight[i].word === id) {
        var s = sight[i];
        return {
          id: s.word,
          word: s.word,
          zh: s.zh,
          ipa: s.ipa,
          phonemes: [],
          graphemes: s.word.split(""),
          img: "mascot",
          src: "assets/img/mascot.jpg",
          stage: s.stage,
          tags: ["sight"],
          tip: s.tip,
          heart: s.heart
        };
      }
    }
    return null;
  }

  function wordsByStage(stage) {
    return words.filter(function (x) {
      return x.stage === stage;
    });
  }

  function wordsUpTo(stage) {
    return words.filter(function (x) {
      return x.stage <= stage;
    });
  }

  function sightByStage(stage) {
    return sight.filter(function (x) {
      return x.stage === stage;
    });
  }

  function sightUpTo(stage) {
    var seen = {};
    return sight.filter(function (x) {
      if (x.stage > stage || seen[x.word]) return false;
      seen[x.word] = true;
      return true;
    });
  }

  global.PHONICS_WORDS = words;
  global.PHONICS_WORD_MAP = map;
  global.PHONICS_SIGHT = sight;
  global.phonicsGetWord = getWord;
  global.phonicsWordsByStage = wordsByStage;
  global.phonicsWordsUpTo = wordsUpTo;
  global.phonicsSightByStage = sightByStage;
  global.phonicsSightUpTo = sightUpTo;
})(typeof window !== "undefined" ? window : this);
