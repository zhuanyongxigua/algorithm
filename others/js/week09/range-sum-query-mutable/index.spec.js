import { NumArray } from "."

describe('Range Sum Query Mutable', () => {
  test('Example 1', () => {
    const numArray = new NumArray([1, 3, 5]);

    // numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
    expect(numArray.sumRange(0, 2)).toBe(9);

    // numArray.update(1, 2);   // nums = [1,2,5]
    numArray.update(1, 2);

    // numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
    expect(numArray.sumRange(0, 2)).toBe(8);
  });
});