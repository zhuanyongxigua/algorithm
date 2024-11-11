// https://leetcode.cn/problems/corporate-flight-bookings/
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
const corpFlightBookings = function (bookings, n) {
  const differenceList = new Array(n + 1).fill(0);
  for (let i = 0; i < bookings.length; i++) {
    differenceList[bookings[i][0]] += bookings[i][2];
    if (bookings[i][1] + 1 <= n) {
      differenceList[bookings[i][1] + 1] -= bookings[i][2];
    }
  }
  const prefixSum = new Array(n + 1).fill(0);
  for (let i = 1; i < differenceList.length; i++) {
    prefixSum[i] = prefixSum[i - 1] + differenceList[i];
  }
  return prefixSum.slice(1);
};

export { corpFlightBookings };
