package numberofprovinces_test

// 8.字符串转换整数 (atoi)

import (
	"testing"
)

func myAtoi(s string) int {
	index := 0
	max := 2147483647
	min := -2147483648
	for index < len(s) && s[index] == ' ' {
		index++
	}
	sign := 1
	if index < len(s) && (s[index] == '+' || s[index] == '-') {
		if s[index] == '-' {
			sign = -1
		}
		index++
	}
	val := 0
	for index < len(s) && (s[index] >= '0' && s[index] <= '9') {
		if val > (max-int(s[index]-'0'))/10 {
			if sign == -1 {
				return min
			} else {
				return max
			}
		}
		val = val*10 + int(s[index]-'0')
		index++
	}
	return sign * val
}

func TestMyAtoi(t *testing.T) {
	// result := myAtoi("42")
	result := myAtoi("21474836460")
	// result := myAtoi("        -42")
	// result := myAtoi("493 with words")
	t.Log(result)
}
