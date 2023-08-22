package three_sum_test

import (
	"fmt"
	"sort"
	"testing"
)

func twoSum(nums []int, start int, target int) [][]int {
	fmt.Printf("nums: %v; start: %v; target: %v\n", nums, start, target)
	ans := [][]int{}
	for i := start; i < len(nums); i++ {
		if i > start && nums[i] == nums[i - 1] {
			continue
		}
	}
	return ans
}

func threeSum(nums []int) [][]int {
	sort.Ints(nums)
	ans := [][]int{}
	for i, num := range nums {
		if i > 0 && nums[i] == nums[i - 1] {
			continue
		}
		results := twoSum(nums, i + 1, -num)
		fmt.Printf("twoSum results: %v\n", results)
		for _, result := range results {
			ans = append(ans, []int{num, result[0], result[1]})
		}
	}
	return ans
}

func TestThreeSum(t *testing.T) {
	result := threeSum([]int{-1, 0, 1, 2, -1, -4})
	// result := threeSum([]int{0, 0, 0, 0})
	t.Log(result)
}
