import { BinaryTreeNode as TreeNode } from '../../utils/index';
import { inorderTraversal } from './index.js';


describe('inorderTraversal', () => {
  test('Official test case 1: root = [1,null,2,3] should return [1,3,2]', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2, new TreeNode(3));
    expect(inorderTraversal(root)).toEqual([1, 3, 2]);
  });

  test('Official test case 2: root = [] should return []', () => {
    expect(inorderTraversal(null)).toEqual([]);
  });

  test('Official test case 3: root = [1] should return [1]', () => {
    const root = new TreeNode(1);
    expect(inorderTraversal(root)).toEqual([1]);
  });
});
