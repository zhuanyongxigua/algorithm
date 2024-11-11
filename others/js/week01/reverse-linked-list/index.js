// https://leetcode.cn/problems/reverse-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
  if (head === null) {
    return head;
  }
  const protectedTail = {
    value: 0,
    next: null
  };
  const cacheHead = head;
  let tail = protectedTail;
  while (head != null) {
    const temp = head.next;
    head.next = tail;
    tail = head;
    head = temp;
  }
  cacheHead.next = null;
  return tail;
};

export { reverseList };
