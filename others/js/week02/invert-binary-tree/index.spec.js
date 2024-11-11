import { invertTree } from '.';

class TreeNode {
  constructor (val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

describe('invertTree', () => {
  it('should invert a binary tree', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(2, new TreeNode(1), new TreeNode(3));
    root.right = new TreeNode(7, new TreeNode(6), new TreeNode(9));

    const inverted = invertTree(root);
    expect(inverted.val).toBe(4);
    expect(inverted.left.val).toBe(7);
    expect(inverted.right.val).toBe(2);
    expect(inverted.left.left.val).toBe(9);
    expect(inverted.left.right.val).toBe(6);
    expect(inverted.right.left.val).toBe(3);
    expect(inverted.right.right.val).toBe(1);
  });

  it('should handle an empty tree', () => {
    expect(invertTree(null)).toBeNull();
  });

  it('should handle a single node tree', () => {
    const root = new TreeNode(2, new TreeNode(1), new TreeNode(3));
    const result = invertTree(root);
    expect(result.val).toBe(2);
    expect(result.left.val).toBe(3);
    expect(result.right.val).toBe(1);
  });
});
