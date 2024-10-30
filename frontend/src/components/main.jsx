import React, { useState, useEffect } from 'react';
import fetchTweets from '../service/tweets';
import { translateText } from '../service/translate';

const Main = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getTweets = async () => {
      const responseTweets = await fetchTweets();
      setTweets(responseTweets);
    };

    getTweets();
  }, []);

  return (
    <main className="container">
      <div className="columns">
        {/* Top Tweets Column */}
        <div className="column top-tweets">
          <div className="column-title">Top Tweets</div>
          {tweets.map((tweet, index) => (
            <div key={index} className="tweet-box">
              <div className="username">
                <div className={`user-icon ${tweet.userIcon}`}></div>
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

        {/* Latest Tweets Column */}
        <div className="column latest-tweets">
          <div className="column-title">Latest Tweets</div>
          {tweets.map((tweet, index) => (
            <div key={index} className="tweet-box">
              <div className="username">
                <div className={`user-icon ${tweet.userIcon}`}></div>
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

        {/* Trending Hashtags Column */}
        <div className="column trending-hashtags">
          <div className="column-title">Trending Hashtags</div>
          <div className="hashtag-list">
            <div className="hashtag-item">#messi</div>
            <div className="hashtag-item">#ronaldo</div>
            <div className="hashtag-item">#football</div>
            {/* Repeat as needed */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
