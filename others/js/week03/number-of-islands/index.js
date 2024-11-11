// https://leetcode.cn/problems/number-of-islands/
/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
  let ans = 0;
  const visited = [];
  const columnNum = grid[0].length;
  const lineNum = grid.length;
  for (let i = 0; i < grid.length; i++) {
    visited.push((new Array(grid[i].length)).fill(0));
  }
  function dfs (x, y) {
    visited[x][y] = 1;
    if (x < lineNum - 1 && grid[x + 1][y] === '1' && !visited[x + 1][y]) {
      dfs(x + 1, y);
    }
    if (y < columnNum - 1 && grid[x][y + 1] === '1' && !visited[x][y + 1]) {
      dfs(x, y + 1);
    }
    if (x > 0 && grid[x - 1][y] === '1' && !visited[x - 1][y]) {
      dfs(x - 1, y);
    }
    if (y > 0 && grid[x][y - 1] === '1' && !visited[x][y - 1]) {
      dfs(x, y - 1);
    }
  }
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[i].length; j++) {
      if (!visited[i][j] && grid[i][j] !== '0') {
        dfs(i, j);
        ans++;
      }
    }
  }
  return ans;
};

export { numIslands };
