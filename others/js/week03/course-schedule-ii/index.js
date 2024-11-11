// https://leetcode.cn/problems/course-schedule-ii/
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
const findOrder = function (numCourses, prerequisites) {
  const edges = [];
  for (let i = 0; i < numCourses; i++) {
    edges[i] = {
      edges: [],
      inDegree: 0,
      index: i
    };
  }
  for (let i = 0; i < prerequisites.length; i++) {
    edges[prerequisites[i][1]].edges.push(prerequisites[i][0]);
    edges[prerequisites[i][0]].inDegree++;
  }
  const queue = [];
  for (let i = 0; i < edges.length; i++) {
    if (edges[i].inDegree === 0) {
      queue.push(edges[i]);
    }
  }
  let index = 0;
  while (index < queue.length) {
    const curNode = queue[index];
    for (let i = 0; i < curNode.edges.length; i++) {
      edges[curNode.edges[i]].inDegree--;
      if (edges[curNode.edges[i]].inDegree === 0) {
        queue.push(edges[curNode.edges[i]]);
      }
    }
    index++;
  }
  if (queue.length < edges.length) {
    return [];
  }
  return queue.map(edge => edge.index);
};

function findOrder2 (numCourses, prerequisites) {
  const edges = [];
  const visited = {};
  for (let i = 0; i < numCourses; i++) {
    edges[i] = {
      edges: [],
      inDegree: 0,
      index: i
    };
    visited[i] = 0;
  }
  for (let i = 0; i < prerequisites.length; i++) {
    edges[prerequisites[i][1]].edges.push(prerequisites[i][0]);
    edges[prerequisites[i][0]].inDegree++;
  }
  const ans = [];
  function dfs (index) {
    if (edges[index].inDegree !== 0) {
      edges[index].inDegree--;
    }
    if (edges[index].inDegree === 0 && visited[index] === 0) {
      ans.push(index);
      visited[index] = 1;
      for (let i = 0; i < edges[index].edges.length; i++) {
        dfs(edges[index].edges[i]);
      }
    }
  }
  for (let i = 0; i < edges.length; i++) {
    if (edges[i].inDegree === 0 && visited[i] === 0) {
      dfs(i);
    }
  }
  if (ans.length < edges.length) {
    return [];
  }
  return ans;
}

export { findOrder, findOrder2 };
