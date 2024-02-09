import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format, isToday } from 'date-fns';

import styled from "styled-components";
import Typography from '@mui/material/Typography';
import { TweetDate, MenuContainer, StyledIcon } from '../styles/tweetStyles';
import { Header, Title } from '../styles/styledComponents';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ConversationDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
    padding: .5em;

    &:hover {
        color: ${props => props.theme.colors.accent};
        cursor: pointer;
    }
`;

const StyledIconButton = styled(LaunchIcon)`
    color: ${(props) => props.theme.colors.accent};

`

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end; // Ensures vertical alignment is centered
    justify-content: flex-end; // Aligns items to the right
    width: 100%; // Ensures it takes the full width to push items to the end
`;


const Inbox = ({ conversations }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const [anchorEl, setAnchorEl] = useState(null);
    const isConversationMenuOpen = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleConversationClick = (conversationId) => {
        navigate(`/messages/${conversationId}`);
    };

    const handleNewMessageClick = () => {
        navigate('/messages/compose');
    };

    const toggleConversationMenu = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDeleteConversation = (event) => {
        event.stopPropagation();
        console.log('Deleted Convo');
    };

    const formatMessageDate = (date) => {
        const lastMessageDate = typeof date === 'string' ? new Date(date) : date;
      
        if (isToday(lastMessageDate)) {
          return format(lastMessageDate, 'h:mm bbb');
        } else {
          return format(lastMessageDate, "h:mm bbb MM/dd/yyyy");
        }
    };

    const renderConversations = () => {
        if (conversations && conversations.length > 0) {
            return conversations.map((conversation) => {
                const participantNames = conversation.participantIds
                    .filter(participant => participant._id !== currentUser._id)
                    .map(participant => participant.username).join(', ');
                return (
                    <ConversationDiv key={conversation._id} onClick={() => handleConversationClick(conversation._id)}  >
                        <div>
                            <Typography variant="h5">
                                {participantNames}
                            </Typography>
                        </div>
                        <FlexContainer>
                            <StyledIcon icon={faEllipsisH} onClick={(event) => {
                                event.stopPropagation();
                                toggleConversationMenu(event);
                            }} />
                                <Menu
                                 id='conversation-menu'
                                 anchorEl={anchorEl}
                                 open={isConversationMenuOpen}
                                 onClose={handleClose} >
                                    <MenuItem onClick={(event) => handleDeleteConversation(event)} >Delete Conversation</MenuItem>
                                </Menu>
                            <TweetDate>
                                {conversation.lastMessageDate ? formatMessageDate(conversation.lastMessageDate) : null}
                            </TweetDate>
                        </FlexContainer>
                    </ConversationDiv>
                );
            });
        } else {
            return <div>No conversations available.</div>;
        }
    };

  return (
    <div>
        <Header>
            <div className="flex spacer align">
                <Title>Inbox</Title>
                <div>
                    <IconButton onClick={handleNewMessageClick}>
                        <StyledIconButton />
                    </IconButton>
                </div>
            </div>
        </Header>
        <div>
            {renderConversations()}
        </div>
    </div>
  )
}

export default Inbox;