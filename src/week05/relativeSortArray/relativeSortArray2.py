class Solution:
    def relativeSortArray(self, arr1, arr2):
        tmp = [0 for i in range(1001)]
        for item in arr1:
            tmp[item] += 1
        unOrderPartIndex = 0
        for item in arr2:
            while tmp[item] != 0:
                arr1[unOrderPartIndex] = item
                unOrderPartIndex += 1
                tmp[item] -= 1
        for itemIndex in range(len(tmp)):
            while tmp[itemIndex] != 0:
                arr1[unOrderPartIndex] = itemIndex
                unOrderPartIndex += 1
                tmp[itemIndex] -= 1
        return arr1


s = Solution()
result = s.relativeSortArray(
    [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
    [2, 1, 4, 3, 9, 6]
)
# Output: [2,2,2,1,4,3,3,9,6,7,19]
print(result)
