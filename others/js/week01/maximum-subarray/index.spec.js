import { maxSubArray } from '.';


describe('maxSubArray', () => {
  test('Official test case 1: nums = [-2,1,-3,4,-1,2,1,-5,4] should return 6', () => {
    expect(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])).toBe(6);
  });

  test('Official test case 2: nums = [1] should return 1', () => {
    expect(maxSubArray([1])).toBe(1);
  });

  test('Official test case 3: nums = [5,4,-1,7,8] should return 23', () => {
    expect(maxSubArray([5,4,-1,7,8])).toBe(23);
  });

  test('[-1]', () => {
    expect(maxSubArray([-1])).toBe(-1);
  });

  test('[-2, -1]', () => {
    expect(maxSubArray([-2, -1])).toBe(-1);
  });

  test('[-1, 0]', () => {
    expect(maxSubArray([-1, 0])).toBe(0);
  });

  test('[-2, -3, -1]', () => {
    expect(maxSubArray([-2, -3, -1])).toBe(-1);
  });
});
