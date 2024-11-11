import { threeSum } from './index.js';

describe('threeSum', () => {
  test('Official test case 1: nums = [-1,0,1,2,-1,-4] should return [[-1,-1,2],[-1,0,1]]', () => {
    const result = threeSum([-1,0,1,2,-1,-4]);
    expect(result).toEqual(expect.arrayContaining([[-1, 2,-1],[0,1, -1]]));
  });

  test('Official test case 2: nums = [0, 1, 1] should return []', () => {
    expect(threeSum([0, 1, 1])).toEqual([]);
  });

  test('Official test case 3: nums = [0, 0, 0] should return []', () => {
    expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  test('[0, 0, 0, 0]', () => {
    expect(threeSum([0, 0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  test('[1, -1, -1, 0]', () => {
    expect(threeSum([1, -1, -1, 0])).toEqual([[0, 1, -1]]);
  });

  test('[-2, 0, 1, 1, 2]', () => {
    expect(threeSum([-2, 0, 1, 1, 2])).toEqual([[0, 2, -2], [1, 1, -2]]);
  });
});
