package number_of_subarrays_test

import (
	"fmt"
	"testing"
)

func numberOfSubarrays(nums []int, k int) int {
	prefixes := make(map[int]int)
	ans := 0
	prefixSum := 0
	for _, num := range nums {
		num = num % 2
		prefixSum += num
		prefixes[prefixSum]++ 
	}
	fmt.Printf("%v\n", prefixes)
	if _, ok := prefixes[k]; ok {
		ans += prefixes[k]
	}
	for prefix, count := range prefixes {
		if _, ok := prefixes[prefix + k]; ok {
			ans += count * prefixes[prefix + k]
		}
	}
	return ans
}

func TestNumberOfSubarrays(t *testing.T) {
	result := numberOfSubarrays([]int{1, 1, 2, 1, 1}, 3)
	t.Log(result)
}