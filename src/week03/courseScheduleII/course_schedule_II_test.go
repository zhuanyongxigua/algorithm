package course_schedule_II_test

import (
	"testing"
)

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

func findOrder(numCourses int, prerequisites [][]int) []int {
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

func TestFindOrder(t *testing.T) {
	t.Log("fuck")
	t.Log(findOrder(2, [][]int{[]int{1, 0}}))
}
