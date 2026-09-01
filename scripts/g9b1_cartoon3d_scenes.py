# -*- coding: utf-8 -*-
"""九年级上词汇课件：每词两张达意卡通 3D 场景（无文字）。"""

STYLE = (
    "Premium 3D cartoon still, Pixar / DreamWorks quality, cute rounded characters, "
    "glossy materials, soft cinematic lighting, vibrant tasteful colors, shallow depth of field, "
    "clean uncluttered background, wholesome educational illustration for junior-high students. "
    "Absolutely no text, letters, numbers, logos, watermarks, captions, UI, or writing of any kind."
)

# word -> (scene1, scene2)  必须覆盖词表全部词条
SCENES = {
    # Unit 1 The Changing World
    "bring about": (
        "A brand-new high-speed train gliding into a cheering village, dust turning into blooming flowers along the tracks, showing change being brought about",
        "A cute inventor flipping a giant glowing switch as lights bloom across a dark valley, clearly causing a new beginning",
    ),
    "rough": (
        "A colorful jeep bouncing over a rocky dirt mountain road with stones flying",
        "A child's cartoon hands touching a jagged rough cliff face beside a smooth pebble",
    ),
    "be covered with": (
        "A hillside completely covered with bright yellow wildflowers from edge to edge",
        "A wooden picnic table covered with a thick blanket of golden sand after wind",
    ),
    "sandstorm": (
        "A towering swirling wall of orange sand racing toward a tiny desert town as people hurry indoors",
        "A camel caravan leaning into blasting sand with scarves covering faces",
    ),
    "farmland": (
        "Wide green farmland with neat crop rows, a scarecrow, and a red barn under blue sky",
        "A farmer on a small tractor harvesting golden wheat across farmland",
    ),
    "shortage": (
        "An empty wooden market stall with only one last apple while a long line of people wait",
        "A kitchen cupboard with a single grain of rice left in a glass jar",
    ),
    "lack": (
        "A thirsty cartoon deer standing on a dry cracked riverbed with no water",
        "A classroom desk with no pencils while classmates around are writing",
    ),
    "bush": (
        "A round leafy green bush with tiny berries in a sunny garden",
        "Two cartoon rabbits hiding behind a dense bush",
    ),
    "root": (
        "Thick tree roots gripping brown soil in a cutaway underground view",
        "A child gently holding a small plant with visible white roots dangling",
    ),
    "soil": (
        "A gardener's hands scooping rich dark soil in a vegetable garden",
        "Earthworms in moist brown soil among sprouting green seedlings",
    ),
    "sandy": (
        "A desert path covered with soft sand and winding footprints",
        "A beach picnic blanket sitting on sandy ground near dunes",
    ),
    "government": (
        "A friendly cartoon city hall with a flag and citizens walking in for help",
        "Officials in simple uniforms planting trees together with local people",
    ),
    "support": (
        "Teammates holding up a tired runner at the finish line, offering support",
        "Wooden beams supporting a small wooden bridge over a stream",
    ),
    "corn": (
        "Tall green corn stalks with golden ears in a sunny field",
        "A woven basket overflowing with yellow corn cobs on a farm table",
    ),
    "high-tech": (
        "A glass greenhouse where small robots water plants with glowing sensors",
        "A student using a sleek holographic tablet in a modern classroom",
    ),
    "greenhouse": (
        "A transparent greenhouse packed with tomatoes and leafy greens",
        "A gardener smiling inside a warm greenhouse while rain falls outside",
    ),
    "highway": (
        "A smooth modern highway curving through green hills with a few colorful cars",
        "A highway overpass crossing a river at golden sunset",
    ),
    "railway": (
        "A shiny railway with a red passenger train crossing a tall viaduct",
        "Workers waving as a train runs along railway tracks through farmland",
    ),
    "attraction": (
        "Tourists amazed at a turquoise lake and mountain scenic attraction",
        "Families walking toward a glowing fairy-tale castle theme-park attraction",
    ),
    "product": (
        "A factory conveyor with cute finished products like lamps and toys",
        "A shop shelf of neatly packaged farm products such as honey jars and tea tins with blank labels",
    ),
    "greatly": (
        "Split scene of a dusty village transforming into a blooming green town, greatly improved",
        "A tiny sapling beside a huge healthy tree, showing growth increased greatly",
    ),
    "socialist": (
        "Diverse neighbors sharing a big harvest meal at one long community table",
        "People of all ages building a playground together in a cooperative community",
    ),
    "e-payment": (
        "A girl tapping a phone on a store terminal to buy fruit, no cash in sight",
        "A market stall with a glowing square payment panel, a customer paying with a phone",
    ),
    "housing": (
        "A row of colorful new apartment buildings with families carrying boxes inside",
        "Cozy interior of a small city flat with a sofa, plants, and warm window light",
    ),
    "digital": (
        "A tablet displaying colorful 3D icons and photos, no readable writing",
        "Kids video-calling smiling grandparents on a digital tablet",
    ),
    "audio": (
        "Cute over-ear headphones with visible colorful sound waves, no letters",
        "A studio microphone and round speakers playing music in a cozy room",
    ),
    "dirt": (
        "Kids making mud pies with brown dirt in a garden",
        "A soccer ball covered in dirt after a match on a muddy field",
    ),
    "track": (
        "A narrow dirt track winding through green hills",
        "Railway tracks stretching toward a golden horizon",
    ),
    "wide": (
        "A very wide river with a tiny boat in the middle",
        "A wide tree-lined city avenue stretching far ahead",
    ),
    "link": (
        "Two cities connected by a glowing railway and highway link",
        "Cartoon hands linking a chain of colorful paper rings",
    ),
    "port": (
        "A busy seaport with cargo ships, cranes, and stacked containers",
        "Fishermen at a small port tying colorful boats to a wooden pier",
    ),
    "capital": (
        "A capital-city skyline with a distinctive grand building and a flag",
        "A 3D map table with a glowing star marking a capital city, no text",
    ),
    "Kenyan": (
        "A smiling Kenyan family in colorful kanga cloth near acacia trees and savanna",
        "An East African city street with pedestrians, a matatu van, and jacaranda trees, no text",
    ),
    "benefit": (
        "Students receiving new books and smiling, clearly benefiting from a gift",
        "Solar panels on village roofs lighting cozy homes at dusk, a clear benefit",
    ),
    "be happy with": (
        "A girl hugging a handmade pottery bowl, clearly happy with it",
        "Parents smiling at a child's colorful drawing on the fridge, happy with it, drawing has no letters",
    ),
    "convenient": (
        "Paying with a phone at a fruit stall, a convenient everyday purchase",
        "A compact folding bike parked by a subway entrance for a convenient commute",
    ),
    "business": (
        "A small family shop with a shopkeeper serving customers",
        "Two cartoon people shaking hands over a tea-shop counter, doing business",
    ),
    "ease": (
        "A cat stretching on a sunny windowsill in complete ease",
        "A student finishing homework with a relaxed smile, at ease",
    ),
    "with ease": (
        "A gymnast flipping on a balance beam with effortless ease",
        "A chef chopping vegetables in a blur of skill, working with ease",
    ),
    "lorry": (
        "A big colorful lorry loaded with fruit boxes on a highway",
        "A lorry driver waving from the cab at a warehouse loading dock",
    ),
    "manager": (
        "A kind store manager with a badge helping staff arrange shelves",
        "A construction manager pointing at a blank blueprint on a building site",
    ),
    "conclusion": (
        "A student placing the last puzzle piece, reaching a conclusion",
        "A team around a table nodding as a glowing lightbulb appears, a conclusion reached",
    ),
    "narrow": (
        "A very narrow alley between old houses with one bicycle squeezing through",
        "A hiker squeezing through a narrow canyon of red rocks",
    ),
    "villager": (
        "Villagers in simple clothes chatting by a stone well",
        "A villager carrying a basket of vegetables on a dirt path",
    ),
    "the Olympics": (
        "Athletes of many nations entering a stadium, five interlocking 3D rings sculpture with no writing",
        "A torch relay runner jogging through a cheering cartoon city for the Olympics",
    ),
    "lead": (
        "A team captain leading teammates up a mountain trail",
        "A conductor leading an orchestra with a baton",
    ),
    "man-made": (
        "A straight man-made canal beside a winding natural river for contrast",
        "A huge man-made dam with tiny workers and rushing water",
    ),
    "miracle": (
        "A barren desert miraculously blooming with flowers after rain",
        "Doctors smiling as a previously sick child runs and plays, a gentle miracle recovery",
    ),
    "junior": (
        "Junior-high students with backpacks entering school gates",
        "A junior kids' soccer team playing beside taller older players",
    ),
    "flat": (
        "A cozy city flat with a balcony full of plants",
        "Moving boxes in a new flat living room with a sofa and lamp",
    ),
    "discussion": (
        "Four students around a table in lively discussion with open gestures",
        "A family discussion at dinner, talking kindly over bowls of food",
    ),
    "aspect": (
        "A cut gem showing many shining facets, different aspects of one object",
        "A camera orbiting a sculpture to reveal every aspect of its shape",
    ),
    "Mombasa": (
        "An East African port city with dhow boats, palm trees, and an old coral-stone fort, Mombasa vibe, no text",
        "A sunny coastal spice market near the sea with colorful cloth and wooden boats",
    ),

    # Unit 2 Inspiring People
    "inspiring": (
        "A speaker on a small stage as young listeners look up with shining eyes, clearly inspired",
        "A teacher pointing to a sunrise over mountains while students look hopeful and inspired",
    ),
    "admire": (
        "A child looking up in admiration at a firefighter carrying a kitten",
        "Fans clasping hands in admiration as a pianist bows after a concert",
    ),
    "historian": (
        "A historian in a library examining an ancient scroll with a magnifying glass",
        "A historian carefully brushing dust from a buried pottery shard at a dig",
    ),
    "researcher": (
        "A researcher in a white coat peering into a microscope in a bright lab",
        "A field researcher taking notes beside rainforest plants, notebook pages blank",
    ),
    "chemist": (
        "A chemist mixing colorful safe liquids in glass flasks, smiling",
        "A chemist in goggles holding a glowing test tube of crystals",
    ),
    "physicist": (
        "A physicist launching a small cart on a track to show motion",
        "A physicist looking at a model of planets orbiting with wonder",
    ),
    "hunger": (
        "A thin cartoon child holding an empty bowl, gentle depiction of hunger",
        "A kitchen with a rumbling tummy thought-bubble of bread, hunger at mealtime",
    ),
    "chemistry": (
        "A school chemistry lab with colorful flasks and a rainbow reaction",
        "Students wearing goggles watching a bubbling chemistry experiment",
    ),
    "drop out": (
        "An empty school desk with a backpack left behind, suggesting dropping out",
        "A sad student walking away from school gates while classmates stay inside",
    ),
    "calendar": (
        "A wall calendar with colorful blank date squares and a cute panda sticker, no readable numbers",
        "A family circling a picnic day on a big paper calendar, marks only, no digits",
    ),
    "discovery": (
        "An explorer opening a treasure chest of glowing crystals, a discovery",
        "A scientist gasping at a new pattern in a petri dish, a discovery moment",
    ),
    "century": (
        "A time-lapse street: horse cart on one side, electric cars on the other, a century of change",
        "An ancient stone building beside a modern glass tower, spanning a century",
    ),
    "wounded": (
        "A gentle medic wrapping a bandage around a wounded soldier's arm, not graphic",
        "A wounded bird with a tiny wing wrap being cared for by a child",
    ),
    "soldier": (
        "A kind cartoon soldier helping an elderly villager carry water",
        "Soldiers in simple uniforms marching in a parade with flags, no text",
    ),
    "British": (
        "A friendly British guard in a tall black hat standing by a red telephone box",
        "A rainy London street with a red double-decker bus and umbrellas, British scene, no text",
    ),
    "airway": (
        "Airplanes flying along glowing sky paths / airways between clouds",
        "A control-tower view of aircraft following curved airway routes",
    ),
    "nation": (
        "People in many traditional clothes standing together under one shared sky, a nation",
        "A simple flag raising at dawn with citizens watching proudly, flag has no writing",
    ),
    "spread": (
        "Ripples spreading across a pond from a dropped pebble",
        "Colorful pollen spreading on the wind from a flower",
    ),
    "disease": (
        "A tired child in bed with a thermometer, a gentle depiction of illness",
        "Doctors washing hands and wearing masks to stop disease, calm educational scene",
    ),
    "pioneer": (
        "A pioneer explorer cutting a path through tall grass toward an unknown mountain",
        "A pioneer scientist first stepping into a glowing new laboratory",
    ),
    "admirable": (
        "A kid returning a lost wallet to a grateful owner, an admirable act",
        "A volunteer cleaning a beach while others cheer, admirable behavior",
    ),
    "pyramid": (
        "Golden Egyptian pyramids in desert sunlight with tiny camels",
        "A cutaway of a pyramid showing inner stone chambers, no hieroglyph letters",
    ),
    "balance": (
        "A cartoon seal balancing a ball on its nose",
        "A girl walking a balance beam with arms wide",
    ),
    "courage": (
        "A small child standing bravely between friends and a barking dog, showing courage",
        "A firefighter stepping into smoke to rescue a cat, courage in action",
    ),
    "wisdom": (
        "An elderly storyteller sharing wisdom with children under a big tree",
        "An owl perched on a stack of books, a gentle symbol of wisdom, books have blank covers",
    ),
    "look up to": (
        "A little sibling looking up to an older sister in a graduation cap",
        "Young athletes looking up to a champion on a podium",
    ),
    "inspiration": (
        "A painter looking at a sunrise, a burst of glowing inspiration around the canvas",
        "A student watching a scientist, a spark of inspiration lighting the student's eyes",
    ),
    "brave": (
        "A brave little girl approaching a dentist chair with a determined smile",
        "A brave sailor steering a small boat through tall waves",
    ),
    "necessary": (
        "A first-aid kit, water bottle, and helmet laid out as necessary items for a hike",
        "A teacher handing out necessary pencils before an exam, papers blank",
    ),
    "seed": (
        "A tiny seed in a child's palm beside a watering can",
        "A seed splitting underground as a green sprout rises",
    ),
    "childhood": (
        "Kids flying kites, jumping rope, and eating ice cream in a park, childhood joy",
        "A photo album of childhood toys on a bedroom floor, no printed words",
    ),
    "come true": (
        "A child in an astronaut costume standing before a real rocket, a dream coming true",
        "A girl hugging a puppy she wished for, a wish coming true",
    ),
    "dynasty": (
        "Ancient Chinese palace with emperors' robes and stone lions, a dynasty court",
        "A scroll painting of successive palace gates through time, dynasty history, no characters",
    ),
    "western": (
        "A western sunset over cowboy-hat hills and a wooden ranch fence",
        "A western-style street with saloon porch and tumbleweed, no signs",
    ),
    "scientific": (
        "Students in lab coats measuring plants with rulers, a scientific study, ruler has no digits",
        "A scientific observatory dome opening toward stars",
    ),
    "biologist": (
        "A biologist examining a frog with a magnifying glass by a pond",
        "A marine biologist snorkeling beside colorful fish",
    ),
    "whole": (
        "A whole apple beside a sliced apple, the whole fruit complete",
        "A whole pizza untouched beside a pizza with one missing slice",
    ),
    "bank": (
        "A friendly cartoon bank building with a piggy-bank statue out front",
        "A teller window where a child deposits coins into a bank",
    ),
    "forever": (
        "Two trees whose roots intertwine, a forever friendship",
        "A carved heart in an old tree trunk as a couple grows old on a bench, forever",
    ),
    "radio": (
        "A retro wooden radio with glowing dials, no readable stations",
        "A family gathered around a radio listening together",
    ),
    "leave behind": (
        "A traveler walking away, a suitcase accidentally left behind on a bench",
        "Footprints in snow leaving behind a cozy cabin",
    ),
    "collection": (
        "Shelves of a seashell collection arranged in neat rows",
        "A child showing a sticker collection album with blank stickers, no letters",
    ),
    "live on": (
        "A candle flame passed from one candle to many, a spirit that lives on",
        "Grandparent's handmade kite still flying with grandchildren, traditions live on",
    ),
    "exploration": (
        "Explorers with backpacks entering a glowing cave, exploration beginning",
        "A ship approaching an unknown island for exploration",
    ),
    "universe": (
        "A vast colorful universe of galaxies and nebulae around a tiny spaceship",
        "A child reaching toward a swirling universe projected in a planetarium",
    ),
    "socialism": (
        "Workers, farmers, and students sharing tools and harvest in a cooperative scene",
        "People planting a community garden together, a visual of shared socialism values",
    ),
    "hole": (
        "A cute mole popping from a round hole in a lawn",
        "A sock with a hole and a toe sticking out, humorous",
    ),
    "daughter": (
        "A father lifting his laughing daughter onto his shoulders",
        "A mother braiding her daughter's hair in a sunny kitchen",
    ),
    "herself": (
        "A girl looking into a mirror and giving herself a thumbs-up",
        "A girl tying her own shoelaces by herself",
    ),
    "flight": (
        "A passenger airplane taking off into a pink sky, a flight beginning",
        "Birds in V-formation on a long flight over mountains",
    ),
    "woodwork": (
        "A woodworker carving a wooden bird with chisels and shavings",
        "A classroom woodwork bench with a half-finished wooden toy car",
    ),
    "inventor": (
        "An inventor with wild hair beside a Rube Goldberg machine that peels an apple",
        "A young inventor showing a homemade flying gadget to amazed friends",
    ),
    "above all": (
        "A pyramid of values: toys at bottom, a glowing heart at the very top, above all",
        "A coach pointing to teamwork as the highest glowing star above medals",
    ),
    "thinker": (
        "A thinker sitting on a rock under stars, chin in hand",
        "A thinker at a chessboard, deep in thought with a floating idea spark",
    ),
    "period": (
        "An hourglass and changing seasons in a circle, a period of time passing",
        "A classroom clock and a calendar page turning, marking a period, no digits readable",
    ),
    "kingdom": (
        "A fairytale kingdom with a castle, banners, and a winding river",
        "A king and queen waving from a balcony over a cheerful kingdom",
    ),
    "kindness": (
        "A child sharing an umbrella with a stranger in the rain, kindness",
        "Someone helping an elderly person pick up fallen apples, kindness",
    ),
    "whether": (
        "A student at a fork in a path, choosing whether to go left or right",
        "Hands hovering between a rainy coat and a sunny hat, deciding whether",
    ),
    "mankind": (
        "People of many ages and cultures standing on a globe, mankind together",
        "Cave paintings fading into modern city lights, the journey of mankind, no letters",
    ),
    "Atlantic Ocean": (
        "A wide Atlantic Ocean with whales, waves, and a tiny sailing ship",
        "A map-like 3D view of the Atlantic Ocean between two continents, no labels",
    ),
    "BCE": (
        "Ancient stone temples and people in robes under a bronze-age sky, a BCE world",
        "Archaeologists uncovering an ancient pottery wheel from a BCE era",
    ),
    "the Warring States Period": (
        "Ancient Chinese chariot armies facing across a river, Warring States atmosphere, no banners with writing",
        "Scholars in robes discussing beside bronze ding vessels in the Warring States Period",
    ),
    "Nobel Prize": (
        "A golden Nobel Prize medal on a velvet cushion, no engraved letters",
        "A scientist on a stage receiving a glowing medal as the audience claps",
    ),
    "the Silk Road": (
        "Camel caravans on the Silk Road through desert dunes with silk rolls",
        "A Silk Road market with spices, silk, and lanterns at dusk, no shop signs",
    ),

    # Unit 3 Smart Learning
    "learner": (
        "A curious learner with a backpack taking notes under a tree, pages blank",
        "A learner raising a hand in class with bright eager eyes",
    ),
    "flashcard": (
        "A hand holding a picture flashcard of an apple, the back blank with no letters",
        "A desk scattered with illustrated flashcards of animals, no writing",
    ),
    "project": (
        "Students presenting a volcano model as a school project",
        "A team taping a cardboard city together for a project",
    ),
    "website": (
        "A laptop showing a colorful picture-only webpage with big image tiles, no text",
        "A family browsing a website of travel photos on a computer",
    ),
    "hands-on": (
        "Kids doing a hands-on robot-building workshop with tools",
        "A hands-on cooking class, children kneading dough",
    ),
    "experiment": (
        "Students in goggles watching a baking-soda volcano experiment",
        "A plant-growth experiment with two pots, one in sun and one in shade",
    ),
    "look up": (
        "A student looking up a word in a thick picture dictionary",
        "A girl looking up information on a tablet, screen shows only images",
    ),
    "dictionary": (
        "An open picture dictionary showing an illustrated cat entry, no letters",
        "A student flipping through a fat dictionary on a library desk",
    ),
    "aloud": (
        "A student standing and reading a picture book aloud to the class",
        "A parent reading aloud to a child at bedtime",
    ),
    "dialogue": (
        "Two cartoon characters on a stage talking in a play dialogue",
        "Speech bubbles with only icons, two friends in dialogue on a bench",
    ),
    "suit": (
        "A neat suit hanging beside casual clothes, showing a formal suit",
        "A job interview, a young person wearing a suit shaking hands",
    ),
    "general": (
        "A general map of a whole country vs a zoomed street, general view first",
        "A coach giving a general overview of a game using a blank whiteboard",
    ),
    "in general": (
        "Weather: mostly sunny with one tiny cloud, in general a nice day",
        "A class of smiling students with one sleepy kid, in general happy",
    ),
    "speed": (
        "A cheetah running at high speed across grassland",
        "A speedometer-like glowing ring around a racing bicycle, no digits",
    ),
    "grammar": (
        "Colorful sentence blocks snapping together like puzzle pieces, grammar building, blocks blank",
        "A teacher pointing at stacked word-blocks forming a sentence tower, no letters",
    ),
    "podcast": (
        "A teen recording a podcast with a microphone and headphones",
        "Someone jogging while listening to a podcast on wireless earbuds",
    ),
    "zero": (
        "A scoreboard-like frame showing an empty circle meaning zero, no digits",
        "A thermometer at an icy zero point with frost, no numbers",
    ),
    "come across": (
        "A hiker coming across a hidden waterfall in the forest",
        "A child coming across an old toy in a dusty attic chest",
    ),
    "step by step": (
        "A staircase of glowing steps, a child climbing step by step",
        "Origami being folded step by step in a sequence of four small scenes",
    ),
    "build up": (
        "Stacking wooden blocks to build up a tall tower",
        "Saving coins to build up a pile in a glass jar",
    ),
    "actively": (
        "Students actively raising hands, moving, and discussing in class",
        "Kids actively playing basketball, full of energy",
    ),
    "enjoyable": (
        "Friends laughing on a picnic blanket, an enjoyable afternoon",
        "A kid sliding down a rainbow slide, an enjoyable moment",
    ),
    "strategy": (
        "Kids planning a board-game strategy with tokens, board has no text",
        "A soccer coach drawing arrows on a blank clipboard, a strategy",
    ),
    "put off": (
        "A student pushing homework to the edge of the desk, putting it off",
        "A calendar page with a task sliding to tomorrow, putting off, no writing",
    ),
    "correct": (
        "A teacher placing a green check stamp on a math paper with only shapes, correct",
        "A student erasing a wrong puzzle piece and placing the correct one",
    ),
    "suggest": (
        "A friend suggesting an ice-cream shop by pointing down the street",
        "A lightbulb over a student raising a hand to suggest an idea",
    ),
    "method": (
        "Three different methods to peel an orange shown side by side",
        "A science method: observe, mix, measure, with icons only",
    ),
    "summarize": (
        "A long comic strip shrinking into one key picture, summarizing",
        "A student circling the main scene in a storyboard to summarize",
    ),
    "growth": (
        "A plant growth sequence from seed to flower in one frame",
        "A child standing against a wall of height marks, growth over years, marks only",
    ),
    "mindset": (
        "A brain splitting into a stormy closed door vs a sunny open door, two mindsets",
        "A student turning a frown at a hard puzzle into a determined smile, growth mindset",
    ),
    "material": (
        "Piles of wood, cloth, and clay as craft materials",
        "A tailor cutting fabric material on a table",
    ),
    "in part": (
        "A pie with one slice highlighted, true in part",
        "A painted fence only partly finished, done in part",
    ),
    "guidance": (
        "A lighthouse giving guidance to a small boat at night",
        "A mentor pointing the way on a trail, offering guidance",
    ),
    "feedback": (
        "A coach giving a thumbs-up and a small correction pose as feedback",
        "A teacher handing back a paper with a sticker star, feedback, paper blank",
    ),
    "addition": (
        "Apple groups being added together into a bigger pile, addition",
        "Building blocks added onto a tower, addition",
    ),
    "in addition": (
        "A sandwich plus, in addition, a cup of soup on a tray",
        "A backpack already full, in addition a water bottle clipped on",
    ),
    "resource": (
        "A library of books, globes, and computers as learning resources",
        "Sun, wind turbines, and a river as natural resources",
    ),
    "textbook": (
        "A student holding a colorful textbook open on a desk, pages illustrated only",
        "A stack of textbooks tied with a ribbon beside a pencil",
    ),
    "advantage": (
        "A bicycle with a motor vs a regular bike, a clear advantage",
        "A taller basketball player reaching the hoop with an advantage",
    ),
    "take advantage of": (
        "Kids taking advantage of a sunny day to fly kites",
        "A student taking advantage of a quiet library corner to study",
    ),
    "efficiently": (
        "A conveyor neatly packing lunch boxes efficiently vs a messy pile",
        "A student using colored trays to finish chores efficiently",
    ),
    "valley": (
        "A green valley between two mountains with a river",
        "Houses nestled in a misty valley at sunrise",
    ),
    "pronunciation": (
        "A student watching a teacher's mouth shape while repeating a sound, pronunciation practice",
        "Headphones and a microphone, a child practicing pronunciation",
    ),
    "click": (
        "A finger clicking a computer mouse",
        "A camera shutter clicking as a photo flashes",
    ),
    "magazine": (
        "A colorful magazine with a photo cover of a cat, no title text",
        "Someone flipping a magazine on a sofa",
    ),
    "open up": (
        "A flower opening up in time-lapse",
        "A shy child opening up, smiling while talking to a new friend",
    ),
    "shelf": (
        "A wooden shelf full of plants and framed photos",
        "A child reaching for a toy on a high shelf",
    ),
    "schoolwork": (
        "A desk with worksheets of shapes, pencils, and an eraser, schoolwork",
        "A student packing finished schoolwork into a backpack",
    ),
    "print": (
        "A printer sliding out a colorful picture print",
        "Fresh newspapers coming off a printing press, pages illustrated only",
    ),
    "newspaper": (
        "A family reading a newspaper at breakfast, pages show photos not words",
        "A paperboy delivering newspapers on a bicycle",
    ),
    "e-book": (
        "A child reading an e-book on a tablet in bed",
        "An e-book device beside a paper book for comparison",
    ),
    "recent": (
        "A fridge of leftovers labeled with glowing dots, the recent one still steaming, no text",
        "A photo wall where the newest recent photo still shines",
    ),
    "HSK": (
        "A Chinese-language test booklet with panda stickers and blank answer bubbles, HSK exam vibe, no letters",
        "Students taking a Chinese proficiency exam in a quiet classroom, papers blank",
    ),

    # Unit 4 Our Memory
    "position": (
        "Chess pieces in different positions on a board, no letters",
        "A coach positioning players on a field with cones",
    ),
    "sadness": (
        "A child sitting in rain under a window, gentle sadness",
        "A wilted flower beside a drooping cartoon face, sadness",
    ),
    "run out": (
        "An hourglass empty, time has run out",
        "A toothpaste tube squeezed completely, toothpaste run out",
    ),
    "react": (
        "A cat reacting with arched back to a sudden cucumber",
        "A goalkeeper reacting instantly to a flying soccer ball",
    ),
    "mix up": (
        "Two pairs of mixed-up shoes on the wrong feet",
        "Colorful socks mixed up in a laundry basket",
    ),
    "put sth to good use": (
        "Turning plastic bottles into a hanging garden, putting them to good use",
        "An old suitcase reused as a pet bed, put to good use",
    ),
    "chain": (
        "A metal bicycle chain close-up, shiny links",
        "Children making a paper chain of loops",
    ),
    "stable": (
        "A stable wooden table vs a wobbly one, the stable one holding a vase",
        "A mountain goat standing stable on a narrow rock",
    ),
    "lecture": (
        "A professor giving a lecture in a hall with a blank slide of a diagram",
        "Students listening to a lecture, taking notes on blank paper",
    ),
    "retell": (
        "A child retelling a story with puppets to friends",
        "A student retelling a comic story using picture cards",
    ),
    "memorize": (
        "A student memorizing a map of continents, repeating with eyes closed",
        "Flash picture cards being memorized, a brain with glowing paths",
    ),
    "tick": (
        "A green tick mark being drawn on a checklist of icons, no words",
        "A clock making a tick with a jumping second hand, no digits",
    ),
    "grandson": (
        "A grandfather teaching his grandson to fly a kite",
        "A grandson hugging grandma on a sofa",
    ),
    "go through": (
        "A family going through old photo boxes in an attic",
        "A hiker going through a dark forest tunnel into light",
    ),
    "happen to": (
        "Someone happening to find a lucky coin on the sidewalk",
        "Friends happening to meet at a supermarket corner",
    ),
    "keep in mind": (
        "A string tied around a finger to keep something in mind",
        "A sticky note with a star icon on a forehead, keep in mind, no text",
    ),
    "case": (
        "A detective looking at a case file of photos, pages blank",
        "A hard guitar case being opened",
    ),
    "in sb's case": (
        "Three students with different umbrellas; in one child's case, extra rain boots",
        "A doctor pointing to one unique patient chart among others, in that person's case",
    ),
    "opera": (
        "A grand opera stage with singers in costumes and a chandelier",
        "An audience watching an opera with binoculars",
    ),
    "ticket": (
        "A colorful concert ticket stub, barcode abstract, no readable words",
        "A hand giving a train ticket to a conductor",
    ),
    "wallet": (
        "An open leather wallet with cards and coins",
        "A person picking up a dropped wallet to return it",
    ),
    "picnic": (
        "A picnic blanket with fruit, sandwiches, and lemonade in a park",
        "Family picnic under a cherry tree with a wicker basket",
    ),
    "pardon": (
        "Someone cupping an ear saying pardon, a polite questioning face",
        "A person bowing slightly to pardon a small bump in a crowd",
    ),
    "airport": (
        "An airport terminal with planes at gates and a control tower",
        "Travelers with suitcases walking through an airport hall",
    ),
    "gunshot": (
        "A distant hunter's gunshot scare sending birds flying, not graphic",
        "Startled deer leaping at a far-off gunshot sound visualized as a shockwave",
    ),
    "grown-up": (
        "A child in oversized grown-up clothes and shoes, funny",
        "A grown-up helping a child cross the street",
    ),
    "recall": (
        "An elderly person recalling a childhood scene as a glowing memory bubble",
        "A student recalling an answer, a light returning to the eyes",
    ),
    "grapevine": (
        "A grapevine with hanging purple grapes on a wooden trellis",
        "Friends whispering along a grapevine of gossip, cups to ears, playful",
    ),
    "boost": (
        "A rocket booster lifting a small cart, a boost",
        "A cheerleader boost lifting a teammate to reach a balloon",
    ),
    "to start with": (
        "Cooking: to start with, washing vegetables before other steps",
        "A race: to start with, tying shoes at the starting line",
    ),
    "short-term": (
        "An ice cube melting quickly, a short-term thing",
        "A sticky note reminder for today only, short-term memory aid, blank",
    ),
    "long-term": (
        "A tree growing over many seasons, long-term growth",
        "A piggy bank filling slowly for a long-term goal, a bicycle poster with no text",
    ),
    "technique": (
        "A tennis coach showing a serving technique",
        "A painter demonstrating a brushstroke technique",
    ),
    "passage": (
        "A stone passage / corridor in an old castle",
        "A highlighted passage of illustrated story panels, no text",
    ),
    "likely": (
        "Dark clouds, rain is likely, people opening umbrellas",
        "A spinning prize wheel almost stopping on a star, a likely result",
    ),
    "wear out": (
        "Worn-out sneakers with holes versus new ones",
        "A tired kid worn out after a long hike, collapsing on grass",
    ),
    "discuss": (
        "Two friends discussing a map on a cafe table, map unlabeled",
        "A class sitting in a circle to discuss a picture book",
    ),
    "image": (
        "A camera capturing an image of a mountain",
        "A framed image / photograph of a family picnic",
    ),
    "graph": (
        "A colorful 3D bar graph made of stacked fruit, no numbers",
        "A line graph of a growing plant height as a rising green line, unlabeled",
    ),
    "view": (
        "A breathtaking mountain view from a hilltop",
        "People viewing a painting in a gallery",
    ),
    "effective": (
        "An effective umbrella keeping someone dry in heavy rain",
        "An effective recycling bin filling with sorted bottles",
    ),
    "engine": (
        "A cutaway of a car engine with shiny pistons",
        "A steam engine train puffing at a station",
    ),
    "fuel": (
        "A fuel pump filling a car, glowing energy",
        "Logs as fuel for a campfire",
    ),
    "address": (
        "An envelope with a blank address label and a stamp illustration",
        "A house with a mailbox, finding an address",
    ),
    "password": (
        "A glowing lock with stars as a password, no characters",
        "A kid covering a tablet while typing a password, screen faces away",
    ),
    "account": (
        "A piggy-bank account with a card being inserted, cute bank scene",
        "A login screen with an avatar icon only, an account, no text",
    ),
    "increase": (
        "A stack of coins increasing in height",
        "A balloon increasing in size as it is inflated",
    ),
    "wild": (
        "Wild horses running across an open plain",
        "A wild forest with foxes and mushrooms, untouched nature",
    ),
    "blood": (
        "A cartoon blood donation with a smiling donor and a red drop icon, gentle",
        "A scraped knee with a tiny bit of blood being cleaned, not graphic",
    ),
    "wound": (
        "A small bandaged wound on a knee",
        "A medic cleaning a wound on a finger, gentle",
    ),
    "mall": (
        "A bright shopping mall atrium with stores and a fountain, no store names",
        "Friends carrying shopping bags in a mall corridor",
    ),
    "notebook": (
        "An open notebook with a doodle of a cat, otherwise blank",
        "A laptop-style notebook computer on a student's lap",
    ),
    "squirrel": (
        "A fluffy squirrel holding an acorn on a tree branch",
        "A squirrel stuffing nuts into a tree hole",
    ),
    "nut": (
        "A cracked walnut showing the nut inside",
        "A bowl of mixed nuts on a wooden table",
    ),
    "dolphin": (
        "A dolphin leaping from blue ocean water",
        "A dolphin swimming beside a boat, friendly",
    ),
    "recognize": (
        "A child recognizing grandma in a crowd and running over",
        "A dog recognizing its owner at the door, tail wagging",
    ),
    "outline": (
        "A pencil outline of a cat before coloring",
        "A mountain outline against a sunset sky",
    ),
    "fully": (
        "A glass fully filled to the brim versus half empty",
        "A butterfly fully emerged from a chrysalis",
    ),
    "divide": (
        "A pizza being divided into equal slices",
        "A teacher dividing crayons into two equal groups",
    ),
    "divide into": (
        "Kids dividing into two teams with colored sashes",
        "A toolbox divided into compartments of tools",
    ),
    "one-size-fits-all": (
        "A stretchy one-size-fits-all hat magically fitting a tiny kid and a tall adult",
        "A one-size-fits-all raincoat covering different body shapes, humorous",
    ),

    # Unit 5 Power of Ideas
    "invention": (
        "A glowing lightbulb invention on a workbench among sketches, sketches unlabeled",
        "Kids cheering around a homemade flying invention",
    ),
    "camera": (
        "A vintage camera with a flashing bulb taking a portrait",
        "A child holding a colorful camera photographing flowers",
    ),
    "laptop": (
        "A laptop open on a cafe table with a scenic wallpaper, no text",
        "A student typing on a laptop in a library",
    ),
    "high-speed train": (
        "A sleek high-speed train blurring past green fields",
        "Passengers boarding a high-speed train at a modern station",
    ),
    "super": (
        "A superhero kid in a cape striking a super pose, wholesome",
        "A giant super-sized ice cream beside a normal one",
    ),
    "sunglasses": (
        "Cool sunglasses on a beach towel under bright sun",
        "A pop star putting on star-shaped sunglasses",
    ),
    "mini-": (
        "A mini toy car beside a real car, showing mini size",
        "A mini cactus in a tiny pot next to a big cactus",
    ),
    "itself": (
        "A cat washing itself, curled and licking fur",
        "A toy robot folding itself into a cube",
    ),
    "button": (
        "A big colorful button on a coat, close-up",
        "A finger pressing a round elevator-style button, no floor numbers",
    ),
    "hundreds of": (
        "Hundreds of balloons filling a sky",
        "Hundreds of tiny fish in a glowing aquarium",
    ),
    "produce": (
        "A factory producing colorful rubber ducks on a conveyor",
        "Hens producing eggs in a sunny coop",
    ),
    "file": (
        "A computer folder file icon as a 3D folder with photos inside",
        "A paper file folder stuffed with documents, pages blank",
    ),
    "plastic": (
        "Shiny plastic bottles and toys on a table",
        "A recycling bin filling with plastic bottles",
    ),
    "printer": (
        "A desktop printer sliding out a colorful photo",
        "A huge industrial printer rolling paper, pictures only",
    ),
    "invent": (
        "A kid inventing a gadget from household objects",
        "An inventor's workshop with a new flying shoes invention",
    ),
    "all over the world": (
        "Postcards and landmarks from all over the world around a globe, no labels",
        "Children of many cultures waving from all over the world on a globe",
    ),
    "suppose": (
        "A child tapping chin to suppose what is inside a gift box",
        "Friends suppose a cloud looks like a dragon",
    ),
    "be supposed to": (
        "A school bell ringing, students who are supposed to be in class running in",
        "A cake that is supposed to be in the oven, a timer glowing, no digits",
    ),
    "wheel": (
        "A close-up of a colorful bicycle wheel spinning",
        "A potter's wheel shaping a clay bowl",
    ),
    "frozen": (
        "A frozen lake with ice skaters",
        "Frozen vegetables in a frosty freezer drawer",
    ),
    "complete": (
        "A jigsaw with the last piece placed, complete",
        "A complete rainbow after rain",
    ),
    "layer": (
        "A cut cake showing many colorful layers",
        "Earth cutaway showing layers of rock",
    ),
    "melt": (
        "An ice-cream cone melting in the sun",
        "Snowmen melting into puddles in spring",
    ),
    "pipe": (
        "A plumber fixing a leaking pipe under a sink",
        "A long pipeline carrying water across hills",
    ),
    "tunnel": (
        "A train entering a mountain tunnel",
        "Kids crawling through a playground tunnel",
    ),
    "tourism": (
        "Tourists with cameras at a famous mountain, tourism",
        "A tour bus arriving at a scenic lakeside, tourism",
    ),
    "gain": (
        "A runner gaining on the leader, catching up",
        "A plant gaining height after being watered",
    ),
    "reality": (
        "A dream castle dissolving into a real ordinary house, reality",
        "VR goggles off, a child seeing the real living room, reality",
    ),
    "papermaking": (
        "Ancient papermaking: dipping a screen into pulp and drying sheets",
        "A papermaking workshop with wet sheets hanging to dry",
    ),
    "responsible": (
        "A child responsible for feeding a pet on time",
        "A captain responsible at the ship's wheel in a storm",
    ),
    "responsible for": (
        "A baker responsible for a huge birthday cake, proud",
        "A student responsible for watering classroom plants",
    ),
    "rapid": (
        "A rapid mountain river with white water",
        "A cheetah's rapid dash, motion blur",
    ),
    "shape": (
        "Hands shaping clay into a vase",
        "Clouds shaped like animals in the sky",
    ),
    "bronze": (
        "A shining bronze medal on a ribbon",
        "Ancient bronze vessels and a bronze statue",
    ),
    "ware": (
        "Ceramic ware bowls and teapots on a stall",
        "Kitchen ware hanging: pots, pans, ladles",
    ),
    "stone": (
        "A mossy stone in a stream",
        "Stonemasons carving a stone sculpture",
    ),
    "jute": (
        "Jute plants with fibrous stalks in a field",
        "A woven jute bag and rope on a market table",
    ),
    "fibre": (
        "Close-up of plant fibre threads being spun",
        "A sweater showing knitted fibre texture",
    ),
    "expensive": (
        "An expensive jewelry display with a tiny price-shock face, no numbers",
        "A child staring at an expensive bicycle in a shop window",
    ),
    "officer": (
        "A friendly police officer helping a lost child",
        "A customs officer checking a suitcase with a smile",
    ),
    "workshop": (
        "A busy craft workshop with wood shavings and tools",
        "A kids' science workshop building bottle rockets",
    ),
    "none": (
        "An empty cookie jar, none left",
        "A bird feeder with none of the seeds remaining",
    ),
    "ideal": (
        "An ideal picnic: perfect weather, shade, and food",
        "The ideal pair of shoes fitting just right, sparkle",
    ),
    "certain": (
        "A pointing finger choosing one certain apple among many",
        "A confident nod, certain about a path at a fork",
    ),
    "suitable": (
        "Choosing suitable rain boots among sandals and heels",
        "A suitable small backpack for a little kid vs a huge hiking pack",
    ),
    "liquid": (
        "Colorful liquid pouring from a bottle into a glass",
        "Water as liquid beside ice and steam",
    ),
    "cheap": (
        "A market stall of cheap colorful socks in big bins",
        "Choosing a cheap sandwich vs a fancy meal",
    ),
    "creation": (
        "An artist stepping back from a finished colorful creation",
        "Kids proud of a sandcastle creation on the beach",
    ),
    "later on": (
        "A morning packed lunch and later on the same lunch eaten at sunset",
        "Planting a seed, later on a flower blooming in a smaller inset",
    ),
    "speed up": (
        "A snail putting on roller skates to speed up, funny",
        "A factory line speeding up, items moving faster",
    ),
    "Arabic": (
        "Beautiful Arabic-style geometric tiles and arches, no writing",
        "A desert city with Arabic architecture, lanterns, and a mosque silhouette, no calligraphy",
    ),
    "result in": (
        "Knocking a glass, resulting in a spill, cause and result",
        "Planting trees resulting in birds returning to a forest",
    ),
    "lead to": (
        "A trail of stepping stones leading to a hidden garden",
        "Eating too much candy leading to a toothache, gentle cartoon",
    ),
    "birth": (
        "A newborn baby wrapped in a blanket with happy parents, gentle birth",
        "A chick hatching, the birth of a bird",
    ),
    "rapidly": (
        "Dandelion seeds rapidly blowing away in wind",
        "A city skyline growing rapidly with new buildings popping up",
    ),
    "afford": (
        "A child counting coins, able to afford a small toy",
        "A family smiling, able to afford a simple holiday tent trip",
    ),
    "company": (
        "A small company office with coworkers high-fiving",
        "A logo-free delivery van of a moving company",
    ),
    "sticky": (
        "Sticky honey dripping onto fingers",
        "A frog catching a fly with a long sticky tongue",
    ),
    "production": (
        "A movie production set with cameras and clapper, clapper blank",
        "A bakery in full production of bread loaves",
    ),
    "gradually": (
        "A sun gradually setting through several sky colors",
        "Hair gradually growing longer in a sequence of portraits",
    ),
    "widely": (
        "A song spreading widely, many windows with people dancing",
        "A product used widely: the same bicycle in many different countries",
    ),
    "be looking to": (
        "A coach looking to find a new player, scanning a field",
        "A chef looking to invent a new dish, tasting spoons",
    ),
    "glider": (
        "A graceful glider soaring over mountains with no engine",
        "A child launching a toy glider in a park",
    ),
    "Europe": (
        "A collage of European landmarks: Eiffel-like tower, canals, alpine village, no labels",
        "A map-shaped 3D Europe of green lands and coasts, unlabeled",
    ),
    "Lhasa": (
        "A high-plateau city with a grand white-and-red palatial monastery, Lhasa vibe, prayer flags, no text",
        "Yak, golden roofs, and snow mountains around a Tibetan city, Lhasa",
    ),
    "Tanggula Pass": (
        "A high snowy mountain pass with a winding road, prayer flags, Tanggula Pass",
        "A train crossing a stark high-altitude pass under a huge sky",
    ),
    "CE": (
        "A timeline from ancient ruins to a modern city, the CE era of history, no digits",
        "A historian pointing from a Roman column toward today's skyline, CE times",
    ),

    # Unit 6 Beyond Earth
    "beyond": (
        "A hiker looking beyond a mountain ridge at a hidden ocean",
        "A spaceship flying beyond Earth's blue curve",
    ),
    "mission": (
        "Astronauts boarding a rocket for a space mission",
        "A team receiving a mission badge before a rescue, badge blank",
    ),
    "telescope": (
        "A child looking through a backyard telescope at the moon",
        "A huge observatory telescope under a starry dome",
    ),
    "rover": (
        "A Mars rover with big wheels rolling on red rocks",
        "A cute rover collecting glowing samples on an alien desert",
    ),
    "manned": (
        "A manned spacecraft with astronauts visible in the cockpit",
        "A manned submarine with a crew waving through a window",
    ),
    "maintain": (
        "A mechanic maintaining a bicycle chain with oil",
        "Astronauts maintaining solar panels on a space station",
    ),
    "launch": (
        "A rocket launch with fire and smoke at a coastal pad",
        "Kids launching paper airplanes from a hill",
    ),
    "weightless": (
        "Astronauts floating weightless with floating fruit in a cabin",
        "A weightless drop of water forming a sphere in midair",
    ),
    "movement": (
        "Dancers in mid-movement, flowing poses",
        "A time-lapse of a clock's hands as movement, no digits",
    ),
    "asleep": (
        "A child asleep with a teddy under a night lamp",
        "A cat asleep in a sunbeam",
    ),
    "fall asleep": (
        "A student falling asleep at a desk with a tiny drool, gentle",
        "A baby falling asleep in a parent's arms",
    ),
    "tie": (
        "Tying a shoelace bow",
        "A necktie being tied in a mirror",
    ),
    "geology": (
        "A geology student examining colorful rock layers in a canyon",
        "A geology hammer and mineral samples on a field table",
    ),
    "satellite": (
        "A satellite with solar wings orbiting Earth",
        "A dish antenna receiving signals from a satellite",
    ),
    "crazy": (
        "A crazy fun hair-in-the-wind skateboard trick, playful not scary",
        "A crazy colorful invention that toasts bread with a roller coaster",
    ),
    "human being": (
        "A diverse group of human beings waving on a grassy hill",
        "A human being standing beside animals and a robot for contrast",
    ),
    "require": (
        "A cake recipe requiring eggs, flour, and milk on a table, no writing",
        "A climb that requires a helmet and rope",
    ),
    "rocket": (
        "A tall rocket standing on a launch pad",
        "A toy water rocket blasting off in a backyard",
    ),
    "cancel": (
        "A big red X stamp canceling a concert poster that is picture-only",
        "Rain canceling a picnic, a blanket being folded up",
    ),
    "publish": (
        "A printing press publishing a picture book, cover is an illustration",
        "An author holding a freshly published book, cover has no words",
    ),
    "exoplanet": (
        "A colorful exoplanet orbiting a distant star, alien landscape",
        "A telescope view of a tiny exoplanet crossing a giant sun",
    ),
    "solar": (
        "Solar panels on a roof gleaming in sunshine",
        "A solar system model with the sun in the center, planets unlabeled",
    ),
    "god": (
        "A gentle mythic sky god among clouds, non-denominational fantasy, kind face",
        "Ancient people offering fruit at a stone altar to a god statue",
    ),
    "mysterious": (
        "A mysterious glowing door in a misty forest",
        "A mysterious masked figure leaving a trail of sparkles, not scary",
    ),
    "spacecraft": (
        "A detailed spacecraft docking at a space station",
        "A spacecraft flying past Saturn's rings",
    ),
    "in case": (
        "Packing an umbrella in case of rain on a sunny morning",
        "A first-aid kit in a backpack, in case of scrapes",
    ),
    "board": (
        "A wooden cutting board with vegetables",
        "A chalkboard-style board with only a chalk doodle of a sun, no writing",
    ),
    "on board": (
        "Passengers on board a ship waving from the deck",
        "Kids on board a colorful bus looking out windows",
    ),
    "billion": (
        "A night sky packed with a billion tiny stars",
        "A huge pile of glittering grains suggesting a billion, not countable",
    ),
    "trillion": (
        "Earth seen from space among a trillion stars of the Milky Way",
        "A cosmic zoom from a city to galaxies, suggesting a trillion lights",
    ),
    "completely": (
        "A glass completely full versus a sip left",
        "A room completely packed with balloons",
    ),
    "cooperate": (
        "Ants cooperating to carry a big leaf",
        "Kids cooperating to lift a heavy box",
    ),
    "cooperate with": (
        "A dog cooperating with a firefighter during a rescue drill",
        "Two countries' cartoon teams cooperating with shared tools to plant a tree",
    ),
    "set foot on": (
        "An astronaut setting foot on the moon, first step",
        "A traveler setting foot on a new island beach",
    ),
    "galaxy": (
        "A spiral galaxy swirling with stars and nebulae",
        "A spaceship tiny against a huge galaxy",
    ),
    "unmanned": (
        "An unmanned drone flying over fields",
        "An unmanned rover on Mars, no people in the cockpit",
    ),
    "craft": (
        "A craft table with handmade clay pots and brushes",
        "A sleek spacecraft / aircraft craft on a runway",
    ),
    "spaceship": (
        "A shiny spaceship taking off from a colorful alien planet",
        "Kids playing in a cardboard spaceship in a living room",
    ),
    "survey": (
        "Surveyors with a tripod measuring land",
        "A clip-board survey of smiling/frowning face stickers, no text",
    ),
    "crowded": (
        "A crowded subway car with many cartoon commuters",
        "A crowded beach on a hot day",
    ),
    "operate": (
        "A child operating a simple robot with a remote",
        "A surgeon operating with calm glowing tools, not graphic, educational",
    ),
    "Mars": (
        "The red planet Mars with polar ice and craters",
        "A rover and habitat on the surface of Mars",
    ),
    "Voyager": (
        "The Voyager space probe with a golden disk flying past giant planets",
        "Voyager leaving the solar system into dark starry space",
    ),
    "Proxima Centauri": (
        "A red dwarf star Proxima Centauri with a tiny planet nearby",
        "A telescope pointing at a reddish nearby star, Proxima Centauri",
    ),

    # Unit 7 Feel the Rhythm
    "rhythm": (
        "Drums and a bouncing metronome beating a clear rhythm, no numbers",
        "Kids clapping in rhythm around a campfire",
    ),
    "folk": (
        "Folk dancers in traditional costumes around a village square",
        "A folk musician playing a wooden flute in the countryside",
    ),
    "traditional": (
        "A traditional tea ceremony with porcelain cups",
        "Traditional paper lanterns at a festival",
    ),
    "pop": (
        "A pop-star concert with glowing lights and dancing fans",
        "A soda can popping open with fizz, a pop",
    ),
    "jazz": (
        "A jazz trio with saxophone, double bass, and piano in a cozy club",
        "A jazz saxophonist under a spotlight",
    ),
    "rap": (
        "A rapper with a microphone, friends beatboxing, energetic and wholesome",
        "Headphones and a bouncing beat, a rap performance in a park",
    ),
    "comment": (
        "A coach giving a comment with a thumbs-up after a play",
        "Sticky-star comments on a drawing, no writing",
    ),
    "sing along to": (
        "A family singing along to a radio in the car",
        "A concert crowd singing along to a band",
    ),
    "lyric": (
        "A singer holding a lyric sheet that is blank, feeling the song",
        "Musical notes turning into pictures that tell a lyric story, no words",
    ),
    "electric": (
        "Electric sparks lighting a bulb, electric energy",
        "An electric guitar with a cable glowing",
    ),
    "electric guitar": (
        "A close-up of an electric guitar on a stand with an amp",
        "A teen playing an electric guitar on a small stage",
    ),
    "keyboard": (
        "A music keyboard with glowing keys, no labels",
        "A computer keyboard on a desk, no letters on keys",
    ),
    "trumpet": (
        "A shiny brass trumpet being played",
        "A jazz musician lifting a trumpet toward the sky",
    ),
    "style": (
        "Three friends in three different clothing styles walking together",
        "Paintings in different art styles side by side, no signatures",
    ),
    "performance": (
        "A ballet performance on a lit stage",
        "A school play performance with costumes and curtains",
    ),
    "golden": (
        "A golden sunset over the sea",
        "A golden trophy shining on a shelf",
    ),
    "lover": (
        "A music lover hugging vinyl records (blank labels)",
        "Two lovers sharing an umbrella, wholesome",
    ),
    "romantic": (
        "A romantic picnic at sunset with string lights",
        "A romantic gondola on a quiet canal",
    ),
    "performer": (
        "A circus performer juggling on stage",
        "A street performer with a hat for coins, playing violin",
    ),
    "dance to": (
        "Kids dance to a boom box in a living room",
        "A couple dance to live drums on a beach",
    ),
    "purple": (
        "A field of purple lavender",
        "A cute purple octopus with purple balloons",
    ),
    "poet": (
        "A poet writing under a tree, pages blank, quill in hand",
        "A poet reading to a small audience in a cafe",
    ),
    "policewoman": (
        "A kind policewoman helping a child find parents",
        "A policewoman directing traffic with glowing sticks",
    ),
    "deaf": (
        "A deaf child using sign language with a smiling teacher",
        "A concert with a deaf dancer feeling rhythm through the floor",
    ),
    "composer": (
        "A composer at a piano, music sheets blank, eyes closed feeling melody",
        "A composer conducting an orchestra",
    ),
    "electronic": (
        "Electronic music DJ with glowing mixers, no logos",
        "Electronic gadgets: headphones, pads, and neon equalizer bars, no text",
    ),
    "download": (
        "A phone downloading a song as a glowing arrow into a device, no words",
        "A laptop with a download progress ring, no numbers",
    ),
    "rating": (
        "Five glowing stars as a rating, three filled",
        "A movie rating board of star icons, no text",
    ),
    "hats off": (
        "A crowd taking hats off to a performer, hats off in respect",
        "A coach taking a hat off to a brilliant play",
    ),
    "genius": (
        "A young genius surrounded by floating inventions and a glowing brain, friendly",
        "A chess genius smiling after a clever move",
    ),
    "pianist": (
        "A pianist playing a grand piano on a concert stage",
        "A child pianist practicing at home with a cat listening",
    ),
    "gifted": (
        "A gifted young painter creating a stunning mural",
        "A gifted violinist, a child playing with amazing skill",
    ),
    "outdo": (
        "Two cooks trying to outdo each other with taller cakes",
        "A high jumper outdoing the last height with a higher leap",
    ),
    "widen": (
        "Workers widening a narrow road into a wide one",
        "A smile widening on a face",
    ),
    "soul": (
        "A soulful singer with eyes closed, glowing heart light",
        "Two friends hugging, a warm soul-to-soul moment",
    ),
    "look down on": (
        "A snobby peacock looking down on a small sparrow, look down on, then a kind kid intervening",
        "A tall castle looking down on a tiny cottage, then a bridge connecting them",
    ),
    "Polish": (
        "A Polish folk dancer in a flower crown and embroidered vest",
        "A snowy old-town square with colorful townhouses, Polish city vibe, no signs",
    ),
    "characteristic": (
        "A zebra's stripes as a characteristic pattern",
        "A chef's signature tall hat as a characteristic look",
    ),
    "valuable": (
        "A valuable glowing gem in a glass case",
        "Grandma's handmade quilt, valuable to a hugging grandchild",
    ),
    "proudly": (
        "A child proudly showing a handmade birdhouse",
        "An athlete proudly holding a flag with no writing",
    ),
    "funeral": (
        "A gentle funeral with white flowers and people in dark clothes, respectful, not graphic",
        "A candlelit funeral procession with lilies, calm and dignified",
    ),
    "young and old": (
        "Young and old dancing together at a festival",
        "A grandparent and toddler building blocks, young and old",
    ),
    "profession": (
        "Different professions: doctor, baker, pilot standing together",
        "A graduation turning a student toward a profession, white coat waiting",
    ),
    "contribution": (
        "Many hands adding bricks to a community wall, each a contribution",
        "A donation box filling with toys as a contribution",
    ),
    "cartoon": (
        "A colorful cartoon TV scene of a bouncing robot, clearly a cartoon",
        "An artist drawing a cartoon character on a tablet",
    ),
    "fair": (
        "A fair carnival with a Ferris wheel and cotton candy, no signs",
        "A referee dividing a cake fairly between two kids, fair",
    ),
    "fair and square": (
        "A race finish judged fair and square with a photo-finish camera",
        "Sharing cookies equally, fair and square",
    ),
    "tape": (
        "A cassette tape and a roll of adhesive tape on a desk",
        "Someone wrapping a gift with tape",
    ),
    "tap": (
        "A finger tap on a drum",
        "A dripping water tap / faucet",
    ),
    "tap one's feet": (
        "A listener tapping feet to music under a table",
        "A crowd tapping feet in unison at a concert",
    ),
    "champion": (
        "A champion with a gold medal on a podium",
        "A chess champion lifting a trophy",
    ),
    "finger": (
        "A close-up of a hand pointing with one finger",
        "A child painting with a finger, colorful finger-paint",
    ),
    "schoolmate": (
        "Schoolmates walking home together with backpacks",
        "Schoolmates sharing snacks at recess",
    ),
    "nowadays": (
        "Split: old film camera vs nowadays a phone camera",
        "Nowadays kids video-calling, versus an old letter",
    ),
    "imagination": (
        "A child's imagination turning a cardboard box into a castle",
        "Imagination sparks: drawings lifting off paper into 3D creatures",
    ),
    "Poland": (
        "A Polish landscape with a stork, forests, and a colorful old town, no text",
        "A snowy wooden cottage and pine forest in Poland",
    ),
    "Vienna": (
        "Vienna: grand palaces, a Ferris wheel, and a waltz couple, no signs",
        "A Viennese cafe with a pianist and pastries, Vienna vibe",
    ),

    # Unit 8 More than a Game
    "pull-up": (
        "An athlete doing a pull-up on a bar, muscles engaged",
        "Kids doing pull-ups in a gym class",
    ),
    "relay": (
        "A relay race, a baton passing between runners",
        "A swimming relay, a swimmer tagging the wall",
    ),
    "shot-put": (
        "An athlete spinning and throwing a shot-put ball",
        "A shot-put landing in a sand pit, judge watching",
    ),
    "boxing": (
        "Two boxers in a ring with big gloves, sporty not violent, referee nearby",
        "A kid practicing boxing on a punching bag with gear",
    ),
    "competition": (
        "A school sports competition with many events and banners without text",
        "A cooking competition with chefs and timers, no numbers",
    ),
    "tryout": (
        "Kids at a soccer tryout, a coach with a clipboard of icons",
        "A dance tryout on a studio floor",
    ),
    "handoff": (
        "A close-up of a relay baton handoff between two runners",
        "A football-style handoff of a ball between teammates",
    ),
    "baton": (
        "A colorful relay baton in a runner's hand",
        "A conductor's baton in mid-swing",
    ),
    "judge": (
        "A sports judge holding up a score paddle of stars, no numbers",
        "A courtroom judge with a gavel, calm and fair",
    ),
    "runner": (
        "A runner sprinting on a red track",
        "A marathon runner drinking water from a station",
    ),
    "advertisement": (
        "A giant billboard advertisement showing only a picture of orange juice, no words",
        "A TV advertisement of a bouncing sneaker, no logos",
    ),
    "take the lead": (
        "A runner taking the lead in a pack of racers",
        "A student taking the lead, guiding a group project",
    ),
    "smooth": (
        "A smooth ice rink vs rough cracked ice",
        "A smooth chocolate river pouring, silky",
    ),
    "make up ground": (
        "A trailing runner making up ground, closing the gap",
        "A cyclist making up ground on a hill chase",
    ),
    "catch up with": (
        "A little sibling catching up with an older one on bikes",
        "A tortoise catching up with a resting hare, playful",
    ),
    "figure": (
        "An ice dancer making a graceful figure on ice",
        "A mysterious cloaked figure in moonlight, not scary",
    ),
    "figure skating": (
        "A figure skating spin on a sparkling ice rink",
        "A pair figure skating lift, elegant",
    ),
    "amaze": (
        "Fireworks that amaze a crowd with open mouths",
        "A magician's trick that amazes children",
    ),
    "strength": (
        "An athlete lifting a barbell, showing strength",
        "An elephant showing strength by moving a log",
    ),
    "truly": (
        "A truly golden sunrise, breathtaking and real",
        "Friends in a truly heartfelt hug",
    ),
    "anyway": (
        "Rain starting, but kids playing soccer anyway",
        "A fallen ice cream, then smiling and walking anyway",
    ),
    "ceremony": (
        "An opening ceremony with fireworks and a torch, no text banners",
        "A graduation ceremony with caps in the air",
    ),
    "neither": (
        "Two dessert plates, a child choosing neither, hands up",
        "Two closed doors, neither opening, a puzzled kid",
    ),
    "nor": (
        "Neither an umbrella nor a raincoat, standing wet and funny",
        "A lunchbox with neither apple nor sandwich, only a cookie",
    ),
    "neither ... nor ...": (
        "A weather split: neither sunny nor rainy, just fog",
        "A kid who neither swims nor dives, sitting at poolside with a book of pictures",
    ),
    "try out": (
        "Trying out a new bicycle in a park",
        "Trying out for the school choir on a small stage",
    ),
    "bouldering": (
        "A climber on a bouldering wall with crash pads",
        "Outdoor bouldering on a big rock, no ropes",
    ),
    "compete": (
        "Two robots competing in a friendly race",
        "Swimmers competing in lanes",
    ),
    "mascot": (
        "A fluffy team mascot hugging kids at a stadium",
        "A panda mascot dancing on the sidelines",
    ),
    "motto": (
        "A team huddle around a glowing heart motto symbol, no words",
        "A school crest with icons of book, sun, and handshake as a motto, no text",
    ),
    "dramatic": (
        "A dramatic last-second goal, crowd exploding",
        "A dramatic theater spotlight on a surprised actor",
    ),
    "freestyle": (
        "A freestyle swimmer in open water, fluid strokes",
        "A freestyle skateboarder doing a trick",
    ),
    "talented": (
        "A talented young dancer leaping on stage",
        "A talented kid playing two instruments at once, fun",
    ),
    "in wonder": (
        "A child in wonder looking at the Grand Canyon-like view",
        "Kids in wonder watching a whale breach",
    ),
    "set a record": (
        "A jumper setting a record, a bar at a new height, crowd roaring",
        "A swimmer touching the wall, setting a record, a exploding timer without digits",
    ),
    "gold": (
        "Shiny gold bars and a gold necklace",
        "A gold Olympic-style medal close-up, no engraving text",
    ),
    "medal": (
        "Gold, silver, and bronze medals on a podium",
        "A child receiving a sports medal around the neck",
    ),
    "reform": (
        "Old rusty pipes being reformed into a clean new water system",
        "A classroom reform: dusty rows becoming a bright circle of desks",
    ),
    "reform and opening-up": (
        "A Chinese coastal city transforming from old harbor to modern skyline, reform and opening-up, no text",
        "Ships, trains, and new factories opening to the world, hopeful",
    ),
    "worldwide": (
        "A concert livestreamed worldwide, many countries' windows lighting up",
        "A product appearing in shops worldwide on a globe",
    ),
    "citizen": (
        "Citizens voting with picture ballots of trees vs factories, no text",
        "A proud citizen receiving a city key, symbolic",
    ),
    "pride": (
        "Parents watching a recital with pride",
        "A flag-bearer walking with pride, flag is a simple color field",
    ),
    "harmony": (
        "Different animals playing music in harmony",
        "Neighbors of many cultures sharing a meal in harmony",
    ),
    "deeply": (
        "A whale diving deeply into blue ocean",
        "Someone deeply moved, a tear and a smile at a performance",
    ),
    "high point": (
        "The high point of a roller coaster, hands up",
        "The high point of a trip: reaching a mountain summit",
    ),
    "master": (
        "A martial-arts master teaching a student",
        "A master chef plating a perfect dish",
    ),
    "satisfy": (
        "A steaming bowl of noodles that satisfies a hungry kid",
        "A finished puzzle that satisfies a smiling student",
    ),
    "round": (
        "A boxing round bell and two fighters touching gloves, sporty",
        "A tournament bracket as glowing rounds of a competition, unlabeled",
    ),
    "Greek": (
        "Ancient Greek columns and a philosopher's robe, Greek scene",
        "Greek island houses of white and blue, no signs",
    ),
    "Roman": (
        "A Roman aqueduct and a centurion helmet, Roman scene",
        "The Colosseum-like amphitheater, Roman architecture",
    ),
    "drown": (
        "A lifeguard saving someone from drowning, educational safety, not graphic",
        "A cartoon phone 'drowning' in a fishbowl, humorous",
    ),
    "crowd": (
        "A huge crowd cheering in a stadium",
        "A festival crowd with lanterns",
    ),
    "Greece": (
        "Greece: white island houses, olive trees, and the sea",
        "Ancient Greek ruins on a sunny hill in Greece",
    ),
    "Equatorial Guinea": (
        "A Central African coastal scene with rainforest, oil-palm, and a small port, Equatorial Guinea vibe, no text",
        "Sea turtles on a tropical beach near lush forest, Equatorial Guinea",
    ),
}
