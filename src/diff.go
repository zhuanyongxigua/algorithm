package main

import (
	"fmt"
	"io/ioutil"
	"os"

	"github.com/sergi/go-diff/diffmatchpatch"
)

func main() {
	file1 := os.Args[1]
	file2 := os.Args[2]

	dat1, err := ioutil.ReadFile(file1)
	if err != nil {
		panic(err)
	}
	dat2, err := ioutil.ReadFile(file2)
	if err != nil {
		panic(err)
	}
	dat1S := string(dat1)
	dat2S := string(dat2)

	dmp := diffmatchpatch.New()

	diffs := dmp.DiffMain(dat1S, dat2S, false)

	fmt.Println(dmp.DiffPrettyText(diffs))
}