// https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

/**
 * Definition for a binary tree node.
 */

function TreeNode (val, left, right) {
  this.val = (val===undefined ? 0 : val);
  this.left = (left===undefined ? null : left);
  this.right = (right===undefined ? null : right);
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = function (preorder, inorder) {
  let index = 0;
  function traverse (inStart, inEnd) {
    if (index >= preorder.length || inStart >= inEnd) {
      return null;
    }
    let rootIndex = -1;
    for (let i = inStart; i < inEnd; i++) {
      if (inorder[i] === preorder[index]) {
        rootIndex = i;
        break;
      }
    }
    const root = new TreeNode(preorder[index]);
    index++;
    root.left = traverse(inStart, rootIndex);
    root.right = traverse(rootIndex + 1, inEnd);
    return root;
  }
  const root = traverse(0, inorder.length);
  return root;
};

export { buildTree, TreeNode };
