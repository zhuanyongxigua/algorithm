package longest_increasing_path_in_a_matrix_test

import (
	"fmt"
	"testing"
)

// const MaxUint = ^uint(0)
// const MinUint = 0
// const MaxInt = int(MaxUint >> 1)
// const MinInt = -MaxInt - 1

// dfs
func longestIncreasingPath(matrix [][]int) int {
	ans := 1
	visited := make([][]int, len(matrix))
	for i := range visited {
		visited[i] = make([]int, len(matrix[0]))
	}
	var dfs func(coord []int) int
	dfs = func(coord []int) int {
		if visited[coord[0]][coord[1]] != 0 {
			return visited[coord[0]][coord[1]]
		}
		tmp := 1
		if coord[0] - 1 >= 0 && matrix[coord[0] - 1][coord[1]] > matrix[coord[0]][coord[1]] {
			curTmp := 1
			curTmp += dfs([]int{coord[0] - 1, coord[1]})
			visited[coord[0] - 1][coord[1]] = curTmp - 1
			if curTmp > tmp {
				tmp = curTmp
			}
		}
		if coord[0] + 1 < len(matrix) && matrix[coord[0] + 1][coord[1]] > matrix[coord[0]][coord[1]] {
			curTmp := 1
			curTmp += dfs([]int{coord[0] + 1, coord[1]})
			visited[coord[0] + 1][coord[1]] = curTmp - 1
			if curTmp > tmp {
				tmp = curTmp
			}
		}
		if coord[1] - 1 >= 0 && matrix[coord[0]][coord[1] - 1] > matrix[coord[0]][coord[1]] {
			curTmp := 1
			curTmp += dfs([]int{coord[0], coord[1] - 1})
			visited[coord[0]][coord[1] - 1] = curTmp - 1
			if curTmp > tmp {
				tmp = curTmp
			}
		}
		if coord[1] + 1 < len(matrix[0]) && matrix[coord[0]][coord[1] + 1] > matrix[coord[0]][coord[1]] {
			curTmp := 1
			curTmp += dfs([]int{coord[0], coord[1] + 1})
			visited[coord[0]][coord[1] + 1] = curTmp - 1
			if curTmp > tmp {
				tmp = curTmp
			}
		}
		return tmp
	}
	for row, list := range matrix {
		for col := range list {
			if visited[row][col] != 0 {
				continue
			}
			tmp := dfs([]int{row, col})
			visited[row][col] = tmp
			if tmp > ans {
				ans = tmp
			}
		}
	}
	return ans
}

type QueueItem struct {
	Coord []int
	Depth int
	// StartCoord []int
}

// bfs
func longestIncreasingPath2(matrix [][]int) int {
	ans := 1
	deg := make([][]int, len(matrix))
	queue := []QueueItem{}
	for i := range deg {
		deg[i] = make([]int, len(matrix[0]))
	}
	//             U  L  R  D
	dirX := []int{-1, 0, 0, 1}
	dirY := []int{0, -1, 1, 0}
	for row, list := range matrix {
		for col := range list {
			for i := 0; i < 4; i++ {
				dx := row + dirX[i]
				dy := col + dirY[i]
				if dx >= 0 && dy >= 0 && dx < len(matrix) && dy < len(matrix[0]) && matrix[dx][dy] < matrix[row][col] {
					deg[row][col]++
				}
			}
			if deg[row][col] == 0 {
				queue = append(queue, QueueItem{[]int{row, col}, 1})
			}
		}
	}
	fmt.Printf("queue: %v\n", queue)
	fmt.Println()
	for len(queue) != 0 {
		cur	:= queue[0]
		if cur.Depth > ans {
			ans = cur.Depth
		}
		fmt.Printf("cur: %v\n", cur)
		coord := cur.Coord
		queue = queue[1:]
		for i := 0; i < 4; i++ {
			dx := coord[0] + dirX[i]
			dy := coord[1] + dirY[i]
			if dx >= 0 && dy >= 0 && dx < len(matrix) && dy < len(matrix[0]) && matrix[dx][dy] > matrix[coord[0]][coord[1]] {
				deg[dx][dy]--
				fmt.Printf("dx: %v; dy: %v\n", dx, dy)
				if deg[dx][dy] == 0 {
					queue = append(queue, QueueItem{[]int{dx, dy}, cur.Depth + 1})
				}
			}
		}
		fmt.Printf("cur ans: %v\n", ans)
		fmt.Println()
	}
	return ans
}

func TestLongestIncreasingPathInAMatrix(t *testing.T) {
	// [[9,9,4],[6,6,8],[2,1,1]]
	// result := longestIncreasingPath2([][]int{[]int{9, 9, 4}, []int{6, 6, 8}, []int{2, 1, 1}})
	// [[7,7,5],[2,4,6],[8,2,0]]
	// result := longestIncreasingPath2([][]int{[]int{7,7,5}, []int{2,4,6}, []int{8,2,0}})
	// [[9,17,3,5,2,19],[19,13,7,9,7,12],[5,18,14,19,9,15],[11,17,5,0,10,18],[17,3,9,4,2,0],[5,10,5,13,4,10]]
	result := longestIncreasingPath2([][]int{[]int{9,17,3,5,2,19}, []int{19,13,7,9,7,12}, []int{5,18,14,19,9,15}, []int{11,17,5,0,10,18}, []int{17,3,9,4,2,0}, []int{5,10,5,13,4,10}})
	t.Log(result)
}