#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int tmp = 1;
        for (int i = digits.size() - 1; i >= 0; i--)
        {
            tmp += digits[i];
            if (tmp > 9)
            {
                digits[i] = tmp - 10;
                tmp = 1;
            } else {
                digits[i] = tmp;
                tmp = 0;
            }
        }
        if (tmp == 1) {
            digits.insert(digits.begin(), tmp);
        }
        return digits;
    }
};