/**
 * World's Largest Deserts? · 动态单词迷宫
 *
 * 7×7 起步；按最长单词自动扩容。四个词分别使用左→右、右→左、
 * 上→下、下→上四个方向，路径使用内部行与外侧列，保证互不冲突。
 */
(function (global) {
  "use strict";

  function shuffle(list) {
    if (global.NgReview && global.NgReview.shuffle) {
      return global.NgReview.shuffle(list.slice());
    }
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function lettersOf(word) {
    return String(word.word || "")
      .replace(/[\s-]/g, "")
      .toLowerCase()
      .split("");
  }

  function generateMaze(words) {
    var list = words.slice(0, 4);
    if (list.length < 4) {
      return { grid: [[]], placements: [], size: 7 };
    }

    var longest = list.reduce(function (max, word) {
      return Math.max(max, lettersOf(word).length);
    }, 0);
    var size = Math.max(7, longest + 2);
    var grid = Array.from({ length: size }, function () {
      return Array.from({ length: size }, function () { return ""; });
    });

    var slots = shuffle([
      { id: "lr", dr: 0, dc: 1, r: 1, c: 1 },
      { id: "rl", dr: 0, dc: -1, r: size - 2, c: size - 2 },
      { id: "tb", dr: 1, dc: 0, r: 1, c: 0 },
      { id: "bt", dr: -1, dc: 0, r: size - 2, c: size - 1 },
    ]);

    var placements = list.map(function (word, index) {
      var slot = slots[index];
      var cells = lettersOf(word).map(function (letter, i) {
        var cell = {
          r: slot.r + slot.dr * i,
          c: slot.c + slot.dc * i,
          letter: letter,
        };
        grid[cell.r][cell.c] = letter;
        return cell;
      });
      return { word: word, cells: cells, dir: slot.id };
    });

    for (var r = 0; r < size; r++) {
      for (var c = 0; c < size; c++) {
        if (!grid[r][c]) {
          grid[r][c] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
    }

    return { grid: grid, placements: shuffle(placements), size: size };
  }

  global.ReptileMazeGenerator = { generate: generateMaze };
  if (global.NgReview) {
    global.NgReview.generateMazeGrid7 = generateMaze;
  }
})(typeof window !== "undefined" ? window : this);
