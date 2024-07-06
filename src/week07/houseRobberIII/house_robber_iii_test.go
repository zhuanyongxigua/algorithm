package houserobberiii_test

// 337. 打家劫舍 III

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
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

var temp = map[*TreeNode][]int{}

func rob(root *TreeNode) int {
	temp[root] = make([]int, 2)
	temp[root][1] = root.Val
	if root.Left != nil {
		temp[root][0] += rob(root.Left)
		temp[root][1] += temp[root.Left][0]
	}
	if root.Right != nil {
		temp[root][0] += rob(root.Right)
		temp[root][1] += temp[root.Right][0]
	}
	return max(temp[root][0], temp[root][1])
}

func TestRob(t *testing.T) {
	// 7
	result := rob(&TreeNode{
		Val: 3,
		Left: &TreeNode{
			Val:  2,
			Left: nil,
			Right: &TreeNode{
				Val:   3,
				Left:  nil,
				Right: nil,
			},
		},
		Right: &TreeNode{
			Val:  3,
			Left: nil,
			Right: &TreeNode{
				Val:   1,
				Left:  nil,
				Right: nil,
			},
		},
	})

	// 9
	// result := rob(&TreeNode{
	// 	Val: 3,
	// 	Left: &TreeNode{
	// 		Val: 4,
	// 		Left: &TreeNode{
	// 			Val:   1,
	// 			Left:  nil,
	// 			Right: nil,
	// 		},
	// 		Right: &TreeNode{
	// 			Val:   3,
	// 			Left:  nil,
	// 			Right: nil,
	// 		},
	// 	},
	// 	Right: &TreeNode{
	// 		Val:  5,
	// 		Left: nil,
	// 		Right: &TreeNode{
	// 			Val:   1,
	// 			Left:  nil,
	// 			Right: nil,
	// 		},
	// 	},
	// })

	// 7
	// result := rob(&TreeNode{
	// 	Val: 4,
	// 	Left: &TreeNode{
	// 		Val:   1,
	// 		Right: nil,
	// 		Left: &TreeNode{
	// 			Val:   2,
	// 			Right: nil,
	// 			Left: &TreeNode{
	// 				Val:   3,
	// 				Left:  nil,
	// 				Right: nil,
	// 			},
	// 		},
	// 	},
	// 	Right: nil,
	// })
	t.Log(result)
}
