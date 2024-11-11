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
  if (!root) {
    return '';
  }
  const ans = [];
  const queue = [root];
  let index = 0;
  while (index < queue.length) {
    const cur = queue[index];
    if (cur) {
      ans.push(cur.val);
      queue.push(cur.left);
      queue.push(cur.right);
    } else {
      ans.push(null);
    }
    index++;
  }
  return ans.join(',');
};

function findParentIndex (index, nodes, nodeInfo) {
  if (index % 2 === 0) {
    let parentIndex = index / 2 - 1;
    while (parentIndex < nodes.length) {
      if (nodes[parentIndex]) {
        if (!nodes[parentIndex].right) {
          if (!nodeInfo[parentIndex]) {
            return parentIndex;
          } else if (!nodeInfo[parentIndex][1]) {
            return parentIndex;
          }
        }
      }
      parentIndex++;
    }
  } else {
    let parentIndex = (index - 1) / 2;
    while (parentIndex < nodes.length) {
      if (nodes[parentIndex]) {
        if (!nodes[parentIndex].left) {
          if (!nodeInfo[parentIndex]) {
            return parentIndex;
          } else if (!nodeInfo[parentIndex][0]) {
            return parentIndex;
          }
        }
      }
      parentIndex++;
    }
  }
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = function (data) {
  if (!data) {
    return null;
  }
  const nodeInfo = {};
  const nodes = data.split(',');
  const root = new TreeNode(Number(nodes[0]));
  nodes[0] = root;
  for (let i = 1; i < nodes.length; i++) {
    if (nodes[i]) {
      const cur = new TreeNode(Number(nodes[i]));
      nodes[i] = cur;
      const parentIndex = findParentIndex(i, nodes, nodeInfo);
      if (i % 2 === 0) {
        nodes[parentIndex].right = cur;
      } else {
        nodes[parentIndex].left = cur;
      }
    } else {
      const parentIndex = findParentIndex(i, nodes, nodeInfo);
      if (!nodeInfo[parentIndex]) {
        nodeInfo[parentIndex] = [false, false];
      }
      if (i % 2 === 0) {
        nodeInfo[parentIndex][1] = true;
      } else {
        nodeInfo[parentIndex][0] = true;
      }
    }
  }
  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

export { serialize, deserialize };
