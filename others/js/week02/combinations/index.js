// https://leetcode.cn/problems/combinations/description/

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
  const ans = [];
  function dfs (startIndex, pre) {
    if (pre.length > k || n - startIndex + 1 + pre.length < k) {
      return;
    }
    if (startIndex === n + 1) {
      ans.push([...pre]);
      return;
    }
    dfs(startIndex + 1, pre);
    pre.push(startIndex);
    dfs(startIndex + 1, pre);
    pre.pop();
  }
  dfs(1, []);
  return ans;
};

export { combine };
