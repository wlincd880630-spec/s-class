/**
 * 按人工校对清单重排 4GB 词表
 * node scripts/realign-4gb-vocab.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../Primary/School_textbook/Courseware/4GB/assets/data/data.js');

const TARGET = {
  unit1: {
    name: 'Unit 1 · Jobs & Family',
    title: '职业与家人',
    words: [
      ['doctor', '医生'],
      ['fireman', '消防员'],
      ['farmer', '农民'],
      ['cook', '厨师'],
      ['police', '警察；警方'],
      ['police officer', '警察（职员）'],
      ['station', '车站，局'],
      ['police station', '警察局'],
      ['often', '经常'],
      ['field', '田地；场地'],
      ['painter', '画家'],
      ['use', '使用'],
      ['brush', '画笔；刷子'],
      ['scientist', '科学家'],
      ['writer', '作家'],
      ['worker', '工人'],
      ['aunt', '姑姑；阿姨；舅妈'],
      ['night', '夜晚'],
      ['owl', '猫头鹰'],
      ['night-owl', '夜猫子'],
      ['driver', '司机'],
      ['taxi', '出租车'],
      ['safe', '安全的'],
      ['nurse', '护士'],
      ['light', '灯光；光线'],
      ['uncle', '叔叔；伯父；舅舅'],
      ['bake', '烘烤'],
      ['bee', '蜜蜂'],
      ['same', '相同的'],
      ['sound', '听起来；声音'],
      ['postman', '邮递员'],
      ['life', '生活；生命'],
      ['mountain', '高山'],
    ],
  },
  unit2: {
    name: 'Unit 2 · Feelings & Life',
    title: '情感与生活',
    words: [
      ['laugh', '大笑'],
      ['sad', '伤心的'],
      ['scared', '害怕的'],
      ['angry', '生气的'],
      ['excited', '兴奋的'],
      ['opera', '戏剧；歌剧'],
      ['next', '紧接着，下一个'],
      ['cough', '咳嗽'],
      ['better', '更好的'],
      ['gift', '礼物'],
      ['model', '模型'],
      ['shout', '大喊，叫嚷'],
      ['shoot', '射击'],
      ['feeling', '情绪，感受'],
      ['huge', '巨大的'],
      ['worried', '担心的'],
      ['straight', '笔直的；大街'],
      ['hit', '击打，碰撞'],
    ],
  },
  unit3: {
    name: 'Unit 3 · Talent Show',
    title: '才艺表演',
    words: [
      ['talent', '天赋，才能'],
      ['act', '表演；行动'],
      ['magic', '魔法；有魔力的'],
      ['shine', '发光，闪耀'],
      ['puzzle', '谜题；拼图'],
      ['dancer', '舞者，舞蹈演员'],
      ['win', '获胜，赢得'],
      ['just', '仅仅，只是'],
      ['boy', '男孩'],
      ['slow', '缓慢的'],
    ],
  },
  unit4: {
    name: 'Unit 4 · Plant Growth & Culture',
    title: '植物生长与文化',
    words: [
      ['seed', '种子'],
      ['earth', '泥土；地球'],
      ['root', '根'],
      ['stem', '（植物的）茎'],
      ['leaf', '叶子'],
      ['dig', '挖掘'],
      ['sunflower', '向日葵'],
      ['plant', '种植；植物'],
      ['dream', '梦想'],
      ['sleep', '睡觉'],
      ['will', '将要'],
      ['true', '真实的'],
      ['come true', '实现'],
      ['paper', '纸张'],
      ['drama', '戏剧'],
      ['trip', '短途出行'],
      ['fair', '集市；义卖会；户外联谊会'],
      ['festival', '节日'],
      ['horn', '角；号角'],
      ['dot', '小圆点'],
      ['raindrop', '雨滴'],
      ['more', '更多的'],
      ['special', '特别的'],
      ['keeper', '饲养员；守护者'],
      ['hay', '干草'],
      ['lovely', '可爱的'],
      ['student', '学生'],
      ['culture', '文化'],
      ['hour', '小时'],
      ['note', '笔记；便条'],
      ['vote', '投票'],
      ['design', '设计'],
      ['hometown', '家乡'],
    ],
  },
  unit6: {
    name: 'Unit 6 · Clothes',
    title: '服装打扮',
    words: [
      ['T-shirt', 'T恤衫'],
      ['skirt', '短裙'],
      ['shorts', '短裤'],
      ['shirt', '衬衫'],
      ['trousers', '长裤'],
      ['scarf', '围巾'],
      ['sweater', '毛衣'],
      ['dress', '连衣裙'],
      ['party', '派对'],
      ['dressmaker', '裁缝'],
      ['wrong', '错误的'],
      ['clever', '聪明的'],
      ['will', '将要'],
      ['mister', '先生'],
      ['uniform', '校服，制服'],
      ['robe', '长袍'],
    ],
  },
};

const ALIASES = {
  'night-owl': 'night owl',
  slow: 'slowly',
};

const NEW_WORDS = {
  'police officer': {
    phonemes: [
      { symbol: '/p/', letter: 'p' },
      { symbol: '/ə/', letter: 'o' },
      { symbol: '/l/', letter: 'l' },
      { symbol: '/iː/', letter: 'i' },
      { symbol: '/s/', letter: 'ce' },
      { symbol: '—', letter: ' ' },
      { symbol: '/ɒ/', letter: 'o' },
      { symbol: '/f/', letter: 'ff' },
      { symbol: '/ɪ/', letter: 'i' },
      { symbol: '/s/', letter: 'ce' },
      { symbol: '/ə/', letter: 'er' },
    ],
    image: 'https://picsum.photos/seed/police-officer/400/300',
    sentences: [],
  },
  'police station': {
    phonemes: [
      { symbol: '/p/', letter: 'p' },
      { symbol: '/ə/', letter: 'o' },
      { symbol: '/l/', letter: 'l' },
      { symbol: '/iː/', letter: 'i' },
      { symbol: '/s/', letter: 'ce' },
      { symbol: '—', letter: ' ' },
      { symbol: '/st/', letter: 'st' },
      { symbol: '/eɪ/', letter: 'a' },
      { symbol: '/ʃən/', letter: 'tion' },
    ],
    image: 'https://picsum.photos/seed/police-station/400/300',
    sentences: [],
  },
  shoot: {
    phonemes: [
      { symbol: '/ʃ/', letter: 'sh' },
      { symbol: '/uː/', letter: 'oo' },
      { symbol: '/t/', letter: 't' },
    ],
    image: 'https://picsum.photos/seed/shoot/400/300',
    sentences: [],
  },
  straight: {
    phonemes: [
      { symbol: '/str/', letter: 'str' },
      { symbol: '/eɪ/', letter: 'aigh' },
      { symbol: '/t/', letter: 't' },
    ],
    image: 'https://picsum.photos/seed/straight/400/300',
    sentences: [],
  },
  slow: {
    phonemes: [
      { symbol: '/sl/', letter: 'sl' },
      { symbol: '/əʊ/', letter: 'ow' },
    ],
    image: null,
    sentences: null,
  },
  hay: {
    phonemes: [
      { symbol: '/h/', letter: 'h' },
      { symbol: '/eɪ/', letter: 'ay' },
    ],
    image: 'https://picsum.photos/seed/hay/400/300',
    sentences: [],
  },
  shirt: {
    phonemes: [
      { symbol: '/ʃ/', letter: 'sh' },
      { symbol: '/ɜː/', letter: 'ir' },
      { symbol: '/t/', letter: 't' },
    ],
    image: 'https://picsum.photos/seed/shirt/400/300',
    sentences: [],
  },
  mister: {
    phonemes: [
      { symbol: '/m/', letter: 'm' },
      { symbol: '/ɪ/', letter: 'i' },
      { symbol: '/st/', letter: 'st' },
      { symbol: '/ə/', letter: 'er' },
    ],
    image: 'https://picsum.photos/seed/mister/400/300',
    sentences: [],
  },
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
    if (word === 'slow') {
      entry.phonemes = NEW_WORDS.slow.phonemes;
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
    const words = spec.words.map(([word, chinese], idx) => {
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
 * 外研版小学英语四年级下册单词数据
 * 自动生成，请勿手动编辑
 */
const TEXTBOOK_DATA = ${JSON.stringify(data, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TEXTBOOK_DATA;
}
`;
}

const data = loadData();
const lookup = buildLookup(data);
data.units = buildUnits(lookup);
fs.writeFileSync(DATA_PATH, serialize(data), 'utf8');

const counts = data.units.map((u) => `${u.id}=${u.words.length}`).join(', ');
const total = data.units.reduce((s, u) => s + u.words.length, 0);
console.log(`4GB realigned: ${counts}, total=${total}`);
