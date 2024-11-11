// https://leetcode.cn/problems/redundant-connection/description/

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
const findRedundantConnection = function (edges) {
  let ans = [];
  const edgeList = [];
  const hashMap = {};
  for (let i = 0; i < edges.length; i++) {
    const ai = edges[i][0];
    const bi = edges[i][1];
    const curHashValue = {
      index: i,
      value: edges[i]
    };
    hashMap[ai * 10000 + bi] = curHashValue;
    hashMap[bi * 10000 + ai] = curHashValue;
    if (!edgeList[ai]) {
      edgeList[ai] = [];
    }
    if (!edgeList[bi]) {
      edgeList[bi] = [];
    }
    edgeList[ai].push(bi);
    edgeList[bi].push(ai);
  }
  const cache = {};

  function updateAns (index, preIndex) {
    const curEdgeHash = preIndex * 10000 + index;
    if (ans.length === 0) {
      ans = hashMap[curEdgeHash].value;
    } else {
      const ansHash = ans[0] * 10000 + ans[1];
      if (hashMap[ansHash].index < hashMap[curEdgeHash].index) {
        ans = hashMap[curEdgeHash].value;
      }
    }
  }

  let inCycle = false;
  let cyclePoint = -1;
  function dfs (index, preIndex) {
    if (cache[index] === 1) {
      inCycle = true;
      cyclePoint = index;
      return false;
    }
    if (cache[index] === 2) {
      return true;
    }
    cache[index] = 1;
    for (let i = 0; i < edgeList[index].length; i++) {
      if (edgeList[index][i] === preIndex) {
        continue;
      }
      const result = dfs(edgeList[index][i], index);
      if (!result) {
        if (inCycle) {
          updateAns(index, edgeList[index][i]);
        }
        if (cyclePoint === index) {
          inCycle = false;
        }
        return false;
      }
    }
    cache[index] = 2;
    return true;
  }
  for (let i = 1; i < edgeList.length; i++) {
    const result = dfs(i, -1);
    if (!result) {
      return ans;
    }
  }
  return ans;
};

export { findRedundantConnection };
