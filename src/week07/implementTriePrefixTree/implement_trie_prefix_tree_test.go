package implementtrieprefixtree_test

import (
	"testing"
)

// 208.实现 Trie（前缀树）

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

/**
* Your Trie object will be instantiated and called as such:
* obj := Constructor();
* obj.Insert(word);
* param_2 := obj.Search(word);
* param_3 := obj.StartsWith(prefix);
 */

// The test data that leetcode gave is "["Trie", "insert", "search", "search", "startsWith", "insert", "search"]", "[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]"
// Please create test case with t data in below TestTrie function

func TestTrie(t *testing.T) {
	obj := Constructor()

	// Testing insert with "apple"
	obj.Insert("apple")

	// Testing search with "apple", should return true
	if !obj.Search("apple") {
		t.Errorf("Search for 'apple' failed")
	}

	// Testing search with "app", should return false
	if obj.Search("app") {
		t.Errorf("Search for 'app' should not exist yet")
	}

	// Testing startsWith with "app", should return true
	if !obj.StartsWith("app") {
		t.Errorf("StartsWith for 'app' failed")
	}

	// Testing insert with "app"
	obj.Insert("app")

	// Testing search with "app", should now return true
	if !obj.Search("app") {
		t.Errorf("Search for 'app' failed after insert")
	}
}
