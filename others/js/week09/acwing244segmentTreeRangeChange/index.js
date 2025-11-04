class Node {
  constructor(value, left, right, mark = 0) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.mark = mark;
  }
}

class SegmentTree {
  constructor (nums) {
    this.nums = nums;
    this.tree = [new Node(0, 0, 0)];
    this.build(nums, 1, 1, nums.length);
  }

  build (nums, index, left, right) {
    if (left === right) {
      this.tree[index] = new Node(nums[left - 1], left, right);
      return;
    }
    const mid = Math.floor((left + right) / 2);
    const leftNodeIndex = index * 2;
    const rightNodeIndex = index * 2 + 1;
    this.build(nums, leftNodeIndex, left, mid);
    this.build(nums, rightNodeIndex, mid + 1, right);
    this.tree[index] = new Node(
      this.tree[leftNodeIndex].value + this.tree[rightNodeIndex].value,
      left,
      right
    );
  }

  update (cur, index, val) {
      const curNode = this.tree[cur];
      if (curNode.left === curNode.right) {
          curNode.value = val;
          return;
      }
      const mid = (curNode.left + curNode.right) >> 1;
      if (index <= mid) {
          this.update(cur * 2, index, val);
      } else {
          this.update(cur * 2 + 1, index, val);
      }
      curNode.value = this.tree[cur * 2].value + this.tree[cur * 2 + 1].value;
  }

  query (cur, left, right) {
    const curNode = this.tree[cur];
    if (!curNode) return 0;
    if (curNode.left >= left && curNode.right <= right) {
        return curNode.value;
    }
    this.spread(cur);
    const mid = (curNode.left + curNode.right) >> 1;
    if (left > mid) {
        return this.query(cur * 2 + 1, left, right);
    } else if (right <= mid) {
        return this.query(cur * 2, left, right);
    } else {
        const leftVal = this.query(cur * 2, left, right);
        const rightVal = this.query(cur * 2 + 1, left, right);
        return leftVal + rightVal;
    }
  }
  
  change (cur, left, right, delta) {
    const curNode = this.tree[cur];
    if (!curNode) return;
    if (curNode.right < left || curNode.left > right) return;
    if (curNode.left >= left && curNode.right <= right) {
        curNode.value += (curNode.right - curNode.left + 1) * delta;
        curNode.mark += delta;
        return;
    }
    this.spread(cur);
    const leftIndex = cur * 2, rightIndex = leftIndex + 1;
    const mid = (curNode.left + curNode.right) >> 1;
    // 2) 只递归到“确实有交集”的子区间
    if (left <= mid)  this.change(leftIndex,  left, right, delta);
    if (right > mid)  this.change(rightIndex, left, right, delta);
    // 3) 始终用孩子汇总（不要用 0 判断，否则会被“区间和正好为 0”误伤）
    curNode.value = this.tree[leftIndex].value + this.tree[rightIndex].value;
  }
  
  spread (cur) {
      const curNode = this.tree[cur];
      const leftIndex = cur * 2;
      const rightIndex = cur * 2 + 1;
      if (this.tree[leftIndex] && curNode.mark !== 0) {
          const leftNode = this.tree[leftIndex];
          leftNode.value += (leftNode.right - leftNode.left + 1) * curNode.mark;
          leftNode.mark += curNode.mark;
      }
      if (this.tree[rightIndex] && curNode.mark !== 0) {
          const rightNode = this.tree[rightIndex];
          rightNode.value += (rightNode.right - rightNode.left + 1) * curNode.mark;
          rightNode.mark += curNode.mark;
      }
      curNode.mark = 0;
  }
}


/**
 * @param {number[]} nums
 */
const NumArray = function(nums) {
  this.segmentTree = new SegmentTree(nums)
};

/** 
* @param {number} index 
* @param {number} val
* @return {void}
*/
NumArray.prototype.update = function(index, val) {
  this.segmentTree.update(1, index, val);
    //console.log('this.segmentTree: ', this.segmentTree);
};

/** 
* @param {number} left 
* @param {number} right
* @return {number}
*/
NumArray.prototype.sumRange = function(left, right) {
  return this.segmentTree.query(1, left, right);
};

NumArray.prototype.change = function(left, right, delta) {
    this.segmentTree.change(1, left, right, delta);
}

export { NumArray }
