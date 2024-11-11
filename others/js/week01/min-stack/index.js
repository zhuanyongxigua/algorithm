// https://leetcode.cn/problems/min-stack/

const MinStack = function () {
  this.prefixMinStack = [];
  this.stack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  if (this.prefixMinStack.length === 0) {
    this.prefixMinStack.push(val);
    return;
  }
  const last = this.prefixMinStack[this.prefixMinStack.length - 1];
  if (last < val) {
    this.prefixMinStack.push(last);
  } else {
    this.prefixMinStack.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.prefixMinStack.pop();
  return this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  if (this.stack.length === 0) {
    return null;
  }
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  if (this.prefixMinStack.length === 0) {
    return null;
  }
  return this.prefixMinStack[this.prefixMinStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

export { MinStack };
