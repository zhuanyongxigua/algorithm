package triangle_test

import "testing"

func minimumTotal(triangle [][]int) int {
	if len(triangle) == 1 {
			return triangle[0][0]
	}
	dp := make([][]int, len(triangle))
	for i := 0; i < len(dp); i++ {
			dp[i] = make([]int, len(triangle[i]))
	}
	for i := len(triangle) - 1; i >= 0; i-- {
			for j := len(triangle[i]) - 1; j >= 0; j-- {
					if len(triangle) <= i + 1 {
							dp[i][j] = triangle[i][j]
							continue
					}
					dp[i][j] = min(dp[i+1][j] + triangle[i][j], dp[i+1][j+1] + triangle[i][j])
			}
	}
	return dp[0][0]
}

func min(a, b int) int {
	if a > b {
			return b
	}
	return a
}

func TestMinimumTotals(t *testing.T) {

}