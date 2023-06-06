package longest_common_subsequence_test

import (
	"testing"
)

func longestCommonSubsequence(text1 string, text2 string) int {
	ans := 0
	resultCache := make([][]int, len(text1) + 1)
	for i := range resultCache {
		resultCache[i] = make([]int, len(text2) + 1)
	}
	for index1 := 1; index1 < len(text1) + 1; index1++ {
		for index2 := 1; index2 < len(text2) + 1; index2++ {
			if text1[index1 - 1] == text2[index2 - 1] {
				resultCache[index1][index2] = resultCache[index1 - 1][index2 - 1] + 1
				if resultCache[index1][index2] > ans {
					ans = resultCache[index1][index2]
				}
			} else {
				if resultCache[index1 - 1][index2] > resultCache[index1][index2 - 1] {
					resultCache[index1][index2] = resultCache[index1-1][index2]
				} else {
					resultCache[index1][index2] = resultCache[index1][index2-1]
				}
			}
		}
	}
	return ans
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

	// r5 := longestCommonSubsequence("oxcpqrsvwf", "shmtulqrypy")
	// t.Log("r5: ", r5)

	// r6 := longestCommonSubsequence("accacbccd", "acbccd")
	// t.Log("r6: ", r6)

	// r7 := longestCommonSubsequence("acbccd", "bccdacd")
	// t.Log("r7: ", r7)

	r8 := longestCommonSubsequence("ezupkr", "ubmrapg")
	t.Log("r8: ", r8)
}
