import { findCircleNum  } from ".";

describe('Test findCircleNum', () => {
  test('[[1,0,0],[0,1,0],[0,0,1]]', () => {
    const result = findCircleNum([[1,0,0],[0,1,0],[0,0,1]]);
    expect(result).toBe(3);
  })

  test('[[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]]', () => {
    const result = findCircleNum([[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]]);
    expect(result).toBe(1);
  })
})
