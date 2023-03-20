package redundant_connection_test

import (
	"testing"
)

type OutLineItem struct {
	Val int
	Marked bool
	Lines []int
}

func findRedundantConnection(edges [][]int) []int {
	outLineList := make([]OutLineItem, len(edges) + 1)
	var dfs func(index int, preIndex int) bool
	dfs = func(index int, preIndex int) bool {
		if outLineList[index].Marked == true {
			return false
		}
		outLineList[index].Marked = true
		for _, line := range outLineList[index].Lines {
			if line == preIndex {
				continue
			}
			tmp := dfs(line, index)
			if tmp == false {
				return false
			}
		}
		outLineList[index].Marked = false
		return true
	}
	for _, edge := range edges {
		outLineList[edge[0]].Lines = append(outLineList[edge[0]].Lines, edge[1])
		outLineList[edge[1]].Lines = append(outLineList[edge[1]].Lines, edge[0])
		tmp := dfs(edge[0], 0)
		if tmp == false {
			return edge
		}
	}
	return []int{0, 0}
}

func findRedundantConnection2(input [][]int) []int {
	var (
		edges   = make([][]int, len(input) + 1)
		visited = make([]int, len(input) + 1)
		dfs     func(u int, fa int) bool
	)
	dfs = func(u int, fa int) bool {
		visited[u] = 1
		for _, edge := range edges[u] {
			if edge == fa {
				continue
			}
			if visited[edge] == 0 {
				dfs(edge, u)
			} else if visited[edge] == 1 {
				return false
			}
		}
		visited[u] = 0
		return true
	}
	for _, edge := range input {
		edges[edge[0]] = append(edges[edge[0]], edge[1])
		edges[edge[1]] = append(edges[edge[1]], edge[0])
		for i := range edges {
			valid := dfs(i, i)
			if valid == false {
				return edge
			}
		}
	}
	return []int{0, 0}
}

func TestRedundantConnection(t *testing.T) {
	t.Log(findRedundantConnection2([][]int{[]int{1, 2}, []int{1, 3}, []int{2, 3}}))
	t.Log(findRedundantConnection2([][]int{[]int{1, 2}, []int{2, 3}, []int{3, 4}, []int{1, 4}, []int{1, 5}}))
	// 5 [[1,4],[2,4],[3,1],[3,2]]
	// t.Log(findRedundantConnection([][]int{[]int{1, 4}, []int{2, 4}, []int{3, 1}, []int{3, 2}}))
	t.Log(findRedundantConnection2([][]int{[]int{1, 5}, []int{3, 4}, []int{3, 5}, []int{4, 5}, []int{2, 4}}))
}