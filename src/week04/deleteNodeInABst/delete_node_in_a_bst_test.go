package delete_node_in_a_bst_test

import (
	"testing"
)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func deleteNode(root *TreeNode, key int) *TreeNode {
	if root == nil {
		return nil
	}
	var target *TreeNode
	var targetFa *TreeNode
	var search func(curRoot *TreeNode) bool
	search = func(curRoot *TreeNode) bool {
		if curRoot == nil {
			return false
		}
		if curRoot.Val == key {
			target = curRoot
			return true
		}
		result := false
		if curRoot.Val < key {
			result = search(curRoot.Right)
		} else {
			result = search(curRoot.Left)
		}
		if result == true {
			targetFa = curRoot
		}
		return false
	}
	search(root)
	if target != nil {
		if target.Left != nil && target.Right != nil {
			targetRightFa := target
			targetRight := target.Right
			for targetRight != nil {
				if targetRight.Left == nil {
					break
				}
				targetRightFa = targetRight
				targetRight = targetRight.Left
			}
			if targetRightFa != target {
				targetRightFa.Left = targetRight.Right
			}
			targetRight.Left = target.Left
			if targetRight != target.Right {
				targetRight.Right = target.Right
			} else {
			}
			if targetFa != nil {
				if targetFa.Left == target {
					targetFa.Left = targetRight
				} else {
					targetFa.Right = targetRight
				}
			} else {
				return targetRight
			}
		} else if target.Left == nil && target.Right != nil {
			if targetFa != nil {
				if targetFa.Left == target {
					targetFa.Left = target.Right
				} else {
					targetFa.Right = target.Right
				}
			} else {
				return target.Right
			}
		} else if target.Right == nil && target.Left != nil {
			if targetFa != nil {
				if targetFa.Left == target {
					targetFa.Left = target.Left
				} else {
					targetFa.Right = target.Left
				}
			} else {
				return target.Left
			}
		} else {
			if targetFa != nil {
				if targetFa.Left == target {
					targetFa.Left = nil
				} else {
					targetFa.Right = nil
				}
			} else {
				return nil
			}
		}
	}
	return root
}

func deleteNode2(root *TreeNode, key int) *TreeNode {
	if root == nil {
		return nil
	}
	if root.Val == key {
		if root.Left == nil {
			return root.Right
		}
		if root.Right == nil {
			return root.Left
		}
		next := root.Right
		for next.Left != nil {
			next = next.Left
		}
		root.Right = deleteNode2(root.Right, next.Val)
		root.Val = next.Val
	}
	if root.Val < key {
		root.Right = deleteNode2(root.Right, key)
	} else {
		root.Left = deleteNode2(root.Left, key)
	}
	return root
}

func TestDeleteNodeInABst(t *testing.T) {
	// result := deleteNode(&TreeNode{0, nil, nil}, 0)
	// t.Log(result)
	// [5,3,6,2,4,null,7]
	// 5
	root := &TreeNode{5, &TreeNode{3, &TreeNode{2, nil, nil}, &TreeNode{4, nil, nil}}, &TreeNode{6, nil, &TreeNode{7, nil, nil}}}
	result := deleteNode2(root, 5)
	t.Log(result)
	// [50,30,70,null,40,60,80]
	// 50
	// root := &TreeNode{
	// 	50,
	// 	&TreeNode{
	// 		30,
	// 		nil,
	// 		&TreeNode{40, nil, nil},
	// 	},
	// 	&TreeNode{
	// 		70,
	// 		&TreeNode{
	// 			60,
	// 			nil,
	// 			nil,
	// 		},
	// 		&TreeNode{
	// 			80,
	// 			nil,
	// 			nil,
	// 		},
	// 	},
	// }
	// result := deleteNode(root, 50)
	// t.Log(result)
	// [2,0,33,null,1,25,40,null,null,11,31,34,45,10,18,29,32,null,36,43,46,4,null,12,24,26,30,null,null,35,39,42,44,null,48,3,9,null,14,22,null,null,27,null,null,null,null,38,null,41,null,null,null,47,49,null,null,5,null,13,15,21,23,null,28,37,null,null,null,null,null,null,null,null,8,null,null,null,17,19,null,null,null,null,null,null,null,7,null,16,null,null,20,6]
	// 33
	// [2,0,34,null,1,25,40,null,null,11,31,null,45,10,18,29,32,43,46,4,null,12,24,26,30,null,null,42,44,null,48,3,9,null,14,22,null,null,27,null,null,41,null,null,null,47,49,null,null,5,null,13,15,21,23,null,28,null,null,null,null,null,null,null,8,null,null,null,17,19,null,null,null,null,null,7,null,16,null,null,20,6]
	// [2,0,34,null,1,25,40,null,null,11,31,35,45,10,18,29,32,null,36,43,46,4,null,12,24,26,30,null,null,null,39,42,44,null,48,3,9,null,14,22,null,null,27,null,null,38,null,41,null,null,null,47,49,null,null,5,null,13,15,21,23,null,28,37,null,null,null,null,null,null,null,null,8,null,null,null,17,19,null,null,null,null,null,null,null,7,null,16,null,null,20,6]
}
