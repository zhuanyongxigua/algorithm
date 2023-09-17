package coinchangeii_test

// 518.零钱兑换II

import (
	"testing"
)

func change(amount int, coins []int) int {
	temp := make([]int, amount+1)
	temp[0] = 1
	for i := 0; i < len(coins); i++ {
		for j := coins[i]; j <= amount; j++ {
			// 这里面是三个数的叠加，一个是上一个 i 的 temp[j]，一个是上一个 i 的 temp[j-coins]，一个是这一次 i 叠加上来的 temp[j-coins]
			temp[j] += temp[j-coins[i]]
		}
	}
	return temp[amount]
}

func change1(amount int, coins []int) int {
	if amount == 0 {
		return 1
	}
	temp := make([]int, amount+1)
	for i := 0; i < len(coins); i++ {
		if coins[i] <= amount {
			temp[coins[i]]++
		}
		for j := coins[i] + 1; j <= amount; j++ {
			temp[j] += temp[j-coins[i]]
		}
	}
	return temp[amount]
}

func TestChange(t *testing.T) {
	result := change(5, []int{1, 2, 5})
	// result := change(0, []int{7})
	t.Log(result)
}
