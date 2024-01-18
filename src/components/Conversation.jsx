import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetConversationsMessegesQuery, useCreateMessageMutation } from '../api';
import { useSelector } from 'react-redux';
import ChatList from './ChatList';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { Header } from '../styles/styledComponents';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

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
  margin-top: .3em;
`;

const InputContainer = styled.div`
  align-self: center;
  padding: 10px;
  width: 85%; 

  @media (max-width: 683px) {
    margin-bottom: 4em;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
 cursor: pointer;
 color: inherit;
 font-size: 1.4em;
 margin: .3em 0;

 &:hover {
  color: ${props => props.theme.colors.primary};
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
    const navigate = useNavigate();


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

    const handleBackClick = () => {
        navigate(-1);
    };

    // Log the messages for debugging purposes
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const prepareMessages = () => {
        if (!data || !data.messages || !data.participants || data.messages.length === 0) {
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

    const participantNames = data?.participants
        .filter(participant => participant._id !== currentUser._id)
    .map(participant => participant.username).join(', ');
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading messages.</div>;
    }
    

    return (
        <ChatContainer>
          <Header>
            <div>
              {data?.participants && (
                <Typography variant="h5">
                    {participantNames}
                </Typography>
              )}
              <StyledIcon icon={faArrowLeft} onClick={handleBackClick} />
            </div>
          </Header>  
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