// https://leetcode.cn/problems/reverse-pairs/

/**
 * @param {number[]} nums
 * @return {number}
 */
let count = 0;
const reversePairs = function (nums) {
  count = 0;
  sort(nums);
  return count;
};

function countPair (left, right) {
  let j = 0;
  for (let i = 0; i < left.length; i++) {
  // 右侧指针不必每次重置，由于 left 有序，j 会单调增加
    while (j < right.length && left[i] > 2 * right[j]) {
      j++;
    }
    // j 指针指向满足条件的 right 元素的个数
    count += j;
  }
}

// function countPair (left, right) {
//   let i = 0;
//   let j = 0;
//   let startCount = false;
//   while (i <= left.length - 1 && j <= right.length - 1) {
//     if (left[i] <= right[j] * 2) {
//       if (!startCount) {
//         i++;
//       } else {
//         count += j;
//         i++;
//       }
//     } else {
//       startCount = true;
//       j++;
//       if (j > right.length - 1) {
//         while (i <= left.length - 1) {
//           count += j;
//           i++;
//         }
//       }
//     }
//   }
// }

function sort (nums) {
  if (nums.length <= 1) return nums;
  const pivot = Math.floor(nums.length >> 1);
  const left = sort(nums.slice(0, pivot));
  const right = sort(nums.slice(pivot));
  countPair(left, right);
  return merge(left, right);
}

function merge (a, b) {
  if (a.length === 0) return b;
  if (b.length === 0) return a;
  const result = [];
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex < a.length && bIndex < b.length) {
    if (a[aIndex] <= b[bIndex]) {
      result.push(a[aIndex]);
      aIndex++;
    } else {
      result.push(b[bIndex]);
      bIndex++;
    }
  }
  if (aIndex <= a.length - 1) {
    for (let i = aIndex; i < a.length; i++) {
      result.push(a[i]);
    }
  }
  if (bIndex <= b.length - 1) {
    for (let i = bIndex; i < b.length; i++) {
      result.push(b[i]);
    }
  }
  return result;
}


export { reversePairs };
