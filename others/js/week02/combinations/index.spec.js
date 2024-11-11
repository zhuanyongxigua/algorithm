import { combine } from '.';


describe('Combinations', () => {
  test('combinations of 4 choose 2', () => {
    expect(combine(4, 2)).toEqual(expect.arrayContaining([
      [2, 4], [3, 4], [2, 3], [1, 2], [1, 3], [1, 4]
    ]));
    expect(combine(4, 2).length).toBe(6);
  });

  test('combinations of 1 choose 1', () => {
    expect(combine(1, 1)).toEqual(expect.arrayContaining([[1]]));
    expect(combine(1, 1).length).toBe(1);
  });
});
