import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetConversationsMessegesQuery } from '../api';
import { ChatFeed, Message } from 'react-chat-ui';
import { useSelector } from 'react-redux';


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

        return data.messages.map(message => new Message({
            id: message.senderId === currentUser._id ? 0 : 1,
            message: message.text,
            senderName: data.participants.find(p => p._id === message.senderId)?.username || "Unknown",
        }));
    };
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading messages.</div>;
    }
    

  return (
    <div>
        <ChatFeed messages={prepareMessages()} showSenderName 
        bubbleStyles={{
            text: {
              fontSize: 16,
            },
            chatbubble: {
              borderRadius: 15,
              padding: 10,
              marginTop: 2,
              marginLeft: 5,
              marginRight: 5,
            },
        }} />
    </div>
  )
}

export default Conversation;