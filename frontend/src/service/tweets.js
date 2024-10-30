// services/tweetService.js

const fetchTweets = async () => {
  try {
    const response = await fetch('http://localhost:5000/tweets');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the fetched tweets
  } catch (error) {
    throw new Error(`Failed to fetch tweets: ${error.message}`);
  }
};

export default fetchTweets;
