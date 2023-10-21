import { useContext, useState } from 'react';
import { UserContext } from '../services/userContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
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
    const activeFilter = 'home';

    const navigate = useNavigate();

    const handleUserProfileClick = () => {
      navigate(`/user/${tweet.author._id}`);
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
            jsxParts.push(<span 
              className="mention" 
              onClick={() => navigate(`/users/${entity.value.substring(1)}`)} >
              {entity.value}
            </span>);
        } else if (entity.type === 'hashtag') {
            jsxParts.push(<span 
              className="hashtag" 
              onClick={() => navigate(`/hashtags/${entity.value.substring(1)}`)} >
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
        date = tweet.date.toDate(); // convert Firestore Timestamp to Date object
      } 
        formattedDate = format(date, "h:mm bbb MM/dd/yyy");
    }

    return (
        <>
          {/* {tweet.retweets > 0 && activeFilter === 'home' && <RetweetList tweet={tweet} />} */}
          <TweetCard isMini={isMini} >
          {isMini && <LeftThreadLine />}
            {/* <UserImage 
                src={author?.profileImg}  
                onClick={() => handleUserProfileClick(tweet.author)}
                isMini={isMini} /> */}
            <div className="flex column">
                <TweetHeader>
                    <FlexDiv>
                        <div className="flex align">
                            <Name isMini={isMini} >{tweet.author.firstName}</Name>
                            <Handle isMini={isMini} onClick={handleUserProfileClick} >{tweet.author.username}</Handle>
                        </div>
                        <TweetDate isMini={isMini} >{formattedDate}</TweetDate>
                        {tweet.author._id === currentUser._id && (activeFilter === 'profile' || activeFilter === 'thread') && (
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