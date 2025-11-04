import {
  // getSkyline,
  // getSkyline2 as getSkyline,
  getSkyline3,
  getSkyline4 as getSkyline
} from './index.js';

describe('getSkyline', () => {
  it('示例 1', () => {
    const buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]];
    const expected = [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]];
    expect(getSkyline(buildings)).toEqual(expected);
  });

  it('示例 2', () => {
    const buildings = [[0,2,3],[2,5,3]];
    const expected = [[0,3],[5,0]];
    expect(getSkyline(buildings)).toEqual(expected);
  });

  it('示例 3', () => {
    const buildings = [[2,9,10],[9,12,15]];
    const expected = [[2,10],[9,15],[12,0]];
    expect(getSkyline(buildings)).toEqual(expected);
  });

  it('示例 4', () => {
    const buildings = [[1,2,1],[1,2,2],[1,2,3]];
    const expected = [[1,3],[2,0]];
    expect(getSkyline(buildings)).toEqual(expected);
  });

  it('示例 5', () => {
    const buildings = [[4,9,10],[4,9,15],[4,9,12],[10,12,10],[10,12,8]];
    const expected = [[4,15],[9,0],[10,10],[12,0]];
    expect(getSkyline(buildings)).toEqual(expected);
  });

  it('示例 6', () => {
    const buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]];
    const expected = [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]];
    expect(getSkyline(buildings)).toEqual(expected);
  });
});
