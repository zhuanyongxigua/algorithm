// https://leetcode.cn/problems/powx-n/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (n < 0) return 1 / myPow(x, -n);
  if (n === 0) return 1;
  let exp = BigInt(n);
  let ans = 1;
  while (exp > 0n) {
    if (exp & 1n) {
      ans = ans * x;
    }
    exp = exp >> 1n;
    x = x * x;
  }
  return ans;
};

export { myPow }
