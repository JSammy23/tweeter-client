const BASE_URL = 'http://localhost:3000/tweets';

/****** Fetch Tweets ********/

// Fetch Tweets for Home content
export const fetchHomeTweets = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/home`, {
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
    console.log(tweet); // Remove before production
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