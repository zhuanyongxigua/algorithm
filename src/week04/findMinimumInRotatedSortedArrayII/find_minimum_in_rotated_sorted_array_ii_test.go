package find_minimum_in_rotated_sorted_array_ii

import (
	"fmt"
	"testing"
)

func findMin(nums []int) int {
	left, right := 0, len(nums)-1
	target := nums[len(nums)-1]
OutLoop:
	for left < right {
		mid := (left + right) >> 1
		if nums[mid] < target {
			right = mid
		} else if nums[mid] == target {
			if mid == left {
				left = mid + 1
				continue
			}
			tmp := mid
			for nums[tmp] == target {
				fmt.Printf("current mid: %v\n", mid)
				if tmp == left {
					left = mid + 1
					continue OutLoop
				} else {
					tmp--
				}
			}
			right = mid
		} else {
			left = mid + 1
		}
	}
	fmt.Printf("current index: %v\n", right)
	return nums[right]
}

func TestFind(t *testing.T) {
	// [3,1,3]
	// result := findMin([]int{3, 1, 3})
	// [1,3,3]
	// result := findMin([]int{1, 3, 3})
	// [3, 1]
	// result := findMin([]int{3, 1})
	// [10,1,10,10,10]
	// result := findMin([]int{10, 1, 10, 10, 10})
	// [1,1,1]
	result := findMin([]int{1, 1, 1})
	t.Log(result)
}
