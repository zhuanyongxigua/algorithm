package merge_k_sorted_lists_test

import (
	"container/heap"
	"fmt"
	"testing"
)

// An Item is something we manage in a priority queue.
type Item struct {
	value    *ListNode // The value of the item; arbitrary.
	priority int    // The priority of the item in the queue.
	// The index is needed by update and is maintained by the heap.Interface methods.
	index int // The index of the item in the heap.
}

// A PriorityQueue implements heap.Interface and holds Items.
type PriorityQueue []*Item

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
	// We want Pop to give us the highest, not lowest, priority so we use greater than here.
	return pq[i].priority < pq[j].priority
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].index = i
	pq[j].index = j
}

func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	item := x.(*Item)
	item.index = n
	*pq = append(*pq, item)
	for _, ele := range *pq {
		fmt.Printf("Push: %v\n", ele)
		fmt.Println()
	}
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	fmt.Printf("item in Pop: %v\n", item.priority)
	fmt.Println()
	old[n-1] = nil  // avoid memory leak
	item.index = -1 // for safety
	*pq = old[0 : n-1]
	return item
}

// Definition for singly-linked list.
type ListNode struct {
	Val int
	Next *ListNode
}

func mergeKLists(lists []*ListNode) *ListNode {
	pq := PriorityQueue{}
	for i, list := range lists {
		fmt.Printf("list: %v\n", list)
		if list != nil {
			heap.Push(&pq, &Item{
				value: list,
				priority: list.Val,
				index: i,
			})
			// pq[i] = &Item{
			// 	value: list,
			// 	priority: list.Val,
			// 	index: i,
			// }
		}
	}
	fmt.Println()
	heap.Init(&pq)
	for _, ele := range pq {
		fmt.Printf("After init: %v\n", ele)
		fmt.Println()
	}
	head := &ListNode{-1, nil}
	tail := head
	for pq.Len() != 0 {
		item := heap.Pop(&pq).(*Item)
		fmt.Printf("item: %v\n", item.priority)
		tail.Next = item.value
		tail = tail.Next
		if item.value.Next != nil {
			fmt.Printf("item.value.Val: %v\n", item.value.Val)
			heap.Push(&pq, &Item{
				value: item.value.Next,
				priority: item.value.Next.Val,
			})
		}
	}
	fmt.Println()
	return head.Next
}

func mergeKLists2(lists []*ListNode) *ListNode {
	if len(lists) == 0 {
		return nil
	}
	if len(lists) == 1 {
		return lists[0]
	}
	index := len(lists) / 2
	fmt.Printf("index: %v\n", index)
	list1 := mergeKLists2(lists[:index])
	list2 := mergeKLists2(lists[index:])
	ans := &ListNode{
		Val: -1,
		Next: nil,
	}
	tail := ans
	for list1 != nil && list2 != nil {
		if list1.Val < list2.Val {
			tail.Next = list1
			list1 = list1.Next
		} else {
			tail.Next = list2
			list2 = list2.Next
		}
		tail = tail.Next
	}
	if list1 == nil {
		tail.Next = list2
	} else if (list2 == nil) {
		tail.Next = list1
	}
	return ans.Next
}

// This example creates a PriorityQueue with some items, adds and manipulates an item,
// and then removes the items in priority order.
func TestMergeKSortedLists(t *testing.T) {
	// node1 := &ListNode{
	// 	Val: 1,
	// 	Next: &ListNode{
	// 		Val: 2,
	// 		Next: &ListNode{
	// 			Val: 4,
	// 			Next: nil,
	// 		},
	// 	},
	// }
	// node2 := &ListNode{
	// 	Val: 4,
	// 	Next: &ListNode{
	// 		Val: 5,
	// 		Next: &ListNode{
	// 			Val: 6,
	// 			Next: nil,
	// 		},
	// 	},
	// }
	// node3 := &ListNode{
	// 	Val: 3,
	// 	Next: &ListNode{
	// 		Val: 4,
	// 		Next: &ListNode{
	// 			Val: 5,
	// 			Next: nil,
	// 		},
	// 	},
	// }

	// node2 := &ListNode{
	// 	Val: 1,
	// 	Next: nil,
	// }

	result := mergeKLists2([]*ListNode{})
	for result != nil {
		fmt.Printf("Val: %v\n", result.Val)
		result = result.Next
	}
}