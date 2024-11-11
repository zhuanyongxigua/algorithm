import {
  // canFinish,
  canFinish2 as canFinish
} from '.';


describe('Course Schedule Tests', () => {
  test('should handle a linear dependency', () => {
    expect(canFinish(2, [[1, 0]])).toBe(true);
  });

  test('should return false for a simple cycle', () => {
    expect(canFinish(2, [[1, 0], [0, 1]])).toBe(false);
  });

  test('20, [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]]', () => {
    expect(canFinish(20, [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]])).toBe(false);
  });

  test('5, [[2, 1], [3, 1], [4, 2], [4, 3], [5, 4]]', () => {
    expect(canFinish(5, [[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]])).toBe(true);
  });
});
