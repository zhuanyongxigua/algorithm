import { myPow } from './index.js';


describe('myPow', () => {
  test('Official test case 1: x = 2.00000, n = 10 should return 1024.00000', () => {
    expect(myPow(2.00000, 10)).toBeCloseTo(1024.00000, 5);
  });

  test('Official test case 2: x = 2.10000, n = 3 should return 9.26100', () => {
    expect(myPow(2.10000, 3)).toBeCloseTo(9.26100, 5);
  });

  test('Official test case 3: x = 2.00000, n = -2 should return 0.25000', () => {
    expect(myPow(2.00000, -2)).toBeCloseTo(0.25000, 5);
  });
});
