package surroundedregions_test

// 130.被围绕的区域

import (
	"testing"
)

var dx = []int{-1, 0, 0, 1}
var dy = []int{0, -1, 1, 0}

func solve(board [][]byte) {
	m := len(board)
	n := len(board[0])
	disJointSet := DisJointSet{Fa: make([]int, m*n+1)}
	for i := range disJointSet.Fa {
		disJointSet.Fa[i] = i
	}
	for i, row := range board {
		for j, col := range row {
			if col == 'X' {
				continue
			}
			for k := 0; k < 4; k++ {
				ni := i + dx[k]
				nj := j + dy[k]
				if ni < 0 || nj < 0 || ni >= m || nj >= n {
					if col == 'O' {
						disJointSet.unionSet(i*n+j, m*n)
					}
				} else if board[ni][nj] == 'O' {
					disJointSet.unionSet(i*n+j, ni*n+nj)
				}
			}
		}
	}
	for i, row := range board {
		for j, col := range row {
			if col == 'O' {
				fa := disJointSet.find(i*n + j)
				lastPointFa := disJointSet.find(m * n)
				if fa != lastPointFa {
					board[i][j] = 'X'
				}
			}
		}
	}
}

type DisJointSet struct {
	Fa []int
}

func (d *DisJointSet) find(x int) int {
	if d.Fa[x] == x {
		return x
	}
	d.Fa[x] = d.find(d.Fa[x])
	return d.Fa[x]
}

func (d *DisJointSet) unionSet(x, y int) {
	xFa, yFa := d.find(x), d.find(y)
	if xFa != yFa {
		d.Fa[xFa] = yFa
	}
}

func TestSolve(t *testing.T) {
	board := [][]byte{
		{'X', 'X', 'X', 'X'},
		{'X', 'O', 'O', 'X'},
		{'X', 'X', 'O', 'X'},
		{'X', 'O', 'X', 'X'},
	} // [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
	solve(board)
	// board := [][]byte{{'X'}} // [["X"]]
	t.Log(board)

}
