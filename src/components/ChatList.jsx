import { useRef, useEffect } from 'react';
import ChatBubble from "./ChatBubble";
import Button from '@mui/material/Button';

import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  overflow-y: auto;
`;

const ChatList = ({ messages, loadMore, localMessages, isFetching, hasNextPage }) => {
    const bottomRef = useRef(null);
    
    useEffect(() => {
        console.log('Scrolling to bottom');
        const timer = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (localMessages.length > 0) {
          console.log('Scrolling to bottom for new message');
          const timer = setTimeout(() => {
              bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
  
          return () => clearTimeout(timer);
      }
    }, [localMessages]);

  return (
    <ChatContainer>
      {hasNextPage && (
        <Button 
        variant="contained" 
        onClick={loadMore}
        style={{ margin: '.7em auto', display: 'block' }}
        disabled={isFetching} >
         Load More
        </Button>
      )}
        {messages.map((message, index) => (
            <ChatBubble key={index} message={message}  />
        ))}
        <div ref={bottomRef} />
    </ChatContainer>
  )
}

export default ChatList;
