// https://leetcode.cn/problems/basic-calculator/description/

export function evalRPN (tokens) {
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (
      token !== '+'
      && token !== '-'
      && token !== '*'
      && token !== '/'
    ) {
      stack.push(Number(token));
    } else {
      const right = stack.pop();
      const left = stack.pop();
      let result = 0;
      if (token === '+') {
        result = left + right;
      } else if (token === '-') {
        result = left - right;
      } else if (token === '*') {
        result = left * right;
      } else {
        result = left / right;
        if (result >= 0) {
          result = Math.floor(result);
        } else {
          result = Math.ceil(result);
        }
      }
      stack.push(result);
    }
  }
  return stack.pop();
}

function getPriority (op) {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  return 0;
}

function pushZero (s, i, tokens) {
  let j = i + 1;
  while (s[j] === ' ') j++;
  const nextChar = s[j];
  if (getPriority(nextChar) !== 0) {
    tokens.push('0');
  }
}

function parseNum (s, i, tokens) {
  let val = 0;
  let j = i;
  while (s[j] >= '0' && s[j] <= '9') {
    val = val * 10 + Number(s[j]);
    j++;
  }
  if (j === i) {
    return -1;
  }
  tokens.push(String(val));
  return j;
}

/**
 * @param {string} s
 * @return {number}
 */
const calculate = function (s) {
  const tokens = [];
  const opsStack = [];
  pushZero(s, -1, tokens);
  for (let i = 0; i < s.length; i++) {
    const numResult = parseNum(s, i, tokens);
    if (numResult !== -1) {
      i = numResult - 1;
      continue;
    }

    const char = s[i];

    if (char === ' ') continue;

    if (char === '(') {
      opsStack.push(char);
      pushZero(s, i, tokens);
      continue;
    }
    if (char === ')') {
      while (opsStack.length !== 0 && opsStack[opsStack.length - 1] !== '(') {
        tokens.push(opsStack.pop());
      }
      opsStack.pop();
      continue;
    }

    while (opsStack.length !== 0 && getPriority(opsStack[opsStack.length - 1]) >= getPriority(char)) {
      tokens.push(opsStack.pop());
    }
    opsStack.push(char);
  }
  while (opsStack.length !== 0) {
    tokens.push(opsStack.pop());
  }
  return evalRPN(tokens);
};

export { calculate };
