import { useState } from 'react';
import { useInteractWithTweetMutation } from '../api';
import { updateUserLikes } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/fontawesome-free-regular';
import { StyledIcon } from './Retweet';
import { TweetReactionsCount } from '../styles/tweetStyles';


const LikeButton = ({ tweet }) => {
    const dispatch = useDispatch();
    const [likes, setLikes] = useState(tweet.likesCount || 0);
    const currentUser = useSelector((state) => state.user.currentUser);
    const isLiked = currentUser.likes.includes(tweet._id);
    const [interactWithTweet] = useInteractWithTweetMutation()

    const handleLike = async () => {
      try {
          if (isLiked) {
              await interactWithTweet({ tweetId: tweet._id, action: 'like' });
              dispatch(updateUserLikes({ tweetId: tweet._id, isLiked }));
              setLikes(likes - 1);
          } else {
              await interactWithTweet({ tweetId: tweet._id, action: 'like' });
              dispatch(updateUserLikes({ tweetId: tweet._id, isLiked }));
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