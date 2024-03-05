import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/messages/',
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: ({ limit = 20, skip = 0 }) => `?limit=${limit}&skip=${skip}`,
        }),
        getConversationsMessages: builder.query({
            query: ({ page, conversationId }) => `${conversationId}?page=${page}&limit=25`, 
            // Generate a unique cache key based on the conversationId and page
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.results.push(...newItems.results);
            },
            // Refetch when the page arg changes
            // forceRefetch({ currentArg, previousArg }) {
            //   return currentArg.page !== previousArg.page;
            // }
        }),
        createMessage: builder.mutation({
            query: (messageData) => ({
                method: 'POST',
                body: messageData,
            }),
        }),
        createConversation: builder.mutation({
            query: (participantIds) => ({
                url: 'conversation',
                method: 'POST',
                body: participantIds,
            }),
        }),
    })
});

export const {
    useGetConversationsQuery,
    useGetConversationsMessagesQuery,
    useCreateMessageMutation,
    useCreateConversationMutation,
} = messagesApi;