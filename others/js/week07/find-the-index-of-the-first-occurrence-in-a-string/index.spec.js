import { strStr } from './index.js';

describe('Find the index of the first occurrence in a string', () => {
  test('示例 1: haystack = "sadbutsad", needle = "sad"', () => {
    const haystack = "sadbutsad";
    const needle = "sad";
    const result = strStr(haystack, needle);
    expect(result).toBe(0);
  });

  test('示例 2: haystack = "leetcode", needle = "leeto"', () => {
    const haystack = "leetcode";
    const needle = "leeto";
    const result = strStr(haystack, needle);
    expect(result).toBe(-1);
  });

  test('示例 2: haystack = "hello", needle = "ll"', () => {
    const haystack = "hello";
    const needle = "ll";
    const result = strStr(haystack, needle);
    expect(result).toBe(2);
  });

  test('示例 2: haystack = "a", needle = "a"', () => {
    const haystack = "a";
    const needle = "a";
    const result = strStr(haystack, needle);
    expect(result).toBe(0);
  });

  test('示例 2: haystack = "mississippi", needle = "issip"', () => {
    const haystack = "mississippi";
    const needle = "issip";
    const result = strStr(haystack, needle);
    expect(result).toBe(4);
  });
});
