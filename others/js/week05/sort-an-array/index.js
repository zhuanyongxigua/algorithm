// https://leetcode.cn/problems/sort-an-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  quickSort(nums, 0, nums.length - 1)
  return nums;
};

function quickSort (a, l, r) {
  if (l >= r) return
  const pivot = partition(a, l, r)
  quickSort(a, l, pivot)
  quickSort(a, pivot + 1, r)
}

var partition = function(a, l, r) {
  let pivot = l + Math.floor(Math.random() * (r - l + 1));
  let pivotVal = a[pivot];
  while (l <= r) {
    while (a[l] < pivotVal) l++;
    while (a[r] > pivotVal) r--;
    // if (l == r) break;
    if (l <= r) {
      let temp = a[l]; a[l] = a[r]; a[r] = temp;
      l++;
      r--;
    }
  }
  return r;
}

export { sortArray }
