package acwingsupermarket_test

// 145.超市
// https://www.51cto.com/article/672502.html
// https://www.acwing.com/blog/content/28740/

import (
	"fmt"
	"strconv"
	"testing"
)

type Case struct {
	Num      int
	Products [][]int
}

func AA() {
	j := 0
	data := []Case{}
	curSList := []int{}
	for {
		if j >= 14 {
			break
		}
		var s string
		fmt.Scanf("%s", &s)
		if s == "" {
			if len(curSList) <= 0 {
				break
			}
			data = append(data, Case{
				Num:      curSList[0],
				Products: [][]int{},
			})
			for i := 1; i < len(curSList); i++ {
				data[j].Products = append(data[j].Products, []int{curSList[i], curSList[i+1]})
				i++
			}
			fmt.Printf("curSList: %v\n", curSList)
			fmt.Printf("data: %v\n", data)
			curSList = []int{}
			j++
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			panic(err)
		}
		curSList = append(curSList, n)
	}
}

func TestAA(t *testing.T) {

}
