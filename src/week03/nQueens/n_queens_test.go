package n_queens_test

import (
	"testing"
)

func solveNQueens(n int) [][]string {
	ans := [][]string{}
	ansInt := [][]int{}
	tmpAns := make([]int, n)
	var dfs func(row int)
	dfs = func(row int) {
		if row > n {
			tmp := make([]int, n)
			copy(tmp, tmpAns)
			ansInt = append(ansInt, tmp)
			return
		}
		ColLoop:
			for j := 1; j <= n; j++ {
				for tmpAnsItemRow, tmpAnsItem := range tmpAns {
					if tmpAnsItem != 0 {
						if j == tmpAnsItem || j - row == tmpAnsItem - tmpAnsItemRow - 1 || j + row == tmpAnsItem + tmpAnsItemRow + 1 {
							continue ColLoop
						}
					}
				}
				tmpAns[row - 1] = j
				dfs(row + 1)
				tmpAns[row - 1] = 0
			}
	}
	for i := 1; i <= n; i++ {
		tmpAns[0] = i
		dfs(2)
		tmpAns[0] = 0
	}
	for _, ansIntItem := range ansInt {
		tmp := make([]string, n)
		for index, point := range ansIntItem {
			tmpStr := ""
			for i := 0; i < n; i++ {
				if i + 1 == point {
					tmpStr += "Q"
				} else {
					tmpStr += "."
				}
			}
			tmp[index] = tmpStr
		}
		ans = append(ans, tmp)
	}
	return ans
}

func TestNQueens(t *testing.T) {
	result := solveNQueens(4)
	t.Log(result)
}