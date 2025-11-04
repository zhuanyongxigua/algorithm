/**
 * @param {number[]} stones
 * @param {number} k
 * @return {number}
 */
// eslint-disable-next-line
const mergeStones = function (stones, k) {
  if ((stones.length - 1) % (k - 1) !== 0) return -1;
  const sum = [0];
  for (let i = 0; i < stones.length; i++) {
    sum[i + 1] = sum[i] + stones[i];
  }
  console.log('sum', sum);
  const f = [[]];
  for (let i = 0; i <= stones.length; i++) {
    f[0].push(new Array(k + 1).fill(0));
  }
  // const step = 1;
  for (let len = 1; len <= stones.length; len++) {
    f.push([new Array(k + 1).fill(0)]);
    for (let l = 1; l <= stones.length - len + 1; l++) {
      f[len].push(new Array(k + 1).fill(0));
      for (let curK = 2; curK <= k; curK++) {
        if (curK > len) break;
        let ans = Number.MAX_SAFE_INTEGER;
        for (let mid = l + 1; mid <= l + len - curK + 1; mid += k - 1) {
          ans = Math.min(ans, f[mid - l][l][1] + f[len - mid + l][mid][curK - 1]);
        }
        f[len][l][curK] = ans;
        if (curK === k) {
          f[len][l][1] = f[len][l][k] + sum[l + len - 1] - sum[l - 1];
        }
      }
    }
  }
  console.log(f);
  return f[stones.length][1][1];
};

/**
 * @param {number[]} stones
 * @param {number} k
 * @return {number}
 */
const mergeStones2 = function (stones, k) {
  if ((stones.length - 1) % (k - 1) !== 0) return -1;
  const sum = [stones[0]];
  for (let i = 1; i < stones.length; i++) {
    sum[i] = sum[i - 1] + stones[i];
  }
  const f = [new Array(stones.length).fill(-1)];
  function recursion (l, r, curK) {
    if (l >= r) return 0;
    const length = r - l + 1;
    if (f[length][l] !== -1) return f[length][l];
    const total = sum[r] - (l === 0 ? 0 : sum[l - 1]);
    if (r - l + 1 === k) return total;
    let ans = Number.MAX_SAFE_INTEGER;
    for (let len = 1; len <= length - curK + 1; len++) {
      const result = recursion(l + len, r, curK - 1);
      if (result === -1) continue;
      const cur = len === 1 ? 0 : f[len][l];
      if (cur === -1) continue;
      ans = Math.min(ans, curK === k ? total + cur + result : cur + result);
    }
    return ans === Number.MAX_SAFE_INTEGER ? -1 : ans;
  }
  for (let len = 1; len <= stones.length; len++) {
    f.push(new Array(stones.length).fill(-1));
    if ((len - 1) % (k - 1) !== 0) continue;
    for (let l = 0; l <= stones.length - len; l++) {
      f[len][l] = recursion(l, l + len - 1, k);
    }
  }
  console.log(f);
  return f[stones.length][0];
};


export { mergeStones, mergeStones2 };
