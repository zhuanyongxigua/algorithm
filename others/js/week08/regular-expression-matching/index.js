import { transpose } from "../../utils";
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  s = ' ' + s;
  p = ' ' + p;
  const ans = [new Array(p.length).fill(0)];
  ans[0][0] = 1;
  for (let i = 2; i < p.length; i++) {
      if (p[i] === '*' && ans[0][i - 2] === 1) ans[0][i] = 1;
  }
  for (let i = 1; i < s.length; i++) {
      ans.push(new Array(p.length).fill(0));
      for (let j = 1; j < p.length; j++) {
          if (p[j] === '*') {
            // 前两两个条件是解决多个匹配的问题，比如 a* 可以匹配 aaaa
            // 最后一个是解决 0 个的问题，比如 ba* 可以匹配 b
              if (s[i] !== p[j - 1] && p[j - 1] !== '.' && ans[i][j - 2] !== 1) {
                  ans[i][j] = 0;
              } else {
                  ans[i][j] = Math.max(ans[i - 1][j - 1], ans[i - 1][j], ans[i][j - 1], ans[i][j - 2]);
              }
          } else if (s[i] === p[j] || p[j] === '.') {
              if (p[j - 1] === '*' && ans[i - 1][j - 1] === 1) {
                ans[i][j] = 1;
                // 确实只看斜前方就可以了，不可能出现 ans[i - 1][j - 1] 是 1，且 ans[i - 1][j] 也是 1 的情况
              } else if (ans[i - 1][j - 1] === 1) {
                  ans[i][j] = 1;
              } else {
                  ans[i][j] = 0;
              }
          } else {
              ans[i][j] = 0;
          }
      }
  }
  return ans[s.length - 1][p.length - 1];
};

export { isMatch }
