import { robotSim } from './index.js';

describe('robotSim', () => {
  test('Official test case 1: commands = [4,-1,3], obstacles = [] should return 25', () => {
    expect(robotSim([4,-1,3], [])).toBe(25);
  });

  test('Official test case 2: commands = [4,-1,4,-2,4], obstacles = [[2,4]] should return 65', () => {
    expect(robotSim([4,-1,4,-2,4], [[2,4]])).toBe(65);
  });

  test('Official test case 3: commands = [6,-1,-1,6], obstacles = [] should return 36', () => {
    expect(robotSim([6,-1,-1,6], [])).toBe(36);
  });
});
