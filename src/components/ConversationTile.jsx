import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { TweetDate, StyledIcon } from '../styles/tweetStyles';
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { format, isToday } from 'date-fns';
import styled from 'styled-components';

const ConversationDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
    padding: .5em;
    color: #fff;

    &:hover {
        color: ${props => props.theme.colors.accent};
        cursor: pointer;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end; 
    justify-content: flex-end; 
    width: 100%; 
`;

const NewBadge = styled.div`
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.primary};
    margin-right: .3em;
    box-shadow: 0 0 6px ${props => props.theme.colors.primary};
`;

const ConversationTile = ({ conversation }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const isConversationMenuOpen = Boolean(anchorEl);

    const handleConversationClick = () => {
        navigate(`/messages/${conversation._id}`);
    };

    const toggleConversationMenu = (event) => {
        event.stopPropagation();
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    
    const handleClose = (event) => {
        if (event) event.stopPropagation();
        setAnchorEl(null);
    };

    const handleDeleteConversation = (event) => {
        event.stopPropagation();
        console.log('Deleted Convo');
        handleClose();
    };

    const formatMessageDate = (date) => {
        const lastMessageDate = typeof date === 'string' ? new Date(date) : date;
      
        if (isToday(lastMessageDate)) {
          return format(lastMessageDate, 'h:mm bbb');
        } else {
          return format(lastMessageDate, "h:mm bbb MM/dd/yyyy");
        }
    };

    const participantNames = conversation.participantIds
        .filter(participant => participant._id !== currentUser._id)
        .map(participant => participant.username).join(', ');


  return (
    <ConversationDiv onClick={handleConversationClick}>
        <div className='flex align' >
            {conversation.unseenMessages && (
                <NewBadge />
            )}
            <Typography variant="h5"  >
                {participantNames}
            </Typography>
        </div>
        <FlexContainer>
            <StyledIcon icon={faEllipsisH} onClick={toggleConversationMenu} />
            <Menu
                id='conversation-menu'
                anchorEl={anchorEl}
                open={isConversationMenuOpen}
                onClose={handleClose} >
                <MenuItem onClick={handleDeleteConversation} >Delete Conversation</MenuItem>
            </Menu>
            <TweetDate>
                {conversation.lastMessageDate ? formatMessageDate(conversation.lastMessageDate) : null}
            </TweetDate>
        </FlexContainer>
    </ConversationDiv>
  )
}

export default ConversationTile;