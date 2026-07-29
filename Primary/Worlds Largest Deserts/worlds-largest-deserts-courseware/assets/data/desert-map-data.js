/**
 * World's Largest Deserts · 地图拖拽游戏数据
 * 坐标为 WGS84 地理中心（依据 Britannica 范围与常见地理质心）
 * 判定半径按沙漠实际跨度设定（公里）
 * 英文简介约 Lexile 600 · 小学五年级
 */
window.DESERT_MAP_GAME = {
  title: "Pin the Deserts",
  titleZh: "沙漠地理位置",
  instructionEn: "Drag each desert name onto its real place on the world map.",
  instructionZh: "把沙漠名称拖到世界地图上真实的位置。",
  completeEn: "Great work! You placed all ten deserts.",
  completeZh: "太棒了！十大沙漠都放对了。",
  deserts: [
    {
      id: "antarctic",
      name: "Antarctic Ice Sheet",
      nameZh: "南极冰盖",
      lat: -80.0,
      lng: 0.0,
      radiusKm: 1800,
      type: "polar",
      en: "The Antarctic Ice Sheet is the largest desert on Earth. It is very cold and dry. It gets almost no rain.",
      zh: "南极冰盖是地球上最大的沙漠。它又冷又干，几乎不下雨。"
    },
    {
      id: "arctic",
      name: "Arctic",
      nameZh: "北极",
      lat: 78.0,
      lng: -40.0,
      radiusKm: 1500,
      type: "polar",
      en: "The Arctic is the second largest desert. It is a polar desert near the North Pole. It is cold and icy.",
      zh: "北极是第二大沙漠。它是靠近北极点的极地沙漠，又冷又结冰。"
    },
    {
      id: "sahara",
      name: "Sahara",
      nameZh: "撒哈拉",
      lat: 23.5,
      lng: 13.0,
      radiusKm: 1100,
      type: "hot",
      en: "The Sahara is the largest hot desert. It covers much of northern Africa. Days can be very hot.",
      zh: "撒哈拉是最大的热沙漠。它覆盖非洲北部大片地区。白天可能很热。"
    },
    {
      id: "arabian",
      name: "Arabian",
      nameZh: "阿拉伯沙漠",
      lat: 25.0,
      lng: 42.0,
      radiusKm: 550,
      type: "hot",
      en: "The Arabian Desert is in southwestern Asia. It has sand dunes and dry land. It is one of the biggest deserts.",
      zh: "阿拉伯沙漠在亚洲西南部。那里有沙丘和干燥土地。它是最大的沙漠之一。"
    },
    {
      id: "gobi",
      name: "Gobi",
      nameZh: "戈壁",
      lat: 42.5,
      lng: 105.0,
      radiusKm: 600,
      type: "cold-winter",
      en: "The Gobi Desert is in Mongolia and China. Winters are cold. Tall mountains help block rain.",
      zh: "戈壁沙漠在蒙古和中国。冬天很冷。高山会挡住雨水。"
    },
    {
      id: "kalahari",
      name: "Kalahari",
      nameZh: "卡拉哈里",
      lat: -24.0,
      lng: 22.0,
      radiusKm: 480,
      type: "hot",
      en: "The Kalahari is a large desert in southwestern Africa. It has red sand and sparse plants.",
      zh: "卡拉哈里是非洲西南部的大沙漠。那里有红沙和稀疏的植物。"
    },
    {
      id: "patagonian",
      name: "Patagonian",
      nameZh: "巴塔哥尼亚",
      lat: -45.0,
      lng: -68.0,
      radiusKm: 480,
      type: "cold-winter",
      en: "The Patagonian Desert is in southern Argentina. It is a cold winter desert with dry, windy land.",
      zh: "巴塔哥尼亚沙漠在阿根廷南部。它是冬天寒冷的沙漠，土地干燥多风。"
    },
    {
      id: "rub_al_khali",
      name: "Rub' al-Khali",
      nameZh: "鲁卜哈利",
      lat: 19.5,
      lng: 51.0,
      radiusKm: 380,
      type: "hot",
      en: "Rub' al-Khali means Empty Quarter. It is a huge sandy desert on the southern Arabian Peninsula.",
      zh: "鲁卜哈利的意思是“空白之地”。它是阿拉伯半岛南部的巨大沙质沙漠。"
    },
    {
      id: "great_victoria",
      name: "Great Victoria",
      nameZh: "维多利亚大沙漠",
      lat: -29.0,
      lng: 129.0,
      radiusKm: 420,
      type: "hot",
      en: "The Great Victoria Desert is in Australia. It has red sand plains and sparse plants.",
      zh: "维多利亚大沙漠在澳大利亚。那里有红色沙地和稀疏的植物。"
    },
    {
      id: "great_basin",
      name: "Great Basin",
      nameZh: "大盆地",
      lat: 39.5,
      lng: -116.5,
      radiusKm: 420,
      type: "cold-winter",
      en: "The Great Basin Desert is in the western United States. Mountains surround dry valleys.",
      zh: "大盆地沙漠在美国西部。高山环绕着干燥的山谷。"
    }
  ]
};
