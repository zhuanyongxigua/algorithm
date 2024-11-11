import { LRUCache } from './index.js';

describe('LRUCache', () => {
  test('Official test case 1', () => {
    const lruCache = new LRUCache(2);
    lruCache.put(1, 1); // cache is {1=1}
    lruCache.put(2, 2); // cache is {1=1, 2=2}
    expect(lruCache.get(1)).toBe(1); // returns 1
    lruCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
    expect(lruCache.get(2)).toBe(-1); // returns -1 (not found)
    lruCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
    expect(lruCache.get(1)).toBe(-1); // returns -1 (not found)
    expect(lruCache.get(3)).toBe(3); // returns 3
    expect(lruCache.get(4)).toBe(4); // returns 4
  });

  test('Official test case 2', () => {
    const lruCache = new LRUCache(1);
    lruCache.put(2, 1); // cache is {2=1}
    expect(lruCache.get(2)).toBe(1); // returns 1
    lruCache.put(3, 2); // LRU key was 2, evicts key 2, cache is {3=2}
    expect(lruCache.get(2)).toBe(-1); // returns -1 (not found)
    expect(lruCache.get(3)).toBe(2); // returns 2
  });
});
