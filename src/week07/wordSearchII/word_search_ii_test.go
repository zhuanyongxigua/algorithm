package wordsearchii_test

import (
	"reflect"
	"testing"
)

type Trie struct {
	root *node
}

type node struct {
	count int
	child map[uint8]*node
}

/** Constructor init your data structure here. */
func Constructor() Trie {
	return Trie{root: &node{count: 0, child: map[uint8]*node{}}}
}

/** Insert inserts a word into the trie. */
func (t *Trie) Insert(word string) {
	t.find(word, true, true)
}

/** Search returns if the word is in the trie. */
func (t *Trie) Search(word string) bool {
	return t.find(word, true, false)
}

/** StartsWith returns if there is any word in the trie that starts with the given prefix. */
func (t *Trie) StartsWith(prefix string) bool {
	return t.find(prefix, false, false)
}

func (t *Trie) find(s string, exactMatch, insertIfNotExist bool) bool {
	curr := t.root
	for i := 0; i < len(s); i++ {
		c := s[i]
		if _, ok := curr.child[c]; !ok {
			if !insertIfNotExist {
				return false
			}
			curr.child[c] = &node{count: 0, child: map[uint8]*node{}}
		}
		curr = curr.child[c]
	}
	if insertIfNotExist {
		curr.count++
	}
	return !exactMatch || curr.count > 0

}

var ans = []string{}
var dx = []int{-1, 0, 0, 1}
var dy = []int{0, -1, 1, 0}
var visited [][]bool
var m = 0
var n = 0

func findWords(board [][]byte, words []string) []string {
	obj := Constructor()
	for _, word := range words {
		obj.Insert(word)
	}
	m = len(board)
	n = len(board[0])
	for i := 0; i < len(board); i++ {
		for j := 0; j < len(board[i]); j++ {
			visited = make([][]bool, m)
			for v := range visited {
				visited[v] = make([]bool, n)
			}
			visited[i][j] = true
			dfs(board, i, j, obj.root, string(board[i][j]))
		}
	}
	return ans
}

func dfs(board [][]byte, x int, y int, curr *node, str string) {
	ch := board[x][y]
	if _, ok := curr.child[ch]; !ok {
		return
	}
	curr = curr.child[ch]
	if curr.count > 0 {
		ans = append(ans, str)
		curr.count = 0
	}
	for k := 0; k < 4; k++ {
		nx := x + dx[k]
		ny := y + dy[k]
		if nx < 0 || ny < 0 || nx >= m || ny >= n {
			continue
		}
		if visited[nx][ny] {
			continue
		}
		visited[nx][ny] = true
		dfs(board, nx, ny, curr, str+string(board[nx][ny]))
		visited[nx][ny] = false
	}
}

// Please give me two test cases with the following test data.
func TestFindWords(t *testing.T) {
	// board: [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
	// words: ["oath","pea","eat","rain"]
	got := findWords(
		[][]byte{
			{'o', 'a', 'a', 'n'},
			{'e', 't', 'a', 'e'},
			{'i', 'h', 'k', 'r'},
			{'i', 'f', 'l', 'v'},
		},
		[]string{"oath", "pea", "eat", "rain"},
	)
	want := []string{"oath", "eat"} // Assuming these are the words that can be formed.
	if !reflect.DeepEqual(got, want) {
		t.Errorf("Expected %v, but got %v", want, got)
	}

	ans = []string{}

	// board: [["a","b"],["c","d"]]
	// words: ["abcb"]
	got = findWords(
		[][]byte{
			{'a', 'b'},
			{'c', 'd'},
		},
		[]string{"abcb"},
	)
	want = []string{} // Assuming no word can be formed.
	if !reflect.DeepEqual(got, want) {
		t.Errorf("Expected %v, but got %v", want, got)
	}

}
