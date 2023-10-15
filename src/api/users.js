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