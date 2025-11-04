import { networkDelayTime } from ".";

describe('Test networkDelayTime', () => {
  test('[[2,1,1],[2,3,1],[3,4,1]], 4, 2', () => {
    const result = networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)
    expect(result).toBe(2)
  })
})
