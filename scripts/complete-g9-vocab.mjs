#!/usr/bin/env node
/**
 * Complete G9 Units 1-7 + fill missing U8-U14 words (exclude person names).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const G9 = path.join(ROOT, 'junior_vocab', 'G9');
const SOURCE = 'D:\\2026\\初中\\人教版英语九年级全单词表\\人教版英语九全.pdf';

const UNIT_TITLES = {
  1: ['How can we become good learners?', '我们怎样才能成为好的学习者？'],
  2: ['I think that mooncakes are delicious!', '我认为月饼很好吃！'],
  3: ['Could you please tell me where the restrooms are?', '你能告诉我洗手间在哪里吗？'],
  4: ['I used to be afraid of the dark.', '我过去害怕黑暗。'],
  5: ['What are the shirts made of?', '这些衬衫是用什么做的？'],
  6: ['When was it invented?', '它是什么时候发明的？'],
  7: ['Teenagers should be allowed to choose their own clothes.', '应该允许青少年选择自己的衣服。'],
  8: ['It must belong to Carla.', '它一定属于卡拉。'],
  9: ['I like music that I can dance to.', '我喜欢能跟着跳舞的音乐。'],
  10: ["You're supposed to shake hands.", '你应该握手。'],
  11: ['Sad movies make me cry.', '悲伤的电影让我哭。'],
  12: ['Life is full of the unexpected.', '生活充满意外。'],
  13: ["We're trying to save the earth!", '我们正在努力拯救地球！'],
  14: ['I remember meeting all of you in Grade 7.', '我记得在七年级遇见你们所有人。']
};

/** @type {Record<number, Array<{word:string, meaning_cn:string, usage?:string, ipa?:string}>>} */
const NEW_UNITS = {
  1: [
    ['textbook','教科书；课本','n.','/ˈtekstbʊk/'],
    ['conversation','交谈；谈话','n.','/ˌkɒnvəˈseɪʃn/'],
    ['aloud','大声地；出声地','adv.','/əˈlaʊd/'],
    ['pronunciation','发音；读音','n.','/prəˌnʌnsiˈeɪʃn/'],
    ['sentence','句子','n.','/ˈsentəns/'],
    ['patient','有耐心的；病人','adj. / n.','/ˈpeɪʃnt/'],
    ['expression','表达（方式）；表示','n.','/ɪkˈspreʃn/'],
    ['discover','发现；发觉','v.','/dɪˈskʌvə(r)/'],
    ['secret','秘密；秘密的','n. / adj.','/ˈsiːkrət/'],
    ['fall in love with','爱上；与……相爱','短语','/fɔːl ɪn lʌv wɪð/'],
    ['grammar','语法','n.','/ˈɡræmə(r)/'],
    ['repeat','重复；重做','v.','/rɪˈpiːt/'],
    ['note','笔记；记录；注意','n. / v.','/nəʊt/'],
    ['pal','朋友；伙伴','n.','/pæl/'],
    ['pattern','模式；方式','n.','/ˈpætn/'],
    ['physics','物理；物理学','n.','/ˈfɪzɪks/'],
    ['chemistry','化学','n.','/ˈkemɪstri/'],
    ['partner','搭档；同伴','n.','/ˈpɑːtnə(r)/'],
    ['pronounce','发音','v.','/prəˈnaʊns/'],
    ['increase','增加；增长','v.','/ɪnˈkriːs/'],
    ['speed','速度；加速','n. / v.','/spiːd/'],
    ['ability','能力；才能','n.','/əˈbɪləti/'],
    ['brain','大脑','n.','/breɪn/'],
    ['active','活跃的；积极的','adj.','/ˈæktɪv/'],
    ['attention','注意；关注','n.','/əˈtenʃn/'],
    ['pay attention to','注意；关注','短语','/peɪ əˈtenʃn tuː/'],
    ['connect','（使）连接；与……有联系','v.','/kəˈnekt/'],
    ['connect … with','把……和……连接或联系起来','短语','/kəˈnekt wɪð/'],
    ['overnight','一夜之间；在夜间','adv.','/ˌəʊvəˈnaɪt/'],
    ['review','回顾；复习','v. / n.','/rɪˈvjuː/'],
    ['knowledge','知识；学问','n.','/ˈnɒlɪdʒ/'],
    ['wisely','明智地；聪明地','adv.','/ˈwaɪzli/'],
  ],
  2: [
    ['lantern','灯笼','n.','/ˈlæntən/'],
    ['stranger','陌生人','n.','/ˈstreɪndʒə(r)/'],
    ['relative','亲属；亲戚','n.','/ˈrelətɪv/'],
    ['put on','增加（体重）；发胖；穿上','短语','/pʊt ɒn/'],
    ['pound','磅；英镑','n.','/paʊnd/'],
    ['folk','民间的；民俗的','adj.','/fəʊk/'],
    ['goddess','女神','n.','/ˈɡɒdes/'],
    ['steal','偷；窃取','v.','/stiːl/'],
    ['lay','放置；产（卵）','v.','/leɪ/'],
    ['lay out','摆开；布置','短语','/leɪ aʊt/'],
    ['dessert','（饭后）甜点；甜食','n.','/dɪˈzɜːt/'],
    ['garden','花园；园子','n.','/ˈɡɑːdn/'],
    ['admire','欣赏；仰慕','v.','/ədˈmaɪə(r)/'],
    ['tie','领带；捆；束','n. / v.','/taɪ/'],
    ['haunted','有鬼魂出没的','adj.','/ˈhɔːntɪd/'],
    ['ghost','鬼；鬼魂','n.','/ɡəʊst/'],
    ['trick','花招；把戏','n.','/trɪk/'],
    ['treat','款待；招待；请客','n. / v.','/triːt/'],
    ['spider','蜘蛛','n.','/ˈspaɪdə(r)/'],
    ['Christmas','圣诞节','n.','/ˈkrɪsməs/'],
    ['fool','蠢人；愚弄；愚蠢的','n. / v. / adj.','/fuːl/'],
    ['lie','平躺；处于','v.','/laɪ/'],
    ['novel','（长篇）小说','n.','/ˈnɒvl/'],
    ['eve','前夕；前夜','n.','/iːv/'],
    ['bookstore','书店','n.','/ˈbʊkstɔː(r)/'],
    ['dead','死的；失去生命的','adj.','/ded/'],
    ['business','生意；商业','n.','/ˈbɪznəs/'],
    ['punish','处罚；惩罚','v.','/ˈpʌnɪʃ/'],
    ['warn','警告；告诫','v.','/wɔːn/'],
    ['present','现在；礼物；现在的','n. / adj.','/ˈpreznt/'],
    ['nobody','没有人','pron.','/ˈnəʊbədi/'],
    ['warmth','温暖；暖和','n.','/wɔːmθ/'],
    ['spread','传播；展开；蔓延','v. / n.','/spred/'],
  ],
  3: [
    ['restroom','洗手间；公共厕所','n.','/ˈrestruːm/'],
    ['stamp','邮票；印章','n.','/stæmp/'],
    ['postcard','明信片','n.','/ˈpəʊstkɑːd/'],
    ['pardon','请再说一遍；原谅','interj. / n. / v.','/ˈpɑːdn/'],
    ['washroom','洗手间；厕所','n.','/ˈwɒʃruːm/'],
    ['bathroom','浴室；洗手间','n.','/ˈbɑːθruːm/'],
    ['quick','快的；迅速的','adj.','/kwɪk/'],
    ['rush','仓促；急促','v. / n.','/rʌʃ/'],
    ['suggest','建议；提议','v.','/səˈdʒest/'],
    ['staff','管理人员；职工','n.','/stɑːf/'],
    ['grape','葡萄','n.','/ɡreɪp/'],
    ['central','中心的；中央的','adj.','/ˈsentrəl/'],
    ['mail','邮寄；邮件','v. / n.','/meɪl/'],
    ['east','东方的；向东；东方','adj. / adv. / n.','/iːst/'],
    ['fascinating','迷人的；有吸引力的','adj.','/ˈfæsɪneɪtɪŋ/'],
    ['convenient','便利的；方便的','adj.','/kənˈviːniənt/'],
    ['mall','商场；购物中心','n.','/mɔːl/'],
    ['clerk','职员','n.','/klɑːk/'],
    ['corner','拐角；角落','n.','/ˈkɔːnə(r)/'],
    ['polite','有礼貌的；客气的','adj.','/pəˈlaɪt/'],
    ['politely','礼貌地；客气地','adv.','/pəˈlaɪtli/'],
    ['speaker','讲（某种语言）的人；发言者','n.','/ˈspiːkə(r)/'],
    ['request','要求；请求','n. / v.','/rɪˈkwest/'],
    ['choice','选择；挑选','n.','/tʃɔɪs/'],
    ['direction','方向；方位','n.','/dəˈrekʃn/'],
    ['correct','正确的；恰当的','adj.','/kəˈrekt/'],
    ['direct','直接的；直率的','adj.','/dəˈrekt/'],
    ['whom','谁；什么人','pron.','/huːm/'],
    ['address','地址；通讯处','n.','/əˈdres/'],
    ['faithfully','忠实地；忠诚地','adv.','/ˈfeɪθfəli/'],
  ],
  4: [
    ['humorous','有幽默感的；滑稽的','adj.','/ˈhjuːmərəs/'],
    ['silent','不说话的；沉默的','adj.','/ˈsaɪlənt/'],
    ['helpful','有用的；有帮助的','adj.','/ˈhelpfl/'],
    ['from time to time','时常；有时','短语','/frəm taɪm tə taɪm/'],
    ['score','得分；打分','n. / v.','/skɔː(r)/'],
    ['background','背景','n.','/ˈbækɡraʊnd/'],
    ['interview','采访；面试；访谈','v. / n.','/ˈɪntəvjuː/'],
    ['Asian','亚洲的；亚洲人','adj. / n.','/ˈeɪʒn/'],
    ['deal with','对付；应付','短语','/diːl wɪð/'],
    ['dare','敢于；胆敢','v.','/deə(r)/'],
    ['private','私人的；私密的','adj.','/ˈpraɪvət/'],
    ['guard','警卫；看守；守卫','n. / v.','/ɡɑːd/'],
    ['require','需要；要求','v.','/rɪˈkwaɪə(r)/'],
    ['British','英国的；英国人的','adj.','/ˈbrɪtɪʃ/'],
    ['speech','讲话；发言','n.','/spiːtʃ/'],
    ['ant','蚂蚁','n.','/ænt/'],
    ['insect','昆虫','n.','/ˈɪnsekt/'],
    ['influence','影响','v. / n.','/ˈɪnfluəns/'],
    ['seldom','不常；很少','adv.','/ˈseldəm/'],
    ['proud','自豪的；骄傲的','adj.','/praʊd/'],
    ['be proud of','为……骄傲；感到自豪','短语','/bi praʊd əv/'],
    ['absent','缺席；不在','adj.','/ˈæbsənt/'],
    ['fail','失败；未能（做到）','v.','/feɪl/'],
    ['examination','考试；审查','n.','/ɪɡˌzæmɪˈneɪʃn/'],
    ['boarding school','寄宿学校','n.','/ˈbɔːdɪŋ skuːl/'],
    ['in person','亲身；亲自','短语','/ɪn ˈpɜːsn/'],
    ['exactly','确切地；精确地','adv.','/ɪɡˈzæktli/'],
    ['pride','自豪；骄傲','n.','/praɪd/'],
    ['take pride in','为……感到自豪','短语','/teɪk praɪd ɪn/'],
    ['grandson','孙子；外孙','n.','/ˈɡrænsʌn/'],
    ['general','普遍的；常规的；总的；将军','adj. / n.','/ˈdʒenrəl/'],
    ['introduction','介绍','n.','/ˌɪntrəˈdʌkʃn/'],
  ],
  5: [
    ['material','材料；原料','n.','/məˈtɪəriəl/'],
    ['chopsticks','筷子','n.','/ˈtʃɒpstɪks/'],
    ['coin','硬币','n.','/kɔɪn/'],
    ['fork','餐叉；叉子','n.','/fɔːk/'],
    ['blouse','（女士）短上衣；衬衫','n.','/blaʊz/'],
    ['silver','银；银器；银色的','n. / adj.','/ˈsɪlvə(r)/'],
    ['glass','玻璃','n.','/ɡlɑːs/'],
    ['cotton','棉；棉花','n.','/ˈkɒtn/'],
    ['steel','钢；钢铁','n.','/stiːl/'],
    ['grass','草；草地','n.','/ɡrɑːs/'],
    ['leaf','叶；叶子','n.','/liːf/'],
    ['produce','生产；制造；出产','v.','/prəˈdjuːs/'],
    ['widely','广泛地；普遍地','adv.','/ˈwaɪdli/'],
    ['process','加工；处理','v. / n.','/ˈprəʊses/'],
    ['France','法国','n.','/frɑːns/'],
    ['no matter','不论；无论','短语','/nəʊ ˈmætə(r)/'],
    ['local','当地的；本地的','adj.','/ˈləʊkl/'],
    ['even though','虽然；即使','短语','/ˈiːvn ðəʊ/'],
    ['brand','品牌；牌子','n.','/brænd/'],
    ['avoid','避免；回避','v.','/əˈvɔɪd/'],
    ['product','产品；制品','n.','/ˈprɒdʌkt/'],
    ['handbag','小手提包','n.','/ˈhændbæɡ/'],
    ['mobile','可移动的；非固定的','adj.','/ˈməʊbaɪl/'],
    ['Germany','德国','n.','/ˈdʒɜːməni/'],
    ['surface','表面；表层','n.','/ˈsɜːfɪs/'],
    ['postman','邮递员','n.','/ˈpəʊstmən/'],
    ['cap','（尤指有帽舌的）帽','n.','/kæp/'],
    ['glove','（分手指的）手套','n.','/ɡlʌv/'],
    ['international','国际的','adj.','/ˌɪntəˈnæʃnəl/'],
    ['competitor','参赛者；竞争者','n.','/kəmˈpetɪtə(r)/'],
    ['paint','用颜料画；刷漆','v. / n.','/peɪnt/'],
    ['its','它的','pron.','/ɪts/'],
    ['form','形式；类型','n.','/fɔːm/'],
    ['clay','黏土；陶土','n.','/kleɪ/'],
    ['balloon','气球','n.','/bəˈluːn/'],
    ['scissors','剪刀','n.','/ˈsɪzəz/'],
    ['lively','生气勃勃的；（色彩）鲜艳的','adj.','/ˈlaɪvli/'],
    ['fairy tale','童话故事','n.','/ˈfeəri teɪl/'],
    ['heat','热；高温','n.','/hiːt/'],
    ['polish','磨光；修改；润色','v.','/ˈpɒlɪʃ/'],
    ['complete','完成','v.','/kəmˈpliːt/'],
  ],
  6: [
    ['heel','鞋跟；足跟','n.','/hiːl/'],
    ['electricity','电；电能','n.','/ɪˌlekˈtrɪsəti/'],
    ['scoop','勺；铲子','n.','/skuːp/'],
    ['style','样式；款式','n.','/staɪl/'],
    ['project','项目；工程','n.','/ˈprɒdʒekt/'],
    ['pleasure','高兴；愉快','n.','/ˈpleʒə(r)/'],
    ['zipper','拉链；拉锁','n.','/ˈzɪpə(r)/'],
    ['daily','每日的；日常的','adj.','/ˈdeɪli/'],
    ['website','网站','n.','/ˈwebsaɪt/'],
    ['pioneer','先锋；先驱','n.','/ˌpaɪəˈnɪə(r)/'],
    ['list','列表；列清单；名单','v. / n.','/lɪst/'],
    ['mention','提到；说到','v.','/ˈmenʃn/'],
    ['by accident','偶然；意外地','短语','/baɪ ˈæksɪdənt/'],
    ['nearly','几乎；差不多','adv.','/ˈnɪəli/'],
    ['boil','煮沸；烧开','v.','/bɔɪl/'],
    ['smell','气味；发出气味；闻到','n. / v.','/smel/'],
    ['saint','圣人；圣徒','n.','/seɪnt/'],
    ['take place','发生；出现','短语','/teɪk pleɪs/'],
    ['doubt','疑惑；疑问；怀疑','n. / v.','/daʊt/'],
    ['without doubt','毫无疑问；的确','短语','/wɪˈðaʊt daʊt/'],
    ['fridge','冰箱','n.','/frɪdʒ/'],
    ['translate','翻译','v.','/trænsˈleɪt/'],
    ['lock','锁上；锁住','v. / n.','/lɒk/'],
    ['earthquake','地震','n.','/ˈɜːθkweɪk/'],
    ['sudden','突然（的）','adj.','/ˈsʌdn/'],
    ['all of a sudden','突然；猛地','短语','/ɔːl əv ə ˈsʌdn/'],
    ['biscuit','饼干','n.','/ˈbɪskɪt/'],
    ['cookie','曲奇饼干','n.','/ˈkʊki/'],
    ['instrument','器械；仪器；工具','n.','/ˈɪnstrəmənt/'],
    ['crispy','脆的；酥脆的','adj.','/ˈkrɪspi/'],
    ['sour','酸的；有酸味的','adj.','/ˈsaʊə(r)/'],
    ['by mistake','错误地；无意中','短语','/baɪ mɪˈsteɪk/'],
    ['customer','顾客；客户','n.','/ˈkʌstəmə(r)/'],
    ['Canadian','加拿大的；加拿大人','adj. / n.','/kəˈneɪdiən/'],
    ['divide','分开；分散','v.','/dɪˈvaɪd/'],
    ['divide … into','把……分开','短语','/dɪˈvaɪd ˈɪntə/'],
    ['purpose','目的；目标','n.','/ˈpɜːpəs/'],
    ['basket','篮；筐','n.','/ˈbɑːskɪt/'],
    ['the Olympics','奥林匹克运动会','n.','/ði əˈlɪmpɪks/'],
    ['look up to','钦佩','短语','/lʊk ʌp tuː/'],
    ['hero','英雄；男主角','n.','/ˈhɪərəʊ/'],
  ],
  7: [
    ['smoke','冒烟；吸烟；烟','v. / n.','/sməʊk/'],
    ['pierce','扎；刺破；穿透','v.','/pɪəs/'],
    ['license','证；证件','n.','/ˈlaɪsns/'],
    ['safety','安全；安全性','n.','/ˈseɪfti/'],
    ['earring','耳环；耳饰','n.','/ˈɪərɪŋ/'],
    ['cry','哭；叫喊','v. / n.','/kraɪ/'],
    ['field','田野；场地','n.','/fiːld/'],
    ['hug','拥抱；搂抱','n. / v.','/hʌɡ/'],
    ['lift','举起；抬高','v.','/lɪft/'],
    ['talk back','回嘴；顶嘴','短语','/tɔːk bæk/'],
    ['awful','很坏的；讨厌的','adj.','/ˈɔːfl/'],
    ['teen','十几岁（十三至十九岁）','n.','/tiːn/'],
    ['regret','感到遗憾；懊悔','v.','/rɪˈɡret/'],
    ['poem','诗；韵文','n.','/ˈpəʊɪm/'],
    ['bedroom','卧室','n.','/ˈbedruːm/'],
    ['community','社区；社团','n.','/kəˈmjuːnəti/'],
    ['keep away from','避免接近；远离','短语','/kiːp əˈweɪ frəm/'],
    ['chance','机会；可能性','n.','/tʃɑːns/'],
    ["make one's own decision",'自己做决定','短语','/meɪk wʌnz əʊn dɪˈsɪʒn/'],
    ['manage','设法做到；应付（困难局面）','v.','/ˈmænɪdʒ/'],
    ['society','社会','n.','/səˈsaɪəti/'],
    ['unit','单位；单元','n.','/ˈjuːnɪt/'],
    ['educate','教育；教导','v.','/ˈedʒukeɪt/'],
    ['get in the way of','挡……的路；妨碍','短语','/ɡet ɪn ðə weɪ əv/'],
    ['professional','职业的；专业的','adj.','/prəˈfeʃənl/'],
    ['enter','进来；进去','v.','/ˈentə(r)/'],
    ['support','支持','v. / n.','/səˈpɔːt/'],
  ],
};

