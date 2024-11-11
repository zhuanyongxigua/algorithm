// https://leetcode.cn/problems/invert-binary-tree/description/

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
 * @return {TreeNode}
 */
const invertTree = function (root) {
  if (root === null) {
    return null;
  }
  const left = root.left;
  const right = root.right;
  root.left = invertTree(right);
  root.right = invertTree(left);
  return root;
};

export { invertTree };
