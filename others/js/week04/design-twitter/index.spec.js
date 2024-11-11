import { Twitter } from './index.js';


describe('Twitter', () => {
  test('Example 1', () => {
    const twitter = new Twitter();
    twitter.postTweet(1, 5);
    expect(twitter.getNewsFeed(1)).toEqual([5]);
    twitter.follow(1, 2);
    twitter.postTweet(2, 6);
    expect(twitter.getNewsFeed(1)).toEqual([6, 5]);
    twitter.unfollow(1, 2);
    expect(twitter.getNewsFeed(1)).toEqual([5]);
  });

  test('Post and retrieve tweets', () => {
    const twitter = new Twitter();
    twitter.postTweet(1, 1);
    expect(twitter.getNewsFeed(1)).toEqual([1]);
    twitter.postTweet(1, 2);
    expect(twitter.getNewsFeed(1)).toEqual([2, 1]);
  });

  test('Follow and unfollow', () => {
    const twitter = new Twitter();
    twitter.postTweet(1, 5);
    twitter.follow(1, 2);
    twitter.postTweet(2, 6);
    expect(twitter.getNewsFeed(1)).toEqual([6, 5]);
    twitter.unfollow(1, 2);
    expect(twitter.getNewsFeed(1)).toEqual([5]);
  });

  test('Multiple users and tweets', () => {
    const twitter = new Twitter();
    twitter.postTweet(1, 5);
    twitter.postTweet(1, 3);
    twitter.postTweet(1, 101);
    twitter.postTweet(1, 13);
    twitter.postTweet(1, 10);
    twitter.postTweet(1, 2);
    twitter.postTweet(1, 94);
    twitter.postTweet(1, 505);
    twitter.postTweet(1, 333);
    twitter.postTweet(1, 22);
    twitter.postTweet(1, 11);
    expect(twitter.getNewsFeed(1)).toEqual([11, 22, 333, 505, 94, 2, 10, 13, 101, 3]);
  });

  test('Follow multiple users', () => {
    const twitter = new Twitter();
    twitter.postTweet(1, 5);
    twitter.postTweet(2, 3);
    twitter.postTweet(3, 101);
    twitter.postTweet(4, 13);
    twitter.postTweet(5, 10);
    twitter.postTweet(6, 2);
    twitter.follow(1, 2);
    twitter.follow(1, 3);
    twitter.follow(1, 4);
    twitter.follow(1, 5);
    twitter.follow(1, 6);
    expect(twitter.getNewsFeed(1)).toEqual([2, 10, 13, 101, 3, 5]);
  });

  test('Operation sequence', () => {
    const twitter = new Twitter();
    twitter.postTweet(2, 5);    // user 2 posts tweet with id 5
    twitter.follow(1, 2);       // user 1 follows user 2
    twitter.follow(1, 2);       // user 1 follows user 2 again (duplicate operation)
    expect(twitter.getNewsFeed(1)).toEqual([5]);  // user 1's feed should show user 2's tweet
  });
});
