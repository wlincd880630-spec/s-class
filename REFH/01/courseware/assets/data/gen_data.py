# -*- coding: utf-8 -*-
import json, os

base = os.path.dirname(os.path.abspath(__file__))

def word(w, pos, level, en, cn, article_sent, article_trans, zk, zk_t, g10, g10_t, syn, forms, usage):
    return {
        "word": w, "type": "word", "pos": pos, "level": level,
        "definition_en": en, "definition_cn": cn,
        "article_example": {"sentence": article_sent, "translation": article_trans},
        "examples": {"zhongkao": {"sentence": zk, "translation": zk_t}, "grade10": {"sentence": g10, "translation": g10_t}},
        "synonyms": syn, "word_forms": forms, "other_usage": usage
    }

def phrase(w, ptype, en, cn, article_sent, article_trans, zk, zk_t, g10, g10_t, syn, usage):
    return {
        "word": w, "type": "phrase", "phrase_type": ptype,
        "definition_en": en, "definition_cn": cn,
        "article_example": {"sentence": article_sent, "translation": article_trans},
        "examples": {"zhongkao": {"sentence": zk, "translation": zk_t}, "grade10": {"sentence": g10, "translation": g10_t}},
        "synonyms": syn, "word_forms": [], "other_usage": usage
    }

def pattern(w, en, cn, article_sent, article_trans, zk, zk_t, g10, g10_t, usage):
    return {
        "word": w, "type": "pattern",
        "definition_en": en, "definition_cn": cn,
        "article_example": {"sentence": article_sent, "translation": article_trans},
        "examples": {"zhongkao": {"sentence": zk, "translation": zk_t}, "grade10": {"sentence": g10, "translation": g10_t}},
        "synonyms": [], "word_forms": [], "other_usage": usage
    }

