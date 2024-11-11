import { largestRectangleArea } from '.';


describe('largestRectangleArea', () => {
  test('Official test case 1: heights = [2,1,5,6,2,3] should return 10', () => {
    expect(largestRectangleArea([2,1,5,6,2,3])).toBe(10);
  });

  test('Official test case 2: heights = [2,4] should return 4', () => {
    expect(largestRectangleArea([2,4])).toBe(4);
  });

  test('[1]', () => {
    expect(largestRectangleArea([1])).toBe(1);
  });

  test('[4, 2]', () => {
    expect(largestRectangleArea([4, 2])).toBe(4);
  });

  test('[2, 1, 2]', () => {
    expect(largestRectangleArea([2, 1, 2])).toBe(3);
  });

  test('[5, 4, 1, 2]', () => {
    expect(largestRectangleArea([5, 4, 1, 2])).toBe(8);
  });

  test('[4, 2, 0, 3, 2, 5]', () => {
    expect(largestRectangleArea([4, 2, 0, 3, 2, 5])).toBe(6);
  });

  test('[3,6,5,7,4,8,1,0]', () => {
    expect(largestRectangleArea([3,6,5,7,4,8,1,0])).toBe(20);
  });

  test('[5,5,1,7,1,1,5,2,7,6]', () => {
    expect(largestRectangleArea([5,5,1,7,1,1,5,2,7,6])).toBe(12);
  });

  test('[0,1,0,1]', () => {
    expect(largestRectangleArea([0, 1, 0, 1])).toBe(1);
  });
});
