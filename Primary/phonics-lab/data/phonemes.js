/**
 * 60 小时自然拼读 · 音素总表
 * IPA 采用英式 RP；Azure 同时提供 IPA / SAPI 标注。
 */
(function (global) {
  "use strict";

  var IMG = "assets/img/";

  var list = [
    /* —— 辅音：字母音 —— */
    { id: "s", ipa: "s", ipaDisplay: "/s/", type: "consonant", manner: "fricative", voiced: false, holdable: true, graphemes: ["s", "ss", "c"], keyword: "sun", keywordZh: "太阳", img: "sun", azureIpa: "s", azureSapi: "s", stretch: "sss", tip: "牙齿轻轻靠拢，舌尖抵下齿，送气像小蛇 sss，不要加「呃」。", stage: 1 },
    { id: "a", ipa: "æ", ipaDisplay: "/æ/", type: "vowel", manner: "short", voiced: true, holdable: true, graphemes: ["a"], keyword: "apple", keywordZh: "苹果", img: "apple", azureIpa: "æ", azureSapi: "ae", stretch: "aaaa", tip: "嘴巴横开、扁平，像拍照说 cheese 的前半，短促的猫叫声。", stage: 1 },
    { id: "t", ipa: "t", ipaDisplay: "/t/", type: "consonant", manner: "stop", voiced: false, holdable: false, graphemes: ["t", "tt"], keyword: "tap", keywordZh: "水龙头", img: "tap", azureIpa: "t", azureSapi: "t", stretch: "t", tip: "舌尖轻点上牙龈，气流突然放出。截断，不要读成「特」。", stage: 1 },
    { id: "p", ipa: "p", ipaDisplay: "/p/", type: "consonant", manner: "stop", voiced: false, holdable: false, graphemes: ["p", "pp"], keyword: "pan", keywordZh: "平底锅", img: "pan", azureIpa: "p", azureSapi: "p", stretch: "p", tip: "双唇紧闭后突然张开送气。截断，不要读成「普」。", stage: 1 },
    { id: "i", ipa: "ɪ", ipaDisplay: "/ɪ/", type: "vowel", manner: "short", voiced: true, holdable: true, graphemes: ["i"], keyword: "insect", keywordZh: "昆虫", img: "insect", azureIpa: "ɪ", azureSapi: "ih", stretch: "ih", tip: "嘴角微拉，短而松，像 itchy 里的 i，不是字母名 /aɪ/。", stage: 1 },
    { id: "n", ipa: "n", ipaDisplay: "/n/", type: "consonant", manner: "nasal", voiced: true, holdable: true, graphemes: ["n", "nn"], keyword: "nest", keywordZh: "鸟巢", img: "nest", azureIpa: "n", azureSapi: "n", stretch: "nnn", tip: "舌尖抵上牙龈，气流从鼻子出来，可以拉长 nnn。", stage: 1 },
    { id: "m", ipa: "m", ipaDisplay: "/m/", type: "consonant", manner: "nasal", voiced: true, holdable: true, graphemes: ["m", "mm"], keyword: "moon", keywordZh: "月亮", img: "moon", azureIpa: "m", azureSapi: "m", stretch: "mmm", tip: "双唇闭合，声音从鼻子出来，像品尝美食 mmm。", stage: 1 },
    { id: "d", ipa: "d", ipaDisplay: "/d/", type: "consonant", manner: "stop", voiced: true, holdable: false, graphemes: ["d", "dd"], keyword: "dog", keywordZh: "小狗", img: "dog", azureIpa: "d", azureSapi: "d", stretch: "d", tip: "舌尖点上牙龈，声带振动。截断，不要读成「的」。", stage: 1 },
    { id: "g", ipa: "g", ipaDisplay: "/g/", type: "consonant", manner: "stop", voiced: true, holdable: false, graphemes: ["g", "gg"], keyword: "goat", keywordZh: "山羊", img: "goat", azureIpa: "g", azureSapi: "g", stretch: "g", tip: "舌根抵软腭后放开。硬音 /g/，不是字母名 /dʒiː/。", stage: 2 },
    { id: "o", ipa: "ɒ", ipaDisplay: "/ɒ/", type: "vowel", manner: "short", voiced: true, holdable: true, graphemes: ["o"], keyword: "orange", keywordZh: "橙子", img: "orange", azureIpa: "ɒ", azureSapi: "aa", stretch: "o", tip: "嘴巴圆而短，英式短 o，像 hot、dog。", stage: 2 },
    { id: "c", ipa: "k", ipaDisplay: "/k/", type: "consonant", manner: "stop", voiced: false, holdable: false, graphemes: ["c", "k", "ck", "q"], keyword: "cat", keywordZh: "小猫", img: "cat", azureIpa: "k", azureSapi: "k", stretch: "k", tip: "硬 c：后面是 a/o/u 时读 /k/。截断，不要读成「克」。", stage: 2 },
    { id: "k", ipa: "k", ipaDisplay: "/k/", type: "consonant", manner: "stop", voiced: false, holdable: false, graphemes: ["k", "c", "ck"], keyword: "kite", keywordZh: "风筝", img: "kite", azureIpa: "k", azureSapi: "k", stretch: "k", tip: "与硬 c 同音 /k/。词首常用 k（kite、kid）。", stage: 2 },
    { id: "ck", ipa: "k", ipaDisplay: "/k/", type: "consonant", manner: "stop", voiced: false, holdable: false, graphemes: ["ck"], keyword: "duck", keywordZh: "小鸭", img: "duck", azureIpa: "k", azureSapi: "k", stretch: "k", tip: "短元音后面的 /k/ 常写成 ck：duck、sock、back。", stage: 2 },
    { id: "e", ipa: "e", ipaDisplay: "/e/", type: "vowel", manner: "short", voiced: true, holdable: true, graphemes: ["e"], keyword: "egg", keywordZh: "鸡蛋", img: "egg", azureIpa: "ɛ", azureSapi: "eh", stretch: "e", tip: "嘴巴半开、短促，像 egg、bed，不是字母名 /iː/。", stage: 2 },
    { id: "u", ipa: "ʌ", ipaDisplay: "/ʌ/", type: "vowel", manner: "short", voiced: true, holdable: true, graphemes: ["u"], keyword: "umbrella", keywordZh: "雨伞", img: "umbrella", azureIpa: "ʌ", azureSapi: "ah", stretch: "uh", tip: "嘴巴自然松开，短促的 uh，像 sun、cup。", stage: 2 },
    { id: "r", ipa: "r", ipaDisplay: "/r/", type: "consonant", manner: "approximant", voiced: true, holdable: true, graphemes: ["r", "rr", "wr"], keyword: "rabbit", keywordZh: "兔子", img: "rabbit", azureIpa: "ɹ", azureSapi: "r", stretch: "rrr", tip: "舌尖上卷但不碰牙龈，不要打中文颤音。", stage: 2 },
    { id: "h", ipa: "h", ipaDisplay: "/h/", type: "consonant", manner: "fricative", voiced: false, holdable: true, graphemes: ["h"], keyword: "hat", keywordZh: "帽子", img: "hat", azureIpa: "h", azureSapi: "h", stretch: "hhh", tip: "轻轻呵气，像哈气到镜子上，不要加元音。", stage: 2 },
    { id: "b", ipa: "b", ipaDisplay: "/b/", type: "consonant", manner: "stop", voiced: true, holdable: false, graphemes: ["b", "bb"], keyword: "ball", keywordZh: "球", img: "ball", azureIpa: "b", azureSapi: "b", stretch: "b", tip: "双唇闭合后放开，声带振动。截断，不要读成「布」。", stage: 2 },
    { id: "f", ipa: "f", ipaDisplay: "/f/", type: "consonant", manner: "fricative", voiced: false, holdable: true, graphemes: ["f", "ff", "ph"], keyword: "fish", keywordZh: "鱼", img: "fish", azureIpa: "f", azureSapi: "f", stretch: "fff", tip: "上齿轻咬下唇，送气 fff，可以拉长。", stage: 2 },
    { id: "l", ipa: "l", ipaDisplay: "/l/", type: "consonant", manner: "lateral", voiced: true, holdable: true, graphemes: ["l", "ll"], keyword: "leaf", keywordZh: "叶子", img: "leaf", azureIpa: "l", azureSapi: "l", stretch: "lll", tip: "舌尖抵上牙龈，气流从两边出来，拉长 lll。", stage: 2 },
    { id: "j", ipa: "dʒ", ipaDisplay: "/dʒ/", type: "consonant", manner: "affricate", voiced: true, holdable: false, graphemes: ["j", "g", "dge"], keyword: "jam", keywordZh: "果酱", img: "jam", azureIpa: "dʒ", azureSapi: "jh", stretch: "j", tip: "像 jet 的起音，舌面贴上颚后迅速放开。", stage: 2 },
    { id: "v", ipa: "v", ipaDisplay: "/v/", type: "consonant", manner: "fricative", voiced: true, holdable: true, graphemes: ["v"], keyword: "van", keywordZh: "面包车", img: "van", azureIpa: "v", azureSapi: "v", stretch: "vvv", tip: "口型同 /f/，但声带要振动，可以拉长 vvv。", stage: 2 },
    { id: "w", ipa: "w", ipaDisplay: "/w/", type: "consonant", manner: "approximant", voiced: true, holdable: false, graphemes: ["w", "wh"], keyword: "web", keywordZh: "蜘蛛网", img: "web", azureIpa: "w", azureSapi: "w", stretch: "w", tip: "双唇收圆后迅速滑向后面的元音，像 wind。", stage: 2 },
    { id: "x", ipa: "ks", ipaDisplay: "/ks/", type: "consonant", manner: "cluster", voiced: false, holdable: false, graphemes: ["x"], keyword: "box", keywordZh: "盒子", img: "box", azureIpa: "ks", azureSapi: "k s", stretch: "ks", tip: "字母 x 在词尾常读 /ks/：box、fox、six。", stage: 2 },
    { id: "y", ipa: "j", ipaDisplay: "/j/", type: "consonant", manner: "approximant", voiced: true, holdable: false, graphemes: ["y"], keyword: "yoyo", keywordZh: "悠悠球", img: "yoyo", azureIpa: "j", azureSapi: "y", stretch: "y", tip: "词首 y 常读 /j/，像 yes、yellow。", stage: 2 },
    { id: "z", ipa: "z", ipaDisplay: "/z/", type: "consonant", manner: "fricative", voiced: true, holdable: true, graphemes: ["z", "zz", "s"], keyword: "zip", keywordZh: "拉链", img: "zip", azureIpa: "z", azureSapi: "z", stretch: "zzz", tip: "口型同 /s/，声带振动，像小蜜蜂 zzz。", stage: 2 },
    { id: "qu", ipa: "kw", ipaDisplay: "/kw/", type: "consonant", manner: "cluster", voiced: false, holdable: false, graphemes: ["qu"], keyword: "queen", keywordZh: "女王蜂", img: "queen", azureIpa: "kw", azureSapi: "k w", stretch: "kw", tip: "q 几乎总是跟着 u，合起来读 /kw/。", stage: 2 },

    /* —— 辅音音组 / Digraphs —— */
    { id: "sh", ipa: "ʃ", ipaDisplay: "/ʃ/", type: "digraph", manner: "fricative", voiced: false, holdable: true, graphemes: ["sh", "ti", "ci"], keyword: "ship", keywordZh: "小船", img: "ship", azureIpa: "ʃ", azureSapi: "sh", stretch: "shhh", tip: "嘴唇微圆，像请别人安静 shhh。两个字母一个音。", stage: 3 },
    { id: "ch", ipa: "tʃ", ipaDisplay: "/tʃ/", type: "digraph", manner: "affricate", voiced: true, holdable: false, graphemes: ["ch", "tch"], keyword: "chick", keywordZh: "小鸡", img: "chick", azureIpa: "tʃ", azureSapi: "ch", stretch: "ch", tip: "像火车声的起音 ch，短促爆破。", stage: 3 },
    { id: "th", ipa: "θ", ipaDisplay: "/θ/", type: "digraph", manner: "fricative", voiced: false, holdable: true, graphemes: ["th"], label: "th 清", keyword: "thumb", keywordZh: "拇指", img: "thumb", azureIpa: "θ", azureSapi: "th", stretch: "thhh", tip: "清辅音：舌尖轻咬上下齿之间，只送气不振动声带。thumb、think、thin、three。", stage: 3 },
    { id: "thv", ipa: "ð", ipaDisplay: "/ð/", type: "digraph", manner: "fricative", voiced: true, holdable: true, graphemes: ["th"], label: "th 浊", keyword: "this", keywordZh: "这个", img: "feather", azureIpa: "ð", azureSapi: "dh", stretch: "thh", tip: "浊辅音：口型同清 th，但声带要振动。this、that、the、they、feather。", stage: 3 },
    { id: "wh", ipa: "w", ipaDisplay: "/w/", type: "digraph", manner: "approximant", voiced: true, holdable: false, graphemes: ["wh"], keyword: "whale", keywordZh: "鲸鱼", img: "whale", azureIpa: "w", azureSapi: "w", stretch: "w", tip: "现代英语 wh 多读 /w/：whale、when、white。", stage: 3 },
    { id: "ng", ipa: "ŋ", ipaDisplay: "/ŋ/", type: "digraph", manner: "nasal", voiced: true, holdable: true, graphemes: ["ng"], keyword: "ring", keywordZh: "戒指", img: "ring", azureIpa: "ŋ", azureSapi: "ng", stretch: "ng", tip: "舌根抵软腭，鼻音，像唱完歌的尾音。不要读成「ng-g」。", stage: 3 },
    { id: "nk", ipa: "ŋk", ipaDisplay: "/ŋk/", type: "cluster", manner: "cluster", voiced: false, holdable: false, graphemes: ["nk"], keyword: "pink", keywordZh: "粉色", img: "pig", azureIpa: "ŋk", azureSapi: "ng k", stretch: "nk", tip: "ring 的鼻音后面再加 /k/：pink、sink、bank。", stage: 3 },

    /* —— 长元音 Magic E —— */
    { id: "a_e", ipa: "eɪ", ipaDisplay: "/eɪ/", type: "vowel", manner: "magic-e", voiced: true, holdable: true, graphemes: ["a_e", "ai", "ay"], keyword: "cake", keywordZh: "蛋糕", img: "cake", azureIpa: "eɪ", azureSapi: "ey", stretch: "ay", tip: "词尾不发音的 e 让前面的 a 读字母名 /eɪ/：cake、name。", stage: 4 },
    { id: "i_e", ipa: "aɪ", ipaDisplay: "/aɪ/", type: "vowel", manner: "magic-e", voiced: true, holdable: true, graphemes: ["i_e", "igh", "ie", "y"], keyword: "kite", keywordZh: "风筝", img: "kite", azureIpa: "aɪ", azureSapi: "ay", stretch: "eye", tip: "魔法 e 让 i 读字母名 /aɪ/：kite、time、like。", stage: 4 },
    { id: "o_e", ipa: "əʊ", ipaDisplay: "/əʊ/", type: "vowel", manner: "magic-e", voiced: true, holdable: true, graphemes: ["o_e", "oa", "ow"], keyword: "home", keywordZh: "家", img: "house", azureIpa: "əʊ", azureSapi: "ow", stretch: "oh", tip: "魔法 e 让 o 读字母名 /əʊ/：home、bone、nose。", stage: 4 },
    { id: "u_e", ipa: "juː", ipaDisplay: "/juː/", type: "vowel", manner: "magic-e", voiced: true, holdable: true, graphemes: ["u_e", "ue", "ew"], keyword: "cube", keywordZh: "立方体", img: "cub", azureIpa: "juː", azureSapi: "y uw", stretch: "you", tip: "魔法 e 让 u 常读 /juː/：cube、mule；有时是 /uː/：flute。", stage: 4 },
    { id: "e_e", ipa: "iː", ipaDisplay: "/iː/", type: "vowel", manner: "magic-e", voiced: true, holdable: true, graphemes: ["e_e", "ee", "ea"], keyword: "these", keywordZh: "这些", img: "tree", azureIpa: "iː", azureSapi: "iy", stretch: "eee", tip: "e_e 较少见：these、Eve、complete。", stage: 4 },

    /* —— 元音字母组合 —— */
    { id: "ai", ipa: "eɪ", ipaDisplay: "/eɪ/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ai", "ay"], keyword: "rain", keywordZh: "下雨", img: "rain", azureIpa: "eɪ", azureSapi: "ey", stretch: "ay", tip: "ai 多在词中：rain、tail；ay 多在词尾：day、play。", stage: 4 },
    { id: "ay", ipa: "eɪ", ipaDisplay: "/eɪ/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ay", "ai"], keyword: "play", keywordZh: "玩", img: "ball", azureIpa: "eɪ", azureSapi: "ey", stretch: "ay", tip: "词尾用 ay 表示 /eɪ/。", stage: 4 },
    { id: "ee", ipa: "iː", ipaDisplay: "/iː/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ee", "ea", "e"], keyword: "tree", keywordZh: "树", img: "tree", azureIpa: "iː", azureSapi: "iy", stretch: "eee", tip: "双 e 拉长，像微笑的长音 eee。", stage: 4 },
    { id: "ea", ipa: "iː", ipaDisplay: "/iː/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ea", "ee"], keyword: "leaf", keywordZh: "叶子", img: "leaf", azureIpa: "iː", azureSapi: "iy", stretch: "eee", tip: "ea 常读 /iː/：leaf、sea；少数读 /e/：bread。", stage: 4 },
    { id: "igh", ipa: "aɪ", ipaDisplay: "/aɪ/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["igh", "ie", "i_e"], keyword: "night", keywordZh: "夜晚", img: "night", azureIpa: "aɪ", azureSapi: "ay", stretch: "eye", tip: "三个字母一个音 /aɪ/：night、light、high。", stage: 4 },
    { id: "oa", ipa: "əʊ", ipaDisplay: "/əʊ/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["oa", "ow", "o_e"], keyword: "boat", keywordZh: "小船", img: "boat", azureIpa: "əʊ", azureSapi: "ow", stretch: "oh", tip: "oa 多在词中：boat、road、coat。", stage: 4 },
    { id: "ow", ipa: "əʊ", ipaDisplay: "/əʊ/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ow", "oa"], label: "ow 长o", keyword: "snow", keywordZh: "雪", img: "cloud", azureIpa: "əʊ", azureSapi: "ow", stretch: "oh", tip: "ow 可读 /əʊ/（snow）或 /aʊ/（cow），看单词家族。", stage: 4 },
    { id: "ue", ipa: "uː", ipaDisplay: "/uː/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ue", "ew", "u_e"], keyword: "glue", keywordZh: "胶水", img: "glue", azureIpa: "uː", azureSapi: "uw", stretch: "ooo", tip: "ue / ew 常读 /uː/ 或 /juː/：glue、blue、new。", stage: 4 },

    /* —— R-controlled —— */
    { id: "ar", ipa: "ɑː", ipaDisplay: "/ɑː/", type: "r-controlled", manner: "bossy-r", voiced: true, holdable: true, graphemes: ["ar"], keyword: "car", keywordZh: "小汽车", img: "car", azureIpa: "ɑː", azureSapi: "aa r", stretch: "ar", tip: "r 控制前面的 a，读长啊：car、star、park。", stage: 5 },
    { id: "or", ipa: "ɔː", ipaDisplay: "/ɔː/", type: "r-controlled", manner: "bossy-r", voiced: true, holdable: true, graphemes: ["or", "ore", "aw"], keyword: "fork", keywordZh: "叉子", img: "fork", azureIpa: "ɔː", azureSapi: "ao r", stretch: "or", tip: "r 控制 o，读 /ɔː/：fork、corn、sport。", stage: 5 },
    { id: "er", ipa: "ɜː", ipaDisplay: "/ɜː/", type: "r-controlled", manner: "bossy-r", voiced: true, holdable: true, graphemes: ["er", "ir", "ur"], keyword: "tiger", keywordZh: "老虎", img: "bird", azureIpa: "ɜː", azureSapi: "er", stretch: "er", tip: "er / ir / ur 在重读时都接近 /ɜː/：her、bird、fur。", stage: 5 },
    { id: "ir", ipa: "ɜː", ipaDisplay: "/ɜː/", type: "r-controlled", manner: "bossy-r", voiced: true, holdable: true, graphemes: ["ir", "er", "ur"], keyword: "bird", keywordZh: "小鸟", img: "bird", azureIpa: "ɜː", azureSapi: "er", stretch: "ir", tip: "与 er、ur 同一家族。", stage: 5 },
    { id: "ur", ipa: "ɜː", ipaDisplay: "/ɜː/", type: "r-controlled", manner: "bossy-r", voiced: true, holdable: true, graphemes: ["ur", "er", "ir"], keyword: "fur", keywordZh: "毛皮", img: "rabbit", azureIpa: "ɜː", azureSapi: "er", stretch: "ur", tip: "与 er、ir 同一家族。", stage: 5 },

    /* —— 双元音与 oo —— */
    { id: "oo", ipa: "uː", ipaDisplay: "/uː/", type: "vowel-team", manner: "long-oo", voiced: true, holdable: true, graphemes: ["oo", "ue", "ew"], label: "oo 长", keyword: "moon", keywordZh: "月亮", img: "moon", azureIpa: "uː", azureSapi: "uw", stretch: "ooo", tip: "长 oo：moon、food、room，嘴唇收圆拉长。", stage: 5 },
    { id: "oo_s", ipa: "ʊ", ipaDisplay: "/ʊ/", type: "vowel-team", manner: "short-oo", voiced: true, holdable: true, graphemes: ["oo", "u"], label: "oo 短", keyword: "book", keywordZh: "书", img: "book", azureIpa: "ʊ", azureSapi: "uh", stretch: "u", tip: "短 oo：book、look、good，圆唇但短。", stage: 5 },
    { id: "ou", ipa: "aʊ", ipaDisplay: "/aʊ/", type: "diphthong", manner: "glide", voiced: true, holdable: true, graphemes: ["ou", "ow"], keyword: "cloud", keywordZh: "云", img: "cloud", azureIpa: "aʊ", azureSapi: "aw", stretch: "ow", tip: "嘴从大开滑到圆唇：cloud、house、out。", stage: 5 },
    { id: "ow_d", ipa: "aʊ", ipaDisplay: "/aʊ/", type: "diphthong", manner: "glide", voiced: true, holdable: true, graphemes: ["ow", "ou"], label: "ow 双元音", keyword: "cow", keywordZh: "奶牛", img: "cloud", azureIpa: "aʊ", azureSapi: "aw", stretch: "ow", tip: "ow 的另一读音 /aʊ/：cow、now、how。", stage: 5 },
    { id: "oi", ipa: "ɔɪ", ipaDisplay: "/ɔɪ/", type: "diphthong", manner: "glide", voiced: true, holdable: true, graphemes: ["oi", "oy"], keyword: "coin", keywordZh: "硬币", img: "coin", azureIpa: "ɔɪ", azureSapi: "oy", stretch: "oy", tip: "oi 多在词中：coin、boil、point。", stage: 5 },
    { id: "oy", ipa: "ɔɪ", ipaDisplay: "/ɔɪ/", type: "diphthong", manner: "glide", voiced: true, holdable: true, graphemes: ["oy", "oi"], keyword: "boy", keywordZh: "男孩", img: "boy", azureIpa: "ɔɪ", azureSapi: "oy", stretch: "oy", tip: "oy 多在词尾：boy、toy、enjoy。", stage: 5 },
    { id: "au", ipa: "ɔː", ipaDisplay: "/ɔː/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["au", "aw"], keyword: "sauce", keywordZh: "酱汁", img: "jam", azureIpa: "ɔː", azureSapi: "ao", stretch: "aw", tip: "au 多在词中：sauce、August。", stage: 5 },
    { id: "aw", ipa: "ɔː", ipaDisplay: "/ɔː/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["aw", "au"], keyword: "straw", keywordZh: "吸管", img: "straw", azureIpa: "ɔː", azureSapi: "ao", stretch: "aw", tip: "aw 多在词尾：straw、saw、draw。", stage: 5 },

    /* —— 进阶规则 —— */
    { id: "ph", ipa: "f", ipaDisplay: "/f/", type: "digraph", manner: "fricative", voiced: false, holdable: true, graphemes: ["ph", "f"], keyword: "photo", keywordZh: "照片", img: "photo", azureIpa: "f", azureSapi: "f", stretch: "fff", tip: "希腊词源：ph 读 /f/：photo、phone、elephant。", stage: 5 },
    { id: "tch", ipa: "tʃ", ipaDisplay: "/tʃ/", type: "digraph", manner: "affricate", voiced: false, holdable: false, graphemes: ["tch", "ch"], label: "tch", keyword: "chick", keywordZh: "小鸡", img: "chick", azureIpa: "tʃ", azureSapi: "ch", stretch: "ch", tip: "短元音后面的 /tʃ/ 常写成 tch：catch、witch、match。与 ch 同音。", stage: 3 },
    { id: "dge", ipa: "dʒ", ipaDisplay: "/dʒ/", type: "digraph", manner: "affricate", voiced: true, holdable: false, graphemes: ["dge", "ge", "j"], label: "dge", keyword: "jam", keywordZh: "果酱", img: "jam", azureIpa: "dʒ", azureSapi: "jh", stretch: "j", tip: "短元音后面的 /dʒ/ 常写成 dge：bridge、badge、edge。", stage: 5 },
    { id: "zh", ipa: "ʒ", ipaDisplay: "/ʒ/", type: "consonant", manner: "fricative", voiced: true, holdable: true, graphemes: ["s", "si", "g"], label: "zh", keyword: "television", keywordZh: "电视", img: "photo", azureIpa: "ʒ", azureSapi: "zh", stretch: "zzz", tip: "像 sh 但声带振动：television、measure、vision、beige。英语里较少见，常被漏掉。", stage: 6 },
    { id: "air", ipa: "ɛə", ipaDisplay: "/eə/", type: "vowel-team", manner: "centering", voiced: true, holdable: true, graphemes: ["air", "are", "ear"], label: "air", keyword: "hair", keywordZh: "头发", img: "hat", azureIpa: "ɛə", azureSapi: "eh r", stretch: "air", tip: "中元音滑向 schwa：hair、fair、care、bear。", stage: 5 },
    { id: "ear", ipa: "ɪə", ipaDisplay: "/ɪə/", type: "vowel-team", manner: "centering", voiced: true, holdable: true, graphemes: ["ear", "eer", "ere"], label: "ear", keyword: "hear", keywordZh: "听见", img: "nest", azureIpa: "ɪə", azureSapi: "ih r", stretch: "ear", tip: "从 /ɪ/ 滑向 schwa：hear、near、deer、here。", stage: 5 },
    { id: "ore", ipa: "ɔː", ipaDisplay: "/ɔː/", type: "r-controlled", manner: "bossy-r", voiced: true, holdable: true, graphemes: ["ore", "oar", "or"], label: "ore", keyword: "fork", keywordZh: "叉子", img: "fork", azureIpa: "ɔː", azureSapi: "ao r", stretch: "or", tip: "与 or 同家族：more、shore、boar。", stage: 5 },
    { id: "ew", ipa: "juː", ipaDisplay: "/juː/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ew", "ue", "u_e"], keyword: "glue", keywordZh: "胶水", img: "glue", azureIpa: "juː", azureSapi: "y uw", stretch: "you", tip: "ew 常读 /juː/ 或 /uː/：new、few、blew。", stage: 4 },
    { id: "ie", ipa: "aɪ", ipaDisplay: "/aɪ/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ie", "igh", "i_e"], keyword: "kite", keywordZh: "风筝", img: "kite", azureIpa: "aɪ", azureSapi: "ay", stretch: "eye", tip: "ie 常读 /aɪ/：pie、tie、lie；有时读 /iː/：field。", stage: 4 },
    { id: "ey", ipa: "eɪ", ipaDisplay: "/eɪ/", type: "vowel-team", manner: "team", voiced: true, holdable: true, graphemes: ["ey", "ay", "ai"], keyword: "play", keywordZh: "玩", img: "ball", azureIpa: "eɪ", azureSapi: "ey", stretch: "ay", tip: "ey 可读 /eɪ/（they、grey）或 /iː/（key）。", stage: 4 },
    { id: "y_ai", ipa: "aɪ", ipaDisplay: "/aɪ/", type: "vowel", manner: "open", voiced: true, holdable: true, graphemes: ["y", "igh", "i_e"], label: "y=/aɪ/", keyword: "kite", keywordZh: "风筝", img: "kite", azureIpa: "aɪ", azureSapi: "ay", stretch: "eye", tip: "词尾开音节 y 常读 /aɪ/：my、sky、fly、try。", stage: 4 },
    { id: "y_ee", ipa: "iː", ipaDisplay: "/iː/", type: "vowel", manner: "happy", voiced: true, holdable: true, graphemes: ["y", "ey", "ee"], label: "y=/i/", keyword: "happy", keywordZh: "开心", img: "sun", azureIpa: "iː", azureSapi: "iy", stretch: "eee", tip: "非重读词尾 y 常读 /i/：happy、funny、family。", stage: 6 },
    { id: "a_ah", ipa: "ɑː", ipaDisplay: "/ɑː/", type: "vowel", manner: "broad", voiced: true, holdable: true, graphemes: ["a", "ar"], label: "a=/ɑː/", keyword: "car", keywordZh: "小汽车", img: "car", azureIpa: "ɑː", azureSapi: "aa", stretch: "ah", tip: "英式 bath/father 的宽 a：father、bath、car（无 r 色彩时接近 /ɑː/）。", stage: 6 },
    { id: "le", ipa: "əl", ipaDisplay: "/əl/", type: "rule", manner: "syllabic", voiced: true, holdable: true, graphemes: ["le", "el"], label: "le", keyword: "apple", keywordZh: "苹果", img: "apple", azureIpa: "əl", azureSapi: "ax l", stretch: "ul", tip: "词尾 le 常成音节 /əl/：apple、table、little。", stage: 6 },
    { id: "tion", ipa: "ʃən", ipaDisplay: "/ʃən/", type: "rule", manner: "suffix", voiced: true, holdable: true, graphemes: ["tion", "sion"], label: "tion", keyword: "action", keywordZh: "行动", img: "photo", azureIpa: "ʃən", azureSapi: "sh ax n", stretch: "shun", tip: "tion 常读 /ʃən/：action、station、nation。", stage: 6 },
    { id: "kn", ipa: "n", ipaDisplay: "/n/", type: "rule", manner: "silent", voiced: true, holdable: true, graphemes: ["kn", "n"], label: "kn", keyword: "nest", keywordZh: "鸟巢", img: "nest", azureIpa: "n", azureSapi: "n", stretch: "nnn", tip: "词首 kn 的 k 不发音：knee、know、knock。", stage: 5 },
    { id: "wr", ipa: "r", ipaDisplay: "/r/", type: "rule", manner: "silent", voiced: true, holdable: true, graphemes: ["wr", "r"], label: "wr", keyword: "rabbit", keywordZh: "兔子", img: "rabbit", azureIpa: "ɹ", azureSapi: "r", stretch: "rrr", tip: "词首 wr 的 w 不发音：write、wrong、wrap。", stage: 5 },
    { id: "mb", ipa: "m", ipaDisplay: "/m/", type: "rule", manner: "silent", voiced: true, holdable: true, graphemes: ["mb", "m"], label: "mb", keyword: "moon", keywordZh: "月亮", img: "goat", azureIpa: "m", azureSapi: "m", stretch: "mmm", tip: "词尾 mb 的 b 不发音：lamb、thumb、climb。", stage: 5 },
    { id: "soft_c", ipa: "s", ipaDisplay: "/s/", type: "rule", manner: "fricative", voiced: false, holdable: true, graphemes: ["c"], label: "软 c", keyword: "ice", keywordZh: "冰块", img: "ice", azureIpa: "s", azureSapi: "s", stretch: "sss", tip: "c 在 e/i/y 前读 /s/：ice、city、cycle。", stage: 5 },
    { id: "soft_g", ipa: "dʒ", ipaDisplay: "/dʒ/", type: "rule", manner: "affricate", voiced: true, holdable: false, graphemes: ["g"], label: "软 g", keyword: "giant", keywordZh: "巨人", img: "goat", azureIpa: "dʒ", azureSapi: "jh", stretch: "j", tip: "g 在 e/i/y 前常读 /dʒ/：giant、gem、giraffe。", stage: 5 },
    { id: "schwa", ipa: "ə", ipaDisplay: "/ə/", type: "vowel", manner: "reduced", voiced: true, holdable: true, graphemes: ["a", "e", "o", "u"], label: "schwa", keyword: "sofa", keywordZh: "沙发", img: "bed", azureIpa: "ə", azureSapi: "ax", stretch: "uh", tip: "非重读的含混元音，英语里最常见：a、the、sofa。", stage: 6 }
  ];

  var UPS = {
    s: "S", a: "AE", t: "T", p: "P", i: "IH", n: "N", m: "M", d: "D",
    g: "G", o: "Q", c: "K", k: "K", ck: "K", e: "EH", u: "AH", r: "R",
    h: "H", b: "B", f: "F", l: "L", j: "JH", v: "V", w: "W", y: "J", z: "Z",
    qu: "K W", sh: "SH", ch: "CH", th: "TH", thv: "DH", wh: "W", ng: "NG",
    nk: "NG K", ph: "F", zh: "ZH", tch: "CH", dge: "JH", x: "K S",
    a_e: "EI", i_e: "AI", o_e: "OW", u_e: "Y UW", e_e: "IY",
    ai: "EI", ay: "EI", ee: "IY", ea: "IY", igh: "AI", oa: "OW", ow: "OW",
    ue: "UW", ar: "AA", or: "AO", er: "ER", ir: "ER", ur: "ER",
    oo: "UW", oo_s: "UH", ou: "AU", ow_d: "AU", oi: "OY", oy: "OY",
    au: "AO", aw: "AO", schwa: "AX", air: "EH AX", ear: "IH AX", ore: "AO",
    ew: "Y UW", ie: "AI", ey: "EI", y_ai: "AI", y_ee: "IY", a_ah: "AA",
    le: "AX L", tion: "SH AX N", kn: "N", wr: "R", mb: "M",
    soft_c: "S", soft_g: "JH"
  };

  var map = {};
  list.forEach(function (p) {
    p.label = p.label || p.graphemes[0];
    p.azureIsolate = p.azureIsolate || (p.holdable ? p.azureIpa + "ːː" : p.azureIpa);
    p.azureUps = p.azureUps || UPS[p.id] || "";
    p.src = IMG + p.img + ".jpg";
    map[p.id] = p;
  });

  global.PHONEME_LIST = list;
  global.PHONEMES = map;
  global.PHONICS_IMG = IMG;
})(typeof window !== "undefined" ? window : this);
