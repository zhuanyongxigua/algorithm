import {
  // findOrder,
  findOrder2 as findOrder
} from '.';


describe('Course Schedule Tests', () => {
  test('should handle a linear dependency', () => {
    const result = findOrder(2, [[1, 0]]);
    expect(result).toEqual([0, 1]);
  });

  test('should return false for a simple cycle', () => {
    expect(findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])).toEqual([0, 2, 1, 3]);
  });

  test('1, []', () => {
    expect(findOrder(1, [])).toEqual([0]);
  });

  test('3, [[1,0],[1,2],[0,1]]', () => {
    expect(findOrder(3, [[1,0],[1,2],[0,1]])).toEqual([]);
  });

  test('2, [[1, 0]]', () => {
    expect(findOrder(2, [[1, 0]])).toEqual([0, 1]);
  });
});
