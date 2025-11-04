import { isMatch } from ".";

describe('longestPalindrome', () => {
  test('mississippi, mis*is*ip*.', () => {
    const result = isMatch('mississippi', 'mis*is*ip*.');
    expect(result).toEqual(1);
  })

  test('aaa, ab*ac*a', () => {
    const result = isMatch('aaa', 'ab*ac*a');
    expect(result).toEqual(1);
  })

  test('abbaaaabaabbcba, a*.*ba.*c*..a*.a*.', () => {
    const result = isMatch('abbaaaabaabbc', 'a*.*ba.*c*..');
    expect(result).toEqual(1);
  })

  test('ab, .*c', () => {
    const result = isMatch('aa', '.*c');
    expect(result).toEqual(0);
  })

  test('b, a*.', () => {
    const result = isMatch('bc', 'c*..');
    expect(result).toEqual(1);
  })
})
