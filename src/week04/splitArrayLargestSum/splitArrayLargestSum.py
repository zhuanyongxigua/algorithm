class Solution:
    def splitArray(self, nums: List[int], m: int) -> int:
        myMin = 0
        myMax = 0
        for num in nums:
            myMin = max(myMin, num)
            myMax += num
        while myMin < myMax:
            mid = (myMin + myMax) >> 1
            if self.isValid(nums, m, mid):
                myMax = mid
            else:
                myMin = mid + 1
        return myMax
    def isValid(self, nums: List[int], m: int, T: int) -> bool:
        groupSum = 0
        groupCount = 1
        for num in nums:
            if groupSum + num <= T:
                groupSum += num
            else:
                groupSum = num
                groupCount += 1
        return groupCount <= m


