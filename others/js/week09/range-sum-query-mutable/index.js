// https://leetcode.cn/problems/range-sum-query-mutable/

class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
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
      if (index + 1 <= mid) {
          this.update(cur * 2, index, val);
      } else {
          this.update(cur * 2 + 1, index, val);
      }
      curNode.value = this.tree[cur * 2].value + this.tree[cur * 2 + 1].value;
  }

  query (cur, left, right) {
    const curNode = this.tree[cur];
    if (!curNode) return 0;
    if (curNode.left >= left + 1 && curNode.right <= right + 1) {
        return curNode.value;
    }
    const mid = (curNode.left + curNode.right) >> 1;
    if (left + 1 > mid) {
        return this.query(cur * 2 + 1, left, right);
    } else if (right + 1 < mid) {
        return this.query(cur * 2, left, right);
    } else {
        const leftVal = this.query(cur * 2, left, right);
        const rightVal = this.query(cur * 2 + 1, left, right);
        return leftVal + rightVal;
    }
  }
}


/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
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

/** 
* Your NumArray object will be instantiated and called as such:
* var obj = new NumArray(nums)
* obj.update(index,val)
* var param_2 = obj.sumRange(left,right)
*/

export { NumArray }
