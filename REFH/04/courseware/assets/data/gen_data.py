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
word("geography","n.","A2","The study of the Earth's physical features and how people live in different places.","地理；地理环境",
 "In the past, the landscapes affected how people lived in ancient China.",
 "在过去，地貌影响了古代中国人的生活方式。",
 "Geography helps us understand why cities grow near rivers.","地理帮助我们理解城市为何沿河发展。",
 "The geography of the region includes mountains, rivers, and plains.","该地区的地理包括山脉、河流和平原。",
 ["terrain","landforms"], ["geographic (adj.)","geographer (n.)"], "physical geography 自然地理"),
word("agriculture","n.","A2","The practice of farming; growing crops and raising animals for food.","农业；农耕",
 "This link between water and agriculture, or farming, is important to our understanding of how life was long ago in China.",
 "水与农业（即耕作）之间的联系，对于我们理解古代中国的生活非常重要。",
 "Agriculture is the main industry in this rural area.","农业是这个农村地区的主要产业。",
 "Modern agriculture uses technology to grow more food with less water.","现代农业利用技术以更少的用水种植更多粮食。",
 ["farming","cultivation"], ["agricultural (adj.)"], "ancient agriculture 古代农业"),
word("landscape","n.","A2","All the visible features of an area of land, such as mountains, rivers, and fields.","地貌；景观",
 "In the past, the landscapes affected how people lived in ancient China.",
 "在过去，地貌影响了古代中国人的生活方式。",
 "The mountain landscape attracts many tourists every year.","山地景观每年吸引大量游客。",
 "Different landscapes require different ways of farming.","不同的地貌需要不同的耕作方式。",
 ["scenery","terrain"], ["landscaping (n.)"], "natural landscape 自然景观"),
word("citizen","n.","A2","A person who legally belongs to a country and has rights there.","公民；居民",
 "The land and water helped citizens find excellent spots to build homes and plant crops.",
 "土地和水帮助居民找到建造房屋和种植作物的绝佳地点。",
 "Every citizen should follow the laws of the country.","每位公民都应遵守国家法律。",
 "Citizens in ancient times depended on rivers for daily life.","古代居民依赖河流维持日常生活。",
 ["resident","inhabitant"], ["citizenship (n.)"], "local citizens 当地居民"),
word("crop","n.","A2","A plant grown in large amounts for food, such as rice or wheat.","作物；庄稼",
 "Farms and towns developed where the land was flat and next to water.",
 "土地平坦且临水的地区发展出了农场和城镇。",
 "Rice is an important crop in southern China.","水稻是中国南方的重要作物。",
 "Farmers rotate crops to keep the soil healthy.","农民轮种作物以保持土壤健康。",
 ["harvest","produce"], ["crop (v.)"], "plant crops 种植作物"),
word("significant","adj.","B1","Important or large enough to be noticed; having meaning.","重要的；显著的",
 "In ancient China, big rivers like the Yangtze and the Yellow River were significant.",
 "在古代中国，长江和黄河等大型河流非常重要。",
 "There is a significant difference between the two plans.","这两个计划之间有显著差异。",
 "Climate change has had a significant impact on agriculture.","气候变化对农业产生了重大影响。",
 ["important","notable","major"], ["significance (n.)","significantly (adv.)"], "highly significant 非常重要"),
word("climate","n.","A2","The typical weather conditions in an area over a long period.","气候",
 "This mix of rivers, mountains, and climate helped people pick where to live and how to use the land well.",
 "河流、山脉与气候的结合帮助人们选择居住地并更好地利用土地。",
 "The climate in the north is colder and drier than in the south.","北方气候比南方更冷、更干燥。",
 "Farmers must adapt their crops to the local climate.","农民必须使作物适应当地气候。",
 ["weather pattern"], ["climatic (adj.)"], "hot and wet climate 湿热气候"),
word("irrigation","n.","B1","The process of supplying water to land to help crops grow.","灌溉",
 "Irrigation of water helped the farmers grow abundant (lots of) food for all the people.",
 "引水灌溉帮助农民为所有人种植大量粮食。",
 "Irrigation systems bring river water to dry fields.","灌溉系统将河水引到干旱的田地。",
 "Without irrigation, farming would be impossible in this desert area.","没有灌溉，在这片沙漠地区耕作是不可能的。",
 ["watering"], ["irrigate (v.)"], "irrigation system 灌溉系统"),
