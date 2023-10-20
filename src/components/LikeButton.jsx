import { useState, useContext } from 'react';
import { UserContext } from '../services/userContext';
import { interactWithTweet } from '../api/tweets';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/fontawesome-free-regular';
import { StyledIcon } from './Retweet';
import { TweetReactionsCount } from '../styles/tweetStyles';


const LikeButton = ({ tweet }) => {
    const [likes, setLikes] = useState(tweet.likesCount || 0);
    const { currentUser, updateUser } = useContext(UserContext);
    const isLiked = currentUser.likes.includes(tweet._id);

    const handleLike = async () => {
      try {
          if (isLiked) {
              await interactWithTweet(tweet._id, 'like');
              // If successful, update UI and state
              const updatedLikes = currentUser.likes.filter(id => id !== tweet._id);
              updateUser({ ...currentUser, likes: updatedLikes });
              setLikes(likes - 1);
          } else {
              await interactWithTweet(tweet._id, 'like');
              // If successful, update UI and state
              const updatedLikes = [...currentUser.likes, tweet._id];
              updateUser({ ...currentUser, likes: updatedLikes });
              setLikes(likes + 1);
          }
      } catch (error) {
          console.error("Error interacting with tweet:", error);
      }
  };

  return (
    <div>
        <StyledIcon icon={faHeart} active={isLiked} onClick={handleLike} />
        {likes > 0 && <TweetReactionsCount>{likes}</TweetReactionsCount>}
    </div>
  )
}

export default LikeButton