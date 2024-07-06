export class ListNode {
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Helper function to convert an array to a linked list
export function arrayToLinkedList(arr) {
  let head = null, temp = null;
  for (const num of arr.reverse()) {
    head = new ListNode(num, temp);
    temp = head;
  }
  return head;
}

// Helper function to convert a linked list back to an array
export function linkedListToArray(head) {
  const arr = [];
  let current = head;
  while (current !== null) {
    arr.push(current.value);
    current = current.next;
  }
  return arr;
}
