package binary_tree_inorder_traversal_test

import "testing"

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func inorderTraversal(root *TreeNode) []int {
	ans := []int{}
	var r func(node *TreeNode)
	r = func(node *TreeNode) {
		if node == nil {
			return
		}
		r(node.Left)
		ans = append(ans, node.Val)
		r(node.Right)
	}
	r(root)
	return ans
}

func TestBinaryTreeInOrderTraversal(t *testing.T) {
	// tree := &TreeNode{
	// 	120, 
	// 	&TreeNode{
	// 		70,
	// 		&TreeNode{50, &TreeNode{20, nil, nil}, &TreeNode{55, nil, nil}},
	// 		&TreeNode{100, &TreeNode{75, nil, nil}, &TreeNode{110, nil, nil}},
	// 	}, 
	// 	&TreeNode{
	// 		140,
	// 		&TreeNode{130, &TreeNode{119, nil, nil}, &TreeNode{135, nil, nil}},
	// 		&TreeNode{160, &TreeNode{150, nil, nil}, &TreeNode{200, nil, nil}},
	// 	}}
	// tree := &TreeNode{5, &TreeNode{4, nil, nil}, &TreeNode{6, &TreeNode{3, nil, nil}, &TreeNode{7, nil, nil}}}
	tree := &TreeNode{2, &TreeNode{1, nil, nil}, &TreeNode{3, nil, nil}}
	result := inorderTraversal(tree)
	t.Log(result)
}