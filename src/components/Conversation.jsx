import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetConversationsMessagesQuery, useCreateMessageMutation } from '../api';
import { useSelector } from 'react-redux';
import ChatList from './ChatList';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import styled from 'styled-components';
import { Header } from '../styles/styledComponents';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

/************ Styling ****************/

const StyledTextField = styled(TextField)`
  width: 100%;
  
  & .MuiInputBase-input { 
    color: #fff; 
  }

  & .MuiInputBase-input::placeholder { 
    color: rgba(255, 255, 255, 0.7); 
  }
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

  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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
    const [page, setPage] = useState(0);
    const { conversationId } = useParams();
    const [messageText, setMessageText] = useState('');
    const [createMessage, { isLoading: isCreatingMessage }] = useCreateMessageMutation();
    const { data, isFetching, isLoading, isError } = useGetConversationsMessagesQuery({ page, conversationId });
    const [localMessages, setLocalMessages] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const messages = data?.messages;

    // useEffect(() => {
    //     const socket = io('http://localhost:3000');
    
    //     // Join the room for the current conversation
    //     socket.emit('joinConversation', conversationId);
    
    //     // Listen for new messages in this conversation
    //     socket.on('newMessage', (newMessage) => {
    //         setLocalMessages(prevMessages => [...prevMessages, newMessage]);
    //     });
    
    //     // Cleanup
    //     return () => {
    //         socket.emit('leaveConversation', conversationId);
    //         socket.off('newMessage');
    //         socket.close();
    //     };
    // }, [conversationId, page]);

    useEffect(() => {
      console.log('Page:', page);
    }, [page]);

    const handleLoadMore = () => {
      console.log('handleLoadMore triggered!');
      setPage(prevPage => prevPage + 1);
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
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent default to avoid newline
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
        // Combine RTK Query data with local messages
        const combinedMessages = data ? [...data.messages, ...localMessages] : localMessages;
    
        // Check if there are no messages
        if (combinedMessages.length === 0) {
            return [];
        }

        // Sort messages by date in ascending order (oldest to newest)
        combinedMessages.sort((a, b) => new Date(a.date) - new Date(b.date));
    
        return combinedMessages.map((message, index, allMessages) => {
            const sender = data.participants.find(p => p._id === message.senderId);
            const showUsername = (index === 0 || allMessages[index - 1].senderId !== message.senderId) && message.senderId !== currentUser._id;
        
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
    
    // if (isFetching) {
    //     return <div>Loading...</div>;
    // }

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
            <ChatList messages={prepareMessages()} loadMore={handleLoadMore} />
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