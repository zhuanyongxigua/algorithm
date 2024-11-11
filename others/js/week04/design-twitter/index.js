// https://leetcode.cn/problems/design-twitter/description/

class ListNode {
  constructor (
    tweetId = 0,
    tweetIndex = -1,
    next = null,
  ) {
    // tweet id
    this.tweetId = tweetId;
    this.tweetIndex = tweetIndex;
    this.next = next;
  }
}

class MaxBinaryHeap {
  constructor () {
    // 数组存储完全二叉树
    // 从索引0开始存
    this.heap = [];
  }
  swap (i,j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  isEmpty () {
    return this.heap.length === 0;
  }
  push (node) {
    // 插入到尾部
    this.heap.push(node);
    // 向上调整
    this.heapifyUp(this.heap.length - 1);
  }
  pop () {
    const ans = this.heap[0];
    // 末尾交换到头部，然后删除末尾
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    // 向下调整
    this.heapifyDown(0);
    return ans;
  }
  heapifyUp (p) {
    while (p > 0) {
      const fa = (p - 1) >> 1;
      // 右移1位，等于整除2
      if (this.heap[p].val > this.heap[fa].val) {
        // 小根堆
        this.swap(p, fa);
        p = fa;
      } else break;
    }
  }
  heapifyDown (p) {
    let child = p * 2 + 1;
    while (child < this.heap.length) {
      // child未出界，说明p有合法的child，还不是叶子
      const otherChild = p * 2 + 2;
      // 先比较两个孩子，谁小就继续跟p比较
      // child存较小的孩子
      if (otherChild < this.heap.length && this.heap[child].val < this.heap[otherChild].val) {
        child = otherChild;
      }
      // 让child跟p比较
      if (this.heap[p].val < this.heap[child].val) {
        // 小根堆
        this.swap(p, child);
        p = child;
        child = p * 2 + 1;
      } else break;
    }
  }
}

/** *@param{ListNode[]}lists
 * *@return{ListNode}
 * */
const mergeKLists = function (lists, num) {
  // O(元素个数*logK)
  // O(total*logK)
  const q = new MaxBinaryHeap();
  for (const listNode of lists) {
    if(listNode != null) {
      q.push({
        val: listNode.tweetIndex,
        listNode: listNode
      });
    }
  }
  const ans = [];
  while(!q.isEmpty()){
    const node = q.pop();
    ans.push(node.listNode.tweetId);
    if (ans.length >= num) {
      break
    }
    // 当最小被取出后，指针向后移动一位，可能需要插入新的元素
    const p = node.listNode.next;
    if(p != null){
      q.push({
        val: p.tweetIndex,
        listNode: p
      });
    }
  }
  return ans;
};

class User {
  constructor (id) {
    this.id = id;
    this.following = {};
    this.followers = {};
    this.selfHead = new ListNode(-1);
    this.selfTail = this.selfHead;
    this.feeds = [];
  }
  heapify () {
    const lists = [this.selfHead.next];
    for (const followeeId in this.following) {
      lists.push(this.following[followeeId].selfHead.next);
    }
    this.feeds = mergeKLists(lists, 10);
  }
  notify (tweet) {
    for (const followerId in this.followers) {
      this.followers[followerId].updateFeeds(tweet);
    }
  }
  updateFeeds (tweet) {
    this.feeds = [tweet.tweetId, ...this.feeds];
    if (this.feeds.length > 10) {
      this.feeds.pop();
    }
  }
  post (tweet) {
    const next = this.selfHead.next;
    this.selfHead.next = tweet;
    tweet.next = next;
    this.notify(tweet);
    this.updateFeeds(tweet);
  }
  getFeeds () {
    return this.feeds;
  }
}

const Twitter = function () {
  this.index = 0;
  this.users = {};
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function (userId, tweetId) {
  if (!this.users[userId]) {
    this.users[userId] = new User(userId);
  }
  this.index++;
  const curTweetPost = new ListNode(
    tweetId,
    this.index
  );
  this.users[userId].post(curTweetPost);
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
  if (!this.users[userId]) {
    return [];
  }
  return this.users[userId].getFeeds();
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
  if (!this.users[followerId]) {
    this.users[followerId] = new User(followerId);
  }
  if (!this.users[followeeId]) {
    this.users[followeeId] = new User(followeeId);
  }
  this.users[followerId].following[followeeId] = this.users[followeeId];
  this.users[followerId].heapify();
  this.users[followeeId].followers[followerId] = this.users[followerId];
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
  delete this.users[followerId].following[followeeId];
  this.users[followerId].heapify();
  delete this.users[followeeId].followers[followerId];
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

export { Twitter, ListNode };
