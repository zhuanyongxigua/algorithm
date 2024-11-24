// https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
  if (root === null) {
    return new TreeNode(val);
  }
  if (val > root.val) {
    const right = insertIntoBST(root.right, val);
    if (!root.right) {
      root.right = right
    }
  } else {
    const left = insertIntoBST(root.left, val);
    if (!root.left) {
      root.left = left;
    }
  }
  return root;
};

export { insertIntoBST, TreeNode }
