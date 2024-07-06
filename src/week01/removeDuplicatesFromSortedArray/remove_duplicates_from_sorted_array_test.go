package removeduplicatesfromsortedarray_test

import (
	"reflect"
	"testing"
)

// 这个写出来虽然没有越界的问题，但我确实也忘记考虑了
func removeDuplicates(nums []int) int {
	temp := make([]int, len(nums))
	tempIndex := 0
	temp[0] = nums[0]
	for _, v := range nums {
		if v > temp[tempIndex] {
			temp[tempIndex+1] = v
			tempIndex++
		}
	}
	for i, v := range temp {
		nums[i] = v
	}
	return tempIndex + 1
}

func removeDuplicates2(nums []int) int {
	index := 0
	for _, v := range nums {
		if v > nums[index] {
			nums[index+1] = v
			index++
		}
	}
	return index + 1
}

func TestRemoveDuplicates(t *testing.T) {
	testCases := []struct {
		nums     []int
		want     int
		wantNums []int
	}{
		{
			nums:     []int{1, 1, 2},
			want:     2,
			wantNums: []int{1, 2},
		},
		{
			nums:     []int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4},
			want:     5,
			wantNums: []int{0, 1, 2, 3, 4},
		},
	}

	for _, tc := range testCases {
		got := removeDuplicates2(tc.nums)
		if got != tc.want || !reflect.DeepEqual(tc.nums[:got], tc.wantNums) {
			t.Errorf("removeDuplicates(%v) = %v, %v; want %v, %v", tc.nums, got, tc.nums[:got], tc.want, tc.wantNums)
		}
	}
}
