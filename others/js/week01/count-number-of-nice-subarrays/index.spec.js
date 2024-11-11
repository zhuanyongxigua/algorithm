import { numberOfSubarrays } from '.';


describe('numberOfSubarrays', () => {
  test('Official test case 1: nums = [1,1,2,1,1], k = 3 should return 2', () => {
    expect(numberOfSubarrays([1,1,2,1,1], 3)).toBe(2);
  });

  test('Official test case 2: nums = [2,4,6], k = 1 should return 0', () => {
    expect(numberOfSubarrays([2,4,6], 1)).toBe(0);
  });

  test('Official test case 3: nums = [2,2,2,1,2,2,1,2,2,2], k = 2 should return 16', () => {
    expect(numberOfSubarrays([2,2,2,1,2,2,1,2,2,2], 2)).toBe(16);
  });

  test('[2044,96397,50143]', () => {
    expect(numberOfSubarrays([2044,96397,50143], 1)).toBe(3);
  });
});
