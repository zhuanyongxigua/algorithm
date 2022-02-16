class Solution:
    def findPeakElement(self, nums) -> int:
        left = 0
        right = len(nums) - 1
        while left < right:
            lmid = (left + right) >> 1
            rmid = lmid + 1
            if nums[lmid] > nums[rmid]:
                right = rmid - 1
            else:
                left = lmid + 1
        return left

