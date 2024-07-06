package findtheindexofthefirstoccurrenceinastring_test

// 28. 找出字符串中第一个匹配项的下标 https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/

import "testing"

func strStr(haystack string, needle string) int {
	if len(needle) == 0 {
		return 0
	}
	hLen := len(haystack)
	nLen := len(needle)
	haystack = " " + haystack
	needle = " " + needle
	p := int64(1e9) + 7

	nHash := int64(0)
	for i := 1; i <= nLen; i++ {
		nHash = (nHash*131 + int64(needle[i]-'a'+1)) % p
	}
	hHash := make([]int64, hLen+1)
	hHash[0] = 0
	p131 := make([]int64, hLen+1)
	p131[0] = 1
	for i := 1; i <= hLen; i++ {
		hHash[i] = (hHash[i-1]*131 + int64(haystack[i]-'a'+1)) % p
		p131[i] = p131[i-1] * 131 % p
	}

	for i := nLen; i <= hLen; i++ {
		result := calcHash(hHash, p131, p, i-nLen+1, i)
		if result == nHash {
			return i - nLen
		}
	}
	return -1
}

func calcHash(H []int64, p131 []int64, p int64, l int, r int) int64 {
	return ((H[r]-H[l-1]*p131[r-l+1])%p + p) % p
}

func TestStrStr(t *testing.T) {
	result := strStr("sadbutsad", "sad") // 0
	// result := strStr("leetcode", "leeto") // -1
	t.Log(result)
}
