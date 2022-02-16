import random


class Solution:
    def relativeSortArray(self, arr1, arr2):
        dick = {}
        for i in range(len(arr2)):
            dick[arr2[i]] = i
        lI = 0
        rI = len(arr1) - 1
        while lI <= rI:
            if arr1[lI] in dick:
                lI += 1
            else:
                arr1[lI], arr1[rI] = arr1[rI], arr1[lI]
                rI -= 1
        # rI is the last element that arr2 has

        self.normalQuickSort(arr1, lI, len(arr1) - 1)
        self.quickSort(arr1, 0, rI, dick)
        return arr1

    def normalQuickSort(self, arr, left, right):
        if left >= right:
            return
        pivotIndex = self.normalPartition(arr, left, right)
        self.normalQuickSort(arr, left, pivotIndex)
        self.normalQuickSort(arr, pivotIndex + 1, right)

    def normalPartition(self, arr, left, right):
        pivotIndex = random.randint(left, right)
        pivot = arr[pivotIndex]
        lI = left
        rI = right
        while lI <= rI:
            while arr[lI] < pivot:
                lI += 1
            while arr[rI] > pivot:
                rI -= 1
            if lI == rI:
                break
            if lI < rI:
                arr[lI], arr[rI] = arr[rI], arr[lI]
                lI += 1
                rI -= 1
        return rI

    def quickSort(self, arr, left, right, orderDick):
        if left >= right:
            return
        pivotIndex = self.partition(arr, left, right, orderDick)
        self.quickSort(arr, left, pivotIndex, orderDick)
        self.quickSort(arr, pivotIndex + 1, right, orderDick)

    def partition(self, arr, left, right, orderDick):
        pivotIndex = random.randint(left, right)
        pivot = orderDick[arr[pivotIndex]]
        lI = left
        rI = right
        while lI <= rI:
            while orderDick[arr[lI]] < pivot:
                lI += 1
            while orderDick[arr[rI]] > pivot:
                rI -= 1
            if lI == rI:
                break
            if lI < rI:
                arr[lI], arr[rI] = arr[rI], arr[lI]
                lI += 1
                rI -= 1
        return rI


s = Solution()
result = s.relativeSortArray(
    [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
    [2, 1, 4, 3, 9, 6]
)
# Output: [2,2,2,1,4,3,3,9,6,7,19]
print(result)
