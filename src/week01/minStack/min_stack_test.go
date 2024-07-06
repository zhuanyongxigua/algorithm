package minstack_test

import "testing"

type MinStack struct {
	stack       []int
	prefixStack []int
}

func Constructor() MinStack {
	return MinStack{}
}

func (this *MinStack) Push(val int) {
	this.stack = append(this.stack, val)
	if len(this.prefixStack) != 0 && val > this.prefixStack[len(this.prefixStack)-1] {
		this.prefixStack = append(this.prefixStack, this.prefixStack[len(this.prefixStack)-1])
	} else {
		this.prefixStack = append(this.prefixStack, val)
	}
}

func (this *MinStack) Pop() {
	this.stack = this.stack[0 : len(this.stack)-1]
	this.prefixStack = this.prefixStack[0 : len(this.prefixStack)-1]
}

func (this *MinStack) Top() int {
	return this.stack[len(this.stack)-1]
}

func (this *MinStack) GetMin() int {
	return this.prefixStack[len(this.prefixStack)-1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Push(val);
 * obj.Pop();
 * param_3 := obj.Top();
 * param_4 := obj.GetMin();
 */

func TestMain(t *testing.T) {
	minStack := Constructor()
	minStack.Push(-2)
	minStack.Push(0)
	minStack.Push(-3)
	if min := minStack.GetMin(); min != -3 {
		t.Errorf("minStack.GetMin() = %v; want -3", min)
	}
	minStack.Pop()
	if top := minStack.Top(); top != 0 {
		t.Errorf("minStack.Top() = %v; want 0", top)
	}
	if min := minStack.GetMin(); min != -2 {
		t.Errorf("minStack.GetMin() = %v; want -2", min)
	}
}
