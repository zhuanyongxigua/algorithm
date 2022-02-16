import math
class Solution:
    def searchMatrix(self, matrix, target: int) -> bool:
        eleLength = len(matrix[0])
        left = 0
        right = len(matrix) * eleLength - 1
        while left <= right:
            mid = (left + right) >> 1
            if matrix[math.floor(mid / eleLength)][mid % eleLength] == target:
                return True
            elif matrix[math.floor(mid / eleLength)][mid % eleLength] > target:
                right = mid - 1
            else:
                left = mid + 1
        return False

s = Solution()
result = s.searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)
print(result)