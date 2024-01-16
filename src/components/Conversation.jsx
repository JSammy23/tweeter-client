import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetConversationsMessegesQuery } from '../api';
import { useSelector } from 'react-redux';
import ChatList from './ChatList';
import TextField from '@mui/material/TextField';

import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatListStyle = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  align-self: center;
  padding: 10px;
  width: 85%; // Or any other width you prefer
`;



const Conversation = () => {
    const [skip, setSkip] = useState(0);
    const { conversationId } = useParams();
    const { data, isLoading, isError } = useGetConversationsMessegesQuery({ limit: 25, skip: skip, conversationId });
    const currentUser = useSelector(state => state.user.currentUser);


    const handleLoadMore = () => {
        const newSkip = skip + 25;
        setSkip(newSkip);
    };

    // Log the messages for debugging purposes
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const prepareMessages = () => {
        if (!data || !data.messages || data.messages.length === 0) {
            return [];
        }

        return data.messages.map(message => {
            const sender = data.participants.find(p => p._id === message.senderId);
            return {
                ...message,
                sender: sender,
                position: message.senderId === currentUser._id ? 'right' : 'left'
            };
        });
    };
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading messages.</div>;
    }
    

    return (
        <ChatContainer>
          <ChatListStyle>
            <ChatList messages={prepareMessages()} />
          </ChatListStyle>
          <InputContainer>
            <StyledTextField
              multiline
              maxRows={5}
              variant='outlined'
              placeholder='Type a message...'
            />
          </InputContainer>
        </ChatContainer>
      );
}

export default Conversation;