word("abundant","adj.","B1","Existing in large quantities; more than enough.","丰富的；充足的",
 "Irrigation of water helped the farmers grow abundant (lots of) food for all the people.",
 "引水灌溉帮助农民为所有人种植大量粮食。",
 "The region has abundant natural resources.","该地区拥有丰富的自然资源。",
 "After good rains, the harvest was abundant.","雨水充沛后，收成非常丰富。",
 ["plentiful","ample"], ["abundance (n.)","abundantly (adv.)"], "abundant food 充足的食物"),
word("pivotal","adj.","B2","Very important; central to the success or development of something.","关键的；核心的",
 "These excellent agriculture choices were pivotal, or important, to helping towns and cities get big.",
 "这些出色的农业选择对于城镇的发展至关重要。",
 "Education plays a pivotal role in a nation's development.","教育在国家发展中起着关键作用。",
 "The invention of irrigation was pivotal to early civilization.","灌溉的发明对早期文明至关重要。",
 ["crucial","key","central"], ["pivot (n.)"], "pivotal to... 对……至关重要"),
word("construction","n.","B1","The process of building something, such as homes or roads.","建造；建设",
 "Geography affected agriculture in ancient China. The land and the rivers helped people know where to start construction on homes and grow food.",
 "地理影响了古代中国的农业。土地和河流帮助人们知道在哪里建造房屋和种植粮食。",
 "The construction of the new bridge took two years.","新桥的建造花了两年时间。",
 "They chose a flat area near the river for construction.","他们选择了河边平坦的地区进行建设。",
 ["building"], ["construct (v.)","constructive (adj.)"], "start construction 开始建造"),
word("expand","v.","B1","To become larger in size, number, or importance.","扩张；扩大",
 "This abundance, or plenty, of food helped towns expand, shaping a rich culture.",
 "充足的食物帮助城镇扩张，塑造了丰富的文化。",
 "The city continued to expand along the river.","城市沿着河流不断扩张。",
 "Trade helped ancient towns expand and become wealthy.","贸易帮助古代城镇扩张并变得富裕。",
 ["grow","spread","enlarge"], ["expansion (n.)"], "towns expand 城镇扩张"),
word("excellent","adj.","A2","Extremely good; of very high quality.","优秀的；极好的",
 "The land and water helped citizens find excellent spots to build homes and plant crops.",
 "土地和水帮助居民找到建造房屋和种植作物的绝佳地点。",
 "She is an excellent student in our class.","她是我们班上非常优秀的学生。",
 "The soil near the river was excellent for growing rice.","河边的土壤非常适合种水稻。",
 ["great","outstanding","superb"], ["excellence (n.)"], "excellent spots 绝佳地点"),
word("develop","v.","A2","To grow or cause to grow gradually; to build or create something over time.","发展；开发",
 "Farms and towns developed where the land was flat and next to water.",
 "土地平坦且临水的地区发展出了农场和城镇。",
 "Small villages developed into large cities over centuries.","小村庄在数百年间发展成了大城市。",
 "Communities develop near sources of fresh water.","社区在淡水水源附近发展起来。",
 ["grow","form","build"], ["development (n.)","developer (n.)"], "towns developed 城镇发展起来"),
word("successful","adj.","A2","Achieving the results wanted; doing well.","成功的",
 "Rice farmers have been successful in the area for the last 10,000 years.",
 "水稻种植者在该地区已成功耕作了一万年。",
 "The project was successful because everyone worked together.","项目很成功，因为大家齐心协力。",
 "Successful farming depends on good land and enough water.","成功的耕作依赖于良好的土地和充足的水源。",
 ["effective","prosperous"], ["success (n.)","successfully (adv.)"], "be successful in 在……方面成功"),
word("millet","n.","B2","A type of grain grown as food, especially in dry areas.","小米；粟",
 "In the drier north, they planted millet and wheat.",
 "在较干燥的北方，人们种植小米和小麦。",
 "Millet was one of the earliest crops in northern China.","小米是中国北方最早的作物之一。",
 "Ancient farmers stored millet in small huts on the farm.","古代农民把小米储存在农场的小棚屋里。",
 ["grain"], ["millet (uncountable)"], "plant millet 种植小米"),
