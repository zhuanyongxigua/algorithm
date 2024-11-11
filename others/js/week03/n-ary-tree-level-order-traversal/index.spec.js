import {
  // levelOrder,
  levelOrder2 as levelOrder
} from './index.js';


function _Node (val, children) {
  this.val = (val === undefined ? 0 : val);
  this.children = (children === undefined ? [] : children);
}

describe('levelOrder', () => {
  test('Official test case 1: root = [1,null,3,2,4,null,5,6] should return [[1],[3,2,4],[5,6]]', () => {
    const root = new _Node(1, [
      new _Node(3, [new _Node(5), new _Node(6)]),
      new _Node(2),
      new _Node(4)
    ]);
    expect(levelOrder(root)).toEqual([[1], [3, 2, 4], [5, 6]]);
  });

  test('Official test case 2: root = [] should return []', () => {
    expect(levelOrder(null)).toEqual([]);
  });

  test('Official test case 3: root = [1,null,2,3,4,null,5,null,6,7,null,8,9,10,null,11,null,12,null,13,null,14] should return [[1],[2,3,4],[5,6,7],[8,9,10],[11],[12],[13],[14]]', () => {
    const root = new _Node(1, [
      new _Node(2),
      new _Node(3, [new _Node(6), new _Node(7, [new _Node(11, [new _Node(14)])])]),
      new _Node(4, [new _Node(8, [new _Node(12)])]),
      new _Node(5, [new _Node(9, [new _Node(13)]), new _Node(10)])
    ]);
    expect(levelOrder(root)).toEqual([[1], [2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13], [14]]);
  });
});
