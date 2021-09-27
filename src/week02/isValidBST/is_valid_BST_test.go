package is_valid_bst_test

import "testing"

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func isValidBST(root *TreeNode) bool {
	var r func(root *TreeNode) (bool, int)
	r = func(root *TreeNode) (bool, int) {
		if root == nil {
			return true, 0
		}
		isLeftOk, maxLeft := r(root.Left)
		if !isLeftOk {
			return false, root.Val
		}
		isRightOk, minRight := r(root.Right)
		if !isRightOk {
			return false, root.Val
		}
		if root.Val < maxLeft {
			return false, root.Val
		}
		if root.Val > minRight {
			return false, root.Val
		}
		return true, root.Val
	}
	ans, _ := r(root)
	return ans
}

func TestIsValidBST(t *testing.T) {

}