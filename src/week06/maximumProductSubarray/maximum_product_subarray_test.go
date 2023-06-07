package maximum_product_subarray_test

import (
	// "fmt"
	"testing"
)

func max(a int, b int, c int) (int, int) {
	if a > b && a > c {
		if b > c {
			return a, c
		} else {
			return a, b
		}
	} else if b > c {
		if a > c {
			return b, c
		} else {
			return b, a
		}
	} else {
		if a > b {
			return c, b
		} else {
			return c, a
		}
	}
}

func maxProduct(nums []int) int {
	ans := nums[0]
	tmp := make([][]int, len(nums) + 1)
	for i := range tmp {
		// [min, max, current]
		tmp[i] = []int{1, 1, 1}
	}
	for i, num1 := range nums {
		if num1 == 0 {
			if ans < num1 {
				ans = num1
			}
			tmp[i + 1] = []int{1, 1, 1}
			continue
		}
		a := num1 * tmp[i][0]
		b := num1 * tmp[i][1]
		c := num1 * tmp[i][2]
		max1, min := max(a, b, c)
		tmp[i + 1] = []int{min, max1, num1}
		ans, _ = max(ans, max1, num1)
	}
	return ans
}

func TestMaxProduct(t *testing.T) {
	result := maxProduct([]int{5, 4, -1, 7, 8})
	// result := maxProduct([]int{0, -2, 1, -3, 4, -1, 2, 1, -5, 4})
	// result := maxProduct([]int{5, -4, 9, -5, 18})
	// result := maxProduct([]int{-1})
	// result := maxProduct([]int{-2, 3, -4})
	// result := maxProduct([]int{2, -5, -2, -4, 3})
	t.Log("result: ", result)
}