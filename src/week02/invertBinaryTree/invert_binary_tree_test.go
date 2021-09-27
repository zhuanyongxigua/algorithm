package invert_binary_tree_test

import "testing"

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func invertTree(root *TreeNode) *TreeNode {
	if root == nil {
		return root
	}
	invertTree(root.Left)
	invertTree(root.Right)
	root.Left, root.Right = root.Right, root.Left
	return root
}

func TestInvertBinaryTree(t *testing.T) {
	// [4,2,7,1,3,6,9]
	// result := invertTree()
	// t.Log(result)
}