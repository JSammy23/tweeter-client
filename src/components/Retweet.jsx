import { useState, useContext } from 'react';
import { UserContext } from '../services/userContext';
import { interactWithTweet } from '../api/tweets';

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
  const [retweets, setRetweets] = useState(tweet.retweetsCount || 0);
  const { currentUser, updateUser } = useContext(UserContext);
  const isRetweeted = currentUser.retweets.includes(tweet._id);

  const handleRetweet = async () => {
    try {
        if (isRetweeted) {
            await interactWithTweet(tweet._id, 'retweet');
            // If successful, update UI and state
            const updatedRetweets = currentUser.retweets.filter(id => id !== tweet._id);
            updateUser({ ...currentUser, retweets: updatedRetweets });
            setRetweets(retweets - 1);
        } else {
            await interactWithTweet(tweet._id, 'retweet');
            // If successful, update UI and state
            const updatedRetweets = [...currentUser.retweets, tweet._id];
            updateUser({ ...currentUser, retweets: updatedRetweets });
            setRetweets(retweets + 1);
        }
    } catch (error) {
        console.error("Error interacting with tweet:", error);
    }
};  

  return (
      <div>
          <StyledIcon icon={faRetweet} active={isRetweeted}  onClick={handleRetweet} />
          {retweets > 0 && <TweetReactionsCount>{retweets}</TweetReactionsCount>}
      </div>
  )
}

export default Retweet;