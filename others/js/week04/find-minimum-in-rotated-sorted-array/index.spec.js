import { findMin } from './index';

describe('Find Minimum in Rotated Sorted Array', () => {
  test('should find minimum in [3,4,5,1,2]', () => {
    expect(findMin([3,4,5,1,2])).toBe(1);
  });

  test('should find minimum in [4,5,6,7,0,1,2]', () => {
    expect(findMin([4,5,6,7,0,1,2])).toBe(0);
  });

  test('should find minimum in [11,13,15,17]', () => {
    expect(findMin([11,13,15,17])).toBe(11);
  });

  test('[2, 1]', () => {
    expect(findMin([2, 1])).toBe(1);
  })
});
