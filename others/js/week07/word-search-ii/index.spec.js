import { findWords } from ".";

describe('Test findWords', () => {
  test('[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]', () => {
    const board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
    const words = ["oath","pea","eat","rain"]
    const result = findWords(board, words)
    expect(result).toEqual(["oath","eat"]);
  })

  test('[["a","b","c","e"],["x","x","c","d"],["x","x","b","a"]], ["abc","abcd"]', () => {
    const board = [["a","b","c","e"],["x","x","c","d"],["x","x","b","a"]]
    const words = ["abc","abcd"]
    const result = findWords(board, words)
    expect(result).toEqual(["abc","abcd"])
  })
})
