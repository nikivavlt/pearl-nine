import React, { useState, useEffect } from 'react';
import fetchTweets from '../service/tweets';
import getTrendingHashtags from '../utils/get-trending-hashtags';
import sortTweetsByLikes from '../utils/sort-by-likes';
import { translateText } from '../service/translate';

const Main = () => {
  const [tweets, setTweets] = useState([]);
  const [topTweets, setTopTweets] = useState([]);
  const [latestTweets, setLatestTweets] = useState([]);

  useEffect(() => {
    const getTweets = async () => {
      const responseTweets = await fetchTweets();
      setTweets(responseTweets);

      const top = sortTweetsByLikes(responseTweets);
      setTopTweets(top);

      const latest = sortTweetsByLikes(responseTweets);
      setLatestTweets(latest);
    };

    getTweets();
  }, []);

  return (
    <main className="container">
      <div className="columns">
        {/* Top Tweets Column */}
        <div className="column top-tweets">
          <div className="column-title">Top Tweets</div>
          <div className='tweets'>
          {topTweets.map((tweet, index) => (
            <div key={index} className="tweet-box">
              <div className="username">
                <div className={`user-icon`}>
                  <img 
                    src={tweet.avatar} 
                    alt='User avatar'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/avatar.webp';
                    }} 
                  />
                </div>
                {tweet.username}
              </div>
              <div className="content">
                {tweet.text}
                {tweet.hashtags && tweet.hashtags.length > 0 && (
                  <span>
                    {tweet.hashtags.map((hashtag, hIndex) => (
                      <span key={hIndex} className="hashtag">#{hashtag}</span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Latest Tweets Column */}
        <div className="column latest-tweets">
          <div className="column-title">Latest Tweets</div>
          <div className="tweets">
          {tweets.map((tweet, index) => (
            <div key={index} className="tweet-box">
              <div className="username">
                <div className={`user-icon`}>
                  <img 
                    src={tweet.avatar} 
                    alt='User avatar' 
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if fallback fails
                      e.target.src = '/avatar.webp'; // Fallback image
                    }} 
                  />
                </div>
                {tweet.username}
              </div>
              <div className="content">
                {tweet.text}
                {tweet.hashtags && tweet.hashtags.length > 0 && (
                  <span>
                    {tweet.hashtags.map((hashtag, hIndex) => (
                      <span key={hIndex} className="hashtag">#{hashtag}</span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Trending Hashtags Column */}
        <div className="column trending-hashtags">
          <div className="column-title">Trending Hashtags</div>
          <div className="hashtag-list">
          <div className='tweets'>
              {getTrendingHashtags(tweets).map((hashtag, index) => {
                return (
                  <div key={index} className='hashtag-item'>{hashtag}</div>
                );
              })}
            </div>
            {/* Repeat as needed */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
