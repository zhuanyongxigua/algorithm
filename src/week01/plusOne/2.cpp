#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for(size_t i = digits.size(); i >= 1; i--) {
            digits[i - 1] = digits[i - 1] + 1;
            digits[i - 1] = digits[i - 1] % 10;
            if (digits[i - 1] != 0) return digits;
        }
        std::vector<int> a(digits.size() + 1, 0);
        a[0] = 1;
        return a;
    }
    void print(vector<int>& array) {
        for (size_t i = 0; i < array.size(); i++)
        {
            std::cout << array[i] << " ";
        }
        std::cout << "\n";
    }
};

int main()
{
    Solution s;
    vector<int> array1 = {1, 2, 9};
    vector<int> array2 = {4, 3, 2, 1};
    vector<int> array3 = {0};
    vector<int> array4 = {9};
    vector<int> array1Result = s.plusOne(array1);
    vector<int> array2Result = s.plusOne(array2);
    vector<int> array3Result = s.plusOne(array3);
    vector<int> array4Result = s.plusOne(array4);
    s.print(array1Result);
    s.print(array2Result);
    s.print(array3Result);
    s.print(array4Result);
}