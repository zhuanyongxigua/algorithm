package generate_parentheses_test

import (
	"testing"
)

func generateParenthesis(n int) []string {
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

func TestGenerateParentheses(t *testing.T) {
	result := generateParenthesis(4)
	t.Log(result)
}
