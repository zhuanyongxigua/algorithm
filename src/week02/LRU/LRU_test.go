package LRU_test

import (
	"testing"
)

type Node struct {
	Key int
	Val int
	Pre *Node
	Next *Node
}

type LRUCache struct {
	Cap int
	Head *Node
	Tail *Node
	ValMap map[int]*Node
}

func Constructor(capacity int) LRUCache {
	head := &Node{-1, -1, nil, nil}
	tail := &Node{-1, -1, head, nil}
	head.Next = tail
	l := LRUCache{
		Cap: capacity,
		Head: head,
		Tail: tail,
		ValMap: make(map[int]*Node),
	}
	return l
}

func (this *LRUCache) Get(key int) int {
	if _, ok := this.ValMap[key]; !ok {
		return -1
	}
	cur := this.ValMap[key]
	this.removeFromList(cur)
	this.insertToListHead(key, cur.Val)
	return cur.Val
}

func (this *LRUCache) Put(key int, value int) {
	if _, ok := this.ValMap[key]; ok {
		cur := this.ValMap[key]
		this.removeFromList(cur)
	}
	this.insertToListHead(key, value)
}

func (this *LRUCache) insertToListHead(key, value int) {
	if len(this.ValMap) == this.Cap {
		this.removeFromList(this.Tail.Pre)
	}
	node := &Node{
		Key: key,
		Val: value,
		Pre: this.Head,
		Next: this.Head.Next,
	}
	node.Next.Pre = node
	this.Head.Next = node
	this.ValMap[key] = node
}

func (this *LRUCache) removeFromList(node *Node) {
	node.Next.Pre = node.Pre
	node.Pre.Next = node.Next
	delete(this.ValMap, node.Key)
}

func TestLRUCache(t *testing.T) {
	lruCache := Constructor(2)
	lruCache.Put(1, 1)
	lruCache.Put(2, 2)
	t.Log(lruCache.Get(1))
	lruCache.Put(3, 3)
	t.Log(lruCache.Get(2))
	lruCache.Put(4, 4)
	t.Log(lruCache.Get(1))
	t.Log(lruCache.Get(3))
	t.Log(lruCache.Get(4))
	// result2B, _ := json.Marshal(lruCache.ValMap)
	// t.Log("testing hahaha", string(result2B))
}
