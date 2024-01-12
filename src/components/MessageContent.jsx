import { useState } from 'react';
import { useGetConversationsQuery } from '../api/messages';
import Inbox from './Inbox';

import { Header, Title } from '../styles/styledComponents';

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
        <Header>
            <div className="flex spacer">
                <Title>Inbox</Title>
            </div>
        </Header>
        <Inbox conversations={conversations} />
    </>
  )
}

export default MessageContent;
