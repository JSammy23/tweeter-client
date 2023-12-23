import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInteractWithTweetMutation } from '../api';
import { updateUserRetweets } from '../features/user/userSlice';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/fontawesome-free-solid';
import { TweetReactionsCount } from '../styles/tweetStyles';


export const StyledIcon = styled(FontAwesomeIcon)`
 color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.secondary)};
 cursor: pointer;
 margin: 0 .5em;
`;

const Retweet = ({ tweet }) => {
  const dispatch = useDispatch();
  const [retweetsCount, setRetweetsCount] = useState(tweet.retweetsCount || 0);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isRetweeted = currentUser.retweets.includes(tweet._id);
  const [interactWithTweet] = useInteractWithTweetMutation();

  const handleRetweet = async () => {
    try {
        if (isRetweeted) {
            await interactWithTweet({ tweetId: tweet._id, action: 'retweet'});
            // If successful, update UI and state
            dispatch(updateUserRetweets({ tweetId: tweet._id, isRetweeted }));
            setRetweetsCount(retweetsCount - 1);
        } else {
            await interactWithTweet({ tweetId: tweet._id, action: 'retweet'});
            // If successful, update UI and state
            dispatch(updateUserRetweets({ tweetId: tweet._id, isRetweeted }));
            setRetweetsCount(retweetsCount + 1);
        }
    } catch (error) {
        console.error("Error interacting with tweet:", error);
    }
};  

  return (
      <div>
          <StyledIcon icon={faRetweet} active={isRetweeted}  onClick={handleRetweet} />
          {retweetsCount > 0 && <TweetReactionsCount>{retweetsCount}</TweetReactionsCount>}
      </div>
  )
}

export default Retweet;