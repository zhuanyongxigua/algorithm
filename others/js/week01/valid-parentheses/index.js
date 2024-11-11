// https://leetcode.cn/problems/valid-parentheses/
/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      stack.push(s[i]);
    } else if (s[i] === ')') {
      const result = stack.pop();
      if (result !== '(') {
        return false;
      }
    } else if (s[i] === ']') {
      const result = stack.pop();
      if (result !== '[') {
        return false;
      }
    } else if (s[i] === '}') {
      const result = stack.pop();
      if (result !== '{') {
        return false;
      }
    }
  }
  return stack.length === 0;
};

export { isValid };
