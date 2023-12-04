const BASE_URL = 'http://localhost:3000/tweets';

/****** Fetch Tweets ********/

// Fetch Tweets for Home content
export const fetchHomeTweets = async (limit = 100, skip = 0) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/home?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const tweets = await response.json();
    console.log(tweets); // Remove before production
    return tweets;
};

// Fetch Tweets for Explore content
export const fetchExploreTweets = async (limit = 100, skip = 0) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/explore?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const tweets = await response.json();
    console.log(tweets); // Remove before production
    return tweets;
};

// Fetch User profile Tweets and Likes
export const fetchUserTweetsAndLikes = async (userId, limit = 100, skip = 0) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/profile/${userId}?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const tweets = await response.json();
    console.log(tweets); // Remove before production
    return tweets;
};

// Fetch single Tweet with replies
export const fetchTweetAndReplies = async (tweetId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/thread/${tweetId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const tweet = await response.json();
    console.log('Fetched Thread:', tweet); // Remove before production
    return tweet;
};

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

/****** Interact with Tweet ******/
export const interactWithTweet = async (tweetId, action) => {
    const token = localStorage.getItem('token');
    const body = { action: action };
    const response = await fetch(`${BASE_URL}/${tweetId}/interact`, {
        method: "PUT",
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
}