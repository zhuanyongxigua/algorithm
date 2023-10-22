package lowest_common_ancestor_of_a_binary_tree_test

// 236.二叉树的最近公共祖先

import (
	"testing"
)

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	ans := root
	isBreak := false
	var r func(cur *TreeNode) bool
	r = func(cur *TreeNode) bool {
		if cur == nil {
			return false
		}
		leftResult := r(cur.Left)
		rightResult := r(cur.Right)
		if isBreak == true {
			return true
		}
		if leftResult == true {
			if rightResult == true || cur == p || cur == q {
				isBreak = true
				ans = cur
				return true
			}
			return true
		}
		if rightResult == true {
			if cur == p || cur == q {
				isBreak = true
				ans = cur
				return true
			}
			return true
		}
		if cur == p || cur == q {
			return true
		}
		return false
	}
	r(root)
	return ans
}

func TestLowestFunc(t *testing.T) {
	p := &TreeNode{
		5,
		&TreeNode{6, nil, nil},
		&TreeNode{2, &TreeNode{7, nil, nil}, &TreeNode{4, nil, nil}},
	}
	q := &TreeNode{
		1,
		&TreeNode{0, nil, nil},
		&TreeNode{8, nil, nil},
	}
	tree := &TreeNode{3, p, q}

	// q := &TreeNode{4, nil, nil}
	// p := &TreeNode{
	// 	5,
	// 	&TreeNode{6, nil, nil},
	// 	&TreeNode{2, &TreeNode{7, nil, nil}, q},
	// }
	// tree := &TreeNode{
	// 	3,
	// 	p,
	// 	&TreeNode{
	// 		1,
	// 		&TreeNode{0, nil, nil},
	// 		&TreeNode{8, nil, nil},
	// 	},
	// }

	// q := &TreeNode{4, nil, nil}
	// p := &TreeNode{8, nil, nil}
	// tree := &TreeNode{
	// 	-1,
	// 	&TreeNode{
	// 		0,
	// 		&TreeNode{-2, p, nil},
	// 		q,
	// 	},
	// 	&TreeNode{3, nil, nil},
	// }

	// p := &TreeNode{8, nil, nil}
	// q := &TreeNode{
	// 	0,
	// 	&TreeNode{-2, p, nil},
	// 	&TreeNode{4, nil, nil},
	// }
	// tree := &TreeNode{
	// 	-1,
	// 	q,
	// 	&TreeNode{3, nil, nil},
	// }

	// p := &TreeNode{3, nil, nil}
	// q := &TreeNode{5, nil, nil}
	// tree := &TreeNode{
	// 	9,
	// 	&TreeNode{
	// 		-1,
	// 		&TreeNode{10, nil, q},
	// 		p,
	// 	},
	// 	&TreeNode{-4, nil, nil},
	// }

	result := lowestCommonAncestor(tree, p, q)
	t.Log(result)

}
