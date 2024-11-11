import { calculate, evalRPN } from '.';
import { calculate as directlyCal, getBracketEnd, parse } from './directly';


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

describe('calculate function for basic-calculator problem', () => {
  test('Official test case 1: "1 + 1" should return 2', () => {
    expect(calculate('1 + 1')).toBe(2);
    expect(directlyCal('1 + 1')).toBe(2);
  });

  test('Official test case 2: " 2-1 + 2 " should return 3', () => {
    expect(calculate(' 2-1 + 2 ')).toBe(3);
    expect(directlyCal(' 2-1 + 2 ')).toBe(3);
  });

  test('Official test case 3: "(1+(4+5+2)-3)+(6+8)" should return 23', () => {
    expect(calculate('(1+(4+5+2)-3)+(6+8)')).toBe(23);
    expect(directlyCal('(1+(4+5+2)-3)+(6+8)')).toBe(23);
  });

  test('(-48)+(+48)', () => {
    expect(calculate('(-48)+(+48)')).toBe(0);
    expect(directlyCal('(-48)+(+48)')).toBe(0);
  });

  test('0', () => {
    expect(calculate('0')).toBe(0);
    expect(directlyCal('0')).toBe(0);
  });

  test(' 2-1 + 2 ', () => {
    expect(calculate(' 2-1 + 2 ')).toBe(3);
    expect(directlyCal(' 2-1 + 2 ')).toBe(3);
  });

  test('1-(     -2)', () => {
    expect(calculate('1-(     -2)')).toBe(3);
    expect(directlyCal('1-(     -2)')).toBe(3);
  });

  test('-2+ 1', () => {
    expect(calculate('-2+ 1')).toBe(-1);
    expect(directlyCal('-2+ 1')).toBe(-1);
  });

  test('- (3 + (4 + 5))', () => {
    expect(calculate('- (3 + (4 + 5))')).toBe(-12);
    expect(directlyCal('- (3 + (4 + 5))')).toBe(-12);
  });

  test('(4+9)', () => {
    expect(calculate('(4+9)')).toBe(13);
    expect(directlyCal('(4+9)')).toBe(13);
  });
});

describe('Test getBracketEnd', () => {
  test('(1 + (1 + 2 ))', () => {
    const result = getBracketEnd('(1 + (1 + 2 ))', 0);
    expect(result).toBe(13);
  });
});

describe('Test parse', () => {
  test('1 + 1', () => {
    const str = '1 + 1';
    const result = parse(str, 0, str.length - 1);
    expect(result).toEqual([1, '+', 1]);
  });

  test('1 + (1 + (1 + 1)) + 1', () => {
    const str = '1 + (1 + (1 + 1)) + 1';
    const result = parse(str, 0, str.length - 1);
    expect(result).toEqual([1, '+', [1, '+', [1, '+', 1]], '+', 1]);
  });
});
