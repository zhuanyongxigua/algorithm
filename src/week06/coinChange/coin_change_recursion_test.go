package coin_change_recursion_test

import (
	"testing"
)

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func coinChange(coins []int, amount int) int {
	INF := 2<<31 - 1
	opt := make([]int, amount+1)
	for i := range opt {
		opt[i] = INF
	}
	opt[0] = 0
	var r func(target int)
	r = func(target int) {
		if target < 0 {
			return
		}
		if target == 0 {
			return
		}
		r(target - 1)
		for _, v := range coins {
			// fmt.Printf("target: %v; opt: %v\n", target, opt)
			if target-v >= 0 {
				opt[target] = min(opt[target], opt[target-v]+1)
			}
		}
	}
	r(amount)
	if opt[len(opt)-1] == INF {
		return -1
	}
	return opt[len(opt)-1]
}

func coinChange2(coins []int, amount int) int {
	INF := 2<<31 - 1
	opt := make([]int, amount+1)
	for i := range opt {
		opt[i] = -1
	}
	var r func(target int) int
	r = func(target int) int {
		if target == 0 {
			return 0
		}
		if target < 0 {
			return INF
		}
		if opt[target] != -1 {
			return opt[target]
		}
		opt[target] = INF
		for _, v := range coins {
			opt[target] = min(opt[target], r(target-v)+1)
		}
		return opt[target]
	}
	ans := r(amount)
	if ans == INF {
		return -1
	} else {
		return ans
	}
}

func TestCoinChangeRecursion(t *testing.T) {
	// result := coinChange([]int{1, 9, 10}, 18)
	// result := coinChange([]int{2}, 1)
	// result := coinChange([]int{52}, 53)
	result := coinChange([]int{357, 239, 73, 52}, 9832)
	t.Log(result)
}
