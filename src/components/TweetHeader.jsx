import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { softDeleteTweet } from '../api/tweets';
import { format } from 'date-fns';

import { TweetHeaderContainer, FlexDiv, Name, Handle, TweetDate, StyledIcon, MenuContainer } from "../styles/tweetStyles";
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const TweetHeader = ({ tweet, isMini, currentUser, handleUserProfileClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isTweetMenuOpen = Boolean(anchorEl);
  const location = useLocation();
  const isProfileOrThreadPage = location.pathname.includes('/profile') || location.pathname.includes('/thread');

  const toggleTweetMenu = (event) => {
    // Ensure that event.currentTarget is a valid DOM element
    if (event && event.currentTarget) {
      setAnchorEl(event.currentTarget); // Open menu with current target
    } else {
      setAnchorEl(null); // Close menu
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTweet = async () => {
    try {
      await softDeleteTweet(tweet._id);
      handleClose();
    } catch (error) {
      console.error("Error deleting tweet:", error)
    }
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
    <TweetHeaderContainer>
        <FlexDiv>
            <div className="flex align">
                <Name isMini={isMini} >{tweet.author.fullName}</Name>
                <Handle isMini={isMini} onClick={handleUserProfileClick} >{tweet.author.username}</Handle>
            </div>
            <TweetDate isMini={isMini} >{formattedDate}</TweetDate>
            {tweet.author._id === currentUser._id && isProfileOrThreadPage && (
              <MenuContainer>
                <StyledIcon icon={faEllipsisH} onClick={toggleTweetMenu} />
                <Menu
                  id="tweet-menu"
                  anchorEl={anchorEl}
                  open={isTweetMenuOpen}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleDeleteTweet}>Delete Tweet </MenuItem>
                  {/* Add other menu items here */}
                </Menu>
              </MenuContainer>
            )}
        </FlexDiv>
    </TweetHeaderContainer>
  )
}

export default TweetHeader;