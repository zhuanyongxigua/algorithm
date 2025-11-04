/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
  const map = {};
  const charList = [];
  const dedupMap = {};
  for (let i = 0; i < wordList.length; i++) {
      map[wordList[i]] = 1;
      for (let j = 0; j < wordList[i].length; j++) {
          if (!dedupMap[j]) {
              dedupMap[j] = {}
          }
          if (!charList[j]) {
              charList[j] = [];
          }
          if (!dedupMap[j][wordList[i][j]]) {
              charList[j].push(wordList[i][j]);
              dedupMap[j][wordList[i][j]] = true;
          }
      }
  }
  if (!map[endWord]) return 0;
  const queue = [[beginWord, 1]];
  let queueIndex = 0;
  const visited = {};
  const path = {};
  function dfs (word, steps, maxSteps) {
      if (!map[word] && steps !== 1) {
        return -1
      };
      if (word === endWord) {
        return steps
      };
      if (steps > maxSteps) {
        queue.push([word, steps]);
        visited[word] = 1;
        return -1;
      }
      let minSteps = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < word.length; i++) {
          for (let j = 0; j < charList[i].length; j++) {
              if (charList[i][j] === word[i]) continue;
              const next = word.slice(0, i) + charList[i][j] + word.slice(i + 1);
              if (visited[next]) continue;
              if (map[next]) {
                path[next] = {
                  word,
                  steps
                };
              }
              const temp = dfs(
                next,
                steps + 1,
                maxSteps
              );
              if (temp !== -1 && temp !== Number.MAX_SAFE_INTEGER) return temp;
          }
      }
      return minSteps;
  }
  for (let i = 1; i <= wordList.length; i++) {
    while (queueIndex < queue.length && queue[queueIndex][1] <= i) {
      const curStatus = queue[queueIndex];
      queueIndex++;
      const temp = dfs(curStatus[0], curStatus[1], i);
      if (temp !== -1 && temp !== Number.MAX_SAFE_INTEGER) {
        let word = endWord
        while (word !== beginWord) {
          if (path[word]) {
            console.log(path[word].word, path[word].steps);
            word = path[word].word;
          }
        }
        return temp
      }
    }
  }
  return 0;
};

function ladderLength2 (beginWord, endWord, wordList) {
  const distBegin = {};
  const distEnd = {};
  for (let i = 0; i < wordList.length; i++) {
      distBegin[wordList[i]] = Number.MAX_SAFE_INTEGER;
      distEnd[wordList[i]] = Number.MAX_SAFE_INTEGER;
  }
  distBegin[beginWord] = 1;
  if (!distEnd[endWord]) return 0;
  distEnd[endWord] = 1;
  const qBegin = [beginWord];
  const qEnd = [endWord];
  let qBeginIndex = 0;
  let qEndIndex = 0;
  function expand (queue, qIndex, qEndIndex, dist, distReverse) {
      let minResult = Number.MAX_SAFE_INTEGER;
      while (qIndex <= qEndIndex) {
        const front = queue[qIndex];
        const depth = dist[front];
        qIndex++;
        for (let i = 0; i < front.length; i++) {
            for (let j = 0; j < 26; j++) {
                const char = String.fromCharCode(97 + j); // 97 是 'a' 的 ASCII 码
                const next = front.slice(0, i) + char + front.slice(i + 1);
                if (dist[next]) {
                    //console.log('next', next);
                    if (distReverse[next] && distReverse[next] !== Number.MAX_SAFE_INTEGER) {
                        minResult = Math.min(minResult, depth + distReverse[next]);
                    }
                    if (dist[next] > depth + 1) {
                        queue.push(next);
                        dist[next] = depth + 1
                    }
                }
            }
        }
      }
      return minResult === Number.MAX_SAFE_INTEGER ? -1 : minResult;
  }
  while (qBeginIndex < qBegin.length && qEndIndex < qEnd.length) {
      const beginFront = qBegin[qBeginIndex];
      const endFront = qEnd[qEndIndex];
      const beginDepth = distBegin[beginFront];
      const endDepth = distEnd[endFront];
      if (beginDepth + endDepth > wordList.length + 1) return 0;
      const curQBeginEndIndex = qBegin.length - 1;
      let res = expand(qBegin, qBeginIndex, curQBeginEndIndex, distBegin, distEnd);
      if (res !== -1) {
        return res
      };
      qBeginIndex = curQBeginEndIndex + 1;
      const curQEndEndIndex = qEnd.length - 1;
      res = expand(qEnd, qEndIndex, curQEndEndIndex, distEnd, distBegin);
      if (res !== -1) {
        return res
      };
      qEndIndex = curQEndEndIndex + 1;
  }
  return 0;
}

/**
 * 返回一条最短路径（含起点和终点）；若不存在则返回 []。
 * 说明：BFS + parent 指针回溯；不使用任何启发式。
 */
function ladderPath(beginWord, endWord, wordList) {
  const L = beginWord.length;
  const dict = new Set(wordList.filter(w => w.length === L));
  if (!dict.has(endWord)) return [];        // 题目要求：endWord 必须在词典中

  // BFS 初始化
  const q = [beginWord];
  const visited = new Set([beginWord]);
  const parent = new Map();                 // child -> parent

  // 逐层 BFS
  while (q.length) {
    const size = q.length;
    for (let s = 0; s < size; s++) {
      const w = q.shift();
      if (w === endWord) {
        // 回溯 parent 构造路径
        const path = [];
        let cur = w;
        while (cur !== undefined) {
          path.push(cur);
          cur = parent.get(cur);
        }
        return path.reverse();
      }
      // 枚举 w 的所有“合法邻居”（只改一位且在词典中）
      const arr = w.split('');
      for (let i = 0; i < L; i++) {
        const orig = arr[i];
        for (let code = 97; code <= 122; code++) {   // 'a'..'z'
          const ch = String.fromCharCode(code);
          if (ch === orig) continue;
          arr[i] = ch;
          const next = arr.join('');
          if (dict.has(next) && !visited.has(next)) {
            visited.add(next);
            parent.set(next, w);
            q.push(next);
          }
        }
        arr[i] = orig;
      }
    }
  }
  return [];
}

export { ladderLength, ladderPath, ladderLength2 }
