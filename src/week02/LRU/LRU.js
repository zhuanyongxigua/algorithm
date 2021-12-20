/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
	 const head = {
		 key: -1,
		 val: -1,
		 pre: null,
		 next: null
	 }
	 const tail = {
		 key: -1,
		 val: -1,
		 pre: head,
		 next: null
	 }
	 head.next = tail
	 this.cap = capacity
	 this.head = head
	 this.tail = tail
	 this.hashMap = {}
	 this.hashMapLen = 0
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
	if (!this.hashMap[key]) {
		return -1
	}
	const cur = this.hashMap[key]
	this.removeFromList(cur)
	this.insertToListHead(key, cur.val)
	return cur.val
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
	if (this.hashMap[key]) {
		const cur = this.hashMap[key]
		this.removeFromList(cur)
	}
	this.insertToListHead(key, value)
};

LRUCache.prototype.insertToListHead = function(key, value) {
	if (this.hashMapLen === this.cap) {
		this.removeFromList(this.tail.pre)
	}
	node = {
		key: key,
		val: value,
		pre: this.head,
		next: this.head.next
	}
	node.next.pre = node
	this.head.next = node
	this.hashMap[key] = node
	this.hashMapLen++
}

LRUCache.prototype.removeFromList = function(node) {
	node.next.pre = node.pre
	node.pre.next = node.next
	delete this.hashMap[node.key]
	this.hashMapLen--
}

~function test() {
	const lruCache = new LRUCache(2)
	lruCache.put(1, 1)
	lruCache.put(2, 2)
	console.log(lruCache.get(1))
	lruCache.put(3, 3)
	console.log(lruCache.get(2))
	lruCache.put(4, 4)
	console.log(lruCache.get(1))
	console.log(lruCache.get(3))
	console.log(lruCache.get(4))
}()

// JavaScript
// 老师写的这个就有点投机取巧了
class LRUCache {  
	constructor(capacity) {    
		this.capacity = capacity;    
		this.cache = new Map();  
	}  
	get(key) {    
		if (!this.cache.has(key)) return -1;        
		let value = this.cache.get(key);    
		this.cache.delete(key);    
		this.cache.set(key, value);    
		return value;  
	}  
	put(key, value) {    
		if (this.cache.has(key)) {      
			this.cache.delete(key);    
		} else {      
			if (this.cache.size >= this.capacity) {        
				// Map 中新 set 的元素会放在后面        
				let firstKey = this.cache.keys().next();        
				this.cache.delete(firstKey.value);      
			}    
		}    
		this.cache.set(key, value);  
	}
}
