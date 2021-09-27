package permute_test

import (
	"testing"
)

func permute(nums []int) [][]int {
	ans := [][]int{}
	numsBool := make([]bool, len(nums))
	cur := []int{}
	length := len(nums)
	var r func(index int)
	r = func(index int) {
		if index == length {
			tmp := make([]int, length)
			copy(tmp, cur)
			ans = append(ans, tmp)
			return
		}
		for i := 0; i < length; i++ {
			if numsBool[i] == false {
				cur = append(cur, nums[i])
				numsBool[i] = true
				r(index + 1)
				cur = cur[:len(cur)-1]
				numsBool[i] = false
			}
		}
	}
	r(0)
	return ans
}

func TestPermute(t *testing.T) {
	result := permute([]int{1, 2, 3})
	t.Log(result)
}