word("wheat","n.","A2","A plant whose grain is used to make flour and bread.","小麦",
 "In the drier north, they planted millet and wheat.",
 "在较干燥的北方，人们种植小米和小麦。",
 "Wheat grows well in cool, dry climates.","小麦在凉爽干燥的气候中生长良好。",
 "Bread made from wheat became a staple food in the north.","用小麦做的面包成为北方的主食。",
 ["grain"], ["wheaten (adj.)"], "wheat fields 麦田"),
word("abundance","n.","B1","A very large quantity of something; plenty.","丰富；充裕",
 "This abundance, or plenty, of food helped towns expand, shaping a rich culture.",
 "充足的食物帮助城镇扩张，塑造了丰富的文化。",
 "The abundance of fish in the river supported many families.","河中丰富的鱼类养活了许多家庭。",
 "An abundance of crops meant people could do more than farm.","充裕的粮食意味着人们可以从事农耕以外的工作。",
 ["plenty","wealth"], ["abundant (adj.)"], "an abundance of 大量的"),
word("trade","n./v.","A2","The activity of buying and selling goods; to exchange goods.","贸易；交易",
 "This helped make rich culture, arts, and trade in China.",
 "这有助于形成中国丰富的文化、艺术和贸易。",
 "Ancient China was famous for trade along the Silk Road.","古代中国以丝绸之路上的贸易闻名。",
 "As towns grew, trade between regions increased.","随着城镇发展，地区间贸易增加。",
 ["commerce","exchange"], ["trader (n.)","trading (n.)"], "arts and trade 艺术与贸易"),
word("culture","n.","A2","The ideas, customs, art, and social organization of a particular group or society.","文化",
 "This helped make rich culture, arts, and trade in China.",
 "这有助于形成中国丰富的文化、艺术和贸易。",
 "Chinese culture has a history of thousands of years.","中国文化已有数千年的历史。",
 "Farming success allowed people to develop arts and culture.","农业的成功使人们能够发展艺术与文化。",
 ["civilization","heritage"], ["cultural (adj.)","culturally (adv.)"], "rich culture 丰富的文化"),
]

