import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetConversationsMessegesQuery, useCreateMessageMutation } from '../api';
import { useSelector } from 'react-redux';
import ChatList from './ChatList';
import TextField from '@mui/material/TextField';

import styled from 'styled-components';

/************ Styling ****************/

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
  width: 85%; 

  @media (max-width: 683px) {
    margin-bottom: 4em;
  }
`;

/************ Component ****************/

const Conversation = () => {
    const [skip, setSkip] = useState(0);
    const { conversationId } = useParams();
    const [messageText, setMessageText] = useState('');
    const [createMessage, { isLoading: isCreatingMessage }] = useCreateMessageMutation();
    const { data, isLoading, isError, refetch } = useGetConversationsMessegesQuery({ limit: 25, skip: skip, conversationId });
    const currentUser = useSelector(state => state.user.currentUser);


    const handleLoadMore = () => {
        const newSkip = skip + 25;
        setSkip(newSkip);
    };

    const handleSendMessage = async () => {
        if (messageText.trim() === '') return;

        try {
            await createMessage({
                conversationId,
                senderId: currentUser._id,
                text: messageText
            }).unwrap();
    
            setMessageText('');
            refetch();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent default to avoid newline in case of multiline TextField
            handleSendMessage();
        }
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

        return data.messages.map((message, index) => {
            const sender = data.participants.find(p => p._id === message.senderId);
            const showUsername = (index === 0 || data.messages[index - 1].senderId !== message.senderId) && message.senderId !== currentUser._id;
        
            return {
                ...message,
                sender: sender,
                position: message.senderId === currentUser._id ? 'right' : 'left',
                showUsername: showUsername
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
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputContainer>
        </ChatContainer>
      );
}

export default Conversation;