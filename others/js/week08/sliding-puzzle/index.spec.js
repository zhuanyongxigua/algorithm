import { slidingPuzzle } from './index.js';

describe('slidingPuzzle', () => {
  test('示例 1: [[1,2,3],[4,0,5]] 应该返回 1', () => {
    const board = [[1,2,3],[4,0,5]];
    expect(slidingPuzzle(board)).toBe(1);
  });

  test('示例 2: [[1,2,3],[5,4,0]] 应该返回 -1', () => {
    const board = [[1,2,3],[5,4,0]];
    expect(slidingPuzzle(board)).toBe(-1);
  });

  test('示例 3: [[4,1,2],[5,0,3]] 应该返回 5', () => {
    const board = [[4,1,2],[5,0,3]];
    expect(slidingPuzzle(board)).toBe(5);
  });
});
