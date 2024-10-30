const getTrendingHashtags = (tweets) => {
  const hashtagCount = {};

  // Count occurrences of each hashtag
  tweets.forEach(tweet => {
    tweet.hashtags.forEach(hashtag => {
      if (hashtagCount[hashtag]) {
        hashtagCount[hashtag]++;
      } else {
        hashtagCount[hashtag] = 1;
      }
    });
  });

  // Convert hashtag counts to an array of [hashtag, count] pairs
  const hashtagArray = Object.entries(hashtagCount);

  // Sort hashtags by count in descending order
  hashtagArray.sort((a, b) => b[1] - a[1]);

  // Get the top 10 hashtags
  const topHashtags = hashtagArray.slice(0, 10).map(([hashtag]) => hashtag);

  return topHashtags;
};

export default getTrendingHashtags;