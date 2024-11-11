import { NumMatrix } from '.';


describe('NumMatrix', () => {
  let numMatrix;

  beforeAll(() => {
    const matrix = [
      [3, 0, 1, 4, 2],
      [5, 6, 3, 2, 1],
      [1, 2, 0, 1, 5],
      [4, 1, 0, 1, 7],
      [1, 0, 3, 0, 5]
    ];
    numMatrix = new NumMatrix(matrix);
  });

  test('sumRegion(2, 1, 4, 3) returns 8', () => {
    expect(numMatrix.sumRegion(2, 1, 4, 3)).toBe(8);
  });

  test('sumRegion(1, 1, 2, 2) returns 11', () => {
    expect(numMatrix.sumRegion(1, 1, 2, 2)).toBe(11);
  });

  test('sumRegion(1, 2, 2, 4) returns 12', () => {
    expect(numMatrix.sumRegion(1, 2, 2, 4)).toBe(12);
  });
});
