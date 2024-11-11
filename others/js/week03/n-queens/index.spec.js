import { solveNQueens } from './index';

describe('solveNQueens', () => {
  test('Example 1: n = 4', () => {
    const expected = [
      ['.Q..','...Q','Q...','..Q.'],
      ['..Q.','Q...','...Q','.Q..']
    ];
    expect(solveNQueens(4)).toEqual(expect.arrayContaining(expected));
    expect(solveNQueens(4)).toHaveLength(2);
  });

  test('Example 2: n = 1', () => {
    const expected = [['Q']];
    expect(solveNQueens(1)).toEqual(expected);
  });
});
