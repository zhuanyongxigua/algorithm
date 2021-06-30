package LRU_test

type Node struct {
	key   int
	value int
	pre   *Node
	next  *Node
}

type LRUCache struct {
	capacity int
	HashMap  map[int]*Node
	head     *Node
	tail     *Node
}

func Constructor(capacity int) LRUCache {
	var LRUCache LRUCache
	LRUCache.capacity = capacity
	LRUCache.HashMap = make(map[int]*Node)
	LRUCache.head = new(Node)
	LRUCache.tail = new(Node)
	LRUCache.head.next = LRUCache.tail
	LRUCache.tail.pre = LRUCache.head
	return LRUCache
}

func (this *LRUCache) Get(key int) int {
	if node, ok := this.HashMap[key]; ok {
		this.removeFromList(node)
		this.insertToListHead(node.key, node.value)
		return node.value
	}
	return -1
}

func (this *LRUCache) Put(key int, value int) {
	if node, ok := this.HashMap[key]; ok {
		this.removeFromList(node)
		this.insertToListHead(key, value)
	} else {
		this.insertToListHead(key, value)
	}
	if len(this.HashMap) > this.capacity {
		this.removeFromList(this.tail.pre)
	}
}

func (this *LRUCache) insertToListHead(key, value int) {
	node := new(Node)
	node.key = key
	node.value = value
	node.next = this.head.next
	this.head.next.pre = node
	node.pre = this.head
	this.head.next = node
	this.HashMap[key] = node

}

func (this *LRUCache) removeFromList(node *Node) {
	node.pre.next = node.next
	node.next.pre = node.pre
	delete(this.HashMap, node.key)
}
