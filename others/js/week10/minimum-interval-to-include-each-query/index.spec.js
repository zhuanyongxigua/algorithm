import { minInterval } from './index.js';

describe('minInterval', () => {
  it('示例 1', () => {
    const intervals = [[1, 4], [2, 4], [3, 6], [4, 4]];
    const queries = [2, 3, 4, 5];
    expect(minInterval(intervals, queries)).toEqual([3, 3, 1, 4]);
  });

  it('示例 2', () => {
    const intervals = [[2, 3], [2, 5], [1, 8], [20, 25]];
    const queries = [2, 19, 5, 22];
    expect(minInterval(intervals, queries)).toEqual([2, -1, 4, 6]);
  });
});
