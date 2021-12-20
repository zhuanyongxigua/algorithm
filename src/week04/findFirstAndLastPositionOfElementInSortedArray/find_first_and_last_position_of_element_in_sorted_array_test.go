package find_first_and_last_position_of_element_in_sorted_array_test

import "testing"

func searchRange(nums []int, target int) []int {
	length := len(nums)
	ans := []int{-1, -1}
	if length == 0 {
		return ans
	}
	left, right := 0, length-1
	for left < right {
		mid := (left + right) >> 1
		if nums[mid] >= target {
			right = mid
		} else {
			left = mid + 1
		}
	}
	if nums[right] != target {
		return ans
	} else {
		ansLeft, ansRight := right, right
		for nums[ansRight] == target {
			if ansRight+1 < length && nums[ansRight+1] == target {
				ansRight++
			} else {
				break
			}
		}
		ans = []int{ansLeft, ansRight}
		return ans
	}
}

func TestFindFirst(t *testing.T) {
	// Input: nums = [5,7,7,8,8,10], target = 8
	// Output: [3,4]

	result := searchRange([]int{5, 7, 7, 8, 8, 10}, 8)
	t.Log(result)

	// Input: nums = [5,7,7,8,8,10], target = 6
	// Output: [-1,-1]
	// Input: nums = [], target = 0
	// Output: [-1,-1]
	// Input: nums = [3, 3, 3], target = 3
	// Output: [0,2]
}