phrases = [
phrase("ancient China","noun phrase","China in the distant past, before modern times.","古代中国",
 "In the past, the landscapes affected how people lived in ancient China.",
 "在过去，地貌影响了古代中国人的生活方式。",
 "Ancient China developed early farming along major rivers.","古代中国在主要河流沿岸发展了早期农业。",
 "Historians study how geography shaped life in ancient China.","历史学家研究地理如何塑造古代中国的生活。",
 ["old China"], "life in ancient China"),
phrase("fresh water","noun phrase","Water that is not salty, suitable for drinking and farming.","淡水",
 "Even today, these rivers bring fresh water to the land and make the land excellent for crops.",
 "即使在今天，这些河流仍为土地带来淡水，使土地非常适合种植作物。",
 "Fresh water is essential for farming and daily life.","淡水对耕作和日常生活至关重要。",
 "Rivers provide fresh water to fields through irrigation.","河流通过灌溉为田地提供淡水。",
 ["clean water"], "bring fresh water to the land"),
phrase("plant crops","verb phrase","To grow plants such as rice or wheat for food.","种植作物",
 "The land and water helped citizens find excellent spots to build homes and plant crops.",
 "土地和水帮助居民找到建造房屋和种植作物的绝佳地点。",
 "Farmers plant crops in spring and harvest in autumn.","农民春天播种，秋天收获。",
 "People plant crops where soil and water are suitable.","人们在土壤和水源适宜的地方种植作物。",
 ["grow crops","cultivate"], "build homes and plant crops"),
phrase("link between ... and ...","noun phrase","A connection or relationship between two things.","……与……之间的联系",
 "This link between water and agriculture, or farming, is important to our understanding of how life was long ago in China.",
 "水与农业（即耕作）之间的联系，对于我们理解古代中国的生活非常重要。",
 "There is a close link between climate and farming methods.","气候与耕作方式之间有着密切联系。",
 "The link between geography and culture is strong in this region.","在该地区，地理与文化之间的联系非常紧密。",
 ["connection between"], "link between water and agriculture"),
phrase("big rivers","noun phrase","Very large and important rivers in a region.","大江大河",
 "In ancient China, big rivers like the Yangtze and the Yellow River were significant.",
 "在古代中国，长江和黄河等大型河流非常重要。",
 "Big rivers provide water for cities and farms.","大江大河为城市和农场提供水源。",
 "Life in ancient China centered around big rivers.","古代中国的生活围绕大江大河展开。",
 ["major rivers"], "the Yangtze and the Yellow River"),
phrase("hot and wet","adj phrase","Describing a climate that is warm and receives a lot of rain.","湿热",
 "The land was hot and wet in the south and chilly and dry in the north.",
 "南方土地湿热，北方则寒冷干燥。",
 "Rice grows well in hot and wet conditions.","水稻在湿热条件下生长良好。",
 "The south has a hot and wet climate suitable for paddies.","南方气候湿热，适合稻田。",
 ["humid and warm"], "hot and wet in the south"),
phrase("chilly and dry","adj phrase","Describing a climate that is cold and has little rain.","寒冷干燥",
 "The land was hot and wet in the south and chilly and dry in the north.",
 "南方土地湿热，北方则寒冷干燥。",
 "Millet grows better in chilly and dry northern areas.","小米在寒冷干燥的北方地区生长更好。",
 "Northern farmers adapted to a chilly and dry climate.","北方农民适应了寒冷干燥的气候。",
 ["cold and arid"], "chilly and dry in the north"),
phrase("fit the land","verb phrase","To match or suit the natural conditions of an area.","适应土地；因地制宜",
 "The farms were made to fit the land and the weather.",
 "农场因地制宜，适应土地和天气。",
 "Houses were built to fit the land near the river.","房屋建在河边，因地制宜。",
 "Successful farmers learn to fit the land and the weather.","成功的农民学会因地制宜、顺应天气。",
 ["suit the terrain"], "made to fit the land"),
phrase("keep tools and seeds safe","verb phrase","To store farming equipment and seeds in a protected place.","妥善保管农具和种子",
 "Many small huts were built on farms to keep tools and seeds safe.",
 "农场里建了许多小棚屋，用来妥善保管农具和种子。",
 "Farmers built sheds to keep tools and seeds safe from rain.","农民搭建棚屋，防止农具和种子被雨淋坏。",
 "Small huts helped keep tools and seeds safe during winter.","小棚屋帮助人们在冬季保管农具和种子。",
 ["store tools and seeds"], "on farms to keep tools safe"),
phrase("send water from the river to dry land","verb phrase","To move water from a river to fields that need it; irrigation.","把河水引到旱地",
 "Irrigation is a way to send water from the river to dry land.",
 "灌溉是把河水引到旱地的一种方式。",
 "Canals send water from the river to dry land.","水渠把河水引到旱地。",
 "Ancient farmers learned to send water from the river to dry land.","古代农民学会了把河水引到旱地。",
 ["channel river water"], "irrigation: send water to dry land"),
phrase("work the land","verb phrase","To farm; to cultivate soil for growing crops.","耕种；务农",
 "Farming gave food to many and made it possible for people to do more than just work the land.",
 "农业为许多人提供了食物，使人们能够从事耕种以外的工作。",
 "Most families in the village worked the land for a living.","村里大多数家庭以务农为生。",
 "As cities grew, fewer people had to work the land full-time.","随着城市发展，越来越少的人需要全职务农。",
 ["farm the land","till the soil"], "more than just work the land"),
phrase("rich culture","adj phrase","A society with developed arts, ideas, and traditions.","丰富的文化",
 "This helped make rich culture, arts, and trade in China.",
 "这有助于形成中国丰富的文化、艺术和贸易。",
 "A rich culture grew as cities expanded along the rivers.","随着城市沿河扩张，丰富的文化逐渐形成。",
 "Food surplus supported a rich culture of arts and learning.","粮食盈余支撑了丰富的艺术与文化。",
 ["flourishing culture"], "rich culture, arts, and trade"),
phrase("long coasts","noun phrase","Extended areas where land meets the sea.","漫长的海岸线",
 "They have long coasts, and because of their size, they have many different landscapes.",
 "它们拥有漫长的海岸线，而且由于国土辽阔，地貌多样。",
 "Countries with long coasts often develop fishing and trade.","拥有漫长海岸线的国家往往发展渔业和贸易。",
 "China and the U.S. both have long coasts on opposite sides of the world.","中国和美国在世界两端都拥有漫长的海岸线。",
 ["extensive coastline"], "have long coasts"),
phrase("grow as ... were picked","verb phrase","To increase in size or number as more crops were harvested.","随着……收获而发展",
 "Places like Nanjing and Shanghai grew as more and more crops were picked.",
 "随着越来越多的作物被收获，南京、上海等地方不断发展壮大。",
 "Towns grew as more crops were picked and trade increased.","随着更多作物收获和贸易增加，城镇不断发展。",
 "Cities grew as farmers picked more abundant harvests.","随着农民收获更丰富的庄稼，城市不断发展。",
 ["expand with harvests"], "grew as crops were picked"),
phrase("shaping a rich culture","verb phrase","To influence and form a developed society with arts and traditions.","塑造丰富的文化",
 "This abundance, or plenty, of food helped towns expand, shaping a rich culture.",
 "充足的食物帮助城镇扩张，塑造了丰富的文化。",
 "Geography played a role in shaping a rich culture along the rivers.","地理在塑造沿河地区的丰富文化中发挥了作用。",
 "Successful agriculture was key to shaping a rich culture in ancient China.","成功的农业是塑造古代中国丰富文化的关键。",
 ["forming a civilization"], "expand, shaping a rich culture"),
]

