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
        getConversationsMesseges: builder.query({
            query: ({ limit = 25, skip = 0, conversationId }) => `${conversationId}?limit=${limit}&skip=${skip}`
        })
    })
});

export const {
    useGetConversationsQuery,
    useGetConversationsMessegesQuery
} = messagesApi;