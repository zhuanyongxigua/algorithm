// https://leetcode.cn/problems/sliding-window-maximum/

class MaxBinaryHeap {
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
      if (this.heap[p].val > this.heap[fa].val) {
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
      if (otherChild < this.heap.length && this.heap[child].val < this.heap[otherChild].val) {
        child = otherChild;
      }
      // 让child跟p比较
      if (this.heap[p].val < this.heap[child].val) {
        // 小根堆
        this.swap(p, child);
        p = child;
        child = p * 2 + 1;
      } else break;
    }
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = function (nums, k) {
  if (nums.length <= 1) {
    return nums;
  }
  const ans = [];
  const heap = new MaxBinaryHeap();
  for (let i = 0; i < k; i++) {
    heap.push({
      val: nums[i],
      numIndex: i
    });
  }
  ans.push(heap.heap[0].val);
  for (let i = k; i < nums.length; i++) {
    heap.push({
      val: nums[i],
      numIndex: i
    });
    let curMax = heap.heap[0];
    while (curMax.numIndex < i - k + 1) {
      heap.pop();
      curMax = heap.heap[0];
    }
    ans.push(curMax.val);
  }
  return ans;
};

// Sliding window
function maxSlidingWindow2 (nums, k) {
  const queue = [];
  const ans = [];
  let index = 0;
  for (let i = 0; i < nums.length; i++) {
    const slidingWindowStart = i < k ? 0 : i - k + 1;
    while (queue.length && queue[queue.length - 1].value <= nums[i]) {
      queue.pop();
    }
    if (!queue.length) {
      index = 0;
    } else if (queue.length < index + 1) {
      index = queue.length - 1;
    }
    queue.push({
      value: nums[i],
      numIndex: i
    })
    while (queue[index] && queue[index].numIndex < slidingWindowStart) {
      index++;
    }
    if (i >= k - 1) {
      ans.push(queue[index].value);
    }
  }
  return ans;
}


export { maxSlidingWindow, maxSlidingWindow2 };
