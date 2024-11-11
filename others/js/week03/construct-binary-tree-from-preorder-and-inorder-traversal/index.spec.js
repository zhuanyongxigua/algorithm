import { BinaryTreeNode as TreeNode } from '../../utils/index';
import { buildTree } from '.';

describe('buildTree', () => {
  test('Official test case 1: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', () => {
    const preorder = [3, 9, 20, 15, 7];
    const inorder = [9, 3, 15, 20, 7];
    const expected = new TreeNode(3);
    expected.left = new TreeNode(9);
    expected.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));
    expect(buildTree(preorder, inorder)).toEqual(expected);
  });

  test('Official test case 2: preorder = [-1], inorder = [-1]', () => {
    const preorder = [-1];
    const inorder = [-1];
    const expected = new TreeNode(-1);
    expect(buildTree(preorder, inorder)).toEqual(expected);
  });

  test('Official test case 3: preorder = [], inorder = []', () => {
    const preorder = [];
    const inorder = [];
    expect(buildTree(preorder, inorder)).toBe(null);
  });

  test('[1, 2, 3], [2, 3, 1]', () => {
    const preorder = [1, 2, 3];
    const inorder = [2, 3, 1];
    const root = new TreeNode(1, new TreeNode(2, null, new TreeNode(3)));
    const result = buildTree(preorder, inorder);
    expect(result).toEqual(root);
  });

  test('[4,2,1,3], [1,2,3,4]', () => {
    const preorder = [4, 2, 1, 3];
    const inorder = [1, 2, 3, 4];
    const root = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)));
    const result = buildTree(preorder, inorder);
    expect(result).toEqual(root);
  });

  test('[5,3,1,2,4], [1,2,3,4,5]', () => {
    const preorder = [5,3,1,2,4];
    const inorder = [1,2,3,4,5];
    const root = new TreeNode(
      5,
      new TreeNode(
        3,
        new TreeNode(1, null, new TreeNode(2)),
        new TreeNode(4)
      )
    );
    const result = buildTree(preorder, inorder);
    expect(result).toEqual(root);
  });
});
