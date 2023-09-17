package perfectsquares_test

// 279.完全平方数

import (
	"testing"
)

func min(a int, b int) int {
	if a > b {
		return b
	}
	return a
}

func numSquares(n int) int {
	temp := make([]int, n+1)
	nums := make([]int, n+1)
	for i := range nums {
		nums[i] = i * i
		if nums[i] <= n {
			temp[nums[i]] = 1
		}
	}
	temp[0] = 0
	for i := 1; i < n+1; i++ {
		for j := nums[i] + 1; j <= n; j++ {
			if temp[j] == 0 {
				temp[j] = temp[nums[i]] + temp[j-nums[i]]
			} else {
				temp[j] = min(temp[nums[i]]+temp[j-nums[i]], temp[j])
			}
		}
	}
	return temp[n]
}

func TestNumSquares(t *testing.T) {
	// result := numSquares(12) // 3
	result := numSquares(13) // 2
	t.Log(result)
}
