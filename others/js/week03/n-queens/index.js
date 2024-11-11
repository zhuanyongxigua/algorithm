// https://leetcode.cn/problems/n-queens/
/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
  const ans = [];
  const map = [];
  const qNodes = [];
  for (let i = 0; i < n; i++) {
    map[i] = (new Array(n)).fill('.');
    qNodes[i] = -1;
  }
  function check (l, c) {
    for (let i = 0; i < l; i++) {
      if (c === qNodes[i]) {
        return false;
      }
      if (Math.abs(c - qNodes[i]) === Math.abs(l - i)) {
        return false;
      }
    }
    return true;
  }
  function dfs (index) {
    if (index === n) {
      const item = [];
      for (let i = 0; i < n; i++) {
        item.push(map[i].join(''));
      }
      ans.push(item);
      return;
    }
    for (let i = 0; i < n; i++) {
      const result = check(index, i);
      if (result) {
        map[index][i] = 'Q';
        qNodes[index] = i;
        dfs(index + 1);
        map[index][i] = '.';
        qNodes[index] = -1;
      }
    }
  }
  for (let i = 0; i < n; i++) {
    map[0][i] = 'Q';
    qNodes[0] = i;
    dfs(1);
    qNodes[0] = -1;
    map[0][i] = '.';
  }
  return ans;
};

export { solveNQueens };
