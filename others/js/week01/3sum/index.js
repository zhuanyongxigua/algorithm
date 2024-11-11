// https://leetcode.cn/problems/3sum/

const twoSum = function (numbers, target, start) {
  let i = start;
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
  if (i >= j) {
    return [];
  }
  return [i, j];
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  nums = nums.sort((a, b) => a - b);
  const ans = [];
  const targets = {};
  for (let i = 0; i < nums.length; i++) {
    const target = 0 - nums[i];
    let startIndex = i + 1;
    let result = twoSum(nums, target, startIndex);
    while (result.length) {
      const hash = `${nums[result[0]]},${nums[result[1]]}`;
      if (targets[hash]) {
        startIndex += 1;
        result = twoSum(nums, target, startIndex);
        continue;
      }
      targets[hash] = 1;
      const ansItem = [nums[result[0]], nums[result[1]]];
      ansItem.push(nums[i]);
      ans.push(ansItem);
      startIndex = result[0] + 1;
      result = twoSum(nums, target, startIndex);
    }
  }
  // console.log('ans: ', ans);
  return ans;
};

export { threeSum };
