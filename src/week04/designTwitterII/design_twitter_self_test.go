package tmp_test

import (
	"testing"
)

type PostItem struct {
	Val int
	Index int
	Next *PostItem
}

type User struct {
	Followee map[int]int
	Post *PostItem
}

type Twitter struct {
	Users map[int]*User
	TotalIndex int
}

func Constructor() Twitter {
	twitter := Twitter{make(map[int]*User), 0}
	return twitter
}


func (this *Twitter) PostTweet(userId int, tweetId int)  {
	if _, ok := this.Users[userId]; !ok {
		this.Users[userId] = &User{make(map[int]int), &PostItem{-1, -1, nil}}
	}
	post := &PostItem{tweetId, this.TotalIndex, this.Users[userId].Post.Next}
	this.Users[userId].Post.Next = post
	this.TotalIndex++
}


func (this *Twitter) GetNewsFeed(userId int) []int {
	ans := []int{}
	if _, ok := this.Users[userId]; !ok {
		return ans
	}
	lists := []*PostItem{this.Users[userId].Post.Next}
	for _, followeeId := range this.Users[userId].Followee {
		lists = append(lists, this.Users[followeeId].Post.Next)
	}
	var r func(start, end int) *PostItem
	r = func(start, end int) *PostItem {
		if start == end {
			return lists[start]
		}
		index := (end - start) / 2 + start
		left := r(start, index)
		right := r(index + 1, end)
		head := &PostItem{-1, -1, nil}
		tail := head
		for left != nil && right != nil {
			if left.Index > right.Index {
				tail.Next = &PostItem{left.Val, left.Index, nil}
				left = left.Next
			} else {
				tail.Next = &PostItem{right.Val, right.Index, nil}
				right = right.Next
			}
			tail = tail.Next
		}
		if left == nil {
			for right != nil {
				tail.Next = &PostItem{right.Val, right.Index, nil}
				tail = tail.Next
				right = right.Next
			}
		} else {
			for left != nil {
				tail.Next = &PostItem{left.Val, left.Index, nil}
				tail = tail.Next
				left = left.Next
			}
		}
		return head.Next
	}
	ansList := r(0, len(lists) - 1)
	ansListLen := 0
	for ansList != nil {
		if ansListLen >= 10 {
			break
		}
		ansListLen++
		ans = append(ans, ansList.Val)
		ansList = ansList.Next
	}
	return ans
}


func (this *Twitter) Follow(followerId int, followeeId int)  {
	if _, ok := this.Users[followerId]; !ok {
		this.Users[followerId] = &User{make(map[int]int), &PostItem{-1, -1, nil}}
	}
	if _, ok := this.Users[followeeId]; !ok {
		this.Users[followeeId] = &User{make(map[int]int), &PostItem{-1, -1, nil}}
	}
	this.Users[followerId].Followee[followeeId] = followeeId
}


func (this *Twitter) Unfollow(followerId int, followeeId int)  {
	if _, ok := this.Users[followerId]; ok {
		delete(this.Users[followerId].Followee, followeeId)
	}
}

func TestDesignTwitter(t *testing.T) {
	// ["Twitter","postTweet","follow","follow","getNewsFeed","postTweet","getNewsFeed","getNewsFeed","unfollow","getNewsFeed","getNewsFeed","unfollow","getNewsFeed","getNewsFeed"]
	// [[],        [1,5],      [1,2],   [2,1],   [2],          [2,6],      [1],          [2],          [2,1],     [1],          [2],          [1,2],     [1],          [2]]
	// twitter := Constructor()
	// twitter.PostTweet(1, 5)
	// twitter.Follow(1, 2)
	// twitter.Follow(2, 1)
	// twitter.GetNewsFeed(2)
	// twitter.PostTweet(2, 6)
	// twitter.GetNewsFeed(1)
	// twitter.GetNewsFeed(2)
	// twitter.Unfollow(2, 1)
	// twitter.GetNewsFeed(1)
	// twitter.GetNewsFeed(2)
	// twitter.Unfollow(1, 2)
	// twitter.GetNewsFeed(1)
	// twitter.GetNewsFeed(2)

	// twitter := Constructor()
	// twitter.PostTweet(1, 5)
	// twitter.GetNewsFeed(1)
	// twitter.Follow(1, 2)
	// twitter.PostTweet(2, 6)
	// twitter.GetNewsFeed(1)
	// twitter.Unfollow(1, 2)
	// twitter.GetNewsFeed(1)

	// twitter := Constructor()
	// twitter.Follow(1, 5)
	// twitter.GetNewsFeed(1)

	// twitter := Constructor()
	// twitter.PostTweet(1, 5)
	// twitter.PostTweet(1, 3)
	// twitter.PostTweet(1, 101)
	// twitter.PostTweet(1, 13)
	// twitter.PostTweet(1, 10)
	// twitter.PostTweet(1, 2)
	// twitter.PostTweet(1, 94)
	// twitter.PostTweet(1, 505)
	// twitter.PostTweet(1, 333)
	// twitter.PostTweet(1, 22)
	// twitter.PostTweet(1, 11)
	// twitter.GetNewsFeed(1)

	// ["Twitter",
	// "postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet","postTweet",
	// "follow","follow","follow","follow","follow","follow","follow","follow","follow","follow","follow","follow","getNewsFeed","getNewsFeed","getNewsFeed","getNewsFeed","getNewsFeed"]
	// [[],
	// [1,6765],   [5,671],    [3,2868],    [4,8148],   [4,386],    [3,6673],   [3,7946],   [3,1445],   [4,4822],   [1,3781],   [4,9038],   [1,9643],   [3,5917],   [2,8847],
	// [1,3],    [1,4],   [4,2],   [4,1],   [3,2],   [3,5],   [3,1],   [2,3],   [2,1],   [2,5],   [5,1],   [5,2],   [1],          [2],          [3],          [4],          [5]]
	twitter := Constructor()
	twitter.PostTweet(1, 6765)
	twitter.PostTweet(5, 671)
	twitter.PostTweet(3, 2868)
	twitter.PostTweet(3, 8148)
	twitter.PostTweet(4, 386)
	twitter.PostTweet(3, 6673)
	twitter.PostTweet(3, 7946)
	twitter.PostTweet(3, 1445)
	twitter.PostTweet(4, 4822)
	twitter.PostTweet(1, 3781)
	twitter.PostTweet(4, 9038)
	twitter.PostTweet(1, 9643)
	twitter.PostTweet(3, 5917)
	twitter.PostTweet(2, 8847)
	twitter.PostTweet(1, 6765)
	twitter.Follow(1, 3)
	twitter.Follow(1, 4)
	twitter.Follow(4, 2)
	twitter.Follow(4, 1)
	twitter.Follow(3, 2)
	twitter.Follow(3, 5)
	twitter.Follow(3, 1)
	twitter.Follow(2, 3)
	twitter.Follow(2, 1)
	twitter.Follow(2, 5)
	twitter.Follow(5, 1)
	twitter.Follow(5, 2)
	t.Log(twitter.GetNewsFeed(1))
}