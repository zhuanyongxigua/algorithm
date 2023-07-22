package besttimetobuyandsellstockiv_test

// 188. 买卖股票的最佳时机 IV

import (
	"testing"
)

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func maxProfit(c int, prices []int) int {
	ans := 0
	n := len(prices)
	threeDArray := make([][][]int, n + 1)
	for i := range threeDArray {
		threeDArray[i] = make([][]int, 2)
		for j := range threeDArray[i] {
			threeDArray[i][j] = make([]int, c + 1)
			for k := range threeDArray[i][j] {
				threeDArray[i][j][k] = -100000000
			}
		}
	}
	threeDArray[0][0][0] = 0
	for i := 1; i <= n; i++ {
		for j := 0; j < 2; j++ {
			for k := 0; k <= c; k++ {
				threeDArray[i][j][k] = threeDArray[i - 1][j][k]
				if j == 1 {
					threeDArray[i][j][k] = max(threeDArray[i - 1][0][k] - prices[i - 1], threeDArray[i][j][k])
				}
				if j == 0 && k > 0 {
					threeDArray[i][j][k] = max(threeDArray[i - 1][1][k - 1] + prices[i - 1], threeDArray[i][j][k])
				}
			}
		}
	}
	for i := 0; i <= c; i++ {
		ans = max(threeDArray[n][0][i], ans)
	}
	return ans
}

func TestMaxProfit(t *testing.T) {
	result := maxProfit(2, []int{3, 3, 5, 0, 0, 3, 1, 4})
	// result := maxProfit(2, []int{2, 4, 1})
	t.Log(result)
}




