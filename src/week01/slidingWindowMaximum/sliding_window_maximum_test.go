package sliding_window_maximum_test

import (
	"fmt"
	"testing"
)

func maxSlidingWindow(nums []int, k int) []int {
	var q, ans []int
	for i := range nums {
		// ensure queue head is valid
		for len(q) > 0 && q[0] <= i - k {
			fmt.Printf("up loop: %v\n", q)
			q = q[1:]
		}
		// maintain queue monotonic, insert new index
		for len(q) > 0 && nums[q[len(q) - 1]] <= nums[i] {
			length := q[len(q) - 1]
			q = q[: len(q) - 1]
			fmt.Printf("because nums[%v](%v) <= nums[%v](%v), so q is : %v\n", length, nums[length], i, nums[i], q)
		}
		fmt.Printf("before, i: %v; q: %v\n", i, q)
		q = append(q, i)
		fmt.Printf("after, i: %v; q: %v\n", i, q)
		fmt.Println()
		// get queue head, update ans
		if (i >= k - 1) {
			ans = append(ans, nums[q[0]])
		}
	}
	return ans
}

func TestSlidingWindowMaximumTest(t *testing.T) {
	result := maxSlidingWindow([]int{1,3,-1,-3,5,3,6,7}, 3)
	t.Log(result)
}