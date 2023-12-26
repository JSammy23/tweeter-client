import { useEffect, useState } from 'react'
import Tweet from './Tweet';
import StandardTweet from './StandardTweet';
import { useNavigate, useParams } from 'react-router-dom';
import Compose from './Compose';
import { useGetTweetThreadQuery } from '../api/tweets';

import styled from 'styled-components';
import { Header } from '../styles/styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';




const StyledIcon = styled(FontAwesomeIcon)`
 cursor: pointer;
 color: inherit;
 font-size: 1.4em;
 margin: .3em 0;

 &:hover {
  color: ${props => props.theme.colors.primary};
 }
`;

// TODO:

const Thread = () => {
  const { threadId } = useParams();
  const { data: activeThread, isLoading, isError, refetch } = useGetTweetThreadQuery(threadId);
  const [localReplies, setLocalReplies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeThread && activeThread.replies) {
      setLocalReplies(activeThread.replies);
    }
  }, [activeThread]);

  const handleAddReply = (newReply) => {
    setLocalReplies(prevReplies => [newReply, ...prevReplies]);
    // Optionally trigger a refetch or invalidate tags here if needed
    refetch();
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  
  const mapRepliesToTweetComponents = () => {
    if (!localReplies) {
      return null;
    }

    return localReplies.map((reply) => (
      // This will be the only place we bypass the tweet comp for a standard tweet for replies
      <StandardTweet 
        key={reply._id} 
        tweet={reply} />
    ));
  };

  return (
    <>
        <Header>
            <h2>Tweet</h2>
            <StyledIcon icon={faArrowLeft} onClick={handleBackClick} />
        </Header>    
        {/* Render Tweet only if activeThread is set */}
        {activeThread && (
          <Tweet 
          key={activeThread._id} 
          tweet={activeThread} />
        )}
        <Compose 
         action='reply'
         isReply
         activeThread={activeThread}
         addReply={handleAddReply} />
        {mapRepliesToTweetComponents()}
    </>
  )
}

export default Thread;