vocabulary = [
word("variety","n.","A2","A type or kind of something; a particular form of a plant or animal.","品种；种类",
 "Humans have bred crops for desirable traits for many thousands of years. Now, they are looking to gene editing as a way of creating new fruit varieties.",
 "人类几千年来一直在培育具有理想性状的作物。现在，他们正将基因编辑视为创造新水果品种的一种方式。",
 "There are many varieties of apples in the market.","市场上有许多品种的苹果。",
 "This new variety of rice can grow well in dry areas.","这种水稻新品种能在干旱地区良好生长。",
 ["type","kind","sort"], ["various (adj.)","vary (v.)"], "a wide variety of 各种各样的"),
word("breed","v.","A2","To keep animals or plants in order to produce young or new plants with particular qualities.","培育；繁殖",
 "They picked the plants that bore the tastiest fruits or vegetables and bred them to create new plants.",
 "他们挑选结出最美味水果或蔬菜的植物，并培育它们以创造新植物。",
 "Farmers breed chickens for fresh eggs.","农民饲养鸡以获取新鲜鸡蛋。",
 "Scientists breed new types of wheat to resist disease.","科学家培育新型小麦以抵抗疾病。",
 ["raise","cultivate"], ["breeding (n.)","breeder (n.)"], "breed animals/plants"),
word("desirable","adj.","B1","Worth having or wanting; attractive or useful.","理想的；值得拥有的",
 "Humans have bred crops for desirable traits for many thousands of years.",
 "人类几千年来一直在培育具有理想性状的作物。",
 "Good communication skills are desirable for this job.","良好的沟通能力是这份工作的理想条件。",
 "Living in a quiet neighborhood is highly desirable for families.","对于家庭来说，住在安静的社区是非常理想的。",
 ["wanted","attractive","preferred"], ["desire (n./v.)"], "desirable qualities/traits"),
word("gene","n.","B1","A part of a cell that controls the development and appearance of a living thing.","基因",
 "Genes are pieces of DNA. They contain the instructions for building a living thing.",
 "基因是DNA的片段。它们包含构建生命体的指令。",
 "Eye color is decided partly by your genes.","眼睛颜色部分由基因决定。",
 "Scientists study genes to understand how diseases develop.","科学家研究基因以了解疾病如何发展。",
 ["genetic factor"], ["genetic (adj.)","genetically (adv.)"], "gene editing 基因编辑"),
word("instruction","n.","A2","Detailed information on how to do something; a command or direction.","说明；指令",
 "They contain the instructions for building a living thing.",
 "它们包含构建生命体的指令。",
 "Please read the instructions before using the machine.","使用机器前请阅读说明。",
 "The teacher gave clear instructions on how to write the essay.","老师清楚地说明了如何写这篇作文。",
 ["direction","guidance"], ["instruct (v.)","instructor (n.)"], "follow instructions"),
word("develop","v.","A2","To grow or cause to grow and become more advanced; to create something new.","发展；开发；发育",
 "For example, it can change how seeds develop.",
 "例如，它可以改变种子发育的方式。",
 "Children develop quickly in their first five years.","儿童在最初五年里发展很快。",
 "The company is developing a new app for language learning.","该公司正在开发一款语言学习新应用。",
 ["grow","create","advance"], ["development (n.)","developer (n.)"], "develop skills/habits"),
word("selective","adj.","B1","Carefully choosing only the best or most suitable.","选择性的；有选择的",
 "This is called selective breeding.",
 "这被称为选择性育种。",
 "She is very selective about the books she reads.","她对读什么书非常挑剔。",
 "Selective schools choose students based on test results.","择优录取的学校根据考试成绩选拔学生。",
 ["choosy","particular"], ["select (v.)","selection (n.)"], "selective breeding 选择性育种"),
word("breeding","n.","B1","The process of producing plants or animals with particular qualities.","培育；繁殖",
 "But thousands of years of selective breeding have led to tastier, hardier, and often larger fruits and vegetables.",
 "但数千年的选择性育种使水果和蔬菜变得更美味、更耐寒，且往往更大。",
 "Dog breeding requires patience and knowledge.","狗的培育需要耐心和知识。",
 "Plant breeding programs aim to improve crop yields.","植物育种项目旨在提高作物产量。",
 ["cultivation","propagation"], ["breed (v.)"], "selective breeding"),
word("artificial","adj.","A2","Made by people; not natural.","人造的；人工的",
 "It is also known as artificial selection.",
 "它也被称为人工选择。",
 "This lake is artificial, not natural.","这个湖是人造的，不是天然的。",
 "Artificial intelligence is changing many industries.","人工智能正在改变许多行业。",
 ["man-made","synthetic"], ["artificially (adv.)"], "artificial selection 人工选择"),
word("ancestor","n.","B1","A person or animal from whom others have descended; an early form of something.","祖先；原种",
 "Today's peaches are much larger than their wild ancestors, for example.",
 "例如，今天的桃子比它们的野生祖先大得多。",
 "My ancestors came from a small village in the south.","我的祖先来自南方的一个小村庄。",
 "Scientists compare modern birds with their dinosaur ancestors.","科学家将现代鸟类与其恐龙祖先进行比较。",
 ["forefather","predecessor"], ["ancestral (adj.)","ancestry (n.)"], "wild ancestors 野生祖先"),
word("precisely","adv.","B1","Exactly; in a way that is accurate and exact.","精确地；准确地",
 "Now gene editing allows scientists to make changes to plants even more quickly and precisely.",
 "现在，基因编辑使科学家能够更快、更精确地改变植物。",
 "Please tell me precisely what happened.","请准确告诉我发生了什么。",
 "The instrument measures temperature precisely to one decimal place.","该仪器将温度精确测量到小数点后一位。",
 ["exactly","accurately"], ["precise (adj.)","precision (n.)"], "more precisely 更精确地"),
word("organism","n.","B2","A living thing, especially one that is very small or simple.","生物体；有机体",
 "It is a technology that allows scientists to change the DNA of an organism.",
 "这是一项使科学家能够改变生物体DNA的技术。",
 "A microscope helps us see tiny organisms in water.","显微镜帮助我们看到水中的微小生物。",
 "Every organism depends on its environment to survive.","每个生物体都依赖环境来生存。",
 ["living thing","life form"], ["organic (adj.)"], "single-celled organism 单细胞生物"),
word("trait","n.","B2","A particular quality in someone's character or in a plant or animal.","特征；性状",
 "Using AI, scientists are able to discover more about certain traits, such as the chemicals that generate flavor.",
 "利用AI，科学家能够发现更多关于某些性状的信息，例如产生风味的化学物质。",
 "Honesty is an important character trait.","诚实是一种重要的性格特征。",
 "Researchers study genetic traits that affect crop resistance.","研究人员研究影响作物抗性的遗传性状。",
 ["characteristic","feature","quality"], ["trait (pl. traits)"], "desirable traits 理想性状"),
word("substance","n.","B1","A particular type of solid, liquid, or gas.","物质",
 "Chemical reactions are when substances change into new substances.",
 "化学反应是物质变成新物质的过程。",
 "Water is the most common substance on Earth.","水是地球上最常见的物质。",
 "The lab handles dangerous chemical substances with great care.","实验室非常小心地处理危险的化学物质。",
 ["material","matter"], ["substantial (adj.)"], "new substances 新物质"),
word("enzyme","n.","B2","A substance produced by a living organism that helps a chemical reaction happen.","酶",
 "That's because an enzyme called polyphenol oxidase reacts with the oxygen in the air in a process that causes browning.",
 "那是因为一种叫做多酚氧化酶的酶与空气中的氧气发生反应，导致褐变。",
 "Enzymes in our stomach help digest food.","我们胃里的酶帮助消化食物。",
 "Scientists changed how the enzyme is made in the fruit.","科学家改变了水果中酶的生成方式。",
 ["catalyst"], ["enzymatic (adj.)"], "digestive enzyme 消化酶"),
word("appealing","adj.","B1","Attractive or interesting; pleasing.","吸引人的；有魅力的",
 "Scientists are looking to slow chemical reactions in other fruits and veggies to make them look more appealing and even last longer.",
 "科学家正试图减缓其他水果和蔬菜的化学反应，使它们看起来更有吸引力，甚至保存更久。",
 "The colorful poster looks very appealing to children.","色彩鲜艳的海报对孩子们很有吸引力。",
 "The idea of studying abroad is appealing to many students.","出国留学的想法对许多学生很有吸引力。",
 ["attractive","inviting"], ["appeal (n./v.)"], "look appealing 看起来有吸引力"),
word("estimate","v./n.","B1","To guess or calculate the cost, size, or value of something.","估计；估算",
 "Pairwise estimates that their seedless blackberries could become as popular as easy-peel mandarins.",
 "Pairwise估计，他们的无籽黑莓可能会像易剥皮橘子一样受欢迎。",
 "Can you estimate how many people came to the party?","你能估计有多少人来参加派对吗？",
 "Experts estimate that the project will take two years to complete.","专家估计该项目将需要两年完成。",
 ["guess","calculate"], ["estimation (n.)"], "estimate that... 估计……"),
word("technique","n.","B1","A way of doing something by using special knowledge or skill.","技术；技巧",
 "CRISPR is the most popular such technique at the moment.",
 "CRISPR是目前最流行的此类技术。",
 "She learned a new technique for painting landscapes.","她学了一种画风景的新技巧。",
 "Gene editing is a powerful technique in modern biology.","基因编辑是现代生物学中一项强大的技术。",
 ["method","skill","approach"], ["technical (adj.)","technician (n.)"], "popular technique 流行技术"),
word("offspring","n.","B2","The young of an animal or plant; children or descendants.","后代；子孙",
 "In nature, living things that are best suited to their environment survive and have more offspring.",
 "在自然界中，最适应环境的生物会存活下来并产生更多后代。",
 "The cat and her offspring live in our garden.","猫和它的后代住在我们的花园里。",
 "Survival of the fittest means those best adapted produce more offspring.","适者生存意味着适应力最强的个体产生更多后代。",
 ["descendants","young"], ["offspring (sing./pl.)"], "have more offspring 产生更多后代"),
word("inhibit","v.","B2","To slow down or prevent a process or reaction.","抑制；阻止",
 "Scientists have also developed mushrooms and potatoes that inhibit the same enzyme.",
 "科学家还开发了能抑制同一种酶的蘑菇和土豆。",
 "Fear can inhibit you from speaking in public.","恐惧可能阻止你在公众面前说话。",
 "The drug is designed to inhibit the growth of bacteria.","这种药物旨在抑制细菌生长。",
 ["prevent","block","restrain"], ["inhibition (n.)","inhibitor (n.)"], "inhibit a reaction 抑制反应"),
]

