package subsets_test

import "testing"

type Subsets struct {
	answers [][]int
	set []int
}

func (this *Subsets) findSubsets(s []int, index int) {
	if index == len(s) {
		set := make([]int, len(this.set))
		copy(set, this.set)
		this.answers = append(this.answers, set)
		return
	}
	this.findSubsets(s, index + 1)
	this.set = append(this.set, s[index])
	this.findSubsets(s, index + 1)
	this.set = this.set[0:len(this.set) - 1]
}

func subsets(s []int)[][]int {
	var answers [][]int
	var set []int
	subsets := Subsets{answers, set}
	subsets.findSubsets(s, 0)
	return subsets.answers
}

func TestSubsets(t *testing.T) {
	nums := []int{1, 2, 3}
	result := subsets(nums)
	t.Log(result)
}