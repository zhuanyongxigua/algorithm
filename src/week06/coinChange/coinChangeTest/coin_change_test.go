package coin_change_test

import (
	"fmt"
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
	tmp := make([]int, amount+1)
	tmp[0] = 0
	for i := 1; i <= amount; i++ {
		tmp[i] = INF
		for _, v := range coins {
			if i-v >= 0 {
				tmp[i] = min(tmp[i], tmp[i-v]+1)
				fmt.Printf("i: %v; tmp: %v\n", i, tmp)
			}
		}
	}
	if tmp[len(tmp)-1] == INF {
		return -1
	}
	return tmp[len(tmp)-1]
}

func TestCoinChange(t *testing.T) {
	// result := coinChange([]int{1, 9, 10}, 18)
	// result := coinChange([]int{2}, 1)
	result := coinChange([]int{52}, 53)
	// result := coinChange([]int{357, 239, 73, 52}, 9832)
	t.Log(result)
}
