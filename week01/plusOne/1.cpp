#include <iostream>

using namespace std;

int* plusOne(size_t sz, int x[]) {
    int tmp = 1;
    for (int i = sz - 1; i >= 0; i--)
    {
        tmp += x[i];
        if (tmp > 9)
        {
            x[i] = tmp - 10;
            tmp = 1;
        } else {
            x[i] = tmp;
            tmp = 0;
        }
    }
    for (size_t i = 0; i < sz; i++) {
        std::cout << x[i] << ' ';
    }
    std::cout << '\n';
    return x;
}

int main()
{
    int array1[3] = {1, 2, 9};
    int array2[4] = {4, 3, 2, 1};
    int array3[1] = {0};
    int* a = plusOne((sizeof(array1) / sizeof(*array1)), array1);
    int* b = plusOne((sizeof(array2) / sizeof(*array2)), array2);
    int* c = plusOne((sizeof(array3) / sizeof(*array3)), array3);
}
