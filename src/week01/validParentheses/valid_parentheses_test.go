package validparentheses_test

import "testing"

func isValid(s string) bool {
	if len(s)%2 == 1 {
		return false
	}
	stack := make([]rune, 0, len(s))
	for _, char := range s {
		if char == '{' || char == '(' || char == '[' {
			stack = append(stack, char)
		} else {
			if len(stack) == 0 {
				return false
			}
			cur := stack[len(stack)-1]
			if (cur == '{' && char == '}') || (cur == '(' && char == ')') || (cur == '[' && char == ']') {
				stack = stack[0 : len(stack)-1]
			} else {
				return false
			}
		}
	}
	if len(stack) != 0 {
		return false
	}
	return true
}

func TestIsValid(t *testing.T) {
	testCases := []struct {
		s    string
		want bool
	}{
		{
			s:    "((",
			want: false,
		},
		{
			s:    "[",
			want: false,
		},
		{
			s:    "()",
			want: true,
		},
		{
			s:    "()[]{}",
			want: true,
		},
		{
			s:    "(]",
			want: false,
		},
	}

	for _, tc := range testCases {
		got := isValid(tc.s)
		if got != tc.want {
			t.Errorf("isValid(%q) = %v; want %v", tc.s, got, tc.want)
		}
	}
}
