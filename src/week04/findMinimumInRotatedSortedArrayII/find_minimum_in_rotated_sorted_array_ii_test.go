package find_minimum_in_rotated_sorted_array_ii

import "testing"

func findMin(nums []int) int {
	left, right := 0, len(nums)-1
	for left < right {
		mid := (left+right)/2
		if nums[mid] > nums[right] {
			left = mid + 1
		} else if nums[mid] < nums[right] {
			right = mid
		} else {
			right--
		}
	}
	return nums[left]
}

func TestFind(t *testing.T) {

}