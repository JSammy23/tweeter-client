import Tooltip from '@mui/material/Tooltip';

import styled from "styled-components"

const TextBubble = styled.div`
    background-color: ${props => props.position === 'right' ? props.theme.colors.primary : props.theme.colors.secondary};
    color: ${props => props.position === 'right' ? '#fff' : props.theme.colors.bgLight};
    margin: .3em .5em;
    padding: .4em;
    border-radius: 10em;
`

const ChatBubble = ({ message }) => {
  return (
    <div style={{ alignSelf: message.position === 'right' ? 'flex-end' : 'flex-start' }} >
        {message.showUsername && <div>{message.sender.username}</div>}
        <Tooltip title={message.date} >
            <TextBubble position={message.position} >{message.text}</TextBubble>
        </Tooltip>
    </div>
  )
};

export default ChatBubble;