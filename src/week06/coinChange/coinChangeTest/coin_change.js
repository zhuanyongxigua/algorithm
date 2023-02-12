/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let temp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER)
  temp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        temp[i] = Math.min(temp[i], temp[i - coin] + 1)
      }
    }
  }
  if (temp[temp.length - 1] === Number.MAX_SAFE_INTEGER) {
    return -1
  }
  return temp[temp.length - 1]
}

coinChange([1, 10, 9], 18)
