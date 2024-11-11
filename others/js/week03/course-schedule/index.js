// https://leetcode.cn/problems/course-schedule/description/
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = function (numCourses, prerequisites) {
  // 0 没到
  // 1 刚到，还没检查完
  // 2 到了且没问题
  const cache = {};
  const edges = [];
  for (let i = 0; i < numCourses; i++) {
    edges[i] = [];
  }
  for (let i = 0; i < prerequisites.length; i++) {
    edges[prerequisites[i][1]].push(prerequisites[i][0]);
  }
  function dfs (index) {
    if (cache[index] === 1) {
      return false;
    }
    if (cache[index] === 2) {
      return true;
    }
    cache[index] = 1;
    for (let i = 0; i < edges[index].length; i++) {
      const result = dfs(edges[index][i]);
      if (!result) {
        return false;
      }
    }
    cache[index] = 2;
    return true;
  }
  for (let i = 0; i < edges.length; i++) {
    const result = dfs(i);
    if (!result) {
      return false;
    }
  }
  return true;
};

function canFinish2 (numCourses, prerequisites) {
  const edges = [];
  for (let x = 0; x < numCourses; x++) {
    edges[x] = {
      edges: [],
      inDegree: 0,
      index: x
    };
  }
  for (let y = 0; y < prerequisites.length; y++) {
    edges[prerequisites[y][1]].edges.push(prerequisites[y][0]);
    edges[prerequisites[y][0]].inDegree++;
  }

  const queue = [];
  let pushNum = 0;
  for (let a = 0; a < edges.length; a++) {
    if (edges[a].inDegree === 0) {
      queue.push(edges[a]);
      pushNum++;
    }
  }

  while (queue.length !== 0) {
    const curNode = queue.pop();
    for (let j = 0; j < curNode.edges.length; j++) {
      const curOutEdge = edges[curNode.edges[j]];
      curOutEdge.inDegree--;
      if (curOutEdge.inDegree === 0) {
        queue.push(curOutEdge);
        pushNum++;
      }
    }
  }
  return pushNum >= numCourses;
}

export { canFinish, canFinish2 };
