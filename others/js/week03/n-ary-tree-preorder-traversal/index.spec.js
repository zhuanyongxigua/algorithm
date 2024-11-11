import { preorder } from './index.js';


function _Node (val, children) {
  this.val = (val === undefined ? 0 : val);
  this.children = (children === undefined ? [] : children);
}

describe('preorder', () => {
  test('Official test case 1: root = [1,null,3,2,4,null,5,6] should return [1,3,5,6,2,4]', () => {
    const root = new _Node(1, [
      new _Node(3, [new _Node(5), new _Node(6)]),
      new _Node(2),
      new _Node(4)
    ]);
    expect(preorder(root)).toEqual([1, 3, 5, 6, 2, 4]);
  });

  test('Official test case 2: root = [] should return []', () => {
    expect(preorder(null)).toEqual([]);
  });

  test('Official test case 3: root = [1,null,2,3,4,null,5,null,6,7,null,8,9,10,null,11,null,12,null,13,null,14] should return [1,2,3,6,7,11,14,4,8,12,5,9,13,10]', () => {
    const root = new _Node(1, [
      new _Node(2),
      new _Node(3, [new _Node(6), new _Node(7, [new _Node(11, [new _Node(14)])])]),
      new _Node(4, [new _Node(8, [new _Node(12)])]),
      new _Node(5, [new _Node(9, [new _Node(13)]), new _Node(10)])
    ]);
    expect(preorder(root)).toEqual([1, 2, 3, 6, 7, 11, 14, 4, 8, 12, 5, 9, 13, 10]);
  });
});
