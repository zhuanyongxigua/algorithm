// https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = function (root, p, q) {
  const markMap = {};
  let ans = null;

  function mark (r) {
    if (markMap[r.val]) {
      ans = r;
      return false;
    }
    markMap[r.val] = true;
    return true;
  }

  function traverse (r) {
    let findVal = false;
    if (r === null) return findVal;
    if (r.val === p.val || r.val === q.val) findVal = mark(r);

    const left = traverse(r.left);
    if (left) findVal = mark(r);
    const right = traverse(r.right);
    if (right) findVal = mark(r);

    return findVal;
  }
  traverse(root);
  return ans;
};

export { lowestCommonAncestor };
