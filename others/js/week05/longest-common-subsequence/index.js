/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function (text1, text2) {
  const grid = [];
  // -1: no pre,
  // 0: from up,
  // 1: from left up,
  // 2: from left
  const dir = [];
  text1 = ' ' + text1;
  text2 = ' ' + text2;
  for (let i = 0; i < text1.length; i++) {
    grid.push(new Array(text2.length).fill(0));
    dir.push(new Array(text2.length).fill(-1));
  }
  for (let i = 1; i < text1.length; i++) {
    for (let j = 1; j < text2.length; j++) {
      if (text1[i] === text2[j]) {
        grid[i][j] = grid[i - 1][j - 1] + 1;
        dir[i][j] = 1;
      } else {
        if (grid[i][j - 1] > grid[i - 1][j]) {
          grid[i][j] = grid[i][j - 1];
          dir[i][j] = 2;
        } else {
          grid[i][j] = grid[i - 1][j];
          dir[i][j] = 0;
        }
      }
    }
  }
  let curIndex = [text1.length - 1, text2.length - 1];
  let ans = '';
  while (dir[curIndex[0]][curIndex[1]] !== -1) {
    const curVal = dir[curIndex[0]][curIndex[1]];
    if (curVal === 0) {
      curIndex = [curIndex[0] - 1, curIndex[1]];
    } else if (curVal === 1) {
      ans = text1[curIndex[0]] + ans;
      curIndex = [curIndex[0] - 1, curIndex[1] - 1];
    } else if (curVal === 2) {
      curIndex = [curIndex[0], curIndex[1] - 1];
    }
  }
  console.log('ans', ans);
  return grid[text1.length - 1][text2.length - 1];
};

export { longestCommonSubsequence };
