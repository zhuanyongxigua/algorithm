package number_of_islands_test

import (
	"testing"
)

// dfs
func numIslands(grid [][]byte) int {
	curIsland := 1
	var r func(x, y int)
	r = func(x, y int) {
		grid[x][y]--
		if x + 1 < len(grid) && grid[x + 1][y] == '1' {
			r(x + 1, y)
		}
		if x - 1 >= 0 && grid[x - 1][y] == '1' {
			r(x - 1, y)
		}
		if y + 1 < len(grid[0]) && grid[x][y + 1] == '1' {
			r(x, y + 1)
		}
		if y - 1 >= 0 && grid[x][y - 1] == '1' {
			r(x, y - 1)
		}
	}
	for row, list := range grid {
		for col, item := range list {
			if item == '1' {
				curIsland++
				r(row, col)
			}
		}
	}
	return curIsland - 1
}

// bfs
func numIslands2(grid [][]byte) int {
	queue := [][]int{}
	ans := 0
	for row, list := range grid {
		for col, item := range list {
			if item == '1' {
				grid[row][col]--
				queue = append(queue, []int{row, col})
				for len(queue) != 0 {
					cur := queue[0]
					x := cur[0]
					y := cur[1]
					queue = queue[1:]
					if x + 1 < len(grid) && grid[x + 1][y] == '1' {
						grid[x + 1][y]--
						queue = append(queue, []int{x + 1, y})
					}
					if x - 1 >= 0 && grid[x - 1][y] == '1' {
						grid[x - 1][y]--
						queue = append(queue, []int{x - 1, y})
					}
					if y + 1 < len(grid[0]) && grid[x][y + 1] == '1' {
						grid[x][y + 1]--
						queue = append(queue, []int{x, y + 1})
					}
					if y - 1 >= 0 && grid[x][y - 1] == '1' {
						grid[x][y - 1]--
						queue = append(queue, []int{x, y - 1})
					}
				}
				ans++
			}
		}
	}
	return ans
}

func TestNumberOfIslands(t *testing.T) {
	result := numIslands([][]byte{
		[]byte{'1', '1', '1', '1', '0'},
		[]byte{'1', '1', '0', '1', '0'},
		[]byte{'1', '1', '0', '0', '0'},
		[]byte{'0', '0', '0', '0', '0'},
	})
	// result := numIslands2([][]byte{
	// 	[]byte{'1', '1', '1'},
	// 	[]byte{'0', '1', '0'},
	// 	[]byte{'1', '1', '1'},
	// })
	t.Log(result)
}