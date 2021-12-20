package successor_lcci_test

import (
	"testing"
)

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

const MaxUint = ^uint(0)
const MaxInt = int(MaxUint >> 1)

func inorderSuccessor(root *TreeNode, p *TreeNode) *TreeNode {
	if p.Right != nil {
		rightRoot := p.Right
		for rightRoot != nil && rightRoot.Left != nil {
			rightRoot = rightRoot.Left
		}
		return rightRoot
	} else {
		minNode := &TreeNode{MaxInt, nil, nil}
		var r func(curRoot *TreeNode)
		r = func(curRoot *TreeNode) {
			if curRoot == nil || curRoot == p {
				return
			}
			if curRoot.Val < p.Val {
				r(curRoot.Right)
			} else {
				if curRoot.Val < minNode.Val {
					minNode = curRoot
				}
				r(curRoot.Left)
			}
		}
		r(root)
		if minNode.Val == MaxInt {
			return nil
		} else {
			return minNode
		}
	}
}

func TestSuccessorLcci(t *testing.T) {
	root := &TreeNode{2, nil, nil}
	left := &TreeNode{1, nil, nil}
	right := &TreeNode{3, nil, nil}
	root.Left = left
	root.Right = right
	result := inorderSuccessor(root, left)
	t.Log(result)
}