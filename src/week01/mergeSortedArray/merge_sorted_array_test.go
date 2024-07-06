package mergesortedarray_test

import (
	"reflect"
	"testing"
)

func merge(nums1 []int, m int, nums2 []int, n int) {
	temp := make([]int, m+n)
	i, j, k := 0, 0, 0
	for i < m && j < n {
		if nums1[i] <= nums2[j] {
			temp[k] = nums1[i]
			i++
		} else {
			temp[k] = nums2[j]
			j++
		}
		k++
	}
	if i >= m && j < n {
		for z := j; z < n; z++ {
			temp[k] = nums2[z]
			k++
		}
	}
	if j >= n && i < m {
		for z := i; z < m; z++ {
			temp[k] = nums1[z]
			k++
		}
	}
	// Copy to nums1
	for i := 0; i < len(temp); i++ {
		nums1[i] = temp[i]
	}
}

func merge2(nums1 []int, m int, nums2 []int, n int) {
	i, j, k := m-1, n-1, 1
	for i >= 0 && j >= 0 {
		if nums1[i] >= nums2[j] {
			nums1[m+n-k] = nums1[i]
			i--
		} else {
			nums1[m+n-k] = nums2[j]
			j--
		}
		k++
	}
	if j >= 0 && i < 0 {
		for z := j; z >= 0; z-- {
			nums1[m+n-k] = nums2[z]
			k++
		}
	}
}

func TestMergeSortedArray(t *testing.T) {
	testCases := []struct {
		nums1 []int
		m     int
		nums2 []int
		n     int
		want  []int
	}{
		{
			nums1: []int{1, 2, 3, 0, 0, 0},
			m:     3,
			nums2: []int{2, 5, 6},
			n:     3,
			want:  []int{1, 2, 2, 3, 5, 6},
		},
		{
			nums1: []int{4, 5, 6, 0, 0, 0},
			m:     3,
			nums2: []int{1, 2, 3},
			n:     3,
			want:  []int{1, 2, 3, 4, 5, 6},
		},
		{
			nums1: []int{1},
			m:     1,
			nums2: []int{},
			n:     0,
			want:  []int{1},
		},
		{
			nums1: []int{0},
			m:     0,
			nums2: []int{1},
			n:     1,
			want:  []int{1},
		},
	}

	for _, tc := range testCases {
		merge2(tc.nums1, tc.m, tc.nums2, tc.n)
		if !reflect.DeepEqual(tc.nums1, tc.want) {
			t.Errorf("merge(%v, %v, %v, %v) = %v; want %v", tc.nums1, tc.m, tc.nums2, tc.n, tc.nums1, tc.want)
		}
	}
}
