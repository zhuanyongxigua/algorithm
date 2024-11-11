// https://leetcode.cn/problems/container-with-most-water/
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) {
  let ans = 0;
  let i = 0;
  let j = height.length - 1;
  while (i < j) {
    const minHeight = Math.min(height[i], height[j]);
    const area = minHeight * (j - i);
    if (area > ans) {
      ans = area;
    }
    if (height[i] > height[j]) {
      j--;
    } else if (height[i] <= height[j]) {
      i++;
    }
  }
  return ans;
};

export { maxArea };