phrases = [
phrase("gene editing","noun phrase","A method of changing the DNA of living things using scientific tools.","基因编辑",
 "Pairwise is using gene editing to make its seedless blackberries.","Pairwise正在使用基因编辑来制造无籽黑莓。",
 "Gene editing may help treat some diseases in the future.","基因编辑未来可能帮助治疗某些疾病。",
 "Researchers use gene editing to improve crop quality efficiently.","研究人员利用基因编辑高效改善作物质量。",
 ["genetic modification"], "CRISPR is a gene editing technique."),
phrase("selective breeding","noun phrase","Choosing plants or animals with desired qualities to produce the next generation.","选择性育种",
 "But thousands of years of selective breeding have led to tastier, hardier, and often larger fruits and vegetables.",
 "但数千年的选择性育种使水果和蔬菜变得更美味、更耐寒，且往往更大。",
 "Selective breeding helped create many farm animals we see today.","选择性育种帮助创造了我们今天看到的许多农场动物。",
 "Modern agriculture still relies on selective breeding alongside new technology.","现代农业在新技术之外仍依赖选择性育种。",
 ["artificial selection"], "also called artificial selection"),
phrase("natural selection","noun phrase","The process by which organisms best adapted to their environment survive and reproduce.","自然选择",
 "This is in contrast to natural selection.","这与自然选择形成对比。",
 "Darwin explained natural selection in his famous book.","达尔文在名著中解释了自然选择。",
 "Natural selection explains why some species survive while others die out.","自然选择解释了为什么有些物种存活而其他物种灭绝。",
 ["survival of the fittest"], "in contrast to natural selection"),
phrase("artificial selection","noun phrase","Human choice of which plants or animals reproduce, based on desired traits.","人工选择",
 "It is also known as artificial selection.","它也被称为人工选择。",
 "Farmers use artificial selection to grow sweeter corn.","农民利用人工选择种植更甜的玉米。",
 "Artificial selection can produce changes faster than waiting for nature alone.","人工选择比单纯等待自然产生变化更快。",
 ["selective breeding"], "same as selective breeding"),
phrase("desirable traits","noun phrase","Qualities that people want in plants, animals, or products.","理想性状",
 "Humans have bred crops for desirable traits for many thousands of years.",
 "人类几千年来一直在培育具有理想性状的作物。",
 "Size and sweetness are desirable traits in many fruits.","大小和甜度是许多水果的理想性状。",
 "Breeders focus on desirable traits like disease resistance.","育种者关注抗病性等理想性状。",
 ["preferred characteristics"], "breed for desirable traits"),
phrase("look to ... as a way of","verb phrase","To consider something as a method for achieving a goal.","将……视为……的方式",
 "Now, they are looking to gene editing as a way of creating new fruit varieties.",
 "现在，他们正将基因编辑视为创造新水果品种的一种方式。",
 "Many cities look to public transport as a way of reducing pollution.","许多城市将公共交通视为减少污染的方式。",
 "Students look to online resources as a way of improving their skills.","学生将在线资源视为提升技能的方式。",
 ["see as a method"], "look to X as a way of doing Y"),
phrase("change the DNA of","verb phrase","To alter the genetic material inside a living thing.","改变……的DNA",
 "Gene editing is a method that lets scientists change the DNA of plants.",
 "基因编辑是一种让科学家改变植物DNA的方法。",
 "Scientists can change the DNA of bacteria in the lab.","科学家可以在实验室改变细菌的DNA。",
 "CRISPR allows scientists to change the DNA of an organism precisely.","CRISPR使科学家能够精确改变生物体的DNA。",
 ["modify genes"], "change the DNA of plants/organisms"),
phrase("bear fruit","verb phrase","(of trees) to produce fruit; (fig.) to produce results after effort.","结果；取得成果",
 "It can take several years for apple or peach trees to begin bearing fruit.",
 "苹果树或桃树可能需要几年才开始结果。",
 "Hard work will bear fruit if you keep trying.","如果坚持努力，辛勤工作终将取得成果。",
 "The research project took years to bear fruit.","该研究项目花了很多年才取得成果。",
 ["produce fruit","yield results"], "begin bearing fruit 开始结果"),
phrase("go on sale","verb phrase","To become available for people to buy.","上市；开售",
 "So far, a few fruits that have been gene-edited with CRISPR have gone on sale.",
 "到目前为止，少数经CRISPR基因编辑的水果已经上市。",
 "The new phone will go on sale next month.","新手机将于下个月上市。",
 "Gene-edited products may go on sale in more countries soon.","基因编辑产品可能很快在更多国家上市。",
 ["become available","hit the market"], "fruits go on sale"),
phrase("turn brown","verb phrase","To become brown in color, often due to oxidation or cooking.","变成褐色；氧化变色",
 "For example, avocados turn brown when you cut into them.",
 "例如，牛油果在你切开后会变褐。",
 "Bananas turn brown when they are overripe.","香蕉过熟时会变褐。",
 "Scientists are trying to stop apples from turning brown too quickly.","科学家正试图防止苹果过快变褐。",
 ["browning"], "avocados turn brown when cut"),
phrase("speed up chemical reactions","verb phrase","To make chemical changes happen faster.","加速化学反应",
 "Enzymes can speed up chemical reactions and are also responsible for the ripening process.",
 "酶可以加速化学反应，也负责成熟过程。",
 "Heat can speed up chemical reactions in cooking.","热量可以在烹饪中加速化学反应。",
 "Certain enzymes speed up chemical reactions in our bodies.","某些酶在我们体内加速化学反应。",
 ["accelerate reactions"], "enzymes speed up reactions"),
phrase("last longer","verb phrase","To remain fresh or usable for a longer time.","保存更久；持续更久",
 "So, slowing that reaction down makes mushrooms and potatoes last longer.",
 "因此，减缓该反应使蘑菇和土豆保存更久。",
 "This battery lasts longer than the old one.","这块电池比旧的使用时间更长。",
 "New packaging helps fruit last longer on store shelves.","新包装帮助水果在货架上保存更久。",
 ["stay fresh longer","endure"], "make food last longer"),
phrase("seedless blackberries","adj phrase","Blackberries that have no noticeable seeds.","无籽黑莓",
 "Pairwise is using gene editing to make its seedless blackberries.",
 "Pairwise正在使用基因编辑来制造无籽黑莓。",
 "Seedless grapes are popular with children.","无籽葡萄很受孩子欢迎。",
 "Seedless blackberries could become as popular as easy-peel mandarins.","无籽黑莓可能会像易剥皮橘子一样受欢迎。",
 ["seed-free blackberries"], "first seedless blackberries"),
phrase("tastier and hardier","adj phrase","More delicious and more able to survive difficult conditions.","更美味且更耐寒的",
 "But thousands of years of selective breeding have led to tastier, hardier, and often larger fruits and vegetables.",
 "但数千年的选择性育种使水果和蔬菜变得更美味、更耐寒，且往往更大。",
 "Farmers want crops that are tastier and hardier.","农民想要更美味且更耐寒的作物。",
 "Selective breeding produced tastier and hardier varieties over centuries.","几个世纪以来，选择性育种产生了更美味且更耐寒的品种。",
 ["more flavorful and tougher"], "tastier, hardier, and larger"),
phrase("easy-peel mandarins","adj phrase","Mandarins whose skin is easy to remove.","易剥皮橘子",
 "Pairwise estimates that their seedless blackberries could become as popular as easy-peel mandarins.",
 "Pairwise估计，他们的无籽黑莓可能会像易剥皮橘子一样受欢迎。",
 "Easy-peel mandarins are convenient for school lunches.","易剥皮橘子便于作为学校午餐。",
 "Consumers love easy-peel mandarins because they are quick to eat.","消费者喜欢易剥皮橘子，因为吃起来很快。",
 ["convenient citrus"], "as popular as easy-peel mandarins"),
]

