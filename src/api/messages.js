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
            query: ({ limit = 25, skip = 0, conversationId }) => `${conversationId}?limit=${limit}&skip=${skip}`
        }),
        createMessage: builder.mutation({
            query: (messageData) => ({
                method: 'POST',
                body: messageData,
            }),
        }),
    })
});

export const {
    useGetConversationsQuery,
    useGetConversationsMessagesQuery,
    useCreateMessageMutation
} = messagesApi;