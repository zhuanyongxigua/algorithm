package besttimetobuyandsellstock_test

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

const MaxUint = ^uint(0)
const MinUint = 0
const MaxInt = int(MaxUint >> 1)
const MinInt = -MaxInt - 1

func maxProfit(prices []int) int {
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
			fmt.Printf("i: %d, j: %d\n", i, j)
			if j == 0 {
				fmt.Printf("temp[i][j]: %d\n", temp[i][j])
				fmt.Printf("temp[i - 1][1]: %d\n", temp[i - 1][1])
				fmt.Printf("prices[i - 1]: %d\n", prices[i - 1])
				temp[i][j] = max(temp[i - 1][1] + prices[i - 1], temp[i][j])
				fmt.Printf("temp[i][j]: %d\n", temp[i][j])
				fmt.Println()
			}
			if j == 1 {
				fmt.Printf("temp[i][j]: %d\n", temp[i][j])
				fmt.Printf("temp[i - 1][0]: %d\n", temp[i - 1][0])
				fmt.Printf("prices[i - 1]: %d\n", prices[i - 1])
				temp[i][j] = max(0 - prices[i - 1], temp[i][j])
				fmt.Printf("temp[i][j]: %d\n", temp[i][j])
				fmt.Println()
			}
		}
		fmt.Println()
		fmt.Println()
	}
	return temp[length][0]
}

func TestMaxProfit(t *testing.T) {
	result := maxProfit([]int{7, 1, 5, 3, 6, 4})
	t.Log(result)
}




