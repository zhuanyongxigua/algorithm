package minimum_depth_of_binary_tree_test

import (
	"testing"
)

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}

func minDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	left := minDepth(root.Left)
	right := minDepth(root.Right)
	if root.Left == nil{
		return right + 1
	}
	if root.Right == nil {
		return left + 1
	}
	return min(left, right) + 1
}

func TestMinimumDepthOfBianryTree(t *testing.T) {
	// tree := &TreeNode{3, &TreeNode{9, nil, nil}, &TreeNode{20, &TreeNode{15, nil, nil}, &TreeNode{17, nil, nil}}}
	tree := &TreeNode{2, nil, &TreeNode{3, nil, &TreeNode{4, nil, &TreeNode{5, nil, &TreeNode{6, nil, nil}}}}}
	result := minDepth(tree)
	t.Log(result)

}