// https://leetcode.cn/problems/reverse-nodes-in-k-group/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

export function reverseGroup (head, tail) {
  if (head === tail) return;
  tail.next = null;
  tail = null;
  while (head !== null) {
    const nextHead = head.next;
    head.next = tail;
    tail = head;
    head = nextHead;
  }
}

function getEnd (head, k) {
  while (k > 1 && head !== null) {
    head = head.next;
    k--;
  }
  return head;
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = function (head, k) {
  // 这种就是白给的，看一眼就记住了
  if (
    head === null
    || head.next === null
    || k <= 1
  ) return head;

  const protectedHead = {
    value: -1,
    next: head
  };
  let lastTail = protectedHead;
  while (head !== null) {
    const curTail = getEnd(head, k);
    if (curTail === null) {
      lastTail.next = head;
      break;
    }
    const nextHead = curTail.next;
    reverseGroup(head, curTail);
    lastTail.next = curTail;
    lastTail = head;
    head = nextHead;
  }
  return protectedHead.next;
};

export { reverseKGroup };
