const sortTweetsByLikes = (tweets) => {
  return tweets.slice().sort((a, b) => b.likes - a.likes);
};

export default sortTweetsByLikes;