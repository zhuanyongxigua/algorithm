from typing import List


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        self.edges = [[] for i in range(numCourses)]
        self.visited = [0] * numCourses
        self.valid = True
        for info in prerequisites:
            self.edges[info[1]].append(info[0])
        
        i = 0
        while i < numCourses and self.valid:
            if self.visited[i] == 0:
                self.dfs(i)
            i += 1
        
        return self.valid

    def dfs(self, u: int):
        self.visited[u] = 1
        for v in self.edges[u]:
            if self.visited[v] == 0:
                self.dfs(v)
                if not self.valid:
                    return
            elif self.visited[v] == 1:
                self.valid = False
                return
        self.visited[u] = 2


s = Solution()
result = s.canFinish(2, [[1, 0]])
print(result)