const U8_14_MISSING = {
  8: [
    ['picnic','野餐','n.','/ˈpɪknɪk/'],
    ['policeman','男警察','n.','/pəˈliːsmən/'],
  ],
  9: [
    ['dialogue','对话；对白','n.','/ˈdaɪəlɒɡ/'],
    ['horror','震惊；恐惧','n.','/ˈhɒrə(r)/'],
    ['thriller','惊险电影（小说、戏剧）','n.','/ˈθrɪlə(r)/'],
    ['World War II','第二次世界大战','n.','/ˌwɜːld ˈwɔː tuː/'],
  ],
  10: [
    ['make ... feel at home','使（某人）感到宾至如归','短语','/meɪk fiːl æt həʊm/'],
  ],
  11: [
    ['the more … the more','越……越……','短语','/ðə mɔː ðə mɔː/'],
    ['neither ... nor','既不……也不','短语','/ˈnaɪðə nɔː/'],
  ],
  12: [
    ['give ... a lift','捎（某人）一程','短语','/ɡɪv ə lɪft/'],
    ['boss','老板；领导','n.','/bɒs/'],
    ['course','课程','n.','/kɔːs/'],
  ],
  13: [
    ['cut off','割掉；砍掉','短语','/kʌt ɒf/'],
    ['upside down','颠倒；倒转','短语','/ˌʌpsaɪd ˈdaʊn/'],
  ],
  14: [
    ["keep one's cool",'沉住气；保持冷静','短语','/kiːp wʌnz kuːl/'],
    ['senior high school','高中','n.','/ˈsiːniə haɪ skuːl/'],
    ['none','没有一个；毫无','pron.','/nʌn/'],
  ],
};

