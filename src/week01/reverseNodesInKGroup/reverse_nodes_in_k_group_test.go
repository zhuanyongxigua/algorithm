package reverse_nodes_in_k_group_test

import "testing"

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
type ListNode struct {
	Val  int
	Next *ListNode
}

func reverseLinkedList(head *ListNode) (*ListNode, *ListNode) {
	var next *ListNode
	originalHead := head
	for head != nil {
		temp := head.Next
		head.Next = next
		next = head
		head = temp
	}
	return next, originalHead
}

func reverseKGroup(head *ListNode, k int) *ListNode {
	num := 0
	left := &ListNode{0, head}
	originalLeft := left
	var right *ListNode
	var curHead *ListNode
	var curTail *ListNode
	for head != nil {
		if num == 0 {
			curHead = head
			head = head.Next
			num++
		} else if num == k-1 {
			right = head.Next
			head.Next = nil
			curHead, curTail = reverseLinkedList(curHead)
			left.Next = curHead
			curTail.Next = right
			left = curTail
			right = nil
			num = 0
			head = curTail.Next
		} else {
			head = head.Next
			num++
		}
	}
	return originalLeft.Next
}

func TestReverseKGroup(t *testing.T) {
	testCases := []struct {
		head *ListNode
		k    int
		want *ListNode
	}{
		{
			head: &ListNode{1, &ListNode{2, &ListNode{3, &ListNode{4, &ListNode{5, nil}}}}},
			k:    2,
			want: &ListNode{2, &ListNode{1, &ListNode{4, &ListNode{3, &ListNode{5, nil}}}}},
		},
		{
			head: &ListNode{1, &ListNode{2, &ListNode{3, &ListNode{4, &ListNode{5, nil}}}}},
			k:    1,
			want: &ListNode{1, &ListNode{2, &ListNode{3, &ListNode{4, &ListNode{5, nil}}}}},
		},
		{
			head: &ListNode{1, &ListNode{2, &ListNode{3, &ListNode{4, &ListNode{5, nil}}}}},
			k:    3,
			want: &ListNode{3, &ListNode{2, &ListNode{1, &ListNode{4, &ListNode{5, nil}}}}},
		},
	}

	for _, tc := range testCases {
		got := reverseKGroup(tc.head, tc.k)
		for got != nil || tc.want != nil {
			if got == nil || tc.want == nil || got.Val != tc.want.Val {
				t.Errorf("reverseKGroup() = %v; want %v", got, tc.want)
				break
			}
			got = got.Next
			tc.want = tc.want.Next
		}
	}
}
