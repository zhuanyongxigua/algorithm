package online_election_test

import (
	"sort"
	"testing"
)

type TopVotedCandidate struct {
	list [][2]int
}

func Constructor(persons []int, times []int) TopVotedCandidate {
	list := [][2]int{}
	dict := make(map[int]int)
	winner := -1
	for i, v := range persons {
			if winner == -1 || v == winner {
					winner = v
					dict[winner]++
			} else {
					dict[v]++
					if dict[v] >= dict[winner] {
							winner = v
					}
			}
			list = append(list, [2]int{times[i], winner})
	}
	return TopVotedCandidate{list: list}
}


func (this *TopVotedCandidate) Q(t int) int {
	index := sort.Search(len(this.list), func(i int) bool {
			return (this.list)[i][0] > t
	})
	return (this.list)[index - 1][1]
}

func TestOnlineElection(t *testing.T) {}