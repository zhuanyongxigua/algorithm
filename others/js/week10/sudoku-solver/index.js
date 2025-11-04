// https://leetcode.cn/problems/sudoku-solver/description/
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  const row = {};
  const col = {};
  const box = {}
  for (let i = 0; i < board.length; i++) {
    row[i] = 0
    for (let j = 0; j < board[i].length; j++) {
      if (col[j] === undefined) {
        col[j] = 0
      }
      const k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if (box[k] === undefined) {
        box[k] = 0
      }
      if (board[i][j] !== '.') {
        const num = Number(board[i][j])
        row[i] = row[i] | (1 << num);
        col[j] = col[j] | (1 << num);
        box[k] = box[k] | (1 << num);
      }
    }
  }
  function dfs () {
    const point = getLeastPossiblePosition();
    if (point[0] === -1) return true;
    const curStartRow = point[0];
    const curStartCol = point[1];
    const k = Math.floor(curStartRow / 3) * 3 + Math.floor(curStartCol / 3);
    if (board[curStartRow][curStartCol] !== '.') {
      return dfs();
    }
    for (let i = 1; i <= 9; i++) {
      if ((row[curStartRow] >> i) & 1) continue;
      if ((col[curStartCol] >> i) & 1) continue;
      if ((box[k] >> i) & 1) continue;
      board[curStartRow][curStartCol] = i.toString();
      row[curStartRow] = row[curStartRow] | (1 << i);
      col[curStartCol] = col[curStartCol] | (1 << i);
      box[k] = box[k] | (1 << i);
      const result = dfs();
      if (result) {
        return true;
      } else {
        row[curStartRow] = row[curStartRow] & (~(1 << i));
        col[curStartCol] = col[curStartCol] & (~(1 << i));
        box[k] = box[k] & (~(1 << i));
        board[curStartRow][curStartCol] = '.'
      }
    }
    return false;
  }
  function getLeastPossiblePosition () {
    let point = [-1, -1];
    let maxCount = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== '.') continue;
        let curCount = 10;
        const k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        const availability = row[i] | col[j] | box[k];
        curCount = hammingWeight(availability);
        if (curCount > maxCount) {
          maxCount = curCount;
          point = [i, j];
        }
      }
    }
    return point;
  }
  var hammingWeight = function(n) {
    let count = 0;
    while (n > 0) {
      count++;
      n -= n & (-n);
    }
    return count;
  };
  dfs();
};

export { solveSudoku }
