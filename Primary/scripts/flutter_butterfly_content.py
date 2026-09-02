#!/usr/bin/env python3
"""Flutter, butterfly! 词表、课文、音形与学单词例句。"""

from __future__ import annotations

ACCENT = "#e65100"
ACCENT_DARK = "#bf360c"
ACCENT_LIGHT = "#ffb74d"
BG_LIGHT = "#fff3e0"
WILD = "#33691e"

WORDS = [
    ("Flutter", "振翅飞舞", "Flutter, butterfly!", "🦋"),
    ("Butterfly", "蝴蝶", "A butterfly lands on a plant.", "🦋"),
    ("Animals", "动物", "Butterflies are animals.", "🐾"),
    ("Lay an egg", "产卵", "It lays an egg.", "🥚"),
    ("Hatch", "孵化", "Then the egg hatches!", "🐣"),
    ("Crawl", "爬行", "The caterpillar crawls on plants.", "🐛"),
    ("Grow", "生长", "A caterpillar grows inside the egg.", "📈"),
    ("Change", "变化", "After many weeks, the caterpillar changes.", "🔄"),
    ("Caterpillar", "毛毛虫", "The young caterpillar is black.", "🐛"),
    ("Pupa", "蛹", "Now it's a pupa.", "🟤"),
    ("Land", "降落", "A butterfly lands on a plant.", "🛬"),
    ("Plant", "植物", "A butterfly lands on a plant.", "🌿"),
    ("Yellow", "黄色", "The new egg is yellow.", "💛"),
    ("Pass", "过去", "Many days pass.", "⏳"),
    ("Turn brown", "变成棕色", "The egg turns brown.", "🟤"),
    ("Inside", "在里面", "A caterpillar grows inside the egg.", "📦"),
    ("Come out", "出来", "The caterpillar comes out.", "🚪"),
    ("Young", "幼小的", "The young caterpillar is black.", "👶"),
    ("Look for", "寻找", "It looks for food.", "🔍"),
    ("Leave", "叶子", "It eats leaves.", "🍃"),
    ("Bigger", "更大", "The caterpillar grows bigger.", "📏"),
    ("Green", "绿色", "It turns green.", "💚"),
    ("Keep eating", "继续吃", "The caterpillar keeps eating.", "🍽️"),
    ("More", "更多", "It eats more leaves.", "➕"),
    ("After", "之后", "After many weeks, the caterpillar changes.", "⏭️"),
    ("Week", "周", "After many weeks, the caterpillar changes.", "📅"),
    ("Hard", "坚硬的", "It's inside a hard covering.", "🪨"),
    ("Covering", "外壳", "It's inside a hard covering.", "🛡️"),
]

STORY = [
    ("Flutter, butterfly!", "飞起来吧，蝴蝶！"),
    ("A butterfly lands on a plant.", "一只蝴蝶落在植物上。"),
    ("It lays an egg.", "它产下一颗卵。"),
    ("The new egg is yellow.", "新卵是黄色的。"),
    ("Many days pass.", "许多天过去了。"),
    ("The egg turns brown.", "卵变成棕色。"),
    ("A caterpillar grows inside the egg.", "毛毛虫在卵里生长。"),
    ("Then the egg hatches!", "然后卵孵化了！"),
    ("The caterpillar comes out.", "毛毛虫出来了。"),
    ("The young caterpillar is black.", "幼小的毛毛虫是黑色的。"),
    ("The caterpillar crawls on plants.", "毛毛虫在植物上爬行。"),
    ("It looks for food.", "它在找食物。"),
    ("It eats leaves.", "它吃叶子。"),
    ("The caterpillar grows bigger.", "毛毛虫长得更大了。"),
    ("It turns green.", "它变成绿色。"),
    ("The caterpillar keeps eating.", "毛毛虫继续吃。"),
    ("It eats more leaves.", "它吃更多叶子。"),
    ("After many weeks, the caterpillar changes.", "许多周以后，毛毛虫变化了。"),
    ("Now it's a pupa.", "现在它是蛹。"),
    ("It's inside a hard covering.", "它在坚硬的外壳里面。"),
    ("Weeks pass.", "几周过去了。"),
    ("A butterfly comes out!", "一只蝴蝶出来了！"),
    ("Flutter, butterfly!", "飞起来吧，蝴蝶！"),
]

