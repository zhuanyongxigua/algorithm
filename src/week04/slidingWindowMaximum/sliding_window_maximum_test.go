package sliding_window_maximum_test

import (
	"container/heap"
	"testing"
)

type Item struct {
	Val int
	Index int
}

// An IntHeap is a max-heap of ints.
type IntHeap []*Item

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i].Val > h[j].Val }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
	// Push and Pop use pointer receivers because they modify the slice's length,
	// not just its contents.
	*h = append(*h, x.(*Item))
}

func (h *IntHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func maxSlidingWindow(nums []int, k int) []int {
	h := &IntHeap{}
	heap.Init(h)
	ans := []int{}
	for i, num := range nums {
		heap.Push(h, &Item{num, i})
		if i - k + 1 < 0 {
			continue
		}
		cur := (*h)[0]
		for cur.Index <= i - k {
			heap.Pop(h)
			cur = (*h)[0]
		}
		ans = append(ans, cur.Val)
	}
	return ans
}

func TestSlidingWindowMaximum(t *testing.T) {
	// result := maxSlidingWindow([]int{1,3,-1,-3,5,3,6,7}, 3)
	// result := maxSlidingWindow([]int{1}, 1)
	// result := maxSlidingWindow([]int{1, -1}, 1)
	result := maxSlidingWindow([]int{-7, -8, 7, 5, 7, 1, 6, 0}, 4)
	t.Log(result)
}