package powx_n_test

import "testing"

func myPow(x float64, n int) float64 {
	if n == 0 {
		return 1
	}
	rest := n % 2
	if rest == 0 {
		tmp := myPow(x, n / 2)
		return tmp * tmp
	} else if rest == 1 {
		tmp := myPow(x, (n - 1) / 2)
		return tmp * tmp * x
	}
	if n < 0 {
		return 1 / myPow(x, -n)
	}
	return 0
}

func TestPowxN(t *testing.T) {
	result := myPow(2, 10)
	t.Log(result)
}