SAY = {
    "Flutter": {
        "ex": {"en": "Flags flutter in the wind.", "zh": "旗子在风中飘动。"},
        "sort": {"en": "I flutter my paper fan.", "zh": "我扇动纸扇。"},
        "en": "Leaves flutter to the ground.",
        "zh": "叶子飘落到地上。",
    },
    "Butterfly": {
        "ex": {"en": "I draw a butterfly.", "zh": "我画一只蝴蝶。"},
        "sort": {"en": "This sticker is a butterfly.", "zh": "这张贴纸是蝴蝶。"},
        "en": "We see a toy butterfly.",
        "zh": "我们看见一只玩具蝴蝶。",
    },
    "Animals": {
        "ex": {"en": "Cats are animals.", "zh": "猫是动物。"},
        "sort": {"en": "We read about animals.", "zh": "我们读关于动物的书。"},
        "en": "Farm animals eat grass.",
        "zh": "农场动物吃草。",
    },
    "Lay an egg": {
        "ex": {"en": "Hens lay an egg.", "zh": "母鸡会下蛋。"},
        "sort": {"en": "This bird can lay an egg.", "zh": "这只鸟能下蛋。"},
        "en": "Ducks lay an egg too.",
        "zh": "鸭子也会下蛋。",
    },
    "Hatch": {
        "ex": {"en": "Chicks hatch in spring.", "zh": "小鸡在春天孵出来。"},
        "sort": {"en": "The eggs will hatch soon.", "zh": "这些蛋很快会孵化。"},
        "en": "We watch the chicks hatch.",
        "zh": "我们看小鸡孵出来。",
    },
    "Crawl": {
        "ex": {"en": "Babies crawl on the floor.", "zh": "宝宝在地板上爬。"},
        "sort": {"en": "Ants crawl on the wall.", "zh": "蚂蚁在墙上爬。"},
        "en": "I crawl under the table.",
        "zh": "我爬到桌子下面。",
    },
    "Grow": {
        "ex": {"en": "Plants grow in the sun.", "zh": "植物在阳光下生长。"},
        "sort": {"en": "I grow taller each year.", "zh": "我每年都长高。"},
        "en": "Beans grow in the pot.",
        "zh": "豆子在盆里生长。",
    },
    "Change": {
        "ex": {"en": "I change my shoes.", "zh": "我换鞋子。"},
        "sort": {"en": "The light can change color.", "zh": "灯会变颜色。"},
        "en": "We change seats in class.",
        "zh": "我们在课上换座位。",
    },
    "Caterpillar": {
        "ex": {"en": "I see a caterpillar.", "zh": "我看见一只毛毛虫。"},
        "sort": {"en": "This book has a caterpillar.", "zh": "这本书里有毛毛虫。"},
        "en": "A toy caterpillar is green.",
        "zh": "玩具毛毛虫是绿色的。",
    },
    "Pupa": {
        "ex": {"en": "The pupa is still.", "zh": "蛹是静止的。"},
        "sort": {"en": "I found a pupa on a stick.", "zh": "我在树枝上找到一个蛹。"},
        "en": "This photo shows a pupa.",
        "zh": "这张照片里有一个蛹。",
    },
    "Land": {
        "ex": {"en": "Planes land at the airport.", "zh": "飞机在机场降落。"},
        "sort": {"en": "The bird can land on a roof.", "zh": "鸟能落在屋顶上。"},
        "en": "A leaf can land in my hand.",
        "zh": "一片叶子能落在我手里。",
    },
    "Plant": {
        "ex": {"en": "I water the plant.", "zh": "我给植物浇水。"},
        "sort": {"en": "This plant is on my desk.", "zh": "这盆植物在我桌上。"},
        "en": "We plant seeds in a cup.",
        "zh": "我们把种子种在杯子里。",
    },
    "Yellow": {
        "ex": {"en": "The sun looks yellow.", "zh": "太阳看起来是黄色的。"},
        "sort": {"en": "I have a yellow crayon.", "zh": "我有一支黄蜡笔。"},
        "en": "My raincoat is yellow.",
        "zh": "我的雨衣是黄色的。",
    },
    "Pass": {
        "ex": {"en": "Please pass the paper.", "zh": "请把纸递过来。"},
        "sort": {"en": "Cars pass the school.", "zh": "汽车从学校旁经过。"},
        "en": "We pass the ball in PE.",
        "zh": "体育课上我们传球。",
    },
    "Turn brown": {
        "ex": {"en": "Leaves turn brown in fall.", "zh": "秋天叶子变成棕色。"},
        "sort": {"en": "Toast can turn brown.", "zh": "面包会烤成棕色。"},
        "en": "The banana will turn brown.",
        "zh": "香蕉会变成棕色。",
    },
    "Inside": {
        "ex": {"en": "My pencil is inside the box.", "zh": "铅笔在盒子里面。"},
        "sort": {"en": "We play inside on rainy days.", "zh": "下雨天我们在室内玩。"},
        "en": "The cat is inside the bag.",
        "zh": "猫在袋子里面。",
    },
    "Come out": {
        "ex": {"en": "Please come out to play.", "zh": "请出来玩。"},
        "sort": {"en": "The moon can come out at night.", "zh": "月亮会在夜里出来。"},
        "en": "Stars come out after dark.",
        "zh": "天黑后星星出来。",
    },
    "Young": {
        "ex": {"en": "The young bird is small.", "zh": "幼鸟很小。"},
        "sort": {"en": "A young tree needs water.", "zh": "小树需要水。"},
        "en": "The young puppy sleeps a lot.",
        "zh": "小狗睡得很多。",
    },
    "Look for": {
        "ex": {"en": "I look for my socks.", "zh": "我找我的袜子。"},
        "sort": {"en": "We look for the red book.", "zh": "我们找那本红书。"},
        "en": "Please look for your bag.",
        "zh": "请找一找你的包。",
    },
    "Leave": {
        "ex": {"en": "A leaf is on the path.", "zh": "小路上有一片叶子。"},
        "sort": {"en": "I pick up a green leaf.", "zh": "我捡起一片绿叶。"},
        "en": "Trees have many leaves.",
        "zh": "树上有许多叶子。",
    },
    "Bigger": {
        "ex": {"en": "This box is bigger.", "zh": "这个盒子更大。"},
        "sort": {"en": "My new shoes are bigger.", "zh": "我的新鞋更大。"},
        "en": "The red ball is bigger.",
        "zh": "红球更大。",
    },
    "Green": {
        "ex": {"en": "Grass is green.", "zh": "草是绿色的。"},
        "sort": {"en": "I like green apples.", "zh": "我喜欢青苹果。"},
        "en": "My cup is green.",
        "zh": "我的杯子是绿色的。",
    },
    "Keep eating": {
        "ex": {"en": "The goat keeps eating grass.", "zh": "山羊继续吃草。"},
        "sort": {"en": "Please keep eating your rice.", "zh": "请继续吃饭。"},
        "en": "Fish keep eating flakes.",
        "zh": "鱼继续吃鱼食。",
    },
    "More": {
        "ex": {"en": "I want more water.", "zh": "我想要更多水。"},
        "sort": {"en": "She has more stickers.", "zh": "她有更多贴纸。"},
        "en": "Please give me more paper.",
        "zh": "请再给我一些纸。",
    },
    "After": {
        "ex": {"en": "We wash hands after lunch.", "zh": "午饭后我们洗手。"},
        "sort": {"en": "I read after school.", "zh": "放学后我读书。"},
        "en": "Play after you finish.",
        "zh": "做完后再玩。",
    },
    "Week": {
        "ex": {"en": "There are seven days in a week.", "zh": "一周有七天。"},
        "sort": {"en": "We have PE this week.", "zh": "这周我们有体育课。"},
        "en": "A week has a weekend.",
        "zh": "一周有周末。",
    },
    "Hard": {
        "ex": {"en": "The rock is hard.", "zh": "石头是硬的。"},
        "sort": {"en": "This chair feels hard.", "zh": "这把椅子摸起来硬。"},
        "en": "Ice can be hard.",
        "zh": "冰会很硬。",
    },
    "Covering": {
        "ex": {"en": "The box has a covering.", "zh": "盒子有一层盖。"},
        "sort": {"en": "A blanket is a covering.", "zh": "毯子是一种覆盖物。"},
        "en": "The table has a covering.",
        "zh": "桌子上有一层罩。",
    },
}


