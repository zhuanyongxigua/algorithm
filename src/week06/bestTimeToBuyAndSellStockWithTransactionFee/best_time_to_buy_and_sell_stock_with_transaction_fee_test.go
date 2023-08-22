package besttimetobuyandsellstockii_test

// 714. 买卖股票的最佳时机含手续费

import (
	// "fmt"
	"testing"
)

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func maxProfit(prices []int, fee int) int {
	length := len(prices)
	temp := make([][]int, length + 1)
	for i := range temp {
		temp[i] = make([]int, 2)
		temp[i][0] = -1000000000
		temp[i][1] = -1000000000
	}
	temp[0][0] = 0
	for i := 1; i <= length; i++ {
		for j := 0; j < 2; j++ {
			temp[i][j] = temp[i - 1][j]
			if j == 0 {
				temp[i][j] = max(temp[i - 1][1] + prices[i - 1] - fee, temp[i][j])
			}
			if j == 1 {
				temp[i][j] = max(temp[i - 1][0] - prices[i - 1], temp[i][j])
			}
		}
	}
	return temp[length][0]
}

func TestMaxProfit(t *testing.T) {
	result := maxProfit([]int{7, 1, 5, 3, 6, 4}, 0)
	t.Log(result)
}




