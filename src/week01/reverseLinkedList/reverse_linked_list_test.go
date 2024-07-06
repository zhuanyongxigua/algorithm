package reverselinkedlist_test

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

func reverseList(head *ListNode) *ListNode {
	if head == nil {
		return head
	}
	var ansHead *ListNode = nil
	var next *ListNode = head
	for next != nil {
		temp := next.Next
		next.Next = ansHead
		ansHead = next
		next = temp
	}
	return ansHead
}

func reverseList2(head *ListNode) *ListNode {
	var next *ListNode
	for head != nil {
		temp := head.Next
		head.Next = next
		next = head
		head = temp
	}
	return next
}

func TestReverseList(t *testing.T) {
	testCases := []struct {
		head *ListNode
		want *ListNode
	}{
		{
			head: &ListNode{1, &ListNode{2, &ListNode{3, &ListNode{4, &ListNode{5, nil}}}}},
			want: &ListNode{5, &ListNode{4, &ListNode{3, &ListNode{2, &ListNode{1, nil}}}}},
		},
		{
			head: &ListNode{1, &ListNode{2, nil}},
			want: &ListNode{2, &ListNode{1, nil}},
		},
		{
			head: nil,
			want: nil,
		},
	}

	for _, tc := range testCases {
		got := reverseList2(tc.head)
		for got != nil || tc.want != nil {
			if got == nil || tc.want == nil || got.Val != tc.want.Val {
				t.Errorf("reverseList() = %v; want %v", got, tc.want)
				break
			}
			got = got.Next
			tc.want = tc.want.Next
		}
	}
}
