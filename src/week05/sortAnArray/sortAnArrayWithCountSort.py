class Solution:
    def sortArray(self, nums):
        numRange = 5 * 10 * 10 * 10 * 10 + 1
        tmp = [0 for i in range(2 * numRange)]
        for num in nums:
            tmp[num + numRange] += 1
        index = 0
        for itemIndex in range(len(tmp)):
            if tmp[itemIndex]:
                for i in range(tmp[itemIndex]):
                    nums[index] = itemIndex - numRange
                    index += 1
        return nums


solution = Solution()
# result = solution.sortArray([-4, 0, 7, 4, 9, -5, -1, 0, -7, -1])
result = solution.sortArray([5, 1, 1, 2, 0, 0])
print(result)
