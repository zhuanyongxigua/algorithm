package climbing_stairs_test

import "testing"

func climbingStairs(n int) int {
	if n < 3 {
		return n
	}

	one, two := 1, 1
	for i := 2; i < n; i++ {
		next := one + two
		one = two
		two = next
	}
	return one + two
}

func TestClimbingStairs(t *testing.T) {

}