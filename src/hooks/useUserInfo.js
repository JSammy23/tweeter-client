import { useState, useEffect } from 'react';
import { fetchUser } from '../api/users';

const useUserInfo = ({ userId, fields = '', populate = '' }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!userId) return;
            
            setLoading(true);
            try {
                console.log('Fetch useEffect triggered!', userId);
                const user = await fetchUser(userId, fields, populate);
                setUserInfo(user);
                console.log('User found:', user);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();

    }, [userId, fields, populate]);

    return { userInfo, loading };
};

export default useUserInfo;