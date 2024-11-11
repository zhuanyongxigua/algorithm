import { subsets } from '.';


describe('Subsets', () => {
  test('returns all subsets for [1, 2, 3]', () => {
    const nums = [1, 2, 3];
    const expected = [
      [], [1], [2],
      [1, 2], [3], [1, 3], [2, 3],
      [1, 2, 3]
    ];
    const result = subsets(nums);
    expect(result.length).toBe(expected.length);
    result.forEach(subset => {
      expect(expected).toEqual(expect.arrayContaining([expect.arrayContaining(subset)]));
    });
  });

  test('returns all subsets for [0]', () => {
    const nums = [0];
    const expected = [[], [0]];
    const result = subsets(nums);
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
