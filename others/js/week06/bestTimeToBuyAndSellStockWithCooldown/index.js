// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  const c = Math.ceil(prices.length / 3) + 1;
  const f = [];
  function initElement () {
    const ele = [];
    for (let i = 0; i < 2; i++) {
      ele.push([]);
      for (let j = 0; j <= c; j++) {
        ele[i].push(new Array(2).fill(Number.MIN_SAFE_INTEGER));
      }
    }
    return ele;
  }
  f.push(initElement());
  f[0][0][0][0] = 0;
  let ans = 0;
  for (let i = 0; i < prices.length; i++) {
    f.push(initElement());
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < c; k++) {
        for (let l = 0; l < 2; l++) {
          if (f[i][j][k][l] === Number.MIN_SAFE_INTEGER) continue;
          if (j === 0) {
            // eslint-disable-next-line max-depth
            if (l === 0) {
              // 买
              f[i + 1][1][k][0] = Math.max(f[i + 1][1][k][0], f[i][0][k][0] - prices[i]);
            } else {
              // 冷冻期
              f[i + 1][0][k][0] = Math.max(f[i + 1][0][k][0], f[i][0][k][1]);
            }
          } else {
            // eslint-disable-next-line max-depth
            if (l === 0) {
              // 卖
              f[i + 1][0][k + 1][1] = Math.max(f[i + 1][0][k + 1][1], f[i][1][k][0] + prices[i]);
              ans = Math.max(ans, f[i + 1][0][k + 1][1]);
            }
          }
          f[i + 1][j][k][0] = Math.max(f[i + 1][j][k][0], f[i][j][k][l]);
        }
      }
    }
  }
  return ans;
};

export { maxProfit };
