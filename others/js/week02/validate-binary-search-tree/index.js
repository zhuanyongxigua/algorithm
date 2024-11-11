// https://leetcode.cn/problems/validate-binary-search-tree/description/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
  function recurse (root) {
    if (root === null) {
      return [ true, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER ];
    }
    const leftResult = recurse(root.left);
    if (!leftResult[0]) {
      return [ false ];
    }
    const rightResult = recurse(root.right);
    if (!rightResult[0]) {
      return [ false ];
    }
    if (leftResult[2] < root.val && rightResult[1] > root.val) {
      return [ true, Math.min(leftResult[1], root.val), Math.max(rightResult[2], root.val) ];
    }
    return [ false ];
  }
  const result = recurse(root);
  return result[0];
};

export { isValidBST };
