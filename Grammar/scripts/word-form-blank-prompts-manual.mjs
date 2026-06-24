/**
 * 2018–2026 每空精修引导问（五步思维链：读句→词性→考查点→分项确认→综合+[[点击显示]]）
 * 第 1–4 问：只讲结构/词性/变形方向，不泄露词库词与词义；第 5 问点击显示答案线索
 */

/** @type {Record<string, (string|{text:string,reveals?:object[]})[]>} */
export const MANUAL = {
  "2018:1": [
    "读整句：the sky filled with ___ kites in different shapes——儿子看到的天空里有什么？filled with 后接什么来修饰 kites？",
    "kites 是名词，空格在其前面——要修饰 kites，应填什么词性？",
    "确定是形容词后，需从词库找能修饰 kites 的词，并派生出相应的形式——要考虑哪类后缀？",
    "派生时应考虑哪类后缀与拼写规则；与 in different shapes 是否都描写外观？",
    {
      text:
        "综合词义与位置：词库 [[color → colorful（-ful）]]，作定语修饰 kites；朗读 filled with ___ kites in different shapes 是否通顺？",
    },
  ],
  "2018:2": [
    "读整句：they went to a kite shop and ___ a beautiful one——and 连接的两个并列的内容是什么？一个是 went to a kite shop，然后 _______ a beautiful one 怎样了一只风筝？去风筝店后通常会发生什么？",
    "第二个空应是与 went 并列的谓语动词；and 连接两个并列谓语——第二个空的词性是？",
    "确定是动词后，要考虑动词的哪些方面？",
    "分别确认：最合适的词义、动词的时态与语态。",
    {
      text:
        "词库中最合适的是 [[choice → choose：选择]]；主语 they 主动发出动作，为 [[主动语态]]；and 并列要求时态一致，choose 随 went 变为一般过去式 [[chose]]。",
    },
  ],
  "2018:3": [
    "读整句：the son started ___ the kite——start 表「开始做某事」，后常接 doing 还是 to do？",
    "空格在 started 与 the kite 之间，表达「开始……风筝」这一动宾关系——动词需用什么非谓语形式？",
    "确定用 -ing 形式后，词库中哪个动词可接 the kite 作宾语？",
    "start + doing 结构下，动词应如何变形？与 started 的时态是否冲突？",
    {
      text:
        "结构为 [[start + doing]]；词库 [[fly → flying]]；朗读 started ___ the kite 是否即「儿子着手放风筝」？",
    },
  ],
  "2018:4": [
    "读整句：剪线后 the kite began to go ___——剪开线之后，风筝会开始变得如何？此处 go 表「变得……」，结合后文 which made the son much happier 语境判断风筝的变化，哪种变化会让儿子变得开心？",
    "与此同时，go 在此作连系动词，后接 [[形容词]] 表状态变化。",
    "确定为形容词后，要考虑形容词的比较级和最高级，在「变高」和「变得更高」两种描述中，哪种情况会让儿子更开心？",
    "比较级形式是什么？began to go ___ 能否解释儿子当时「更高兴」？",
    {
      text:
        "词库 [[high → higher]]，为 [[比较级]]；与后文 even higher 形成语义递进。",
    },
  ],
  "2018:5": [
    "读整句：They waited for quite some time. ___, it fell onto the grass——第二句评注风筝如何落地，句首应填什么词性？",
    "逗号后 it fell onto the grass 是完整主谓；句首词评注整句，常是什么词性？",
    "确认为句首常用副词评注整句话，接下来我们分析句意：与 waited for quite some time 呼应，这是一个时间提示——表示时间 [[长]]、下落 [[慢]]。",
    "与 waited for quite some time 呼应，应表何种方式落下——最终形式是？",
    {
      text:
        "[[slow → Slowly]]：[[形容词 + -ly → 副词]]；句首需 [[大写 + 逗号]]；表「等了一会儿才慢慢落下」。",
    },
  ],
  "2018:6": [
    "这篇故事的哲理是告诉我们，那些看似是束缚的东西，实际上是一种帮助，而不是真正的限制。所以一根线的作用不是阻碍风筝飞高，……。接下来的表述应该是与前文存在什么样的逻辑关系？——并列、转折、递进？",
    "表示转折的连词都有哪些，我们看到选项进行挑选。",
    "词库中连词能否填入此固定结构？需要变形吗？",
    "stopping 与 helping 语义对照「不是阻止……而是帮助」——是否成立？",
    {
      text:
        "固定结构 [[not … but …]]；填 [[but]] 原形；呼应父亲解释「线的作用」。",
    },
  ],
  "2018:7": [
    "读整句：because the kite ___ can't fly up，不看空格句意为因为风筝不能飞起来，这句话是否存在歧义？这句话主谓完整，这里缺少强调的风筝在没有人控制、没有风的情况下靠自己是飞不起来的，所以我们需要填入一个具备强调功能的词汇。",
    "it / its / 反身代词形式 中，表「靠自身无法飞高」应选哪一类？",
    "词库中该词要变为反身形式——怎么写？",
    "与后文「用线才能帮它往上升」是否形成对比？",
    {
      text:
        "词库 [[it → itself]]，为 [[反身代词]]；强调风筝靠自身飞不高。",
    },
  ],
  "2018:8": [
    "读整句：help the kite go up in the right ___——介词 in 后、形容词 right 后，通常接什么词性？",
    "the right ___ 表「正确的……」——right 已作定语，空格需名词。",
    "根据文章理解通过思维补全：线的作用是帮助风筝控制 [[高低]] 和 [[方向]] 的。",
    "词组中关于高度和方向的词汇有哪些？",
    {
      text:
        "代入后是否通顺并贴合文章内容？词库 [[direct → direction]]；[[形容词 → 名词（-tion）]]；常见固定搭配 [[in the right direction]]。",
    },
  ],
  "2018:9": [
    "读整句：these might be the things that support us ___——其中存在 [[定语从句]] 修饰 [[support]]，句意「[[这些事反而在支撑我们]]」",
    "此句句意完整，但是语气可以进行加强与强调，突出与原本设想相反的中心思想——风筝线作为儿子原本以为是束缚阻碍的作用，但是通过亲身经历得到：风筝线 [[反而]] 是一种帮助风筝飞翔的东西。",
    "根据这样的强调和转折含义，词汇选项中哪个词具有这一作用？需要变形吗？",
    "与全文寓意「看似阻碍我们的事物其实在帮助我们」是否呼应？",
    {
      text:
        "填 [[instead]] 原形；[[副词原位]]；表「反而、却」。",
    },
  ],
  "2018:10": [
    "读整句：realizing the ___ of these things——the 与 of these things 之间应填什么词性？",
    "句意「认识到这些事物的……」此处根据思维逻辑应该填入什么词义？",
    "确定词义后，important 这个形容词如何变名词？",
    "代入后是否点明全文寓意：理解那些「束缚」的意义？",
    {
      text:
        "词库 [[important → importance]]；[[形容词 → 名词（-ance）]]。",
    },
  ],
  "2019:1": [
    "读整句：Let's have a look at what we laugh at in ___——文章开头设问：英式幽默是否与众不同？先要弄清我们「在哪里」笑什么。in 后面通常接什么？",
    "此处要填的是「地点、国家」这类名词，而不是形容词——空格应是什么词性？",
    "前句刚出现 we British people，与「英国本土」对应；词库中与「英国的」同源的词，不能再作形容词，应变成什么？",
    "确定是国名后，书写上需注意什么？代入 in ___，与后文 To us British people 是否同一话题？",
    {
      text:
        "词库 [[British → Britain]]；[[形容词 → 国名名词]]；[[首字母大写]]；what we laugh at in Britain。",
    },
  ],
  "2019:2": [
    "读整句：To us British people, ___ and important people often cause laughter——英国人常拿两类人开玩笑。and 把两个成分连在一起，共同放在 people 前面。",
    "important 已是形容词，与其 and 并列、共同修饰 people 的成分——应是什么词性？",
    "结合后文「It's not just politicians who make us laugh...」，[[Politicians]] 的意思是 [[政治家]]，这类人往往有 [[权力]]。",
    "确定是和权力相关联的形容词后，词库里对应的词汇是 [[power]]。",
    {
      text:
        "名词 [[power]] 派生形容词常加 [[-ful]]：[[power → powerful]]；与 important 并列修饰 people。",
    },
  ],
  "2019:3": [
    "读整句：anyone whose job is to tell other people what to do and who takes ___ too seriously——不限于政客，凡爱下令的人，往往把什么看得太重？",
    "takes 后面缺宾语；主语 anyone 与宾语指同一个人——动作回到主语自身，这类宾语通常用什么代词？",
    "it、宾格代词、还是 [[反身代词]]——take ___ too seriously 应选哪一类？",
    "确定类型后，词库中的人称代词应如何书写？能否构成 take oneself seriously 这类结构？",
    {
      text:
        "词库 [[they → themselves]]；[[反身代词]]；固定搭配 [[take oneself seriously]]。",
    },
  ],
  "2019:4": [
    "读整句：We laugh at the power, but also, pitifully, at anyone who is treated ___——上文笑「权力」，这里却带怜悯地笑「被怎样对待」的人。",
    "is treated ___ 中，treated 是过去分词，说明「被怎样对待」——修饰它的词应是副词还是形容词？",
    "结合 pitifully 的怜悯语气：这些人往往被 [[不公平地]] 对待——空格应表达「对待的方式」。",
    "词库里表「好坏」的是形容词，修饰 treated 时应如何变为副词？",
    {
      text:
        "词库 [[bad → badly]]；[[形容词 → 副词（-ly）]]；修饰过去分词 [[treated]]。",
    },
  ],
  "2019:5": [
    "读整句：We know they cannot win, but if they do win sometimes, it's even ___——他们多半输，偶尔赢一次，结果反而更怎样？",
    "even 后面常接比较级，表示「甚至更……」——空格应填原级、比较级还是最高级？",
    "语义上要「更……」一层，需比较级；词库中形容词由原级变比较级，拼写上应注意什么？",
    "even ___ 与 cannot win 形成反差，是否贴合英国人「笑输家」的幽默？",
    {
      text:
        "词库 [[fun → funnier]]；[[比较级]]；[[even + 比较级]]。",
    },
  ],
  "2019:6": [
    "读整句：...clever people doing clever things—and ___ at last——对比英美小丑：英国是 silly people doing silly things，美国是 clever people doing clever things，and 后面缺什么？",
    "doing 是 -ing 形式，and 连接的成分应与 doing [[并列]]——此处需要动词的非谓语哪种形式？",
    "at last 表「最终……」：聪明人一番折腾之后，最后发生什么？（动词义方向）",
    "该动词与 doing 并列时，应如何变形？___ at last 朗读是否通顺？",
    {
      text:
        "词库 [[win → winning]]；[[-ing 形式]]；与 [[doing]] 并列；winning at last。",
    },
  ],
  "2019:7": [
    "读整句：The fact that we laugh when other people might feel ___ is one of the strangest things——本段核心：irony（反讽）。别人可能很难受，英国人却笑。",
    "feel 后面说明内心「感受」——应接什么词性？",
    "别人处境不妙时，内心常感到[[绝望]]——形容词应表达怎样的感受？",
    "词库中有一个名词，加否定后缀可表「没有希望的」——常用哪类后缀？",
    {
      text:
        "词库 [[hope → hopeless（-less）]]；[[名词 → 否定形容词（-less）]]；与 irony 呼应。",
    },
  ],
  "2019:8": [
    "读整句：After some terrible experience, we might say, \"Not very ___.\"——经历 terrible，嘴上却说 not very ___，形成反讽。",
    "Not very 后接什么词性？表面轻描淡写，实际在说什么？",
    "思维补全：字面「不太[[顺心]]」，实则糟透了——词库名词需变为何种形容词？",
    "代入 Not very ___ 朗读，能否听出 understatement（轻描淡写）的反讽？",
    {
      text:
        "词库 [[pleasure → pleasant]]；[[名词 → 形容词]]；反讽：Not very pleasant。",
    },
  ],
  "2019:9": [
    "读整句：\"There is a tiny problem,\" when something has gone ___ wrong——与说 typhoon 时 a bit windy 同类：小事说成 tiny，实则很严重。",
    "gone 作系动词，___ 修饰形容词 wrong——应填什么词性？",
    "真实情况是「[[彻底]]」搞砸——应用副词加强 wrong 的程度，形容词如何变副词？",
    "gone ___ wrong 与 tiny problem 一对照，反讽是否成立？",
    {
      text:
        "词库 [[total → totally]]；[[形容词 → 副词（-ly）]]；[[gone totally wrong]]。",
    },
  ],
  "2019:10": [
    "读整句：Another thing that can make it difficult ___ British humor is that we don't always laugh——另一难点：讲笑话时不笑、板着脸（keep a straight face）。",
    "make it difficult ___ British humor 中，difficult 后要能接「做某事」——应接不定式还是 -ing？",
    "确定用不定式后，to 后面动词应是什么形式？it 指「理解英式幽默」这件事。",
    "词汇选项中，哪个动词可填入 to ___ British humor？代入是否通顺？",
    {
      text:
        "结构 [[make it + adj + to do]]；词库 [[understand → to understand]]；difficult to understand British humor。",
    },
  ],
  "2020:1": [
    "读整句：All that was holding them back was a small piece of rope—it was just ___ to one of their legs——男人惊讶：大象没有笼子、没有锁链，只有一根细绳拴在腿上。绳子与腿之间是什么关系？",
    "主语是 rope（绳子），承受「被拴住」的动作；全文叙述过去——应用什么语态、什么时态？",
    "思维补全：细绳被 [[拴]] 在一条腿上——被动结构中，动词应如何变形？",
    "was ___ to one of their legs 朗读是否即「被拴在……腿上」？与后文 break the rope 是否衔接？",
    {
      text:
        "词库 [[tie → tied]]；[[一般过去时被动]]；[[be + 过去分词]]；be tied to。",
    },
  ],
  "2020:2": [
    "读整句：Why didn't the elephants just use their power to break the rope? Wanting to know the ___——男人不解，他「想知道……」才去追问驯兽师。",
    "the 后面、he asked a trainer 之前——空格应填名词，表示「真相、实情」。",
    "句意是「想知道[[真相]]」——词库里表「真实的」的词，此处不能再作形容词，应变成什么？",
    "形容词变名词表「真相」，常去 e 加哪类后缀？代入 know the ___ 是否通顺？",
    {
      text:
        "词库 [[true → truth]]；[[形容词 → 名词（-th）]]；Wanting to know the truth。",
    },
  ],
  "2020:3": [
    "读整句：When they were very young... at that age, it was enough ___ them——驯兽师解释：小象时就用同样粗的绳，那时「足以……它们」。",
    "enough 后常接不定式，表「足够做某事」——应接 to + 动词原形，还是 -ing？",
    "幼年时，细绳足以[[拴住]]小象——动词应填什么结构？",
    "enough ___ them 与后文 still believed they couldn't break away 是否形成因果？",
    {
      text:
        "结构 [[enough + to do]]；词库 [[hold → to hold]]；enough to hold them。",
    },
  ],
  "2020:4": [
    "读整句：Even now, they believe the rope can still control them, so they have the ___ courage to try——长大后的象仍怕绳子，因此 ______ 勇气去挣脱。",
    "the 与 courage 之间，修饰名词 courage——应填什么词性？",
    "几乎[[没有]]勇气去尝试——词库中哪个形容词可表达这一程度？",
    "该词修饰 courage 时，是否需要变形？与 believe the rope can still control them 逻辑是否一致？",
    {
      text:
        "词库 [[little → little]]；[[形容词原级]]；little courage to try。",
    },
  ],
  "2020:5": [
    "读整句：The trainer answered. The man was ___——驯兽师说完：大象其实随时能挣脱，只因长期相信绳子仍有效。听者是什么反应？",
    "was 后接形容词，描述男人当时的状态——需要什么词性？",
    "震惊到一时[[说不出话]]——词库里表「说话、言语」的名词，如何派生这类形容词？",
    "否定后缀 -less 常表「没有……的」——派生后代入 was ___ 是否通顺？",
    {
      text:
        "词库 [[speech → speechless（-less）]]；[[名词 → 否定形容词]]。",
    },
  ],
  "2020:6": [
    "读整句：These animals were able to break away... but it was only because over time, they believed that it was just ___——其实能挣脱，却长期以为只是……",
    "信念内容是「根本不可能做到」——空格词义应取肯定还是否定？",
    "挣脱绳子在他们心中是[[不可能]]的——词库中表「可能的」的词，如何变成反义？",
    "加否定前缀后拼写是什么？代入 believed it was just ___ 是否贴合语境？",
    {
      text:
        "词库 [[possible → impossible]]；[[否定前缀 im-]]。",
    },
  ],
  "2020:7": [
    "读整句：How many of us go through life like the elephants—believing that it was beyond our ___ to do something——哲理段：多少人只因曾经失败，就觉得做事超出……",
    "beyond our ___ 表「超出我们的……」——空格应是名词，且常与复数连用。",
    "超出我们的[[能力]]——词库里表「能够的」的形容词，如何名词化？",
    "名词化后表「能力」常用复数——形式是什么？beyond our ___ 是否即「超出能力范围」？",
    {
      text:
        "词库 [[able → abilities]]；[[形容词 → 名词复数（-ity→-ities）]]；beyond our abilities。",
    },
  ],
  "2020:8": [
    "读整句：Failure is part of ___——作者由象喻转向说理：失败是……的一部分。",
    "part of 后接名词性成分——of 后应填什么词性？",
    "失败是[[学习]]过程的一部分——词库里表「学习」的动词，如何变为名词性形式？",
    "动名词 -ing 能否作 part of 的宾语？Failure is part of ___ 朗读是否通顺？",
    {
      text:
        "词库 [[learn → learning]]；[[动名词]]；Failure is part of learning。",
    },
  ],
  "2020:9": [
    "读整句：Failure in the past doesn't mean we can never ___ in the future——过去失败，不等于未来永远不能……",
    "can never 后接动词——应填什么形式？",
    "语义上：未来仍能[[成功]]——词库里表「成功」的名词，如何转为动词填入空格？",
    "代入 can never ___ in the future，与后文 keep on trying 是否呼应？",
    {
      text:
        "词库 [[success → succeed]]；[[名词 → 动词原形]]；can never succeed。",
    },
  ],
  "2020:10": [
    "读整句：We should keep on trying with confidence in ___ even after we have experienced failures——即使经历失败，仍要带着信心继续尝试。",
    "confidence in ___ 中，介词 in 后接代词；主语是 we，信心回到「我们自己」——需什么类型的代词？",
    "「对[[我们自己]]有信心」——词库中的人称代词应如何变形？",
    "confidence in ___ 与 even after failures 连用，朗读是否表「失败后仍自信」？",
    {
      text:
        "词库 [[we → ourselves]]；[[反身代词]]；confidence in ourselves。",
    },
  ],
  "2021:1": [
    "读整句：he studied ___ Qian Zhongshu——studied 后接介词短语，表「在……之下学习」",
    "空格为介词，后接人名——词库中该词作介词",
    "介词需要变形吗？",
    "studied under 是否为常见搭配？",
    {
      text:
        "词库 [[under → under]]；[[介词原位]]；studied under sb. 表师从。",
    },
  ],
  "2021:2": [
    "读整句：went to the University of Paris for ___ study——for 后接名词，修饰 study",
    "for ___ study 需何种等级——词库中该词需比较级",
    "词库中该词的比较级（抽象义「进一步」）是？",
    "for ___ study 是否表「为了深造」？",
    {
      text:
        "词库 [[far → further]]；[[比较级]]；for further study 表深造。",
    },
  ],
  "2021:3": [
    "读整句：Xu has translated about 120 works, ___ The Book of Songs——逗号后列举作品，前无连词",
    "逗号后列举作品——词库中该词如何变形？",
    "including 后接名词列举，是否等于「包括……」？",
    "与 about 120 works 是否衔接？",
    {
      text:
        "词库 [[include → including]]；[[介词/分词 including]]；列举作品。",
    },
  ],
  "2021:4": [
    "读整句：with a ___ focus on poetry——a 后、名词 focus 前，修饰 focus",
    "修饰 focus——词库中该词已是形容词",
    "special focus 是否需要变形？",
    "代入是否通顺？",
    {
      text:
        "词库 [[special → special]]；[[形容词原级]]；a special focus on。",
    },
  ],
  "2021:5": [
    "读整句：the only person in China who has ___ translated poetry——has 后、过去分词 translated 前，修饰动词",
    "修饰 translated——词库中该词需变副词",
    "词库词 → 目标形式（-fully）——形式是？",
    "has ___ translated 是否表「已成功翻译」？",
    {
      text:
        "词库 [[succeed → successfully]]；[[动词 → 副词（-fully）]]。",
    },
  ],
  "2021:6": [
    "读整句：His ___ are often chosen as textbooks——主语是 His ___，谓语 are 提示复数",
    "work 作「著作、作品」可数时需复数——形式是？",
    "His ___ are 主谓一致是否要求复数？",
    "代入 His ___ are often chosen as textbooks，是否指许渊冲的译作？",
    {
      text:
        "词库 [[work → works]]；[[可数名词复数]]；指译作。",
    },
  ],
  "2021:7": [
    "读整句：Xu pays much attention to the ___ of image, sound and form——the 与 of 之间需名词",
    "beautiful 是形容词，此处要「美、美感」——名词形式是？",
    "beauty 与 image, sound, form 并列是否成立？",
    "the ___ of image, sound and form 是否表许渊冲注重「音美、形美」？",
    {
      text:
        "词库 [[beautiful → beauty]]；[[形容词 → 名词（-y）]]；the beauty of。",
    },
  ],
  "2021:8": [
    "读整句：he has been at the center of many ___ debates——many 后接名词，debates 前需形容词修饰",
    "修饰 debates——词库中该词如何派生形容词？",
    "词库词 → 目标形式（-ed）是否表「激烈的」？",
    "many ___ debates 是否通顺？",
    {
      text:
        "词库 [[heat → heated]]；[[名词 → 形容词（-ed）]]；heated debates 激烈辩论。",
    },
  ],
  "2021:9": [
    "读整句：I am not afraid of ___——介词 of 后接动名词",
    "afraid of 后动词用 -ing；词库中该词如何变形？",
    "not afraid of arguing 是否表「不怕争论」？",
    "与后文 the truth becomes clearer with each debate 是否呼应？",
    {
      text:
        "词库 [[argue → arguing]]；[[介词后 -ing]]；afraid of doing。",
    },
  ],
  "2021:10": [
    "读整句：Never let it rest until your good is better and your better is ___——good, better, ___ 递进",
    "三者构成原级、比较级、最高级——词库中该词的最高级是？",
    "your better is ___ 是否表「最好还要更好」？",
    "Never let it rest until… 名言结构是否要求最高级收尾？",
    {
      text:
        "词库 [[good → best]]；[[最高级（不规则）]]；good, better, best。",
    },
  ],
  "2022:1": [
    "读整句：The audience suddenly became ___——became 后接形容词表状态「变得……」",
    "became 后表状态变化——该词在词库中词性是名词",
    "词库词 → 目标形式 如何派生形容词？",
    "became ___ 是否表「全场鸦雀无声」？",
    {
      text:
        "词库 [[silence → silent]]；[[名词 → 形容词]]；became silent。",
    },
  ],
  "2022:2": [
    "读整句：Niu ___ heard someone next to the stage——修饰动词 heard，表「清晰地」",
    "该词在词库中词性是形容词，修饰 heard 需副词——怎么变？",
    "clearly heard 是否表「清楚地听到」？",
    "与 audience suddenly became silent 形成对比——她仍能听到赞叹？",
    {
      text:
        "词库 [[clear → clearly]]；[[形容词 → 副词（-ly）]]。",
    },
  ],
  "2022:3": [
    "读整句：When Niu was only 11, she ___ lost her right leg——句首评注整件事，表「不幸地」",
    "该词在词库中词性是名词，需变副词且语义取反「不幸」——怎么构成？",
    "un- + luckily → unluckily 是否表「不幸地」？",
    "与后文 Wenchuan Earthquake 语境是否一致？",
    {
      text:
        "词库 [[luck → unluckily]]；[[un- + 名词派生副词]]。",
    },
  ],
  "2022:4": [
    "读整句：I ___ by something they said——主语 I 承受「被……触动」，无 by 施动者但表被动感受",
    "叙述过去，需一般过去时被动；词库中该词的过去分词是？",
    "was ___ by 是否表「被……所触动」？",
    "与 prejudice against the disabled 话题是否衔接？",
    {
      text:
        "词库 [[touch → was touched]]；[[一般过去时被动]]；I was touched by。",
    },
  ],
  "2022:5": [
    "读整句：sports were for people with ___ legs——with 后接形容词修饰 legs",
    "修饰 legs——词库中该词如何变形容词？",
    "词库词 → 目标形式（-y）是否表「健康的」？",
    "与 even though I have lost a leg 是否形成对照？",
    {
      text:
        "词库 [[health → healthy]]；[[名词 → 形容词（-y）]]；healthy legs。",
    },
  ],
  "2022:6": [
    "读整句：Niu first drew attention when she ___ a marathon——叙述过去，谓语需过去时",
    "词库中该词作谓语——过去式是？",
    "when she ___ a marathon 是否表「跑完马拉松」？",
    "与 mark the tenth anniversary 是否为同一事件背景？",
    {
      text:
        "词库 [[complete → completed]]；[[一般过去时]]。",
    },
  ],
  "2022:7": [
    "读整句：to mark the ___ anniversary of the earthquake——序数词修饰 anniversary，表「第十个」",
    "该词在词库中词性是基数词，变序数词是？",
    "the ___ anniversary 是否表「十周年」？",
    "2018 年汶川马拉松纪念地震——序数词是否修饰 anniversary？",
    {
      text:
        "词库 [[ten → tenth]]；[[基数词 → 序数词]]。",
    },
  ],
  "2022:8": [
    "读整句：has more than 850,000 ___ on social platforms——数量后接名词，指社交平台上的「粉丝」",
    "词库中该词需名词复数——形式是？",
    "850,000 ___ 是否表「粉丝数」？",
    "与 photographer、social platforms 语境是否一致？",
    {
      text:
        "词库 [[follow → followers]]；[[动词 → 名词复数（-er）]]。",
    },
  ],
  "2022:9": [
    "读整句：allow them to ___ understand our group——修饰动词 understand，表「更好地」",
    "词库中该词的比较级是？",
    "___ understand 是否表「更好地理解」？",
    "与 bridge the disabled and the public 目的是否一致？",
    {
      text:
        "词库 [[well → better]]；[[副词比较级（不规则）]]。",
    },
  ],
  "2022:10": [
    "读整句：they can still ___ in our increasingly tolerant society——情态动词 can 后动词用什么形式？",
    "——can still ___ 是否表「仍能闪耀」？",
    "需要变形吗？",
    "increasingly tolerant society 下，disabled people can still ___ 是否积极收束？",
    {
      text:
        "词库 [[shine → shine]]；[[情态动词后动词原形]]；can still shine。",
    },
  ],
  "2023:1": [
    "读整句：this could only happen in some ___ stories——some 后接名词，stories 前需所有格或定语",
    "stories 前需所有格——词库中该词需复数所有格——形式是？",
    "children's stories 是否为常见表达？",
    "与 plants shout 童话式开头是否形成反差？",
    {
      text:
        "词库 [[child → children's]]；[[不规则复数 + 's 所有格]]。",
    },
  ],
  "2023:2": [
    "读整句：plants are not always ___——系动词 are 后接形容词",
    "与后文 shout 相对，植物并非总是——词库中该词如何变形容词？",
    "not always ___ 是否表「并非总是安静的」？",
    "与后文 plants shout when stressed 是否对比？",
    {
      text:
        "词库 [[silence → silent]]；[[名词 → 形容词]]。",
    },
  ],
  "2023:3": [
    "读整句：there are ___ some sounds that carry information——修饰整句/谓语，表「实际上」",
    "该词在词库中词性是形容词，句中需副词——怎么变？",
    "actually 是否表「实际上有一些声音」？",
    "Even in a quiet field 与 shout 是否形成反差？",
    {
      text:
        "词库 [[actual → actually]]；[[形容词 → 副词（-ly）]]。",
    },
  ],
  "2023:4": [
    "读整句：the pitch is too high for people ___——too … for sb. to do 结构",
    "for people 后接不定式——词库中该词前加 to",
    "too high for people to hear 是否完整？",
    "pitch is too high 与 people 无法听见是否因果成立？",
    {
      text:
        "结构 [[too … for sb. to do]]；词库 [[hear → to hear]]。",
    },
  ],
  "2023:5": [
    "读整句：stressed plants send out ___ sounds than unstressed plants——than 提示比较级",
    "词库中该词的比较级是？",
    "___ sounds than 是否表「比……更多的声音」？",
    "stressed vs unstressed plants 比较是否成立？",
    {
      text:
        "词库 [[many → more]]；[[比较级（不规则）]]；more … than。",
    },
  ],
  "2023:6": [
    "读整句：They also trained a machine ___ the differences——train sb./sth. to do 结构",
    "machine 后接不定式表目的——词库中该词如何变形？",
    "trained a machine to tell 是否通顺？",
    "区分 thirsty plants and cut plants——不定式表「识别差异」？",
    {
      text:
        "结构 [[train … to do]]；词库 [[tell → to tell]]。",
    },
  ],
  "2023:7": [
    "读整句：when the causes of stress change, they shout ___——修饰动词 shout，表「不同地」",
    "该词在词库中词性是名词，需变副词——形式是？",
    "shout ___ 是否表「喊叫声不同」？",
    "when causes of stress change 与 shout ___ 是否逻辑一致？",
    {
      text:
        "词库 [[difference → differently]]；[[名词 → 副词（-ently）]]。",
    },
  ],
  "2023:8": [
    "读整句：There is a ___ that a lot of communication is happening——a 后接可数名词",
    "a 后接可数名词，表可能性——词库中该词已是名词",
    "There is a chance that 是否为固定句型？需要变形吗？",
    "other plants can hear the call——a chance that 引出可能性？",
    {
      text:
        "词库 [[chance → chance]]；[[名词原形]]；a chance that。",
    },
  ],
  "2023:9": [
    "读整句：Sound recordings could bring humans lots of ___——lots of 后接可数名词复数",
    "词库中该词变复数是？",
    "lots of ___ 是否表「诸多好处」？",
    "especially in farming 是否说明录音技术的用途？",
    {
      text:
        "词库 [[advantage → advantages]]；[[可数名词复数]]。",
    },
  ],
  "2023:10": [
    "读整句：without much ___——much 后接不可数名词，表「without much difficulty」",
    "difficult 是形容词，此处需名词「困难」——形式是？",
    "without much ___ 是否表「毫不费力」？",
    "whether corn is getting enough water——without much ___ 表检测更省力？",
    {
      text:
        "词库 [[difficult → difficulty]]；[[形容词 → 名词（-y）]]。",
    },
  ],
  "2024:1": [
    "读整句：He is ___ regarded as one of the greatest writers——修饰过去分词 regarded，表「被广泛地」",
    "该词在词库中词性是形容词，修饰 regarded 需副词——怎么变？",
    "is ___ regarded 是否表「被广泛认为」？",
    "one of the greatest writers in history——广泛认可用副词修饰 regarded？",
    {
      text:
        "词库 [[wide → widely]]；[[形容词 → 副词（-ly）]]。",
    },
  ],
  "2024:2": [
    "读整句：too old-fashioned and difficult ___——形容词 difficult 后接不定式表「难以做某事」",
    "difficult to follow 结构——词库中该词前加 to",
    "difficult to follow 是否表「难以听懂/追随」？",
    "his language is too old-fashioned——difficult ___ 说明难以理解？",
    {
      text:
        "结构 [[adj + to do]]；词库 [[follow → to follow]]。",
    },
  ],
  "2024:3": [
    "读整句：This has ___ to a discussion——现在完成时 has 后接过去分词，lead to 表「导致」",
    "词库中该词的过去分词是？",
    "has ___ to a discussion 是否表「引发了讨论」？",
    "To update or not to update——has ___ to a discussion 表引发讨论？",
    {
      text:
        "词库 [[lead → led]]；[[现在完成时 + 不规则过去分词]]；lead to。",
    },
  ],
  "2024:4": [
    "读整句：So many ___ modern writers have rewritten——many 后、名词 writers 前，需形容词",
    "修饰 writers，应填形容词——词库中该词如何派生？",
    "词库词 → 目标形式（-ed）是否通顺？",
    "rewritten Shakespeare's plays——___ modern writers 修饰作家资质？",
    {
      text:
        "词库 [[talent → talented]]；[[名词 → 形容词（-ed）]]。",
    },
  ],
  "2024:5": [
    "读整句：This makes ___ clearer for today's audiences——makes 后接宾语，指代 plays",
    "作宾语应用 they 的宾格——形式是？",
    "makes ___ clearer 是否表「使它们更清晰」？",
    "指代 plays，makes ___ clearer 宾格是否正确？",
    {
      text:
        "词库 [[they → them]]；[[人称代词宾格]]；作 makes 的宾语。",
    },
  ],
  "2024:6": [
    "读整句：audiences would still get as much ___ from the plays——much 后接不可数名词",
    "动词需转为名词——形式是？",
    "as much ___ 是否表「同样多的乐趣」？",
    "as much ___ from the plays 与 pleasure 不可数是否一致？",
    {
      text:
        "词库 [[please → pleasure]]；[[动词 → 名词]]。",
    },
  ],
  "2024:7": [
    "读整句：Some people ___——与前文赞成更新相对，表「不同意」",
    "词库中该词 加否定前缀 dis-——形式是？",
    "Some people ___ 是否引出反对观点？",
    "后文 They think Shakespeare's works are beautiful——与前文观点对立？",
    {
      text:
        "词库 [[agree → disagree]]；[[否定前缀 dis-]]。",
    },
  ],
  "2024:8": [
    "读整句：the plays are still being ___ today——现在进行被动 being 后接过去分词",
    "词库中该词的过去分词是？",
    "still being ___ 是否表「仍在上演」？",
    "still being ___ today 与 timeless 是否呼应？",
    {
      text:
        "词库 [[perform → performed]]；[[现在进行被动 be being + 过去分词]]。",
    },
  ],
  "2024:9": [
    "读整句：His works tell us what it ___ to be human——what it ___ to be human 固定结构",
    "it 作形式主语，___ 处需名词——词库中该词的复数形式是？",
    "what it means to be human 是否表「生而为人意味着什么」？",
    "tell us what it ___ to be human——固定句型缺名词 means？",
    {
      text:
        "词库 [[mean → means]]；[[名词复数（手段/意义）]]；what it means to。",
    },
  ],
  "2024:10": [
    "读整句：Topics such as love … last through the ___——through the 后接名词复数，表「历经各个时代」",
    "词库中该词作可数名词，复数是？",
    "through the ___ 是否表「历经世代」？",
    "love, kindness and friendship last through the ___——时代复数？",
    {
      text:
        "词库 [[age → ages]]；[[可数名词复数]]。",
    },
  ],
  "2025:1": [
    "读整句：It was a ___ place on the Southern Silk Road——was 后接形容词作表语",
    "描述 place，应填形容词——词库中该词已是形容词",
    "a ___ place 是否需要变形？",
    "Southern Silk Road and Tea Horse Road——繁忙商道描述是否贴切？",
    {
      text:
        "词库 [[busy → busy]]；[[形容词原级]]；a busy place。",
    },
  ],
  "2025:2": [
    "读整句：it followed the ___ of \"repairing the old as old\"——the 后接名词",
    "the 后接名词——词库中该词已是名词",
    "the ___ of 是否需要变形？",
    "repairing the old as old——修复原则 the ___ of 是否通顺？",
    {
      text:
        "词库 [[rule → rule]]；[[名词原形]]；the rule of。",
    },
  ],
  "2025:3": [
    "读整句：improved tourism infrastructure ___ unforgettable experiences——infrastructure 后接不定式表目的",
    "improved … ___ to offer 结构——词库中该词如何变形？",
    "to offer experiences 是否表「以提供体验」？",
    "improved infrastructure 与 to offer experiences 目的关系？",
    {
      text:
        "词库 [[offer → to offer]]；[[不定式表目的]]。",
    },
  ],
  "2025:4": [
    "读整句：which has ___ benefited homestay business——修饰动词 benefited，表「直接地」",
    "词库中该词变副词——形式是？",
    "has ___ benefited 是否表「直接惠及」？",
    "changed the village's appearance——has ___ benefited 表直接惠及民宿？",
    {
      text:
        "词库 [[direct → directly]]；[[形容词 → 副词（-ly）]]。",
    },
  ],
  "2025:5": [
    "读整句：Chen Xiaoyu ___ a homestay for several years——for several years 提示完成时",
    "词库中该词作谓语，现在完成时形式是？",
    "___ a homestay for several years 是否表「经营民宿好几年了」？",
    "for several years 与现在完成时是否匹配？",
    {
      text:
        "词库 [[run → has run]]；[[现在完成时]]；for several years 作时间状语。",
    },
  ],
  "2025:6": [
    "读整句：She said she never ___ that she could make so much money——叙述过去「从未料到」",
    "词库中该词的过去式是？",
    "never ___ that 是否表「从未想到」？",
    "make so much money in her hometown——从未料到用过去时？",
    {
      text:
        "词库 [[expect → expected]]；[[一般过去时]]。",
    },
  ],
  "2025:7": [
    "读整句：villagers working ___ back home——working 后接副词，表「在外地」",
    "词库中该词可作副词——需要变形吗？",
    "working ___ back home 是否表「在外务工的人返乡」？",
    "villagers working ___ back home——在外务工者返乡创业？",
    {
      text:
        "词库 [[outside → outside]]；[[副词原位]]。",
    },
  ],
  "2025:8": [
    "读整句：opened a restaurant … ___ learning about its changes——表时间「在了解到变化之后」",
    "词库中该词作介词——需要变形吗？",
    "___ learning about 是否表「之后」？",
    "learning about its changes 之后开店——after 介词结构？",
    {
      text:
        "词库 [[after → after]]；[[介词原位]]；after doing。",
    },
  ],
  "2025:9": [
    "读整句：Many tourists come to dress ___ in traditional clothes——dress 后接反身代词表「给自己穿衣」",
    "主语 tourists 对应 they 的反身形式是？",
    "dress ___ in 是否表「穿上传统服饰」？",
    "dress in traditional clothes——反身代词与 tourists 一致？",
    {
      text:
        "词库 [[they → themselves]]；[[反身代词]]；dress themselves in。",
    },
  ],
  "2025:10": [
    "读整句：People from different cities even ___ this small village to live in——even 后谓语，叙述一般事实",
    "词库中该词作谓语——此处用动词什么形式？",
    "even ___ this village 是否表「甚至选择来这个村居住」？",
    "choose this village to live in——一般现在叙述现状？",
    {
      text:
        "词库 [[choose → choose]]；[[动词原形/一般现在时]]；表选择定居。",
    },
  ],
  "2026:61": [
    "读整句：would guard him after his ___——介词 after 后接名词，表「在他……之后」",
    "after his 后接名词——词库中该词需变名词",
    "词库词 → 目标形式（-th）是否表「死亡」？",
    "after his ___ 是否通顺？",
    {
      text:
        "词库 [[die → death]]；[[动词 → 名词（-th）]]；after his death。",
    },
  ],
  "2026:62": [
    "读整句：they ___ not always this color——叙述过去与现在对比，but 后说「并非一直是这颜色」",
    "主语 they，过去时系动词形式是？",
    "they ___ not always 是否表「它们并非一直是这样」？",
    "Today … are light brown, but they ___ not always——过去与现在对比？",
    {
      text:
        "词库 [[be → were]]；[[一般过去时（主系表）]]；与现在 are 对比。",
    },
  ],
  "2026:63": [
    "读整句：___, most of the colors did not last——句首评注「突然之间」",
    "该词在词库中词性是形容词，句首需副词——怎么变？书写格式？",
    "Suddenly 加逗号是否表「然而多数颜色未能保留」？",
    "colors did not last to the present day——句首 Suddenly 评注转折？",
    {
      text:
        "词库 [[sudden → Suddenly]]；[[形容词 → 副词 + 句首大写逗号]]。",
    },
  ],
  "2026:64": [
    "读整句：Before their ___——their 后接名词，指兵马俑「被发现」这件事",
    "词库中该词需变名词——形式是？",
    "Before their ___ 是否表「在被发现之前」？",
    "protected by being underground——Before their ___ 指发现之前？",
    {
      text:
        "词库 [[discover → discovery]]；[[动词 → 名词（-y）]]。",
    },
  ],
  "2026:65": [
    "读整句：The paint disappeared in ___ time than it takes to boil an egg——than 提示比较级",
    "词库中该词的比较级——形式是？",
    "in ___ time than 是否表「比煮鸡蛋还短的时间」？",
    "disappeared in … time than boiling an egg——时间短于比较？",
    {
      text:
        "词库 [[little → less]]；[[比较级（不规则）]]；less time than。",
    },
  ],
  "2026:66": [
    "读整句：protect the ___ true colors——true colors 前需物主代词修饰",
    "true colors 前需物主代词——词库中该词的形容词性物主代词是？",
    "___ true colors 是否表「它们的真实颜色」？",
    "New technology protects ___ true colors——物主代词指士兵？",
    {
      text:
        "词库 [[they → their]]；[[形容词性物主代词]]；their true colors。",
    },
  ],
  "2026:67": [
    "读整句：Many of these still have ___ painted features——仍保留着黑发、粉面等彩绘，语气带惋惜",
    "修饰「仍有彩绘」这一事实，需副词评注该事实——词库中该词如何变副词？",
    "该副词能否传达「多数色彩已失，但这些仍残留彩绘」的惋惜？",
    "代入朗读是否通顺？",
    {
      text:
        "词库 [[sad → sadly]]；[[形容词 → 副词（-ly）]]；评注「仍保留彩绘特征」。",
    },
  ],
  "2026:68": [
    "读整句：make sure that the colors will ___——情态动词 will 后接动词原形",
    "词库中该词作谓语——will ___ 是否表「将得以保留」？",
    "需要变形吗？",
    "developed a special material——colors will ___ 表得以保留？",
    {
      text:
        "词库 [[keep → keep]]；[[will + 动词原形]]。",
    },
  ],
  "2026:69": [
    "读整句：consider it important not ___ the dirt——consider it + adj + not to do 结构",
    "important not 后接不定式否定——词库中该词如何变形？",
    "not to touch 是否表「不去触碰泥土」？",
    "so the colors won't be lost——not ___ the dirt 否定不定式？",
    {
      text:
        "结构 [[consider it + adj + not to do]]；词库 [[touch → to touch]]。",
    },
  ],
  "2026:70": [
    "读整句：The next ___ thing is to find a way to apply the colors——the next 后接名词，修饰 thing",
    "the next 与 thing 之间——词库中该词已是名词",
    "The next ___ thing 是否需要变形？",
    "与 apply the colors to the army again 是否衔接？",
    {
      text:
        "词库 [[challenge → challenge]]；[[名词原形]]；The next challenge thing 表「下一项挑战」。",
    },
  ],
};

export default MANUAL;
