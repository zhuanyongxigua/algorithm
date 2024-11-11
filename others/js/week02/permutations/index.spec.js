import { permute } from '.';


describe('Permutations', () => {
  test('permutations of [1, 2, 3]', () => {
    expect(permute([1, 2, 3])).toEqual(expect.arrayContaining([
      [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]
    ]));
    expect(permute([1, 2, 3]).length).toBe(6);
  });

  test('permutations of [0, 1]', () => {
    expect(permute([0, 1])).toEqual(expect.arrayContaining([
      [0, 1], [1, 0]
    ]));
    expect(permute([0, 1]).length).toBe(2);
  });

  test('permutations of [1]', () => {
    expect(permute([1])).toEqual(expect.arrayContaining([
      [1]
    ]));
    expect(permute([1]).length).toBe(1);
  });
});
