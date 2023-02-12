/**
 * @param {string} s
 * @return {number}
 */
exports.longestValidParentheses = function(s) {
  let max = 0
  let curMax = 0
  let maxCache = []
  let leftNum = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      ++leftNum
    }
    if (s[i] === ')') {
      if (leftNum !== 0) {
        --leftNum
        curMax += 2
      }
    }
    if (leftNum <= 0) {
      maxCache.push(curMax)
      curMax = 0
    } else {
      if (i === s.length - 1) {
        maxCache.push(curMax)
      } else {
        maxCache.push(0)
      }
    }
  }
  let prevIndex = 0
  curMax = 0
  for (let i = 0; i < maxCache.length; i++) {
    if (maxCache[i] !== 0) {
      if (i - prevIndex === maxCache[i]) {
        curMax += maxCache[i]
        prevIndex = i
      } else {
        if (curMax > max) {
          max = curMax
        }
        curMax = maxCache[i]
        prevIndex = i
      }
    }
  }
  if (curMax > max) {
    max = curMax
  }
  return max
};

// console.log(longestValidParentheses('(()')) // 2
// console.log(longestValidParentheses(')()())')) // 4
// console.log(longestValidParentheses(')()())()()()')) // 6
// console.log(longestValidParentheses(')((()())))()()()')) // 8
