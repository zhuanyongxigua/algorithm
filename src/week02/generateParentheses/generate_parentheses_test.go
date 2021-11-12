package generate_parentheses_test

import (
	"testing"
)

func generateParenthesis2(n int) []string {
	if n == 0 {
		return []string{}
	}
	stack := []string{")"}
	ans := []string{}
	var r func(n int, cur string)
	r = func(n int, cur string) {
		if n == 0 {
			for _, item := range stack {
				cur += item
			}
			ans = append(ans, cur)
			return
		}
		stack = append(stack, ")")
		r(n - 1, cur + "(")
		stack = stack[1:]
		if len(stack) == 0 {
			return
		}
		stack = stack[1:]
		r(n, cur + ")")
		stack = append(stack, ")")
	}
	r(n - 1, "(")
	return ans
}

func generateParenthesis(n int) []string {
	if n == 0 {
		return []string{}
	}
	dedupMap := make(map[int][]string)
	var r func(m int) []string
	r = func(m int) []string {
		if m == 0 {
			return []string{""}
		}
		if _, ok := dedupMap[m]; ok {
			return dedupMap[m]
		}
		ans := []string{}
		for k := 1; k <= m; k++ {
			result_a := r(k - 1)
			result_b := r(m - k)
			for _, item_a := range result_a {
				for _, item_b := range result_b {
					ans = append(ans, "(" + item_a + ")" + item_b)
				}
			}
		}
		dedupMap[m] = ans
		return ans
	}
	result := r(n)
	return result
}

func TestGenerateParentheses(t *testing.T) {
	result := generateParenthesis(4)
	t.Log(result)
}
