// https://leetcode.cn/problems/move-zeroes/description/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  if (nums.length <= 1) return nums
  let k = 1
  for (let i = 0; i < k; i++) {
    if (nums[i] === 0) {
      for (let j = k; j < nums.length; j++) {
        if (nums[j] !== 0) {
          k = j
          break
        }
      }
      const temp = nums[k]
      nums[k] = nums[i]
      nums[i] = temp
    }
    k++
    if (k >= nums.length) {
      break
    }
  }
  return nums
};

export { moveZeroes }
