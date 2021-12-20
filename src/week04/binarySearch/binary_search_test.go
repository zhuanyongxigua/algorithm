package binary_search_test

import "testing"

func search(nums []int, target int) int {
	if len(nums) == 0 {
		return -1
	}
	mid := len(nums) / 2
	start := 0
	end := len(nums) - 1
	for nums[mid] != target && start != end {
		if nums[mid] < target {
			start = mid + 1
		} else {
			end = mid - 1
		}
		mid = (start + end) / 2
	}
	if nums[mid] == target {
		return mid
	} else {
		return -1
	}
}

func TestBinarySearch(t *testing.T) {

}