class Solution:
    def sortArray(self, nums):
        self.mergeSort(nums, 0, len(nums) - 1)
        return nums

    def mergeSort(self, nums, left, right):
        if left == right:
            return
        midIndex = (left + right) >> 1
        self.mergeSort(nums, left, midIndex)
        self.mergeSort(nums, midIndex + 1, right)
        self.merge(nums, left, midIndex, right)

    def merge(self, nums, left, midIndex, right):
        tmp = []
        leftIndex = left
        rightIndex = midIndex + 1
        for i in range(right - left + 1):
            if leftIndex > midIndex:
                tmp.append(nums[rightIndex])
                rightIndex += 1
                continue
            elif rightIndex > right:
                tmp.append(nums[leftIndex])
                leftIndex += 1
                continue
            if nums[leftIndex] <= nums[rightIndex]:
                tmp.append(nums[leftIndex])
                leftIndex += 1
            elif nums[leftIndex] > nums[rightIndex]:
                tmp.append(nums[rightIndex])
                rightIndex += 1
        for i in range(len(tmp)):
            nums[left + i] = tmp[i]


solution = Solution()
# result = solution.sortArray([-4, 0, 7, 4, 9, -5, -1, 0, -7, -1])
result = solution.sortArray([5, 1, 1, 2, 0, 0])
print(result)
