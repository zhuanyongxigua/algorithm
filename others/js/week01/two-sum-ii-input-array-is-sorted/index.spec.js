import { twoSum } from './index.js';

describe('twoSum', () => {
  test('Official test case 1: numbers = [2,7,11,15], target = 9 should return [1,2]', () => {
    expect(twoSum([2,7,11,15], 9)).toEqual([1,2]);
  });

  test('Official test case 2: numbers = [2,3,4], target = 6 should return [1,3]', () => {
    expect(twoSum([2,3,4], 6)).toEqual([1,3]);
  });

  test('Official test case 3: numbers = [-1,0], target = -1 should return [1,2]', () => {
    expect(twoSum([-1,0], -1)).toEqual([1,2]);
  });
});
