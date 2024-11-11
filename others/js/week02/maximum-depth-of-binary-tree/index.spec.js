import { maxDepth } from './index.js';

function TreeNode (val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

describe('maxDepth', () => {
  test('Official test case 1: root = [3,9,20,null,null,15,7] should return 3', () => {
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));
    expect(maxDepth(root)).toBe(3);
  });

  test('Official test case 2: root = [1,null,2] should return 2', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    expect(maxDepth(root)).toBe(2);
  });
});
