import { isValid } from '.';

describe('Test isValid', () => {
  it('Official unit test case1', () => {
    expect(isValid('()')).toEqual(true);
  });

  it('Official unit test case2', () => {
    expect(isValid('()[]{}')).toEqual(true);
  });

  it('Official unit test case3', () => {
    expect(isValid('(]')).toEqual(false);
  });

  it('(', () => {
    expect(isValid('(')).toEqual(false);
  });

  it('((', () => {
    expect(isValid('((')).toEqual(false);
  });
});
