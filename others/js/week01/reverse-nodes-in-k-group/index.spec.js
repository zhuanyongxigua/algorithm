import { reverseKGroup } from './index.js'
import { linkedListToArray, arrayToLinkedList} from '../../utils'


// Modified test cases using the ListNode class and helper functions
describe('Test reverseList', () => {
  test('Official unit test case 1', () => {
    const head = arrayToLinkedList([1, 2, 3, 4, 5]);
    expect(linkedListToArray(reverseKGroup(head, 2))).toEqual([2, 1, 4, 3, 5]);
  });

  test('Official unit test case 2', () => {
    const head = arrayToLinkedList([1, 2, 3, 4, 5]);
    expect(linkedListToArray(reverseKGroup(head, 3))).toEqual([3, 2, 1, 4, 5]);
  });

  test('[1, 2, 3, 4, 5], k = 1', () => {
    const head = arrayToLinkedList([1, 2, 3, 4, 5]);
    expect(linkedListToArray(reverseKGroup(head, 1))).toEqual([1, 2, 3, 4, 5]);
  })

  test('[1, 2], k = 2', () => {
    const head = arrayToLinkedList([1, 2]);
    expect(linkedListToArray(reverseKGroup(head, 2))).toEqual([2, 1]);
  })
});
