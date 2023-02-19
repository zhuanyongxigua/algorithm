/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function(coins, amount) {
  const amountList = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER)
  amountList[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        amountList[i] = Math.min(amountList[i], amountList[i - coins[j]] + 1)
      }
    }
  }
  if (amountList[amountList.length - 1] === Number.MAX_SAFE_INTEGER) {
    return -1
  } else {
    return amountList[amountList.length - 1]
  }
}

const coinChange2 = function(coins, amount) {
  const amountList = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER)
  const recursion = function (sum) {
    if (sum === 0) {
      return 0
    }
    if (sum < 0) {
      return -1
    }
    if (amountList[sum] !== Number.MAX_SAFE_INTEGER) {
      return amountList[sum]
    }
    for (const coin of coins) {
      const temp = recursion(sum - coin)
      if (temp !== -1) {
        amountList[sum] = Math.min(recursion(sum - coin) + 1, amountList[sum])
      }
    }
    if (amountList[sum] === Number.MAX_SAFE_INTEGER) {
      amountList[sum] = -1
      return -1
    }
    return amountList[sum]
  }
  const result = recursion(amount)
  if (result === Number.MAX_SAFE_INTEGER) {
    return -1
  } else {
    return result
  }
}

// console.log(coinChange2([1, 10, 9], 18))
// console.log(coinChange2([1, 2, 5], 100))
// console.log(coinChange2([186,419,83,408], 6249))
console.log(coinChange2([2], 3))
