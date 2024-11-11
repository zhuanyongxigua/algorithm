// https://leetcode.cn/problems/largest-rectangle-in-histogram/
/**
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
  let ans = 0;
  const stack = [];
  heights.push(0);
  for (let i = 0; i < heights.length; i++) {
    let width = 0;
    while (stack.length > 0 && heights[i] <= stack[stack.length - 1].height) {
      const curTop = stack.pop();

      if (stack.length === 0) {
        width += curTop.index + 1;
      } else {
        width += curTop.index - stack[stack.length - 1].index;
      }

      const area = curTop.height * width;
      ans = Math.max(area, ans);
    }
    stack.push({ height: heights[i], index: i });
  }
  return ans;
};

export { largestRectangleArea };