patterns = [
pattern("... is important to our understanding of ...","Used to show why something matters for learning about a topic.","……对于我们理解……非常重要",
 "This link between water and agriculture, or farming, is important to our understanding of how life was long ago in China.",
 "水与农业（即耕作）之间的联系，对于我们理解古代中国的生活非常重要。",
 "Maps are important to our understanding of world geography.","地图对于我们理解世界地理非常重要。",
 "Climate data is important to our understanding of farming choices.","气候数据对于我们理解农业选择非常重要。",
 "important to our understanding of how/why..."),
pattern("This mix of ... helped people ...","Shows how several factors together influenced human choices.","……的组合帮助人们……",
 "This mix of rivers, mountains, and climate helped people pick where to live and how to use the land well.",
 "河流、山脉与气候的结合帮助人们选择居住地并更好地利用土地。",
 "This mix of sun and rain helped people grow better crops.","阳光与雨水的结合帮助人们种出更好的庄稼。",
 "A mix of trade and farming helped people build larger towns.","贸易与农业的结合帮助人们建设更大的城镇。",
 "This mix of A, B, and C helped people..."),
pattern("... was a big chunk of life in ...","Emphasizes that something was a major part of daily life in a place or time.","……是……生活中很重要的一部分",
 "Farming was a big chunk of life in ancient China.",
 "农业是古代中国人生活中很重要的一部分。",
 "Fishing was a big chunk of life in coastal villages.","捕鱼是沿海村庄生活中很重要的一部分。",
 "Trade was a big chunk of life in growing cities along the river.","贸易是沿河发展城市中生活中很重要的一部分。",
 "a big chunk of life in ancient/modern..."),
pattern("... gave food to many and made it possible for people to ...","Shows how agriculture provided food and enabled other activities.","……为许多人提供食物，使人们能够……",
 "Farming gave food to many and made it possible for people to do more than just work the land.",
 "农业为许多人提供了食物，使人们能够从事耕种以外的工作。",
 "The harvest gave food to many and made it possible for people to celebrate festivals.","收成养活了许多人，使人们能够庆祝节日。",
 "Irrigation gave food to many and made it possible for people to live in drier areas.","灌溉养活了许多人，使人们能够在更干旱的地区生活。",
 "gave food to many and made it possible for people to do more than..."),
pattern("... affected ... in ancient China","Used to state how one factor influenced another in historical China.","……影响了古代中国的……",
 "Geography affected agriculture in ancient China.",
 "地理影响了古代中国的农业。",
 "Climate affected crop choices in ancient China.","气候影响了古代中国的作物选择。",
 "Rivers affected where towns developed in ancient China.","河流影响了古代中国城镇的发展位置。",
 "Geography/Climate/Rivers affected ... in ancient China"),
]

