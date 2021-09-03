package number_of_longest_increasing_subsequence_test

import "testing"

func findNumberOfLIS(nums []int) int {
	if len(nums) == 0 { return 0 }
	n, maxLen := len(nums), 1
	length, count := make([]int, n), make([]int, n)
	for i := range length { length[i], count[i] = 1, 1 }
	for i := 1; i < n; i++ {
			for j := 0; j < i; j++ {
					if nums[i] > nums[j] {
							if length[j] + 1 > length[i] {
									length[i] = length[j] + 1
									count[i] = count[j]
							} else if length[j] + 1 == length[i] {
									count[i] += count[j]
							}
					}
			}
			if length[i] > maxLen { maxLen = length[i] }
	}
	ans := 0
	for i := 0; i < n; i++ {
			if length[i] == maxLen {
					ans += count[i]
			}
	}
	return ans
}

func TestNumberOfLongestIncreasingSubsequenceTest(t *testing.T) {

}