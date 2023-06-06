package maximum_product_subarray_test

import (
	// "fmt"
	"testing"
)

func max(a int, b int) (int, int) {
	if a > b {
		return a, b
	}
	return b, a
}

func maxProduct(nums []int) int {
	ans := nums[0]
	tmp := make([][]int, len(nums) + 1)
	for i := range tmp {
		// [product currentNum]
		tmp[i] = []int{1, 1}
	}
	for i, num1 := range nums {
		maxProduct, minProduct := max(num1 * tmp[i][0], num1 * tmp[i][0])
		maxMun, minNum := max()
		tmp[i + 1] = []int{minNum, maxNum}
		ans, _ = max(ans, maxNum)
	}
	return ans
}

func TestMaxProduct(t *testing.T) {
	result := maxProduct([]int{5, 4, -1, 7, 8})
	// result := maxProduct([]int{0, -2, 1, -3, 4, -1, 2, 1, -5, 4})
	// result := maxProduct([]int{5, -4, 9, -5, 18})
	// result := maxProduct([]int{-1})
	// result := maxProduct([]int{-2, 3, -4})
	t.Log("result: ", result)
}