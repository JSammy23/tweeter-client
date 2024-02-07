import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format, isToday } from 'date-fns';

import styled from "styled-components";
import Typography from '@mui/material/Typography';
import { TweetDate } from '../styles/tweetStyles';
import { Header, Title } from '../styles/styledComponents';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';

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

const Inbox = ({ conversations }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const handleConversationClick = (conversationId) => {
        navigate(`/messages/${conversationId}`);
    };

    const handleNewMessageClick = () => {
        navigate('/messages/compose');
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
                        <Typography variant="h5">
                            {participantNames}
                        </Typography>
                        <TweetDate>
                            {conversation.lastMessageDate ? formatMessageDate(conversation.lastMessageDate) : null}
                        </TweetDate>
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