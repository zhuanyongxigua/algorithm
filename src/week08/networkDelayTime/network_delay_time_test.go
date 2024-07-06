package networkdelaytime_test

// 743. 网络延迟时间 https://leetcode.cn/problems/network-delay-time/

import "testing"

func networkDelayTime(times [][]int, n int, k int) int {
	dist := make([]int, n+1)
	for i := range dist {
		dist[i] = 1e9
	}
	dist[k] = 0
	for i := 1; i < n; i++ {
		updated := false
		for _, edge := range times {
			x := edge[0]
			y := edge[1]
			z := edge[2]
			if dist[y] > dist[x]+z {
				dist[y] = dist[x] + z
				updated = true
			}
		}
		if updated == false {
			break
		}
	}
	ans := 0
	for i := 1; i < len(dist); i++ {
		if dist[i] == 1e9 {
			return -1
		}
		if dist[i] > ans {
			ans = dist[i]
		}
	}
	return ans
}

func TestNetworkDelayTime(t *testing.T) {
	result := networkDelayTime([][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2)
	// result := networkDelayTime([][]int{{1, 2, 1}}, 2, 1)
	// result := networkDelayTime([][]int{{1, 2, 1}}, 2, 2)
	t.Log(result)
}
