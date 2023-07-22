package besttimetobuyandsellstockiii_test

// 买卖股票的最佳时机

import (
	"fmt"
	"testing"
)

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func maxProfit(prices []int) int {
	length := len(prices)
	temp := make([][][]int, length + 1)
	for i := range temp {
		temp[i] = make([][]int, 2)
		for j := range temp[i] {
			temp[i][j] = make([]int, 3)
			for k := range temp[i][j] {
				temp[i][j][k] = -1000000000
			}
		}
	}
	temp[0][0][0] = 0
	for i := 1; i <= length; i++ {
		for j := 0; j < 2; j++ {
			for k := 0; k < 3; k++ {
				temp[i][j][k] = temp[i - 1][j][k]
				fmt.Printf("i: %d, j: %d\n", i, j)
				if j == 0 {
					fmt.Printf("temp[i][j]: %d\n", temp[i][j])
					fmt.Printf("temp[i - 1][1]: %d\n", temp[i - 1][1])
					fmt.Printf("prices[i - 1]: %d\n", prices[i - 1])
					temp[i][j][k] = max(temp[i - 1][1][k] + prices[i - 1], temp[i][j][k])
					fmt.Printf("temp[i][j]: %d\n", temp[i][j])
					fmt.Println()
				}
				if j == 1 && k > 0 {
					fmt.Printf("temp[i][j]: %d\n", temp[i][j])
					fmt.Printf("temp[i - 1][0]: %d\n", temp[i - 1][0])
					fmt.Printf("prices[i - 1]: %d\n", prices[i - 1])
					temp[i][j][k] = max(temp[i - 1][0][k - 1] - prices[i - 1], temp[i][j][k])
					fmt.Printf("temp[i][j]: %d\n", temp[i][j])
					fmt.Println()
				}
			}
		}
		fmt.Println()
		fmt.Println()
	}
	ans := 0
	for j := range temp[length] {
		for k := range temp[length][j] {
			ans = max(ans, temp[length][j][k])
		}
	}
	return ans
}

func TestMaxProfit(t *testing.T) {
	result := maxProfit([]int{7, 1, 5, 3, 6, 4})
	t.Log(result)
}




