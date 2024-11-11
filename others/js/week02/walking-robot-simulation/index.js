// https://leetcode.cn/problems/walking-robot-simulation/

function hash (x, y) {
  const power = Math.pow(10, 4);
  return (x + 3 * power) * power * 10 + y;
}
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
const robotSim = function (commands, obstacles) {
  const map = {};
  for (let i = 0; i < obstacles.length; i++) {
    map[hash(obstacles[i][0], obstacles[i][1])] = 1;
  }
  if (map[0]) {
    return 0;
  }
  let x = 0;
  let y = 0;
  // const directions = ['+X', '-Y', '-X', '+Y']
  let direction = 3;
  let ans = 0;
  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === -1) {
      direction = (direction + 1) % 4;
    } else if (commands[i] === -2) {
      direction = (direction - 1 + 4) % 4;
    } else {
      if (direction === 3) {
        for (let j = 0; j < commands[i]; j++) {
          if (map[hash(x, y + 1)]) {
            break;
          }
          y++;
        }
      } else if (direction === 0) {
        for (let j = 0; j < commands[i]; j++) {
          if (map[hash(x + 1, y)]) {
            break;
          }
          x++;
        }
      } else if (direction === 1) {
        for (let j = 0; j < commands[i]; j++) {
          if (map[hash(x, y - 1)]) {
            break;
          }
          y--;
        }
      } else {
        for (let j = 0; j < commands[i]; j++) {
          if (map[hash(x - 1, y)]) {
            break;
          }
          x--;
        }
      }
    }
    if (x * x + y * y > ans) {
      ans = x * x + y * y;
    }
  }
  return ans;
};

export { robotSim };
