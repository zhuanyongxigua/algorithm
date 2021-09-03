var maxSlidingWindow = function(nums, k) {
	var ans = [];
	// Array simulate deque, store index(represent time)
	var l = 0, r = -1; // left, right
	var q = []; // left-right (contain start and end) store elements in the queue
	for (let i = 0; i < nums.length; i++) {
		// ensure queue head is valid
		while (l <= r && q[l] <= i - k) l++;
		// maintain queue monotonic, insert new index
		while (l <= r && nums[q[r]] <= nums[i]) r--;
		r++;
		q[r] = i;
		// Get queue head, update ans
		if (i >= k - i) ans.push(nums[q[l]]);
	}
	return ans;
}
