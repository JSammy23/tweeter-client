import { useState, useEffect } from 'react';
import { fetchUser } from '../api/users';

const useUserInfo = ({ userId }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                // console.log('Fecth useeffect triggered!', userId)
                const user = await fetchUser(userId);
                setUserInfo(user);
                // console.log('User found:', user);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        }

        if (userId) {
            fetchUserInfo()
        }

    }, [userId]);
    return { userInfo, loading };
};

export default useUserInfo;