import { useState } from 'react';
import { useGetConversationsQuery } from '../api/messages';
import { Routes, Route, useParams } from "react-router-dom";
import Inbox from './Inbox';
import Conversation from './Conversation';


const MessageContent = () => {
    const [skip, setSkip] = useState(0);
    const { data: conversations, error, isLoading } = useGetConversationsQuery({ limit: 20, skip: skip });

    const handleLoadMore = () => {
        const newSkip = skip + 20;
        setSkip(newSkip);
    };

    if (isLoading) {
        return <div>Loading conversations...</div>;
    }

    if (error) {
        // Render error message or UI
        return <div>Error loading conversations: {error.message}</div>;
    }
    
    if (conversations) {
        console.log(conversations);
    }

  return (
    <>
        <Routes>
            <Route path='/' element={<Inbox conversations={conversations} />} />
            <Route path="/:conversationId" element={<Conversation />} />
        </Routes>
    </>
  )
}

export default MessageContent;
