import StandardTweet from './StandardTweet';
import { useGetTweetThreadQuery } from '../api/tweets';

const ReplyTweet = ({ initialTweet }) => {
    const { data: tweetData, isLoading, isError } = useGetTweetThreadQuery(initialTweet._id);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !tweetData) {
        return <p>Error loading tweet thread.</p>;
    }

    const renderTweetAndReplies = (tweet, isInitialTweet = false) => {
        return (
            <div key={tweet._id}>
                {tweet.replyTo && (
                    <StandardTweet tweet={tweet.replyTo} isMini />
                )}
                <StandardTweet tweet={tweet} isMini={!isInitialTweet} />
                {tweet.replies && tweet.replies.map(reply => renderTweetAndReplies(reply))}
            </div>
        );
    };

    return (
        <div>
            {renderTweetAndReplies(tweetData, true)}
        </div>
    );
};

export default ReplyTweet;
