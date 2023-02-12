from typing import List


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        self.edges = [[] for i in range(numCourses)]
        self.visited = [0] * numCourses
        self.valid = True
        for p in prerequisites:
            self.edges[p[1]].append(p[0])
        i = 0
        while i < numCourses and self.valid:
            if self.visited[i] == 0:
                self.dfs(i)
            i += 1

        return self.valid

    def dfs(self, v: int):
        self.visited[v] = 1
        for edge in self.edges[v]:
            if self.visited[edge] == 0:
                self.dfs(edge)
                if not self.valid:
                    return
            elif self.visited[edge] == 1:
                self.valid = False
                return
        self.visited[v] = 2


s = Solution()
result = s.canFinish(2, [[1, 0]])
print(result)
