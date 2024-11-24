import {
  // deleteNode,
  deleteNode2 as deleteNode
} from '.'

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

function arrayToBST(arr) {
  if (!arr.length) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (i < arr.length) {
    let current = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]);
      queue.push(current.right);
    }
    i++;
  }
  return root; s
}

describe('deleteNode', () => {
  test('case 1: delete node with two children', () => {
    // Create tree: [5,3,6,2,4,null,7]
    const root = new TreeNode(5)
    root.left = new TreeNode(3)
    root.right = new TreeNode(6)
    root.left.left = new TreeNode(2)
    root.left.right = new TreeNode(4)
    root.right.right = new TreeNode(7)

    const result = deleteNode(root, 3)

    // Verify structure after deletion
    expect(result.val).toBe(5)
    expect(result.left.val).toBe(4)  // or could be 2, both are valid
    expect(result.right.val).toBe(6)
    expect(result.right.right.val).toBe(7)
    // Verify BST property is maintained
    expect(result.left.val < result.val).toBe(true)
    expect(result.right.val > result.val).toBe(true)
  })

  test('case 2: delete non-existent node', () => {
    // Create tree: [5,3,6,2,4,null,7]
    const root = new TreeNode(5)
    root.left = new TreeNode(3)
    root.right = new TreeNode(6)
    root.left.left = new TreeNode(2)
    root.left.right = new TreeNode(4)
    root.right.right = new TreeNode(7)

    const result = deleteNode(root, 0)

    // Tree should remain unchanged
    expect(result).toEqual(root)
  })

  test('case 3: delete from empty tree', () => {
    const result = deleteNode(null, 0)
    expect(result).toBe(null)
  })

  test('[0]', () => {
    const root = new TreeNode(0);
    const result = deleteNode(root, 0);
    expect(result).toEqual(null);
  })

  test('case 1: delete 5', () => {
    // Create tree: [5,3,6,2,4,null,7]
    const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(4);
    root.right.right = new TreeNode(7);

    const result = deleteNode(root, 5);

    console.log('result', result);
  })

  test('[50,30,70,null,40,60,80], key = 50', () => {
    const root = new TreeNode(50);
    root.left = new TreeNode(30);
    root.right = new TreeNode(70);
    root.left.right = new TreeNode(40);
    root.right.left = new TreeNode(60);
    root.right.right = new TreeNode(80);

    const result = deleteNode(root, 50);

    console.log('result', result);
  })

  test('[2,0,33,null,1,25,40,null,null,11,31,34,45,10,18,29,32,null,36,43,46,4,null,12,24,26,30,null,null,35,39,42,44,null,48,3,9,null,14,22,null,null,27,null,null,null,null,38,null,41,null,null,null,47,49,null,null,5,null,13,15,21,23,null,28,37,null,null,null,null,null,null,null,null,8,null,null,null,17,19,null,null,null,null,null,null,null,7,null,16,null,null,20,6], key = 33', () => {
    const bst = arrayToBST([2, 0, 33, null, 1, 25, 40, null, null, 11, 31, 34, 45, 10, 18, 29, 32, null, 36, 43, 46, 4, null, 12, 24, 26, 30, null, null, 35, 39, 42, 44, null, 48, 3, 9, null, 14, 22, null, null, 27, null, null, null, null, 38, null, 41, null, null, null, 47, 49, null, null, 5, null, 13, 15, 21, 23, null, 28, 37, null, null, null, null, null, null, null, null, 8, null, null, null, 17, 19, null, null, null, null, null, null, null, 7, null, 16, null, null, 20, 6]);
    console.log('bst', bst);

  })
})
