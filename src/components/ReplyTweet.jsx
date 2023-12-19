import { useState, useEffect } from 'react';
import StandardTweet from './StandardTweet';
import MissingTweet from './MissingTweet';
import { fetchTweetAndReplies } from '../api/tweets';

const ReplyTweet = ({ initialTweet }) => {
    const [thread, setThread] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchThread = async () => {
            setIsLoading(true);
            let currentTweet = initialTweet;
            let tweets = [currentTweet];

            while (currentTweet.replyTo) {
                try {
                    const parentTweet = await fetchTweetAndReplies(currentTweet.replyTo);
                    tweets.push(parentTweet);
                    currentTweet = parentTweet;
                } catch (error) {
                    console.error("Error fetching tweet:", error);
                    tweets.push({ missing: true });
                    break;
                }
            }

            // Add initialTweet only if it's not already in the thread
            if (!tweets.find(t => t._id === initialTweet._id)) {
                tweets.push(initialTweet);
            }

            setThread(tweets.reverse());
            setIsLoading(false);
        };

        if (initialTweet) {
            fetchThread();
        }
    }, [initialTweet]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {thread.map((tweet, index) => tweet.missing ? 
                <MissingTweet key={index} isMini /> :
                <StandardTweet key={tweet._id || index} tweet={tweet} isMini={index !== thread.length - 1} />
            )}
        </div>
    );
};

export default ReplyTweet;
