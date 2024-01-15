import ChatBubble from "./ChatBubble";

import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Default alignment
`;

const ChatList = ({ messages }) => {
  return (
    <ChatContainer>
        {messages.map((message, index) => (
            <ChatBubble key={index} message={message}  />
        ))}
    </ChatContainer>
  )
}

export default ChatList;
