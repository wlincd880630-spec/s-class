(function (global) {
  "use strict";

const INLINE_CFG = {
  deepseekKey: "sk-daa16008e81843deba6fefe9dce51465",
  azureKey: "4SJbskufsk2tiu5jq1kzlJwTDw2eVPYd8e7HvDhb3lX6ZmItWOnxJQQJ99CHACqBBLyXJ3w3AAAYACOGxnpO",
  azureRegion: "southeastasia",
};

const PHRASES = [
  "protect them from being killed",
  "one new thing every day",
  "got in touch with",
  "wildlife sanctuary",
  "in great danger",
  "raise awareness",
  "make a difference",
  "raising money",
  "yard sales",
  "skating parties",
  "special collars",
  "stay young",
  "forget some numbers",
  "make happy friends",
  "keep learning",
  "take an interest in",
  "keep healthy",
  "worry about",
  "see the doctor",
  "and so on",
  "so far",
  "even if",
  "at least",
  "bad mood",
  "normal kid",
  "young boy",
  "big animals",
  "simple things",
  "laughing often",
  "having a walk often",
  "telling people you love them"
];
const UNDERLINED = ["track", "weight"];

const COMIC = [
  {
    id: "a",
    title: "Passage A",
    en: "Joris and the Cheetahs",
    zh: "乔里斯与猎豹",
    panels: [
      {
        id: "a01",
        img: "set_01_comic/img/a-loves.jpg",
        alt: "乔里斯抱着猎豹幼崽，房间里贴满猎豹画",
        kicker: "He loves cheetahs",
        sentences: [
          { en: "Joris Hutchissen, a young boy, loves cheetahs (非洲猎豹).", zh: "小男孩乔里斯非常喜爱非洲猎豹。" }
        ]
      },
      {
        id: "a02",
        img: "set_01_comic/img/a-danger-wild.jpg",
        alt: "干旱草原上只剩两只瘦弱的猎豹，显得处境危险",
        kicker: "In great danger",
        sentences: [
          { en: "He was upset to learn that the big animals might be in great danger.", zh: "当他得知这些大型动物可能处境危险时，他很难过。" }
        ]
      },
      {
        id: "a03",
        img: "set_01_comic/img/a-upset.jpg",
        alt: "乔里斯抱着猎豹玩偶，眼里含泪，非常难过",
        kicker: "He got upset",
        sentences: [
          { en: "He was upset to learn that the big animals might be in great danger.", zh: "得知这个消息后，他很难过。" }
        ]
      },
      {
        id: "a04",
        img: "set_01_comic/img/a-age-six.jpg",
        alt: "六岁的乔里斯坐在地毯上读关于猎豹的图画书",
        kicker: "When he was six",
        sentences: [
          { en: "“When he was six, he was reading a book about cheetahs.”", zh: "“他六岁的时候，正在读一本关于猎豹的书。”" }
        ]
      },
      {
        id: "a05",
        img: "set_01_comic/img/a-book-danger.jpg",
        alt: "图画书内页画着草原上数量稀少的猎豹",
        kicker: "The book says",
        sentences: [
          { en: "“The book says cheetahs could be in great danger.”", zh: "“书上说，猎豹可能处境危险。”" }
        ]
      },
      {
        id: "a06",
        img: "set_01_comic/img/a-mum-tells.jpg",
        alt: "妈妈坐在沙发上讲述当年乔里斯读完书很难过的事",
        kicker: "Said Joris' mother",
        sentences: [
          { en: "“He got very upset,” said Joris' mother.", zh: "乔里斯的妈妈说：“他非常难过。”" }
        ]
      },
      {
        id: "a07",
        img: "set_01_comic/img/a-ask-mum.jpg",
        alt: "乔里斯坐在沙发上问妈妈自己能做些什么",
        kicker: "What can I do?",
        sentences: [
          { en: "Joris asked his mum what he could do to help.", zh: "乔里斯问妈妈，自己能做些什么来帮忙。" }
        ]
      },
      {
        id: "a08",
        img: "set_01_comic/img/a2-sanctuary.jpg",
        alt: "乔里斯和妈妈在厨房用电脑联系非洲野生动物保护中心",
        kicker: "A sanctuary in Africa",
        sentences: [
          { en: "They got in touch with a wildlife sanctuary (野生动物保护中心) in Africa.", zh: "他们联系上了非洲的一家野生动物保护中心。" }
        ]
      },
      {
        id: "a09",
        img: "set_01_comic/img/a-raise-start.jpg",
        alt: "乔里斯在书桌前把硬币放进捐款罐开始筹款",
        kicker: "Raising money",
        sentences: [
          { en: "Joris began raising money.", zh: "乔里斯开始筹款。" }
        ]
      },
      {
        id: "a10",
        img: "set_01_comic/img/a-sell-tshirts.jpg",
        alt: "乔里斯在摊位上举起印有猎豹图案的T恤",
        kicker: "He sold T-shirts",
        sentences: [
          { en: "He sold T-shirts, flowers and juice.", zh: "他卖T恤、鲜花和果汁。" }
        ]
      },
      {
        id: "a11",
        img: "set_01_comic/img/a-sell-flowers.jpg",
        alt: "乔里斯把一束束鲜花递给邻居",
        kicker: "Flowers",
        sentences: [
          { en: "He sold T-shirts, flowers and juice.", zh: "鲜花也是他售卖的一部分。" }
        ]
      },
      {
        id: "a12",
        img: "set_01_comic/img/a-sell-juice.jpg",
        alt: "乔里斯在果汁摊把橙汁倒进纸杯",
        kicker: "And juice",
        sentences: [
          { en: "He sold T-shirts, flowers and juice.", zh: "他还卖果汁来筹款。" }
        ]
      },
      {
        id: "a13",
        img: "set_01_comic/img/a-yard-sale.jpg",
        alt: "乔里斯在车道上摆庭院旧货摊，邻居们前来选购",
        kicker: "Yard sales",
        sentences: [
          { en: "He held yard sales and skating parties.", zh: "他还举办庭院旧货甩卖和滑冰派对。" }
        ]
      },
      {
        id: "a14",
        img: "set_01_comic/img/a-skating.jpg",
        alt: "黄昏后院滑冰派对，孩子们轮滑，旁边放着捐款桶",
        kicker: "Skating parties",
        sentences: [
          { en: "He held yard sales and skating parties.", zh: "滑冰派对也是他的筹款方式之一。" }
        ]
      },
      {
        id: "a15",
        img: "set_01_comic/img/a-normal-kid.jpg",
        alt: "乔里斯站在普通郊区家门口，神情坚定而谦逊",
        kicker: "Just a normal kid",
        sentences: [
          { en: "“I'm just a normal kid,” Joris said.", zh: "乔里斯说：“我只是个普通小孩。”" }
        ]
      },
      {
        id: "a16",
        img: "set_01_comic/img/a-want-to-save.jpg",
        alt: "乔里斯看着猎豹照片，心想要做点事救它们",
        kicker: "Save them",
        sentences: [
          { en: "“I only want to do something to save them,” Joris said.", zh: "“我只想做点事来救它们。”" }
        ]
      },
      {
        id: "a17",
        img: "set_01_comic/img/a-14000.jpg",
        alt: "捐款罐装满钱币，乔里斯准备把捐款寄给保护中心",
        kicker: "More than $14,000",
        sentences: [
          { en: "So far, he has raised more than $14,000.", zh: "到目前为止，他已经筹到一万四千多美元。" }
        ]
      },
      {
        id: "a18",
        img: "set_01_comic/img/a4-collar.jpg",
        alt: "保护人员给猎豹戴上追踪项圈，乔里斯在一旁观看",
        kicker: "Special collars",
        sentences: [
          { en: "The money is used to buy special collars (项圈).", zh: "这些钱用来购买特殊的项圈。" }
        ]
      },
      {
        id: "a19",
        img: "set_01_comic/img/a-track.jpg",
        alt: "戴着项圈的猎豹走过草原，项圈发出定位光点",
        kicker: "The collars track",
        sentences: [
          { en: "The collars track the cheetahs.", zh: "项圈可以追踪猎豹。" }
        ]
      },
      {
        id: "a20",
        img: "set_01_comic/img/a-protect.jpg",
        alt: "黎明的保护区里猎豹自由行走，守望塔上有巡护员守护",
        kicker: "Protect them",
        sentences: [
          { en: "This helps protect them from being killed.", zh: "这有助于保护它们不被杀害。" }
        ]
      },
      {
        id: "a21",
        img: "set_01_comic/img/a-visit.jpg",
        alt: "乔里斯走下小飞机，第一次看见非洲草原和远处的猎豹",
        kicker: "Visit Africa",
        sentences: [
          { en: "Joris has also visited the sanctuary in Africa.", zh: "乔里斯还去过非洲的保护中心。" }
        ]
      },
      {
        id: "a22",
        img: "set_01_comic/img/a5-volunteer.jpg",
        alt: "乔里斯在非洲保护中心当志愿者，蹲在猎豹身边",
        kicker: "Three summers",
        sentences: [
          { en: "He has spent three summers volunteering there.", zh: "他在那里做了三个夏天的志愿者。" }
        ]
      },
      {
        id: "a23",
        img: "set_01_comic/img/a-volunteer-help.jpg",
        alt: "乔里斯帮巡护员给水槽加水，猎豹在一旁饮水",
        kicker: "Volunteering there",
        sentences: [
          { en: "He has spent three summers volunteering there.", zh: "志愿工作包括帮忙照料和守护猎豹。" }
        ]
      },
      {
        id: "a24",
        img: "set_01_comic/img/a6-awareness.jpg",
        alt: "乔里斯在学校集会上呼吁大家提高保护意识",
        kicker: "Raise awareness",
        sentences: [
          { en: "“We need to raise awareness (意识),” Joris says.", zh: "乔里斯说：“我们需要提高意识。”" }
        ]
      },
      {
        id: "a25",
        img: "set_01_comic/img/a-tell-people.jpg",
        alt: "乔里斯把猎豹照片拿给同学和邻居看，告诉大家正在发生的事",
        kicker: "Tell people",
        sentences: [
          { en: "“We need to tell people what's happening,” Joris says.", zh: "“我们需要告诉人们正在发生的事。”" }
        ]
      },
      {
        id: "a26",
        img: "set_01_comic/img/a-make-difference.jpg",
        alt: "乔里斯和一群孩子一起做小事：种花、捐款、画画",
        kicker: "Make a difference",
        sentences: [
          { en: "“I've learned that everyone can make a difference, even if you're just a kid!” says Joris.", zh: "“我明白了每个人都可以有所作为，即使你只是个孩子！”" }
        ]
      },
      {
        id: "a27",
        img: "set_01_comic/img/a-start.jpg",
        alt: "乔里斯在日出的山坡上望向远方，准备迈出第一步",
        kicker: "Start somewhere",
        sentences: [
          { en: "“You just have to start somewhere.”", zh: "“你只要从某处开始就好。”" }
        ]
      }
    ]
  },
  {
    id: "b",
    title: "Passage B",
    en: "How to Stay Young",
    zh: "如何保持年轻",
    panels: [
      {
        id: "b01",
        img: "set_01_comic/img/b-want-young.jpg",
        alt: "女士对着镜子轻触脸颊，想着如何保持年轻",
        kicker: "Stay young?",
        sentences: [
          { en: "Do you want to stay young?", zh: "你想保持年轻吗？" }
        ]
      },
      {
        id: "b02",
        img: "set_01_comic/img/b-how-stay.jpg",
        alt: "女士坐在厨房桌边托腮思考怎样保持年轻",
        kicker: "How to stay young",
        sentences: [
          { en: "Do you know how to stay young?", zh: "你知道怎样才能保持年轻吗？" }
        ]
      },
      {
        id: "b03",
        img: "set_01_comic/img/b1-garden.jpg",
        alt: "一位神采奕奕的女士站在春日花园里微笑",
        kicker: "Here's some advice",
        sentences: [
          { en: "Here's some advice (建议).", zh: "这里有一些建议。" }
        ]
      },
      {
        id: "b04",
        img: "set_01_comic/img/b-forget.jpg",
        alt: "女士在花园里松开手，体重秤、卷尺和日历像气球一样飘走",
        kicker: "Forget some numbers",
        sentences: [
          { en: "Forget some numbers.", zh: "忘掉一些数字吧。" }
        ]
      },
      {
        id: "b05",
        img: "set_01_comic/img/b2-forget-numbers.jpg",
        alt: "体重秤、卷尺和日历飘在医生身边，代表年龄、体重和身高",
        kicker: "Age, weight, height",
        sentences: [
          { en: "The numbers are about your age, weight and height (身高).", zh: "这些数字是关于你的年龄、体重和身高。" }
        ]
      },
      {
        id: "b06",
        img: "set_01_comic/img/b-doctor-worry.jpg",
        alt: "医生低头看病历，女士放松地坐着，把数字交给医生操心",
        kicker: "Let the doctor worry",
        sentences: [
          { en: "Let the doctor worry about them.", zh: "让医生去操心这些数字。" }
        ]
      },
      {
        id: "b07",
        img: "set_01_comic/img/b-pay-doctor.jpg",
        alt: "女士在诊台把钱包递给医生，微笑着付诊费",
        kicker: "That's why you pay",
        sentences: [
          { en: "That's why you pay him or her.", zh: "这正是你付钱给医生的原因。" }
        ]
      },
      {
        id: "b08",
        img: "set_01_comic/img/b-make-friends.jpg",
        alt: "女士提着野餐篮走向公园里的朋友们，挥手问好",
        kicker: "Make happy friends",
        sentences: [
          { en: "Make happy friends.", zh: "结交快乐的朋友。" }
        ]
      },
      {
        id: "b09",
        img: "set_01_comic/img/b3-happy-friends.jpg",
        alt: "公园野餐，开朗快乐的朋友们围坐在一起",
        kicker: "Bright and happy",
        sentences: [
          { en: "People who are bright and happy should be your friends.", zh: "开朗快乐的人应该成为你的朋友。" }
        ]
      },
      {
        id: "b10",
        img: "set_01_comic/img/b-change-mood.jpg",
        alt: "小女孩递花，朋友们的快乐让女士的坏心情慢慢好转",
        kicker: "Change your mood",
        sentences: [
          { en: "Their happiness may help you change (改变) your bad mood (情绪).", zh: "他们的快乐也许能帮你改变坏心情。" }
        ]
      },
      {
        id: "b11",
        img: "set_01_comic/img/b-life-better.jpg",
        alt: "黄昏公园里，女士和快乐的朋友们在一起，生活变得更好",
        kicker: "Life will be better",
        sentences: [
          { en: "And your life will be better.", zh: "你的生活也会更好。" }
        ]
      },
      {
        id: "b12",
        img: "set_01_comic/img/b4-keep-learning.jpg",
        alt: "在温室里用电脑学习园艺，手里捧着幼苗",
        kicker: "Keep learning",
        sentences: [
          { en: "Keep learning.", zh: "保持学习。" }
        ]
      },
      {
        id: "b13",
        img: "set_01_comic/img/b-computer.jpg",
        alt: "女士在阳光房里专注地学用电脑",
        kicker: "The computer",
        sentences: [
          { en: "Learn more about the computer.", zh: "多了解电脑。" }
        ]
      },
      {
        id: "b14",
        img: "set_01_comic/img/b-gardening.jpg",
        alt: "女士跪在花园里把花苗栽进土里",
        kicker: "Gardening",
        sentences: [
          { en: "Learn more about gardening.", zh: "多了解园艺。" }
        ]
      },
      {
        id: "b15",
        img: "set_01_comic/img/b-learn-others.jpg",
        alt: "女士在画架前学画画，尝试其他新事物",
        kicker: "Or others",
        sentences: [
          { en: "Or learn about others.", zh: "也可以学其他事物。" }
        ]
      },
      {
        id: "b16",
        img: "set_01_comic/img/b-use-mind.jpg",
        alt: "女士坐在桌边拼图，认真动脑",
        kicker: "Use your mind",
        sentences: [
          { en: "Don't stop using your mind.", zh: "不要停止动脑。" }
        ]
      },
      {
        id: "b17",
        img: "set_01_comic/img/b-interest-world.jpg",
        alt: "女士仰头看花园里的飞鸟和花朵，对周围的世界感兴趣",
        kicker: "The world around you",
        sentences: [
          { en: "Take an interest in the world around you.", zh: "对周围的世界保持兴趣。" }
        ]
      },
      {
        id: "b18",
        img: "set_01_comic/img/b-new-thing.jpg",
        alt: "夜晚台灯下，女士在笔记本上记下今天新学的一样东西",
        kicker: "One new thing every day",
        sentences: [
          { en: "And learn at least one new thing every day.", zh: "并且每天至少学一样新东西。" }
        ]
      },
      {
        id: "b19",
        img: "set_01_comic/img/b-clever.jpg",
        alt: "女士把刚学会的知识讲给朋友听，显得很聪明",
        kicker: "Become clever",
        sentences: [
          { en: "Learning makes you become very clever.", zh: "学习会让你变得非常聪明。" }
        ]
      },
      {
        id: "b20",
        img: "set_01_comic/img/b5-keep-healthy.jpg",
        alt: "晨跑、健康早餐，医生竖起大拇指",
        kicker: "Keep healthy",
        sentences: [
          { en: "Keep healthy.", zh: "保持健康。" }
        ]
      },
      {
        id: "b21",
        img: "set_01_comic/img/b-exercise.jpg",
        alt: "女士在湖边公园小径上跑步锻炼",
        kicker: "Do more exercise",
        sentences: [
          { en: "Do more exercise.", zh: "多运动。" }
        ]
      },
      {
        id: "b22",
        img: "set_01_comic/img/b-healthy-food.jpg",
        alt: "女士坐在户外桌前吃水果、酸奶和全麦吐司",
        kicker: "Eat healthy food",
        sentences: [
          { en: "And eat healthy food to keep healthy.", zh: "吃健康食物来保持健康。" }
        ]
      },
      {
        id: "b23",
        img: "set_01_comic/img/b-see-doctor.jpg",
        alt: "女士身体不适来到诊所，女医生微笑接待",
        kicker: "See the doctor",
        sentences: [
          { en: "If there is something wrong, go to see the doctor.", zh: "如果身体有什么不对，就去看医生。" }
        ]
      },
      {
        id: "b24",
        img: "set_01_comic/img/b6-simple-joys.jpg",
        alt: "散步、欢笑、拥抱和享受阳光茶点的简单快乐",
        kicker: "Other ways",
        sentences: [
          { en: "There are many other ways to stay young.", zh: "还有许多保持年轻的方法。" }
        ]
      },
      {
        id: "b25",
        img: "set_01_comic/img/b-simple-things.jpg",
        alt: "女士在花园里闻玫瑰、端着茶杯，享受简单事物",
        kicker: "Simple things",
        sentences: [
          { en: "Such as enjoying the simple things.", zh: "比如享受简单事物。" }
        ]
      },
      {
        id: "b26",
        img: "set_01_comic/img/b-laughing.jpg",
        alt: "女士和朋友喝茶时开怀大笑",
        kicker: "Laughing often",
        sentences: [
          { en: "Laughing often.", zh: "经常笑。" }
        ]
      },
      {
        id: "b27",
        img: "set_01_comic/img/b-walk.jpg",
        alt: "女士牵着小狗在公园小径上散步",
        kicker: "Having a walk",
        sentences: [
          { en: "Having a walk often.", zh: "常常散步。" }
        ]
      },
      {
        id: "b28",
        img: "set_01_comic/img/b-tell-love.jpg",
        alt: "女士拥抱亲人，告诉别人自己爱他们",
        kicker: "Tell people you love them",
        sentences: [
          { en: "Telling people you love them and so on.", zh: "告诉别人你爱他们，等等。" }
        ]
      }
    ]
  }
];


  function stripTts(s) {
    return String(s).replace(/\([^)]*[\u4e00-\u9fff][^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  }

  function sentenceKey(en) {
    return stripTts(en)
      .replace(/[“”"‘’]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function mergePanels(panels) {
    const out = [];
    (panels || []).forEach(function (panel) {
      const first = panel.sentences && panel.sentences[0];
      const key = first ? sentenceKey(first.en) : "";
      const prev = out[out.length - 1];
      const prevKey = prev && prev.sentences && prev.sentences[0]
        ? sentenceKey(prev.sentences[0].en)
        : "";
      const img = { src: panel.img, alt: panel.alt || "" };
      if (prev && key && key === prevKey) {
        prev.imgs.push(img);
        if (panel.kicker && prev.kickers.indexOf(panel.kicker) === -1) {
          prev.kickers.push(panel.kicker);
        }
        return;
      }
      out.push({
        id: panel.id,
        kicker: panel.kicker,
        kickers: panel.kicker ? [panel.kicker] : [],
        sentences: panel.sentences,
        imgs: [img]
      });
    });
    out.forEach(function (p) {
      p.kicker = (p.kickers && p.kickers.length) ? p.kickers.join(" · ") : p.kicker;
    });
    return out;
  }

  function getPassage(id) {
    const pass = COMIC.find(function (p) { return p.id === id; });
    if (!pass) return null;
    return {
      id: pass.id,
      title: pass.title,
      en: pass.en,
      zh: pass.zh,
      panels: mergePanels(pass.panels)
    };
  }

  global.PsleSet01Comic = {
    INLINE_CFG: INLINE_CFG,
    PHRASES: PHRASES,
    UNDERLINED: UNDERLINED,
    COMIC: COMIC,
    stripTts: stripTts,
    sentenceKey: sentenceKey,
    mergePanels: mergePanels,
    getPassage: getPassage
  };
})(typeof window !== "undefined" ? window : this);
