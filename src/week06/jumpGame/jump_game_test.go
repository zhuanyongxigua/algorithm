package jumpgame_test

import (
	"testing"
)

func canJump(nums []int) bool {
	temp := make([]bool, len(nums))
	temp[0] = true
	for i := 0; i < len(nums); i++ {
		if temp[i] == false {
			break
		}
		for j := 1; j <= nums[i]; j++ {
			if i+j >= len(nums) {
				break
			}
			temp[i+j] = true
		}
	}
	return temp[len(nums)-1]
}

func TestCanJump(t *testing.T) {
	// result := canJump([]int{2, 3, 1, 1, 4}) // true
	// result := canJump([]int{3, 2, 1, 0, 4}) // false
	result := canJump([]int{0, 2, 3}) // false
	t.Log(result)
}
