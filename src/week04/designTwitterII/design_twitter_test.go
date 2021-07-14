package design_twitter_test

import (
	"sort"
	"testing"
)

type tweet struct {
	id int
	order int
}
type Twitter struct {
	tweets map[int][]tweet
	followers map[int]map[int]struct{}
	count int
}

/** Initialize your data structure here. */
func Constructor() Twitter {
	return Twitter{
			map[int][]tweet{}, 
			map[int]map[int]struct{}{},
			0,
	}
}


/** Compose a new tweet. */
func (this *Twitter) PostTweet(userId int, tweetId int)  {
	t := tweet{
			id: tweetId,
			order: this.count,
	}
	this.count++
	this.tweets[userId] = append([]tweet{t}, this.tweets[userId]...)
}


/** Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. */
func (this *Twitter) GetNewsFeed(userId int) []int {
	tweets := this.tweets[userId]
	if len(tweets) > 10 {
			tweets = tweets[:10]
	}
	followees := this.followers[userId]
	for key, _ := range followees {
			t, _ := this.tweets[key]
			if len(t) > 10 {
					t = t[:10]
			}
			tweets = append(tweets, t...)
	}
	sort.Slice(tweets, func(i, j int) bool {
			return tweets[i].order > tweets[j].order
	})
	if len(tweets) > 10 {
			tweets = tweets[:10]
	}
	result := make([]int, len(tweets))
	for i, v := range tweets {
			result[i] = v.id
	}
	return result
}


/** Follower follows a followee. If the operation is invalid, it should be a no-op. */
func (this *Twitter) Follow(followerId int, followeeId int)  {
	if _, ok := this.followers[followerId]; !ok {
			this.followers[followerId] = make(map[int]struct{})
	}
	this.followers[followerId][followeeId] = struct{}{}
}


/** Follower unfollows a followee. If the operation is invalid, it should be a no-op. */
func (this *Twitter) Unfollow(followerId int, followeeId int)  {
	delete(this.followers[followerId], followeeId)
}

func TestDesignTwitter(t *testing.T) {
	t.Log("twitter")
}