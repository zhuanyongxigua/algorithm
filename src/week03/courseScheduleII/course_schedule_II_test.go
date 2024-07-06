package course_schedule_II_test

import (
	"testing"
)

func findOrder(numCourses int, prerequisites [][]int) []int {
	ans := []int{}
	edges := make([][]int, numCourses)
	inCome := make([]int, numCourses)
	for i, prerequisite := range prerequisites {

	}

	return ans
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
