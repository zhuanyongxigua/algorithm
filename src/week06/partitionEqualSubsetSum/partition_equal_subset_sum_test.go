package partitionequalsubsetsum_test

// 416.分割等和子集

import (
	"testing"
)

func canPartition(nums []int) bool {
	sum := 0
	for _, num := range nums {
		sum += num
	}
	if sum%2 == 1 {
		return false
	}
	sum = sum / 2
	temp := make([]int, sum+1)
	for i := 0; i < len(nums); i++ {
		for j := sum; j >= nums[i]; j-- {
			if temp[j] == j {
				continue
			}
			temp[j] = temp[j-nums[i]] + nums[i]
			if temp[j] == sum {
				return true
			}
		}
	}
	return false
}

func TestCanPartition(t *testing.T) {
	// result := canPartition([]int{1, 5, 11, 5}) // true
	// result := canPartition([]int{2, 2, 1, 1}) // true
	// result := canPartition([]int{14, 9, 8, 4, 3, 2}) // true
	result := canPartition([]int{1, 2, 3, 5}) // false
	t.Log(result)
}
