package minimum_genetic_mutation_test

import (
	"fmt"
	"testing"
)

const MaxUint = ^uint(0) 
const MaxInt = int(MaxUint >> 1) 

// dfs
func minMutation(start string, end string, bank []string) int {
	ans := MaxInt
	letterList := []string{"A", "C", "G", "T"}
	bankMap := make(map[string]int)
	for i, b := range bank {
		bankMap[b] = i
	}
	var dfs func(curStr string, faIndex int, dep int)
	dfs = func(curStr string, faIndex int, dep int) {
		if _, ok := bankMap[curStr]; !ok || dep > len(bank) {
			return
		}
		curIndex := bankMap[curStr]
		if curIndex == faIndex {
			return
		}
		if curStr == end && dep < ans {
			ans = dep
			return
		}
		for i := 0; i < 8; i++ {
			for _, letter := range letterList {
				if string(curStr[i]) == letter {
					continue
				}
				nextStr := string(curStr[:i]) + letter + string(curStr[i+1:])
				dfs(nextStr, curIndex, dep + 1)
			}
		}
	}
	for i := 0; i < 8; i++ {
		for _, letter := range letterList {
			if string(start[i]) == letter {
				continue
			}
			nextStr := string(start[:i]) + letter + string(start[i+1:])
			dfs(nextStr, -1, 1)
		}
	}
	if ans == MaxInt {
		return -1
	}
	return ans
}

func minMutation2(start string, end string, bank []string) int {
	if len(bank) == 0 {
		return -1
	}
	ans := -1
	queue := []string{start}
	letterList := []string{"A", "C", "G", "T"}
	bankMap := make(map[string]int)
	depth := make(map[string]int)
	depth[start] = 0
	for i, b := range bank {
		bankMap[b] = i
	}
	fmt.Printf("end: %v\n", end)
	for len(queue) != 0 {
		fmt.Printf("queue: %v\n", queue)
		cur := queue[0]
		fmt.Printf("cur: %v; cur dep: %v\n", cur, depth[cur])
		if cur == end {
			fmt.Printf("Bingo")
			ans = depth[cur]
			break
		}
		if depth[cur] > len(bank) {
			return -1
		}
		queue = queue[1:]
		for i := 0; i < 8; i++ {
			for _, letter := range letterList {
				if string(cur[i]) == letter {
					continue
				}
				nextStr := string(cur[:i]) + letter + string(cur[i+1:])
				if _, ok := bankMap[nextStr]; ok {
					queue = append(queue, nextStr)
					depth[nextStr] = depth[cur] + 1
				}
			}
		}
	}
	return ans
}

func TestMinimumGeneticMutation(t *testing.T) {
	// 	"AACCGGTT"
	// "AAACGGTA"
	// ["AACCGATT","AACCGATA","AAACGATA","AAACGGTA"]

	// bank := []string{"AACCGATT","AACCGATA","AAACGATA","AAACGGTA"}
	// result := minMutation("AACCGGTT", "AAACGGTA", bank)

	//"AACCGGTT"
	// "AACCGGTA"
	// ["AACCGGTA"]
	// bank := []string{"AACCGGTA"}
	// result := minMutation2("AACCGGTT", "AACCGGTA", bank)

	// 	"AACCGGTT"
	// "AACCGGTA"
	// []

	// 	"AACCTTGG"
	// "AATTCCGG"
	// ["AATTCCGG","AACCTGGG","AACCCCGG","AACCTACC"]
	bank := []string{"AATTCCGG","AACCTGGG","AACCCCGG","AACCTACC"}
	result := minMutation2("AACCTTGG", "AATTCCGG", bank)
	t.Log(result)
}