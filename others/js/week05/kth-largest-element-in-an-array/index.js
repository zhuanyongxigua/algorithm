// https://leetcode.cn/problems/kth-largest-element-in-an-array/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

const findKthLargest = function (nums, k) {
  quickSort(nums, 0, nums.length - 1, k);
  return nums[nums.length - k];
};

function quickSort (list, start, end, k) {
  if (start >= end) return;
  const pivotIndex = partition(list, start, end);
  if (pivotIndex === 4 && start === 0 && end === 5) {
    console.log('hahahahaha');
  }
  if (pivotIndex < list.length - k) {
    quickSort(list, pivotIndex + 1, end, k);
  } else if (pivotIndex > list.length - k) {
    quickSort(list, start, pivotIndex, k);
  } else {
    console.log(pivotIndex, list, start, end);
  }
}

function partition (list, start, end) {
  const pivotIndex = start + Math.floor(Math.random() * (end - start + 1));
  console.log('pivotIndex', pivotIndex);
  const pivot = list[pivotIndex];
  while (start <= end) {
    while (list[start] < pivot) start++;
    while (list[end] > pivot) end--;
    if (start === end) break;
    if (start < end) {
      const temp = list[start];
      list[start] = list[end];
      list[end] = temp;
      start++;
      end--;
    }
  }
  return end;
}

export { findKthLargest };
