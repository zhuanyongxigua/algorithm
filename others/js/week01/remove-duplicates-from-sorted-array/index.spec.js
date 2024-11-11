import { removeDuplicates } from './index.js';


describe('Test removeDuplicates', () => {
  test('Official unit test case 1', () => {
    const nums = [1, 1, 2];
    const length = removeDuplicates(nums);
    expect(length).toEqual(2);
    expect(nums.slice(0, length)).toEqual([1, 2]);
  });

  test('Official unit test case 2', () => {
    const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    const length = removeDuplicates(nums);
    expect(length).toEqual(5);
    expect(nums.slice(0, length)).toEqual([0, 1, 2, 3, 4]);
  });
});
