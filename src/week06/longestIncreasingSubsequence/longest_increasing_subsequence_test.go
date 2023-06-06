package longest_increasing_subsequence_test

import (
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

func lengthOfLIS(nums []int) int {
	ans := 0
	tmp := make([][]int, len(nums) + 1)
	for i := range tmp {
		tmp[i] = []int{MinInt, 0}
	}
	for i, num1 := range nums {
		maxLength := 0
		for j, tuple := range tmp {
			if j >= i + 1 {
				break
			}
			if num1 > tuple[0] {
				maxLength = max(maxLength, tuple[1] + 1)
			}
		}
		if i == 0 {
			tmp[i + 1] = []int{num1, 1}
			maxLength = 1
		} else {
			tmp[i + 1] = []int{num1, maxLength}
		}
		ans = max(ans, maxLength)
	}
	return ans
}

func TestLengthOfLTS(t *testing.T) {
	// result := lengthOfLIS([]int{0, 3, 1, 6, 2, 7})
	// result := lengthOfLIS([]int{0})
	result := lengthOfLIS([]int{1, 2, -10, -8, -7})
	t.Log("result: ", result)
}