/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
  const graph = [];
  for (let i = 0; i < times.length; i++) {
      if (!graph[times[i][0]]) graph[times[i][0]] = [];
      // [出点, 权值]
      graph[times[i][0]].push([times[i][1], times[i][2]]);
  }
  const points = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  const visited = new Array(n + 1).fill(false);
  points[k] = 0;
  const minHeap = new BinaryHeap((a, b) => a.value < b.value);
  minHeap.insert(new ListNode(0, null, k));
  console.log('graph', graph);
  while (minHeap.nodes.length > 1) {
      const top = minHeap.extract();
      console.log('minHeap', minHeap);
      if (visited[top.index]) continue;
      visited[top.index] = true;
      const edges = graph[top.index];
      if (!edges) continue;
      for (let i = 0; i < edges.length; i++) {
          if (top.value + edges[i][1] < points[edges[i][0]]) {
              points[edges[i][0]] = top.value + edges[i][1];
              minHeap.insert(new ListNode(points[edges[i][0]], null, edges[i][0]));
          }
      }
  }
  let num = 0;
  for (let i = 1; i < points.length; i++) {
      if (points[i] === Number.MAX_SAFE_INTEGER) return -1;
      num = Math.max(num, points[i]);
  }
  return num;
};

class ListNode {
constructor (value = 0, next = null, index) {
  this.value = value;
  this.next = next;
  this.index = index;
  this.marked = false;
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

export { networkDelayTime }
