package largest_rectangle_in_histogram_test

import (
	"fmt"
	"testing"
)

type Rect struct {
	Height int
	Width int
}

func max(first, second int) int {
	if first > second {
		return first
	}
	return second
}

func largestRectangleArea(heights []int) int {
	heights = append(heights, 0)
	s := []Rect{}
	ans := 0
	for i, height := range heights {
		accumulated_width := 0
		for len(s) != 0 && s[len(s) - 1].Height >= height {
			accumulated_width += s[len(s) - 1].Width
			ans = max(ans, accumulated_width * s[len(s) - 1].Height)
			fmt.Printf("ans: %v\n", ans)
			s = s[:len(s)-1]
		}
		fmt.Printf("current index: %v; accumulated_width: %v\n", i, accumulated_width)
		fmt.Printf("\n")
		s = append(s, Rect{height, accumulated_width + 1})
	}
	return ans
}

func TestLargest(t *testing.T) {
	result := largestRectangleArea([]int{2,1,5,6,2,3})
	t.Log(result)
}