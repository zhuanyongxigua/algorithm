// https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (numbers, target) {
  let i = 0;
  let j = numbers.length - 1;
  while (i < j) {
    if (numbers[i] + numbers[j] > target) {
      j--;
      continue;
    } else if (numbers[i] + numbers[j] < target) {
      i++;
      continue;
    }
    break;
  }
  return [i + 1, j + 1];
};

export { twoSum };
