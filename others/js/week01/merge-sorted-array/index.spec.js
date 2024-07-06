import { merge } from './index.js'


describe('merge function tests', () => {
  test('merges two sorted arrays where second array fits into the first one at the end', () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const m = 3;
    const nums2 = [2, 5, 6];
    const n = 3;
    merge(nums1, m, nums2, n);
    expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
  });

  test('merges two sorted arrays where first array is empty', () => {
    const nums1 = [0, 0, 0];
    const m = 0;
    const nums2 = [2, 5, 6];
    const n = 3;
    merge(nums1, m, nums2, n);
    expect(nums1).toEqual([2, 5, 6]);
  });

  test('merges two sorted arrays where second array is empty', () => {
    const nums1 = [1, 2, 3];
    const m = 3;
    const nums2 = [];
    const n = 0;
    merge(nums1, m, nums2, n);
    expect(nums1).toEqual([1, 2, 3]);
  });

  test('merges two sorted arrays where all elements of second array come before first', () => {
    const nums1 = [4, 5, 6, 0, 0, 0];
    const m = 3;
    const nums2 = [1, 2, 3];
    const n = 3;
    merge(nums1, m, nums2, n);
    expect(nums1).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
