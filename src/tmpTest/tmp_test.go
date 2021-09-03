package tmp_test

import (
	"testing"
)

func subarraySum(nums []int, k int) int {
	ans := 0
	prefix := make([]int, len(nums) + 1)
	for i := range nums {
		prefix[i + 1] = prefix[i] + nums[i]
		if prefix[i + 1] == k {
			ans++
		}
	}
	for i := 1; i < len(prefix); i++ {
		for j := 1; j < i; j++ {
			if prefix[i] == (prefix[j] + k) {
				ans++
			}
		}
	}
	return ans
}

func TestTmp(t *testing.T) {
	result := subarraySum([]int{1}, 0)
	t.Log(result)
}
