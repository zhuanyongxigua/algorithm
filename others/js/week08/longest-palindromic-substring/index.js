// https://leetcode.cn/problems/longest-palindromic-substring/

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    s = ' ' + s;
    const prefix = [0];
    const suffix = [];
    const b = 131;
    const p = 99999991;
    const pow = [1];
    for (let i = 1; i <= 1000; i++) {
        pow[i] = pow[i - 1] * b % p;
    }
    function charHash (char) {
        return char.charCodeAt(0) - '0'.charCodeAt(0) + 1;
    }
    for (let i = 1; i < s.length; i++) {
        prefix[i] = (prefix[i - 1] * b + charHash(s[i])) % p;
    }
    for (let i = s.length - 1; i > 0; i--) {
        if (i === s.length - 1) {
            suffix[i] = charHash(s[i]);
        } else {
            suffix[i] = (suffix[i + 1] * b + charHash(s[i])) % p;
        }
    }
    function getSegmentHash (left, right, isReverse = false) {
        if (!isReverse) {
            if (left === 0) {
                return prefix[right];
            } else {
                return (((prefix[right] - prefix[left - 1] * pow[right - left + 1]) % p) + p) % p;
            }
        } else {
            if (right === s.length - 1) {
                return suffix[left];
            } else {
                return (((suffix[left] - suffix[right + 1] * pow[right - left + 1]) % p) + p) % p;
            }
        }
    }
    let left = 1;
    let right = 1;
    for (let i = 1; i < s.length; i++) {
        let lenL = 0;
        let lenR = s.length;
        let len = 0;
        while (lenL < lenR) {
            len = (lenL + lenR) >> 1;
            if (len === 0) {
                lenL = len + 1;
            } else if (i - len >= 1 && i + len <= s.length - 1) {
                const leftPart = getSegmentHash(i - len, i - 1);
                const rightPart = getSegmentHash(i + 1, i + len, true);
                if (leftPart === rightPart) {
                    lenL = len + 1;
                    if (2 * len > right - left) {
                        left = i - len;
                        right = i + len;
                    }
                } else {
                    lenR = len;
                }
            } else {
                lenR = len;
            }
        }
    }
    for (let j = 1; j < s.length; j++) {
        let lenL = 0;
        let lenR = s.length;
        let len = 0;
        while (lenL < lenR) {
            len = (lenL + lenR) >> 1;
            if (len === 0) {
                lenL = len + 1;
            } else if (j - len >= 0 && j + len <= s.length - 1) {
                const leftPart = getSegmentHash(j - len + 1, j);
                const rightPart = getSegmentHash(j + 1, j + len, true);
                if (leftPart === rightPart) {
                    lenL = len + 1;
                    if (2 * len > right - left + 1) {
                        left = j - len + 1;
                        right = j + len
                    }
                } else {
                    lenR = len;
                }
            } else {
                lenR = len;
            }
        }
    }
    return s.slice(left, right + 1);
};

export { longestPalindrome }
