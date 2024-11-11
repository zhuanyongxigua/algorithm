// https://leetcode.cn/problems/maximum-subarray/
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function (nums) {
  const prefixSum = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefixSum[i + 1] = prefixSum[i] + nums[i];
  }
  let ans = -10000000;
  let minPrefix = prefixSum[0];
  for (let i = 1; i < prefixSum.length; i++) {
    if (prefixSum[i] - minPrefix > ans) {
      ans = prefixSum[i] - minPrefix;
    }
    if (prefixSum[i] < minPrefix) {
      minPrefix = prefixSum[i];
    }
  }
  return ans;
};

export { maxSubArray };
