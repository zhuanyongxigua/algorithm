package howmanyapplescanyouputintothebasket_test

import (
	"math/rand"
	"testing"
)

func sortArray(nums []int) []int {
	quickSort(nums, 0, len(nums)-1)
	return nums
}

func quickSort(arr []int, l, r int) {
	if l >= r {
		return
	}
	pivot := partition(arr, l, r)
	quickSort(arr, l, pivot)
	quickSort(arr, pivot+1, r)
}

func partition(a []int, l, r int) int {
	pivot := l + rand.Intn(r-l+1)
	pivotVal := a[pivot]
	for l <= r {
		for a[l] < pivotVal {
			l++
		}
		for a[r] > pivotVal {
			r--
		}
		if l == r {
			break
		}
		if l < r {
			a[l], a[r] = a[r], a[l]
			l++
			r--
		}
	}
	return r
}

func maxNumberOfApples(weight []int) int {
	total := 5000
	ans := 0
	weightSorted := sortArray(weight)
	index := 0
	for total > 0 && index < len(weight) {
		if total >= weightSorted[index] {
			total = total - weightSorted[index]
			ans++
		}
		index++
	}
	return ans
}

func TestApples(t *testing.T) {
	result := maxNumberOfApples([]int{1000, 1000, 1000, 1000, 1000})
	t.Log(result)
}
