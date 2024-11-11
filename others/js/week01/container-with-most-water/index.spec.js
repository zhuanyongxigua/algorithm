import { maxArea } from '.';


describe('maxArea', () => {
  test('Official test case 1: height = [1,8,6,2,5,4,8,3,7] should return 49', () => {
    expect(maxArea([1,8,6,2,5,4,8,3,7])).toBe(49);
  });

  test('Official test case 2: height = [1,1] should return 1', () => {
    expect(maxArea([1,1])).toBe(1);
  });

  test('[1, 2, 4, 3]', () => {
    expect(maxArea([1, 2, 4, 3])).toBe(4);
  });
});
