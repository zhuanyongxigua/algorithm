package substring_with_concatenation_of_all_words_test

import (
	"testing"
)

func findSubstring(s string, words []string) []int {
	var result []int
	if len(s) == 0 || len(words) == 0 {
		return result
	}
	m := make(map[string]int)
	for _, w := range words{
		if v , ok := m[w]; !ok {
			m[w] = 1
		}else{
			m[w] = v+1
		}
	}
	for i := 0 ; i <= len(s) - len(words)*len(words[0]) ; i++{
		vm := make (map[string]int)
		for j := 0 ; j < len(words) ; j++{
			wordsIndex := i + j * len(words[0])
			word := s[wordsIndex:wordsIndex+len(words[0])]
			c1 := 0
			c2 := 0
			if _, ok := m[word]; !ok {
				break;
			}
			if v , ok := vm[word]; !ok{
				vm[word] = 1
			}else{
				vm[word] = v+1
			}
			c1 ,_ = m[word]
			c2 ,_ = vm[word]
			if c2 > c1 {
				break
			}
			if (j + 1 == len(words)){
				result = append(result, i)
			}
		}
	}
	return result
}

func findSubstring2(s string, words []string) []int {
	ans := []int{}
	n := len(s)
	m := len(words[0])
	tot := m * len(words)
	words_map := map[string]int{}
	for i := 0; i < len(words); i++ {
		words_map[words[i]]++
	}
	for first := 0; first < m; first++ {
		if first + tot > n {
			break
		}
		curr := first
		s_map := map[string]int{}
		for j := 0; j < len(words); j++ {
			s_map[s[curr:curr + m]]++
			curr += m
		}
		for start, end := first, curr; start + tot <= n; start, end = start + m, end + m {
			if ok := isSame(s_map, words_map); ok {
				ans = append(ans, start)
			}
			if end + m > n {
				break
			}
			s_map[s[end: end + m]]++
			s_map[s[start: start + m]]--
		}
	}
	return ans
}

func isSame(s_map1 map[string]int, s_map2 map[string]int) bool {
	for k, v := range s_map1 {
		if s_map2[k] != v {
			return false
		}
	}
	for k, v := range s_map2 {
		if s_map1[k] != v {
			return false
		}
	}
	return true
}

func TestSubstring(t *testing.T) {
	result := findSubstring2("barfoothefoobarman", []string{"foo", "bar"})
	// result := findSubstring2("wordgoodgoodgoodbestword", []string{"word","good","best","good"})
	t.Log(result)
}