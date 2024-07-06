package minimumcosttomergestones_test

import (
	"fmt"
	"testing"
)

// 1000. 合并石头的最低成本

func min(a int, b int) int {
	if a < b {
		return a
	}
	return b
}

func mergeStones(stones []int, k int) int {
	c := 10000000
	n := len(stones)
	temp := make([][][]int, n+1)
	for l := range temp {
		temp[l] = make([][]int, n+1)
		for r := range temp[l] {
			temp[l][r] = make([]int, k+1)
			for i := range temp[l][r] {
				temp[l][r][i] = c
			}
		}
		temp[l][l][1] = 0
	}
	sum := make([]int, n+1)
	for i := 1; i <= n; i++ {
		sum[i] = sum[i-1] + stones[i-1]
	}
	for length := 2; length <= n; length++ {
		for l := 0; l < n-length+1; l++ {
			r := l + length - 1
			for i := 2; i <= k; i++ {
				for p := l; p < r; p++ {
					fmt.Printf("temp[l][r][i], temp[%d][%d][%d]: %d\n", l, r, i, temp[l][r][i])
					fmt.Printf("temp[l][p][1], temp[%d][%d][1]: %d\n", l, p, temp[l][p][1])
					fmt.Printf("temp[p+1][r][i-1], temp[%d][%d][%d]: %d\n", p+1, r, i-1, temp[p+1][r][i-1])
					temp[l][r][i] = min(temp[l][r][i], temp[l][p][1]+temp[p+1][r][i-1])
					fmt.Printf("temp[l][r][i], temp[%d][%d][%d]: %d\n", l, r, i, temp[l][r][i])
					fmt.Println()
				}
			}
			fmt.Printf("temp[l][r][1], temp[%d][%d][1]: %d\n", l, r, temp[l][r][1])
			temp[l][r][1] = min(temp[l][r][1], temp[l][r][k]+sum[r+1]-sum[l])
			fmt.Printf("temp[l][r][1], temp[%d][%d][1]: %d\n", l, r, temp[l][r][1])
			fmt.Println()
			fmt.Println()
		}
	}
	if temp[0][n-1][1] == c {
		return -1
	}
	return temp[0][n-1][1]
}

func TestMaxCoins(t *testing.T) {
	result := mergeStones([]int{3, 2, 4, 1}, 2) // 20
	// result := mergeStones([]int{3, 2, 4, 1}, 3) // -1
	// result := mergeStones([]int{3, 5, 1, 2, 6}, 3) // 25
	t.Log(result)
}
