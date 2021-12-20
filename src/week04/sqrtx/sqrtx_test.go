package sqrtx_test

import "testing"

func mySqrt(x int) int {
	left, right := -1, x
	for left < right {
		mid := (left + right + 1) >> 1
		if mid*mid <= x {
			left = mid
		} else {
			right = mid - 1
		}
	}
	return right
}

func TestSqrtx(t *testing.T) {

}
