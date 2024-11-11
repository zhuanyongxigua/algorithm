// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
  if (digits === '') {
    return [];
  }
  const ans = [];
  const input = {};
  input['2'] = 'abc';
  input['3'] = 'def';
  input['4'] = 'ghi';
  input['5'] = 'jkl';
  input['6'] = 'mno';
  input['7'] = 'pqrs';
  input['8'] = 'tuv';
  input['9'] = 'wxyz';
  function dfs (index, acc) {
    if (index === digits.length) {
      ans.push(acc);
      return;
    }
    for (let i = 0; i < input[digits[index]].length; i++) {
      dfs(index + 1, acc + input[digits[index]][i]);
    }
  }
  for (let i = 0; i < input[digits[0]].length; i++) {
    dfs(1, input[digits[0]][i]);
  }
  return ans;
};

export { letterCombinations };
