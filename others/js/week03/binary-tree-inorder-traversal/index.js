// https://leetcode.cn/problems/binary-tree-inorder-traversal/


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
 * @return {number[]}
 */
const inorderTraversal = function (root) {
  const ans = [];
  function dfs (r) {
    // console.log(r);
    if (r === null) {
      return;
    }
    dfs(r.left);
    ans.push(r.val);
    dfs(r.right);
  }
  dfs(root);
  return ans;
};

export { inorderTraversal };
