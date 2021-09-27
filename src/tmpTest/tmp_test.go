package tmp_test

import (
	"testing"
)

func combine(n int, k int) [][]int {
	ans := [][]int{}
	cur := []int{}
	var r func(index int)
	r = func(index int) {
		if len(cur) == k || len(cur) + n - index + 1 < k {
			if len(cur) == k {
				tmp := make([]int, k)
				copy(tmp, cur)
				ans = append(ans, tmp)
			}
			return
		}
		r(index + 1)
		cur = append(cur, index)
		r(index + 1)
		cur = cur[:len(cur) - 1]
	}
	r(1)
	return ans
}

func TestTmp(t *testing.T) {
	result := combine(4, 2)
	t.Log(result)
}
