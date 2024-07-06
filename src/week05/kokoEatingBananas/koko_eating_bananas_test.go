package koko_eating_bananas_test

import "testing"

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

func isFeasible(piles []int, k int, h int) bool {
	numHours := 0
	for i := 0; i < len(piles); i++ {
		count := piles[i] / k
		if piles[i]%k != 0 {
			count++
		}
		numHours += count
	}
	return numHours <= h
}

func minEatingSpeed(piles []int, h int) int {
	minK := 1
	maxK := 0
	for i := 0; i < len(piles); i++ {
		maxK = max(maxK, piles[i])
	}
	res := 1
	for minK <= maxK {
		mid := (maxK + minK + 1) / 2

		if isFeasible(piles, mid, h) {
			res = mid
			maxK = mid - 1
		} else {
			minK = mid + 1
		}
	}
	return res
}

func TestKokoEatingBananas(t *testing.T) {

}
