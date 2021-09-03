package two_sum_ii_input_array_is_sorted_test

import "testing"

func twoSum(numbers []int, target int) []int {
	first := 0
	second := len(numbers) - 1
	for first < len(numbers) {
		for j := second; j > first; j-- {
			if numbers[first] + numbers[j] == target {
				return []int{first + 1, j + 1}
			}
			if numbers[first] + numbers[j] < target {
				first++
				second = j
				break
			}
		}
	}
	return []int{-1, -1}
}

func TestTwoSum(t *testing.T) {

}