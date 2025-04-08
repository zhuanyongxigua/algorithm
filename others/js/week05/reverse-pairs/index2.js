let ans = 0;

function reversePairs (nums) {
  ans = 0;
  mergeSort(nums, 0, nums.length - 1);
  return ans;
}

function mergeSort (arr, l, r) {
  if (l >= r) return;
  const mid = Math.floor((l + r) / 2);  // (l + r) / 2
  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);
  calculate(arr, l, mid, r);
  merge(arr, l, mid, r);
}

function calculate (arr, left, mid, right) {
  let j = mid + 1;
  for (let i = left; i <= mid; i++) {
    while (j <= right && arr[i] > 2 * arr[j]) {
      j++;
    }
    ans += j - (mid + 1);  // Adding the number of valid pairs
  }
}

function merge (arr, left, mid, right) {
  const temp = [];
  let i = left; let j = mid + 1;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp.push(arr[i]);
      i++;
    } else {
      temp.push(arr[j]);
      j++;
    }
  }
  // Push remaining elements of the left half
  while (i <= mid) {
    temp.push(arr[i]);
    i++;
  }
  // Push remaining elements of the right half
  while (j <= right) {
    temp.push(arr[j]);
    j++;
  }
  // Copy sorted elements back to the original array
  for (let k = 0; k < temp.length; k++) {
    arr[left + k] = temp[k];
  }
}

export { reversePairs };
