import { mergeStones } from './index.js';

describe('Merge stones', () => {
  test('示例 1: stones = [3, 2, 4, 1], k = 2', () => {
    const stones = [3, 2, 4, 1];
    const result = mergeStones(stones, 2);
    expect(result).toBe(20);
  });

  test('示例 2: stones = [3, 2, 4, 1], k = 3', () => {
    const stones = [3, 2, 4, 1];
    const result = mergeStones(stones, 3);
    expect(result).toBe(-1);
  });

  test('示例 3: stones = [3, 5, 1, 2, 6], k = 3', () => {
    const stones = [3, 5, 1, 2, 6];
    const result = mergeStones(stones, 3);
    expect(result).toBe(25);
  });

  test('示例 4: stones = [6,4,9,3,1], k = 3', () => {
    const stones = [6,4,9,3,1];
    const result = mergeStones(stones, 3);
    expect(result).toBe(36);
  });

  test('示例 5: stones = [25,68,35,62,52,57,35,83,40,51,30,20,51], k = 7', () => {
    const stones = [25,68,35,62,52,57,35,83,40,51,30,20,51];
    const result = mergeStones(stones, 7);
    expect(result).toBe(919);
  });

  test('示例 6: stones = [22,91,24,26,21,100,42,23,56,64,43,95,76,84,79,89], k = 6', () => {
    const stones = [22,91,24,26,21,100,42,23,56,64,43,95,76,84,79,89];
    const result = mergeStones(stones, 6);
    expect(result).toBe(1542);
  });
});
