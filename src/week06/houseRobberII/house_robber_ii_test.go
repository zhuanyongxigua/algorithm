package houserobberii_test

// 213. 打家劫舍 II

import "testing"

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func rob(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	if len(nums) == 1 {
		return nums[0]
	}
	ans := 0
	temp1 := make([][]int, len(nums) + 1)
	temp2 := make([][]int, len(nums) + 1)
	for i := range temp1 {
		temp1[i] = make([]int, 2)
		temp1[i][0] = -100000000
		temp1[i][1] = -100000000
		temp2[i] = make([]int, 2)
		temp2[i][0] = -100000000
		temp2[i][1] = -100000000
	}
	temp1[1][0] = 0
	temp2[1][1] = nums[0]
	for i := 2; i < len(temp1); i++ {
		for k := 0; k < 2; k++ {
			temp1[i][k] = temp1[i - 1][k]
			if k == 0 {
				temp1[i][k] = max(temp1[i - 1][1], temp1[i][k])
			}
			if k == 1 {
				temp1[i][k] = max(temp1[i - 1][0] + nums[i - 1], temp1[i][k])
			}
		}
	}
	ans = max(ans, temp1[len(nums)][0])
	ans = max(ans, temp1[len(nums)][1])
	for i := 2; i < len(temp2); i++ {
		for k := 0; k < 2; k++ {
			temp2[i][k] = temp2[i - 1][k]
			if k == 0 {
				temp2[i][k] = max(temp2[i - 1][1], temp2[i][k])
			}
			if k == 1 {
				temp2[i][k] = max(temp2[i - 1][0] + nums[i - 1], temp2[i][k])
			}
		}
	}
	ans = max(ans, temp2[len(nums)][0])
	return ans
}

func TestRob(t *testing.T) {
	// list := []int{2, 3, 2} // 3
	// list := []int{1, 2, 3, 1} // 4
	// list := []int{1, 2, 3} // 3
	list := []int{1} // 1
	result := rob(list)
	t.Log("result: ", result)
}
