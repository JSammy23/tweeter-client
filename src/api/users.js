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

// Update User
export const updateUser = async (userId, credentials) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
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
export const fetchUser = async (userId, fields = '', populate = '') => {
    const token = localStorage.getItem('token');
    let queryString = new URLSearchParams();
    
    if (fields) queryString.set('fields', fields);
    if (populate) queryString.set('populate', populate);

    const response = await fetch(`${BASE_URL}/${userId}?${queryString.toString()}`, {
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

// Fetch current user's community
export const fetchUsersCommunity = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/community`, {
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

    const data = response.json();
    return data;
};

// Follow/Unfollow User
export const followUser = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${userId}/follow`, {
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

    const data = response.json();
    return data;
};

// Check for username availability
export const checkUsernameAvailability = async (username) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/check-username/${username}`, {
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

    const data = await response.json();
    console.log('Check Username returned:', data);
    return data.available; 
};

// Upload profile picture
export const uploadProfilePicture = async (file, userId) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('profilePicture', file);
    // // Log formData contents
    // for (let [key, value] of formData.entries()) {
    //     console.log(key, value);
    // }
    const response = await fetch(`${BASE_URL}/${userId}/update-profile-picture`, {
        method: "POST",
        headers: {
            "Authorization": `${token}`
        },
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
};