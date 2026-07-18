/**
 * 为 2026 暑期英语课程 9 篇文章生成词汇表（DeepSeek）
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || "sk-daa16008e81843deba6fefe9dce51465";
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const OUT_JSON = path.join(ROOT, "summer-2026-vocab-data.json");

const ARTICLES = [
  {
    id: "math-reasoning",
    title: "数学思辨与论证语言",
    subtitle: "Why Does One Plus One Equal Two?",
    level: "中考+拓展",
    accent: "#2563eb",
    icon: "🔢",
    article: `Why does one plus one equal two? Many teachers would say, "It just does." However, this answer has made children disappointed. They're right to be so. This type of answer makes math feel like a world full of rules that everyone must follow. How boring! As a math researcher, I like to challenge rules. Instead of simply accepting that one plus one equals two, let's go a step further and question whether it's always true. Sometimes, one plus one can equal more than two. If you and a friend each have 1.5 times the amount of money needed for a cup of coffee, alone you can only buy one cup, but together you can join your money to afford three. Sometimes, one plus one is just one. If you put one pile of sand on top of the other, you just get one pile of sand. Or if you mix two colors, you only get one new color. And in some situations, one plus one is zero. If I say, "I'm not not hungry," that means "I'm hungry." The point here is that one "not" plus another "not" means no "nots." You might think this isn't math because items in question aren't numbers at all. But the goal of learning math isn't just to get the numbers correct. Instead, it's to understand the world on a deeper level. Basically, in mathematical research, we often try to explore when a rule holds and when it doesn't. I want us to see math as a space to ask questions and explore every possible answer, rather than a strict place where rules are all set in stone.`,
  },
  {
    id: "zootopia2",
    title: "疯狂动物城 2",
    subtitle: "Zootopia 2 — Weather Wall Blueprint",
    level: "中考难度",
    accent: "#7c3aed",
    icon: "🦊",
    article: `Zootopia 2 is a hit movie about Judy the rabbit and Nick the fox. In the story, a sudden disappearance of Zootopia's weather wall blueprint shocks the whole city. A snake named Gary is wrongly seen as a criminal at first. However, fear soon spreads through the city. The villainous Lynxley family spreads lies to make fear spread even quickly. Although Zootopia was peaceful before, the city was divided as people stop trusting one another. Judy and Nick act fast to prevent things from getting worse. The two detectives find the truth in an old library. The Lynxleys stole the blueprint and hid the reptiles' hard efforts to protect the city. Judy and Nick risk their lives and enter the Lynxleys' house secretly. Nick overcomes his fears while Judy learns more about fairness. Many animals later regretted missing chances to understand others. At the end, Judy says that teamwork and understanding are worth far more than fear and prejudice.`,
  },
  {
    id: "celebrate-success",
    title: "庆祝你的成功",
    subtitle: "Celebrate Your Success",
    level: "中考阅读",
    accent: "#ea580c",
    icon: "🏆",
    article: `Celebrating your successes, even small ones, can help you feel more confident and motivated. Whether it is working hard at your favourite subject or baking a cake for your friends, putting effort into something that makes you happy is a success. It is a good feeling you can get from all areas of your life. You might not always notice your small successes. Try looking at schoolwork from ages ago and see how much you have improved. Success can also be something that no one else sees but you feel, such as making it through a difficult day or speaking up in class. Recognising small successes makes you feel you can achieve bigger goals. Studies show that when you celebrate your successes, a certain part of your brain lights up and greatly improves how you feel about yourself. This makes you feel positive and motivated and helps to overcome challenges in the future. Celebrating even your small successes is important. Try making an achievement jar in which you put a bead or marble every time you succeed in something that matters to you, then watch the jar fill up. If you have a goal such as learning a musical instrument, make a sticker chart to show how often you practise. When the jar or chart is full, reward yourself with treats. These could be fun things such as a bike ride, playing games or a relaxing bath. Share your wins with family and friends too, so they can support you.`,
  },
  {
    id: "sign-language",
    title: "中国手语",
    subtitle: "Chinese Sign Language",
    level: "中考阅读",
    accent: "#0891b2",
    icon: "🤟",
    article: `There are many deaf people in China. They need sign language to communicate with each other. In fact, Chinese Sign Language (CSL) has a long history. It appeared in the Tang dynasty. During the Ming and Qing dynasties, many deaf people in China could use it to communicate with others well. Do you want to learn more about Chinese Sign Language? The following are some easy languages for daily life. Bow your thumb twice. It means "thank you". Put the back of your hand under your jaw. It means "wait". Put your hand beside your forehead. It looks like you salute to someone. Then lower your hand to your chest and stick out your little finger. It means "sorry". If you want to say "I am tired", clench your fist and knock on the middle of the other arm. There are more than 300 different sign languages all over the world. To make people know the importance of sign languages, the United Nations chose September 23rd as the International Day of Sign Languages (IDSL) in 2018. On that day, there are many activities in China. Last year, many volunteers taught sign language to doctors and nurses in a hospital in Lianyungang, Jiangsu province. It could help them communicate with deaf people better. In a library in Haikou, Hainan province, children and sign language lovers learned to sing songs using sign language. They also played games together. Everyone had a great time there.`,
  },
  {
    id: "elephant-fable",
    title: "大象寓言",
    subtitle: "The Elephant and the Rope",
    level: "中考+励志",
    accent: "#16a34a",
    icon: "🐘",
    article: `A man walking through an elephant camp was surprised to find that the elephants weren't being kept in cages or held by chains. All that was holding them back from running away from the camp was a small piece of rope—it was just tied to one of their legs. As the man looked at the elephants, he couldn't understand it. Why didn't the elephants just use their power to break the rope and run away? Wanting to know the truth, he asked a trainer nearby why it was so. "When they were very young and much smaller, we used the same size of rope to tie them, and at that age, it was enough to hold them. As they grew up, they still believed that they couldn't break away. Even now, they believe the rope can still control them, so they have the little courage to try to break free," the trainer answered. The man was speechless. These animals were able to break away from the rope whenever they wanted, but it was only because over time, they believed that it was just impossible. How many of us go through life like the elephants—believing that it was beyond our abilities to do something only because we failed once or sometimes before? Failure is part of learning. If we fail at something, we can still get something from it. Failure in the past doesn't mean we can never succeed in the future. We should keep on trying with confidence in ourselves even after we have experienced failures in life.`,
  },
  {
    id: "niu-yu",
    title: "牛钰 · 闪光的你",
    subtitle: "Niu Yu — A Shining Star at Fashion Week",
    level: "中考+人物",
    accent: "#db2777",
    icon: "✨",
    article: `When the other models appeared on the stage, the audience cheered and clapped. Then it was Niu's turn. The audience suddenly became silent. However, after four or five seconds, Niu clearly heard someone next to the stage say in admiration, "So cool!" Niu Yu, 24, became a shining star at Shanghai Fashion Week for her confidence, even though she was wearing a prosthetic leg. When Niu was only 11, she unluckily lost her right leg during the Wenchuan Earthquake. Niu has won lots of praise. This gives those who have prejudice against the disabled a hit on the nose. "I was touched by something they said. They said the traditional view was that sports were for people with healthy legs, but sports should be a kind of spirit. Even though I have lost a leg, I still deeply love sports and will do so forever," Niu said. Actually, Niu first drew the public's attention when she completed a marathon—a 42-kilometer race in 2018, which was held in Wenchuan to mark the tenth anniversary of the earthquake. Now, Niu works as a photographer and has more than 850,000 followers on social platforms, such as Douyin. "I feel I have a social responsibility to bridge the disabled and the public. Showing my life to the public can allow them to better understand our group and can also tell other disabled people that they can still shine in our increasingly tolerant society," she explained.`,
  },
  {
    id: "ancient-env",
    title: "古代中国的环保",
    subtitle: "Environmental Protection in Ancient China",
    level: "成都中考 2022",
    accent: "#059669",
    icon: "🌿",
    article: `Environmental protection is one of the hottest topics nowadays. It was also something that ancient Chinese paid great attention to. In fact, the world's earliest environmental protection idea, ministry and law were all born in China. How did the ancient Chinese protect the environment? Xunzi, a famous thinker in the Warring States Period, came up with the idea of "managing state affairs through environmental protection". He wrote in his book that vegetation should be protected well by humans. Guan Zhong, a government officer 400 years ahead of Xunzi, was also an environmental protection expert. He said "a king who cannot protect his vegetation is not doing a good job". Nine ministries set up by Shun, an ancient Chinese emperor, included "Yu" (虞), an environmental protection ministry. The first "Yu" leader was Boyi, an environmental protection expert. He invented wells so people could drink clean water. He knew a lot about animals and also called for animal protection. Over 4,000 years ago, Dayu, an ancient Chinese water-control expert and also an emperor, made a rule, not allowing people to cut down trees in March or catch fish in June, because it was the time when they grew quickly. Almost 3,000 years ago, Tianlu, the first environmental protection law, appeared in Qin. It recorded many ancient environmental protection rules. Two of them were interesting: firstly, rivers should not be blocked; secondly, grass and trees should not be burned to be fertilizer except for summer. The second one is inspiring even for today. It can help to keep air clean and fresh.`,
  },
  {
    id: "history-maps",
    title: "地图的历史",
    subtitle: "The History of Maps",
    level: "成都中考 2023",
    accent: "#0d9488",
    icon: "🗺️",
    article: `Maps mark seas, countries, cities and our homes, and guide us through the world. To know them better, let's take a look at how maps have changed over the centuries. Many ancient countries used maps. One of the first is thought to have been drawn on the wall in Lascaux, France, around 16,500 years ago. Hidden among the drawings of birds and bulls is a map of the stars. The Babylonian Map of the World is the oldest known earthly map, which shows Babylon and its neighboring towns on the stone. Claudius Ptolemy made maps go global. Born in Egypt around 100 AD, he was the first person to try to make a world map. With the help of math, Ptolemy marked around 10,000 locations from Britain to Asia and Africa. Perhaps the most commonly used world map is the Mercator Projection. It was introduced in 1569 by Gerardus Mercator. An important part of maps is the imaginary lines of longitude, latitude and the equator. Mercator took the globe and made it flat, but to do this he had to make the areas further north and south larger, while the areas nearer the middle stay about the right size. The reason for this is that the Earth is like a ball, but a map is flat. It is easy to find places, but some people said it was unfair because places including Canada, the UK and Europe appeared much bigger than they really were. In the 19th and 20th centuries, modern technology allowed map makers to produce maps showing locations exactly. Today, many people view maps on their phones. Researchers are working to map the floor of the oceans and to locate every tree on Earth. Scientists are also trying to map the past by using the James Webb Space Telescope (JWST). This invention will collect light from stars and may find the secrets about the beginning of the universe.`,
  },
  {
    id: "weather-prediction",
    title: "天气预报",
    subtitle: "Humans' Efforts to Predict the Weather",
    level: "成都中考 2024",
    accent: "#0284c7",
    icon: "🌤️",
    article: `Humans have long tried to predict the weather. From the hunters of ancient times to today's pilots, predicting rain or shine can shape people's life and make a difference. In 650 BC, the Babylonians tried to predict the weather based on the appearance of clouds. Around 340 BC, Aristotle, a famous Greek thinker and scientist, wrote Meteorologica. It introduced the types of weather, such as rain, cloud and lightning. Aristotle believed that there was water, air and fire around the Earth. It was almost 2,000 years before his ideas were replaced by new ones. By 300 BC in China, a calendar divided the year into 24 festivals gradually, each festival related to a type of weather, like the Rain Water, the Waking of Insects and so on. That was useful for farmers to plan when to plant and harvest. People used lots of ways to predict the weather over the centuries. You might have heard the expressions like "Red sky at night, sailor's delight", which suggests a red sky in the evening is followed by good weather. This has a basis in science, as does telling wind direction through smoke from the fire. On the other hand, some thought that if sheep crowded together, it meant rain. But there isn't any science behind it. The science of weather prediction really took off in the 1830s with the invention of the telegraph. It sent messages over hundreds of thousands of miles, so weather maps were drawn up and storm systems were studied. The next big step came in the 1920s with the invention of the "radiosonde", a balloon carrying weather instruments high above the ground to collect information. Experts took the information and built a picture of the weather over the following few days. Today, supercomputers are used to take data from the world and process it very fast to work out the weather. For example, they once helped predict where Hurricane Lee, which hit the US and Canada, would land nine days in advance.`,
  },
];

function buildPrompt(article) {
  return `你是面向中国初高中学生的英语教师。请根据以下英文文章，精选 12 个最值得学习的词汇、词组或习惯表达（单词、短语、固定搭配均可，至少包含 3 个词组/习惯表达）。

文章标题：${article.title}（${article.subtitle}）

文章全文：
${article.article}

返回**纯 JSON**（无 markdown），结构：
{
  "vocabulary": [ 12 个对象 ]
}

每个对象字段（对齐 REFH 词汇表格式）：
{
  "word": "词条（英文）",
  "type": "word" | "phrase" | "pattern",
  "pos": "词性（单词必填，如 n./v./adj.；短语可省略）",
  "phrase_type": "短语类型（仅 phrase 时，如 动词短语/固定搭配）",
  "level": "A2/B1/B2",
  "definition_en": "简明英文释义",
  "definition_cn": "准确中文释义",
  "article_example": {
    "sentence": "必须摘自或紧密改写自上文原文的例句",
    "translation": "例句中文翻译"
  },
  "examples": {
    "zhongkao": { "sentence": "自编中考难度例句", "translation": "中文" },
    "grade10": { "sentence": "自编高一难度例句", "translation": "中文" }
  },
  "synonyms": ["同义词1", "同义词2"],
  "word_forms": ["词性变化，如 succeed→success"],
  "other_usage": "常见搭配或用法提示（中文+英文）"
}

要求：
1. 恰好 12 项；优先选文章核心考点词，覆盖名词/动词/形容词/短语
2. article_example 必须能在原文中找到或对应
3. 例句具体、可迁移；中文翻译准确自然
4. JSON 合法，无注释`;
}

async function callDeepSeek(prompt) {
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DEEPSEEK_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You output only valid JSON. No markdown fences." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 12000,
    }),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const data = await res.json();
  let text = data.choices?.[0]?.message?.content || "";
  text = text.replace(/^```json?\s*/i, "").replace(/```\s*$/i, "").trim();
  return JSON.parse(text);
}

async function main() {
  const course = {
    title: "2026 暑期英语课程词汇表",
    subtitle: "Summer English Vocabulary · 9 Articles · 108 Items",
    generated_at: new Date().toISOString(),
    articles: [],
  };

  for (let i = 0; i < ARTICLES.length; i++) {
    const art = ARTICLES[i];
    process.stdout.write(`[${i + 1}/${ARTICLES.length}] ${art.title} ... `);
    try {
      const result = await callDeepSeek(buildPrompt(art));
      const vocab = result.vocabulary || result.vocab || [];
      if (vocab.length < 10) throw new Error(`仅 ${vocab.length} 项`);
      course.articles.push({
        ...art,
        order: i + 1,
        vocabulary: vocab.slice(0, 15),
      });
      console.log(`✓ ${vocab.length} 项`);
    } catch (e) {
      console.log(`✗ ${e.message}`);
      throw e;
    }
    if (i < ARTICLES.length - 1) await new Promise((r) => setTimeout(r, 1500));
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(course, null, 2), "utf8");
  console.log(`\n已保存 ${OUT_JSON}`);
  console.log(`共 ${course.articles.length} 篇，${course.articles.reduce((n, a) => n + a.vocabulary.length, 0)} 词条`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
