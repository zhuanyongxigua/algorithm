package subsets_test

import (
	"testing"
)

func subsets2(nums []int) [][]int {
	ans := [][]int{}
	var findSubsets func(have, rest []int)
	findSubsets = func (have, rest []int) {
		if len(rest) == 0 {
			return
		}
		tmp := append(have, rest[0])
		ans = append(ans, tmp)
		copyTmp := make([]int, len(tmp))
		copy(copyTmp, tmp)
		findSubsets(copyTmp, rest[1:])
		findSubsets(have, rest[1:])
	}
	ans = append(ans, []int{})
	ans = append(ans, []int{nums[0]})
	findSubsets([]int{}, nums[1:])
	findSubsets([]int{nums[0]}, nums[1:])
	return ans
}

func subsets3(nums []int) [][]int {
	var s []int
	var ans [][]int
	var findSubsets func(index int)
	findSubsets = func(index int) {
		if index == len(nums) {
			ans = append(ans, make([]int, 0))
			for _, i := range s {
				ans[len(ans) - 1] = append(ans[len(ans) - 1], i)
			}
			return
		}
		findSubsets(index + 1)
		s = append(s, nums[index])
		findSubsets(index + 1)
		s = s[:len(s) - 1]
	}
	findSubsets(0)
	return ans
}

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