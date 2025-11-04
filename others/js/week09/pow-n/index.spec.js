import { myPow } from './index.js';

describe('myPow', () => {
  test('2.00000^10 should return 1024.00000', () => {
    expect(myPow(2.00000, 10)).toBeCloseTo(1024.00000, 5);
  });

  test('2.10000^3 should return 9.26100', () => {
    expect(myPow(2.10000, 3)).toBeCloseTo(9.26100, 5);
  });

  test('2.00000^-2 should return 0.25000', () => {
    expect(myPow(2.00000, -2)).toBeCloseTo(0.25000, 5);
  });

  test('2.00000^-2147483648 should return 0.00000', () => {
    expect(myPow(2.00000, -2147483648)).toBeCloseTo(0.00000, 5);
  });
});
