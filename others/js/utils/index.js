export class ListNode {
  constructor (value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Helper function to convert an array to a linked list
export function arrayToLinkedList (arr) {
  let head = null; let temp = null; let tail = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = new ListNode(arr[i], temp);
    if (i === arr.length - 1) {
      tail = head;
    }
    temp = head;
  }
  return [ head, tail ];
}

// Helper function to convert a linked list back to an array
export function linkedListToArray (head) {
  const arr = [];
  let current = head;
  while (current !== null) {
    arr.push(current.value);
    current = current.next;
  }
  return arr;
}

export class BinaryHeap {
  comparator;
  nodes;
  isMax;
  constructor (comparator) {
    this.comparator = comparator;
    console.log('performance before comparator', performance.now());
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

// JavaScript
/**
 * @param {number[]} nums
 * @return {number[]}
 */

export var sortArray = function (nums) {
  quickSort(nums, 0, nums.length - 1);
  return nums;
};

var quickSort = function (arr, l, r) {
  if (l >= r) return;
  const pivot = partition(arr, l, r);
  quickSort(arr, l, pivot);
  quickSort(arr, pivot + 1, r);
};

var partition = function (a, l, r) {
  const pivot = l + Math.floor(Math.random() * (r - l + 1));
  const pivotVal = a[pivot];
  // let pivotVal = 11;
  console.log('pivot', pivot, ', pivotVal', pivotVal);
  while (l <= r) {
    while (a[l] < pivotVal) l++;
    while (a[r] > pivotVal) r--;
    // 这里是一个难点，与上面的 while (l <= r) 对应，不是矛盾的。
    // 如果 pivotVal 是 10，现在的剩下的区间是 [11, 12, 8]
    // left 在 11 上面，right 在 8 上面，这个时候就跳过了这个 break
    // 进入到了最下面的 condition，处理之后的区间是 [8, 12, 11]
    // 这是 left 和 right 都在 12 上面，如果这个 12 的 index 当作 right 返回了
    // 就出问题了，所以 right 需要再减一次才行
    // 最终的结果 left 和 right 一定是要错位的（暂时想到的 case 都是错位的）
    // 错位的意思就是 right 在 left 左边一位
    if (l == r) break;
    if (l < r) {
      const temp = a[l]; a[l] = a[r]; a[r] = temp;
      l++;
      r--;
    }
  }
  console.log('a', a, ', r', r);
  return r;
};
