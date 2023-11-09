import { useNavigate } from 'react-router-dom';

export const useHandleProfileClick = () => {
    const navigate = useNavigate();

    const handleUserProfileClick = async (userID) => {
        try {
            navigate(`/profile/${userID}`)
        } catch (error) {
            console.log(error)
        }
    };

    return handleUserProfileClick;
};