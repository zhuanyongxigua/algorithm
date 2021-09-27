package combinations_test

import (
	"testing"
)

// 4ms, you kidding me?
func combine3(n int, k int) [][]int {
	ans := [][]int{}
	s := []int{}

	var findSubsets func(index int)
	findSubsets = func(index int) {
		// If current length of s is greater than k
		// or current rest items plus current items in s is less k
		// It means we don't have enough items to build s
		if len(s) > k || len(s) + (n - index + 1) < k {
			return
		}
		if index == n + 1 {
			tmp := make([]int, k)
			copy(tmp, s)
			ans = append(ans, tmp)
			return
		}
		findSubsets(index + 1)
		s = append(s, index)
		findSubsets(index + 1)
		s = s[:len(s) - 1]
	}
	findSubsets(1)
	return ans
}

// 12ms
func combine2(n int, k int) [][]int {
	ans := [][]int{}
	set := []int{}
	var findSubsets func(index int)
	findSubsets = func(index int) {
		if index == n + 1 {
			if len(set) == k {
				tmp := make([]int, len(set))
				copy(tmp, set)
				ans = append(ans, tmp)
			}
			return
		}

		findSubsets(index + 1)
		set = append(set, index)
		findSubsets(index + 1)
		set = set[:len(set)-1]
	}
	findSubsets(1)
	return ans
}

// 100ms
func combine(n int, k int) [][]int {
	ans := [][]int{}
	all := []int{}
	for i := 1; i <= n; i++ {
		all = append(all, i)
	}
	var combineRecursion func(have, rest []int)
	combineRecursion = func(have, rest []int) {
		if len(rest) == 0 {
			return
		}
		tmp := append(have, rest[0])
		if len(tmp) == k {
			ans = append(ans, tmp)
		}
		copyTmp := make([]int, len(tmp))
		copy(copyTmp, tmp)
		combineRecursion(copyTmp, rest[1:])
		combineRecursion(have, rest[1:])
	}
	if k == 0 {
		ans = append(ans, []int{})
	}
	if k == 1 {
		ans = append(ans, []int{1})
	}
	combineRecursion([]int{}, all[1:])
	combineRecursion([]int{1}, all[1:])
	return ans
}

func combine4(n int, k int) [][]int {
	ans := [][]int{}
	set := []int{}
	var combineRecursion func(index int)
	combineRecursion = func(index int) {
		if index > n {
			return
		}
		combineRecursion(index + 1)
		set = append(set, index)
		if len(set) == k {
			tmp := make([]int, len(set))
			copy(tmp, set)
			ans = append(ans, tmp)
		}
		combineRecursion(index + 1)
		set = set[:len(set) - 1]
	}
	combineRecursion(1)
	return ans
}

func TestCombinations(t *testing.T) {
	result := combine4(4, 2)
	t.Log(result)
}