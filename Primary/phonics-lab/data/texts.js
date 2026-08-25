/**
 * 每课句子、短文、日常交流（难度随课时递进）
 * 句子教学统一用金字塔朗读：I → I am → I am a → I am a student.
 */
(function (global) {
  "use strict";

  function S(en, zh, img) {
    return { en: en, zh: zh, img: img || "mascot" };
  }
  function L(role, en, zh) {
    return { role: role, en: en, zh: zh };
  }
  function pack(sentences, passage, talk) {
    return { sentences: sentences, passage: passage, talk: talk };
  }

  var TEXTS = {
    L01: pack(
      [S("I sat.", "我坐下了。", "sun"), S("Sit.", "请坐。", "sun"), S("As I sat.", "当我坐下时。", "sun")],
      { title: "I Sat", titleZh: "我坐下了", img: "sun", sentences: ["I sat.", "Sit.", "I sat."] },
      { title: "请坐", titleEn: "Sit down", scene: "走进教室", img: "sun",
        lines: [L("A", "Hi.", "你好。"), L("B", "Hi.", "你好。"), L("A", "Sit.", "请坐。"), L("B", "I sat.", "我坐下了。")] }
    ),
    L02: pack(
      [S("I sit.", "我坐下。", "sun"), S("I tap.", "我轻拍。", "tap"), S("Pat the pan.", "拍一拍锅。", "pan"), S("I sip.", "我抿一口。", "sun")],
      { title: "Tap the Pan", titleZh: "拍拍锅", img: "pan", sentences: ["I sit.", "I tap the pan.", "Sip.", "I sit."] },
      { title: "请坐、请喝", titleEn: "Sit and sip", scene: "点心时间", img: "pan",
        lines: [L("A", "Sit.", "请坐。"), L("B", "I sit.", "我坐下。"), L("A", "Sip.", "喝一口。"), L("B", "I sip.", "我喝一口。")] }
    ),
    L03: pack(
      [S("I sat.", "我坐下了。", "sun"), S("I tap the pan.", "我拍那口锅。", "pan"), S("Sit at the tap.", "坐在水龙头边。", "tap")],
      { title: "At the Tap", titleZh: "在水龙头边", img: "tap", sentences: ["I sat.", "I sat at the tap.", "I tap the pan.", "Sit."] },
      { title: "到这里来", titleEn: "Come to the tap", scene: "洗手", img: "tap",
        lines: [L("A", "Sit.", "请坐。"), L("B", "I sat.", "我坐下了。"), L("A", "To the tap.", "去水龙头。"), L("B", "I tap.", "我打开水龙头。")] }
    ),
    L04: pack(
      [S("I am sad.", "我很难过。", "sun"), S("I dig.", "我挖掘。", "dog"), S("Go to the map.", "去看地图。", "map"), S("No, I sit.", "不，我坐下。", "sun")],
      { title: "The Map", titleZh: "地图", img: "map", sentences: ["I am sad.", "I dig.", "Go to the map.", "I sat."] },
      { title: "去还是不去", titleEn: "Go or no", scene: "操场门口", img: "map",
        lines: [L("A", "Go!", "走吧！"), L("B", "No.", "不。"), L("A", "Go to the map.", "去看地图。"), L("B", "I sit.", "我坐下。")] }
    ),
    L05: pack(
      [S("I see a cat.", "我看见一只猫。", "cat"), S("The dog is big.", "这只狗很大。", "dog"), S("A kid in a cap.", "一个戴帽的小孩。", "hat"), S("The duck has a sock.", "小鸭有一只袜子。", "duck")],
      { title: "The Cat and the Dog", titleZh: "猫和狗", img: "cat", sentences: ["I see a cat.", "The cat sat.", "I see a dog.", "The dog sat."] },
      { title: "看，一只猫", titleEn: "Look, a cat", scene: "公园", img: "cat",
        lines: [L("A", "Look!", "看！"), L("B", "A cat?", "一只猫？"), L("A", "A cat.", "一只猫。"), L("B", "A dog, too.", "还有一只狗。")] }
    ),
    L06: pack(
      [S("I am sad.", "我很难过。", "bed"), S("He is in bed.", "他在床上。", "bed"), S("The sun is up.", "太阳升起来了。", "sun"), S("We run.", "我们跑步。", "rabbit")],
      { title: "The Red Sun", titleZh: "红太阳", img: "sun", sentences: ["The sun is up.", "I am sad.", "We run.", "He is in bed."] },
      { title: "我是谁", titleEn: "Who I am", scene: "自我介绍", img: "boy",
        lines: [L("A", "I am Sam.", "我是山姆。"), L("B", "I am Pat.", "我是帕特。"), L("A", "He is sad.", "他很难过。"), L("B", "We run.", "我们跑步。")] }
    ),
    L07: pack(
      [S("You hop.", "你单脚跳。", "hop"), S("I have a hat.", "我有一顶帽子。", "hat"), S("The bat is big.", "球棒很大。", "ball"), S("Hop to me.", "跳到我这儿来。", "hop")],
      { title: "Hop, Hop", titleZh: "跳呀跳", img: "hop", sentences: ["You hop.", "I hop.", "The hat is big.", "Hop to me."] },
      { title: "一起跳", titleEn: "Let's hop", scene: "课间操", img: "hop",
        lines: [L("A", "You hop.", "你跳。"), L("B", "I hop.", "我跳。"), L("A", "Hop to me.", "跳到我这儿。"), L("B", "OK!", "好！")] }
    ),
    L08: pack(
      [S("They are big.", "他们很大。", "ball"), S("I like jam.", "我喜欢果酱。", "jam"), S("The van is red.", "面包车是红色的。", "van"), S("My leg is sad.", "我的腿不舒服。", "leaf")],
      { title: "Jam in the Van", titleZh: "车上的果酱", img: "jam", sentences: ["I like jam.", "The van is red.", "They are in the van.", "Jam is in the van."] },
      { title: "他们是谁", titleEn: "Who are they", scene: "接人", img: "van",
        lines: [L("A", "Who are they?", "他们是谁？"), L("B", "They are my pals.", "他们是我的朋友。"), L("A", "Are they in the van?", "他们在车里吗？"), L("B", "Yes, they are.", "是的。")] }
    ),
    L09: pack(
      [S("Yes, I can.", "是的，我可以。", "yoyo"), S("My fox is in the box.", "我的狐狸在盒子里。", "box"), S("Zip it.", "拉上拉链。", "zip"), S("The web is wet.", "蜘蛛网是湿的。", "web")],
      { title: "The Fox in the Box", titleZh: "盒中狐", img: "box", sentences: ["My fox is in the box.", "Zip the box.", "Yes, I can.", "The fox sits."] },
      { title: "行不行", titleEn: "Yes or no", scene: "收拾书包", img: "zip",
        lines: [L("A", "Can you zip it?", "你能拉上吗？"), L("B", "Yes, I can.", "能。"), L("A", "Is it in the box?", "它在盒子里吗？"), L("B", "Yes.", "是的。")] }
    ),
    L10: pack(
      [S("I am a kid.", "我是个小孩。", "boy"), S("The quiz is fun.", "测验很好玩。", "queen"), S("I can sit.", "我可以坐下。", "sun"), S("The pig and the cub sit.", "小猪和幼兽坐下。", "pig")],
      { title: "The Quiz", titleZh: "小测验", img: "queen", sentences: ["I am a kid.", "I sit.", "The quiz is fun.", "I can do it."] },
      { title: "课堂测验", titleEn: "Quiz time", scene: "教室", img: "queen",
        lines: [L("A", "Sit, please.", "请坐。"), L("B", "I sit.", "我坐下。"), L("A", "The quiz is fun.", "测验很好玩。"), L("B", "I can do it.", "我能完成。")] }
    ),
    L11: pack(
      [S("The ship is big.", "那艘船很大。", "ship"), S("I have a fish.", "我有一条鱼。", "fish"), S("The chick is in the shop.", "小鸡在商店里。", "chick"), S("Chop the fish.", "把鱼切开。", "fish")],
      { title: "The Fish Shop", titleZh: "鱼店", img: "fish", sentences: ["I go to the shop.", "The shop has fish.", "A chick is in the shop.", "I like the fish."] },
      { title: "去商店", titleEn: "At the shop", scene: "鱼店", img: "ship",
        lines: [L("A", "I like fish.", "我喜欢鱼。"), L("B", "The shop has fish.", "店里有鱼。"), L("A", "Can I have a fish?", "我能买一条吗？"), L("B", "Yes, you can.", "可以。")] }
    ),
    L12: pack(
      [S("This is my thumb.", "这是我的拇指。", "thumb"), S("That is a whale.", "那是一头鲸。", "whale"), S("When can we go?", "我们什么时候走？", "whale"), S("They are thin.", "他们很瘦。", "thumb")],
      { title: "This and That", titleZh: "这个和那个", img: "feather", sentences: ["This is a thumb.", "That is a whale.", "They are thin.", "When can we go?"] },
      { title: "这是什么", titleEn: "What is this", scene: "看图说话", img: "thumb",
        lines: [L("A", "What is this?", "这是什么？"), L("B", "This is my thumb.", "这是我的拇指。"), L("A", "What is that?", "那是什么？"), L("B", "That is a whale.", "那是一头鲸。")] }
    ),
    L13: pack(
      [S("Come and sing.", "过来唱歌。", "ring"), S("I have a pink ring.", "我有一枚粉色戒指。", "ring"), S("The duck can sing.", "小鸭会唱歌。", "duck"), S("Sink the ship.", "让船沉下去。", "ship")],
      { title: "Sing with Me", titleZh: "和我一起唱", img: "ring", sentences: ["Come and sing.", "I sing.", "The duck can sing.", "We sing and sing."] },
      { title: "来唱歌", titleEn: "Come and sing", scene: "音乐课", img: "ring",
        lines: [L("A", "Come and sing.", "过来唱歌。"), L("B", "I can sing.", "我会唱。"), L("A", "Sing with me.", "和我一起唱。"), L("B", "OK, I sing.", "好，我唱。")] }
    ),
    L14: pack(
      [S("Stop!", "停！", "sun"), S("I can swim.", "我会游泳。", "fish"), S("Do not slip.", "别滑倒。", "sun"), S("Spin and stop.", "转一转再停下。", "sun")],
      { title: "Stop and Swim", titleZh: "停下，去游泳", img: "fish", sentences: ["Stop!", "I can swim.", "Do not slip.", "Swim and stop."] },
      { title: "注意安全", titleEn: "Be careful", scene: "泳池边", img: "fish",
        lines: [L("A", "Stop!", "停下！"), L("B", "OK, I stop.", "好，我停。"), L("A", "Do not slip.", "别滑倒。"), L("B", "I can swim.", "我会游泳。")] }
    ),
    L15: pack(
      [S("The frog can jump.", "青蛙会跳。", "goat"), S("I see a little crab.", "我看见一只小螃蟹。", "cat"), S("The flag is up.", "旗子升起来了。", "leaf"), S("Come out!", "出来！", "sun")],
      { title: "The Little Frog", titleZh: "小青蛙", img: "goat", sentences: ["I see a little frog.", "The frog can jump.", "A crab sits.", "The flag is up."] },
      { title: "看那边", titleEn: "Look there", scene: "池塘边", img: "goat",
        lines: [L("A", "Look! A frog.", "看！一只青蛙。"), L("B", "A little frog.", "一只小青蛙。"), L("A", "Can it jump?", "它会跳吗？"), L("B", "Yes, it can.", "会。")] }
    ),
    L16: pack(
      [S("I like cake.", "我喜欢蛋糕。", "cake"), S("My name is Pat.", "我叫帕特。", "nest"), S("I like my kite.", "我喜欢我的风筝。", "kite"), S("It is time to sit.", "该坐下了。", "tap")],
      { title: "Cake Time", titleZh: "蛋糕时间", img: "cake", sentences: ["My name is Pat.", "I like cake.", "It is time to sit.", "I like my kite, too."] },
      { title: "自我介绍", titleEn: "My name is", scene: "新同学", img: "cake",
        lines: [L("A", "Hi. My name is Pat.", "你好，我叫帕特。"), L("B", "Hi. I like cake.", "你好。我喜欢蛋糕。"), L("A", "I like cake, too.", "我也喜欢蛋糕。"), L("B", "It is time to sit.", "该坐下了。")] }
    ),
    L17: pack(
      [S("I go home.", "我回家。", "house"), S("I have a cube.", "我有一个立方体。", "cub"), S("These are my notes.", "这些是我的笔记。", "book"), S("I like my home.", "我喜欢我的家。", "house")],
      { title: "Go Home", titleZh: "回家", img: "house", sentences: ["I go home.", "These are my notes.", "I have a cube.", "I like my home."] },
      { title: "该回家了", titleEn: "Time to go home", scene: "放学", img: "house",
        lines: [L("A", "Is it time to go?", "该走了吗？"), L("B", "Yes. Go home.", "是的，回家。"), L("A", "I like my home.", "我喜欢我的家。"), L("B", "Me too.", "我也是。")] }
    ),
    L18: pack(
      [S("I can see the sea.", "我能看见大海。", "fish"), S("We play all day.", "我们玩了一整天。", "ball"), S("The rain is on the leaf.", "雨落在叶子上。", "rain"), S("I see two trees.", "我看见两棵树。", "tree")],
      { title: "A Rainy Day", titleZh: "下雨天", img: "rain", sentences: ["I see the rain.", "The rain is on the leaf.", "We play all day.", "I can see the sea."] },
      { title: "今天玩什么", titleEn: "What to play", scene: "下雨的公园", img: "rain",
        lines: [L("A", "Can we play?", "我们能玩吗？"), L("B", "It is rain.", "在下雨。"), L("A", "We can see the sea.", "我们能去看海。"), L("B", "Yes, let's go.", "好，走吧。")] }
    ),
    L19: pack(
      [S("The night is long.", "夜晚很长。", "night"), S("I see a boat.", "我看见一条船。", "boat"), S("The light is on.", "灯开着。", "sun"), S("Snow is on the road.", "路上有雪。", "cloud")],
      { title: "Night Light", titleZh: "夜灯", img: "night", sentences: ["The night is long.", "The light is on.", "I see a boat.", "Snow is on the road."] },
      { title: "晚上出门", titleEn: "At night", scene: "夜晚的路", img: "night",
        lines: [L("A", "It is night.", "现在是晚上。"), L("B", "The light is on.", "灯开着。"), L("A", "I see a boat.", "我看见一条船。"), L("B", "Let's go.", "我们走吧。")] }
    ),
    L20: pack(
      [S("The glue is blue.", "胶水是蓝色的。", "glue"), S("I like my kite.", "我喜欢我的风筝。", "kite"), S("Does he like cake?", "他喜欢蛋糕吗？", "cake"), S("Two people sit.", "两个人坐下。", "boy")],
      { title: "Blue Glue", titleZh: "蓝胶水", img: "glue", sentences: ["The glue is blue.", "I like cake.", "Two people sit.", "Does he like cake?"] },
      { title: "请把胶水给我", titleEn: "Pass the glue", scene: "手工课", img: "glue",
        lines: [L("A", "Can I have the glue?", "我能用胶水吗？"), L("B", "The glue is blue.", "胶水是蓝的。"), L("A", "I like it.", "我喜欢。"), L("B", "Here you are.", "给你。")] }
    ),
    L21: pack(
      [S("The car is in the park.", "汽车在公园里。", "car"), S("I have a fork.", "我有一把叉子。", "fork"), S("The stars are up.", "星星升起来了。", "night"), S("We are in the park.", "我们在公园里。", "tree")],
      { title: "In the Park", titleZh: "在公园", img: "car", sentences: ["The car is in the park.", "We are in the park.", "I have a fork.", "The stars are up."] },
      { title: "去公园", titleEn: "To the park", scene: "周末出行", img: "tree",
        lines: [L("A", "Where is the car?", "车在哪里？"), L("B", "The car is in the park.", "车在公园里。"), L("A", "Let's go to the park.", "我们去公园吧。"), L("B", "We are here.", "我们到了。")] }
    ),
    L22: pack(
      [S("Her bird is little.", "她的鸟很小。", "bird"), S("The bird has fur.", "这只鸟有绒毛。", "bird"), S("I like her.", "我喜欢她。", "hat"), S("The fur is soft.", "毛皮很软。", "rabbit")],
      { title: "Her Bird", titleZh: "她的小鸟", img: "bird", sentences: ["Her bird is little.", "The bird has fur.", "I like her bird.", "The fur is soft."] },
      { title: "看我的鸟", titleEn: "My bird", scene: "宠物分享", img: "bird",
        lines: [L("A", "Look at her bird.", "看她的鸟。"), L("B", "It is little.", "它很小。"), L("A", "The bird has fur.", "它有绒毛。"), L("B", "I like it.", "我喜欢它。")] }
    ),
    L23: pack(
      [S("I look at the moon.", "我看着月亮。", "moon"), S("I like good food.", "我喜欢好吃的。", "jam"), S("The house is on the cloud?", "房子在云上吗？", "house"), S("Look at the book now.", "现在看书。", "book")],
      { title: "Moon and Book", titleZh: "月亮和书", img: "moon", sentences: ["I look at the moon.", "I like my book.", "Look at the book now.", "The food is good."] },
      { title: "请看书", titleEn: "Look at the book", scene: "晚读", img: "book",
        lines: [L("A", "Look at the book.", "请看书。"), L("B", "I look at it now.", "我现在看。"), L("A", "The moon is up.", "月亮升起来了。"), L("B", "I can see it.", "我看见了。")] }
    ),
    L24: pack(
      [S("The boy has a toy.", "男孩有一个玩具。", "boy"), S("I saw a coin.", "我看见一枚硬币。", "coin"), S("The straw is in the cup.", "吸管在杯子里。", "straw"), S("I like this toy.", "我喜欢这个玩具。", "yoyo")],
      { title: "A Boy and a Toy", titleZh: "男孩和玩具", img: "boy", sentences: ["The boy has a toy.", "I saw a coin.", "The straw is in the cup.", "I like this toy."] },
      { title: "商店里", titleEn: "In the shop", scene: "买玩具", img: "coin",
        lines: [L("A", "I saw a toy.", "我看见一个玩具。"), L("B", "I like this toy.", "我喜欢这个。"), L("A", "I have a coin.", "我有一枚硬币。"), L("B", "Let's get it.", "我们买吧。")] }
    ),
    L25: pack(
      [S("I like ice.", "我喜欢冰。", "ice"), S("This is my photo.", "这是我的照片。", "photo"), S("I write my name.", "我写下我的名字。", "book"), S("The lamb is little.", "小羊很小。", "goat")],
      { title: "A Photo of Ice", titleZh: "冰的照片", img: "photo", sentences: ["This is my photo.", "I like ice.", "I write my name.", "The lamb is little."] },
      { title: "看我的照片", titleEn: "My photo", scene: "展示照片", img: "photo",
        lines: [L("A", "Look at my photo.", "看我的照片。"), L("B", "I like it.", "我喜欢。"), L("A", "I write my name.", "我写下名字。"), L("B", "Can I see?", "我能看看吗？")] }
    ),
    L26: pack(
      [S("I said hello.", "我说过你好。", "boy"), S("Come and sit.", "过来坐。", "sun"), S("I have the sun hat.", "我有那顶太阳帽。", "hat"), S("One little cub sat.", "一只小幼兽坐下了。", "cub")],
      { title: "Come and Sit", titleZh: "过来坐", img: "sun", sentences: ["I said hello.", "Come and sit.", "I have the sun hat.", "One little cub sat."] },
      { title: "请过来", titleEn: "Come here", scene: "叫同学过来", img: "boy",
        lines: [L("A", "Come and sit.", "过来坐。"), L("B", "I said OK.", "我说好。"), L("A", "I have the hat.", "我拿着帽子。"), L("B", "Thank you.", "谢谢。")] }
    ),
    L27: pack(
      [S("She is my friend.", "她是我的朋友。", "boy"), S("I like people.", "我喜欢人们。", "boy"), S("Could you help me?", "你能帮我吗？", "hat"), S("I sit because I am sad.", "我坐下是因为我难过。", "bed")],
      { title: "My Friend", titleZh: "我的朋友", img: "boy", sentences: ["She is my friend.", "Could you help me?", "I like people.", "I sit because I am sad."] },
      { title: "请帮我", titleEn: "Could you help", scene: "需要帮忙", img: "boy",
        lines: [L("A", "Could you help me?", "你能帮我吗？"), L("B", "Yes, I could.", "可以。"), L("A", "She is my friend.", "她是我的朋友。"), L("B", "I can help.", "我能帮忙。")] }
    ),
    L28: pack(
      [S("I am a student.", "我是一名学生。", "boy"), S("The cat sat on the table.", "猫坐在桌子上。", "cat"), S("I like my apple.", "我喜欢我的苹果。", "apple"), S("We read at the table.", "我们在桌边阅读。", "book")],
      { title: "I Am a Student", titleZh: "我是学生", img: "boy", sentences: ["I am a student.", "I like my apple.", "The cat sat on the table.", "We read at the table."] },
      { title: "我是学生", titleEn: "I am a student", scene: "开学第一天", img: "boy",
        lines: [L("A", "Who are you?", "你是谁？"), L("B", "I am a student.", "我是一名学生。"), L("A", "I am a student, too.", "我也是学生。"), L("B", "Let's sit at the table.", "我们坐到桌边吧。")] }
    ),
    L29: pack(
      [S("We have a picnic.", "我们去野餐。", "jam"), S("The rabbit is in the basket.", "兔子在篮子里。", "rabbit"), S("I see the sunset.", "我看见日落。", "sun"), S("My umbrella is wet.", "我的伞湿了。", "umbrella")],
      { title: "Picnic at Sunset", titleZh: "日落野餐", img: "sun", sentences: ["We have a picnic.", "The rabbit is in the basket.", "I see the sunset.", "My umbrella is wet."] },
      { title: "去野餐", titleEn: "Picnic time", scene: "草地", img: "jam",
        lines: [L("A", "Let's have a picnic.", "我们去野餐吧。"), L("B", "I see the sunset.", "我看见日落了。"), L("A", "The rabbit is in the basket.", "兔子在篮子里。"), L("B", "This is fun.", "真有趣。")] }
    ),
    L30: pack(
      [S("I can read this.", "我能读这个。", "book"), S("The ship is on the sea.", "船在海上。", "ship"), S("I like cake and rain.", "我喜欢蛋糕和雨。", "cake"), S("You can do it.", "你能做到。", "boy")],
      { title: "I Can Read", titleZh: "我能读", img: "book", sentences: ["I can read this.", "The ship is on the sea.", "I like cake and rain.", "You can do it.", "I am a student."] },
      { title: "你能行", titleEn: "You can do it", scene: "朗读展示", img: "book",
        lines: [L("A", "Can you read this?", "你能读这个吗？"), L("B", "Yes, I can.", "能。"), L("A", "You can do it.", "你能做到。"), L("B", "I am a student. I can read.", "我是学生。我能读。")] }
    )
  };

  function get(id) {
    return TEXTS[id] || TEXTS.L01;
  }

  function pyramidLayers(sentence) {
    var raw = String(sentence || "").trim();
    var punct = "";
    var m = raw.match(/([.!?]+)$/);
    if (m) {
      punct = m[1];
      raw = raw.slice(0, -punct.length).trim();
    }
    var words = raw.split(/\s+/).filter(Boolean);
    return words.map(function (w, i) {
      var text = words.slice(0, i + 1).join(" ");
      if (i === words.length - 1) text += punct;
      return { text: text, newWord: w, index: i, total: words.length };
    });
  }

  function allSentences(id) {
    var t = get(id);
    return (t.sentences || []).map(function (s) { return s.en; });
  }

  global.PHONICS_TEXTS = TEXTS;
  global.phonicsText = get;
  global.phonicsPyramid = pyramidLayers;
  global.phonicsAllSentences = allSentences;
})(typeof window !== "undefined" ? window : this);
