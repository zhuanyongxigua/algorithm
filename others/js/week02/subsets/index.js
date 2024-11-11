// https://leetcode.cn/problems/subsets/description/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  const ans = [];
  function dfs (pre, index) {
    if (index === nums.length) {
      ans.push([...pre]);
      return;
    }
    dfs(pre, index + 1);
    pre.push(nums[index]);
    dfs(pre, index + 1);
    pre.pop();
  }
  dfs([], 0);
  return ans;
};

export { subsets };
