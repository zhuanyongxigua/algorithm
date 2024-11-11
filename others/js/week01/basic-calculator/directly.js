function getPriority (op) {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  return 0;
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
  tokens.push(val);
  return j;
}

export function getBracketEnd (s, index) {
  const stack = ['('];
  for (let i = index + 1; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push('(');
    } else if (s[i] === ')') {
      stack.pop();
      if (stack.length === 0) {
        return i;
      }
    }
  }
}

export function parse (s, start, end) {
  const tokens = [];
  for (let i = start; i <= end; i++) {
    const numResult = parseNum(s, i, tokens);
    if (numResult !== -1) {
      i = numResult - 1;
      continue;
    }
    const char = s[i];

    if (char === ' ') continue;

    if (char === '(') {
      const bracketEndIndex = getBracketEnd(s, i);
      const bracketTokens = parse(s, i + 1, bracketEndIndex - 1);
      tokens.push(bracketTokens);
      i = bracketEndIndex;
      continue;
    }

    tokens.push(char);
  }
  return tokens;
}

function cal (left, op, right) {
  if (op === '+') {
    return left + right;
  } else if (op === '-') {
    return left - right;
  } else if (op === '*') {
    return left * right;
  } else {
    const result = left / right;
    if (result >= 0) {
      return Math.floor(result);
    } else {
      return Math.ceil(result);
    }
  }
}

function calTokens (tokens) {
  let val = tokens[0];
  let i = 1;
  if (typeof val === 'string') {
    val = 0;
    i = 0;
  } else if (typeof val === 'object') {
    val = calTokens(val);
  }
  while (i < tokens.length) {
    const token = tokens[i];
    if (getPriority(tokens[i + 2]) > getPriority(token)) {
      const right = calTokens(tokens, i + 1)[0];
      return cal(val, token, right);
    } else {
      let right = tokens[i + 1];
      if (typeof right === 'object') {
        right = calTokens(right);
      }
      if (typeof val === 'object') {
        val = calTokens(val);
      }
      val = cal(val, token, right);
      i = i + 2;
    }
  }
  return val;
}

/**
 * @param {string} s
 * @return {number}
 */
const calculate = function (s) {
  const tokens = parse(s, 0, s.length - 1);
  return calTokens(tokens);
};

export { calculate };
