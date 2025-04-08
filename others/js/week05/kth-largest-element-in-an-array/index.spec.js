import { findKthLargest } from './index';

describe('Sort Array', () => {
  test('[3, 2, 1, 5, 6, 4]', () => {
    for (let i = 0; i < 100; i++) {
      const input = [3, 2, 1, 5, 6, 4];
      const expected = 5;
      expect(findKthLargest(input, 2)).toEqual(expected);
    }
  });
});
