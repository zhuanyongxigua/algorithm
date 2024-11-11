// https://leetcode.cn/problems/n-ary-tree-level-order-traversal/


/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[][]}
 */
const levelOrder = function (root) {
  if (root === null) {
    return [];
  }
  const queue = [...root.children];
  const ans = [[root.val]];
  let index = 0;
  let curAnsItem = [];
  let curNum = root.children.length;
  let nextNum = 0;
  while (index < queue.length) {
    const cur = queue[index];
    index++;
    if (cur.children) {
      queue.push(...cur.children);
      nextNum += cur.children.length;
    }
    curAnsItem.push(cur.val);
    curNum--;
    if (curNum === 0) {
      curNum = nextNum;
      nextNum = 0;
      ans.push(curAnsItem);
      curAnsItem = [];
    }
  }
  return ans;
};

const levelOrder2 = function (root) {
  const ans = [];
  function dfs (r, curLevel) {
    if (r === null) {
      return;
    }
    if (!ans[curLevel]) {
      ans[curLevel] = [];
    }
    ans[curLevel].push(r.val);
    for (let i = 0; i < r.children.length; i++) {
      dfs(r.children[i], curLevel + 1);
    }
  }
  dfs(root, 0);
  return ans;
};

export { levelOrder, levelOrder2 };
