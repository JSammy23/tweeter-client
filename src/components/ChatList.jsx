import { useRef, useEffect } from 'react';
import ChatBubble from "./ChatBubble";
import Button from '@mui/material/Button';

import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Default alignment
  overflow-y: auto;
`;

const ChatList = ({ messages, loadMore }) => {
    const bottomRef = useRef(null);
    
    useEffect(() => {
        console.log('Scrolling to bottom');
        const timer = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

  return (
    <ChatContainer>
      <Button variant="contained" onClick={loadMore} >Load More</Button>
        {messages.map((message, index) => (
            <ChatBubble key={index} message={message}  />
        ))}
        <div ref={bottomRef} />
    </ChatContainer>
  )
}

export default ChatList;
