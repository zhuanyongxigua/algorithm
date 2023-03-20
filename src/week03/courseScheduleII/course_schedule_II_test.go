package course_schedule_II_test

import (
	"fmt"
	"testing"
)

type OutLineItem struct {
	Lines []int
	Marked bool
	InDegree int
}

// bfs
func findOrder3(numCourses int, prerequisites [][]int) []int {
	queue := []int{}
	outLineList := make([]OutLineItem, numCourses)
	curQueueIndex := -1
	for _, edge := range prerequisites {
		outLineList[edge[1]].Lines = append(outLineList[edge[1]].Lines, edge[0])
		outLineList[edge[0]].InDegree++
	}
	for index, outLineItem := range outLineList {
		if outLineItem.InDegree == 0 && outLineItem.Marked != true {
			queue = append(queue, index)
		}
	}
	for curQueueIndex + 1 < len(queue) {
		curQueueIndex++
		index := queue[curQueueIndex]
		outLineList[index].Marked = true
		for _, line := range outLineList[index].Lines {
			outLineList[line].InDegree--
			if outLineList[line].InDegree == 0 && outLineList[line].Marked != true {
				queue = append(queue, line)
			}
		}
	}
	if len(queue) < len(outLineList) {
		return []int{}
	}
	return queue
}

// bfs
func findOrder2(numCourses int, prerequisites [][]int) []int {
	queue := []int{}
	outLineList := make([]OutLineItem, numCourses)
	curQueueIndex := -1
	for _, edge := range prerequisites {
		outLineList[edge[1]].Lines = append(outLineList[edge[1]].Lines, edge[0])
		outLineList[edge[0]].InDegree++
	}
	var bfs func()
	bfs = func() {
		if len(queue) == 0 {
			return
		}
		// 神奇的是我发现以前居然是用 dfs 写的，这题 dfs 居然能写，写完 bfs 再试下 dfs
		// 下面的 dfs 的解法还是很精彩的，精髓就在回溯那个地方，如果是在回来的时候才向数组里面塞东西，那顺序就是完美的，只不过就是反过来的
		index := queue[curQueueIndex]
		for _, line := range outLineList[index].Lines {
			outLineList[line].InDegree--
			if outLineList[line].InDegree == 0 && outLineList[line].Marked != true {
				queue = append(queue, line)
				outLineList[line].Marked = true
				curQueueIndex++
				bfs()
			}
		}
	}
	for index, outLineItem := range outLineList {
		if outLineItem.InDegree == 0 && outLineItem.Marked != true {
			queue = append(queue, index)
			outLineList[index].Marked = true
			curQueueIndex++
			bfs()
		}
	}
	if len(queue) != len(outLineList) {
		return []int{}
	}
	return queue
}

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

// bfs
func findOrder4(numCourses int, prerequisites [][]int) []int {
	ans := []int{}
	queue := []int{}
	edges := make([]OutLineItem, numCourses)
	for _, v := range prerequisites {
		edges[v[1]].Lines = append(edges[v[1]].Lines, v[0])
		edges[v[0]].InDegree++
	}
	start := OutLineItem{[]int{}, false, -1}
	for i, v := range edges {
		if v.InDegree == 0 {
			queue = append(queue, i)
		}
	}
	if len(queue) != 0 {
		start = edges[queue[0]]
		ans = append(ans, queue[0])
		queue = queue[1:]
	}
	for start.InDegree == 0 {
		for _, v := range start.Lines {
			edges[v].InDegree--
			if edges[v].InDegree == 0 {
				queue = append(queue, v)
			}
		}
		if len(queue) != 0 {
			start = edges[queue[0]]
			ans = append(ans, queue[0])
			queue = queue[1:]
		} else {
			break
		}
	}
	if len(queue) != 0 {
		return []int{}
	}
	for _, v := range edges {
		if v.InDegree != 0 {
			return []int{}
		}
	}
	return ans
}

func TestFindOrder(t *testing.T) {
	// t.Log(findOrder4(4, [][]int{[]int{1, 0},[]int{2, 0},[]int{3, 1},[]int{3, 2}}))
	// t.Log(findOrder4(4, [][]int{[]int{1, 0},[]int{3, 0},[]int{2, 1},[]int{3, 2}}))
	// t.Log(findOrder4(4, [][]int{[]int{1, 0},[]int{3, 0},[]int{2, 1}}))
	t.Log(findOrder4(2, [][]int{[]int{1, 0}}))
	// t.Log(findOrder4(2, [][]int{[]int{0, 1}}))
	// t.Log(findOrder4(2, [][]int{}))
	// t.Log(findOrder4(2, [][]int{[]int{0, 1}, []int{1, 0}}))
	// t.Log(findOrder4(3, [][]int{[]int{1, 0}, []int{1, 2}, []int{0, 1}}))
}
