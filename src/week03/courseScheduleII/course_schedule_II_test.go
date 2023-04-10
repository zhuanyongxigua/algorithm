package course_schedule_II_test

import (
	"fmt"
	"testing"
)

// 这一坨 dfs 虽然不太规整，但是思路还是有点牛逼的，很久以前的我写的，居然还可以倒着收集
type Graph struct {
	Edges   [][]int
	Visited []int
	Result  []int
	Valid   bool
}

func (g *Graph) dfs(u int) {
	g.Visited[u] = 1
	for _, v := range g.Edges[u] {
		if g.Visited[v] == 0 {
			g.dfs(v)
			if !g.Valid {
				return
			}
		} else if g.Visited[v] == 1 {
			g.Valid = false
			return
		}
	}
	g.Visited[u] = 2
	g.Result = append(g.Result, u)
}

func findOrder3(numCourses int, prerequisites [][]int) []int {
	var g = Graph{}
	g.Edges = make([][]int, numCourses)
	g.Visited = make([]int, numCourses)
	g.Valid = true

	for _, info := range prerequisites {
		g.Edges[info[1]] = append(g.Edges[info[1]], info[0])
	}

	for i := 0; i < numCourses && g.Valid; i++ {
		if g.Visited[i] == 0 {
			g.dfs(i)
		}
	}
	fmt.Printf("Result after dfs: %v\n", g.Result)
	if g.Valid {
		l := len(g.Result)
		for i := 0; i < l/2; i++ {
			g.Result[i], g.Result[l-i-1] = g.Result[l-i-1], g.Result[i]
		}
		return g.Result
	} else {
		return []int{}
	}
}

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
			valid := dfs(v)
			if valid == false {
				return false
			}
			edges[v].Visited = false
		}
		if edges[i].Marked == false {
			ans = append(ans, i)
			edges[i].Marked = true
		}
		return true
	}
	for i := range edges {
		valid := true
		valid = dfs(i)
		edges[i].Visited = false
		if valid == false {
			return []int{}
		}
	}

	l := len(ans)
	for i := 0; i < l/2; i++ {
		ans[i], ans[l-i-1] = ans[l-i-1], ans[i]
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
	// t.Log(findOrder(7, [][]int{[]int{1, 0}, []int{0, 3}, []int{0, 2}, []int{3, 2}, []int{2, 5}, []int{4, 5}, []int{5, 6}, []int{2, 4}}))
	t.Log(findOrder(8, [][]int{[]int{1, 0}, []int{2, 6}, []int{1, 7}, []int{5, 1}, []int{6, 4}, []int{7, 0}, []int{0, 5}}))
}
