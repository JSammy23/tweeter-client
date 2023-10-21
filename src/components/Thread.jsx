import { useContext, useEffect, useState } from 'react'
import Tweet from './Tweet';
import StandardTweet from './StandardTweet';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../services/userContext';

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
  const [isLoading, setIsLoadibng] = useState(false);
  const [activeThread, setActiveThread] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        setIsLoadibng(true);
        const tweet = await fetchTweetAndReplies(threadId);
        setActiveThread(tweet);
      } catch (error) {
        console.error("Error fetching thread:", error);
      } finally {
        setIsLoadibng(false);
      }
    }
    fetchThread()
  }, [threadId]);
  
  

  const mapRepliesToTweetComponents = () => {
    return activeThread.replies.map((reply) => (
      // This will be the only place we bypass the tweet comp for a standard tweet for replies
      <StandardTweet 
        key={reply._id} 
        tweet={reply} />
    ));
  };

  // const handleAddReply = (newReply) => {
  //   setReplies((prevReplies) => [newReply, ...prevReplies]);
  //   setLocalReplyCount((prevLocalReplyCount) => prevLocalReplyCount + 1);
  // };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
        <Header>
            <h2>Tweet</h2>
            <StyledIcon icon={faArrowLeft} onClick={handleBackClick} />
        </Header>    
        <Tweet 
         key={activeThread._id} 
         tweet={activeThread} />
        {/* <Compose 
         user={currentUser}
         action='reply'
         isReply
         activeThread={activeThread}
         addReply={handleAddReply} /> */}
        {/* {mapRepliesToTweetComponents()} */}
    </>
  )
}

export default Thread