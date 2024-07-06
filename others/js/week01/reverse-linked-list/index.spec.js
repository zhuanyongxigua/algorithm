import { reverseList } from './index.js'
import { linkedListToArray, arrayToLinkedList} from '../../utils'


// Modified test cases using the ListNode class and helper functions
describe('Test reverseList', () => {
  test('Official unit test case 1', () => {
    const head = arrayToLinkedList([1, 2, 3, 4, 5]);
    expect(linkedListToArray(reverseList(head))).toEqual([5, 4, 3, 2, 1]);
  });

  test('Official unit test case 2', () => {
    const head = arrayToLinkedList([1, 2]);
    expect(linkedListToArray(reverseList(head))).toEqual([2, 1]);
  });

  test('Official unit test case 3', () => {
    const head = arrayToLinkedList([]);
    expect(linkedListToArray(reverseList(head))).toEqual([]);
  });
});
