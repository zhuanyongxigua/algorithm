import {
  mergeKLists,
  ListNode
  // mergeKLists2 as mergeKLists
  // mergeKListsWithMinBinaryHeap as mergeKLists
} from './index.js';

// Helper function to convert an array to a linked list
export function arrayToLinkedList (arr) {
  let head = null; let temp = null; let tail = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = new ListNode(arr[i], temp);
    if (i === arr.length - 1) {
      tail = head;
    }
    temp = head;
  }
  return [ head, tail ];
}

// Helper function to convert a linked list back to an array
export function linkedListToArray (head) {
  const arr = [];
  let current = head;
  while (current !== null) {
    arr.push(current.val);
    current = current.next;
  }
  return arr;
}

describe('mergeKLists', () => {
  test('Example 1', () => {
    const lists = [
      arrayToLinkedList([1,4,5])[0],
      arrayToLinkedList([1,3,4])[0],
      arrayToLinkedList([2,6])[0]
    ];
    const result = mergeKLists(lists);
    expect(linkedListToArray(result)).toEqual([1,1,2,3,4,4,5,6]);
  });

  test('Example 2', () => {
    const lists = [];
    const result = mergeKLists(lists);
    expect(linkedListToArray(result)).toEqual([]);
  });

  test('Example 3', () => {
    const lists = [arrayToLinkedList([])];
    const result = mergeKLists(lists);
    expect(linkedListToArray(result)).toEqual([]);
  });

  test('All empty lists', () => {
    const lists = [
      null,
      null,
      null
    ];
    const result = mergeKLists(lists);
    expect(linkedListToArray(result)).toEqual([]);
  });

  test('Single non-empty list', () => {
    const lists = [arrayToLinkedList([1,2,3])[0]];
    const result = mergeKLists(lists);
    expect(linkedListToArray(result)).toEqual([1,2,3]);
  });

  test('Lists with different lengths', () => {
    const lists = [
      arrayToLinkedList([1,3,5,7])[0],
      arrayToLinkedList([2,4])[0],
      arrayToLinkedList([6,8,10])[0]
    ];
    const result = mergeKLists(lists);
    expect(linkedListToArray(result)).toEqual([1,2,3,4,5,6,7,8,10]);
  });
});
