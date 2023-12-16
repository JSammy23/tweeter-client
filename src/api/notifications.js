const BASE_URL = 'http://localhost:3000/notifications';

// Fectch CurrentUser's Notifictions
export const fetchNotifications = async (limit = 50, skip = 0) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/?limit=${limit}&skip=${skip}`, {
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

    const notifications = await response.json();
    console.log(notifications); // Remove before production
    return notifications;
};

// Update Notification read status
export const updateNotificationReadStatus = async (notificationId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/read/${notificationId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error updating notification status');
    }

    return data;
};

// Clear notifications
export const clearNotifications = async (onlyRead = false) => {
    const token = localStorage.getItem('token');
    const queryParams = onlyRead ? '?onlyRead=true' : '';
    const endpoint = `${BASE_URL}/clear${queryParams}`;

    const response = await fetch(endpoint, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error clearing notifications');
    }

    return data;
};
