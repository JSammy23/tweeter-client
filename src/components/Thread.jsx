import StandardTweet from './StandardTweet';
import { useNavigate, useParams } from 'react-router-dom';
import Compose from './Compose';
import { useGetTweetThreadQuery } from '../api/tweets';
import TweetList from './TweetList';

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


const Thread = () => {
  const { threadId } = useParams();
  const { data: threadData, isLoading, isError, refetch } = useGetTweetThreadQuery(threadId);
  const navigate = useNavigate();

  const handleAddReply = () => {
    refetch();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !threadData) {
    return <p>Error loading thread.</p>;
  }

  const { baseTweet, replies } = threadData;
  

  return (
    <>
        <Header>
            <h2>Tweet</h2>
            <StyledIcon icon={faArrowLeft} onClick={handleBackClick} />
        </Header>

        {/* Render thread tweet if it exists and is different from replyTo */}
        {baseTweet.thread && baseTweet.thread._id !== baseTweet.replyTo?._id && (
            <StandardTweet key={baseTweet.thread._id} tweet={baseTweet.thread} isMini />
        )}

        {/* Render replyTo tweet if it exists */}
        {baseTweet.replyTo && (
            <StandardTweet key={baseTweet.replyTo._id} tweet={baseTweet.replyTo} isMini />
        )}

        {/* Render baseTweet */}
        {baseTweet && (
            <StandardTweet 
                key={baseTweet._id} 
                tweet={baseTweet} 
            />
        )}

        <Compose 
            action='reply'
            isReply
            activeThread={baseTweet}
            addReply={handleAddReply} 
        />

        {replies && replies.length > 0 && (
            <TweetList tweets={replies} standardOnly />
        )}
    </>
  );
};

export default Thread;