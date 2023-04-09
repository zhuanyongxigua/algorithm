package letter_combinations_of_a_phone_number_test

import (
	"strconv"
	"testing"
)

func letterCombinations(digits string) []string {
	if digits == "" {
		return []string{}
	}
	edges := []string{"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
	ans := []string{}
	s := ""
	var dfs func(i int)
	dfs = func(i int) {
		if len(s) == len(digits) {
			ans = append(ans, s)
			return
		}
		num, _ := strconv.Atoi(string(digits[i]))
		for _, char := range edges[num - 2] {
			s = s + string(char)
			dfs(i + 1)
			s = s[:len(s) - 1]
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
	// result := letterCombinations("")
	t.Log(result)
}