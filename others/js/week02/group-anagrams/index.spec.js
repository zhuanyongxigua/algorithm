import { groupAnagrams } from './index.js';

describe('groupAnagrams', () => {
  test('Official test case 1: strs = ["eat","tea","tan","ate","nat","bat"] should return [["bat"],["nat","tan"],["ate","eat","tea"]]', () => {
    const result = groupAnagrams(['eat','tea','tan','ate','nat','bat']);
    const expected = [['bat'],['nat','tan'],['ate','eat','tea']];
    expect(result.length).toBe(expected.length);
    expected.forEach(group => {
      expect(result).toEqual(expect.arrayContaining([expect.arrayContaining(group)]));
    });
  });

  test('Official test case 2: strs = [""] should return [[""]]', () => {
    expect(groupAnagrams([''])).toEqual([['']]);
  });

  test('Official test case 3: strs = ["a"] should return [["a"]]', () => {
    expect(groupAnagrams(['a'])).toEqual([['a']]);
  });
});
