/**
 * 按人工校对清单重排 3GB 词表
 * node scripts/realign-3gb-vocab.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../Primary/School_textbook/Courseware/3GB/assets/data/data.js');

const TARGET = {
  unit1: {
    name: 'Unit 1 · Animal Friends',
    title: '动物朋友',
    words: [
      ['animal', '动物'],
      ['panda', '熊猫'],
      ['elephant', '大象'],
      ['bear', '熊'],
      ['giraffe', '长颈鹿'],
      ['monkey', '猴子'],
      ['them', '他们（宾格）'],
      ['draw', '画画'],
      ['tiger', '老虎'],
      ['strong', '强壮的'],
      ['short', '矮的；短的'],
      ['white', '白色；白色的'],
      ['brown', '棕色；棕色的'],
      ['tall', '高大的'],
      ['him', '他（宾格）'],
      ['ostrich', '鸵鸟'],
      ['fast', '快速地；快的'],
      ['small', '小的'],
      ['chameleon', '变色龙'],
      ['lion', '狮子'],
      ['cute', '可爱的'],
      ['out', '向外'],
      ['zoo', '动物园'],
      ['goal', '目标'],
      ['zebra', '斑马'],
      ['move', '移动'],
      ['road', '道路'],
      ['dance', '跳舞'],
      ['along', '沿着；顺着'],
      ['which', '哪一个'],
      ['word', '单词'],
      ['stone', '石头'],
      ['hat', '帽子'],
      ['shoe', '鞋子'],
    ],
  },
  unit2: {
    name: 'Unit 2 · Know Your Body',
    title: '认识身体',
    words: [
      ['body', '身体'],
      ['head', '头'],
      ['eye', '眼睛'],
      ['ear', '耳朵'],
      ['mouth', '嘴巴'],
      ['nose', '鼻子'],
      ['touch', '触摸'],
      ['hand', '手'],
      ['arm', '胳膊'],
      ['leg', '腿'],
      ['foot', '脚（单数）'],
      ['feet', '脚（复数）'],
      ['toe', '脚趾'],
      ['get', '得到'],
      ['snowy', '下雪的'],
      ['child', '小孩（单数）'],
      ['children', '孩子们（复数）'],
      ['work', '工作'],
      ['snowman', '雪人'],
      ['long', '长的'],
      ['rock', '岩石'],
      ['cool', '酷的；凉爽的'],
      ['bat', '球拍；蝙蝠'],
      ['part', '部分'],
      ['well', '好'],
      ['hear', '听见'],
      ['smell', '闻'],
      ['talk', '交谈'],
      ['eat', '吃'],
      ['stop', '停止'],
      ['important', '重要的'],
      ['team', '团队'],
      ['dream', '梦想'],
      ['ask', '提问'],
      ['answer', '回答'],
      ['hair', '头发'],
      ['different', '不同的'],
      ['face', '脸'],
    ],
  },
  unit3: {
    name: 'Unit 3 · Yummy Food',
    title: '美食',
    words: [
      ['yummy', '美味的'],
      ['food', '食物'],
      ['strawberry', '草莓'],
      ['tomato', '西红柿'],
      ['noodles', '面条'],
      ['carrot', '胡萝卜'],
      ['chicken', '鸡肉；小鸡'],
      ['fish', '鱼肉；鱼'],
      ['rice', '米饭'],
      ['meat', '肉'],
      ['fruit', '水果'],
      ['vegetable', '蔬菜'],
      ['salad', '沙拉'],
      ['banana', '香蕉'],
      ['bean', '豆子'],
      ['cucumber', '黄瓜'],
      ['then', '然后'],
      ['about', '关于'],
      ['what about...', '……怎么样'],
      ['grape', '葡萄'],
      ['juice', '果汁'],
      ['why', '为什么'],
      ['early', '早的'],
      ['breakfast', '早餐'],
      ['time', '时间'],
      ['still', '仍然'],
      ['ready', '准备好的'],
      ['corn', '玉米'],
      ['lunch', '午餐'],
      ['very much', '非常'],
      ['afternoon tea', '下午茶'],
      ['every week', '每周'],
      ['tree', '树'],
      ['milk', '牛奶'],
      ['cupcake', '纸杯蛋糕'],
      ['sandwich', '三明治'],
      ['beef', '牛肉'],
      ['dumpling', '饺子'],
      ['hot', '热的'],
      ['hot-dog', '热狗'],
      ['sushi', '寿司'],
      ['cake', '蛋糕'],
    ],
  },
  unit4: {
    name: "Unit 4 · What's Your Hobby",
    title: '爱好',
    words: [
      ['hobby', '爱好'],
      ['free', '空闲的'],
      ['after', '在……之后'],
      ['swim', '游泳'],
      ['lot', '大量'],
      ['a lot of', '许多'],
      ['these', '这些'],
      ['Taiji', '太极拳'],
      ['his', '他的'],
      ['insect', '昆虫'],
      ['man', '男人'],
      ['learn', '学习'],
      ['plant', '植物；种植'],
      ['when', '什么时候'],
      ['question', '问题'],
      ['watch', '观看；手表'],
      ['study', '学习'],
      ['mantis', '螳螂'],
      ['stay', '停留'],
      ['interesting', '有趣的'],
      ['grow', '成长'],
      ['grow up', '长大'],
      ['country', '国家'],
      ['robot', '机器人'],
      ['kite', '风筝'],
      ['skate', '滑冰'],
      ['ice', '冰'],
      ['ski', '滑雪'],
      ['garden', '花园'],
    ],
  },
  unit5: {
    name: 'Unit 5 · What Time Is It',
    title: '几点了',
    words: [
      ['tell', '告诉'],
      ['clock', '钟表'],
      ['a clock', '一个钟表'],
      ['fifteen', '十五'],
      ['thirteen', '十三'],
      ['forty-five', '四十五'],
      ['dinner', '晚餐'],
      ['half', '一半'],
      ['test', '测试'],
      ['homework', '家庭作业'],
      ['need', '需要'],
      ['activity', '活动'],
      ['her', '她（宾格）；她的'],
      ['class', '课堂；班级'],
      ['evening', '晚上'],
      ['call', '打电话；称呼'],
    ],
  },
  unit6: {
    name: 'Unit 6 · A Great Week',
    title: '精彩一周',
    words: [
      ['Monday', '星期一'],
      ['Tuesday', '星期二'],
      ['Wednesday', '星期三'],
      ['Thursday', '星期四'],
      ['Friday', '星期五'],
      ['Saturday', '星期六'],
      ['Sunday', '星期日'],
      ['park', '公园'],
      ['visit', '参观；拜访'],
      ['lesson', '课程'],
      ['football', '足球'],
      ['art', '美术'],
      ['subject', '学科'],
      ['math', '数学'],
      ['science', '科学'],
      ['something', '某物，某事'],
      ['idea', '主意'],
      ['soon', '不久'],
      ['teach', '教'],
      ['English', '英语'],
      ['card', '卡片'],
      ['busy', '忙碌的'],
      ['old', '年老的；旧的'],
      ['some', '一些'],
      ['bookmark', '书签'],
      ['stick', '贴纸'],
      ['sure', '当然'],
      ['flower', '花朵'],
      ['after school', '放学后'],
      ['club', '俱乐部'],
      ['piano', '钢琴'],
      ['basketball', '篮球'],
      ['computer', '电脑'],
      ['music', '音乐'],
    ],
  },
};

const ALIASES = {
  goal: 'go',
  'hot-dog': 'hot dog',
  'a lot of': 'a lot',
  Taiji: 'tai chi',
  math: 'maths',
  'after school': 'afterschool',
};

const PHRASE = (phonemes, imageSeed) => ({
  phonemes,
  image: `https://picsum.photos/seed/${imageSeed}/400/300`,
  sentences: [],
});

const NEW_WORDS = {
  word: PHRASE(
    [
      { symbol: '/w/', letter: 'w' },
      { symbol: '/ɜː/', letter: 'or' },
      { symbol: '/d/', letter: 'd' },
    ],
    '3gb-word'
  ),
  feet: PHRASE(
    [
      { symbol: '/f/', letter: 'f' },
      { symbol: '/iː/', letter: 'ee' },
      { symbol: '/t/', letter: 't' },
    ],
    '3gb-feet'
  ),
  children: PHRASE(
    [
      { symbol: '/tʃ/', letter: 'ch' },
      { symbol: '/ɪ/', letter: 'i' },
      { symbol: '/l/', letter: 'l' },
      { symbol: '/d/', letter: 'dr' },
      { symbol: '/ə/', letter: 'e' },
      { symbol: '/n/', letter: 'n' },
    ],
    '3gb-children'
  ),
  bat: PHRASE(
    [
      { symbol: '/b/', letter: 'b' },
      { symbol: '/æ/', letter: 'a' },
      { symbol: '/t/', letter: 't' },
    ],
    '3gb-bat'
  ),
  'every week': PHRASE(
    [
      { symbol: '/e/', letter: 'e' },
      { symbol: '/v/', letter: 'v' },
      { symbol: '/ə/', letter: 'er' },
      { symbol: '/i/', letter: 'y' },
      { symbol: '—', letter: ' ' },
      { symbol: '/w/', letter: 'w' },
      { symbol: '/iː/', letter: 'ee' },
      { symbol: '/k/', letter: 'k' },
    ],
    '3gb-every-week'
  ),
  'a lot of': PHRASE(
    [
      { symbol: '/ə/', letter: 'a' },
      { symbol: '—', letter: ' ' },
      { symbol: '/l/', letter: 'l' },
      { symbol: '/ɒ/', letter: 'o' },
      { symbol: '/t/', letter: 't' },
      { symbol: '—', letter: ' ' },
      { symbol: '/ɒ/', letter: 'o' },
      { symbol: '/v/', letter: 'f' },
    ],
    '3gb-a-lot-of'
  ),
  'a clock': PHRASE(
    [
      { symbol: '/ə/', letter: 'a' },
      { symbol: '—', letter: ' ' },
      { symbol: '/k/', letter: 'c' },
      { symbol: '/l/', letter: 'l' },
      { symbol: '/ɒ/', letter: 'o' },
      { symbol: '/k/', letter: 'ck' },
    ],
    '3gb-a-clock'
  ),
  thirteen: PHRASE(
    [
      { symbol: '/θ/', letter: 'th' },
      { symbol: '/ɜː/', letter: 'ir' },
      { symbol: '/tiː/', letter: 'teen' },
    ],
    '3gb-thirteen'
  ),
  test: PHRASE(
    [
      { symbol: '/t/', letter: 't' },
      { symbol: '/e/', letter: 'e' },
      { symbol: '/s/', letter: 'st' },
    ],
    '3gb-test'
  ),
};

function loadData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const fn = new Function(`${raw}\nreturn TEXTBOOK_DATA;`);
  return fn();
}

function buildLookup(data) {
  const map = new Map();
  for (const unit of data.units) {
    for (const w of unit.words) {
      if (!map.has(w.word)) map.set(w.word, structuredClone(w));
    }
  }
  return map;
}

function resolveWord(word, lookup) {
  if (lookup.has(word)) return structuredClone(lookup.get(word));
  const alias = ALIASES[word];
  if (alias && lookup.has(alias)) {
    const entry = structuredClone(lookup.get(alias));
    entry.word = word;
    if (word === 'goal') {
      entry.phonemes = [
        { symbol: '/ɡ/', letter: 'g' },
        { symbol: '/əʊ/', letter: 'oa' },
        { symbol: '/l/', letter: 'l' },
      ];
    }
    if (word === 'a lot of') {
      entry.phonemes = NEW_WORDS['a lot of'].phonemes;
      entry.image = NEW_WORDS['a lot of'].image;
    }
    return entry;
  }
  if (NEW_WORDS[word]) {
    const nw = NEW_WORDS[word];
    return {
      word,
      chinese: '',
      phonemes: nw.phonemes,
      image: nw.image,
      sentences: nw.sentences ?? [],
    };
  }
  throw new Error(`Missing word: ${word}`);
}

function buildUnits(lookup) {
  const units = [];
  let id = 1;
  for (const [unitId, spec] of Object.entries(TARGET)) {
    const words = spec.words.map(([word, chinese]) => {
      const entry = resolveWord(word, lookup);
      entry.id = `w${id++}`;
      entry.chinese = chinese;
      return entry;
    });
    units.push({
      id: unitId,
      name: spec.name,
      title: spec.title,
      words,
    });
  }
  return units;
}

function serialize(data) {
  return `/**
 * 外研版小学英语三年级下册（新版）单词数据
 * 自动生成，请勿手动编辑
 */
const TEXTBOOK_DATA = ${JSON.stringify(data, null, 2)};

if (typeof module !== 'undefined') module.exports = TEXTBOOK_DATA;
`;
}

const data = loadData();
const lookup = buildLookup(data);
data.units = buildUnits(lookup);
fs.writeFileSync(DATA_PATH, serialize(data), 'utf8');

const counts = data.units.map((u) => `${u.id}=${u.words.length}`).join(', ');
const total = data.units.reduce((s, u) => s + u.words.length, 0);
console.log(`3GB realigned: ${counts}, total=${total}`);
