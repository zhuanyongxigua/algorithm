package numberofprovinces_test

// 547.省份数量

import "testing"

type DisJointSet struct {
	Fa []int
}

func Constructor(isConnected [][]int) *DisJointSet {
	disJointSet := &DisJointSet{Fa: make([]int, len(isConnected))}
	for i := range isConnected {
		disJointSet.Fa[i] = i
	}
	for i := range isConnected {
		for j := i + 1; j < len(isConnected); j++ {
			if isConnected[i][j] != 0 {
				disJointSet.unionSet(i, j)
			}
		}
	}
	return disJointSet
}

func (d *DisJointSet) Find(x int) int {
	if d.Fa[x] == x {
		return x
	}
	d.Fa[x] = d.Find(d.Fa[x])
	return d.Fa[x]
}

func (d *DisJointSet) unionSet(i, j int) {
	iFa, jFa := d.Find(i), d.Find(j)
	if iFa != jFa {
		d.Fa[iFa] = jFa
	}
}

func findCircleNum(isConnected [][]int) int {
	ans := 0
	temp := Constructor(isConnected)
	for i, v := range temp.Fa {
		if i == v {
			ans++
		}
	}
	return ans
}

func TestFindCircleNum(t *testing.T) {
	// result := findCircleNum([][]int{[]int{1, 1, 0}, []int{1, 1, 0}, []int{0, 0, 1}}) // 2
	// result := findCircleNum([][]int{[]int{1, 0, 0}, []int{0, 1, 0}, []int{0, 0, 1}}) // 3
	result := findCircleNum([][]int{
		{1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0},
		{0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
		{0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
		{0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0},
		{0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
		{0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
		{0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0},
		{0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0},
		{0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0},
		{1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0},
		{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0},
		{0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0},
		{0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
		{0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
		{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
	}) // 8
	t.Log(result)
}
