import { MinStack } from '.';


describe('MinStack', () => {
  let minStack;

  beforeEach(() => {
    minStack = new MinStack();
  });

  test('should perform operations as per the provided sequence', () => {
    // Following the sequence from the comment
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    expect(minStack.getMin()).toBe(-3); // getMin should return -3
    minStack.pop();
    expect(minStack.top()).toBe(0); // top should return 0 after pop
    expect(minStack.getMin()).toBe(-2); // getMin should return -2 after pop
  });
});

