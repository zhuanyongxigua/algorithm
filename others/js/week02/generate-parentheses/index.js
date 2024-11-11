// https://leetcode.cn/problems/generate-parentheses/description/

const indexesMap = {
  0: [''],
  1: ['()']
};
/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  if (indexesMap[n]) {
    return indexesMap[n];
  }
  const map = {};
  const results = [];
  for (let i = 0; i < n; i++) {
    const left = generateParenthesis(i);
    const right = generateParenthesis(n - i - 1);
    for (let j = 0; j < left.length; j++) {
      for (let k = 0; k < right.length; k++) {
        const result = `(${left[j]})${right[k]}`;
        if (!map[result]) {
          results.push(result);
        }
      }
    }
  }
  indexesMap[n] = results;
  return results;
};

const map = {};

const generateParenthesis2 = function (n) {
  const stack = [')'];
  const results = [];
  function r (num, pre) {
    if (num === 0) {
      let result = pre;
      for (let i = 0; i < stack.length; i++) {
        result = result + ')';
      }
      if (!map[result]) {
        map[result] = true;
        results.push(result);
      }
      return;
    }
    stack.push(')');
    r(num - 1, pre + '(');
    stack.pop();
    if (stack.length !== 0) {
      stack.pop();
      r(num, pre + ')');
      stack.push('(');
    }
  }
  r(n - 1, '(');
  return results;
};

export { generateParenthesis, generateParenthesis2 };
