package n_ary_tree_level_order_traversal_test

import "testing"

type Node struct {
	Val int
	Children []*Node
}

type Pair struct {
	Node *Node
	Dep int
}

func levelOrder(root *Node) [][]int {
	if root == nil {
		return [][]int{}
	}
	queue := []Pair{}
	ans := [][]int{}
	queue = append(queue, Pair{root, 0})
	for len(queue) != 0 {
		cur := queue[0]
		queue = queue[1:]
		if len(ans) <= cur.Dep {
			ans = append(ans, []int{})
		}
		ans[cur.Dep] = append(ans[cur.Dep], cur.Node.Val)
		for _, child := range cur.Node.Children {
			queue = append(queue, Pair{child, cur.Dep + 1})
		}
	}
	return ans
}

func TestNAryTreeLevelOrderTraversal(t *testing.T) {

}