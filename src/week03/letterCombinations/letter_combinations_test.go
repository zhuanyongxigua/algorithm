package letter_combinations_test

import (
	"strconv"
	"testing"
)

func letterCombinations(digits string) []string {
	if digits == "" {
		return []string{}
	}
	ans := []string{}
	edges := []string{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
	tmp := ""
	var dfs func(index int)
	dfs = func(index int) {
		if index >= len(digits) {
			ans = append(ans, tmp)
			return
		}
		edgeIdxInt, _ := strconv.Atoi(string(digits[index]))
		for _, s := range edges[edgeIdxInt] {
			sStr := string(s)
			tmp += sStr
			dfs(index + 1)
			tmp = tmp[:len(tmp) - 1]
		}
	}
	dfs(0)
	return ans
}

func TestLetterCombinations(t *testing.T) {
	// Input: digits = "23"
	// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
	// result := letterCombinations("23")
	result := letterCombinations("234")
	t.Log(result)
}