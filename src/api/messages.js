import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

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

const BASE_URL = 'http://localhost:3000/messages/';

export const fetchConversations = async (page) => {
    const token = localStorage.getItem('token');
    const limit = 25;

    return axios.get(BASE_URL, {
        params: { limit },
        headers: { Authorization: token }
    }).then(res => {
        const totalConversationCount = parseInt(res.headers['x-total-count'], 10);
        const hasNextPage = (page + 1) * limit < totalConversationCount;
        const hasPreviousPage = page > 0;

        return {
            conversations: res.data,
            nextPage: hasNextPage ? page + 1 : undefined,
            previousPage: hasPreviousPage ? page - 1 : undefined
        };
    });
};

export const fetchConversationsMessages = async (conversationId, page) => {
    const token = localStorage.getItem('token');
    const limit = 25;
    
    return axios.get(`${BASE_URL}${conversationId}`, {
        params: { page, limit },
        headers: {  Authorization: token }
    })
    .then(res => {
        const totalMessagesHeader = res.headers['x-total-count']; 
        const totalMessages = parseInt(totalMessagesHeader, 10);
        const hasNextPage = (page + 1) * limit < totalMessages; 
        const hasPreviousPage = page > 0;

        return {
            messages: res.data.messages,
            participants: res.data.participants,
            nextPage: hasNextPage ? page + 1 : undefined,
            previousPage: hasPreviousPage ? page - 1 : undefined,
        };
    });
};

export const softDeleteConversation = async (conversationId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await axios.delete(BASE_URL + conversationId, {
            headers: {
                'Authorization': token
            }
        });

        // Check response status
        if (response.status === 200) {
            console.log('Conversation soft deleted successfully:', response.data);
        } else if (response.status === 204) {
            console.log('User has already deleted this conversation:', response.data);
        } else {
            console.error('Unexpected response status:', response.status);
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error', error.message);
        }
    }
};