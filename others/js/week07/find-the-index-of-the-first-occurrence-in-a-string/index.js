/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    const h = ' ' + haystack;
    const n = ' ' + needle;
    const b = 13331;
    const p = 9999991;
    const p13331 = [1];
    const H = [0];
    for (let i = 1; i < h.length; i++) {
        H[i] = (H[i - 1] * b + (h[i].charCodeAt(0) - 'a'.charCodeAt(0) + 1)) % p;
        p13331[i] = p13331[i - 1] * b % p;
    }
    let nH = 0;
    for (let i = 1; i < n.length; i++) {
        console.log('nH', (nH * b + (n[i].charCodeAt(0) - 'a'.charCodeAt(0) + 1)))
        nH = (nH * b + (n[i].charCodeAt(0) - 'a'.charCodeAt(0) + 1)) % p;
    }
    let ans = -1;
    for (let i = 1; i < H.length - needle.length + 1; i++) {
      console.log('i', i);
      console.log('result', (H[needle.length + i - 1] - H[i - 1] * (b ** needle.length)))
      console.log()
        const result = (H[needle.length + i - 1] - H[i - 1] * p13331[needle.length] % p + p) % p;
        if (result === nH) {
            ans = i - 1;
            return ans;
        }
    }
    return ans;
};

export { strStr }
