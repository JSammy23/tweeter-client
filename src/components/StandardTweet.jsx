import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';
import Retweet from './Retweet';
import CommentsButton from './CommentsButton';
import TweetHeader from './TweetHeader';

import styled from 'styled-components';
import { TweetCard, UserImage, TweetBody, TweetReactions, LeftThreadLine } from '../styles/tweetStyles';

import MissingTweet from './MissingTweet';



const StandardTweet = ({ tweet, isMini }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  
  const handleUserProfileClick = () => {
    navigate(`/profile/${tweet.author._id}`);
  };
  
  // Format Tweet Mentions & Hashtags
  const formatTweetText = (tweet) => {
    let formattedText = tweet.text;
    const entities = [];

    tweet.entities.mentions.forEach(mention => {
        entities.push({
            type: 'mention',
            value: mention.username,
            start: mention.indices[0],
            end: mention.indices[1]
        });
    });
    tweet.entities.hashtags.forEach(hashtag => {
        entities.push({
            type: 'hashtag',
            value: hashtag.text,
            start: hashtag.indices[0],
            end: hashtag.indices[1]
        });
    });
    entities.sort((a, b) => a.start - b.start);

    const jsxParts = [];
    let lastIndex = 0;

    entities.forEach(entity => {
        // Add text before the entity
        jsxParts.push(formattedText.substring(lastIndex, entity.start));

        // Add the entity as a link
        if (entity.type === 'mention') {
          const mention = encodeURIComponent(entity.value);
          jsxParts.push(<span 
            className="mention" 
            onClick={() => navigate(`/search?q=${mention}`)} >
            {entity.value}
          </span>);
      } else if (entity.type === 'hashtag') {
          const hashtag = encodeURIComponent(entity.value);
          jsxParts.push(<span 
            className="hashtag" 
            onClick={() => navigate(`/search?q=${hashtag}`)} >
            {entity.value}
          </span>);
      }
      lastIndex = entity.end;
    });

    // Add remaining text after the last entity
    jsxParts.push(formattedText.substring(lastIndex));
    return jsxParts;
  };

  if (tweet.isDeleted) {
    return <MissingTweet />;
  }

  if (!tweet) {
    return <p>Error loading standard tweet.</p>
  }

  // Check if author data is available
  if (!tweet.author) {
    return <p>Author data not available.</p>;
  }
  return (
    <>
      {/* {tweet.retweets > 0 && activeFilter === 'home' && <RetweetList tweet={tweet} />} */}
      <TweetCard isMini={isMini} >
      {isMini && <LeftThreadLine />}
        <UserImage 
            src={tweet.author.profile.profile_picture}  
            onClick={handleUserProfileClick}
            isMini={isMini} />
        <div className="flex column">
            <TweetHeader 
              tweet={tweet}
              isMini={isMini}
              handleUserProfileClick={handleUserProfileClick}
              currentUser={currentUser}
            />
            <TweetBody isMini={isMini} >
              <p>{formatTweetText(tweet)}</p>
            </TweetBody>
            <TweetReactions>
              <CommentsButton tweet={tweet} />
              <Retweet tweet={tweet} />
              <LikeButton tweet={tweet} />
            </TweetReactions>
        </div>
      </TweetCard>
    </>
  )
}

export default StandardTweet;