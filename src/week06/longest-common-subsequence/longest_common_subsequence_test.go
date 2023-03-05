package longest_common_subsequence_test

import (
	"testing"
)

func max(val1, val2 int) int {
	if val1 > val2 {
		return val1
	}
	return val2
}

func longestCommonSubsequence(text1 string, text2 string) int {
	ans := make([]int, max(len(text1), len(text2)))
	for i := range ans {
		ans[i] = 0
	}
	for index1 := 0; index1 < len(text1); index1++ {
		for index2 := 0; index2 < len(text2); index2++ {
		}
	}
	return ans[len(ans) - 1]
}

func TestLongestCommonSubsequence(t *testing.T) {
	// r1 := longestCommonSubsequence("abcde", "ace")
	// t.Log("r1: ", r1)

	// r2 := longestCommonSubsequence("abc", "abc")
	// t.Log("r2: ", r2)

	// r3 := longestCommonSubsequence("abc", "def")
	// t.Log("r3: ", r3)

	// r4 := longestCommonSubsequence("abacde", "ace")
	// t.Log("r4: ", r4)

	r5 := longestCommonSubsequence("oxcpqrsvwf", "shmtulqrypy")
	t.Log("r5: ", r5)
}
