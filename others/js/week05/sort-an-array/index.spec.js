import { sortArray } from './index'

describe('Sort Array', () => {
  test('should sort an array with positive numbers', () => {
    const input = [3, 1, 5, 11, 20, 9, 10, 6, 15];
    const expected = [1, 3, 5, 6, 9, 10, 11, 15, 20];
    expect(sortArray(input)).toEqual(expected);
  });

  test('should sort an array with duplicates', () => {
    const input = [3, 1, 3, 2, 5, 2, 4, 5];
    const expected = [1, 2, 2, 3, 3, 4, 5, 5];
    expect(sortArray(input)).toEqual(expected);
  });

  test('should sort an array with negative numbers', () => {
    const input = [-4, 0, 7, -2, 10, -9, 1];
    const expected = [-9, -4, -2, 0, 1, 7, 10];
    expect(sortArray(input)).toEqual(expected);
  });

  test('should handle already sorted array', () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    expect(sortArray(input)).toEqual(expected);
  });

  test('should handle reverse sorted array', () => {
    const input = [5, 4, 3, 2, 1];
    const expected = [1, 2, 3, 4, 5];
    expect(sortArray(input)).toEqual(expected);
  });

  test('should handle array with single element', () => {
    const input = [1];
    const expected = [1];
    expect(sortArray(input)).toEqual(expected);
  });

  test('should handle empty array', () => {
    const input = [];
    const expected = [];
    expect(sortArray(input)).toEqual(expected);
  });

  test('[3, 2, 1, 5, 6, 4]', () => {
    const input = [3, 2, 1, 5, 6, 4];
    const expected = [1, 2, 3, 4, 5, 6];
    expect(sortArray(input)).toEqual(expected);
  })
});

describe('Sort Array Performance', () => {
  test('should handle large sorted array efficiently without statistic', () => {
    // Generate large sorted array
    const length = 10000;
    const input = Array.from({ length }, (_, i) => i);
    
    // Time the sort
    const startTime = performance.now();
    const result = sortArray([...input]);
    const endTime = performance.now();

    // Log performance metrics
    console.log(`Array length: ${length}`);
    console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);

    expect(result).toEqual(input);

  })

  test('should handle large sorted array efficiently', () => {
    // Create counter for quickSort calls
    let quickSortCalls = 0;
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      if (args[0] === 'quickSort: ') {
        quickSortCalls++;
      }
    };

    // Generate large sorted array
    const length = 10000;
    const input = Array.from({ length }, (_, i) => i);
    
    // Time the sort
    const startTime = performance.now();
    const result = sortArray([...input]);
    const endTime = performance.now();
    
    // Restore console.log
    console.log = originalConsoleLog;

    // Log performance metrics
    console.log(`Array length: ${length}`);
    console.log(`QuickSort calls: ${quickSortCalls}`);
    console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);

    expect(result).toEqual(input);
  });
});
