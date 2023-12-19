import { useContext, useEffect, useState } from 'react'
import Tweet from './Tweet';
import StandardTweet from './StandardTweet';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../services/userContext';
import Compose from './Compose';

import styled from 'styled-components';
import { Header } from '../styles/styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { fetchTweetAndReplies } from '../api/tweets';



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
  const { currentUser } = useContext(UserContext);
  const { threadId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [activeThread, setActiveThread] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchThread = async () => {
            try {
        setIsLoading(true);
        const tweet = await fetchTweetAndReplies(threadId);
        setActiveThread(tweet);
      } catch (error) {
        console.error("Error fetching thread:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchThread()
  }, [threadId]);
  
  

  const mapRepliesToTweetComponents = () => {
    if (!activeThread || !activeThread.replies) {
      return null;
    }

    return activeThread.replies.map((reply) => (
      // This will be the only place we bypass the tweet comp for a standard tweet for replies
      <StandardTweet 
        key={reply._id} 
        tweet={reply} />
    ));
  };

  const handleAddReply = (newReply) => {
    setActiveThread((prevActiveThread) => ({
      ...prevActiveThread,
      replies: [newReply, ...prevActiveThread.replies]
    }));
  };

  const handleBackClick = () => {
    navigate(-1);
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

export default Thread