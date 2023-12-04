import { useEffect, useState } from 'react';
import Tweet from './Tweet';
import EmptyFeed from './EmptyFeed';

const TweetFetcher = ({ userUid, showLikes, fetchDataFunction, showType }) => {

    const [tweetData, setTweetData] = useState({
        userTweets: [],
        userLikes: [],
        subscribedTweets: [],
        exploreTweets: []
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                setIsLoading(true);
                const data = await fetchDataFunction();
                setTweetData(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching tweets:", error);
            }
        }
        fetchTweets();  // Invoke the fetchTweets function
    }, [fetchDataFunction]); 

    const mapTweetsToComponents = (tweets) => {
        if (!tweets.length) {
            return <EmptyFeed />;
        } else {
            return tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />);
        }
    };

    const tweetTypes = {
        userTweets: tweetData.userTweets,
        userLikes: tweetData.userLikes,
        subscribedTweets: tweetData.subscribedTweets,
        exploreTweets: tweetData.exploreTweets,
    };

    const renderTweets = () => {
        let tweets;
    
        if (showLikes) {
            tweets = tweetData.userLikes;
        } else if (showType && tweetTypes[showType]) {
            tweets = tweetTypes[showType];
        } else {
            // Default scenario or you can throw an error, depending on your use case.
            tweets = [];
        }
    
        return mapTweetsToComponents(tweets);
    };

    if (isLoading) {
        return <div style={{color: 'lime'}} >Loading...</div>
    }

  return (
    <div>{renderTweets()}</div>
  )
}

export default TweetFetcher