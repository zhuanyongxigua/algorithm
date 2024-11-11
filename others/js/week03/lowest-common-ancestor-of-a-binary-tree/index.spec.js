import { BinaryTreeNode as TreeNode } from '../../utils/index';
import { lowestCommonAncestor } from '.';


describe('Lowest Common Ancestor of a Binary Tree', () => {
  test('Test Case 1', () => {
    // Build the tree: [3,5,1,6,2,0,8,null,null,7,4]
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(0);
    root.right.right = new TreeNode(8);
    root.left.right.left = new TreeNode(7);
    root.left.right.right = new TreeNode(4);

    // Nodes to find LCA
    const p = root.left; // Node 5
    const q = root.left.right.right; // Node 4

    // Expected LCA is node 5
    expect(lowestCommonAncestor(root, p, q).val).toBe(5);
  });

  test('Test Case 2', () => {
    // Building another tree and testing different nodes
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(0);
    root.right.right = new TreeNode(8);

    // Nodes to find LCA
    const p = root.left; // Node 5
    const q = root.right; // Node 1

    // Expected LCA is root 3
    expect(lowestCommonAncestor(root, p, q).val).toBe(3);
  });

  test('Test Case 3', () => {
    // Simpler tree
    const root = new TreeNode(1);
    root.left = new TreeNode(2);

    // Nodes to find LCA
    const p = root;
    const q = root.left;

    // Expected LCA is root 1
    expect(lowestCommonAncestor(root, p, q).val).toBe(1);
  });
});
