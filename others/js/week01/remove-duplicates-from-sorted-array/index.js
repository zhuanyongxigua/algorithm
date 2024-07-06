// https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/
/**
 * @param {number[]} nums
 * @return {number}
 */
export function removeDuplicates (nums) {
  let k = 0
  let curDuplicatedNum = -100000000
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== curDuplicatedNum) {
      nums[k] = nums[i]
      curDuplicatedNum = nums[i]
      k++
    }
  }
  return k
};