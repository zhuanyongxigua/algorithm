// https://leetcode.cn/problems/minimum-genetic-mutation/
/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
const minMutation = function (startGene, endGene, bank) {
  let ans = [];
  const chars = ['A', 'C', 'G', 'T'];
  const map = {};
  for (let a = 0; a < bank.length; a++) {
    map[bank[a]] = 1;
  }
  const temp = [];
  function check () {
    if (temp[temp.length - 1] === endGene) {
      if (ans.length !== 0) {
        if (temp.length < ans.length) {
          ans = temp.slice();
        }
      } else {
        ans = temp.slice();
      }
      return true;
    }
    return false;
  }
  function dfs (index, cur) {
    check();
    if (temp.length >= bank.length) {
      return;
    }
    if (map[cur] === 2) {
      return;
    }
    map[cur] = 2;
    for (let d = 0; d < chars.length; d++) {
      const next = cur.substring(0, index) + chars[d] + cur.substring(index + 1);
      if (map[next] === 1) {
        for (let e = 0; e < startGene.length; e++) {
          if (e === index) {
            continue;
          }
          temp.push(next);
          if (check()) {
            temp.pop();
            break;
          } else {
            dfs(e, next);
          }
          temp.pop();
        }
      }
    }
    map[cur] = 1;
  }
  for (let c = 0; c < startGene.length; c++) {
    dfs(c, startGene);
  }
  return ans.length || -1;
};

function minMutationBFS (startGene, endGene, bank) {
  if (bank.length === 0) {
    return -1;
  }
  const map = {};
  const chars = ['A', 'C', 'G', 'T'];
  for (let i = 0; i < bank.length; i++) {
    map[bank[i]] = 1;
  }
  if (!map[endGene]) {
    return -1;
  }
  const queue = [{
    cur: startGene,
    prev: '',
    depth: 0
  }];
  while (queue.length !== 0) {
    const curItem = queue.pop();
    const cur = curItem.cur;
    for (let a = 0; a < chars.length; a++) {
      const curChar = chars[a];
      for (let b = 0; b < startGene.length; b++) {
        const next = cur.substring(0, b) + curChar + cur.substring(b + 1);
        if (next === cur || next === curItem.prev) {
          continue;
        }
        if (next === endGene) {
          return curItem.depth + 1;
        }
        if (map[next]) {
          queue.push({
            cur: next,
            prev: cur,
            depth: curItem.depth + 1
          });
        }
      }
    }
  }
  return -1;
}

export { minMutation, minMutationBFS };
