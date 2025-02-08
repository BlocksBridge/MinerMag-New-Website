import {TwitterApi} from "twitter-api-v2"

// const twitterClient = new TwitterApi({accessToken: '1377148267746578435-k4l6EinCZBAMbwgYSAC103jutmXM83', accessSecret:  'ixuzdKOXIH5HUjwmoQwOoNLZib65upcNxsycKnwGTYAO9'})
const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAFNJywEAAAAAY8itGeOEmvYG%2FZ93HOfMPG6vDYk%3DrhdVXO0iKa6zfSkZQ9kBlFbNqZcdCEIhYayfvQOWewD8FDeraj')





async function getLatestTweets(username, count = 10) {  // count: Number of tweets to retrieve (max 100)
    try {
      // 1. Get the user ID from the username
      const user = await client.v2.userByUsername(username);
      const userId = user.data.id;
  
      // 2. Get the user's tweets
      const tweets = await client.v2.userTimeline(userId, {
        max_results: count, // Specify the number of tweets to retrieve
        // Add other optional parameters as needed (see below)
      });
  
      // 3. Process the tweets
      if (tweets.data && tweets.data.length > 0) {
        console.log(`Latest ${tweets.data.length} tweets from @${username}:`);
        tweets.data.forEach(tweet => {
          console.log(`- ${tweet.text}`);
          if (tweet.entities?.urls) { // Check if URLs exist
            console.log("  URLs:", tweet.entities.urls.map(url => url.expanded_url));
          }
          if (tweet.entities?.media) { // Check if media exists
            console.log("  Media:", tweet.entities.media.map(media => media.url));
          }
          console.log("---");
        });
  
      } else {
        console.log(`No tweets found for @${username}.`);
      }
  
      // Important: Handle pagination if needed
      // The `tweets` object also contains a `meta` property.  If there are more tweets
      // available, it will contain a `next_token` you can use for pagination:
      // if (tweets.meta.next_token) {
      //   console.log("Next token for pagination:", tweets.meta.next_token);
      //   // Make another request using the next_token
      // }
  
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  }
  
  
  // Example usage:
  // Get 20 tweets from Elon Musk
  //getLatestTweets('twitter'); // Get default 10 tweets from Twitter
  //getLatestTweets('nonexistentuser'); // Example error handling
  
getLatestTweets('theminermag_', 1)