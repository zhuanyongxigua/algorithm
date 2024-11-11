package construct_binary_tree_form_inorder_and_postorder_traversal_test

import "testing"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

var postorder []int

func build(left int, right int, idMap map[int]int) *TreeNode {
	if left > right {
		return nil
	}

	val := postorder[len(postorder)-1]
	postorder = postorder[:len(postorder)-1]
	root := &TreeNode{Val: val}

	inorderRootIndex := idMap[val]
	root.Right = build(inorderRootIndex+1, right, idMap)
	root.Left = build(left, inorderRootIndex-1, idMap)
	return root
}

func buildTree(inorder []int, postorde []int) *TreeNode {
	idMap := map[int]int{}
	for i, v := range inorder {
		idMap[v] = i
	}
	postorder = postorde
	return build(0, len(inorder)-1, idMap)
}

func TestBuildTree(t *testing.T) {
	// t.Log(buildTree([]int{9, 3, 15, 20, 7}, []int{9, 15, 7, 20, 3}))
	result := buildTree([]int{1, 2, 3}, []int{2, 3, 1})
	t.Log(result)
}
