package walking_robot_simulation_test

import "testing"

func calcHash(x, y int) int {
	return (x + 30000) * 60000 + y + 30000
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

func robotSim(commands []int, obstacles [][]int) int {
	obstaclesMap := map[int][]int{}
	ans := 0
	//          N, E, S,  W
	dx := []int{0, 1, 0, -1}
	dy := []int{1, 0, -1, 0}

	x, y := 0, 0
	dir := 0 // N
	for _, v := range obstacles {
		curHash := calcHash(v[0], v[1])
		obstaclesMap[curHash] = v
	}
	for _, v := range commands {
		if v == -1 {
			dir = (dir + 1) % 4
		} else if v == -2 {
			dir = (dir - 1 + 4) % 4
		} else {
			for i := 0; i < v; i++ {
				nextX := x + dx[dir]
				nextY := y + dy[dir]
				tmp := calcHash(nextX, nextY)
				if _, ok := obstaclesMap[tmp]; ok {
					break
				}
				x = nextX
				y = nextY
				ans = max(ans, x * x + y * y)
			}
		}
	}
	return ans
}

func TestWalkingRobotSimulation(t *testing.T) {

}