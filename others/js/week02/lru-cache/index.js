// https://leetcode.cn/problems/lru-cache/
/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.length = 0;
  this.capacity = capacity;
  this.map = {};
  this.head = {
    pre: null,
    next: null,
    key: null,
    value: null
  };
  this.end = {
    pre: this.head,
    next: null,
    key: null,
    value: null
  };
  this.head.next = this.end;
  this.map['head'] = this.head;
  this.map['end'] = this.end;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.map[key];
  if (node) {
    if (this.head.next !== node) {
      this.move2Head(node);
    }
    return node.value;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const node = this.map[key];
  if (node) {
    node.value = value;
    if (this.head.next !== node) {
      this.move2Head(node);
    }
  } else {
    const curNode = {
      next: null,
      pre: null,
      key: key,
      value: value
    };
    this.map[key] = curNode;
    this.move2Head(curNode);
    this.length += 1;
    if (this.length > this.capacity) {
      this.remove(this.end.pre);
    }
  }
};

LRUCache.prototype.move2Head = function (node) {
  const nodeNext = node.next;
  const nodePre = node.pre;
  const headNext = this.head.next;
  node.pre = this.head;
  node.next = headNext;
  this.head.next = node;
  headNext.pre = node;
  if (nodeNext) {
    nodeNext.pre = nodePre;
  }
  if (nodePre) {
    nodePre.next = nodeNext;
  }
};

LRUCache.prototype.remove = function (node) {
  node.pre.next = node.next;
  node.next.pre = node.pre;
  delete this.map[node.key];
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

export { LRUCache };
