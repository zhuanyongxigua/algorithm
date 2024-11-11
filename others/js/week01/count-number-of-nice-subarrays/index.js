// https://leetcode.cn/problems/count-number-of-nice-subarrays/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const numberOfSubarrays = function (nums, k) {
  const s = [0];
  for (let i = 0; i < nums.length; i++) {
    s[i + 1] = s[i] + nums[i] % 2;
  }
  const l = new Array(s.length).fill(0);
  for (let i = 0; i < s.length; i++) {
    l[s[i]] += 1;
  }

  let ans = 0;
  for (let i = 0; i < l.length; i++) {
    if (s[i] - k >= 0) {
      ans += l[s[i] - k];
    }
  }
  return ans;
};

export { numberOfSubarrays };
