import { useState, useEffect } from 'react';
import { fetchUser } from '../api/users';

const useUserInfo = ({ userUid }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await fetchUser(userUid);
                setUserInfo(user);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        }
        if (userUid) {
            fetchUserInfo();
        }
    }, [userUid]);
    return { userInfo, loading };
};

export default useUserInfo;