package mergesortedlinkedlist_test

import (
	"encoding/json"
	"testing"
)

type ListNode struct {
	Val int
	Next *ListNode
}

func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
	if l1 == nil {
		return l2
	}
	if l2 == nil {
		return l1
	}
	l1Protect := ListNode{Val: 0, Next: l1}
	l1Prev := &l1Protect
	l1Cur := l1
	l2Cur := l2
	l2Next := l2.Next
	for l1Cur != nil {
		if l1Cur.Val >= l2Cur.Val {
			l1Prev.Next = l2Cur
			l2Cur.Next = l1Cur
			l1Prev = l2Cur
			l2Cur = l2Next
			if l2Cur == nil {
				return l1Protect.Next
			}
			l2Next = l2Cur.Next
		} else if l1Cur.Val < l2Cur.Val {
			l1Prev = l1Cur
			l1Cur = l1Cur.Next
		}
	}
	l1Prev.Next = l2Cur
	return l1Protect.Next
}

func TestMergeSortedLinkedList(t *testing.T) {
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
	// 	Val: 1,
	// 	Next: &ListNode{
	// 		Val: 3,
	// 		Next: &ListNode{
	// 			Val: 4,
	// 			Next: nil,
	// 		},
	// 	},
	// }
	node1 := &ListNode{
		Val: 1,
		Next: nil,
	}
	node2 := &ListNode{
		Val: 2,
		Next: nil,
	}
	result := mergeTwoLists(node1, node2)
	result2B, _ := json.Marshal(result)
	t.Log("testing hahaha", string(result2B))
}
