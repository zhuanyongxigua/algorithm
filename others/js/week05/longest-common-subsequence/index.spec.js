import { longestCommonSubsequence } from './index';

describe('Longest Common Subsequence', () => {
  // 基础测试用例
  test('Example 1', () => {
    expect(longestCommonSubsequence('abcde', 'ace')).toBe(3);
  });

  test('Example 2', () => {
    expect(longestCommonSubsequence('abc', 'abc')).toBe(3);
  });

  test('Example 3', () => {
    expect(longestCommonSubsequence('abc', 'def')).toBe(0);
  });

  // LeetCode 官方测试用例
  test('Official test case 1', () => {
    expect(longestCommonSubsequence('ABCDGH', 'AEDFHR')).toBe(3);
  });

  test('Official test case 2', () => {
    expect(longestCommonSubsequence('AGGTAB', 'GXTXAYB')).toBe(4);
  });

  test('Official test case 3', () => {
    expect(longestCommonSubsequence('bsbininm', 'jmjkbkjkv')).toBe(1);
  });

  test('Official test case 4', () => {
    expect(longestCommonSubsequence('pmjghexybyrgzczy', 'hafcdqbgncrcbihkd')).toBe(4);
  });

  // 边界情况
  test('Empty strings', () => {
    expect(longestCommonSubsequence('', '')).toBe(0);
  });

  test('One empty string', () => {
    expect(longestCommonSubsequence('', 'abc')).toBe(0);
    expect(longestCommonSubsequence('abc', '')).toBe(0);
  });

  test('Single character match', () => {
    expect(longestCommonSubsequence('a', 'a')).toBe(1);
  });

  test('Single character no match', () => {
    expect(longestCommonSubsequence('a', 'b')).toBe(0);
  });

  test('Identical strings', () => {
    expect(longestCommonSubsequence('abc', 'abc')).toBe(3);
  });

  test('Reversed strings', () => {
    expect(longestCommonSubsequence('abc', 'cba')).toBe(1);
  });

  test('Long strings with no common subsequence', () => {
    expect(longestCommonSubsequence('abcdefg', 'hijklmn')).toBe(0);
  });

  test('Complex case', () => {
    expect(longestCommonSubsequence('oxcpqrsvwf', 'shmtulqrypy')).toBe(2);
  });

  test('Maximum length constraint', () => {
    const text1 = 'a'.repeat(1000);
    const text2 = 'a'.repeat(1000);
    expect(longestCommonSubsequence(text1, text2)).toBe(1000);
  });

  test('Partial overlap', () => {
    expect(longestCommonSubsequence('ylqpejqbalahwr', 'yrkzavgdmdgtqpg')).toBe(3);
  });
});
