package insert_into_a_binary_search_tree_test

import "testing"

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */


type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func insertIntoBST(root *TreeNode, val int) *TreeNode {
	if root == nil {
		return &TreeNode{val, nil, nil}
	}
	if root.Val == val {
		return root
	}
	if val > root.Val {
		root.Right = insertIntoBST(root.Right, val)
	} else {
		root.Left = insertIntoBST(root.Left, val)
	}
	return root
}

func TestInsertIntoBST(t *testing.T) {
	node := &TreeNode{
		4,
		&TreeNode{
			2,
			&TreeNode{1, nil, nil},
			&TreeNode{3, nil, nil},
		},
		&TreeNode{7, nil, nil},
	}
	result := insertIntoBST(node, 5)
	t.Log(result)
}