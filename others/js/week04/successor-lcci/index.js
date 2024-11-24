// https://leetcode.cn/problems/successor-lcci/

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
 * @return {TreeNode}
 */
var inorderSuccessor = function(root, p) {
  let inorderNode = null;
  function inorder (cur) {
    return cur
      ? cur.left
        ? inorder(cur.left)
        : cur
      : null;
  }
  function search (cur) {
    if (cur === null) {
      return null;
    }
    if (cur.val > p.val) {
      if (!inorderNode) {
        inorderNode = cur;
      } else if (cur.val < inorderNode.val) {
        inorderNode = cur;
      }
    }
    if (cur.val === p.val) {
      const result = inorder(cur.right);
      if (result) {
        return result;
      } else {
        return inorderNode && (inorderNode.val > p.val) ? inorderNode : null;
      }
    } else if (cur.val > p.val) {
      return search(cur.left);
    } else {
      return search(cur.right);
    }
  }
  return search(root);
};

export { inorderSuccessor }
