/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  const disjointSet = new DisjointSet(board.length * board[0].length + 1);
  console.log('first disjointSet', disjointSet.root);
  const index = (m, n) => m * board[0].length + n + 1;
  for (let m = 0; m < board.length; m++) {
      for (let n = 0; n < board[0].length; n++) {
          if (board[m][n] === 'O') {
              if (m - 1 >= 0 && board[m - 1][n] === 'O') {
                  disjointSet.unionSet(index(m, n), index(m - 1, n));
              }
              if (m === 4 && n === 5) {
                  console.log('45', disjointSet.root);
              }
              if (n - 1 >= 0 && board[m][n - 1] === 'O') {
                  disjointSet.unionSet(index(m, n), index(m, n - 1));
              }
              if (m === 0 || n === 0 || m === board.length - 1 || n === board[0].length - 1) {
                  const mnFa = disjointSet.find(index(m, n));
                  disjointSet.unionSet(disjointSet.root[mnFa], disjointSet.root[0]);
              }
              if (disjointSet.root[0] === 29) {
                  console.log('29 m', m, ', n', n);
              }
          }
      }
  }
  const unIndexM = i => Math.floor((i - 1) / board[0].length);
  const unIndexN = i => (i - 1) % board[0].length;
  console.log('disjointSet.root', disjointSet.root);
  console.log('board', board);
  for (let i = 1; i < disjointSet.root.length; i++) {
      const fa = disjointSet.find(i);
      if (fa !== 0) {
          const m = unIndexM(i);
          const n = unIndexN(i);
          console.log('i', i, ', m', m, ', n', n, ', fa', fa);
          board[m][n] = 'X';
      }
  }
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
        if (xFa < yFa) {
          this.root[yFa] = xFa;
        } else {
          this.root[xFa] = yFa;
        }
    }
}

DisjointSet.prototype.find = function(x) {
    if (this.root[x] === x) return x;
    this.root[x] = this.find(this.root[x]);
    return this.root[x];
}

export { solve }
