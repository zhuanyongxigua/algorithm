import {
  // generateParenthesis,
  generateParenthesis2 as generateParenthesis
} from './index.js';


describe('generateParenthesis', () => {
  test('Official test case 1: n = 3 should return ["((()))","(()())","(())()","()(())","()()()"]', () => {
    const result = generateParenthesis(3);
    const expected = ['((()))','(()())','(())()','()(())','()()()'];
    expect(result.length).toBe(expected.length);
    expected.forEach(item => {
      expect(result).toContain(item);
    });
  });

  test('Official test case 2: n = 1 should return ["()"]', () => {
    expect(generateParenthesis(1)).toEqual(['()']);
  });
});
