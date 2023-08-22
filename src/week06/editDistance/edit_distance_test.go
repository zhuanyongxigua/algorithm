package editdistance_test

import "testing"

func min(a int, b int) int {
	if a > b {
		return b
	}
	return a
}

func minDistance(word1 string, word2 string) int {
	if word1 == "" {
		return len(word2)
	}
	if word2 == "" {
		return len(word1)
	}
	temp := make([][]int, len(word1) + 1)
	temp[0] = make([]int, len(word2) + 1)

	for i := range temp {
		temp[i] = make([]int, len(word2) + 1)
	}
	for i := 0; i <= len(word1); i++ {
		temp[i][0] = i
	}
	for j := 0; j <= len(word2); j++ {
		temp[0][j] = j
	}
	for i := 1; i <= len(word1); i++ {
		for j := 1; j <= len(word2); j++ {
			isEq := word1[i - 1] == word2[j - 1]
			var isResult int
			if isEq {
				isResult = 0
			} else {
				isResult = 1
			}
			temp[i][j] = min(min(temp[i - 1][j] + 1, temp[i][j - 1] + 1), temp[i - 1][j - 1] + isResult)
		}
	}
	return temp[len(word1)][len(word2)]
}

func TestEditDistance(t *testing.T) {
	// result := minDistance("horse", "ros")
	result := minDistance("intention", "execution")
	// result := minDistance("a", "ab")
	t.Log(result)
}

