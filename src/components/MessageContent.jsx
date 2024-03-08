import { fetchConversations } from '../api/messages';
import { Routes, Route } from "react-router-dom";
import Inbox from './Inbox';
import Conversation from './Conversation';
import NewMessageController from './NewMessageController';
import { useInfiniteQuery } from '@tanstack/react-query';


const MessageContent = () => {
    const {
      status,
      error,
      data,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
    } = useInfiniteQuery({
      queryKey: ['conversations'], 
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
      queryFn: ({ pageParam = 0 }) => fetchConversations(pageParam)
    });

    const conversations = data?.pages.flatMap(page => page.conversations) ?? [];
    
    if (conversations) {
        console.log(conversations);
    }

    if (status === "loading") return <h1>Loading...</h1>
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
        <Routes>
            <Route path='/' element={<Inbox 
             conversations={conversations} 
             hasNext={hasNextPage} 
             loadMore={fetchNextPage}
             isLoading={isFetchingNextPage} />} />
            <Route path="/:conversationId" element={<Conversation />} />
            <Route path="/compose" element={<NewMessageController />} />
        </Routes>
    </>
  )
}

export default MessageContent;
