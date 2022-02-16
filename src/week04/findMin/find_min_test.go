package find_min_test

import "testing"

func findMin(nums []int) int {
	left, right := 0, len(nums)-1
	target := nums[len(nums)-1]
	for left < right {
		mid := (left + right) >> 1
		if nums[mid] <= target {
			right = mid
		} else {
			left = mid + 1
		}
	}
	return nums[right]
}

func TestFindMin(t *testing.T) {
	// [3,4,5,1,2]
	result := findMin([]int{3, 4, 5, 1, 2})
	t.Log(result)
}