patterns = [
pattern("... is a method that lets scientists ...","A structure to define a scientific method and its function.","……是一种让科学家……的方法",
 "Gene editing is a method that lets scientists change the DNA of plants.",
 "基因编辑是一种让科学家改变植物DNA的方法。",
 "Recycling is a method that lets us protect the environment.","回收是一种让我们保护环境的方法。",
 "CRISPR is a technology that lets scientists edit genes precisely.","CRISPR是一项让科学家精确编辑基因的技术。",
 "Replace 'method' with 'way/technology/approach'."),
pattern("... is in contrast to ...","Used to show a clear difference between two ideas.","……与……形成对比",
 "This is in contrast to natural selection.","这与自然选择形成对比。",
 "City life is in contrast to quiet country life.","城市生活与宁静的乡村生活形成对比。",
 "Artificial selection is in contrast to natural selection.","人工选择与自然选择形成对比。",
 "Also: in contrast, ... (sentence adverb)"),
pattern("It takes a long time to ...","Expresses that something requires much time.","……需要很长时间",
 "That's because it takes a long time to grow most fruit.",
 "那是因为大多数水果的生长需要很长时间。",
 "It takes a long time to learn a foreign language well.","学好一门外语需要很长时间。",
 "It takes a long time to develop a new medicine.","开发一种新药需要很长时间。",
 "It takes + time + to do sth."),
pattern("... allows scientists to make changes to ...","Shows that a tool enables precise modification.","……使科学家能够对……做出改变",
 "Now gene editing allows scientists to make changes to plants even more quickly and precisely.",
 "现在，基因编辑使科学家能够更快、更精确地改变植物。",
 "Technology allows doctors to treat patients more effectively.","技术使医生能够更有效地治疗患者。",
 "AI allows researchers to analyze large amounts of data.","AI使研究人员能够分析大量数据。",
 "allow sb. to do sth."),
pattern("... estimates that ...","Reports what someone or an organization predicts or calculates.","……估计……",
 "Pairwise estimates that their seedless blackberries could become as popular as easy-peel mandarins.",
 "Pairwise估计，他们的无籽黑莓可能会像易剥皮橘子一样受欢迎。",
 "The teacher estimates that the test will take 45 minutes.","老师估计考试将需要45分钟。",
 "Experts estimate that global temperatures will continue to rise.","专家估计全球气温将继续上升。",
 "estimate + that clause"),
]

