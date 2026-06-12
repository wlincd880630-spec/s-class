/**
 * L05 Page06 · 归纳 / 练习 / 竞赛 共用场景数据
 * 图片：page06-scene-bedroom | classroom | kitchen（Composer 生成）
 * 热区：在 lesson05-page06-hotspot-editor.html 中框选后写回 hotspots
 */
(function (global) {
  "use strict";
  var BASE =
    "https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Grammar/L05/assets/vertex/";
  var rel = function (name) {
    return BASE + name;
  };

  var SCENE_KEYS = ["bedroom", "classroom", "kitchen"];

  var SCENES = {
    bedroom: {
      name: "卧室场景",
      image: rel("page06-scene-bedroom.png"),
      hotspots: {}
    },
    classroom: {
      name: "教室场景",
      image: rel("page06-scene-classroom.png"),
      hotspots: {}
    },
    kitchen: {
      name: "厨房场景",
      image: rel("page06-scene-kitchen.png"),
      hotspots: {}
    }
  };

  /** @type {Array<{cat:string,phrase:string,sentence:string,scene:string,target:string}>} */
  var LEXICON = [
    { cat: "卧室场景", phrase: "on Peter's bookshelf", sentence: "There is a dictionary on Peter's bookshelf.", scene: "bedroom", target: "dictionary" },
    { cat: "卧室场景", phrase: "near the bed", sentence: "The schoolbag is near the bed. It's Peter's.", scene: "bedroom", target: "schoolbag" },
    { cat: "卧室场景", phrase: "on the desk", sentence: "The red cap is on the desk. It's Ella's.", scene: "bedroom", target: "cap" },
    { cat: "卧室场景", phrase: "on the bookshelf", sentence: "The glasses are on the bookshelf. They're my grandparents'.", scene: "bedroom", target: "glasses" },
    { cat: "卧室场景", phrase: "behind the door", sentence: "The ruler is behind the door. It's our teacher's.", scene: "bedroom", target: "ruler" },
    { cat: "卧室场景", phrase: "on the bed", sentence: "The notebook is on the bed. It's mine.", scene: "bedroom", target: "notebook" },
    { cat: "卧室场景", phrase: "next to the window", sentence: "The water bottle is next to the window. It's Peter's.", scene: "bedroom", target: "water bottle" },
    { cat: "卧室场景", phrase: "near the door", sentence: "The shoes are near the door. They're Tom's.", scene: "bedroom", target: "shoes" },
    { cat: "教室场景", phrase: "in front of the blackboard", sentence: "The teacher is in front of the blackboard.", scene: "classroom", target: "blackboard" },
    { cat: "教室场景", phrase: "on the student desk", sentence: "The water bottle is on the student desk. It's hers.", scene: "classroom", target: "water bottle" },
    { cat: "教室场景", phrase: "in the classroom", sentence: "The schoolbag is in the classroom. It's his.", scene: "classroom", target: "schoolbag" },
    { cat: "教室场景", phrase: "behind the teachers' desk", sentence: "The clock is behind the teachers' desk.", scene: "classroom", target: "clock" },
    { cat: "教室场景", phrase: "on the bookshelf", sentence: "The dictionary is on the bookshelf. It's ours.", scene: "classroom", target: "dictionary" },
    { cat: "教室场景", phrase: "near the water bottle", sentence: "The student desk is near the water bottle.", scene: "classroom", target: "student desk" },
    { cat: "教室场景", phrase: "on the desk", sentence: "The pencil case is on the teacher's desk. It's our teacher's.", scene: "classroom", target: "pencil case" },
    { cat: "教室场景", phrase: "next to the window", sentence: "The bookshelf is next to the window.", scene: "classroom", target: "bookshelf" },
    { cat: "厨房场景", phrase: "in the cabinet", sentence: "The dictionary is in the cabinet. It's mine.", scene: "kitchen", target: "dictionary" },
    { cat: "厨房场景", phrase: "on the table", sentence: "The mug is on the table. It's ours.", scene: "kitchen", target: "mug" },
    { cat: "厨房场景", phrase: "on the counter", sentence: "The apple is on the counter. It's hers.", scene: "kitchen", target: "apple" },
    { cat: "厨房场景", phrase: "over the counter", sentence: "The cabinet is over the counter.", scene: "kitchen", target: "cabinet" },
    { cat: "厨房场景", phrase: "next to the fridge", sentence: "The table is next to the fridge.", scene: "kitchen", target: "table" },
    { cat: "厨房场景", phrase: "on the counter", sentence: "Find the apple. It's on the counter.", scene: "kitchen", target: "apple" },
    { cat: "厨房场景", phrase: "in the cabinet", sentence: "Find my dictionary. It's in the cabinet.", scene: "kitchen", target: "dictionary" },
    { cat: "厨房场景", phrase: "on the table", sentence: "Where is the mug? It is on the table.", scene: "kitchen", target: "mug" },
    { cat: "场景综合", phrase: "near the bed", sentence: "Find Peter's schoolbag. It's near the bed.", scene: "bedroom", target: "schoolbag" },
    { cat: "场景综合", phrase: "on the bed", sentence: "Find the notebook. It's on the bed.", scene: "bedroom", target: "notebook" },
    { cat: "场景综合", phrase: "on the student desk", sentence: "Find Ella's water bottle. It's on the student desk.", scene: "classroom", target: "water bottle" },
    { cat: "场景综合", phrase: "in the classroom", sentence: "Find the schoolbag. It's in the classroom.", scene: "classroom", target: "schoolbag" },
    { cat: "场景综合", phrase: "on the table", sentence: "Find the mug. It's on the table.", scene: "kitchen", target: "mug" },
    { cat: "场景综合", phrase: "on the counter", sentence: "Find the apple. It's on the counter.", scene: "kitchen", target: "apple" }
  ];

  var LISTEN_GROUPS = [
    [
      { scene: "bedroom", clue: "Find Peter's schoolbag. It's near the bed.", target: "schoolbag" },
      { scene: "classroom", clue: "Find Ella's water bottle. It's on the student desk.", target: "water bottle" },
      { scene: "kitchen", clue: "Find my dictionary. It's in the cabinet.", target: "dictionary" },
      { scene: "bedroom", clue: "Find the red cap. It's on the desk.", target: "cap" },
      { scene: "kitchen", clue: "Find the mug. It's on the table.", target: "mug" }
    ],
    [
      { scene: "classroom", clue: "The pencil case is on the teacher's desk. It's our teacher's.", target: "pencil case" },
      { scene: "classroom", clue: "Find the schoolbag. It's in the classroom.", target: "schoolbag" },
      { scene: "kitchen", clue: "Find the apple. It's on the counter.", target: "apple" },
      { scene: "bedroom", clue: "Find the notebook. It's on the bed.", target: "notebook" },
      { scene: "bedroom", clue: "The shoes are near the door. They're Tom's.", target: "shoes" }
    ],
    [
      { scene: "bedroom", clue: "The water bottle is next to the window. It's Peter's.", target: "water bottle" },
      { scene: "classroom", clue: "The teacher is in front of the blackboard.", target: "blackboard" },
      { scene: "kitchen", clue: "The cabinet is over the counter.", target: "cabinet" },
      { scene: "bedroom", clue: "There is a dictionary on Peter's bookshelf.", target: "dictionary" },
      { scene: "classroom", clue: "The student desk is near the water bottle.", target: "student desk" }
    ]
  ];

  var SPEECH_TASKS = [
    { scene: "bedroom", item: "Peter's schoolbag", target: "schoolbag", position: "near the bed", expected: "Peter's schoolbag is near the bed." },
    { scene: "classroom", item: "Ella's water bottle", target: "water bottle", position: "on the student desk", expected: "Ella's water bottle is on the student desk." },
    { scene: "kitchen", item: "my dictionary", target: "dictionary", position: "in the cabinet", expected: "My dictionary is in the cabinet." },
    { scene: "bedroom", item: "Ella's cap", target: "cap", position: "on the desk", expected: "Ella's cap is on the desk." },
    { scene: "classroom", item: "Tom's schoolbag", target: "schoolbag", position: "in the classroom", expected: "Tom's schoolbag is in the classroom." },
    { scene: "kitchen", item: "Lucy's mug", target: "mug", position: "on the table", expected: "Lucy's mug is on the table." },
    { scene: "classroom", item: "our teacher's pencil case", target: "pencil case", position: "on the teacher's desk", expected: "Our teacher's pencil case is on the teacher's desk." },
    { scene: "kitchen", item: "Ella's apple", target: "apple", position: "on the counter", expected: "Ella's apple is on the counter." }
  ];

  var HUNT_TASKS = [
    { scene: "bedroom", prompt: "Find Peter's schoolbag. It's near the bed.", target: "schoolbag" },
    { scene: "classroom", prompt: "Find Ella's water bottle. It's on the student desk.", target: "water bottle" },
    { scene: "kitchen", prompt: "Find my dictionary. It's in the cabinet.", target: "dictionary" },
    { scene: "bedroom", prompt: "Find the red cap. It's on the desk.", target: "cap" },
    { scene: "classroom", prompt: "Find the schoolbag. It's in the classroom.", target: "schoolbag" },
    { scene: "kitchen", prompt: "Find the mug. It's on the table.", target: "mug" },
    { scene: "bedroom", prompt: "Find the notebook. It's on the bed.", target: "notebook" },
    { scene: "kitchen", prompt: "Find the apple. It's on the counter.", target: "apple" },
    { scene: "bedroom", prompt: "The water bottle is next to the window. It's Peter's.", target: "water bottle" }
  ];

  var RACE_TASKS = [
    { scene: "bedroom", sentence: "The schoolbag is near the bed. It's Peter's.", target: "schoolbag" },
    { scene: "classroom", sentence: "The water bottle is on the student desk. It's hers.", target: "water bottle" },
    { scene: "kitchen", sentence: "The dictionary is in the cabinet. It's mine.", target: "dictionary" },
    { scene: "bedroom", sentence: "The red cap is on the desk. It's Ella's.", target: "cap" },
    { scene: "classroom", sentence: "The schoolbag is in the classroom. It's his.", target: "schoolbag" },
    { scene: "kitchen", sentence: "The mug is on the table. It's ours.", target: "mug" },
    { scene: "bedroom", sentence: "The notebook is on the bed. It's mine.", target: "notebook" },
    { scene: "kitchen", sentence: "The apple is on the counter. It's hers.", target: "apple" },
    { scene: "bedroom", sentence: "The water bottle is next to the window. It's Peter's.", target: "water bottle" }
  ];

  /** 框选工具：列出每场景需框选的物品 id（去重） */
  function targetsForScene(sceneKey) {
    var set = {};
    LEXICON.forEach(function (x) {
      if (x.scene === sceneKey && x.target) set[x.target] = true;
    });
    LISTEN_GROUPS.forEach(function (g) {
      g.forEach(function (t) {
        if (t.scene === sceneKey && t.target) set[t.target] = true;
      });
    });
    SPEECH_TASKS.forEach(function (t) {
      if (t.scene === sceneKey && t.target) set[t.target] = true;
    });
    HUNT_TASKS.forEach(function (t) {
      if (t.scene === sceneKey && t.target) set[t.target] = true;
    });
    RACE_TASKS.forEach(function (t) {
      if (t.scene === sceneKey && t.target) set[t.target] = true;
    });
    return Object.keys(set).sort();
  }

  var payload = {
    version: 2,
    imageBase: BASE,
    sceneKeys: SCENE_KEYS,
    scenes: SCENES,
    lexicon: LEXICON,
    listenGroups: LISTEN_GROUPS,
    speechTasks: SPEECH_TASKS,
    huntTasks: HUNT_TASKS,
    raceTasks: RACE_TASKS,
    targetsForScene: targetsForScene
  };

  if (global) {
    global.PAGE06_SCENES = payload;
  }
})(typeof window !== "undefined" ? window : null);
