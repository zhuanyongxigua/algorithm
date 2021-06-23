package design_circular_deque_test

import "testing"

type ListNode struct {
	Val int
	Next *ListNode
	Prev *ListNode
}

type MyCircularDeque struct {
	head *ListNode
	tail *ListNode
	capacity int
	length int
}


/** Initialize your data structure here. Set the size of the deque to be k. */
func Constructor(k int) MyCircularDeque {
	return MyCircularDeque{nil, nil, k, 0}

}


/** Adds an item at the front of Deque. Return true if the operation is successful. */
func (this *MyCircularDeque) InsertFront(value int) bool {
	if this.length >= this.capacity {
		return false
	}
	if this.head == nil {
		this.head = &ListNode{value, nil, nil}
		this.tail = this.head
	} else {
		newHead := &ListNode{value, this.head, nil}
		this.head.Prev = newHead
		this.head = newHead
	}
	this.length += 1
	return true
}


/** Adds an item at the rear of Deque. Return true if the operation is successful. */
func (this *MyCircularDeque) InsertLast(value int) bool {
	if this.length >= this.capacity {
		return false
	}
	if this.tail == nil {
		this.tail = &ListNode{value, nil, nil}
		this.head = this.tail
	} else {
		newTail := &ListNode{value, nil, this.tail}
		this.tail.Next = newTail
		this.tail = newTail
	}
	this.length += 1
	return true
}


/** Deletes an item from the front of Deque. Return true if the operation is successful. */
func (this *MyCircularDeque) DeleteFront() bool {
	if this.head == nil {
		return false
	}
	this.head = this.head.Next
	if this.head != nil {
		this.head.Prev = nil
	} else {
		this.tail = nil
	}
	this.length -= 1
	return true
}


/** Deletes an item from the rear of Deque. Return true if the operation is successful. */
func (this *MyCircularDeque) DeleteLast() bool {
	if this.tail == nil {
		return false
	}
	this.tail = this.tail.Prev
	if this.tail != nil {
		this.tail.Next = nil
	} else {
		this.head = nil
	}
	this.length -= 1
	return true
}


/** Get the front item from the deque. */
func (this *MyCircularDeque) GetFront() int {
	if this.head == nil {
		return -1
	}
	return this.head.Val
}


/** Get the last item from the deque. */
func (this *MyCircularDeque) GetRear() int {
	if this.tail == nil {
		return -1
	}
	return this.tail.Val
}


/** Checks whether the circular deque is empty or not. */
func (this *MyCircularDeque) IsEmpty() bool {
	if this.length == 0 {
		return true
	}
	return false
}


/** Checks whether the circular deque is full or not. */
func (this *MyCircularDeque) IsFull() bool {
	if this.length == this.capacity {
		return true
	}
	return false
}


/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * obj := Constructor(k);
 * param_1 := obj.InsertFront(value);
 * param_2 := obj.InsertLast(value);
 * param_3 := obj.DeleteFront();
 * param_4 := obj.DeleteLast();
 * param_5 := obj.GetFront();
 * param_6 := obj.GetRear();
 * param_7 := obj.IsEmpty();
 * param_8 := obj.IsFull();
 */

func TestDesignCircularDeque(t *testing.T) {
	myCase := Constructor(4)
	myCase.InsertFront(9)
	myCase.DeleteFront()
	myCase.GetRear()
	myCase.GetFront()
	myCase.GetFront()
}