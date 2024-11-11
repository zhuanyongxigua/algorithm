// https://leetcode.cn/problems/longest-increasing-path-in-a-matrix/

// 这里的这个优化思路对我来说很有启发，如果抽出相同逻辑需要很多参数的话，那就可以换个思路，把这个不容易拆出去的参数弄成回调函数。
function check (
  [x, y],
  [m, n],
  matrix,
  fn
) {
  if (x + 1 < m && matrix[x + 1][y] > matrix[x][y]) {
    fn(x + 1, y);
  }
  if (x - 1 >= 0 && matrix[x - 1][y] > matrix[x][y]) {
    fn(x - 1, y);
  }
  if (y + 1 < n && matrix[x][y + 1] > matrix[x][y]) {
    fn(x, y + 1);
  }
  if (y - 1 >= 0 && matrix[x][y - 1] > matrix[x][y]) {
    fn(x, y - 1);
  }
}

/**
 * @param {number[][]} matrix
 * @return {number}
 */
const longestIncreasingPath = function (matrix) {
  if (matrix.length === 0) {
    return 0;
  }
  let ans = 0;
  // Number of columns
  const m = matrix.length;
  // Number of rows
  const n = matrix[0].length;
  const visited = [];
  for (let i = 0; i < m; i++) {
    visited.push(Array(n).fill(0));
  }
  function dfs ([x, y], pre) {
    visited[x][y] = 1;
    let maxSteps = 0;
    check(
      [x, y],
      [m, n],
      matrix,
      (a, b) => {
        if (visited[a][b]) {
          if (visited[a][b] > maxSteps) {
            maxSteps = visited[a][b];
          }
        } else {
          const temp = dfs([a, b], pre + 1);
          if (temp > maxSteps) {
            maxSteps = temp;
          }
        }
      }
    );
    if (maxSteps) {
      visited[x][y] = maxSteps + 1;
      if (maxSteps + 1 > ans) {
        ans = maxSteps + 1;
      }
      return maxSteps + 1;
    }
    if (pre > ans) {
      ans = pre;
    }
    return 1;
  }
  for (let a = 0; a < m; a++) {
    for (let b = 0; b < n; b++) {
      if (!visited[a][b]) {
        dfs([a, b], 1);
      }
    }
  }
  return ans;
};

function longestIncreasingPathBFS (matrix) {
  if (matrix.length === 0) {
    return -1;
  }
  let ans = 0;
  const queue = [];
  const visited = [];
  const m = matrix.length;
  const n = matrix[0].length;
  for (let i = 0; i < m; i++) {
    visited[i] = [];
    for (let j = 0; j < n; j++) {
      visited[i].push({
        depth: 1,
        inDegree: 0
      });
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      check(
        [i, j],
        [m, n],
        matrix,
        (x, y) => {
          visited[x][y].inDegree++;
        }
      );
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j].inDegree) {
        queue.push([i, j]);
      }
    }
  }
  let index = 0;
  while (index < queue.length) {
    const cur = queue[index];
    index++;
    const [a, b] = cur;
    if (visited[a][b].depth > ans) {
      ans = visited[a][b].depth;
    }
    check(
      [a, b],
      [m, n],
      matrix,
      (x, y) => {
        visited[x][y].inDegree--;
        if (visited[a][b].depth + 1 > visited[x][y].depth) {
          visited[x][y].depth = visited[a][b].depth + 1;
        }
        if (!visited[x][y].inDegree) {
          queue.push([x, y]);
        }
      }
    );
  }
  if (visited.length !== 0 && ans === 0) {
    return 1;
  }
  return ans;
}

export { longestIncreasingPath, longestIncreasingPathBFS };
