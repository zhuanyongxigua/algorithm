// https://leetcode.cn/problems/range-sum-query-2d-immutable/

/**
 * @param {number[][]} matrix
 */
const NumMatrix = function (matrix) {
  this.prefixSum = [new Array(matrix[0].length + 1).fill(0)];
  for (let i = 0; i < matrix.length; i++) {
    this.prefixSum[i + 1] = new Array(matrix[0].length + 1).fill(0);
    for (let j = 0; j < matrix[i].length; j++) {
      this.prefixSum[i + 1][j + 1] = this.prefixSum[i + 1][j] + this.prefixSum[i][j + 1] - this.prefixSum[i][j] + matrix[i][j];
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  return this.prefixSum[row2 + 1][col2 + 1] - this.prefixSum[row2 + 1][col1] - this.prefixSum[row1][col2 + 1] + this.prefixSum[row1][col1];
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */

export { NumMatrix };