paragraphs = [
{"id":1,"title":"Opening","section_heading":"","image":"section1-intro.png","sentences":[
"Humans have bred crops for desirable traits for many thousands of years.",
"Now, they are looking to gene editing as a way of creating new fruit varieties.",
"\"You don't notice the seeds in a blackberry until you've tried a seedless one,\" says Tom Adams.",
"He is the head of Pairwise.",
"It is a company in North Carolina.",
"It is working on the first blackberries that don't have seeds.",
"Pairwise is using gene editing to make its seedless blackberries.",
"Gene editing is a method that lets scientists change the DNA of plants.",
"Genes are pieces of DNA.",
"They contain the instructions for building a living thing.",
"Editing genes can change how a living thing looks.",
"For example, it can change how seeds develop.",
"Technically, these blackberries still have seeds.",
"They are just so small and soft that you don't notice them."],
"socratic":[
{"q":"Why might consumers prefer seedless blackberries over regular ones?","a":"Because seeds can be annoying to bite into; seedless blackberries offer a smoother eating experience, which makes them more appealing to consumers."},
{"q":"What role do genes play in how a living thing looks or develops?","a":"Genes contain instructions for building a living thing, so editing genes can change appearance and development, such as how seeds form."},
{"q":"Does 'seedless' in this article mean there are absolutely no seeds? Explain.","a":"No. The text says the blackberries technically still have seeds, but they are so small and soft that you don't notice them."}]},
{"id":2,"title":"Changing Fruits (History)","section_heading":"Changing Fruits","image":"section2-breeding.png","sentences":[
"Fruits have changed a lot.",
"About 12,000 years ago, humans stopped being hunter-gatherers.",
"They stopped traveling to find food.",
"Instead they started to grow their own food.",
"Over thousands of years, humans have grown fruit to their tastes.",
"They picked the plants that bore the tastiest fruits or vegetables and bred them to create new plants.",
"This is called selective breeding.",
"It is also known as artificial selection.",
"This is in contrast to natural selection.",
"In nature, living things that are best suited to their environment survive and have more offspring.",
"These are not always the ones with the tastiest fruits.",
"But thousands of years of selective breeding have led to tastier, hardier, and often larger fruits and vegetables.",
"Today's peaches are much larger than their wild ancestors, for example.",
"Selectively bred fruits also tend to be sweeter."],
"socratic":[
{"q":"What major change in human lifestyle happened about 12,000 years ago?","a":"Humans stopped being hunter-gatherers and began growing their own food instead of traveling to find it."},
{"q":"How is artificial selection different from natural selection when it comes to fruit taste?","a":"In artificial selection, humans choose plants with the tastiest fruits to breed; in natural selection, survival depends on fitness to the environment, not taste."},
{"q":"What evidence shows that selective breeding has changed fruits over time?","a":"Today's peaches are much larger than wild ancestors, and bred fruits tend to be sweeter, hardier, and often larger."}]},
{"id":3,"title":"Changing Fruits (Modern Tech)","section_heading":"Changing Fruits","image":"section3-crispr-ai.png","sentences":[
"Now gene editing allows scientists to make changes to plants even more quickly and precisely.",
"CRISPR is the most popular such technique at the moment.",
"It is a technology that allows scientists to change the DNA of an organism.",
"It can change or remove specific genes.",
"That would be hard to do through selective breeding.",
"Computer software like artificial intelligence (AI) is also helping scientists design fruit.",
"With AI, computers and machines can learn and solve problems using information.",
"Using AI, scientists are able to discover more about certain traits, such as the chemicals that generate flavor."],
"socratic":[
{"q":"Why might CRISPR be more efficient than traditional selective breeding?","a":"Because it can change or remove specific genes quickly and precisely, while selective breeding would make such changes much harder and slower."},
{"q":"According to the paragraph, how does AI help in fruit development?","a":"AI helps scientists design fruit and discover more about traits like the chemicals that generate flavor."},
{"q":"What two modern technologies does this section compare to older breeding methods?","a":"Gene editing (especially CRISPR) and artificial intelligence (AI)."}]},
{"id":4,"title":"Slowing Reactions","section_heading":"Slowing Reactions","image":"section4-enzymes.png","sentences":[
"Chemical reactions are when substances change into new substances.",
"Scientists are looking to slow chemical reactions in other fruits and veggies to make them look more appealing and even last longer.",
"For example, avocados (yes, they are a fruit!) turn brown when you cut into them.",
"That's because an enzyme called polyphenol oxidase reacts with the oxygen in the air in a process that causes browning.",
"Enzymes can speed up chemical reactions and are also responsible for the ripening process, which means enzymes can change the texture, color, and flavor of food, too.",
"GreenVenus, a Californian firm, is using CRISPR to develop avocados that don't turn brown.",
"They changed how the enzyme is made in the fruit.",
"Scientists have also developed mushrooms and potatoes that inhibit the same enzyme.",
"So, slowing that reaction down makes mushrooms and potatoes last longer, and they don't turn brown as fast."],
"socratic":[
{"q":"Why do avocados turn brown after being cut?","a":"An enzyme called polyphenol oxidase reacts with oxygen in the air, causing a browning process."},
{"q":"How can slowing enzyme reactions benefit fruits and vegetables?","a":"It can make them look more appealing, prevent browning, and help them last longer on shelves."},
{"q":"Besides browning, what else can enzymes affect in food?","a":"Enzymes are responsible for ripening and can change the texture, color, and flavor of food."}]},
{"id":5,"title":"Ready To Eat?","section_heading":"Ready To Eat?","image":"section5-market.png","sentences":[
"So far, a few fruits that have been gene-edited with CRISPR have gone on sale.",
"That's because it takes a long time to grow most fruit.",
"It can take several years for apple or peach trees to begin bearing fruit.",
"But as more fruity creations go on sale, companies believe that more people will eat fruit.",
"Pairwise estimates that their seedless blackberries could become as popular as easy-peel mandarins."],
"socratic":[
{"q":"Why have only a few gene-edited fruits reached stores so far?","a":"Because most fruit takes a long time to grow; trees like apple or peach may need several years before bearing fruit."},
{"q":"What do companies believe will happen as more gene-edited fruits go on sale?","a":"They believe more people will eat fruit."},
{"q":"What comparison does Pairwise make about the future of seedless blackberries?","a":"They estimate seedless blackberries could become as popular as easy-peel mandarins."}]},
]

