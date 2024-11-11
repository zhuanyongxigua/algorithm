import { BinaryTreeNode as TreeNode } from '../../utils/index';
import {
// serialize,
// deserialize,
} from './index.js';
import { serialize, deserialize } from './preorder.js';


describe('serialize and deserialize', () => {
  test('Official test case 1: root = [1,2,3,null,null,4,5]', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3, new TreeNode(4), new TreeNode(5));
    const serialized = serialize(root);
    expect(deserialize(serialized)).toEqual(root);
  });

  test('Official test case 2: root = []', () => {
    const root = null;
    const serialized = serialize(root);
    const deserialized = deserialize(serialized);
    expect(deserialized).toBe(null);
  });

  test('Official test case 3: root = [1]', () => {
    const root = new TreeNode(1);
    const serialized = serialize(root);
    const deserialized = deserialize(serialized);
    expect(deserialized).toEqual(root);
  });

  test('Official test case 4: root = [1,2]', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    const serialized = serialize(root);
    const deserialized = deserialize(serialized);
    expect(deserialized).toEqual(root);
  });

  test('[1,2,3,null,null,4,5,6,7]', () => {
    const root = new TreeNode(1);
    const node4 = new TreeNode(4, new TreeNode(6), new TreeNode(7));
    root.left = new TreeNode(2);
    root.right = new TreeNode(3, node4, new TreeNode(5));
    const serialized = serialize(root);
    expect(deserialize(serialized)).toEqual(root);
  });

  test('[1,null,2]', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    const serialized = serialize(root);
    const deserialized = deserialize(serialized);
    expect(deserialized).toEqual(root);
  });

  test('[4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2]', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(-7);
    root.right = new TreeNode(
      -3,
      new TreeNode(
        -9,
        new TreeNode(
          9,
          new TreeNode(
            6,
            new TreeNode(
              0,
              null,
              new TreeNode(-1)
            ),
            new TreeNode(
              6,
              new TreeNode(-4)
            )
          )
        ),
        new TreeNode(
          -7,
          new TreeNode(
            -6,
            new TreeNode(5)
          ),
          new TreeNode(
            -6,
            new TreeNode(
              9,
              new TreeNode(-2)
            )
          )
        )
      ),
      new TreeNode(
        -3,
        new TreeNode(-4)
      )
    );
    const serialized = serialize(root);
    expect(deserialize(serialized)).toEqual(root);
  });
});
