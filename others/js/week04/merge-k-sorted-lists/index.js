// https://leetcode.cn/problems/merge-k-sorted-lists/
// 这个 leetcode 用的 ListNode 有坑，以前我记得里面表示值的字段是 value，现在这个是 val，结果要么就是答案错误，要么就是超时，我多检查了一天才看出来。
export class ListNode {
  constructor (val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

export class BinaryHeap {
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
        ? leftNode.val > rightNode.val
          ? leftNode
          : rightNode
        : leftNode.val > rightNode.val
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

// JavaScript
// Leetcode23 合并K个升序链表
// 小根二叉堆
class MinBinaryHeap {
  constructor () {
    // 数组存储完全二叉树
    // 从索引0开始存
    this.heap = [];
  }
  swap (i,j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  isEmpty () {
    return this.heap.length === 0;
  }
  push (node) {
    // 插入到尾部
    this.heap.push(node);
    // 向上调整
    this.heapifyUp(this.heap.length - 1);
  }
  pop () {
    const ans = this.heap[0];
    // 末尾交换到头部，然后删除末尾
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    // 向下调整
    this.heapifyDown(0);
    return ans;
  }
  heapifyUp (p) {
    while (p > 0) {
      const fa = (p - 1) >> 1;
      // 右移1位，等于整除2
      if (this.heap[p].val < this.heap[fa].val) {
        // 小根堆
        this.swap(p, fa);
        p = fa;
      } else break;
    }
  }
  heapifyDown (p) {
    let child = p * 2 + 1;
    while (child < this.heap.length) {
      // child未出界，说明p有合法的child，还不是叶子
      const otherChild = p * 2 + 2;
      // 先比较两个孩子，谁小就继续跟p比较
      // child存较小的孩子
      if (otherChild < this.heap.length && this.heap[child].val > this.heap[otherChild].val) {
        child = otherChild;
      }
      // 让child跟p比较
      if (this.heap[p].val > this.heap[child].val) {
        // 小根堆
        this.swap(p, child);
        p = child;
        child = p * 2 + 1;
      } else break;
    }
  }
}
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = function (lists) {
  const head = new ListNode();
  const binaryHeap = new BinaryHeap((a, b) => a.val < b.val);
  for (let i = 0; i < lists.length; i++) {
    const cur = lists[i];
    if (cur) {
      binaryHeap.insert(cur);
    }
  }
  let curTopItem = binaryHeap.extract();
  head.next = curTopItem || null;
  while (curTopItem) {
    const temp = curTopItem;
    if (curTopItem.next) {
      binaryHeap.insert(curTopItem.next);
    }
    curTopItem = binaryHeap.extract();
    temp.next = curTopItem || null;
  }
  return head.next;
};

const mergeKListsWithMinBinaryHeap = function (lists) {
  const head = new ListNode();
  const binaryHeap = new MinBinaryHeap();
  for (let i = 0; i < lists.length; i++) {
    const cur = lists[i];
    if (cur) {
      binaryHeap.push(cur);
    }
  }
  let curTopItem = binaryHeap.pop();
  head.next = curTopItem || null;
  while (curTopItem) {
    const temp = curTopItem;
    if (curTopItem.next) {
      binaryHeap.push(curTopItem.next);
    }
    curTopItem = binaryHeap.pop();
    temp.next = curTopItem || null;
  }
  return head.next;
};


/** *@param{ListNode[]}lists
 * *@return{ListNode}
 * */
const mergeKLists2 = function (lists) {
  // O(元素个数*logK)
  // O(total*logK)
  const q = new MinBinaryHeap();
  for (const listNode of lists) {
    if(listNode!=null) {
      q.push({val:listNode.val,listNode:listNode});
    }
  }
  const head=new ListNode();
  let tail=head;
  while(!q.isEmpty()){
    // 取出k个指针指向的最小元素
    const node=q.pop();
    // 在答案链表的末尾插入
    tail.next=node.listNode;
    tail=tail.next;
    // 当最小被取出后，指针向后移动一位，可能需要插入新的元素
    const p=node.listNode.next;
    if(p!=null){
      q.push({val:p.val,listNode:p});
    }
  }
  return head.next;
};

export { mergeKLists, mergeKLists2, mergeKListsWithMinBinaryHeap };
