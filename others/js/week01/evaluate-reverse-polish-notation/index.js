// https://leetcode.cn/problems/evaluate-reverse-polish-notation/
/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = function (tokens) {
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const curToken = tokens[i];
    if (
      curToken !== '+'
      && curToken !== '-'
      && curToken !== '*'
      && curToken !== '/'
    ) {
      stack.push(Number(curToken));
    } else {
      const right = stack.pop();
      const left = stack.pop();
      let result = 0;
      if (curToken === '+') {
        result = left + right;
      } else if (curToken === '-') {
        result = left - right;
      } else if (curToken === '*') {
        result = left * right;
      } else {
        const temp = left / right;
        if (temp >= 0) {
          result = Math.floor(temp);
        } else {
          result = Math.ceil(temp);
        }
      }
      stack.push(result);
    }
  }
  return stack.pop();
};

export { evalRPN };
