import { inorderSuccessor } from '.'

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

describe('inorderSuccessor', () => {
  test('case 1', () => {
    // Create tree: [2,1,3], p = 1
    const root = new TreeNode(2)
    root.left = new TreeNode(1)
    root.right = new TreeNode(3)
    
    const result = inorderSuccessor(root, root.left)
    expect(result).toBe(root)
  })

  test('case 2', () => {
    // Create tree: [5,3,6,2,4,null,null,1], p = 6
    const root = new TreeNode(5)
    root.left = new TreeNode(3)
    root.right = new TreeNode(6)
    root.left.left = new TreeNode(2)
    root.left.right = new TreeNode(4)
    root.left.left.left = new TreeNode(1)
    
    const result = inorderSuccessor(root, root.right)
    expect(result).toBe(null)
  })

  test('case 3', () => {
    // Create tree: [5,3,6,2,4,null,null,1], p = 1
    const root = new TreeNode(5)
    root.left = new TreeNode(3)
    root.right = new TreeNode(6)
    root.left.left = new TreeNode(2)
    root.left.right = new TreeNode(4)
    root.left.left.left = new TreeNode(1)
    
    const result = inorderSuccessor(root, root.left.left.left)
    expect(result).toBe(root.left.left)
  })

  test('case 4', () => {
    // Create tree: [45,30,46,10,36,null,49,8,24,34,42,48,null,4,9,14,25,31,35,41,43,47,null,0,6,null,null,11,20,null,28,null,33,null,null,37,null,null,44,null,null,null,1,5,7,null,12,19,21,26,29,32,null,null,38,null,null,null,3,null,null,null,null,null,13,18,null,null,22,null,27,null,null,null,null,null,39,2,null,null,null,15,null,null,23,null,null,null,40,null,null,null,16,null,null,null,null,null,17]
    const root = new TreeNode(45)
    
    // Level 1
    root.left = new TreeNode(30)
    root.right = new TreeNode(46)
    
    // Level 2
    root.left.left = new TreeNode(10)
    root.left.right = new TreeNode(36)
    root.right.right = new TreeNode(49)
    
    // Level 3
    root.left.left.left = new TreeNode(8)
    root.left.left.right = new TreeNode(24)
    root.left.right.left = new TreeNode(34)
    root.left.right.right = new TreeNode(42)
    root.right.right.left = new TreeNode(48)
    
    // Level 4 (and relevant branches)
    root.right.right.left.left = new TreeNode(47)  // This is our target node (p)
    root.right.right.left.right = null
    
    const result = inorderSuccessor(root, root.right.right.left.left)
    expect(result).toBe(root.right.right.left)  // Expected successor is 48
  })
})