all_sentences = []
for p in paragraphs:
    for s in p["sentences"]:
        all_sentences.append({"text": s, "paragraph_id": p["id"], "paragraph_title": p.get("section_heading") or p["title"]})

article_full = "\n\n".join(
    (p.get("section_heading") or p["title"]) + "\n" + " ".join(p["sentences"])
    for p in paragraphs
)

article_lead = (
    "Humans have bred crops for desirable traits for many thousands of years. "
    "Now, they are looking to gene editing as a way of creating new fruit varieties."
)

quiz = {
  "spelling": [
    {"hint_cn": "基因", "hint_en": "A part of a cell that controls development and appearance.", "answer": "gene"},
    {"hint_cn": "品种；种类", "hint_en": "A particular type of plant or animal.", "answer": "variety"},
    {"hint_cn": "酶", "hint_en": "A substance that helps chemical reactions in living things.", "answer": "enzyme"},
    {"hint_cn": "特征；性状", "hint_en": "A particular quality of a plant, animal, or person.", "answer": "trait"},
    {"hint_cn": "精确地", "hint_en": "Exactly and accurately.", "answer": "precisely"},
    {"hint_cn": "估计", "hint_en": "To calculate or guess a value or result.", "answer": "estimate"},
    {"hint_cn": "技术；技巧", "hint_en": "A way of doing something using special skill.", "answer": "technique"},
    {"hint_cn": "物质", "hint_en": "A type of solid, liquid, or gas.", "answer": "substance"},
  ],
  "word_selection": {
    "bank": ["breeding","appealing","ancestor","inhibit","selective","develop","organism","trait"],
    "items": [
      {"sentence": "Thousands of years of selective ___ have made fruits sweeter and larger.", "answer": "breeding", "analysis": "selective breeding（选择性育种）是固定搭配。"},
      {"sentence": "Scientists want fruits to look more ___ on store shelves.", "answer": "appealing", "analysis": "appealing（有吸引力的）符合语境。"},
      {"sentence": "Modern peaches are much bigger than their wild ___.", "answer": "ancestors", "answer_alt": ["ancestor"], "analysis": "wild ancestors（野生祖先）。"},
      {"sentence": "New potatoes can ___ the enzyme that causes browning.", "answer": "inhibit", "analysis": "inhibit the enzyme（抑制酶）。"},
      {"sentence": "Farmers use ___ methods to choose the best plants.", "answer": "selective", "analysis": "selective methods（有选择的方法）。"},
      {"sentence": "It takes time for seeds to ___ into mature plants.", "answer": "develop", "analysis": "develop into（发展成）。"},
      {"sentence": "CRISPR can change the DNA of an ___.", "answer": "organism", "analysis": "organism（生物体）。"},
      {"sentence": "Flavor is one important ___ scientists study with AI.", "answer": "trait", "analysis": "trait（性状/特征）。"}
    ]
  },
  "unscramble": [
    {"letters": "e n e g", "answer": "gene", "hint": "基因"},
    {"letters": "d e v e l o p", "answer": "develop", "hint": "发展；发育"},
    {"letters": "e s t i m a t e", "answer": "estimate", "hint": "估计"},
    {"letters": "t r a i t", "answer": "trait", "hint": "特征"},
    {"letters": "i n h i b i t", "answer": "inhibit", "hint": "抑制"},
    {"letters": "e n z y m e", "answer": "enzyme", "hint": "酶"},
  ],
  "first_letter": [
    {"before": "Thousands of years of ", "letter": "s", "after": " breeding has changed fruits over thousands of years.", "answer": "selective", "analysis": "Selective breeding 选择性育种。"},
    {"before": "", "letter": "a", "after": " of today's fruits were much smaller.", "answer": "ancestors", "analysis": "Ancestors 祖先。"},
    {"before": "", "letter": "p", "after": " editing genes is faster than old methods.", "answer": "precisely", "analysis": "Precisely 精确地。"},
    {"before": "", "letter": "o", "after": " of well-adapted plants survive in nature.", "answer": "offspring", "analysis": "Offspring 后代。"},
    {"before": "", "letter": "t", "after": " like CRISPR is popular in labs.", "answer": "technique", "analysis": "Technique 技术。"},
    {"before": "Pairwise ", "letter": "e", "after": " that seedless berries will sell well.", "answer": "estimates", "analysis": "Estimates 估计（第三人称单数）。"},
  ],
  "reading_cloze": {
    "passage": "Scientists are using new tools to improve fruits. ___[1] editing is a method that lets scientists change plant DNA. Unlike ___[2] selection done by humans over thousands of years, modern tools work more quickly and ___[3]. Some companies are even using AI to study flavor ___[4]. In stores, only a few edited fruits have gone on ___[5] because trees need years to bear fruit. Still, experts ___[6] that better fruits may encourage people to eat more of them.",
    "questions": [
      {"num": 1, "options": ["Gene","Seed","Root"], "answer": "Gene", "analysis": "Gene editing 基因编辑。"},
      {"num": 2, "options": ["natural","selective","random"], "answer": "selective", "analysis": "与 gene editing 对比的是 selective breeding/selection。"},
      {"num": 3, "options": ["slowly","precisely","rarely"], "answer": "precisely", "analysis": "现代工具更快更精确。"},
      {"num": 4, "options": ["traits","prices","colors"], "answer": "traits", "analysis": "flavor traits 风味性状。"},
      {"num": 5, "options": ["sale","stage","screen"], "answer": "sale", "analysis": "go on sale 上市。"},
      {"num": 6, "options": ["estimate","ignore","refuse"], "answer": "estimate", "analysis": "experts estimate that... 专家估计……"}
    ]
  },
  "comprehension": [
    {"q": "Which statement summarizes the section \"Ready To Eat?\"?", "options": [
      "CRISPR has not yet been used to edit genes of any fruits on sale in stores.",
      "Seedless blackberries are common, but they are not as popular as easy-peel mandarins.",
      "Most fruit takes a long time to grow, and both apple and peach trees can take several years to begin bearing fruit.",
      "Only a few fruits with edited genes are on sale, but companies believe when more of these fruits go on sale people will eat more fruit."
    ], "answer": 3, "analysis": "D选项正确：少数基因编辑水果已上市，公司相信更多上市后人们会吃更多水果。"},
    {"q": "Which sentence from the article helps the reader understand how people have grown fruit to their tastes?", "options": [
      "About 12,000 years ago, humans stopped being hunter-gatherers.",
      "They picked the plants that bore the tastiest fruits or vegetables and bred them to create new plants.",
      "Chemical reactions are when substances change into new substances.",
      "That's because an enzyme called polyphenol oxidase reacts with the oxygen in the air in a process that causes browning."
    ], "answer": 1, "analysis": "B直接说明人类挑选最美味者并培育出新植物。"},
    {"q": "Read the paragraph from the section \"Changing Fruits.\" Computer software like artificial intelligence (AI) is also helping scientists design fruit. With AI, computers and machines can learn and solve problems using information. Using AI, scientists are able to discover more about certain traits, such as the chemicals that generate flavor. What conclusion can the reader make?", "options": [
      "AI can teach scientists new things about fruits.",
      "Scientists think designing fruit is too complex for AI.",
      "AI can only design fruits that have certain chemical traits.",
      "Computers and machines have trouble understanding chemicals."
    ], "answer": 0, "analysis": "A正确：AI帮助科学家发现更多关于水果性状（如产生风味的化学物质）的信息。"},
    {"q": "What is the main idea of the article?", "options": [
      "Avocados turn brown if they are cut in two.",
      "Scientists are making new fruits using gene editing.",
      "Some blackberries have seeds, but others are seedless.",
      "People stopped traveling to find food about 12,000 years ago."
    ], "answer": 1, "analysis": "B是全文主旨：科学家正利用基因编辑制造新水果。"}
  ]
}

