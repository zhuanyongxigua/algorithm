// https://leetcode.cn/problems/sliding-window-maximum/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = function (nums, k) {
  if (nums.length <= 1) {
    return nums;
  }

  const queue = [];
  const ans = [];

  for (let i = 0; i < nums.length; i++) {
    if (queue.length > 0 && i - k >= queue[0].index) {
      queue.shift();
    }
    while (queue.length > 0 && queue[queue.length - 1].value <= nums[i]) {
      queue.pop();
    }
    queue.push({ value: nums[i], index: i });
    if (i >= k - 1) {
      ans.push(queue[0].value);
    }
  }
  return ans;
};

export { maxSlidingWindow };
