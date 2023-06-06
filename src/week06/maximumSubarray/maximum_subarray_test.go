package maximum_subarray_test

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

func maxSubArray(nums []int) int {
	ans := 0
	temp := make([]int, len(nums) + 1)
	if nums[0] <= 0 {
		temp[0] = nums[0]
		ans = nums[0]
	}
	for i, num1 := range nums {
		if num1 < 0 {
			if num1 + temp[i] > 0 {
				temp[i + 1] = num1 + temp[i]
			} else {
				temp[i + 1] = num1
			}
		} else {
			if temp[i] >= 0 {
				temp[i + 1] = num1 + temp[i]
			} else {
				temp[i + 1] = num1
			}
		}
		ans = max(ans, temp[i + 1])
	}
	return ans
}

func TestMaxSubArray(t *testing.T) {
	// result := maxSubArray([]int{5, 4, -1, 7, 8})
	// result := maxSubArray([]int{0, -2, 1, -3, 4, -1, 2, 1, -5, 4})
	// result := maxSubArray([]int{5, -4, 9, -5, 18})
	result := maxSubArray([]int{-1})
	t.Log("result: ", result)
}