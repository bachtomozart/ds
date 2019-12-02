'use strict'

let paintHouses = (paintCosts) => {
  let recursive = paint(paintCosts);
  let dp = Array.from({
    length: paintCosts.length
  }, () => Array(4).fill(0));
  let td = paintTD(paintCosts, dp);
  let bu = paintBU(paintCosts);
  let result = td;
  console.log(`The least cost to paint with non overlapping -> ${result}`);
  return result;
};

let paint = (costs, pos = costs.length - 1, paintPos = 3) => {
  if (pos < 0) return 0;
  let red = paintPos === 0 ? Infinity : costs[pos][0] + paint(costs, pos - 1, 0);
  let blue = paintPos === 1 ? Infinity : costs[pos][1] + paint(costs, pos - 1, 1);
  let green = paintPos === 2 ? Infinity : costs[pos][2] + paint(costs, pos - 1, 2);
  return Math.min(red, blue, green);
}

let paintTD = (costs, dp, pos = costs.length - 1, paintPos = 3) => {
  if (pos < 0) return 0;
  if (dp[pos][paintPos]) return dp[pos][paintPos];
  let red = paintPos === 0 ? Infinity : costs[pos][0] + paintTD(costs, dp, pos - 1, 0);
  let blue = paintPos === 1 ? Infinity : costs[pos][1] + paintTD(costs, dp, pos - 1, 1);
  let green = paintPos === 2 ? Infinity : costs[pos][2] + paintTD(costs, dp, pos - 1, 2);
  dp[pos][paintPos] = Math.min(red, blue, green);
  return dp[pos][paintPos];
}

let paintBU = (costs) => {
  let dp = Array.from({
    length: costs.length + 1
  }, () => Array(4).fill(0));
  for (let i = 0; i <= costs.length; i++) {
    dp[i][0] = Infinity;
    dp[0][i] = 0;
  }
  let result = 0;
  for (let pos = 1; pos <= costs.length; pos++) {
    for (let paintPos = 1; paintPos <= costs[pos - 1].length; paintPos++) {
      let prevRow = [...dp[pos - 1]];
      prevRow[paintPos] = Infinity;
      dp[pos][paintPos] = costs[pos - 1][paintPos - 1] + Math.min(...prevRow);
    }
    result = Math.min(...dp[pos]);
  }
  return result;
};

paintHouses([
  [17, 2, 17],
  [16, 16, 5],
  [14, 3, 9]
])