import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetConversationsMessegesQuery } from '../api';
import { MessageList, Input } from 'react-chat-elements';
import { useSelector } from 'react-redux';

import "react-chat-elements/dist/main.css";


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
            // Find the sender in the participants array
            const sender = data.participants.find(participant => participant._id === message.senderId);
    
            return {
                position: message.senderId === currentUser._id ? 'right' : 'left',
                type: 'text',
                text: message.text,
                dateString: new Date(message.date).toLocaleString(),
                title: sender ? sender.username : "Unknown", // Use the sender's username, or "Unknown" if not found
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
    <div>
        <MessageList className='message-list' dataSource={prepareMessages()} />
    </div>
  )
}

export default Conversation;