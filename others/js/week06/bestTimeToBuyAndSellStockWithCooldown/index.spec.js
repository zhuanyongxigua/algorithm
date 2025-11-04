import { maxProfit } from './index.js';

describe('Best Time to Buy and Sell Stock with Cooldown', () => {
  test('示例 1: prices = [1,2,3,0,2] 应该返回 3', () => {
    const prices = [1, 2, 3, 0, 2];
    const result = maxProfit(prices);
    expect(result).toBe(3);
  });

  test('示例 2: prices = [1] 应该返回 0', () => {
    const prices = [1];
    const result = maxProfit(prices);
    expect(result).toBe(0);
  });
});
