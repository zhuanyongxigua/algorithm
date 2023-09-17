package burstballoons_test

import "testing"

// 312. 戳气球

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func maxCoins(nums []int) int {
	tempNums := make([]int, len(nums)+2)
	tempNums[0] = 1
	tempNums[len(tempNums)-1] = 1
	for i, v := range nums {
		tempNums[i+1] = v
	}
	temp := make([][]int, len(nums)+2)
	for i := 0; i < len(temp); i++ {
		temp[i] = make([]int, len(nums)+2)
	}
	for l := len(temp) - 1; l >= 1; l-- {
		for r := l; r < len(temp)-1; r++ {
			current := temp[l][r]
			left := temp[l][r-1]
			right := temp[r+1][len(temp)-1]
			p := tempNums[r] * tempNums[l-1] * tempNums[r+1]
			temp[l][r] = max(current, left+right+p)
			// 这里我觉得可以一块更新两个值，另一个是 temp[l][len(temp)-1]
			// 就是 temp[l][r] 的值更新的对吗？
		}
	}
	return temp[1][len(nums)]
}

func TestMaxCoins(t *testing.T) {
	result := maxCoins([]int{3, 1, 5, 8}) // 167
	// result := maxCoins([]int{1, 5}) // 10
	t.Log(result)
}
