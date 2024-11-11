// https://leetcode.cn/problems/group-anagrams/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  const ansMap = {};
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i].split('').sort().join();
    if (ansMap[str]) {
      ansMap[str].push(strs[i]);
      continue;
    }
    ansMap[str] = [strs[i]];
  }
  const ans = [];
  for (const key in ansMap) {
    ans.push(ansMap[key]);
  }
  return ans;
};

export { groupAnagrams };
