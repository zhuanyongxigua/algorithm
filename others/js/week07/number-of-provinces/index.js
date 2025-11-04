// https://leetcode.cn/problems/number-of-provinces/description/

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
  const length = isConnected.length;
  const disjointSet = new DisjointSet(length);
  for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
          if (isConnected[i][j] === 0 || i === j) continue;
          disjointSet.unionSet(i, j);
      }
  }
  let ans = 0;
  let map = {};
  for (let i = 0; i < disjointSet.root.length; i++) {
      const fa = disjointSet.find(i);
      if (map[fa] === undefined) {
          ans++;
          map[fa] = 1;
      }
  }
  return ans;
};

function DisjointSet(length) {
  this.root = [];
  for (let i = 0; i < length; i++) {
      this.root[i] = i;
  }
}

DisjointSet.prototype.unionSet = function(x, y) {
  const xFa = this.find(x);
  const yFa = this.find(y);
  if (this.root[xFa] !== this.root[yFa]) {
      this.root[xFa] = yFa;
  }
}

DisjointSet.prototype.find = function(x) {
  if (this.root[x] === x) return x;
  this.root[x] = this.find(this.root[x]);
  return this.root[x];
}

export { findCircleNum }
