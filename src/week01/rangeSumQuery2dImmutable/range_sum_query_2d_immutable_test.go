package range_sum_query_2d_immutable_test

import (
	"testing"
)

type NumMatrix struct {
	Prefix [][]int
}

func Constructor(origin [][]int) NumMatrix {
	result := NumMatrix{}
	result.Prefix = make([][]int, len(origin) + 1)
	rowLength := len(origin[0]) + 1
	result.Prefix[0] = make([]int, rowLength)
	for i := 1; i <= len(origin); i++ {
		result.Prefix[i] = make([]int, rowLength)
		for j := 1; j < rowLength; j++ {
			result.Prefix[i][j] = result.Prefix[i - 1][j] + result.Prefix[i][j - 1] - result.Prefix[i - 1][j - 1] + origin[i - 1][j - 1]
		}
	}
	return result
}

func (this *NumMatrix) SumRegion(row1 int, col1 int, row2 int, col2 int) int {
	return this.Prefix[row2 + 1][col2 + 1] - this.Prefix[row1][col2 + 1] - this.Prefix[row2 + 1][col1] + this.Prefix[row1][col1]
}

func Test2DSum(t *testing.T) {
	ans := Constructor([][]int{[]int{-4, -5}})
	t.Log(ans.SumRegion(0, 0, 0, 0))
	t.Log(ans.SumRegion(0, 0, 0, 1))
	t.Log(ans.SumRegion(0, 1, 0, 1))
}
