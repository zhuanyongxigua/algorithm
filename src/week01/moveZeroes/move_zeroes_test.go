package movezeroes_test

import (
	"reflect"
	"testing"
)

func moveZeroes(nums []int) {
	for i := 0; i < len(nums); i++ {
		zeroIndex := -1
		for j := i; j < len(nums); j++ {
			if nums[j] == 0 && zeroIndex == -1 {
				zeroIndex = j
			} else if nums[j] != 0 && zeroIndex != -1 {
				nums[zeroIndex] = nums[j]
				nums[j] = 0
				zeroIndex = -1
			}
		}
	}
}

func moveZeroes2(nums []int) {
	zeroIndex := -1
	for i := 0; i < len(nums); i++ {
		if nums[i] == 0 && zeroIndex == -1 {
			zeroIndex = i
		} else {
			if zeroIndex != -1 && nums[i] != 0 {
				nums[zeroIndex] = nums[i]
				nums[i] = 0
				i = zeroIndex
				zeroIndex = -1
			}
		}
	}
}

func moveZeroes3(nums []int) {
	zeroIndex := 0
	for _, num := range nums {
		if num != 0 {
			nums[zeroIndex] = num
			zeroIndex++
		}
	}
	for i := zeroIndex; i < len(nums); i++ {
		nums[i] = 0
	}
}

func TestMoveZeros(t *testing.T) {
	testCases := []struct {
		nums []int
		want []int
	}{
		{
			nums: []int{0, 1, 0, 3, 12},
			want: []int{1, 3, 12, 0, 0},
		},
		{
			nums: []int{0, 0, 1},
			want: []int{1, 0, 0},
		},
		{
			nums: []int{0},
			want: []int{0},
		},
	}

	for _, tc := range testCases {
		moveZeroes3(tc.nums)
		if !reflect.DeepEqual(tc.nums, tc.want) {
			t.Errorf("moveZeroes(%v) = %v; want %v", tc.nums, tc.nums, tc.want)
		}
	}
}
