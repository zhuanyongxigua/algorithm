package container_with_most_water_test

import "testing"

func min(val1, val2 int) int {
	if val1 < val2 {
		return val1
	}
	return val2
}

func maxArea(height []int) int {
	ans := 0
	j := len(height) - 1
	i := 0
	for ;i < j; {
		cur := min(height[i], height[j]) * (j - i)
		if cur > ans {
			ans = cur
		}
		if height[i] > height[j] {
			j--
		} else if (height[i] == height[j]) {
			i++
			j--
		} else {
			i++
		}
	}
	return ans
}

func TestContainer(t *testing.T) {
	result := maxArea([]int{1, 8, 6, 2, 5, 4, 8, 3, 7})
	t.Log(result)
}
