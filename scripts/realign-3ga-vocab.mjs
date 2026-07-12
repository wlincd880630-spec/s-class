/**
 * 按人工校对清单重排 3GA 词表
 * node scripts/realign-3ga-vocab.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../Primary/School_textbook/Courseware/3GA/assets/data/data.js');

const TARGET = {
  welcome: {
    name: 'Welcome · Welcome to School',
    title: '走进校园',
    words: [
      ['hi', '嗨'],
      ['I', '我'],
      ['am', '是（只和I搭配）'],
      ['is', '是（单数使用）'],
      ['are', '是（复数使用）'],
      ['what', '什么'],
      ['your', '你的'],
      ['name', '名字'],
      ['hello', '你好'],
      ['my', '我的'],
      ['goodbye', '再见'],
      ['have', '拥有；度过'],
      ['a', '一个（用于辅音开头单词前，冠词）'],
      ['an', '一个（用于元音开头单词前，冠词）'],
      ['nice', '美好的'],
      ['day', '一天；日子'],
      ['nice day', '美好的一天'],
      ['good morning', '早上好'],
      ['Ms', '女士'],
      ['stand', '站立'],
      ['stand up', '起立'],
      ['sit', '坐'],
      ['sit down', '坐下'],
      ['open', '打开'],
      ['book', '书本'],
      ['close', '合上'],
      ['point', '指向'],
      ['say', '说'],
      ['read', '阅读'],
      ['listen', '听'],
      ['write', '书写'],
    ],
  },
  unit1: {
    name: 'Unit 1 · Greetings & Friends',
    title: '问候与朋友',
    words: [
      ['to', '向；到'],
      ['meet', '遇见'],
      ['friend', '朋友'],
      ['you', '你'],
      ['play', '玩耍'],
      ['happy', '开心的'],
      ['new', '新的'],
      ['do', '做'],
      ['they', '他们'],
      ['welcome', '欢迎'],
      ['everyone', '每个人'],
      ['nine', '九'],
      ['she', '她'],
      ['too', '也'],
      ['two', '二'],
      ['we', '我们'],
      ['from', '来自'],
      ['twin', '双胞胎之一'],
      ['he', '他'],
      ['come', '来'],
      ['and', '和'],
      ['no', '不'],
      ['help', '帮助'],
      ['here', '这里'],
      ['here you are', '给你'],
      ['thank', '感谢'],
      ['together', '一起'],
      ['other', '另外的'],
      ['OK', '好的'],
      ['great', '极好的'],
      ['song', '歌曲'],
      ['dear', '亲爱的'],
      ['sing', '唱歌'],
      ['now', '现在'],
      ['our', '我们的'],
      ['everybody', '所有人'],
      ['with', '和……一起'],
      ['me', '我（宾格）'],
    ],
  },
  unit2: {
    name: 'Unit 2 · School Things',
    title: '学习用品',
    words: [
      ['school', '学校'],
      ['thing', '物品；东西'],
      ['pack', '收拾（物品）'],
      ['pen', '钢笔'],
      ['pencil', '铅笔'],
      ['pencil-case', '铅笔盒'],
      ['bag', '书包'],
      ['four', '四'],
      ['ruler', '尺子'],
      ['eraser', '橡皮'],
      ['this', '这个'],
      ['in', '在……里面'],
      ['schoolbag', '书包'],
      ['it', '它'],
      ['not', '不'],
      ['that', '那个'],
      ['yes', '是的'],
      ['guess', '猜测'],
      ['find', '找到'],
      ['lost and found', '失物招领'],
      ['bye', '再见'],
      ['kit', '成套用品'],
      ['take care of somebody', '照顾某人'],
      ['take care of something', '保管某物'],
      ['there', '在那里'],
      ['please', '请'],
      ['back', '返回'],
      ['come back', '回来'],
      ['look', '看'],
      ['look at somebody', '看着某人'],
      ['look at something', '看着某物'],
    ],
  },
  unit3: {
    name: 'Unit 3 · Colours',
    title: '颜色',
    words: [
      ['colorful', '五颜六色的'],
      ['world', '世界'],
      ['umbrella', '雨伞'],
      ['clothes', '衣服'],
      ['red', '红色；红色的'],
      ['pink', '粉色；粉色的'],
      ['green', '绿色；绿色的'],
      ['yellow', '黄色；黄色的'],
      ['orange', '橙色；橙色的'],
      ['blue', '蓝色；蓝色的'],
      ['purple', '紫色；紫色的'],
      ['rainbow', '彩虹'],
      ['want', '想要'],
      ['balloon', '气球'],
      ['color', '颜色'],
      ['can', '能够'],
      ['see', '看见'],
      ['write', '书写'],
      ['first', '第一'],
      ['magical', '神奇的'],
      ['fun', '有趣的'],
      ['black', '黑色；黑色的'],
      ['so many', '如此多'],
      ['picture', '图画'],
      ['today', '今天'],
      ['paint', '绘画'],
    ],
  },
  unit4: {
    name: 'Unit 4 · Numbers',
    title: '数字',
    words: [
      ['number', '数字'],
      ['count', '数数'],
      ['how', '怎样；多么'],
      ['bird', '小鸟'],
      ['one', '1'],
      ['two', '2'],
      ['three', '3'],
      ['four', '4'],
      ['five', '5'],
      ['six', '6'],
      ['seven', '7'],
      ['eight', '8'],
      ['ten', '10'],
      ['eleven', '11'],
      ['twelve', '12'],
      ['rope', '绳子'],
      ['who', '谁'],
      ['make', '制作'],
      ['Chinese knot', '中国结'],
      ['beautiful', '漂亮的'],
      ['only', '仅仅'],
      ['amazing', '令人惊奇的'],
      ['thing', '东西；物品'],
      ['show', '展示'],
      ['baby', '宝贝'],
      ['egg', '鸡蛋'],
      ['hungry', '饥饿的'],
      ['around', '到处；围绕'],
      ['all', '全部'],
      ['all around', '四处，到处'],
      ['big', '大的'],
      ['little', '小的'],
      ['everywhere', '到处'],
    ],
  },
  unit5: {
    name: "Unit 5 · We're Family",
    title: '一家人',
    words: [
      ['family', '家庭；家人'],
      ['dad', '爸爸（口语）'],
      ['father', '父亲（正式）'],
      ['mom', '妈妈（口语）'],
      ['mother', '母亲（正式）'],
      ['brother', '兄弟'],
      ['sister', '姐妹'],
      ['Mister（Mr.）', '先生'],
      ['grandpa', '祖父；外祖父（口语）'],
      ['grandfather', '祖父；外祖父（正式）'],
      ['grandma', '祖母；外祖母（口语）'],
      ['grandmother', '祖母；外祖母（正式）'],
      ['but', '但是'],
      ['people', '人们'],
      ['story', '故事'],
      ['cap', '帽子'],
      ['worry', '担心'],
      ['on', '在……上面'],
      ['come on', '加油；来吧'],
      ['photo', '照片'],
      ['love', '爱；喜爱'],
      ['daddy', '爸爸（亲昵叫法）'],
      ['mommy', '妈妈（亲昵叫法）'],
      ['where', '在哪里'],
      ['dog', '小狗'],
      ['box', '盒子'],
    ],
  },
  unit6: {
    name: 'Unit 6 · My Home',
    title: '我的家',
    words: [
      ['sweet', '糖果；甜蜜的'],
      ['home', '家'],
      ['game', '游戏'],
      ['room', '房间'],
      ['living-room', '客厅'],
      ['bedroom', '卧室'],
      ['bathroom', '浴室'],
      ['kitchen', '厨房'],
      ['dining-room', '餐厅'],
      ['door', '门'],
      ['chair', '椅子'],
      ['think', '思考；认为'],
      ['under', '在……下面'],
      ['bed', '床'],
      ['toy', '玩具'],
      ['table', '桌子'],
      ['cat', '小猫'],
      ['ball', '球'],
      ['there', '在那儿'],
      ['apple', '苹果'],
      ['share', '分享'],
      ['put', '放置'],
      ['cooking', '做饭'],
      ['sun', '太阳'],
      ['like', '喜欢'],
      ['run', '跑'],
      ['lucky', '幸运的'],
    ],
  },
};

const ALIASES = {
  'pencil-case': 'pencil case',
  kit: 'kid',
  color: 'colour',
  colorful: 'colourful',
  'living-room': 'living room',
  'dining-room': 'dining room',
  dad: 'dad (father)',
  mom: 'mum (mother)',
  mommy: 'mummy',
  lucky: 'Lucky',
};

const PHRASE = (word, phonemes, imageSeed) => ({
  phonemes,
  image: `https://picsum.photos/seed/${imageSeed}/400/300`,
  sentences: [],
});

const NEW_WORDS = {
  am: PHRASE('am', [
    { symbol: '/æ/', letter: 'a' },
    { symbol: '/m/', letter: 'm' },
  ], '3ga-am'),
  is: PHRASE('is', [
    { symbol: '/ɪ/', letter: 'i' },
    { symbol: '/z/', letter: 's' },
  ], '3ga-is'),
  are: PHRASE('are', [
    { symbol: '/ɑː/', letter: 'a' },
    { symbol: '—', letter: 'r' },
    { symbol: '/e/', letter: 'e' },
  ], '3ga-are'),
  a: PHRASE('a', [{ symbol: '/ə/', letter: 'a' }], '3ga-a'),
  an: PHRASE('an', [
    { symbol: '/æ/', letter: 'a' },
    { symbol: '/n/', letter: 'n' },
  ], '3ga-an'),
  'nice day': PHRASE('nice day', [
    { symbol: '/n/', letter: 'n' },
    { symbol: '/aɪ/', letter: 'i' },
    { symbol: '/s/', letter: 'ce' },
    { symbol: '—', letter: ' ' },
    { symbol: '/d/', letter: 'd' },
    { symbol: '/eɪ/', letter: 'ay' },
  ], '3ga-nice-day'),
  'good morning': PHRASE('good morning', [
    { symbol: '/ɡ/', letter: 'g' },
    { symbol: '/ʊ/', letter: 'oo' },
    { symbol: '/d/', letter: 'd' },
    { symbol: '—', letter: ' ' },
    { symbol: '/m/', letter: 'm' },
    { symbol: '/ɔː/', letter: 'or' },
    { symbol: '/n/', letter: 'n' },
    { symbol: '/ɪ/', letter: 'i' },
    { symbol: '/ŋ/', letter: 'ng' },
  ], '3ga-good-morning'),
  other: PHRASE('other', [
    { symbol: '/ʌ/', letter: 'o' },
    { symbol: '/ð/', letter: 'th' },
    { symbol: '/ə/', letter: 'er' },
  ], '3ga-other'),
  'take care of somebody': PHRASE('take care of somebody', [
    { symbol: '/t/', letter: 't' },
    { symbol: '/eɪ/', letter: 'a' },
    { symbol: '/k/', letter: 'ke' },
    { symbol: '—', letter: ' ' },
    { symbol: '/k/', letter: 'c' },
    { symbol: '/eə/', letter: 'are' },
    { symbol: '—', letter: ' ' },
    { symbol: '/ɒ/', letter: 'o' },
    { symbol: '/v/', letter: 'f' },
    { symbol: '—', letter: ' ' },
    { symbol: '/s/', letter: 's' },
    { symbol: '/ʌ/', letter: 'o' },
    { symbol: '/m/', letter: 'me' },
    { symbol: '/b/', letter: 'b' },
    { symbol: '/ɒ/', letter: 'o' },
    { symbol: '/d/', letter: 'd' },
    { symbol: '/i/', letter: 'y' },
  ], '3ga-take-care-sb'),
  'take care of something': PHRASE('take care of something', [
    { symbol: '/t/', letter: 't' },
    { symbol: '/eɪ/', letter: 'a' },
    { symbol: '/k/', letter: 'ke' },
    { symbol: '—', letter: ' ' },
    { symbol: '/k/', letter: 'c' },
    { symbol: '/eə/', letter: 'are' },
    { symbol: '—', letter: ' ' },
    { symbol: '/ɒ/', letter: 'o' },
    { symbol: '/v/', letter: 'f' },
    { symbol: '—', letter: ' ' },
    { symbol: '/s/', letter: 's' },
    { symbol: '/ʌ/', letter: 'o' },
    { symbol: '/θ/', letter: 'm' },
    { symbol: '/ɪ/', letter: 'e' },
    { symbol: '/ŋ/', letter: 'thing' },
  ], '3ga-take-care-sth'),
  'look at somebody': PHRASE('look at somebody', [
    { symbol: '/l/', letter: 'l' },
    { symbol: '/ʊ/', letter: 'oo' },
    { symbol: '/k/', letter: 'k' },
    { symbol: '—', letter: ' ' },
    { symbol: '/æ/', letter: 'a' },
    { symbol: '/t/', letter: 't' },
    { symbol: '—', letter: ' ' },
    { symbol: '/s/', letter: 's' },
    { symbol: '/ʌ/', letter: 'o' },
    { symbol: '/m/', letter: 'me' },
    { symbol: '/b/', letter: 'b' },
    { symbol: '/ɒ/', letter: 'o' },
    { symbol: '/d/', letter: 'd' },
    { symbol: '/i/', letter: 'y' },
  ], '3ga-look-at-sb'),
  'look at something': PHRASE('look at something', [
    { symbol: '/l/', letter: 'l' },
    { symbol: '/ʊ/', letter: 'oo' },
    { symbol: '/k/', letter: 'k' },
    { symbol: '—', letter: ' ' },
    { symbol: '/æ/', letter: 'a' },
    { symbol: '/t/', letter: 't' },
    { symbol: '—', letter: ' ' },
    { symbol: '/s/', letter: 's' },
    { symbol: '/ʌ/', letter: 'o' },
    { symbol: '/θ/', letter: 'm' },
    { symbol: '/ɪ/', letter: 'e' },
    { symbol: '/ŋ/', letter: 'thing' },
  ], '3ga-look-at-sth'),
  'so many': PHRASE('so many', [
    { symbol: '/s/', letter: 's' },
    { symbol: '/əʊ/', letter: 'o' },
    { symbol: '—', letter: ' ' },
    { symbol: '/m/', letter: 'm' },
    { symbol: '/e/', letter: 'a' },
    { symbol: '/n/', letter: 'n' },
    { symbol: '/i/', letter: 'y' },
  ], '3ga-so-many'),
  father: PHRASE('father', [
    { symbol: '/f/', letter: 'f' },
    { symbol: '/ɑː/', letter: 'a' },
    { symbol: '/ð/', letter: 'th' },
    { symbol: '/ə/', letter: 'er' },
  ], '3ga-father'),
  mother: PHRASE('mother', [
    { symbol: '/m/', letter: 'm' },
    { symbol: '/ʌ/', letter: 'o' },
    { symbol: '/ð/', letter: 'th' },
    { symbol: '/ə/', letter: 'er' },
  ], '3ga-mother'),
  'Mister（Mr.）': PHRASE('Mister（Mr.）', [
    { symbol: '/m/', letter: 'M' },
    { symbol: '/ɪ/', letter: 'i' },
    { symbol: '/s/', letter: 's' },
    { symbol: '/t/', letter: 't' },
    { symbol: '/ə/', letter: 'er' },
  ], '3ga-mister'),
  grandpa: PHRASE('grandpa', [
    { symbol: '/ɡr/', letter: 'gr' },
    { symbol: '/æ/', letter: 'a' },
    { symbol: '/n/', letter: 'nd' },
    { symbol: '/p/', letter: 'p' },
    { symbol: '/ɑː/', letter: 'a' },
  ], '3ga-grandpa'),
  grandfather: PHRASE('grandfather', [
    { symbol: '/ɡr/', letter: 'gr' },
    { symbol: '/æ/', letter: 'a' },
    { symbol: '/n/', letter: 'n' },
    { symbol: '/f/', letter: 'f' },
    { symbol: '/ɑː/', letter: 'a' },
    { symbol: '/ð/', letter: 'th' },
    { symbol: '/ə/', letter: 'er' },
  ], '3ga-grandfather'),
  grandma: PHRASE('grandma', [
    { symbol: '/ɡr/', letter: 'gr' },
    { symbol: '/æ/', letter: 'a' },
    { symbol: '/n/', letter: 'm' },
    { symbol: '/m/', letter: 'm' },
    { symbol: '/ɑː/', letter: 'a' },
  ], '3ga-grandma'),
  grandmother: PHRASE('grandmother', [
    { symbol: '/ɡr/', letter: 'gr' },
    { symbol: '/æ/', letter: 'a' },
    { symbol: '/n/', letter: 'n' },
    { symbol: '/m/', letter: 'm' },
    { symbol: '/ʌ/', letter: 'o' },
    { symbol: '/ð/', letter: 'th' },
    { symbol: '/ə/', letter: 'er' },
  ], '3ga-grandmother'),
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
    if (word === 'dad' || word === 'mom') {
      entry.phonemes = word === 'dad'
        ? [
            { symbol: '/d/', letter: 'd' },
            { symbol: '/æ/', letter: 'a' },
            { symbol: '/d/', letter: 'd' },
          ]
        : [
            { symbol: '/m/', letter: 'm' },
            { symbol: '/ɒ/', letter: 'o' },
            { symbol: '/m/', letter: 'm' },
          ];
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
 * 外研版小学英语三年级上册（新版）单词数据
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
console.log(`3GA realigned: ${counts}, total=${total}`);
