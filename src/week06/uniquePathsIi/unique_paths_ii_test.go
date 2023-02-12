package unique_paths_ii_test

import "testing"

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func uniquePathsWithObstacles(obstacleGrid [][]int) int {
	if len(obstacleGrid) == 0 {
		return 0
	}
	records := make([][]int, len(obstacleGrid))
	for i := range records {
		records[i] = make([]int, len(obstacleGrid[0]))
	}
	for i := 0; i <= len(obstacleGrid); i++ {
		for j := 0; j <= len(obstacleGrid[0]); j++ {
			ans := 0
			if obstacleGrid[i-1][j] != -1 {
				ans += records[i-1][j]
			}
			if obstacleGrid[i][j-1] != -1 {
				ans += records[i][j-1]
			}
			records[i][j] = ans
		}
	}
	return records[len(obstacleGrid)-1][len(obstacleGrid[0])-1]
}

func TestUniquePathsII(t *testing.T) {
	// 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
	// 输出：2
	result := uniquePathsWithObstacles([][]int{[]int{0, 0, 0}, []int{0, 1, 0}, []int{0, 0, 0}})
	t.Log(result)
}
