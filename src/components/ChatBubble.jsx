import Tooltip from '@mui/material/Tooltip';
import { format, isToday } from 'date-fns';

import styled from "styled-components"


const ChatBubbleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: ${props => props.position === 'right' ? 'flex-end' : 'flex-start'};
    max-width: 85%;
    color: ${props => props.theme.colors.accent};
`;

const TextBubble = styled.div`
    background-color: ${props => props.position === 'right' ? '#34a373' : props.theme.colors.secondary};
    color: ${props => props.position === 'right' ? '#fff' : props.theme.colors.bgLight};
    margin: .3em .5em;
    padding: .4em .7em;
    border-radius: 10em;
    font-size: 1.1em;
    word-wrap: break-word; /* Ensure text breaks to prevent overflow */
`;

const ChatBubble = ({ message }) => {

  const formatMessageDate = (date) => {
    const messageDate = typeof date === 'string' ? new Date(date) : date;
  
    if (isToday(messageDate)) {
      return format(messageDate, 'h:mm bbb');
    } else {
      // If the message was sent on a different day, return the full date and time
      return format(messageDate, "h:mm bbb MM/dd/yyyy");
    }
  };

  const formattedDate = formatMessageDate(message.date);

  return (
    <ChatBubbleWrapper position={message.position}>
        {message.showUsername && <div>{message.sender?.username}</div>}
        <Tooltip title={formattedDate} >
            <TextBubble position={message.position} >{message.text}</TextBubble>
        </Tooltip>
    </ChatBubbleWrapper>
  )
};

export default ChatBubble;