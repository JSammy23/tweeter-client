import { useContext, useState } from 'react';
import { UserContext } from '../services/userContext';
import { format } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import LikeButton from './LikeButton';
import Retweet from './Retweet';
import CommentsButton from './CommentsButton';
import DeleteTweetButton from './DeleteTweetButton';

import styled from 'styled-components';
import { TweetCard, TweetHeader, FlexDiv, UserImage, Name, Handle, TweetDate, TweetBody, TweetReactions, StyledIcon, MenuContainer, MenuOptions, LeftThreadLine } from '../styles/tweetStyles';
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';


const StandardTweet = ({ tweet, isMini }) => {
    
    const [isTweetMenuOpen, setIsTweetMenuOpen] = useState(false);
    const { currentUser } = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();
    const isProfileOrThreadPage = location.pathname.includes('/profile') || location.pathname.includes('/thread');

    const handleUserProfileClick = () => {
      navigate(`/profile/${tweet.author._id}`);
    };

    const toggleTweetMenu = () => {
      setIsTweetMenuOpen(!isTweetMenuOpen)
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

    // Format Date
    let formattedDate;
    let date;
    if (tweet.date) {
      if (typeof tweet.date === 'string') {
        date = new Date(tweet.date)
      } else {
        date = tweet.date.toDate(); // convert timestamp to Date object
      } 
        formattedDate = format(date, "h:mm bbb MM/dd/yyy");
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
                <TweetHeader>
                    <FlexDiv>
                        <div className="flex align">
                            <Name isMini={isMini} >{tweet.author.fullName}</Name>
                            <Handle isMini={isMini} onClick={handleUserProfileClick} >{tweet.author.username}</Handle>
                        </div>
                        <TweetDate isMini={isMini} >{formattedDate}</TweetDate>
                        {tweet.author._id === currentUser._id && isProfileOrThreadPage && (
                          <MenuContainer>
                            <StyledIcon icon={faEllipsisH} onClick={toggleTweetMenu} />
    
                            {isTweetMenuOpen && (
                              <MenuOptions>
                                <DeleteTweetButton tweet={tweet} />
                              </MenuOptions>
                            )}
                          </MenuContainer>
                        )}
                    </FlexDiv>
                </TweetHeader>
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

export default StandardTweet