import { findSubstring } from './index.js';

describe('findSubstring', () => {
  test('Official test case 1: s = "barfoothefoobarman", words = ["foo","bar"] should return [0,9]', () => {
    expect(findSubstring('barfoothefoobarman', ['foo','bar'])).toEqual([0,9]);
  });

  test('Official test case 2: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"] should return []', () => {
    expect(findSubstring('wordgoodgoodgoodbestword', ['word','good','best','word'])).toEqual([]);
  });

  test('Official test case 3: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"] should return [6,9,12]', () => {
    expect(findSubstring('barfoofoobarthefoobarman', ['bar','foo','the'])).toEqual([6,9,12]);
  });

  test('"lingmindraboofooowingdingbarrwingmonkeypoundcake"', () => {
    expect(findSubstring('lingmindraboofooowingdingbarrwingmonkeypoundcake', ['fooo','barr','wing','ding','wing'])).toEqual([13]);
  });

  test('"wordgoodgoodgoodbestword"', () => {
    expect(findSubstring('wordgoodgoodgoodbestword', ['word','good','best','good'])).toEqual([8]);
  });
});
