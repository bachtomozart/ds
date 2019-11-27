'use strict'

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 * https://leetcode.com/problems/01-matrix/
 */
var updateMatrix = function (matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let current = matrix[i][j];
      // Pluses
      let up = matrix[i - 1] && matrix[i - 1][j];
      if (up === undefined) up = Infinity;
      let down = matrix[i + 1] && matrix[i + 1][j];
      if (down === undefined) down = Infinity;
      let left = matrix[i] && matrix[i][j - 1];
      if (left === undefined) left = Infinity;
      let right = matrix[i] && matrix[i][j + 1];
      if (right === undefined) right = Infinity;
      // Crosses
      let diagonalTopLeft = matrix[i - 1] && matrix[i - 1][j - 1];
      if (diagonalTopLeft === undefined) diagonalTopLeft = Infinity;
      let diagonalTopRight = matrix[i - 1] && matrix[i - 1][j + 1];
      if (diagonalTopRight === undefined) diagonalTopRight = Infinity;
      let diagonalBottomLeft = matrix[i + 1] && matrix[i + 1][j - 1];
      if (diagonalBottomLeft === undefined) diagonalBottomLeft = Infinity;
      let diagonalBottomRight = matrix[i + 1] && matrix[i + 1][j + 1];
      if (diagonalBottomRight === undefined) diagonalBottomRight = Infinity;
      if (current === 0) {
        continue;
      } else if (up === 0 ||
        down === 0 ||
        left === 0 ||
        right === 0) {
        continue;
      } else if (diagonalTopLeft === 0) {
        matrix[i][j] = matrix[i][j] + Math.min(up, left);
      } else if (diagonalTopRight === 0) {
        matrix[i][j] = matrix[i][j] + Math.min(up, right);
      } else if (diagonalBottomLeft === 0) {
        matrix[i][j] = matrix[i][j] + Math.min(down, left);
      } else if (diagonalBottomRight === 0) {
        matrix[i][j] = matrix[i][j] + Math.min(down, right);
      } else {
        let values = [up, down, left, right,
          (diagonalTopLeft + up), (diagonalTopLeft + left),
          (diagonalTopRight + up), (diagonalTopRight + right),
          (diagonalBottomLeft + down), (diagonalBottomLeft + left),
          (diagonalBottomRight + down), (diagonalBottomRight + right)
        ]
        matrix[i][j] = matrix[i][j] + Math.min(...values);
      }
    }
  }
  console.log(`${[...matrix]}`);
  return matrix;
};

// updateMatrix([
  // [0, 0, 0],
  // [0, 1, 0],
  // [1, 1, 1]
// ]);
// updateMatrix([[0],[0],[0],[0],[0]]);
updateMatrix([[1,1,0,0,1,0,0,1,1,0],[1,0,0,1,0,1,1,1,1,1],[1,1,1,0,0,1,1,1,1,0],[0,1,1,1,0,1,1,1,1,1],[0,0,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,0,1,1,1],[0,1,1,1,1,1,1,0,0,1],[1,1,1,1,1,0,0,1,1,1],[0,1,0,1,1,0,1,1,1,1],[1,1,1,0,1,0,1,1,1,1]]);