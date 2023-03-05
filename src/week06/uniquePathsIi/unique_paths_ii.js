/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  const stepsGrid = new Array(obstacleGrid.length).fill([])
  stepsGrid.forEach((gridElement, index) => {
    stepsGrid[index] = new Array(obstacleGrid[0].length).fill(0)
  })
  stepsGrid[0][0] = 1
  for (let i = 0; i < stepsGrid.length; i++) {
    for (let j = 0; j < stepsGrid[i].length; j++) {
      if (obstacleGrid[i][j] === 1) {
        stepsGrid[i][j] = 0
        continue
      }
      // [i][j - 1] + 1
      // [i - 1][j] + 1
      if (j > 0 && obstacleGrid[i][j - 1] !== 1) {
        stepsGrid[i][j] += stepsGrid[i][j - 1]
      }
      if (i > 0 && obstacleGrid[i - 1][j] !== 1) {
        stepsGrid[i][j] += stepsGrid[i - 1][j]
      }
    }
  }
  return stepsGrid[stepsGrid.length - 1][stepsGrid[0].length - 1]
};

// console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]))
console.log(uniquePathsWithObstacles([[1]]))
