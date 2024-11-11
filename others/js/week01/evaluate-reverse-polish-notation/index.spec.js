import { evalRPN } from '.';


describe('evalRPN', () => {
  test('Official test case 1: ["2", "1", "+", "3", "*"] should return 9', () => {
    expect(evalRPN(['2', '1', '+', '3', '*'])).toBe(9);
  });

  test('Official test case 2: ["4", "13", "5", "/", "+"] should return 6', () => {
    expect(evalRPN(['4', '13', '5', '/', '+'])).toBe(6);
  });

  test('Official test case 3: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] should return 22', () => {
    expect(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])).toBe(22);
  });

  test('11+2+34*+', () => {
    expect(evalRPN(['1', '1', '+', '2', '+', '3', '4', '*', '+'])).toBe(16);
  });
});
