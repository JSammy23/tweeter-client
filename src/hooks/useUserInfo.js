import { useState, useEffect } from 'react';
import { fetchUser } from '../api/users';

const useUserInfo = ({ userUid }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await fetchUser(userUid);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        }
        if (userUid) {
            fetchUserInfo();
        }
    }, [userUid]);
    return { userInfo, isLoading };
};

export default useUserInfo;