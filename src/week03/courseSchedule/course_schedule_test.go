package course_schedule_test

import "testing"

func canFinish(numCourses int, prerequisites [][]int) bool {
	var (
		edges = make([][]int, numCourses)
		visited = make([]int, numCourses)
		valid = true
		dfs func(u int)
	)

	dfs = func(u int) {
		visited[u] = 1
		for _, v := range edges[u] {
			if visited[v] == 0 {
				dfs(v)
				if !valid {
					return
				}
			} else if visited[v] == 1 {
				valid = false
				return
			}
		}
		visited[u] = 2
	}

	for _, info := range prerequisites {
		edges[info[1]] = append(edges[info[1]], info[0])
	}

	for i := 0; i < numCourses && valid; i++ {
		if visited[i] == 0 {
			dfs(i)
		}
	}
	return valid
}

func TestCanFinish(t *testing.T) {
	// t.Log(canFinish(2, [][]int{[]int{1, 0}}))
	// t.Log(canFinish(2, [][]int{[]int{1, 0}, []int{0, 1}}))
	// 5 [[1,4],[2,4],[3,1],[3,2]]
	t.Log(canFinish(5, [][]int{[]int{1, 4}, []int{2, 4}, []int{3, 1}, []int{3, 2}}))
	// t.Log(canFinish(6, [][]int{[]int{1, 4}, []int{2, 4}, []int{4, 2}, []int{5, 4}, []int{3, 5}}))
}