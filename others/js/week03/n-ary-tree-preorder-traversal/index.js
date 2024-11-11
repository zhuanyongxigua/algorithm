// https://leetcode.cn/problems/n-ary-tree-preorder-traversal/


/**
 * // Definition for a _Node.
 * function _Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
const preorder = function (root) {
  const ans = [];
  function dfs (r) {
    if (r === null) {
      return;
    }
    ans.push(r.val);
    for (let i = 0; i < r.children.length; i++) {
      dfs(r.children[i]);
    }
  }
  dfs(root);
  return ans;
};

export { preorder };
