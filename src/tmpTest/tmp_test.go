package tmp_test

import (
	"bytes"
	"encoding/gob"
	"fmt"
	"testing"
)

type OutLineItem struct {
	Lines []int
	Marked bool
	InDegree int
}

func findOrder(numCourses int, prerequisites [][]int) []int {
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

func TestTmp(t *testing.T) {
	// t.Log(findOrder(4, [][]int{[]int{1, 0},[]int{2, 0},[]int{3, 1},[]int{3, 2}}))
	// t.Log(findOrder(4, [][]int{[]int{1, 0},[]int{3, 0},[]int{2, 1},[]int{3, 2}}))
	// t.Log(findOrder(4, [][]int{[]int{1, 0},[]int{3, 0},[]int{2, 1}}))
	// t.Log(findOrder(2, [][]int{[]int{1, 0}}))
	// t.Log(findOrder(2, [][]int{[]int{0, 1}}))

	// store to byte array
	strs := []string{"foo", "bar"}
	buf := &bytes.Buffer{}
	gob.NewEncoder(buf).Encode(strs)
	bs := buf.Bytes()
	fmt.Printf("%q", bs)

	// Decode it back
	strs2 := []string{}
	gob.NewDecoder(buf).Decode(&strs2)
	fmt.Printf("%v", strs2)
}
