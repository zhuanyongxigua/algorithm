package coinchangeii_test

import "testing"

func change(amount int, coins []int) int {
	ans := 0
	temp := make([]int, amount+1)
	for i := 0; i < len(coins); i++ {
		for j := 0; j <= amount-coins[i]; j++ {
			temp[j+coins[i]]++
		}
		// ans += temp[amount]
	}
	return ans
}

func TestChange(t *testing.T) {
	result := change(5, []int{1, 2, 5})
	t.Log(result)
}
