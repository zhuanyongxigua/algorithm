package houserobber_test

// 198. 打家劫舍

import "testing"

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func rob(nums []int) int {
	ans := 0
	length := len(nums)
	temp := make([][]int, length + 1)
	for i := range temp {
		temp[i] = make([]int, 2)
	}
	for i := 1; i <= length; i++ {
		for j := 0; j < 2; j++ {
			if j == 0 {
				temp[i][j] = max(temp[i - 1][0], temp[i - 1][1])
			}
			if j == 1 {
				temp[i][j] = temp[i - 1][0] + nums[i - 1]
			}
		}
	}
	ans = max(temp[length][0], temp[length][1])
	return ans
}

func TestRob(t *testing.T) {
	list := []int{2, 7, 9, 3, 1}
	result := rob(list)
	t.Log("result: ", result)
}
