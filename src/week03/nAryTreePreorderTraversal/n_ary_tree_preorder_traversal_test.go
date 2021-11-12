package n_ary_tree_preorder_traversal_test

import "testing"

type Node struct {
	Val int
	Children []*Node
}

func preorder(root *Node) []int {
	ans := []int{}
	if root == nil {
		return ans
	}
	var r func(node *Node)
	r = func(node *Node) {
		if node == nil {
			return
		}
		ans = append(ans, node.Val)
		for _, v := range node.Children {
			r(v)
		}
	}
	r(root)
	return ans
}

func TestNAryTreePreorderTraversal(t *testing.T) {

}