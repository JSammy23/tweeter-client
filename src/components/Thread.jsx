import StandardTweet from './StandardTweet';
import { useNavigate, useParams } from 'react-router-dom';
import Compose from './Compose';
import { useGetTweetThreadQuery, useGetRepliesToTweetQuery } from '../api/tweets';
import TweetList from './TweetList';
import { useEffect, useState } from 'react';

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
  const { data: paginatedReplies } = useGetRepliesToTweetQuery({ 
    tweetId: threadId, 
    limit: 75, 
    skip: 0 
  }, { skip: !threadData?.paginationRequired }); // Skip this query initially if pagination is not required
  const [localReplies, setLocalReplies] = useState([]);
  const [skip, setSkip] = useState(0); // for pagination control
  const navigate = useNavigate();

  useEffect(() => {
    if (threadData && !threadData.paginationRequired && threadData.replies) {
      setLocalReplies(threadData.replies);
    }
  }, [threadData]);

  useEffect(() => {
    if (paginatedReplies) {
      setLocalReplies(prevReplies => [...prevReplies, ...paginatedReplies]);
    }
  }, [paginatedReplies]);

  const handleLoadMoreReplies = () => {
    const newSkip = skip + 50;
    setSkip(newSkip);
  };

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

  const { baseTweet } = threadData;
  
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

        {localReplies && localReplies.length > 0 && (
            <TweetList tweets={localReplies} standardOnly />
        )}
    </>
  );
};

export default Thread;