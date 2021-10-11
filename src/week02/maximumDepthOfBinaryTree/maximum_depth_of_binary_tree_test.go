package maximum_depth_of_binary_tree_test

import "testing"

type TreeNode struct {
	Val int
	Left *TreeNode
	Right *TreeNode
}

func maxDepth(root *TreeNode) int {
	var r func(curFloor int, root *TreeNode) int
	r = func(curFloor int, root *TreeNode) int {
		if root == nil {
			return curFloor
		}
		curFloor += 1
		leftMax := r(curFloor, root.Left)
		rightMax := r(curFloor, root.Right)
		if leftMax > rightMax {
			return leftMax
		} else {
			return rightMax
		}
	}
	ans := r(0, root)
	return ans
}

// second way
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

func maxDepth2(root *TreeNode) int {
	if root == nil {
		return 0
	}
	return max(maxDepth2(root.Left), maxDepth2(root.Right)) + 1
}

func TestMaximumDepthOfBinaryTreeTest(t *testing.T) {
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
	tree := &TreeNode{3, &TreeNode{9, nil, nil}, &TreeNode{20, &TreeNode{15, nil, nil}, &TreeNode{7, nil, nil}}}
	result := maxDepth(tree)
	t.Log(result)
}