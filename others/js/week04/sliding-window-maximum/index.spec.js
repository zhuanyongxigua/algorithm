import {
  // maxSlidingWindow,
  maxSlidingWindow2 as maxSlidingWindow
} from './index';


describe('maxSlidingWindow', () => {
  test('returns correct max values for window size 3', () => {
    const nums = [1,3,-1,-3,5,3,6,7];
    const k = 3;
    const expected = [3,3,5,5,6,7];
    expect(maxSlidingWindow(nums, k)).toEqual(expected);
  });

  test('returns correct max values for window size 1', () => {
    const nums = [1];
    const k = 1;
    const expected = [1];
    expect(maxSlidingWindow(nums, k)).toEqual(expected);
  });

  test('[1, -1]', () => {
    expect(maxSlidingWindow([1, -1], 1)).toEqual([1, -1]);
  });

  test('[9,10,9,-7,-4,-8,2,-6]', () => {
    expect(maxSlidingWindow([9,10,9,-7,-4,-8,2,-6], 5)).toEqual([10,10,9,2]);
  });

  test('[9, 8, 9, 8]', () => {
    expect(maxSlidingWindow([9, 8, 9, 8], 3)).toEqual([9, 9]);
  })
});