paragraphs = [
{"id":1,"title":"Opening","section_heading":"","image":"section1-intro.png","sentences":[
"China is on the opposite half of the world, but it is still a bit similar to the United States.",
"They are about the same size.",
"They have long coasts, and because of their size, they have many different landscapes.",
"In the past, the landscapes affected how people lived in ancient China.",
"The land and water helped citizens find excellent spots to build homes and plant crops.",
"Farms and towns developed where the land was flat and next to water.",
"This link between water and agriculture, or farming, is important to our understanding of how life was long ago in China.",
"In ancient China, big rivers like the Yangtze and the Yellow River were significant.",
"Even today, these rivers bring fresh water to the land and make the land excellent for crops."],
"socratic":[
{"q":"How is China similar to the United States according to the opening?","a":"They are about the same size and both have long coasts and many different landscapes."},
{"q":"Why did farms and towns develop near flat land next to water?","a":"Because the land and water helped people find good places to build homes and plant crops; flat land near water is ideal for farming."},
{"q":"Why are the Yangtze and Yellow River described as significant?","a":"They brought fresh water to the land and made the land excellent for growing crops, which was vital for life in ancient China."}]},
{"id":2,"title":"Geography & Climate","section_heading":"Geography & Climate","image":"section2-geography.png","sentences":[
"High mountains and hills made it hard to live in some areas of China.",
"The land was hot and wet in the south and chilly and dry in the north.",
"This mix of rivers, mountains, and climate helped people pick where to live and how to use the land well."],
"socratic":[
{"q":"How did mountains and hills affect where people could live?","a":"High mountains and hills made some areas hard to live in, so people chose flatter, more accessible places."},
{"q":"What is the difference between southern and northern climate in China?","a":"The south was hot and wet; the north was chilly and dry."},
{"q":"How did geography help people decide how to use the land?","a":"The mix of rivers, mountains, and climate guided people on where to live and how to farm in different regions."}]},
{"id":3,"title":"Farming in the South and North","section_heading":"Farming in the South and North","image":"section3-farming.png","sentences":[
"Farming was a big chunk of life in ancient China.",
"In the south, where the land was wet, people planted important crops like rice near the water.",
"Rice farmers have been successful in the area for the last 10,000 years.",
"The rice has helped China feed lots of humans.",
"In the drier north, they planted millet and wheat.",
"The farms were made to fit the land and the weather.",
"Many small huts were built on farms to keep tools and seeds safe.",
"Irrigation of water helped the farmers grow abundant (lots of) food for all the people.",
"Irrigation is a way to send water from the river to dry land."],
"socratic":[
{"q":"What crops did people grow in the wet south versus the dry north?","a":"In the wet south they planted rice near water; in the drier north they planted millet and wheat."},
{"q":"What is irrigation and why was it important?","a":"Irrigation sends water from rivers to dry land, helping farmers grow abundant food for many people."},
{"q":"How long have rice farmers been successful in southern China?","a":"For about the last 10,000 years."}]},
{"id":4,"title":"Cities, Culture & Trade","section_heading":"Cities, Culture & Trade","image":"section4-cities.png","sentences":[
"These excellent agriculture choices were pivotal, or important, to helping towns and cities get big.",
"Places like Nanjing and Shanghai grew as more and more crops were picked.",
"Farming gave food to many and made it possible for people to do more than just work the land.",
"This helped make rich culture, arts, and trade in China."],
"socratic":[
{"q":"How did successful farming help cities grow?","a":"Agriculture choices were pivotal to towns and cities getting bigger; places like Nanjing and Shanghai grew as more crops were harvested."},
{"q":"Besides farming, what did people have time to develop because of food surplus?","a":"Rich culture, arts, and trade."},
{"q":"What does 'pivotal' mean in this paragraph?","a":"Very important; central to helping towns and cities grow large."}]},
{"id":5,"title":"Conclusion","section_heading":"Conclusion","image":"section5-summary.png","sentences":[
"Geography affected agriculture in ancient China.",
"The land and the rivers helped people know where to start construction on homes and grow food.",
"This abundance, or plenty, of food helped towns expand, shaping a rich culture."],
"socratic":[
{"q":"What is the main relationship the conclusion emphasizes?","a":"Geography affected agriculture—land and rivers guided where people built homes and grew food."},
{"q":"How did an abundance of food shape Chinese society?","a":"It helped towns expand and contributed to shaping a rich culture."},
{"q":"Can you summarize the article in one sentence?","a":"In ancient China, geography and rivers shaped where and how people farmed, which fed growing towns and a rich culture."}]},
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
    "China is on the opposite half of the world, but it is still a bit similar to the United States. "
    "In the past, the landscapes affected how people lived in ancient China—and the link between water and agriculture "
    "is key to understanding life long ago along rivers like the Yangtze and the Yellow River."
)

