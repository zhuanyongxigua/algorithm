package evaluatereversepolishnotation_test

import (
	"strconv"
	"testing"
)

func evalRPN(tokens []string) int {
	if len(tokens) == 1 {
		re, _ := strconv.Atoi(tokens[0])
		return re
	}
	ans := 0
	stack := []string{}
	for i := 0; i < len(tokens); i++ {
		if tokens[i] == "+" || tokens[i] == "-" || tokens[i] == "*" || tokens[i] == "/" {
			right, _ := strconv.Atoi(stack[len(stack)-1])
			left, _ := strconv.Atoi(stack[len(stack)-2])
			if tokens[i] == "+" {
				ans = left + right
			} else if tokens[i] == "-" {
				ans = left - right
			} else if tokens[i] == "*" {
				ans = left * right
			} else {
				ans = left / right
			}
			stack = stack[0 : len(stack)-2]
			stack = append(stack, strconv.Itoa(ans))
		} else {
			stack = append(stack, tokens[i])
		}
	}
	return ans
}

func TestEvalRPN(t *testing.T) {
	testCases := []struct {
		tokens []string
		want   int
	}{
		{
			tokens: []string{"2", "1", "+", "3", "*"},
			want:   9,
		},
		{
			tokens: []string{"4", "13", "5", "/", "+"},
			want:   6,
		},
		{
			tokens: []string{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"},
			want:   22,
		},
	}

	for _, tc := range testCases {
		got := evalRPN(tc.tokens)
		if got != tc.want {
			t.Errorf("evalRPN(%v) = %v; want %v", tc.tokens, got, tc.want)
		}
	}
}
