package is_valid_bst_test

import (
	"math"
	"testing"
)

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func min(x, y float64) float64 {
	if math.IsNaN(x) {
		return y
	}
	if math.IsNaN(y) {
		return x
	}
	if x < y {
		return x
	}
	return y
}

func max(x, y float64) float64 {
	if math.IsNaN(x) {
		return y
	}
	if math.IsNaN(y) {
		return x
	}
	if x > y {
		return x
	}
	return y
}

func isValidBST(root *TreeNode) bool {
	var r func(root *TreeNode) (bool, float64, float64)
	// left true, right false
	r = func(root *TreeNode) (bool, float64, float64) {
		if root == nil {
			return true, math.NaN(), math.NaN()
		}
		FVal := float64(root.Val)
		isLeftOk, maxLeft, minLeft := r(root.Left)
		if !isLeftOk || FVal <= maxLeft {
			return false, math.NaN(), math.NaN()
		}
		isRightOk, maxRight, minRight := r(root.Right)
		if !isRightOk || FVal >= minRight {
			return false, math.NaN(), math.NaN()
		}
		return true, max(FVal, max(maxLeft, maxRight)), min(FVal, min(minLeft, minRight))
	}
	ans, _, _ := r(root)
	return ans
}

func TestIsValidBST(t *testing.T) {
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
	result := isValidBST(tree)
	t.Log(result)
}