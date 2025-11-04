/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  const row = {};
  const col = {};
  const box = {}
  for (let i = 0; i < board.length; i++) {
    row[i] = {}
    for (let j = 0; j < board[i].length; j++) {
      if (col[j] === undefined) {
        col[j] = {}
      }
      const k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if (box[k] === undefined) {
        box[k] = {}
      }
      if (board[i][j] !== '.') {
        row[i][board[i][j]] = true;
        col[j][board[i][j]] = true;
        box[k][board[i][j]] = true;
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
      if (row[curStartRow][i]) continue;
      if (col[curStartCol][i]) continue;
      if (box[k][i]) continue;
      board[curStartRow][curStartCol] = i.toString();
      row[curStartRow][i] = true;
      col[curStartCol][i] = true;
      box[k][i] = true;
      const result = dfs();
      if (result) {
        return true;
      } else {
        row[curStartRow][i] = false;
        col[curStartCol][i] = false;
        box[k][i] = false;
        board[curStartRow][curStartCol] = '.'
      }
    }
    return false;
  }
  function getLeastPossiblePosition () {
    let point = [-1, -1];
    let maxCount = 10;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== '.') continue;
        let curCount = 0;
        const k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        for (let num = 1; num <= 9; num++) {
          if (!row[i][num] && !col[j][num] && !box[k][num]) {
            curCount++;
          }
        }
        if (curCount < maxCount) {
          maxCount = curCount;
          point = [i, j];
        }
      }
    }
    return point;
  }
  dfs();
};

export { solveSudoku }
