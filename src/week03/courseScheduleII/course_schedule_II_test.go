package course_schedule_II_test

import (
	"testing"
)

type OutLineItem struct {
	Lines []int
	Visited bool
	Marked bool
	InDegree int
}

func findOrder(numCourses int, prerequisites [][]int) []int {
	ans := []int{}
	edges := make([]OutLineItem, numCourses)
	for _, prerequisite := range prerequisites {
		edges[prerequisite[1]].Lines = append(edges[prerequisite[1]].Lines, prerequisite[0])
		edges[prerequisite[0]].InDegree++
	}
	var dfs func(i int) bool
	dfs = func(i int) bool {
		if edges[i].Visited == true {
			return false
		}
		edges[i].Visited = true
		for _, v := range edges[i].Lines {
			edges[v].InDegree--
			if edges[v].Marked == false && edges[v].InDegree == 0 {
				edges[v].Marked = true
				ans = append(ans, v)
			}
			valid := dfs(v)
			if valid == false {
				return false
			}
			edges[v].Visited = false
		}
		return true
	}
	for i := range edges {
		valid := true
		if edges[i].InDegree == 0 {
			if edges[i].Marked == false {
				edges[i].Marked = true
				ans = append(ans, i)
			}
			valid = dfs(i)
			edges[i].Visited = false
		}
		if valid == false {
			return []int{}
		}
	}
	return ans
}

// bfs
func findOrder2(numCourses int, prerequisites [][]int) []int {
	ans := []int{}
	edges := make([]OutLineItem, numCourses)
	for _, prerequisite := range prerequisites {
		edges[prerequisite[1]].Lines = append(edges[prerequisite[1]].Lines, prerequisite[0])
		edges[prerequisite[0]].InDegree++
	}
	pool := []int{}
	for i, edge := range edges {
		if edge.InDegree == 0 {
			pool = append(pool, i)
			ans = append(ans, i)
		}
	}
	for len(pool) != 0 {
		cur := pool[0]
		pool = pool[1:]
		for _, line := range edges[cur].Lines {
			edges[line].InDegree--
			if edges[line].InDegree == 0 {
				pool = append(pool, line)
				ans = append(ans, line)
			}
		}
	}
	if len(ans) == numCourses {
		return ans
	} else {
		return []int{}
	}
}

func TestFindOrder(t *testing.T) {
	// t.Log(findOrder(4, [][]int{[]int{1, 0},[]int{2, 0},[]int{3, 1},[]int{3, 2}}))
	// t.Log(findOrder(4, [][]int{[]int{1, 0},[]int{3, 0},[]int{2, 1},[]int{3, 2}}))
	// t.Log(findOrder(4, [][]int{[]int{1, 0},[]int{3, 0},[]int{2, 1}}))
	// t.Log(findOrder(2, [][]int{[]int{1, 0}}))
	// t.Log(findOrder(2, [][]int{[]int{0, 1}}))
	// t.Log(findOrder(2, [][]int{}))
	// t.Log(findOrder(2, [][]int{[]int{0, 1}, []int{1, 0}}))
	// t.Log(findOrder(3, [][]int{[]int{1, 0}, []int{1, 2}, []int{0, 1}}))
	t.Log(findOrder(7, [][]int{[]int{1, 0}, []int{0, 3}, []int{0, 2}, []int{3, 2}, []int{2, 5}, []int{4, 5}, []int{5, 6}, []int{2, 4}}))
}
