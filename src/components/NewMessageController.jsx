import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipientChips from './RecipientChips';
import { useCreateConversationMutation, fetchUsersCommunity } from '../api';

import { Title, Header, Button } from '../styles/styledComponents';
import { SearchInput } from './SearchContent';
import styled from 'styled-components';
import UserInfoCard from './UserInfoCard';

const ScrollDiv = styled.div`
    width: 100%;
    overflow-y: scroll;
`;

const StyledHr = styled.hr`
    border: none;
    width: 85%;
    height: 1px;
    margin: .5em 0;
    background-color: ${props => props.theme.colors.primary};
`;

const NewMessageController = () => {
    const [recipients, setRecipients] = useState([]);
    const [ createConversation ] = useCreateConversationMutation();
    const [usersCommunity, setUsersCommunity] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const isDisabled = recipients.length > 0;
    
    useEffect(() => {
        const forwardedRecipientId = location.state?.recipientId;
        if (forwardedRecipientId) {
            setRecipients([forwardedRecipientId]);
            console.log('Recieved forwarded recipient Id:', forwardedRecipientId);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const data = await fetchUsersCommunity();
                setUsersCommunity(data);
            } catch (error) {
                console.error('Error fetching users community', error)
            }
        }
        fetchCommunity();
    },[]);

    const handleAddRecipient = (user) => {
        const simplifiedUser = {
            _id: user._id,
            username: user.username,
            profile_picture: user.profile.profile_picture
        };
        setRecipients(prevRecipients => [...prevRecipients, simplifiedUser]);
    };

    const handleRemoveRecipient = (id) => {
        setRecipients(recipients.filter(recipient => recipient._id !== id));
    };

    const handleNextClick = async () => {
        const participantIds = recipients.map(recipient => recipient._id);
        try {
            const response = await createConversation({participantIds}).unwrap();
            navigate(`/messages/${response._id}`);
        } catch (error) {
            console.error('Failed to create conversation:', error);
        }
    };

  return (
    <div className='flex column align'>
        <Header>
            <div className="flex spacer align">
                <Title>New message</Title>
                <Button 
                 onClick={handleNextClick}
                 disabled={!isDisabled}>
                    Next
                </Button>
            </div>
        </Header>
        <SearchInput
            type='text'
            placeholder='Search people' />
        <RecipientChips recipients={recipients} onRemoveRecipient={handleRemoveRecipient} />

        <StyledHr />

        {usersCommunity && (
            <ScrollDiv>
                {usersCommunity.map(user => (
                    <UserInfoCard user={user} onCardClick={handleAddRecipient} muteHandle />
                ))}
            </ScrollDiv>
        )}
    </div>
  )
};

export default NewMessageController;
