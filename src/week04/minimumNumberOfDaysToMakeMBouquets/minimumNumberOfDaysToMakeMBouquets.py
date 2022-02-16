class Solution:
    def minDays(self, bloomDay, m: int, k: int) -> int:
        left = bloomDay[0]
        right = bloomDay[0]
        minCount = 10**9 + 1
        for bloom in bloomDay:
            left = min(left, bloom)
            right = max(right, bloom)
        while left < right:
            mid = (left + right) >> 1
            validCount = self.isValid(bloomDay, k, mid)
            minCount = min(minCount, validCount if validCount >= m else minCount)
            if validCount >= m:
                right = mid
            else:
                left = mid + 1
        
        validCount = self.isValid(bloomDay, k, right)
        minCount = min(minCount, validCount if validCount >= m else minCount)
        return right if minCount != 10**9 + 1 else -1
    def isValid(self, bloomDay, k, mid) -> bool:
        groupCount = 0
        groupSum = 0
        for bloom in bloomDay:
            if bloom <= mid:
                if groupSum < k:
                    groupSum += 1
                    if groupSum == k:
                        groupCount += 1
                        groupSum = 0
            else:
                groupSum = 0
        return groupCount


# [1,10,3,10,2]
# 3
# 1

# s = Solution()
# result = s.minDays([1, 10, 3, 10, 2], 3, 1)
# print(result)

# [1,10,3,10,2]
# 3
# 2

# s = Solution()
# result = s.minDays([1, 10, 3, 10, 2], 3, 2)
# print(result)

# [1,10,3,10,2]
# 3
# 2

# s = Solution()
# result = s.minDays([1, 10, 3, 10, 2], 3, 2)
# print(result)

# [7,7,7,7,12,7,7]
# 2
# 3

# s = Solution()
# result = s.minDays([7, 7, 7, 7, 12, 7, 7], 2, 3)
# print(result)

# [329,2054,2313,4921,1525,1180,5585,115,5669,2282,5205,1204,2485,468,1827,1597,247,3883,2662,817,5218,2553,5525,2633,248,5500,5487,5644,3923,3660,2722,4145,3815,2169,522,1345,2426,1208,3646,3266,5410,4803,980,425,2160,5123,4430,4005,916,3376,3679,4496,4152,5338,4525,4674,4653,4539,2002,5202,137,5636,1178,3946,1585,5578,1408,1033,1193,4695,1846,3280,4099,2497,5402,761,3686,3984,5075,752,4978,3607,1789,2784,3305,3695,1348,4448,3790,3681,5482,4068,5589,5564,918,186,5568,4971,3175,4071,5049,743,4655,3965,3149,1987,969,3277,3724,567,172,3760,4654,3211,1310,1391,1694,4665]
# 118
# 1

s = Solution()
result = s.minDays([329,2054,2313,4921,1525,1180,5585,115,5669,2282,5205,1204,2485,468,1827,1597,247,3883,2662,817,5218,2553,5525,2633,248,5500,5487,5644,3923,3660,2722,4145,3815,2169,522,1345,2426,1208,3646,3266,5410,4803,980,425,2160,5123,4430,4005,916,3376,3679,4496,4152,5338,4525,4674,4653,4539,2002,5202,137,5636,1178,3946,1585,5578,1408,1033,1193,4695,1846,3280,4099,2497,5402,761,3686,3984,5075,752,4978,3607,1789,2784,3305,3695,1348,4448,3790,3681,5482,4068,5589,5564,918,186,5568,4971,3175,4071,5049,743,4655,3965,3149,1987,969,3277,3724,567,172,3760,4654,3211,1310,1391,1694,4665], 118, 1)
print(result)
