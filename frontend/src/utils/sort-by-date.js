const sortTweetsByDate = (tweets) => {
  return tweets.slice().sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
};

export default sortTweetsByDate;