import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/fontawesome-free-regular';
import { TweetReactionsCount } from '../styles/tweetStyles';

const StyledIcon = styled(FontAwesomeIcon)`
 color: ${props => props.theme.colors.secondary};
 cursor: pointer;
 margin: 0 .5em;

 &:hover {
    color:  ${props => props.theme.colors.primary};
 }
`;

const CommentsButton = ({ tweet }) => {
  const [repliesCount, setRepliesCount] = useState(tweet.repliesCount || 0);

  const navigate = useNavigate();

  const handleTweetThreadClick = () => {
    navigate(`/thread/${tweet._id}`);
  };

  return (
    <div>
        <StyledIcon icon={faComment} onClick={handleTweetThreadClick} />
        {repliesCount > 0 && <TweetReactionsCount>{repliesCount}</TweetReactionsCount>}
    </div>
  )
};

export default CommentsButton