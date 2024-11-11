// https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/

export function TreeNode (val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = function (root) {
  const ans = [];
  function traverse (r) {
    if (r === null) {
      ans.push(null);
      return;
    }
    ans.push(r.val);
    traverse(r.left);
    traverse(r.right);
  }
  traverse(root);
  return ans.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = function (data) {
  if (data === '') {
    return null;
  }
  let index = 0;
  const nodeValList = data.split(',');
  function traverse () {
    if (index >= nodeValList.length) {
      return null;
    }
    let cur = null;
    if (nodeValList[index]) {
      cur = new TreeNode(Number(nodeValList[index]));
    }
    if (cur) {
      index++;
      cur.left = traverse();
      index++;
      cur.right = traverse();
    }
    return cur;
  }
  const root = traverse();
  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

export { serialize, deserialize };