function slug(word) {
  return String(word || '')
    .replace(/\(.*?\)/g, '')
    .replace(/[<>:"/\\|?*.…']/g, '')
    .replace(/ /g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 80) || 'word';
}

function makeEntry([word, meaning_cn, usage = 'n.', ipa = '']) {
  const s = slug(word);
  const blankWord = word.includes('…') || word.includes('...') ? word.split(/\s+/)[0] : word;
  return {
    word,
    ipa: ipa || '',
    image_prompts: [
      `A simple educational illustration representing the English word "${word}"`,
      `A classroom-friendly scene that helps remember "${word}"`
    ],
    image_desc_en: `An illustration related to "${word}".`,
    image_desc_cn: `与“${word}”相关的示意图。`,
    meaning_cn,
    usage,
    collocations: word,
    preposition_combos: '',
    examples: [
      { en: `We learned the word "${word}" in today's English class.`, cn: `我们在今天的英语课上学习了单词“${word}”。` },
      { en: `Can you make a sentence with "${word}"?`, cn: `你能用“${word}”造一个句子吗？` }
    ],
    socratic_questions: [
      { question: `这个词“${word}”的中文意思是什么？`, answer_hint: meaning_cn }
    ],
    fill_blank: {
      sentences: [`Please remember the meaning of ___.`],
      options: [blankWord, 'apple', 'happy', 'school'],
      correct_index: 0
    },
    audio: `audio/${s}.mp3`,
    audio_ex0: `audio/${s}_ex0.mp3`,
    audio_ex1: `audio/${s}_ex1.mp3`,
    img1: `images/${s}_1.png`,
    img2: `images/${s}_2.png`
  };
}

function writeUnitJson(unitNum, words) {
  const dir = path.join(G9, `Unit${unitNum}`);
  fs.mkdirSync(path.join(dir, 'images'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'audio'), { recursive: true });
  const data = {
    unit: unitNum,
    source: SOURCE,
    words: words.map(makeEntry)
  };
  const jsonPath = path.join(dir, `Unit${unitNum}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  return data;
}

function syncHtml(unitNum, unitData) {
  const htmlPath = path.join(G9, `Unit${unitNum}`, `Unit${unitNum}.html`);
  const templatePath = path.join(G9, 'Unit8', 'Unit8.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  const marker = 'window.VOCAB_DATA=';
  const idx = html.indexOf(marker);
  if (idx < 0) throw new Error('VOCAB_DATA not found in template');
  let i = idx + marker.length;
  while (i < html.length && /\s/.test(html[i])) i++;
  if (html[i] !== '{') throw new Error('expected {');
  let depth = 0, inStr = false, esc = false;
  const start = i;
  for (; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === '"') { inStr = false; continue; }
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        let after = i + 1;
        while (after < html.length && /\s/.test(html[after])) after++;
        const hasSemi = html[after] === ';';
        const payload = {
          units: [{ unit: unitNum, source: SOURCE, words: unitData.words }]
        };
        const replacement = marker + JSON.stringify(payload) + (hasSemi ? ';' : '');
        html = html.slice(0, idx) + replacement + html.slice(hasSemi ? after + 1 : i + 1);
        fs.writeFileSync(htmlPath, html, 'utf8');
        return;
      }
    }
  }
  throw new Error('unbalanced JSON in template');
}

function appendMissing(unitNum, entries) {
  const jsonPath = path.join(G9, `Unit${unitNum}`, `Unit${unitNum}.json`);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const have = new Set(data.words.map((w) => w.word.toLowerCase()));
  let added = 0;
  for (const e of entries) {
    const key = e[0].toLowerCase();
    // also skip close variants already present
    const variants = [
      key,
      key.replace(/\s*\.\.\.\s*/g, ' … ').trim(),
      key.replace(/…/g, '...'),
      'senior high (school)',
      'senior high school'
    ];
    if ([...have].some((h) => variants.includes(h) || h.includes(key) || key.includes(h))) {
      // special-case none / course / boss exact
      if (!have.has(key) && !['none','boss','course','picnic','policeman','dialogue','horror','thriller'].includes(key) && !key.includes('war') && !key.includes('lift') && !key.includes('cut') && !key.includes('upside') && !key.includes('cool') && !key.includes('feel at home') && !key.includes('more') && !key.includes('neither') && !key.includes('senior')) {
        // continue check
      }
    }
    if (have.has(key)) continue;
    // fuzzy: for phrases with ellipsis, check stem words
    if (key === 'senior high school' && [...have].some((h) => h.includes('senior high'))) continue;
    if (key === "keep one's cool" && [...have].some((h) => h.includes("keep") && h.includes('cool'))) continue;
    data.words.push(makeEntry(e));
    have.add(key);
    added++;
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  syncHtml(unitNum, data);
  return { unit: unitNum, added, total: data.words.length };
}

// Create U1-U7
const created = [];
for (const [num, list] of Object.entries(NEW_UNITS)) {
  const n = Number(num);
  const data = writeUnitJson(n, list);
  syncHtml(n, data);
  created.push({ unit: n, words: data.words.length });
  console.log(`created Unit${n}: ${data.words.length} words`);
}

// Append U8-U14 missing
const appended = [];
for (const [num, list] of Object.entries(U8_14_MISSING)) {
  const r = appendMissing(Number(num), list);
  appended.push(r);
  console.log(`Unit${r.unit}: +${r.added} -> ${r.total}`);
}

fs.writeFileSync(
  path.join(ROOT, '/tmp-g9-complete-summary.json'.replace('/tmp-g9', path.join(ROOT, 'tmp-g9')).replace(path.join(ROOT, 'tmp-g9-complete-summary.json'), path.join('/tmp', 'g9-complete-summary.json'))),
  JSON.stringify({ created, appended, UNIT_TITLES }, null, 2)
);
console.log('done');
