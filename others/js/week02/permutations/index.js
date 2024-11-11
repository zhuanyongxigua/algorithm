// https://leetcode.cn/problems/permutations/description/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
  const ans = [];
  const marked = {};
  for (let i = 0; i < nums.length; i++) {
    marked[nums[i]] = false;
  }
  function dfs (pre) {
    if (pre.length === nums.length) {
      ans.push([...pre]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!marked[nums[i]]) {
        marked[nums[i]] = true;
        pre.push(nums[i]);
        dfs(pre);
        marked[nums[i]] = false;
        pre.pop();
      }
    }
  }
  dfs([]);
  return ans;
};

export { permute };
