import StandardTweet from "./StandardTweet";
import Tweet from "./Tweet";

const TweetList = ({ tweets, standardOnly }) => {

  if (standardOnly) {
    return (
      <div>
        {tweets.map(tweet => <StandardTweet key={tweet._id} tweet={tweet} />)}
      </div>
    )
  }
  
  return (
    <div>
      {tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)}
    </div>
  )
}

export default TweetList;