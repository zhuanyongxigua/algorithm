import {
  // minMutation,
  minMutationBFS as minMutation
} from './index';

describe('Test minMutation', () => {
  test('minMutation test case 1', () => {
    expect(minMutation('AACCGGTT', 'AACCGGTA', ['AACCGGTA'])).toBe(1);
  });

  test('minMutation test case 2', () => {
    expect(minMutation('AACCGGTT', 'AAACGGTA', ['AACCGGTA', 'AACCGCTA', 'AAACGGTA'])).toBe(2);
  });

  test('minMutation test case 3', () => {
    expect(minMutation('AAAAACCC', 'AACCCCCC', ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'])).toBe(3);
  });

  test('aaa', () => {
    expect(minMutation('AACCGGTT', 'AAACGGTA', ['AACCGATT','AACCGATA','AAACGATA','AAACGGTA'])).toBe(4);
  });

  test('bbb', () => {
    expect(minMutation('AAAACCCC', 'CCCCCCCC', ['AAAACCCA','AAACCCCA','AACCCCCA','AACCCCCC','ACCCCCCC','CCCCCCCC','AAACCCCC','AACCCCCC'])).toBe(4);
  });

  test('ccc', () => {
    expect(minMutation('AAAAAAAA', 'AAAAACGG', ['AAAAAAGA','AAAAAGGA','AAAAACGA','AAAAACGG','AAAAAAGG','AAAAAAGC'])).toBe(3);
  });

  test('ddd', () => {
    expect(minMutation('AAAAAAAA', 'AAAAAAAA', [])).toBe(-1);
  });

  test('eee', () => {
    expect(minMutation('AAAAAAAA', 'CCCCCCCC', ['AAAAAAAA','AAAAAAAC','AAAAAACC','AAAAACCC','AAAACCCC','AACACCCC','ACCACCCC','ACCCCCCC','CCCCCCCA'])).toBe(-1);
  });
});