quiz = {
  "spelling": [
    {"hint_cn": "地理", "hint_en": "The study of Earth's features and how people live in places.", "answer": "geography"},
    {"hint_cn": "农业", "hint_en": "Farming; growing crops for food.", "answer": "agriculture"},
    {"hint_cn": "气候", "hint_en": "Typical weather in an area over a long time.", "answer": "climate"},
    {"hint_cn": "灌溉", "hint_en": "Supplying water to land for crops.", "answer": "irrigation"},
    {"hint_cn": "丰富的", "hint_en": "Existing in large quantities; plenty.", "answer": "abundant"},
    {"hint_cn": "关键的", "hint_en": "Very important; central to success.", "answer": "pivotal"},
    {"hint_cn": "扩张", "hint_en": "To become larger in size or importance.", "answer": "expand"},
    {"hint_cn": "文化", "hint_en": "Ideas, customs, and arts of a society.", "answer": "culture"},
  ],
  "word_selection": {
    "bank": ["geography","irrigation","abundant","climate","significant","develop","successful","expand"],
    "items": [
      {"sentence": "In ancient China, ___ shaped where people lived and farmed.", "answer": "geography", "analysis": "geography（地理）影响居住与耕作地点。"},
      {"sentence": "___ brings river water to dry fields for crops.", "answer": "irrigation", "analysis": "irrigation（灌溉）引水浇田。"},
      {"sentence": "Farmers grew ___ harvests with help from rivers.", "answer": "abundant", "analysis": "abundant（丰富的）修饰收成。"},
      {"sentence": "The south was hot and wet, but northern ___ was chilly and dry.", "answer": "climate", "analysis": "northern climate（北方气候）。"},
      {"sentence": "The Yangtze and Yellow River were ___ to ancient life.", "answer": "significant", "analysis": "significant（重要的）。"},
      {"sentence": "Towns ___ where land was flat and near water.", "answer": "developed", "answer_alt": ["develop"], "analysis": "towns developed（城镇发展起来）。"},
      {"sentence": "Rice farmers have been ___ for thousands of years.", "answer": "successful", "analysis": "been successful（一直很成功）。"},
      {"sentence": "Food surplus helped towns ___ and grow.", "answer": "expand", "analysis": "towns expand（城镇扩张）。"}
    ]
  },
  "unscramble": [
    {"letters": "c r o p", "answer": "crop", "hint": "作物"},
    {"letters": "t r a d e", "answer": "trade", "hint": "贸易"},
    {"letters": "w h e a t", "answer": "wheat", "hint": "小麦"},
    {"letters": "m i l l e t", "answer": "millet", "hint": "小米"},
    {"letters": "e x p a n d", "answer": "expand", "hint": "扩张"},
    {"letters": "c l i m a t e", "answer": "climate", "hint": "气候"},
  ],
  "first_letter": [
    {"before": "The link between water and ", "letter": "a", "after": " is important to understanding ancient China.", "answer": "agriculture", "analysis": "Agriculture 农业。"},
    {"before": "", "letter": "i", "after": " sends water from rivers to dry land.", "answer": "irrigation", "analysis": "Irrigation 灌溉。"},
    {"before": "Rice farmers have been ", "letter": "s", "after": " for about 10,000 years.", "answer": "successful", "analysis": "Successful 成功的。"},
    {"before": "Food helped towns ", "letter": "e", "after": " and shape rich culture.", "answer": "expand", "analysis": "Expand 扩张。"},
    {"before": "In the north they planted millet and ", "letter": "w", "after": ".", "answer": "wheat", "analysis": "Wheat 小麦。"},
    {"before": "These rivers were ", "letter": "s", "after": " to ancient Chinese life.", "answer": "significant", "analysis": "Significant 重要的。"},
  ],
  "reading_cloze": {
    "passage": "In ancient China, ___ [1] and rivers shaped daily life. The south was hot and wet, so farmers planted rice near water. In the north, the ___ [2] was chilly and dry, and people grew millet and wheat. ___ [3] helped send river water to dry fields. With abundant food, towns like Nanjing and Shanghai began to ___ [4]. Farming was ___ [5] to helping cities grow and supporting rich ___ [6] and trade.",
    "questions": [
      {"num": 1, "options": ["geography","music","sports"], "answer": "geography", "analysis": "地理与河流共同塑造生活。"},
      {"num": 2, "options": ["climate","ocean","forest"], "answer": "climate", "analysis": "北方气候寒冷干燥。"},
      {"num": 3, "options": ["Irrigation","Decoration","Vacation"], "answer": "Irrigation", "analysis": "灌溉引水浇田。"},
      {"num": 4, "options": ["expand","shrink","disappear"], "answer": "expand", "analysis": "城镇扩张。"},
      {"num": 5, "options": ["pivotal","tiny","silent"], "answer": "pivotal", "analysis": "农业对城市发展至关重要。"},
      {"num": 6, "options": ["culture","weather","noise"], "answer": "culture", "analysis": "丰富的文化与贸易。"}
    ]
  },
  "comprehension": [
    {"q": "According to the opening, how is China similar to the United States?", "options": [
      "They are on the same half of the world and have no coasts.",
      "They are about the same size and have long coasts and varied landscapes.",
      "They both have only mountains and no rivers.",
      "They are much smaller than each other and have the same climate everywhere."
    ], "answer": 1, "analysis": "B正确：两国面积相近，有漫长海岸线和多样地貌。"},
    {"q": "What crops were grown in the wet south versus the drier north?", "options": [
      "Rice in the south; millet and wheat in the north.",
      "Wheat in the south; rice only in the north.",
      "Only millet in both south and north.",
      "No crops were grown in the north because of mountains."
    ], "answer": 0, "analysis": "A正确：南方种水稻，北方种小米和小麦。"},
    {"q": "What does the article say irrigation does?", "options": [
      "It keeps tools and seeds safe in small huts.",
      "It sends water from the river to dry land to help crops grow.",
      "It makes mountains easier to climb.",
      "It stops cities like Shanghai from growing."
    ], "answer": 1, "analysis": "B正确：灌溉是把河水引到旱地。"},
    {"q": "What is the main idea of the article?", "options": [
      "Ancient China had no farming and only traded with other countries.",
      "Geography and agriculture were closely linked in ancient China, helping towns grow and culture develop.",
      "The United States and China are exactly the same in every way.",
      "Rice farming failed in China for thousands of years."
    ], "answer": 1, "analysis": "B是主旨：地理与农业紧密相连，促进城镇与文化发展。"}
  ]
}