def b(text, hint, combo=False, friends=None):
    o = {"text": text, "hint": hint, "combo": combo}
    if combo:
        o["friends"] = friends or []
    return o


SOUND_BOXES = {
    "Flutter": [
        b("fl", "/fl/", True, ["flutter", "flag", "fly", "flower"]),
        b("u", "短 u"),
        b("tt", "/t/"),
        b("er", "/ər/", True, ["flutter", "water", "river", "better"]),
    ],
    "Butterfly": [
        b("b", "/b/"),
        b("u", "短 u"),
        b("tt", "/t/"),
        b("er", "/ər/", True, ["butter", "better", "water"]),
        b("fl", "/fl/", True, ["fly", "flag", "flower"]),
        b("y", "词尾 y /ē/"),
    ],
    "Animals": [
        b("a", "短 a"),
        b("n", "/n/"),
        b("i", "短 i"),
        b("m", "/m/"),
        b("a", "弱读 /ə/"),
        b("ls", "/z/"),
    ],
    "Lay an egg": [
        b("l", "/l/"),
        b("ay", "长 /ā/", True, ["lay", "play", "day", "say"]),
        b(" ", "空格"),
        b("a", "短 a"),
        b("n", "/n/"),
        b(" ", "空格"),
        b("e", "短 e"),
        b("gg", "/g/"),
    ],
    "Hatch": [
        b("h", "/h/"),
        b("a", "短 a"),
        b("tch", "/ch/", True, ["hatch", "catch", "match", "watch"]),
    ],
    "Crawl": [
        b("c", "/k/"),
        b("r", "/r/"),
        b("aw", "/aw/ 像 paw", True, ["crawl", "saw", "draw", "paw"]),
        b("l", "/l/"),
    ],
    "Grow": [
        b("g", "/g/"),
        b("r", "/r/"),
        b("ow", "/ō/", True, ["grow", "show", "snow", "blow"]),
    ],
    "Change": [
        b("ch", "/ch/", True, ["change", "chip", "rich", "lunch"]),
        b("a", "长 /ā/"),
        b("n", "/n/"),
        b("ge", "/j/", True, ["change", "age", "page", "huge"]),
    ],
    "Caterpillar": [
        b("c", "/k/"),
        b("a", "短 a"),
        b("t", "/t/"),
        b("er", "/ər/", True, ["cater", "water", "better"]),
        b("p", "/p/"),
        b("i", "短 i"),
        b("ll", "/l/"),
        b("ar", "/ər/", True, ["pillar", "dollar", "collar"]),
    ],
    "Pupa": [
        b("p", "/p/"),
        b("u", "发长 /ū/"),
        b("p", "/p/"),
        b("a", "弱读 /ə/"),
    ],
    "Land": [
        b("l", "/l/"),
        b("a", "短 a"),
        b("n", "/n/"),
        b("d", "/d/"),
    ],
    "Plant": [
        b("p", "/p/"),
        b("l", "/l/"),
        b("a", "短 a"),
        b("n", "/n/"),
        b("t", "/t/"),
    ],
    "Yellow": [
        b("y", "/y/"),
        b("e", "短 e"),
        b("ll", "/l/"),
        b("ow", "/ō/", True, ["yellow", "follow", "window"]),
    ],
    "Pass": [
        b("p", "/p/"),
        b("a", "短 a"),
        b("ss", "/s/"),
    ],
    "Turn brown": [
        b("t", "/t/"),
        b("ur", "/ər/", True, ["turn", "hurt", "burn", "nurse"]),
        b("n", "/n/"),
        b(" ", "空格"),
        b("b", "/b/"),
        b("r", "/r/"),
        b("ow", "/ow/", True, ["brown", "now", "how", "cow"]),
        b("n", "/n/"),
    ],
    "Inside": [
        b("in", "/ɪn/", True, ["inside", "into", "in"]),
        b("s", "/s/"),
        b("i", "长 /ī/"),
        b("de", "/d/", True, ["side", "ride", "hide"]),
    ],
    "Come out": [
        b("c", "/k/"),
        b("o", "短 o 发 /ʌ/"),
        b("m", "/m/"),
        b("e", "silent e 不发音"),
        b(" ", "空格"),
        b("ou", "/ow/", True, ["out", "shout", "cloud"]),
        b("t", "/t/"),
    ],
    "Young": [
        b("y", "/y/"),
        b("ou", "/ʌ/", True, ["young", "touch", "cousin"]),
        b("ng", "/ng/", True, ["young", "sing", "long", "king"]),
    ],
    "Look for": [
        b("l", "/l/"),
        b("oo", "短 /ʊ/", True, ["look", "book", "good", "cook"]),
        b("k", "/k/"),
        b(" ", "空格"),
        b("f", "/f/"),
        b("or", "/or/", True, ["for", "or", "short"]),
    ],
    "Leave": [
        b("l", "/l/"),
        b("ea", "发 /ē/", True, ["leave", "eat", "sea", "read"]),
        b("ve", "/v/"),
    ],
    "Bigger": [
        b("b", "/b/"),
        b("i", "短 i"),
        b("gg", "/g/"),
        b("er", "/ər/", True, ["bigger", "better", "water"]),
    ],
    "Green": [
        b("g", "/g/"),
        b("r", "/r/"),
        b("ee", "长 e", True, ["green", "see", "tree", "need"]),
        b("n", "/n/"),
    ],
    "Keep eating": [
        b("k", "/k/"),
        b("ee", "长 e", True, ["keep", "see", "tree", "need"]),
        b("p", "/p/"),
        b(" ", "空格"),
        b("ea", "发 /ē/", True, ["eat", "sea", "read", "leaf"]),
        b("t", "/t/"),
        b("ing", "/ing/", True, ["eating", "sing", "jumping"]),
    ],
    "More": [
        b("m", "/m/"),
        b("ore", "/or/", True, ["more", "store", "shore", "core"]),
    ],
    "After": [
        b("a", "短 a"),
        b("f", "/f/"),
        b("t", "/t/"),
        b("er", "/ər/", True, ["after", "water", "better"]),
    ],
    "Week": [
        b("w", "/w/"),
        b("ee", "长 e", True, ["week", "see", "tree", "need"]),
        b("k", "/k/"),
    ],
    "Hard": [
        b("h", "/h/"),
        b("ar", "/ar/", True, ["hard", "car", "park", "star"]),
        b("d", "/d/"),
    ],
    "Covering": [
        b("c", "/k/"),
        b("o", "短 o 发 /ʌ/"),
        b("v", "/v/"),
        b("er", "/ər/", True, ["cover", "over", "river"]),
        b("ing", "/ing/", True, ["covering", "sing", "jumping"]),
    ],
}