graphic_organizer = {
  "title": "A Basket of New Fruit Varieties — Text Structure",
  "sections": [
    {"heading": "Main Idea", "content": "Scientists are using gene editing (CRISPR) and AI to create new fruit varieties that are tastier, more appealing, and longer-lasting."},
    {"heading": "Section 1: Introduction", "content": "Pairwise uses gene editing to develop seedless blackberries by changing plant DNA."},
    {"heading": "Section 2: Changing Fruits (History)", "content": "Humans have changed fruits through selective/artificial breeding over thousands of years, unlike natural selection."},
    {"heading": "Section 3: Changing Fruits (Modern Tech)", "content": "CRISPR and AI allow faster, more precise changes than traditional breeding."},
    {"heading": "Section 4: Slowing Reactions", "content": "Scientists slow enzyme reactions to prevent browning and extend shelf life (e.g., avocados, mushrooms, potatoes)."},
    {"heading": "Section 5: Ready To Eat?", "content": "Few gene-edited fruits are on sale yet because fruit takes long to grow; companies hope more products will increase fruit consumption."}
  ]
}

data = {
  "title": "A Basket of New Fruit Varieties",
  "title_full": "A basket of new fruit varieties is coming your way",
  "subtitle": "Gene Editing & the Future of Fruit — Reading Courseware",
  "level": "860L",
  "word_count": 573,
  "source": "By The Economist, adapted by Newsela staff on 05.11.26",
  "article_lead": article_lead,
  "article_full": article_full,
  "vocabulary": vocabulary,
  "phrases": phrases,
  "patterns": patterns,
  "all_vocab_items": vocabulary + phrases + patterns,
  "paragraphs": paragraphs,
  "all_sentences": all_sentences,
  "quiz": quiz,
  "graphic_organizer": graphic_organizer,
  "comprehension_questions": quiz["comprehension"]
}

path = os.path.join(base, "course-data.json")
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

js_path = os.path.join(base, "..", "js", "course-data.js")
with open(js_path, "w", encoding="utf-8") as f:
    f.write("window.COURSE_DATA = ")
    json.dump(data, f, ensure_ascii=False)
    f.write(";\n")

print("OK json", os.path.getsize(path), "js", os.path.getsize(js_path))