graphic_organizer = {
  "title": "Geography and Agriculture in Ancient China — Text Structure",
  "sections": [
    {"heading": "Main Idea", "content": "Geography, rivers, and climate shaped agriculture in ancient China, which fed growing towns and a rich culture."},
    {"heading": "Section 1: Opening", "content": "China and the U.S. share size and coasts; landscapes and rivers (Yangtze, Yellow) linked water to farming and settlement."},
    {"heading": "Section 2: Geography & Climate", "content": "Mountains limited some areas; south was hot/wet, north chilly/dry—people chose where and how to use land."},
    {"heading": "Section 3: Farming", "content": "South: rice near water (10,000 years of success). North: millet and wheat. Irrigation and farm huts supported abundant food."},
    {"heading": "Section 4: Cities & Culture", "content": "Agriculture was pivotal to cities like Nanjing and Shanghai; food surplus enabled culture, arts, and trade."},
    {"heading": "Section 5: Conclusion", "content": "Geography guided construction and farming; food abundance helped towns expand and shape Chinese culture."}
  ]
}

data = {
  "title": "Geography and Agriculture in Ancient China",
  "title_full": "Geography and Agriculture in Ancient China",
  "subtitle": "Rivers, Climate & Farming — Reading Courseware",
  "level": "MAX",
  "word_count": 390,
  "source": "By Katrina Freund, Newsela staff on 06.29.25",
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
