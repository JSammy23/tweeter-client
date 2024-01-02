import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3000/tweets';

export const tweetsApi = createApi({
    reducerPath: 'tweetsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/tweets/',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        /****** Fetch Tweets ********/
        getHomeTweets: builder.query({
            query: ({ limit = 50, skip = 0 }) => `home?limit=${limit}&skip=${skip}`,
        }),
        getExploreTweets: builder.query({
            query: ({ limit = 50, skip = 0 }) => `explore?limit=${limit}&skip=${skip}`,
        }),
        getTweetThread: builder.query({
            query: (tweetId) => `thread/${tweetId}`,
        }),
        getUserTweetsAndLikes: builder.query({
            query: ({ userId, limit = 100, skip = 0 }) => `profile/${userId}?limit=${limit}&skip=${skip}`,
        }),
        getRepliesToTweet: builder.query({
            query: ({tweetId, limit = 75, skip = 0, sort = 'date' }) => `replies/${tweetId}?limit=${limit}&skip=${skip}&sort=${sort}`,
        }),
        /****** Interact with Tweet ******/
        interactWithTweet: builder.mutation({
            query: ({ tweetId, action }) => ({
                url: `${tweetId}/interact`,
                method: 'PUT',
                body: {action},
            }),
        }),
        /****** Upload Tweet Image Attachments *****/
        uploadTweetImages: builder.mutation({
            query: (FormData) => ({
                url: 'upload-image',
                method: 'POST',
                body: FormData,
            })
        })
    }),
});

export const {
    useGetHomeTweetsQuery,
    useInteractWithTweetMutation,
    useGetExploreTweetsQuery,
    useGetTweetThreadQuery,
    useGetUserTweetsAndLikesQuery,
    useGetRepliesToTweetQuery,
    useUploadTweetImagesMutation,
} = tweetsApi;


/******** Create Tweets ********/

// Compose Tweet
export const composeTweet = async (body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log(data);
    return data;
};

// Soft delete tweet
export const softDeleteTweet = async (tweetId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${tweetId}/delete`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
};