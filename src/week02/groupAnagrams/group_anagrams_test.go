package group_anagrams_test

import "testing"

func groupAnagrams(strs []string) [][]string {
	set := readSet(strs)

	resultMap := make(map[[26]int][]string)

	for _, ele := range set {
		resultMap[ele.target] = append(resultMap[ele.target], ele.value)
	}

	var result [][]string
	for _, val := range resultMap {
		result = append(result, val)
	}
	return result
}

func readSet(strs []string) []strEle {
	var res []strEle
	for _, str := range strs {
		res = append(res, readStr(str))
	}
	return res
}

func readStr(str string) strEle {
	target := [26]int{0}

	for _, s := range str {
		target[s-97]++
	}
	return strEle{target: target, value: str}
}

type strEle struct {
	target [26]int
	value  string
}

func TestGroups(t *testing.T) {

}