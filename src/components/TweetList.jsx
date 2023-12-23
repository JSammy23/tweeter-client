import Tweet from "./Tweet";

const TweetList = ({ tweets }) => {
  return (
    <div>
      {tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)}
    </div>
  )
}

export default TweetList;