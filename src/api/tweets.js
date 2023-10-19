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
    console.log(tweets);
    return tweets;
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