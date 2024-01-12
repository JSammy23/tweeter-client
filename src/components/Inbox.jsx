import { useSelector } from 'react-redux';

import styled from "styled-components";
import Typography from '@mui/material/Typography';

const ConversationDiv = styled.div`
    display: flex;
    width: 100%;
`

const Inbox = ({ conversations }) => {
    const currentUser = useSelector(state => state.user.currentUser);

    const renderConversations = () => {
        if (conversations && conversations.length > 0) {
            return conversations.map((conversation) => {
                const participantNames = conversation.participantIds
                    .filter(participant => participant._id !== currentUser._id)
                    .map(participant => participant.username).join(', ');
                return (
                    <ConversationDiv key={conversation._id}>
                        <Typography variant="h5">
                            {participantNames}
                        </Typography>
                    </ConversationDiv>
                );
            });
        } else {
            return <div>No conversations available.</div>;
        }
    };

  return (
    <div>
        {renderConversations()}
    </div>
  )
}

export default Inbox;