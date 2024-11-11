// https://leetcode.cn/problems/powx-n/description/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function (x, n) {
  if (n < 0) return 1 / myPow(x, -n);
  if (n === 0) return 1;
  const half = myPow(x, Math.floor(n / 2));
  if (n % 2 === 0) {
    return half * half;
  } else {
    return half * half * x;
  }
};

export { myPow };
