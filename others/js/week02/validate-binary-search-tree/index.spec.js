import { isValidBST } from '.';


class TreeNode {
  constructor (val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

describe('Validate Binary Search Tree', () => {
  test('should validate the binary search tree correctly - case 1', () => {
    const node1 = new TreeNode(2);
    const node2 = new TreeNode(1);
    const node3 = new TreeNode(3);
    node1.left = node2;
    node1.right = node3;

    expect(isValidBST(node1)).toBe(true);
  });

  test('should validate the binary search tree correctly - case 2', () => {
    const node1 = new TreeNode(5);
    const node2 = new TreeNode(1);
    const node3 = new TreeNode(4);
    const node4 = new TreeNode(3);
    const node5 = new TreeNode(6);
    node1.left = node2;
    node1.right = node3;
    node3.left = node4;
    node3.right = node5;

    expect(isValidBST(node1)).toBe(false);
  });

  test('[5,4,6,null,null,3,7]', () => {
    const node1 = new TreeNode(5);
    const node2 = new TreeNode(4);
    const node3 = new TreeNode(6);
    const node4 = new TreeNode(3);
    const node5 = new TreeNode(7);
    node1.left = node2;
    node1.right = node3;
    node3.left = node4;
    node3.right = node5;
    expect(isValidBST(node1)).toBe(false);
  });
});
