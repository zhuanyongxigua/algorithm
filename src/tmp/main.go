package main

import "fmt"

type Edge struct {
	D       []int
	Visited bool
}

func main() {
	var N, T int
	fmt.Scan(&N, &T)
	policy := [][]int{{N, T}}
	for i := 0; i < N; i++ {
		var myA, myF, oppA, oppF int
		fmt.Scan(&myA, &myF, &oppA, &oppF)
		policy = append(policy, []int{myA, myF, oppA, oppF})
	}
	score := 0
	totalT := T
	edges := []*Edge{}
	for i := 1; i < len(policy); i++ {
		edges = append(edges, &Edge{
			[]int{i, 0},
			false,
		})
		edges = append(edges, &Edge{
			[]int{i, 1},
			false,
		})
	}
	var dfs func(edge *Edge, acc int, routine int)
	dfs = func(edge *Edge, acc int, routine int) {
		edge.Visited = true
		curRow := edge.D[0]
		var isAttack bool
		if edge.D[1] == 0 {
			isAttack = true
		} else {
			isAttack = false
		}
		routine += policy[curRow][edge.D[1]]
		if isAttack {
			fmt.Printf("curRow: %v\n", curRow)
			fmt.Printf("edge.D[0]: %v\n", edge.D[0])
			if policy[curRow][edge.D[1]] != -1 {
				if policy[curRow][3] != -1 {
					if policy[curRow][3] > routine {
						acc += policy[curRow][3] - routine
					}
				} else {
					acc += totalT - routine
				}
			}
		} else {
			if policy[curRow][edge.D[1]] == -1 {
				acc = acc - (totalT - policy[curRow][2])
			} else {
				if policy[curRow][2] != -1 && routine > policy[curRow][2] {
					acc = acc - (routine - policy[curRow][2])
				}
			}
		}
		isButtom := true
		for _, nextEdge := range edges {
			if !nextEdge.Visited {
				dfs(nextEdge, acc, routine)
				isButtom = false
			}
		}
		if acc > score && isButtom {
			score = acc
		}
		edge.Visited = false
	}
	for _, edge := range edges {
		dfs(edge, 0, 0)
	}
	fmt.Println(score)
}
