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
			// 堆数
			for k1 := range temp[l][r] {
				temp[l][r][k1] = c
			}
		}
		// 这里没懂
		temp[l][l][1] = 0
	}
	sums := make([]int, n+1)
	for i := 1; i <= n; i++ {
		sums[i] = sums[i-1] + stones[i-1]
	}
	// 为什么长度从 2 开始？length 从 1 开始也是可以的，从 0 开始，下面不好判断，会越界
	// 所以原因就很明显了，从 1 开始没什么意义，算了也是白算
	for length := 2; length <= n; length++ {
		// 为什么 left 从 0 开始？
		for l := 0; l < n-length+1; l++ {
			r := l + length - 1
			// 为什么堆数从 2 开始？k1 从 1 开始也是可以的，从 0 开始，下面不好判断，会越界
			// 所以原因就很明显了，从 1 开始没什么意义，算了也是白算
			// 而且题目也告诉你了，k >= 2
			for k1 := 2; k1 <= k; k1++ {
				for p := l; p < r; p++ {
					fmt.Printf("temp[l][r][k1], temp[%d][%d][%d]: %d\n", l, r, k1, temp[l][r][k1])
					fmt.Printf("temp[l][p][1], temp[%d][%d][1]: %d\n", l, r, temp[l][r][1])
					fmt.Printf("temp[p+1][r][k1-1], temp[%d][%d][%d]: %d\n", p+1, r, k1-1, temp[p+1][r][k1-1])
					fmt.Println()
					temp[l][r][k1] = min(temp[l][r][k1], temp[l][p][1]+temp[p+1][r][k1-1])
				}
			}
			temp[l][r][1] = min(temp[l][r][1], temp[l][r][k]+sums[r+1]-sums[l])
		}
	}
	if temp[0][n-1][1] == c {
		return -1
	} else {
		return temp[0][n-1][1]
	}
}

func TestMaxCoins(t *testing.T) {
	result := mergeStones([]int{3, 2, 4, 1}, 2) // 20
	// result := mergeStones([]int{3, 2, 4, 1}, 3) // -1
	// result := mergeStones([]int{3, 5, 1, 2, 6}, 3) // 25
	t.Log(result)
}
