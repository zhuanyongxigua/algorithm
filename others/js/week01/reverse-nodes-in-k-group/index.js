// https://leetcode.cn/problems/reverse-nodes-in-k-group/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 还是不够好，明天继续拆分，把主函数的状态挪到子函数里面去，每个子函数维护自己的状态

function reverseGroup (head, tail) {
  const resultTail = head
  tail.next = null
  tail = null
  while (head !== null) {
    let nextHead = head.next
    head.next = tail
    tail = head
    head = nextHead
  }
  resultTail.next = null
  return [tail, resultTail]
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  // 这种就是白给的，看一眼就记住了
  if (
    head === null
    || head.next === null
    || k === 0
    || k === 1
  ) return head
  const protectedHead = {
    value: -1,
    next: head
  }

  let num = 0
  let paramHead = head
  let paramTail = protectedHead
  let lastTail = paramTail
  while (paramTail !== null) {
    if (num < k) {
      num++
      paramTail = paramTail.next
    } else {
      const nextParamHead = paramTail.next
      const [resultHead, resultTail] = reverseGroup(paramHead, paramTail)
      paramHead = nextParamHead
      paramTail = nextParamHead
      lastTail.next = resultHead
      lastTail = resultTail
      num = 1
    }
  }
  if (num <= k) {
    lastTail.next = paramHead
  }
  return protectedHead.next
}

export { reverseKGroup }
