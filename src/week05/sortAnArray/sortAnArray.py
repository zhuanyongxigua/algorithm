import random


class Solution:
    def sortArray(self, nums):
        return self.quickSort(nums, 0, len(nums) - 1)

    def quickSort(self, nums, left, right):
        if left >= right:
            return nums
        pivot = self.partition(nums, left, right)
        # Here is a point, don't pivot plus 1
        self.quickSort(nums, left, pivot)
        self.quickSort(nums, pivot + 1, right)
        return nums

    def partition(self, nums, left, right):
        pivot = random.randint(left, right)
        pivotVal = nums[pivot]
        while left <= right:
            while nums[left] < pivotVal:
                left += 1
            while nums[right] > pivotVal:
                right -= 1
            if left == right:
                break
            if left < right:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
                right -= 1
        return right


solution = Solution()
# result = solution.sortArray([-4, 0, 7, 4, 9, -5, -1, 0, -7, -1])
result = solution.sortArray([5, 1, 1, 2, 0, 0])
print(result)
