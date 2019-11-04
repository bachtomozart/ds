'use strict'

var maxIncreaseKeepingSkyline = function (grid) {
  let leftRightMax = new Array(grid.length).fill(0);
  let topDownMax = new Array(grid.length).fill(0);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      leftRightMax[i] = Math.max(leftRightMax[i], grid[i][j]);
      topDownMax[j] = Math.max(topDownMax[j], grid[i][j]);
    }
  }
  let output = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      output += Math.min(leftRightMax[i], topDownMax[j]) - grid[i][j];
    }
  }
  return output;
};

maxIncreaseKeepingSkyline([
  [3, 0, 8, 4],
  [2, 4, 5, 7],
  [9, 2, 6, 3],
  [0, 3, 1, 0]
]);