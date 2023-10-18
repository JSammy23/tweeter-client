const BASE_URL = 'http://localhost:3000/tweets';

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