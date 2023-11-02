const BASE_URL = 'http://localhost:3000/users';

// Create new user
export const createUser = async (credentials) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
};

// Login
export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
};

// Fetch User
export const fetchUser = async (userId, fields = '') => {
    const token = localStorage.getItem('token');
    const query = fields ? `?fields=${fields}` : '';
    const response = await fetch(`${BASE_URL}/${userId}${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const user = await response.json();
    return user;
};

// Fetch current user
export const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(BASE_URL, {
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

    const currentUser = await response.json();
    return currentUser;
};