// https://leetcode.cn/problems/merge-sorted-array/description/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
export function merge (nums1, m, nums2, n) {
  if (n === 0) return
  let k = m + n - 1
  let i = m - 1
  let j = n - 1
  while (i >= 0 || j >= 0) {
    if (j < 0 || nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i]
      k--
      i--
    } else {
      nums1[k] = nums2[j]
      k--
      j--
    }
  }
};