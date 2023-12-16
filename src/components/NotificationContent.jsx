import { useState, useEffect } from 'react';
import Notification from './Notification';
import { updateNotificationReadStatus, clearNotifications } from '../api';

import styled from 'styled-components';
import { Header, Title } from '../styles/styledComponents';
import { fetchNotifications } from '../api';
import { TextButton, NotificationControls } from '../styles/styledComponents';

const NotificationContent = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const pullNotifications =  async () => {
            try {
                const notifications = await fetchNotifications();
                setNotifications(notifications);
            } catch (error) {
                console.log('Error fetching notifications:', error);
            }
        };
        pullNotifications();
    }, []);

    const handleClearReadClick = async () => {
        const originalNotifications = [...notifications]; // Store the original state
        const unreadNotifications = notifications.filter(notification => !notification.read);
        setNotifications(unreadNotifications);
    
        try {
            await clearNotifications(true); 
        } catch (error) {
            console.log('Error clearing read notifications:', error);
            setNotifications(originalNotifications); 
        }
    };

    const handleClearClick = async () => {
        const originalNotifications = [...notifications]; // Store the original state
        setNotifications([]); 
    
        try {
            await clearNotifications(); 
        } catch (error) {
            console.log('Error clearing all notifications:', error);
            setNotifications(originalNotifications); 
        }
    };

  return (
    <>
        <Header>
            <div className="flex spacer">
                <div>
                    <Title>Notifications</Title>
                </div>
                <NotificationControls>
                    <p>Clear:</p>
                    <TextButton onClick={handleClearClick} >All</TextButton>
                    <p>|</p>
                    <TextButton onClick={handleClearReadClick} >Read</TextButton>
                </NotificationControls>
            </div>
        </Header>
        {notifications.map(notification => (
            <Notification key={notification._id} notification={notification} />
        ))}
    </>
  )
}

export default NotificationContent;