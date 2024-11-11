import { findRedundantConnection } from '.';


describe('findRedundantConnection Tests', () => {
  test('Simple cycle', () => {
    expect(findRedundantConnection([[1, 2], [1, 3], [2, 3]])).toEqual([2, 3]);
  });

  test('Multiple options, last one in input', () => {
    expect(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])).toEqual([1, 4]);
  });

  test('[[2,7],[7,8],[3,6],[2,5],[6,8],[4,8],[2,8],[1,8],[7,10],[3,9]]', () => {
    expect(findRedundantConnection([[2,7],[7,8],[3,6],[2,5],[6,8],[4,8],[2,8],[1,8],[7,10],[3,9]])).toEqual([2, 8]);
  });
});
