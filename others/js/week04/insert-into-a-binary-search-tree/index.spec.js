import {
  insertIntoBST,
  TreeNode
} from './index';

describe('insertIntoBST - Official Test Cases', () => {
  // Helper function to create tree from array
  function arrayToTree(arr) {
    if (!arr.length) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      
      // Left child
      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i++;
      
      // Right child
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  }

  test('Official Example 1: Insert 5 into [4,2,7,1,3]', () => {
    const root = arrayToTree([4,2,7,1,3]);
    const val = 5;
    const result = insertIntoBST(root, val);
    const expected = arrayToTree([4,2,7,1,3,5]);
    expect(result).toEqual(expected);
  });

  test('Official Example 2: Insert 25 into [40,20,60,10,30,50,70]', () => {
    const root = arrayToTree([40,20,60,10,30,50,70]);
    const val = 25;
    const result = insertIntoBST(root, val);
    const expected = arrayToTree([40,20,60,10,30,50,70,null,null,25]);
    expect(result).toEqual(expected);
  });

  test('Official Example 3: Insert 5 into sparse tree [4,2,7,1,3,null,null,null,null,null,null]', () => {
    const root = arrayToTree([4,2,7,1,3,null,null, null, null, null, null]);
    const val = 5;
    const result = insertIntoBST(root, val);
    const expected = arrayToTree([4,2,7,1,3,5]);
    expect(result).toEqual(expected);
  });
});
