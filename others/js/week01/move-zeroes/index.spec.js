import { moveZeroes } from './index.js'


describe('Test moveZeros', () => {
  test('Official unit test case 1', () => {
    const nums = [0, 1, 0, 3, 12];
    expect(moveZeroes(nums)).toEqual([1, 3, 12, 0, 0]);
  });

  test('Official unit test case 2', () => {
    const nums = [0];
    expect(moveZeroes(nums)).toEqual([0]);
  });

  test('[1, 0, 1]', () => {
    const nums = [1, 0, 1];
    expect(moveZeroes(nums)).toEqual([1, 1, 0]);
  })
});
