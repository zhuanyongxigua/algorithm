import {
  // longestIncreasingPath,
  longestIncreasingPathBFS as longestIncreasingPath
} from './index';


describe('longestIncreasingPath', () => {
  test('Example 1', () => {
    const matrix = [[9,9,4],[6,6,8],[2,1,1]];
    expect(longestIncreasingPath(matrix)).toBe(4);
  });

  test('Example 2', () => {
    const matrix = [[3,4,5],[3,2,6],[2,2,1]];
    expect(longestIncreasingPath(matrix)).toBe(4);
  });

  test('Example 3', () => {
    const matrix = [[1]];
    expect(longestIncreasingPath(matrix)).toBe(1);
  });
});
