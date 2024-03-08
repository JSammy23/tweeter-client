import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationTile from './ConversationTile';

import styled from "styled-components";
import { Header, Title } from '../styles/styledComponents';
import LaunchIcon from '@mui/icons-material/Launch';
import IconButton from '@mui/material/IconButton';

const StyledIconButton = styled(LaunchIcon)`
    color: ${(props) => props.theme.colors.accent};
`;

const Inbox = ({ conversations, hasNext, loadMore, isLoading }) => {
    const bottomRef = useRef(null);
    const navigate = useNavigate();

    const handleNewMessageClick = () => {
        navigate('/messages/compose');
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
            {conversations && conversations.length > 0 ? (
                conversations.map(conversation => (
                    <ConversationTile key={conversation._id} conversation={conversation} />
                ))
            ) : (
                <div>No conversations available.</div>
            )}
        </div>
        <div ref={bottomRef} />
    </div>
  )
}

export default Inbox;