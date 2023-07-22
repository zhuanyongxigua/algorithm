package besttimetobuyandsellstockcooldown_test

// 309.最佳买卖股票时机含冷冻期
// 这题用入边的思路确实不好写，因为你不知道上一次的 j = 0, l = 0 的情况是不是卖出了，还是什么都没做，如果想要知道还需要继续加状态
// 如果是卖出了，那你这一次就是冷冻期，你是不能从上一次取值的

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

func maxProfitIn(prices []int) int {
	ans := 0
	n := len(prices)
	threeDArray := make([][][][]int, n + 1)
	kNum := n / 3 + 1
	for i := range threeDArray {
		threeDArray[i] = make([][][]int, 2)
		for j := range threeDArray[i] {
			threeDArray[i][j] = make([][]int, kNum + 1)
			for k2 := range threeDArray[i][j] {
				threeDArray[i][j][k2] = make([]int, 2)
				for l := range threeDArray[i][j][k2] {
					threeDArray[i][j][k2][l] = -1000000000
				}
			}
		}
	}
	threeDArray[0][0][0][0] = 0
	for i := 1; i <= n; i++ {
		for j := 0; j < 2; j++ {
			for k := 0; k <= kNum; k++ {
				for l := 0; l < 2; l++ {
					threeDArray[i][j][k][l] = threeDArray[i - 1][j][k][l]
					if j == 0 && l == 0 {
						threeDArray[i][j][k][l] = max(threeDArray[i - 1][0][k][1], threeDArray[i][j][k][l])
					}
					if j == 0 && l == 1 {
						threeDArray[i][j][k][l] = max(threeDArray[i - 1][1][k][0] + prices[i - 1], threeDArray[i][j][k][l])
					}
					if j == 1 && l == 0 && k > 0 {
						threeDArray[i][j][k][l] = max(threeDArray[i - 1][0][k - 1][0] - prices[i - 1], threeDArray[i][j][k][l])
					}
				}
			}
		}
	}
	for i := 0; i <= kNum; i++ {
		ans = max(threeDArray[n][0][i][0], ans)
		ans = max(threeDArray[n][0][i][1], ans)
	}
	return ans
}

func maxProfit(prices []int) int {
	ans := 0
	n := len(prices)
	threeDArray := make([][][][]int, n + 1)
	kNum := n / 3 + 1
	for i := range threeDArray {
		threeDArray[i] = make([][][]int, 2)
		for j := range threeDArray[i] {
			threeDArray[i][j] = make([][]int, kNum + 1)
			for k2 := range threeDArray[i][j] {
				threeDArray[i][j][k2] = make([]int, 2)
				for l := range threeDArray[i][j][k2] {
					threeDArray[i][j][k2][l] = -1000000000
				}
			}
		}
	}
	threeDArray[0][0][0][0] = 0
	for i := 0; i < n; i++ {
		for j := 0; j < 2; j++ {
			for k := 0; k <= kNum; k++ {
				for l := 0; l < 2; l++ {
					if j == 0 && l == 0 && k < kNum {
						fmt.Println("j === 0 && l == 0")
						fmt.Printf("i: %d, j: %d, k: %d, l: %d\n", i, j, k, l)
						fmt.Printf("threeDarray[i][j][k][l]: %d\n", threeDArray[i][j][k][l])
						threeDArray[i + 1][1][k + 1][0] = max(threeDArray[i + 1][1][k + 1][0], threeDArray[i][j][k][l] - prices[i])
						fmt.Printf("threeDarray[i + 1][1][k + 1][0]: %d\n", threeDArray[i + 1][1][k + 1][0])
						fmt.Println()
					}
					if j == 1 && l == 0 {
						fmt.Println("j == 1 && l == 0")
						fmt.Printf("i: %d, j: %d, k: %d, l: %d\n", i, j, k, l)
						fmt.Printf("threeDarray[i][j][k][l]: %d\n", threeDArray[i][j][k][l])
						threeDArray[i + 1][0][k][1] = max(threeDArray[i + 1][0][k][0], threeDArray[i][1][k][0] + prices[i])
						fmt.Printf("threeDarray[i + 1][0][k][1]: %d\n", threeDArray[i + 1][0][k][1])
						fmt.Println()
					}
					fmt.Println()
					fmt.Println("out assignment")
					fmt.Printf("i: %d, j: %d, k: %d, l: %d\n", i, j, k, l)
					fmt.Printf("threeDArray[i][j][k][l]: %d\n", threeDArray[i][j][k][l])
					threeDArray[i + 1][j][k][0] = max(threeDArray[i + 1][j][k][0], threeDArray[i][j][k][l])
					fmt.Printf("threeDArray[i + 1][j][k][0]: %d\n", threeDArray[i + 1][j][k][0])
					fmt.Println()
				}
			}
		}
		fmt.Println()
		fmt.Println()
	}
	for i := 0; i <= kNum; i++ {
		ans = max(threeDArray[n][0][i][0], ans)
		ans = max(threeDArray[n][0][i][1], ans)
	}
	return ans
}

func TestMaxProfit(t *testing.T) {
	// result := maxProfitIn([]int{1, 2, 3, 0, 2})
	// result := maxProfitIn([]int{1, 2, 4})
	result := maxProfitIn([]int{1})
	t.Log(result)
}




