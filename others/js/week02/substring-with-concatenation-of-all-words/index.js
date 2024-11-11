// https://leetcode.cn/problems/substring-with-concatenation-of-all-words/
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = function (s, words) {
  const map = {};
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (map[word]) {
      map[word] += 1;
      continue;
    }
    map[word] = 1;
  }

  function compare (hashMap1, hashMap2) {
    for (const key in hashMap1) {
      if (hashMap1[key] === 0) {
        continue;
      }
      if (hashMap1[key] !== hashMap2[key]) {
        return false;
      }
    }
    for (const key in hashMap2) {
      if (hashMap2[key] === 0) {
        continue;
      }
      if (hashMap2[key] !== hashMap1[key]) {
        return false;
      }
    }
    return true;
  }

  const wordsLength= words.length;
  const wordLength = words[0].length;

  const ans = [];
  for (let i = 0; i < wordLength; i++) {
    const curMap = {};
    let startIndex = 0;
    for (let j = i; j < wordsLength * wordLength; j += wordLength) {
      const curStr = s.slice(j, j + wordLength);
      if (curMap[curStr]) {
        curMap[curStr] += 1;
      } else {
        curMap[curStr] = 1;
      }
      startIndex = j;
    }
    let j = startIndex + wordLength;
    for (j; j < s.length; j += wordLength) {
      if (compare(curMap, map)) {
        ans.push(j - wordLength * wordsLength);
      }
      const newStr = s.slice(j, j + wordLength);
      const preFirstStr = s.slice(j - wordLength * wordsLength, j - wordLength * wordsLength + wordLength);
      if (curMap[preFirstStr]) {
        curMap[preFirstStr] -= 1;
      }
      if (curMap[newStr]) {
        curMap[newStr] += 1;
      } else {
        curMap[newStr] = 1;
      }
    }
    if (compare(curMap, map)) {
      ans.push(j - wordLength * wordsLength);
    }
  }
  return ans;
};

export { findSubstring };
