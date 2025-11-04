class ListNode {
  constructor (value = 0, next = null, index) {
    this.value = value;
    this.index = index;
    this.next = next;
  }
}

class BinaryHeap {
  comparator;
  nodes;
  isMax;
  constructor (comparator) {
    this.comparator = comparator;
    if (this.comparator(new ListNode(0), new ListNode(1))) {
      this.nodes = [new ListNode(Number.MIN_SAFE_INTEGER)];
      this.isMax = false;
    } else {
      this.nodes = [new ListNode(Number.MAX_SAFE_INTEGER)];
      this.isMax = true;
    }
  }

  insert (node) {
    this.nodes.push(node);
    let index = this.nodes.length - 1;
    let parentIndex = Math.floor(index / 2);
    let parent = this.nodes[parentIndex];
    while (this.comparator(node, parent) && parentIndex > 0) {
      this.nodes[parentIndex] = node;
      this.nodes[index] = parent;
      index = parentIndex;
      parentIndex = Math.floor(index / 2);
      parent = this.nodes[parentIndex];
    }
  }

  extract () {
    const topItem = this.nodes[1];
    this.nodes[1] = this.nodes[this.nodes.length - 1];
    this.nodes[this.nodes.length - 1] = topItem;
    this.nodes.pop();
    const getNode = (nodeIndex) => {
      return this.nodes[nodeIndex]
      ? this.nodes[nodeIndex]
      : this.isMax
        ? new ListNode(Number.MIN_SAFE_INTEGER)
        : new ListNode(Number.MAX_SAFE_INTEGER);
    };
    const getExtremeNode = (leftNode, rightNode) => {
      return this.isMax
      ? leftNode.value > rightNode.value
        ? leftNode
        : rightNode
      : leftNode.value > rightNode.value
        ? rightNode
        : leftNode;
    };
    let index = 1;
    let left = index * 2;
    let leftNode = getNode(left);
    let right = index * 2 + 1;
    let rightNode = getNode(right);
    let extremeNode = getExtremeNode(leftNode, rightNode);
    while (this.nodes[index] && !this.comparator(this.nodes[index], extremeNode)) {
      if (this.comparator(leftNode, rightNode)) {
      const temp = this.nodes[left];
      this.nodes[left] = this.nodes[index];
      this.nodes[index] = temp;
      index = left;
      } else {
      const temp = this.nodes[right];
      this.nodes[right] = this.nodes[index];
      this.nodes[index] = temp;
      index = right;
      }
      left = index * 2;
      right = index * 2 + 1;
      leftNode = getNode(left);
      rightNode = getNode(right);
      extremeNode = getExtremeNode(leftNode, rightNode);
    }
    return topItem;
  }

  peek () {
    return this.nodes[1];
  }
}

/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
var minInterval = function(intervals, queries) {
  const events = [];
  for (let i = 0; i < intervals.length; i++) {
    events.push([intervals[i][0], 1, i]);
    events.push([intervals[i][1], -1, i]);
  }
  for (let i = 0; i < queries.length; i++) {
    events.push([queries[i], 0, i]);
  }
  events.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });
  const heap = new BinaryHeap((a, b) => a.value - b.value < 0);
  // 在构造 events 的时候存了 building 的 index，就用这个做 key
  const map = {};
  const ans = [];
  for (let i = 0; i < events.length; i++) {
    const curEvent = events[i];
    if (curEvent[1] === -1) {
      map[curEvent[2]] = 0;
    } else if (curEvent[1] === 0) {
      let curTop = heap.peek();
      while (curTop !== undefined && map[curTop.index] === 0) {
        heap.extract();
        curTop = heap.peek();
      }
      if (curTop === undefined) {
        ans[curEvent[2]] = -1;
      } else {
        const interval = intervals[curTop.index];
        ans[curEvent[2]] = interval[1] - interval[0] + 1;
      }
    } else {
      const interval = intervals[curEvent[2]];
      heap.insert(new ListNode(interval[1] - interval[0] + 1, null, curEvent[2]));
      map[curEvent[2]] = 1;
    }
  }
  return ans;
};

export { minInterval }
