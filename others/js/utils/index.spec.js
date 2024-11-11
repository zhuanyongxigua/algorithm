import { BinaryHeap, ListNode, arrayToLinkedList, linkedListToArray } from '.';

describe('BinaryHeap', () => {
  describe('MaxHeap', () => {
    let maxHeap;

    beforeEach(() => {
      maxHeap = new BinaryHeap((a, b) => a.value > b.value); // Max heap comparator
    });

    test('should insert and maintain max heap property', () => {
      maxHeap.insert(new ListNode(5));
      maxHeap.insert(new ListNode(3));
      maxHeap.insert(new ListNode(8));
      maxHeap.insert(new ListNode(1));
      maxHeap.insert(new ListNode(10));

      expect(maxHeap.peek().value).toBe(10);
    });

    test('should extract max element', () => {
      maxHeap.insert(new ListNode(5));
      maxHeap.insert(new ListNode(3));
      maxHeap.insert(new ListNode(8));
      maxHeap.insert(new ListNode(1));
      maxHeap.insert(new ListNode(10));

      expect(maxHeap.extract().value).toBe(10);
      expect(maxHeap.extract().value).toBe(8);
      expect(maxHeap.extract().value).toBe(5);
      expect(maxHeap.extract().value).toBe(3);
      expect(maxHeap.extract().value).toBe(1);
    });

    test('should handle empty heap', () => {
      expect(maxHeap.peek()).toBeUndefined();
      expect(maxHeap.extract()).toBeUndefined();
    });
  });

  describe('MinHeap', () => {
    let minHeap;

    beforeEach(() => {
      minHeap = new BinaryHeap((a, b) => a.value < b.value); // Min heap comparator
    });

    test('should insert and maintain min heap property', () => {
      minHeap.insert(new ListNode(5));
      minHeap.insert(new ListNode(3));
      minHeap.insert(new ListNode(8));
      minHeap.insert(new ListNode(1));
      minHeap.insert(new ListNode(10));

      expect(minHeap.peek().value).toBe(1);
    });

    test('should extract min element', () => {
      minHeap.insert(new ListNode(5));
      minHeap.insert(new ListNode(3));
      minHeap.insert(new ListNode(8));
      minHeap.insert(new ListNode(1));
      minHeap.insert(new ListNode(10));

      expect(minHeap.extract().value).toBe(1);
      expect(minHeap.extract().value).toBe(3);
      expect(minHeap.extract().value).toBe(5);
      expect(minHeap.extract().value).toBe(8);
      expect(minHeap.extract().value).toBe(10);
    });

    test('should handle empty heap', () => {
      expect(minHeap.peek()).toBeUndefined();
      expect(minHeap.extract()).toBeUndefined();
    });
  });
});

describe('Linked List Utilities', () => {
  describe('arrayToLinkedList', () => {
    test('should convert an empty array to an empty linked list', () => {
      const [head, tail] = arrayToLinkedList([]);
      expect(head).toBeNull();
      expect(tail).toBeNull();
    });

    test('should convert an array with one element', () => {
      const [head, tail] = arrayToLinkedList([1]);
      expect(head.value).toBe(1);
      expect(head.next).toBeNull();
      expect(tail).toBe(head);
    });

    test('should convert an array with multiple elements', () => {
      const [head, tail] = arrayToLinkedList([1, 2, 3, 4, 5]);
      expect(head.value).toBe(1);
      expect(head.next.value).toBe(2);
      expect(head.next.next.value).toBe(3);
      expect(head.next.next.next.value).toBe(4);
      expect(head.next.next.next.next.value).toBe(5);
      expect(head.next.next.next.next.next).toBeNull();
      expect(tail.value).toBe(5);
      expect(tail.next).toBeNull();
    });
  });

  describe('linkedListToArray', () => {
    test('should convert an empty linked list to an empty array', () => {
      const arr = linkedListToArray(null);
      expect(arr).toEqual([]);
    });

    test('should convert a linked list with one node', () => {
      const node = new ListNode(1);
      const arr = linkedListToArray(node);
      expect(arr).toEqual([1]);
    });

    test('should convert a linked list with multiple nodes', () => {
      const node5 = new ListNode(5);
      const node4 = new ListNode(4, node5);
      const node3 = new ListNode(3, node4);
      const node2 = new ListNode(2, node3);
      const node1 = new ListNode(1, node2);
      const arr = linkedListToArray(node1);
      expect(arr).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('arrayToLinkedList and linkedListToArray integration', () => {
    test('should convert array to linked list and back to array', () => {
      const originalArray = [1, 2, 3, 4, 5];
      const [head] = arrayToLinkedList(originalArray);
      const resultArray = linkedListToArray(head);
      expect(resultArray).toEqual(originalArray);
    });

    test('should handle empty array/list conversion', () => {
      const [head] = arrayToLinkedList([]);
      const resultArray = linkedListToArray(head);
      expect(resultArray).toEqual([]);
    });
  });
});
