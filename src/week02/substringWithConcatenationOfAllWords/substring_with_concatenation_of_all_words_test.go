package substring_with_concatenation_of_all_words_test

import "testing"

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
			if (j+1 == len(words)){
				result = append(result, i)
			}
		}
	}
	return result
}

func TestSubstring(t *testing.T) {

}