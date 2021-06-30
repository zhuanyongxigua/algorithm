package subdomain_visit_count_test

import (
	"fmt"
	"hash/maphash"
	"strconv"
	"strings"
	"testing"
)

func existOrCreate(m map[string]int, key string, val int) {
	if _, ok := m[key]; !ok {
		m[key] = 0
	}
	m[key] += val

}

func subdomainVisitCount(domains []string)[]string {
	var h maphash.Hash
	m := make(map[string]int)
	for _, domain := range domains {
		var curH maphash.Hash
		curH.SetSeed(h.Seed())
		s := strings.Split(domain, " ")
		val, _ := strconv.Atoi(s[0])
		existOrCreate(m, s[1], val)
		d := strings.Split(s[1], ".")
		if len(d) == 3 {
			existOrCreate(m, fmt.Sprintf("%s.%s", d[1], d[2]), val)
		}
		existOrCreate(m, d[len(d) - 1], val)
	}
	var r []string
	for k, v := range m {
		t := strconv.Itoa(v)
		r = append(r, fmt.Sprintf("%s %s", t, k))
	}
	return r
}


func TestSubdomainVisitCount(t *testing.T) {
	// ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
	// var h maphash.Hash
	// var h2 maphash.Hash
	// h2.SetSeed(h.Seed())
	// t.Log(h.Sum([]byte("hello world")))
	// t.Log(h2.Sum([]byte("hello world")))
	r := subdomainVisitCount([]string{"900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"})
	t.Log(r)
}
