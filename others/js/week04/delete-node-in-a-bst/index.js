// https://leetcode.cn/problems/delete-node-in-a-bst/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  const protectedNode = new TreeNode(-1, root);
  function removeInorder(cur, fa, isLeft) {
    const temp = cur
      ? cur.left
        ? removeInorder(cur.left, cur, true)
        : [cur, fa, isLeft]
      : null;
    const [inorderNode, inorderNodeFa, left] = temp;
    if (left) {
      inorderNodeFa.left = inorderNode.right;
      return [inorderNode, inorderNodeFa, true];
    } else {
      inorderNodeFa.right = inorderNode.right;
      return [inorderNode, inorderNodeFa, false];
    }
  }
  function search(cur, fa, isLeft) {
    if (cur === null) {
      return null;
    }
    if (cur.val === key) {
      if (cur.left) {
        if (cur.right) {
          const [inorderNode] = removeInorder(cur.right, cur, false);
          if (isLeft) {
            fa.left = inorderNode;
          } else {
            fa.right = inorderNode;
          }
          inorderNode.right = cur.right;
          inorderNode.left = cur.left;
        } else {
          if (isLeft) {
            fa.left = cur.left;
          } else {
            fa.right = cur.left;
          }
        }
      } else {
        if (cur.right) {
          if (isLeft) {
            fa.left = cur.right;
          } else {
            fa.right = cur.right;
          }
        } else {
          if (fa) {
            if (isLeft) {
              fa.left = null;
            } else {
              fa.right = null;
            }
          } else {
            return null;
          }
        }
      }
    } else if (cur.val > key) {
      return search(cur.left, cur, true);
    } else {
      return search(cur.right, cur, false);
    }
  }
  search(root, protectedNode, true);
  return protectedNode.left;
};

function deleteNode2 (root, key) {
  function search(cur) {
    if (cur === null) {
      return null;
    }
    if (cur.val === key) {
      let inorderNodeFa = cur
      let inorderNode = cur.right
      while (inorderNode !== null && inorderNode.left !== null) {
        inorderNodeFa = inorderNode
        inorderNode = inorderNode.left
      }
      if (inorderNode === null) {
        return cur.left
      }
      if (inorderNodeFa !== cur) {
        inorderNodeFa.left = inorderNode.right
        inorderNode.right = cur.right
      }
      inorderNode.left = cur.left
      return inorderNode
    } else if (cur.val > key) {
      cur.left = search(cur.left);
      return cur
    } else {
      cur.right = search(cur.right);
      return cur
    }
  }
  return search(root);
}

export { deleteNode, deleteNode2 }
