'use strict'

let placeNQueens = (n) => {
  let result = 0;
  let board = Array.from({
    length: n
  }, () => Array(n).fill(0));
  if (n <= 3) return result;
  nQueen(board, 0, () => {
    result++;
  });
  console.log(`${n} -> ${result}`);
  return result;
};

let nQueen = (board, row, cb) => {
  if (row >= board.length) {
    cb();
    return;
  }
  for (let y = 0; y < board.length; y++) {
    board[row][y] = 1;
    if (unattacked(board, row, y)) {
      nQueen(board, row + 1, cb);
    }
    board[row][y] = 0;
  }
  return;
}

let unattacked = (board, row, column) => {
  for (let y = 0; y < board.length; y++) {
    if (y === column) continue;
    if (board[row][y] === 1) return false;
  }
  for (let x = 0; x < board.length; x++) {
    if (x === row) continue;
    let offset = Math.abs(x - row);
    if (board[x][column] === 1) return false;
    if (board[x][column + offset] === 1) return false;
    if (board[x][column - offset] === 1) return false;
  }
  return true;
}

placeNQueens(4);