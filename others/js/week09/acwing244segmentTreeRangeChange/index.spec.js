import { NumArray } from './index.js';

describe('Segment Tree Range Change', () => {
  test('should handle range queries and updates correctly', () => {
    // 初始化数组 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const numArray = new NumArray(nums);

    // Q 4 4 - 查询第4个数的和 (索引从1开始，所以是nums[3] = 4)
    expect(numArray.sumRange(4, 4)).toBe(4);

    // Q 1 10 - 查询第1到第10个数的和 (1+2+3+4+5+6+7+8+9+10 = 55)
    expect(numArray.sumRange(1, 10)).toBe(55);

    // Q 2 4 - 查询第2到第4个数的和 (2+3+4 = 9)
    expect(numArray.sumRange(2, 4)).toBe(9);

    // C 3 6 3 - 把第3到第6个数都加上3
    // 数组变成: [1, 2, 6, 7, 8, 9, 7, 8, 9, 10]
    numArray.change(3, 6, 3); // 注意：change方法使用0-based索引

    // Q 2 4 - 再次查询第2到第4个数的和 (2+6+7 = 15)
     expect(numArray.sumRange(2, 4)).toBe(15);
   });

   test('should handle complex range operations', () => {
     // 初始化数组 [11, 15, -12, -16, 18, -8, -4, -9, 16, 18]
     const nums = [11, 15, -12, -16, 18, -8, -4, -9, 16, 18];
     const numArray = new NumArray(nums);

     // Q 7 8 - 查询第7到第8个数的和 (-4 + (-9) = -13)
     expect(numArray.sumRange(7, 8)).toBe(-13);

     // C 5 10 -4 - 把第5到第10个数都减去4
     // 数组变成: [11, 15, -12, -16, 14, -12, -8, -13, 12, 14]
     numArray.change(5, 10, -4);

     // Q 6 6 - 查询第6个数的和 (-12)
     expect(numArray.sumRange(6, 6)).toBe(-12);

     // C 3 4 2 - 把第3到第4个数都加上2
     // 数组变成: [11, 15, -10, -14, 14, -12, -8, -13, 12, 14]
     numArray.change(3, 4, 2);

     // Q 1 4 - 查询第1到第4个数的和 (11 + 15 + (-10) + (-14) = 2)
     expect(numArray.sumRange(1, 4)).toBe(2);
   });

   test('should handle large array with multiple operations', () => {
     // 初始化数组 [21, 33, 39, 30, -26, -37, 32, 18, -32, 36, -28, -34, 31, 8, 18, 25, 36, 6, -34, 2]
     const nums = [21, 33, 39, 30, -26, -37, 32, 18, -32, 36, -28, -34, 31, 8, 18, 25, 36, 6, -34, 2];
     const numArray = new NumArray(nums);

     // C 5 13 -19 - 把第5到第13个数都减去19
     numArray.change(5, 13, -19);

     // Q 19 20 - 查询第19到第20个数的和 (-34 + 2 = -32)
     expect(numArray.sumRange(19, 20)).toBe(-32);

     // C 11 12 17 - 把第11到第12个数都加上17
     numArray.change(11, 12, 17);

     // Q 11 20 - 查询第11到第20个数的和
     expect(numArray.sumRange(11, 20)).toBe(7);

     // C 14 18 -15 - 把第14到第18个数都减去15
     numArray.change(14, 18, -15);

     // C 7 9 -10 - 把第7到第9个数都减去10
     numArray.change(7, 9, -10);

     // Q 18 20 - 查询第18到第20个数的和
     // 计算更新后的值: -9 + -34 + 2 = -41
     expect(numArray.sumRange(18, 20)).toBe(-41);

     // Q 19 20 - 查询第19到第20个数的和 (-34 + 2 = -32)
     expect(numArray.sumRange(19, 20)).toBe(-32);

     // Q 6 15 - 查询第6到第15个数的和
     // 计算更新后的值: -56 + 8 + -42 + 28 + -11 + -17 + 12 + -11 + -1 + -9 = -79
     expect(numArray.sumRange(6, 15)).toBe(-166);

     // C 7 10 -8 - 把第7到第10个数都减去8
     numArray.change(7, 10, -8);
   });

   test('should handle very large array with extensive operations', () => {
     // 初始化数组 [-79, -37, 39, 10, 57, -48, 77, -46, 72, -17, 11, 60, 41, -55, -6, -53, 56, -18, 53, -15, -18, -46, -20, -73, -32, 79, 47, -21, 29, 49, 76, -46, -16, -25, -27, 37, 59, 15, -64, -51]
     const nums = [-79, -37, 39, 10, 57, -48, 77, -46, 72, -17, 11, 60, 41, -55, -6, -53, 56, -18, 53, -15, -18, -46, -20, -73, -32, 79, 47, -21, 29, 49, 76, -46, -16, -25, -27, 37, 59, 15, -64, -51];
     const numArray = new NumArray(nums);

     // Q 33 39 - 查询第33到第39个数的和 (-16 + -25 + -27 + 37 + 59 + 15 + -64 = -21)
     expect(numArray.sumRange(33, 39)).toBe(-21);

     // C 29 38 -27 - 把第29到第38个数都减去27
     numArray.change(29, 38, -27);

     // C 5 40 -33 - 把第5到第40个数都减去33
     numArray.change(5, 40, -33);

     // C 15 39 33 - 把第15到第39个数都加上33
     numArray.change(15, 39, 33);

     // Q 30 39 - 查询第30到第39个数的和
     expect(numArray.sumRange(30, 39)).toBe(-185);

     // Q 14 25 - 查询第14到第25个数的和
     expect(numArray.sumRange(14, 25)).toBe(-260);

     // C 26 38 -17 - 把第26到第38个数都减去17
     numArray.change(26, 38, -17);

     // Q 6 15 - 查询第6到第15个数的和
     expect(numArray.sumRange(6, 15)).toBe(-208);

     // Q 8 36 - 查询第8到第36个数的和
     expect(numArray.sumRange(8, 36)).toBe(-558);

     // C 17 39 -7 - 把第17到第39个数都减去7
     numArray.change(17, 39, -7);

     // C 37 39 -4 - 把第37到第39个数都减去4
     numArray.change(37, 39, -4);

     // C 6 33 10 - 把第6到第33个数都加上10
     numArray.change(6, 33, 10);

     // Q 31 37 - 查询第31到第37个数的和
     expect(numArray.sumRange(31, 37)).toBe(-273);

     // C 14 26 -39 - 把第14到第26个数都减去39
     numArray.change(14, 26, -39);

     // C 34 36 -11 - 把第34到第36个数都减去11
     numArray.change(34, 36, -11);

     // Q 37 39 - 查询第37到第39个数的和
     expect(numArray.sumRange(37, 39)).toBe(-111);

     // C 38 40 -23 - 把第38到第40个数都减去23
     numArray.change(38, 40, -23);

     // C 7 14 -9 - 把第7到第14个数都减去9
     numArray.change(7, 14, -9);

     // C 20 35 33 - 把第20到第35个数都加上33
     numArray.change(20, 35, 33);

     // C 19 25 -1 - 把第19到第25个数都减去1
     numArray.change(19, 25, -1);
   });

   test('should handle cumulative range updates correctly', () => {
     // 初始化数组 [0, 0]
     const nums = [0, 0];
     const numArray = new NumArray(nums);

     // C 1 2 +5 - 把第1到第2个数都加上5
     // 数组变成: [5, 5]
     numArray.change(1, 2, 5);

     // C 1 2 +3 - 再整段加3，期望累计到+8
     // 数组变成: [8, 8]
     numArray.change(1, 2, 3);

     // Q 1 1 - 查询第1个数的和，期望答案：8
     expect(numArray.sumRange(1, 1)).toBe(8);

     // Q 2 2 - 查询第2个数的和，期望答案：8
     expect(numArray.sumRange(2, 2)).toBe(8);

     // Q 1 2 - 查询第1到第2个数的和，期望答案：16
     expect(numArray.sumRange(1, 2)).toBe(16);
   });

   test('should handle overlapping range updates correctly', () => {
     // 初始化数组 [0, 0, 0, 0, 0]
     const nums = [0, 0, 0, 0, 0];
     const numArray = new NumArray(nums);

     // C 1 5 +1 - 全部+1
     // 数组变成: [1, 1, 1, 1, 1]
     numArray.change(1, 5, 1);

     // C 2 4 +2 - 中间再+2
     // 数组变成: [1, 3, 3, 3, 1]
     numArray.change(2, 4, 2);

     // Q 3 3 - 查询第3个数的和，期望：1 + 2 = 3
     expect(numArray.sumRange(3, 3)).toBe(3);

     // 验证其他位置的值
     expect(numArray.sumRange(1, 1)).toBe(1); // 第1个数：1
     expect(numArray.sumRange(2, 2)).toBe(3); // 第2个数：1 + 2 = 3
     expect(numArray.sumRange(4, 4)).toBe(3); // 第4个数：1 + 2 = 3
     expect(numArray.sumRange(5, 5)).toBe(1); // 第5个数：1

     // 验证整个数组的和
     expect(numArray.sumRange(1, 5)).toBe(11); // 1 + 3 + 3 + 3 + 1 = 11
   });

   test('should handle chained overlapping range updates - expose lazy propagation bug', () => {
     // 用例 1（链式重叠：[1,3],[2,4],[3,5]）
     // 初始化数组 [0, 0, 0, 0, 0]
     const nums = [0, 0, 0, 0, 0];
     const numArray = new NumArray(nums);

     // 操作：
     // C 1 3 +1 - 区间 [1,3] 加 1
     // 数组应该变成: [1, 1, 1, 0, 0]
     numArray.change(1, 3, 1);

     // C 2 4 +1 - 区间 [2,4] 加 1
     // 数组应该变成: [1, 2, 2, 1, 0]
     numArray.change(2, 4, 1);

     // C 3 5 +1 - 区间 [3,5] 加 1
     // 数组应该变成: [1, 2, 3, 2, 1]
     numArray.change(3, 5, 1);

     // 期望答案（正确的区间和）：
     // Q 1 1 -> 1 (第1个数: 0 + 1 = 1)
     expect(numArray.sumRange(1, 1)).toBe(1);

     // Q 1 5 -> 9 (总和: 1 + 2 + 3 + 2 + 1 = 9)
     expect(numArray.sumRange(1, 5)).toBe(9);

     // Q 3 3 -> 3 (第3个数: 0 + 1 + 1 + 1 = 3)
     expect(numArray.sumRange(3, 3)).toBe(3);
   });

   test('should handle nested overlapping range updates - expose lazy propagation bug case 2', () => {
     // 用例 2（嵌套重叠：[1,1],[1,2],[1,3]）
     // 初始化数组 [0, 0, 0]
     const nums = [0, 0, 0];
     const numArray = new NumArray(nums);

     // 操作：
     // C 1 1 -2 - 区间 [1,1] 减 2
     // 数组应该变成: [-2, 0, 0]
     numArray.change(1, 1, -2);

     // C 1 2 -2 - 区间 [1,2] 减 2
     // 数组应该变成: [-4, -2, 0]
     numArray.change(1, 2, -2);

     // C 1 3 -2 - 区间 [1,3] 减 2
     // 数组应该变成: [-6, -4, -2]
     numArray.change(1, 3, -2);

     // 期望答案：
     // Q 1 1 -> -6 (第1个数: 0 - 2 - 2 - 2 = -6)
     expect(numArray.sumRange(1, 1)).toBe(-6);

     // Q 1 3 -> -12 (总和: -6 + -4 + -2 = -12)
     expect(numArray.sumRange(1, 3)).toBe(-12);
   });
 });
